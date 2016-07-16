'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('AllocationStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }
    , {
      tableName: `allocation_statuss_id`,
      underscored: true,
      timestamps: false,
      classMethods: {
        associate(models) {
          models.AllocationStatus.hasMany(models.Allocation);
        }
      }
    });
}
