'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CandidateCase', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: `candidate_cases`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.CandidateCase.belongsTo(models.Candidate, {
          foreignKey: `candidate_id`
        });

        models.CandidateCase.belongsTo(models.CaseAddressVerification, {
          foreignKey: `case_id`
        });

        models.CandidateCase.belongsTo(models.CaseEducationVerification, {
          foreignKey: `case_id`
        });

        models.CandidateCase.belongsTo(models.CaseCriminalVerification, {
          foreignKey: `case_id`
        });

        models.CandidateCase.belongsTo(models.CaseSiteVerification, {
          foreignKey: `case_id`
        });

        //models.Case.belongsTo(models.User, {
        //  foreignKey: `updated_by`
        //    as: 'Owner'
        //});
        //
        //models.Case.belongsTo(models.User, {
        //  foreignKey: `created_by`,
        //    as: 'Editor'
        //});

        models.CandidateCase.belongsTo(models.CaseType, {
          foreignKey: `case_type_id`
        });
        //models.CandidateCase.belongsTo(models.Status, {
        //  foreignKey: `status_id`
        //});
        models.CandidateCase.hasMany(models.Allocation);
        //models.CandidateCase.hasMany(models.Status);



      }
    }
  });

}
