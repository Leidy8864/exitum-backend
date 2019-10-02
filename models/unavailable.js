'use strict'

module.exports = (sequelize, DataType) => {
    const unavailable = sequelize.define('unavailable', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        hour_break: DataType.DATE,
        available_id: {
            type: DataType.INTEGER,
            references: {
                model: 'available',
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    unavailable.associate = (models) => {
        unavailable.belongsTo(models.available, {
            foreignKey: 'available_id'
        });
    }
    return unavailable
};
