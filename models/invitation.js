'use strict';
module.exports = (sequelize, DataTypes) => {
  const invitation = sequelize.define('invitation', {
    created_at: DataTypes.DATE,
    saved: DataTypes.INTEGER,
    advertisement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'advertisement',
        key: 'id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true

  });
  invitation.associate = function (models) {
    invitation.belongsTo(models.advertisement, {
      foreignKey: 'advertisement_id'
    });
    invitation.belongsTo(models.employee, {
      foreignKey: 'employee_id'
    });
  };
  return invitation;
};