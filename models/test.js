'use strict'

module.exports = (sequelize, DataTypes) => {
    const test = sequelize.define('test', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    test.associate = function (models) {
        test.belongsToMany(models.employee, {
            through: 'employee_test',
            foreignKey: 'test_id'
        });
    };
    return test
}
