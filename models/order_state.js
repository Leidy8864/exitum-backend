'use strict';
module.exports = (sequelize, DataTypes) => {
    const order_state = sequelize.define('order_state', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        state: DataTypes.INTEGER,
        date_delivery: DataTypes.DATE,
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'order',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
       underscored: true 
    });
    order_state.associate = function (models) {
        order_state.belongsTo(models.order, {
            foreignKey: 'order_id'
        });
        order_state.hasMany(models.delivery, {
            as: 'delivery',
            foreignKey: 'order_state_id'
        });
    };
    return order_state;
};