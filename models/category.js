'use strict';
module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    category.associate = function (models) {
        category.hasMany(models.employee, {
            foreignKey: 'category_id'
        });
        category.hasMany(models.subcategory, {
            foreignKey: 'category_id'
        });
        category.hasMany(models.skill, {
            foreignKey: 'category_id'
        });
        category.hasMany(models.advertisement, {
            foreignKey: 'category_id'
        });
        category.hasMany(models.startup, {
            foreignKey: 'category_id'
        });
    };
    return category;
};