'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('CaseSiteVerification', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name_of_company: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      fax_no: DataTypes.STRING,
      email_id: DataTypes.STRING,
      website: DataTypes.STRING,
      total_no_of_employees: DataTypes.STRING,
      name_of_employees: DataTypes.STRING,
      name_of_chief_executive: DataTypes.STRING,
      director: DataTypes.STRING,
      company_sign_present: DataTypes.STRING,
      no_of_employee_present: DataTypes.STRING,
      computers: DataTypes.STRING,
      tables: DataTypes.STRING,
      chairs: DataTypes.STRING,
      approx: DataTypes.STRING,
      area: DataTypes.STRING,
      employee_awareness: DataTypes.STRING,
      neighbours_name: DataTypes.STRING,
      remarks: DataTypes.STRING,
      comment: DataTypes.STRING,
      concern_person: DataTypes.STRING,
      company_name: DataTypes.STRING,
    }
    , {
      tableName: `case_site_verifications`,
      underscored: true,
      timestamps: false,
      classMethods: {
        associate(models) {
          models.CaseSiteVerification.belongsTo(models.Case, {
            foreignKey: `case_id`
          });
          models.CaseSiteVerification.belongsTo(models.Designation, {
            foreignKey: `designation_id`
          });

        }
      }
    }
  );
}
