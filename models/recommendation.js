'use strict';
module.exports = (sequelize, DataType) => {
  const recommendation = sequelize.define('recommendation', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    description: DataType.TEXT,
    total_likes : DataType.INTEGER,
    employee_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true

  });
  recommendation.associate = function (models) {
    recommendation.belongsToMany(models.startup, {
      through: 'like',
      foreignKey: 'recommendation_id'
    });
    recommendation.belongsTo(models.employee, {
      foreignKey: 'employee_id'
    });
  };
  return recommendation;
};