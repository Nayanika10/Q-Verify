'use strict';
const crypto = require('crypto');
const salt = 'DYhG93b0fIxfs2guVoUubasdfajfkljasdjfaklsdjflakrfWwvniR2G0FgaC9mi';
const _ = require('lodash');
import config from "../../config/environment";
export default function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    is_admin: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: `users`,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_at',
    instanceMethods: {
      resetPassword: function resetPassword(models) {
        return this
          .generateRandomPassword()
          .then(password => this
            .updateAttributes({ password })
            .then(u => {
              const user = u.toJSON();
              this.revokeTokens(models);
              models.QueuedTask.resetPasswordNotify(user, password);
              return Promise.resolve(user);
            }));
      },

      generateRandomPassword: function generateRandomPassword() {
        return new Promise((resolve, reject) => crypto
          .randomBytes(6, (err, buf) => {
            if (err) return reject(err);
            return resolve(buf.toString('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=/g, '')
            );
          }));
      },

      revokeTokens: function revokeTokens(models) {
        return Promise.all([
          models.AccessToken.update(
            { status: 0 },
            { where: { user_id: this.id } }
          ),
          models.RefreshToken.update(
            { status: 0 },
            { where: { user_id: this.id } }
          ),
        ]);
      },

      verifyPasswordAsync: function verifyPassword(password) {
        const hashedPass = crypto
          .createHash('md5')
          .update(salt + password)
          .digest('hex');
        return (hashedPass === this.password) ?
          _.pick(this.toJSON(), ['id']) : new Error('Check password!');
      },
      verifyPassword: function verifyPassword(password, cb) {
        return (this.hashPassword(password) === this.password) ?
          cb(null, this.toJSON()) : cb(new Error('Check password!'));
      },

      hashPassword: function hashPassword(password) {
        return crypto
          .createHash('md5')
          .update(salt + password)
          .digest('hex');
      },
    },
    classMethods: {
      associate(models) {
        //models.User.belongsTo(models.UserType, {
        //  foreignKey: `user_type_id`
        //});
        models.User.belongsTo(models.Company, {
          foreignKey: `company_id`
        });
        models.User.belongsTo(models.User, {
          foreignKey: `updated_by`
        });
        models.User.belongsTo(models.User, {
          foreignKey: `created_by`
        });
        models.User.hasMany(models.Case);
        models.User.hasMany(models.Allocation);
      }
    },
    hooks: {
    beforeCreate: function beforeCreate(instance) {
      if (instance.changed('password')) {
        instance
          .set('password', instance.hashPassword(instance.password));
      }
    },

    beforeUpdate: function beforeUpdate(instance) {
      if (instance.changed('password')) {
        instance
          .set('password', instance.hashPassword(instance.password));
      }
    },
  },
  });
}
