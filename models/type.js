'use strict'

module.exports = (sequelize, DataTypes) => {
    const type = sequelize.define('type', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    });
    type.associate = (models) => {
        type.belongsToMany(models.employee, {
            through : 'employee_type',
            foreignKey : 'type_id'
        });
    }
    return type
};