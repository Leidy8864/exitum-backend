'use strict'

module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define('employee', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
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
        short_description: DataTypes.STRING,
        about_me: DataTypes.STRING,
        price_hour: DataTypes.DECIMAL,
        behance_user: DataTypes.STRING,
        behance_active: DataTypes.BOOLEAN,
        linkedin_active: DataTypes.BOOLEAN,
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true,

        })
    employee.associate = (models) => {
        employee.belongsToMany(models.language, {
            through: 'employee_language',
            foreignKey: 'employee_id'
        });
        employee.belongsToMany(models.test, {
            through: 'employee_test',
            foreignKey: 'employee_id'
        });
        employee.belongsToMany(models.skill, {
            through: 'employee_skill',
            foreignKey: 'employee_id'
        });
        employee.belongsToMany(models.type, {
            through: 'employee_type',
            foreignKey: 'employee_id'
        });
        employee.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
        employee.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        employee.hasMany(models.recommendation, {
            as: 'recommendation',
            foreignKey: 'employee_id'
        });
        // employee.hasMany(models.experience, {
        //     as: 'experience',
        //     foreignKey: 'employee_id'
        // });
        employee.hasMany(models.meeting, {
            foreignKey: 'employee_id'
        });
        employee.hasMany(models.team, {
            foreignKey: 'employee_id'
        });
        // employee.hasMany(models.education, {
        //     as: 'education',
        //     foreignKey: 'employee_id'
        // });
        // employee.hasMany(models.certification, {
        //     foreignKey: 'employee_id'
        // });
        employee.belongsTo(models.stage, {
            foreignKey: 'stage_id'
        });
        employee.belongsToMany(models.tip, {
            as: { singular: 'tip', plural: 'tips'},
            through: models.employee_tip,
            foreignKey: 'employee_id',
            otherKey: 'tip_id'
        });
        employee.belongsToMany(models.advertisement, {
            as: { singular: 'proposal', plural: 'proposals'},
            through: models.proposal,
            foreignKey: 'employee_id',
            otherKey: 'advertisement_id'
        });
        employee.belongsToMany(models.step, {
            as: { singular: 'employee_step', plural: 'employee_steps' },
            through: models.employee_step,
            foreignKey: 'employee_id',
            otherKey: 'step_id'
        });
    }
    return employee
};