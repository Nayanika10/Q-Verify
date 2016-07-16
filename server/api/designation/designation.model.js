'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Designation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: `designations`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.Designation.hasMany(models.CaseCriminalVerification);
        models.Designation.hasMany(models.CaseSiteVerification);
        models.Designation.hasMany(models.CaseEducationVerification);
      }
    }
  });
}
