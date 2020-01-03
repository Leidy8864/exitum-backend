'use strict'

module.exports = (sequelize, DataTypes) => {
    const education_speciality = sequelize.define('education_speciality', {
        education_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'education',
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

    return education_speciality
}