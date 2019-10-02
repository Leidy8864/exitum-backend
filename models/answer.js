'use strict'

module.exports = (sequelize, DataType) => {
    const answer = sequelize.define('answer', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        answer: DataType.STRING,
        correct: DataType.INTEGER,
        question_id: {
            type: DataType.INTEGER,
            references: {
                model: 'question',
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
    answer.associate = (models) => {
        answer.belongsTo(models.question, {
            foreignKey: 'question_id'
        });
    }
    return answer
};
