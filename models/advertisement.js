'use strict';
module.exports = (sequelize, DataType) => {
    const advertisement = sequelize.define('advertisement', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataType.STRING,
        description: DataType.TEXT,
        state: DataType.ENUM('active', 'closed', 'archived'),
        category_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
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
        advertisement.belongsTo(models.category, {
            foreignKey: 'category_id'
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
        advertisement.hasMany(models.proposal, {
            as: 'proposal',
            foreignKey: 'advertisement_id'
        });

    };
    return advertisement;
};