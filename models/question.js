'use strict'

module.exports = (sequelize, DataTypes) => {
    const question = sequelize.define('question', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        question: DataTypes.STRING,
        certification_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'certification',
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    })
    question.associate = (models) => {
        question.belongsTo(models.test, {
            foreignKey: 'test_id'
        });
        question.hasMany(models.answer, {
            as: 'answer',
            foreignKey:'question_id'
        });
    }
    return question
};