'use strict';
module.exports = (sequelize, DataTypes) => {
    const certification = sequelize.define('certification', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        certification_name_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'certification_name',
                key: 'id'
            }
        },
        company_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'company',
                key: 'id'
            }
        },
        date_expedition: DataTypes.DATE,
        date_expiration: DataTypes.DATE,
        document_url: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    certification.associate = function (models) {
        certification.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        certification.belongsTo(models.company, {
            foreignKey: 'company_id'
        })
        certification.belongsTo(models.certification_name, {
            foreignKey: 'certification_name_id'
        })
    };
    return certification;
};