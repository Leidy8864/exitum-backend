'use strict'

module.exports = (sequelize, DataTypes) => {
    const experience = sequelize.define('experience', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        occupation_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'occupation',
                key: 'id'
            }
        },
        company_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'company',
                key: 'id'
            }
        },
        date_start: DataTypes.DATE,
        date_end: DataTypes.DATE,
        description: DataTypes.STRING,
        current_job: DataTypes.INTEGER,
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
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true
        })
    experience.associate = (models) => {
        experience.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        experience.belongsTo(models.company, {
            foreignKey: 'company_id'
        });
        experience.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
        experience.belongsTo(models.occupation, {
            foreignKey: 'occupation_id'
        });
    }
    return experience
};