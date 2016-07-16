'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Allocation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    }
  }, {
    tableName: `allocations`,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    classMethods: {
      associate(models) {
        models.Allocation.belongsTo(models.UserType, {
          foreignKey: `vendor_users_id`
        });
        models.Allocation.belongsTo(models.AllocationStatus, {
          foreignKey: `allocation_status_id`
        });
        models.Allocation.belongsTo(models.Case, {
          foreignKey: `cases_id`
        });
        models.Allocation.belongsTo(models.Allocation, {
          foreignKey: `updated_by`
        });
        models.Allocation.belongsTo(models.Allocation, {
          foreignKey: `created_by`
        });
      }
    }

  });
}
