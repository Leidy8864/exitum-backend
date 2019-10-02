'use strict';
module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define('message', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        message: DataTypes.TEXT,
        created_at: DataTypes.DATE,
        viewed: DataTypes.INTEGER,
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chat',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    return message;
};