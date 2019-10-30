'use strict'

module.exports = (sequelize, DataTypes) => {
    const challenge = sequelize.define('challenge', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        },
        startup_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'startup',
                key: 'id'
            }           
        },
        stage_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'stage',
                key: 'id'
            } 
        },
        step_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'step',
                key: 'id'
            } 
        },
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tip',
                key: 'id'
            }
        },
        checked: DataTypes.BOOLEAN,
        status: DataTypes.STRING,
        date: DataTypes.DATE,
        comment: DataTypes.STRING,
        reply: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    })
    challenge.associate = function (models) {
        challenge.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        challenge.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
        challenge.belongsTo(models.startup, {
            foreignKey: 'startup_id'
        });
        challenge.belongsTo(models.stage, {
            foreignKey: 'stage_id'
        });
        challenge.belongsTo(models.step, {
            foreignKey: 'step_id'
        });
        challenge.belongsTo(models.tip, {
            foreignKey: 'tip_id'
        });
        challenge.hasMany(models.file, {
            foreignKey: 'challenge_id'
        });
    }
    return challenge
};