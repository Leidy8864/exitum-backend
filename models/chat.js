'use strict';
module.exports = (sequelize, DataTypes) => {
    const chat = sequelize.define('chat', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        from_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        to_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        created_at: DataTypes.DATE
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    chat.associate = function (models) {
        chat.hasMany(models.message, {
            foreignKey: 'chat_id'
        });
        chat.belongsTo(models.user, {
            foreignKey: 'from_id'
        });
        chat.belongsTo(models.user, {
            foreignKey: 'to_id'
        });
    };
    return chat;
};