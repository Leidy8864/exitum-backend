'use strict'

module.exports = (sequelize, DataType) => {
    const reply = sequelize.define('reply', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        reply: DataType.STRING,
        challenge_id: {
            type: DataType.INTEGER,
            references: {
                model: 'challenge',
                key: 'id'
            }
        },
        query_id: {
            type: DataType.INTEGER,
            references: {
                model: 'query',
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    reply.associate = (models) => {
        reply.belongsTo(models.challenge, {
            foreignKey: 'challenge_id'
        });
        reply.belongsTo(models.query, {
            foreignKey: 'query_id'
        });
    }
    return reply
};
