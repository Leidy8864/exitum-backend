'use strict'

module.exports = (sequelize, DataTypes) => {
    const startup_tip = sequelize.define('startup_tip', {
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'tip',
                    key: 'id'
                }
            }
        },
        startup_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'startup',
                key: 'id'
            }
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