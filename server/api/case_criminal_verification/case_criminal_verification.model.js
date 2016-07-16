'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CaseCriminalVerification', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    police_station_name: DataTypes.STRING,
    police_authority_name: DataTypes.STRING,
    remarks: DataTypes.STRING,
  }, {
  tableName: `case_address_verifications`,
    underscored: true,
    timestamps: true,
    classMethods: {
      associate(models) {
        models.CaseCriminalVerification.belongsTo(models.Designation, {
          foreignKey: `designations_id`
        });
        models.CaseCriminalVerification.belongsTo(models.Status, {
          foreignKey: `statuss_id`
        });
        models.CaseCriminalVerification.belongsTo(models.Case, {
          foreignKey: `cases_id`
        });

      }
    }
  }
  );
}
