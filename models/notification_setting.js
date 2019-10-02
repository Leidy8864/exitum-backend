'use strict'

module.exports = (sequelize, DataTypes) => {
    const notification_setting = sequelize.define('notification_setting', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        active : DataTypes.INTEGER,
        notification_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'notification_type',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        setting: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    notification_setting.associate = function (models) {
        notification_setting.belongsTo(models.notification_type, {
            foreignKey: 'notification_type_id'
        });
        notification_setting.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    return notification_setting
};