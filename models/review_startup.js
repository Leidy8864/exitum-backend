'use strict';
module.exports = (sequelize, DataType) => {
    const review = sequelize.define('review_startup', {
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        startup_id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'startup',
                key: 'id'
            }
        },
        recommendation: DataType.TEXT,
        rating: DataType.BOOLEAN, //TINYINT(1)
        created_at: DataType.DATE
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    
    return review;
};