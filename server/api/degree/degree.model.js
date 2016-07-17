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
    is_active: DataTypes.INTEGER
  }, {
    tableName: `degrees`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.Degree.hasMany(models.CaseEducationVerification);
      }
    }
  });

}
