'use strict'

module.exports = (sequelize, DataTypes) => {
    const speciality = sequelize.define('speciality', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    })
    speciality.associate = (models) => {
        speciality.belongsToMany(models.education, {
            as: { singular: 'toSpecialityEducation', plural: 'toSpecialityEducations' },
			through: models.education_speciality,
			foreignKey:'speciality_id',
			otherKey: 'education_id'
		});
        
        speciality.belongsToMany(models.advertisement, {
            as: { singular: 'toSpecialityAdvertisement', plural: 'toSpecialityAdvertisements' },
			through: models.advertisement_speciality,
			foreignKey:'speciality_id',
			otherKey: 'advertisement_id'
		});
        
        speciality.belongsToMany(models.certification, {
            as: { singular: 'toSpecialityCertification', plural: 'toSpecialityCertifications' },
			through: models.certification_speciality,
			foreignKey:'speciality_id',
			otherKey: 'certification_id'
		});
    }
    return speciality
};