'use strict'

module.exports = (sequelize, DataTypes) => {
    const education = sequelize.define('education', {
        career_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'career',
                    key: 'id'
                }
            },
            allowNull : true
        },
        date_start: DataTypes.DATE,
        date_end: DataTypes.DATE,
        university_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'university',
                    key: 'id'
                }
            },
            allowNull : true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'user',
                    key: 'id'
                }
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    education.associate = (models) => {
        education.belongsTo(models.university, {
            foreignKey : 'university_id'
        });
        education.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        education.belongsTo(models.career, {
            foreignKey: 'career_id'
        });

        education.belongsToMany(models.speciality, {
            as: { singular: 'toEducationSpeciality', plural: 'toEducationSpecialities' },
			through: models.education_speciality,
			foreignKey:'education_id',
			otherKey: 'speciality_id'
		});
    }
    return education
};