'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Allocation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    internal_status_id: DataTypes.INTEGER
  }, {
    tableName: `allocations`,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    classMethods: {
      associate(models) {
        models.Allocation.belongsTo(models.AllocationStatus, {
          foreignKey: `allocation_status_id`
        });
        models.Allocation.belongsTo(models.CandidateMap, {
          foreignKey: `candidate_map_id`
        });
        //models.Allocation.belongsTo(models.User, {
        //  foreignKey: `updated_by`
        //});
        //models.Allocation.belongsTo(models.User, {
        //  foreignKey: `created_by`
        //});
        //models.Allocation.belongsTo(models.CaseAddressVerification, {
        //  foreignKey: `case_address_verification_id`
        //});
        //models.Allocation.belongsTo(models.CaseEducationVerification, {
        //  foreignKey: `case_education_verification_id`
        //});
        //models.Allocation.belongsTo(models.CaseSiteVerification, {
        //  foreignKey: `case_site_verification_id`
        //});

        //models.Case.belongsTo(models.User, {
        //  foreignKey: `updated_by`
        //    as: 'Owner'
        //});
        //models.Case.belongsTo(models.User, {
        //  foreignKey: `created_by`
        //    as: 'Editor'
        //});
        //models.Allocation.belongsTo(models.CaseCriminalVerification, {
        //  foreignKey: `case_criminal_verification_id`
        //});
        models.Allocation.belongsTo(models.Status, {
          foreignKey: `status_id`
        });
        models.Allocation.belongsTo(models.User, {
          foreignKey: `user_id`
        });
      }
    }

  });
}
