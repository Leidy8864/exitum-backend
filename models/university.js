'use strict'

module.exports = (sequelize, DataTypes) => {
    const university = sequelize.define('university', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        university: DataTypes.STRING,
        icon: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    })
    university.associate = (models) => {
        university.hasMany(models.education, {
            foreignKey:'university_id'
        });
    }
    return university
};