'use strict'

module.exports = (sequelize, DataType) => {
    const workshop = sequelize.define('workshop', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataType.STRING,
        description: DataType.STRING,
        day: DataType.DATE,
        hour_start: DataType.TIME,
        hour_end: DataType.TIME,
        place: DataType.STRING,
        lat: DataType.FLOAT(10, 8),
        lng: DataType.FLOAT(11, 8),
        photo: DataType.STRING,
        participants: DataType.INTEGER,
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        department_id: {
            type: DataType.INTEGER,
            references: {
                model: 'department',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    })
    workshop.associate = (models) => {
        workshop.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        workshop.belongsTo(models.department, {
            foreignKey: 'department_id'
        });
        workshop.belongsToMany(models.category, {
            as: { singular: 'toWorkshopCategory', plural: 'toWorkshopCategories' },
            through: models.category_workshop,
            foreignKey: 'workshop_id',
            otherKey: 'category_id'
        });
        workshop.belongsToMany(models.user, {
            as: { singular: 'toWorkshopUser', plural: 'toWorkshopUsers' },
            through: models.user_workshop,
            foreignKey: 'workshop_id',
            otherKey: 'user_id'
        });
    }
    return workshop
};