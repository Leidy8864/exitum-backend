'use strict'

module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define('favorite', {
        from_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            primaryKey: true
        },
        to_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            primaryKey: true
        },
        chosen: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    favorite.associate = function (models) {
        favorite.belongsTo(models.user, {
            foreignKey: 'from_user_id'
        });
        favorite.belongsTo(models.user, {
            foreignKey: 'to_user_id'
        });
    };
    return favorite
};