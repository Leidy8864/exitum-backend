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
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
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
    }
    return workshop
};