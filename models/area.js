'use strict'

module.exports = (sequelize, DataType) => {
    const area = sequelize.define('area', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
        ciiu: DataType.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    area.associate = (models) => {
        area.hasMany(models.advertisement, {
            foreignKey: 'area_id'
        });
    }
    return area
};
