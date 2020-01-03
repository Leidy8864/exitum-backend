'use strict'

module.exports = (sequelize, DataTypes) => {
    const query = sequelize.define('query', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        query: DataTypes.STRING,
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tip',
                key: 'id'
            }
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true

        })
    query.associate = (models) => {
        query.belongsTo(models.tip, {
            foreignKey: 'tip_id'
        });
        query.hasMany(models.reply, {
            foreignKey: 'query_id'
        });
        query.belongsToMany(models.challenge, {
            as: { singular: 'reply', plural: 'replies' },
            through: models.reply,
            foreignKey: 'query_id',
            otherKey: 'challenge_id'
        });
    }
    return query
};