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
    remark: DataTypes.STRING,
    dob: DataTypes.DATE,
    father_name: DataTypes.STRING,
    designation:DataTypes.STRING,
  }, {
  tableName: `case_criminal_verifications`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        //models.CaseCriminalVerification.belongsTo(models.Designation, {
        //  foreignKey: `designation_id`
        //});
        //models.CaseCriminalVerification.hasMany(models.CandidateMap);
        //});

      }
    }
  }
  );
}
