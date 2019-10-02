'use strict'

module.exports = (sequelize, DataType) => {
    const available = sequelize.define('available', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        days: DataType.STRING,
        from_hour: DataType.DATE,
        to_hour: DataType.DATE,
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
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
    available.associate = (models) => {
        available.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    }
    return available
};
