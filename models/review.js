'use strict';
module.exports = (sequelize, DataType) => {
    const review = sequelize.define('review', {
        form_user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        to_user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        review: DataType.STRING,
        rating: DataType.INTEGER,
        state: {
            type: DataType.ENUM,
            values: ['active', 'pending', 'deleted']
        },
        created_at: DataType.DATE
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    
    return review;
};