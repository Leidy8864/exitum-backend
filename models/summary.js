'use strict'

module.exports = (sequelize, DataTypes) => {
    const summary = sequelize.define('summary', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'user',
                    key: 'id'
                }
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
                references: {
                    model: 'stage',
                    key: 'id'
                }
            }
        },
        step_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'step',
                    key: 'id'
                }
            }
        },
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'tip',
                    key: 'id'
                }
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    return summary
};