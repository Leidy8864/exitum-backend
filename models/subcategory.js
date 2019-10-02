'use strict';
module.exports = (sequelize, DataType) => {
    const subcategory = sequelize.define('subcategory', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
        category_id: DataType.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    subcategory.associate = function (models) {
        subcategory.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
    };
    return subcategory;
};