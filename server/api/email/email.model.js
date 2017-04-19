'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Email', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    status: DataTypes.INTEGER
  },{
    tableName: `emails`,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    classMethods: {
      associate(models) {
        models.Email.belongsTo(models.User, {
          foreignKey: `user_id`
        });
      }
    }
  });
}
