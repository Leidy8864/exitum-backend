'use strict';
module.exports = (sequelize, DataType) => {
    const advertisement = sequelize.define('advertisement', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataType.STRING,
        description: DataType.TEXT,
        state: DataType.ENUM('active', 'closed', 'archived'),
        area_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'area',
                key: 'id'
            }
        },
        startup_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'startup',
                key: 'id'
            }
        },
        created_at: DataType.DATE,
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    advertisement.associate = function (models) {
        advertisement.belongsTo(models.startup, {
            foreignKey: 'startup_id'
        });
        advertisement.belongsTo(models.area, {
            foreignKey: 'area_id'
        });
        advertisement.hasMany(models.invitation, {
            as: 'invitation',
            foreignKey: 'advertisement_id'
        });
        advertisement.hasMany(models.order_detail, {
            as: 'detail',
            foreignKey: 'advertisement_id'
        });
        advertisement.belongsToMany(models.skill, {
            through: 'advertisement_skill',
            foreignKey: 'advertisement_id'
        });
        advertisement.belongsToMany(models.employee, {
			through: models.proposal,
			foreignKey: 'advertisement_id',
			otherKey: 'employee_id'
        });
        advertisement.hasMany(models.proposal, {
            foreignKey: 'advertisement_id'
        });
        advertisement.hasMany(models.advertisement_skill, {
            foreignKey: 'advertisement_id'
        });
    };
    return advertisement;
};