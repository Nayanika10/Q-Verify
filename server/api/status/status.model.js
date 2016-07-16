'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: `statuss`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.Status.belongsTo(models.CaseEducationVerification, {
          foreignKey: `statuss_id`
        });
        models.Status.belongsTo(models.CaseAddressVerification, {
          foreignKey: `statuss_id`
        });
      }
    }
  });
}
