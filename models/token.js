'use strict'

module.exports = (sequelize, DataType) => {
    const token = sequelize.define('token', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        token: DataType.STRING,
        token_created_at: DataType.DATE,
        token_password: DataType.STRING,
        token_password_created_at: DataType.DATE,
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    return token
};