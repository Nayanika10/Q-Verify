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
    dob: DataTypes.DATE,
    father_name: DataTypes.STRING,
  }, {
  tableName: `case_criminal_verifications`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.CaseCriminalVerification.belongsTo(models.Designation, {
          foreignKey: `designations_id`
        });
        models.CaseCriminalVerification.belongsTo(models.Case, {
          foreignKey: `case_id`
        });

      }
    }
  }
  );
}
