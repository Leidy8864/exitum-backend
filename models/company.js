'use strict'

module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        icon: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    })

    company.associate = function (models) {
        company.hasMany(models.experience, {
            foreignKey: 'company_id'
        });
        company.hasMany(models.certification, {
            foreignKey: 'company_id'
        });
    }
    return company
};