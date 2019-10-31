'use strict';
module.exports = (sequelize, DataTypes) => {
  const file_tip = sequelize.define('file_tip', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    tip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tip',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true

  });
  file_tip.associate = function (models) {
    file_tip.belongsTo(models.tip, {
      foreignKey: 'tip_id'
    });
  };
  return file_tip;
};