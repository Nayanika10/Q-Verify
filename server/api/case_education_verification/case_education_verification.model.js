'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CaseEducationVerification', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_no: DataTypes.STRING,
    passing_year: DataTypes.STRING,
    verifier_name: DataTypes.STRING,
    remarks: DataTypes.STRING,

  }, {
    tableName: `case_education_verifications`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.CaseEducationVerification.belongsTo(models.UniversityName, {
          foreignKey: `university_names_id`
        });
        models.CaseEducationVerification.belongsTo(models.Degree, {
          foreignKey: `degrees_id`
        });
        models.CaseEducationVerification.belongsTo(models.Designation, {
          foreignKey: `designations_id`
        });
        models.CaseEducationVerification.belongsTo(models.Case, {
          foreignKey: `case_id`
        });
      }
    }
  });
}
