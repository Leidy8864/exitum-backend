'use strict';
module.exports = (sequelize, DataType) => {
  const skill = sequelize.define('skill', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    skill: DataType.STRING,
    category_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
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
    skill.belongsTo(models.category, {
      foreignKey: 'category_id'
    });
    skill.belongsToMany(models.employee, {
      through: 'employee_skill',
      foreignKey: 'skill_id'
  });
  };
  return skill;
};