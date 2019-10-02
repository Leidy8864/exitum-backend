'use strict';
module.exports = (sequelize, DataType) => {
  const meeting = sequelize.define('meeting', {
    startup_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'startup',
        key: 'id'
      }
    },
    employee_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    day_meet: DataType.DATE
  }, {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
    underscored: true

  });
  meeting.associate = function (models) {
    meeting.belongsTo(models.startup, {
      foreignKey: 'startup_id'
    });
    meeting.belongsTo(models.employee, {
      foreignKey: 'employee_id'
    });
  };
  return meeting;
};