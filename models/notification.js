'use strict'

module.exports = (sequelize, DataTypes) => {
    const notification = sequelize.define('notification', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        notification: DataTypes.STRING,
        created_at: DataTypes.DATE,
        viewed: DataTypes.INTEGER,
        notification_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'notification_type',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true

        });
    notification.associate = function (models) {
        notification.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        notification.belongsTo(models.notification_type, {
            foreignKey: 'notification_type_id'
        });
    };
    return notification
};