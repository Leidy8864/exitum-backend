'use strict'

module.exports = (sequelize, DataType) => {
    const advice = sequelize.define('advice', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataType.STRING,
        description: DataType.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    return advice
};
