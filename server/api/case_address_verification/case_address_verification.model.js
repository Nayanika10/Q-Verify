'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CaseAddressVerification', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    visiting_address: DataTypes.STRING,
    visiting_person_name: DataTypes.STRING,
    relation_with_candidate: DataTypes.STRING,
    years_of_staying: DataTypes.STRING,
    image: DataTypes.STRING,
    remarks:DataTypes.STRING,

  }, {
    tableName: `case_address_verifications`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.CaseAddressVerification.belongsTo(models.HouseType, {
          foreignKey: `house_type_id`
        });
        //models.CaseAddressVerification.hasMany(models.CandidateMap);

      }
    }
    }

  );
}

