'use strict'

const model_startup = (sequelize, DataType) => {
    const startup = sequelize.define('startup', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
        photo_url: DataType.STRING,
        ruc: DataType.STRING,
        description: DataType.STRING,
        entrepreneur_id: {
            type: DataType.INTEGER,
            references: {
                model: 'entrepreneur',
                key: 'id'
            }
        },
        category_id: {
            type: DataType.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        stage_id: {
            type: DataType.INTEGER,
            references: {
                model: 'stage',
                key: 'id'
            }
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true

        });
    startup.associate = (models) => {
        startup.belongsToMany(models.recommendation, {
            through: 'like',
            foreignKey: 'startup_id'
        });
        startup.belongsTo(models.entrepreneur, {
            foreignKey: 'entrepreneur_id'
        });
        startup.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
        startup.belongsToMany(models.tip,{
            through : 'startup_tip',
            foreignKey : 'startup_id'
        });
        startup.belongsToMany(models.tip, {
            through: 'startup_tip',
            foreignKey: 'startup_id'
        });
        startup.belongsTo(models.stage, {
            foreignKey: 'stage_id'
        });
        startup.hasMany(models.advertisement, {
            foreignKey : 'startup_id'
        });
        startup.hasMany(models.meeting,{
            foreignKey : 'startup_id'
        });
        startup.hasMany(models.team,{
            foreignKey : 'startup_id'
        });
    }
    return startup
}

module.exports = model_startup