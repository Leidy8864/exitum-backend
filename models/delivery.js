'use strict';
module.exports = (sequelize, DataTypes) => {
    const delivery = sequelize.define('delivery', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        file : DataTypes.STRING,
        order_state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'order_state',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    delivery.associate = function (models) {
        delivery.belongsTo(models.order_state, {
            foreignKey: 'order_state_id'
        });
    };
    return delivery;
};