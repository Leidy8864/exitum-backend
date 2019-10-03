'use strict';
module.exports = (sequelize, DataType) => {
    const role = sequelize.define('role', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataType.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    role.associate = function (models) {
        role.belongsToMany(models.category,{
            through : 'category_role',
            foreignKey : 'role_id'
        });
    };
    return role;
};