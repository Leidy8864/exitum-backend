'use strict'

module.exports = (sequelize, DataType) => {
  const user = sequelize.define('user', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataType.STRING,
    lastname: DataType.STRING,
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    provider_id: DataType.STRING,
    confirmed: DataType.BOOLEAN,
    phone: DataType.STRING,
    role: {
      type: DataType.ENUM,
      values: ['entrepreneur', 'employee', 'admin','undefined'],
      allowNull: false
    },
    method: {
      type: DataType.ENUM,
      values: ['local', 'google', 'facebook'],
      allowNull: false
    },
    password : DataType.STRING,
    active: DataType.BOOLEAN,
    last_login: DataType.DATE,
    photo: DataType.STRING,
    photo_dni: DataType.STRING,
    avg_rating: DataType.DECIMAL,
    country_id: {
      type: DataType.INTEGER,
      references: {
        model: 'country',
        key: 'id'
      }
    },
    currency_id: {
      type: DataType.INTEGER,
      references: {
        model: 'currency',
        key: 'id'
      }
    }
  },
    {
      freezeTableName: true,
      timestamps: false,
      omitNull: true
    })
  user.associate = (models) => {
    user.hasOne(models.entrepreneur, {
      foreignKey: 'user_id'
    });
    user.hasOne(models.employee, {
      foreignKey: 'user_id'
    });
    user.belongsTo(models.country, {
      foreignKey: 'country_id'
    });
    user.belongsTo(models.currency, {
      foreignKey: 'currency_id'
    })
    user.hasOne(models.token, {
      foreignKey: 'user_id'
    });
    user.hasMany(models.order, {
      foreignKey: 'employer_id'
    });
    user.hasMany(models.order, {
      foreignKey: 'employee_id'
    });
    user.hasMany(models.review, {
      foreignKey: 'from_user_id'
    });
    user.hasMany(models.review, {
      foreignKey: 'to_user_id'
    });
    user.hasMany(models.chat, {
      foreignKey: 'from_id'
    });
    user.hasMany(models.chat, {
      foreignKey: 'to_id'
    });
    user.hasMany(models.notification, {
      foreignKey: 'user_id'
    });
    user.hasMany(models.notification_setting, {
      foreignKey: 'user_id'
    });
    user.hasMany(models.favorite, {
      foreignKey: 'from_user_id'
    });
    user.hasMany(models.favorite, {
      foreignKey: 'to_user_id'
    });
  }
  return user
};