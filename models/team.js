'use strict'

module.exports = (sequelize, DataTypes) => {
    const team = sequelize.define('team', {
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'employee',
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
        contract: DataTypes.INTEGER
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true
        });
    team.associate = (models) => {
        team.belongsTo(models.startup, {
            foreignKey: 'startup_id'
        });
        team.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
    }
    return team
};