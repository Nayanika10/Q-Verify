'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Degree', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    tableName: `degrees`,
    underscored: true,
    timestamps: true,
    classMethods: {
      associate(models) {
        models.Degree.hasMany(models.CaseEducationVerification);
      }
    }
  });

}
