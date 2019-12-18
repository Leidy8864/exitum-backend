'use strict';
module.exports = (sequelize, DataType) => {
  const skill = sequelize.define('skill', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    skill: DataType.STRING,
    icon: DataType.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true
  });
  skill.associate = function (models) {
    skill.belongsToMany(models.advertisement, {
      through: 'advertisement_skill',
      foreignKey: 'skill_id'
    });
    // skill.belongsToMany(models.employee, {
    //   through: 'employee_skill',
    //   foreignKey: 'skill_id'
    // });
    skill.belongsToMany(models.user, {
      as: { singular: 'toSkillUser', plural: 'toSkillUsers' },
      through: models.skill_user,
      foreignKey: 'skill_id',
      otherKey: 'user_id'
    });
    skill.belongsToMany(models.tip, {
      through: 'tip_skill',
      foreignKey: 'skill_id'
  });
  };
  return skill;
};