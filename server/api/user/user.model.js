'use strict';

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
    email_id: DataTypes.STRING,
    contact: DataTypes.STRING,
    is_admin: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: `users`,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    classMethods: {
      associate(models) {
        models.User.belongsTo(models.UserType, {
          foreignKey: `user_type_id`
        });
        models.User.belongsTo(models.Company, {
          foreignKey: `companies_id`
        });
        models.User.belongsTo(models.User, {
          foreignKey: `updated_by`
        });
        models.User.belongsTo(models.User, {
          foreignKey: `created_by`
        });
      }
    }
  });
}
