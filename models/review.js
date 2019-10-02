'use strict';
module.exports = (sequelize, DataType) => {
    const review = sequelize.define('review', {
        from_user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        to_user_id: {
            type: DataType.INTEGER,
            allowNull: false,
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
    review.associate = function (models) {
        review.belongsTo(models.user, {
            foreignKey: 'from_user_id'
        });
        review.belongsTo(models.user, {
            foreignKey: 'to_user_id'
        });
    };
    return review;
};