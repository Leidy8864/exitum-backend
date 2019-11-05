'use strict';
module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define('file', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'challenge',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true

  });
  file.associate = function (models) {
    file.belongsTo(models.challenge, {
      foreignKey: 'challenge_id'
    });
  };
  return file;
};