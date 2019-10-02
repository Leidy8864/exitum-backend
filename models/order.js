'use strict';
module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        created_at: DataTypes.DATE,
        employer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    order.associate = function (models) {
        order.belongsTo(models.user, {
            foreignKey: 'employer_id'
        });
        order.belongsTo(models.user, {
            foreignKey: 'employee_id'
        });
        order.hasOne(models.order_state, {
            foreignKey: 'order_id'
        });
    };
    return order;
};