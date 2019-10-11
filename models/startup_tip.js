'use strict'

module.exports = (sequelize, DataTypes) => {
    const startup_tip = sequelize.define('startup_tip', {
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tip',
                key: 'id'
            },
            primaryKey: true
        },
        startup_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'startup',
                key: 'id'
            },           
            primaryKey: true
        },
        checked: DataTypes.BOOLEAN
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    })
    return startup_tip
};