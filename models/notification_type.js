'use strict'

module.exports = (sequelize, DataTypes) => {
    const notification_type = sequelize.define('notification_type', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    notification_type.associate = function (models) {
        notification_type.hasMany(models.notification, {
            foreignKey: 'notification_type_id'
        });
        notification_type.hasMany(models.notification_setting, {
            foreignKey: 'notification_type_id'
        })
    };
    return notification_type
}