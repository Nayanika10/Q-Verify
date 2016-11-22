'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CandidateMap', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: `candidate_maps`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.CandidateMap.belongsTo(models.Candidate, {
          foreignKey: `candidate_id`
        });
        models.CandidateMap.belongsTo(models.CaseAddressVerification, {
          foreignKey: `case_address_verification_id`
        });
        models.CandidateMap.belongsTo(models.CaseEducationVerification, {
          foreignKey: `case_education_verification_id`
        });
        models.CandidateMap.belongsTo(models.CaseSiteVerification, {
          foreignKey: `case_site_verification_id`
        });
        //models.Case.belongsTo(models.User, {
        //  foreignKey: `updated_by`
        //    as: 'Owner'
        //});
        //models.Case.belongsTo(models.User, {
        //  foreignKey: `created_by`
        //    as: 'Editor'
        //});
        models.CandidateMap.belongsTo(models.CaseCriminalVerification, {
          foreignKey: `case_criminal_verification_id`
        });
        models.CandidateMap.belongsTo(models.Status, {
          foreignKey: `status_id`
        });
        models.CandidateMap.hasMany(models.Allocation);
        //models.CandidateMap.hasMany(models.Status);



      }
    }
  });

}
