'use strict'

module.exports = (sequelize, DataTypes) => {
    const advertisement_skill = sequelize.define('advertisement_skill', {
        advertisement_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'advertisement',
                    key: 'id'
                }
            }
        },
        skill_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'skill',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    });
    return advertisement_skill
}