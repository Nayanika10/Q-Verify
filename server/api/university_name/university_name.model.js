'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('UniversityName', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: `university_names`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.UniversityName.hasMany(models.CaseEducationVerification);
      }
    }
  });
}
