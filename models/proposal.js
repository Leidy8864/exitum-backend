'use strict'

module.exports = (sequelize, DataType) => {
    const proposal = sequelize.define('proposal', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        proposal: DataType.STRING,
        amount: DataType.DECIMAL,
        viewed: DataType.BOOLEAN,
        created_at: DataType.DATE,
        advertisement_id: {
            type: DataType.INTEGER,
            references: {
                model: 'advertisement',
                key: 'id'
            }
        },
        employee_id: {
            type: DataType.INTEGER,
            references: {
                model: 'employee',
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
    proposal.associate = function (models) {
        proposal.belongsTo(models.advertisement, {
            foreignKey: 'advertisement_id'
        });
        proposal.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
    };
    return proposal
};