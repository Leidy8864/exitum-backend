'use strict'

module.exports = (sequelize, DataTypes) => {
    const advertisement_speciality = sequelize.define('advertisement_speciality', {
        advertisement_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'advertisement',
                    key: 'id'
                }
            }
        },
        speciality_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'speciality',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    });

    return advertisement_speciality
}