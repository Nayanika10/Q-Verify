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


  }, {
    tableName: `case_address_verifications`,
    underscored: true,
    timestamps: true,
    classMethods: {
      associate(models) {
        models.Company.belongsTo(models.Location, {
          foreignKey: `location_id`
        });
        models.Company.belongsTo(models.User, {
          foreignKey: `created_by`
        });
        models.User.belongsTo(models.User, {
          foreignKey: `updated_by`
        });
        models.User.belongsTo(models.User, {
          foreignKey: `created_by`
        });
      }
    }
    }

  );
}
