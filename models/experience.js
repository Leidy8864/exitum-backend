'use strict'

module.exports = (sequelize, DataTypes) => {
    const experience = sequelize.define('experience', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        position: DataTypes.STRING,
        company: DataTypes.STRING,
        date_start: DataTypes.DATE,
        date_end: DataTypes.DATE,
        description: DataTypes.STRING,
        current_job: DataTypes.INTEGER,
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true
        })
    experience.associate = (models) => {
        experience.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
    }
    return experience
};