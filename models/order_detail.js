'use strict';
module.exports = (sequelize, DataTypes) => {
    const order_detail = sequelize.define('order_detail', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: DataTypes.DECIMAL(10, 2),
        day_start: DataTypes.DATE,
        day_end: DataTypes.DATE,
        advertisement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'advertisement',
                key: 'id'
            }
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'order',
                key: 'id'
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    order_detail.associate = function (models) {
        order_detail.belongsTo(models.order, {
            foreignKey: 'order_id'
        });
        order_detail.belongsTo(models.advertisement, {
            foreignKey: 'advertisement_id'
        });
    };
    return order_detail;
};