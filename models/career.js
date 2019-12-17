'use strict'

module.exports = (sequelize, DataType) => {
    const career = sequelize.define('career', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    career.associate = (models) => {
        career.hasMany(models.education, {
            foreignKey: 'career_id'
        });
    }
    return career
};
