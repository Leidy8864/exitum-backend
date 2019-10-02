'use strict'

module.exports = (sequelize, DataType) => {
    const entrepreneur = sequelize.define('entrepreneur', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
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
            omitNull: true,
            underscored: true

        })
    entrepreneur.associate = (models) => {
        entrepreneur.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        entrepreneur.hasMany(models.startup, {
            foreignKey: 'entrepreneur_id'
        });
    }
    return entrepreneur
};