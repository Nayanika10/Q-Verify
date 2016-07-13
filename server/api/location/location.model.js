'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: `locations`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.Location.hasMany(models.Company);
      }
    }
  });
}
