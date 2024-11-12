"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Address, {
        foreignKey: "ad_cs_id",
        as: "Address",
      });
      Customer.hasMany(models.Order, {
        foreignKey: "or_cs_id",
        as: "Order",
      });
      Customer.hasMany(models.Contact, {
        foreignKey: "ct_cs_id",
        as: "Contact",
      });
    }
  }
  Customer.init(
    {
      cs_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      cs_firstname: { type: DataTypes.STRING, allowNull: false },
      cs_lastname: { type: DataTypes.STRING, allowNull: false },
      cs_gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cs_birth: { type: DataTypes.DATE, allowNull: true },
      cs_status: { type: DataTypes.BOOLEAN, defaultValue: true },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Customer",
    }
  );
  return Customer;
};
