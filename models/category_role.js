'use strict'

module.exports = (sequelize, DataTypes) => {
    const category_role = sequelize.define('category_role', {
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'category',
                    key: 'id'
                }
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'role',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    });
    return category_role
}