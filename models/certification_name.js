'use strict'

module.exports = (sequelize, DataType) => {
    const certification_name = sequelize.define('certification_name', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    certification_name.associate = (models) => {
        certification_name.hasMany(models.certification, {
            foreignKey: 'certification_name_id'
        });
    }
    return certification_name
};
