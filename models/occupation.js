'use strict'

module.exports = (sequelize, DataType) => {
    const occupation = sequelize.define('occupation', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    occupation.associate = (models) => {
        occupation.hasMany(models.experience, {
            foreignKey: 'occupation_id'
        });
    }
    return occupation
};
