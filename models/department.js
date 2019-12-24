'use strict'

module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define('department', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        department: DataTypes.STRING,
        country_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'country',
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
    department.associate = function (models) {
        department.belongsTo(models.country, {
            foreignKey: 'country_id'
        });
        // department.hasMany(models.event, {
        //     foreignKey: 'department_id'
        // });
    };
    return department
}

