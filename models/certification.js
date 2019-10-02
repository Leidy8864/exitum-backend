'use strict';
module.exports = (sequelize, DataTypes) => {
    const certification = sequelize.define('certification', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        issuing_company: DataTypes.STRING,
        date_expedition: DataTypes.DATE,
        date_expiration: DataTypes.DATE,
        document_url: DataTypes.STRING,
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    certification.associate = function (models) {
        certification.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
    };
    return certification;
};