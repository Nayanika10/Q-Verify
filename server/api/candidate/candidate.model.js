'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Candidate', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      pdf: DataTypes.STRING,
      is_active: DataTypes.INTEGER,
      state: DataTypes.STRING,
      pin: DataTypes.STRING,

    }
    , {
      tableName: `candidates`,
      underscored: true,
      timestamps: true,
      classMethods: {
        associate(models) {
          models.Candidate.belongsTo(models.User, {
            foreignKey: `user_id`
          });
          models.Candidate.hasMany(models.CandidateCase);

          //models.Candidate.belongsToMany(models.CaseAddressVerification, {
          //  through: models.CandidateCase,
          //  foreignKey: 'candidate_id',
          //  targetKey: 'case_id',
          //});
          //
          //models.Candidate.belongsToMany(models.CaseCriminalVerification, {
          //  through: models.CandidateCase,
          //  foreignKey: 'candidate_id',
          //  targetKey: 'case_id',
          //});
          //
          //models.Candidate.belongsToMany(models.CaseEducationVerification, {
          //  through: models.CandidateCase,
          //  foreignKey: 'candidate_id',
          //  targetKey: 'case_id',
          //});
          //
          //models.Candidate.belongsToMany(models.CaseSiteVerification, {
          //  through: models.CandidateCase,
          //  foreignKey: 'candidate_id',
          //  targetKey: 'case_id',
          //});

          //models.Case.belongsTo(models.User, {
          //  foreignKey: `updated_by`
          //    as: 'Owner'
          //});
          //models.Case.belongsTo(models.User, {
          //  foreignKey: `created_by`
          //    as: 'Editor'
          //});
          //models.Candidate.belongsTo(models.Status, {
          //  foreignKey: `status_id`
          //});
          //models.Candidate.hasMany(models.CandidateMap);
          //models.Candidate.hasMany(models.Allocation);
        }
      }
    });
}
