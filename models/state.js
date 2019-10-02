'use strict';
module.exports = (sequelize, DataType) => {
  const state = sequelize.define('state', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    state: DataType.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true

  });
  state.associate = function (models) {
    state.hasMany(models.advertisement, {
      foreignKey: 'state_id'
    });
  };
  return state;
};