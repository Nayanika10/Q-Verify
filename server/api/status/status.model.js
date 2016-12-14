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
    tableName: `status`,
    underscored: true,
    timestamps: false,
    classMethods: {
      //associate(models) {
      //  models.Status.hasMany(models.CandidateMap);
      //}
    }
  });
}
