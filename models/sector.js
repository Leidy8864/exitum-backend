'use strict';
module.exports = (sequelize, DataType) => {
    const sector = sequelize.define('sector', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        sector: DataType.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    sector.associate = function (models) {
        sector.hasMany(models.startup, {
            foreignKey: 'sector_id'
        });
    };
    return sector;
};