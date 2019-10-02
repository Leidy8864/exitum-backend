'use strict'

module.exports = (sequelize, DataTypes) => {
    const language = sequelize.define('language', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        language: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    language.associate = (models) => {
        language.belongsToMany(models.employee, {
            through: 'employee_language',
            foreignKey: 'language_id'
        });
    }
    return language
};