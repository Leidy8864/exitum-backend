'use strict'

module.exports = (sequelize, DataType) => {
    const proposal = sequelize.define('proposal', {
        accepted: DataType.BOOLEAN,
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
    proposal.associate = (models) => {
        proposal.belongsTo(models.employee, {
            foreignKey: 'employee_id'
        });
        proposal.belongsTo(models.advertisement, {
            foreignKey: 'advertisement_id'
        });
    }
    return proposal
};