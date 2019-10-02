'use strict'

module.exports = (sequelize, DataTypes) => {
    const education = sequelize.define('education', {
        description: DataTypes.STRING,
        date_start: DataTypes.DATE,
        date_end: DataTypes.DATE,
        university_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'university',
                    key: 'id'
                }
            },
            allowNull : true
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'employee',
                    key: 'id'
                }
            }
        },
        other_university: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    education.associate = (models) => {
        education.belongsTo(models.university, {
            foreignKey : 'university_id'
        });
        education.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
    }
    return education
};