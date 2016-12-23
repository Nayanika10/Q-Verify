+'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CaseType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {
    tableName: `case_types`,
    underscored: true,
    timestamps: false,
    classMethods: {
      associate(models) {
        models.CaseType.hasMany(models.CandidateCase);
      }
    }
  });
}
