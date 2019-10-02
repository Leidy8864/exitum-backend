'use strict'

module.exports = (sequelize, DataTypes) => {
    const level = sequelize.define('level', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        level: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    level.associate = (models) => {
        level.belongsToMany(models.employee, {
            through: 'employee_language',
            foreignKey: 'language_id'
        });
    }
    return level
};