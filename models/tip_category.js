'use strict'

module.exports = (sequelize, DataType) => {
    const tip_category = sequelize.define('tip_category', {
        tip_id: {
            type: DataType.INTEGER,
            references: {
                model: 'tip',
                key: 'id'
            },
            primaryKey: true
        },
        category_id: {
            type: DataType.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            },
            primaryKey: true
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    tip_category.associate = function (models) {
        tip_category.belongsTo(models.tip, {
            foreignKey: 'tip_id'
        });
        tip_category.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
    };
    return tip_category
}
