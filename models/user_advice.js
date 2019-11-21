'use strict'

module.exports = (sequelize, DataType) => {
    const user_advice = sequelize.define('user_advice', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        advice_id: {
            type: DataType.INTEGER,
            references: {
                model: 'advice',
                key: 'id'
            }
        },
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        startup_id: {
            type: DataType.INTEGER,
            references: {
                model: 'startup',
                key: 'id'
            }
        },
        employee_id: {
            type: DataType.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        },
        entrepreneur_id: {
            type: DataType.INTEGER,
            references: {
                model: 'entrepreneur',
                key: 'id'
            }
        },
        date_viewed: DataType.DATE,
        viewed: DataType.INTEGER,
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    user_advice.associate = (models) => {
        user_advice.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        user_advice.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
        user_advice.belongsTo(models.startup, {
            foreignKey: 'startup_id'
        });
        user_advice.belongsTo(models.entrepreneur, {
            foreignKey: 'entrepreneur_id'
        });
        user_advice.belongsTo(models.advice, {
            foreignKey: 'advice_id'
        });
    }
    return user_advice
};
