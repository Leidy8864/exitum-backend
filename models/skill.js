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
    skill.belongsToMany(models.employee, {
      through: 'employee_skill',
      foreignKey: 'skill_id'
  });
  };
  return skill;
};