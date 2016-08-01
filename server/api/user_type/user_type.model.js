'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('UserType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    tableName: `user_types`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.UserType.hasMany(models.Company);
      }
    }
  });
}
