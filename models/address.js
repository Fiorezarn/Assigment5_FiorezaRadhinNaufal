"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Address.belongsTo(models.Customer, {
        foreignKey: "ad_cs_id",
        as: "Customer",
      });
    }
  }
  Address.init(
    {
      ad_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ad_street: { type: DataTypes.STRING, allowNull: false },
      ad_city: { type: DataTypes.STRING, allowNull: false },
      ad_postalCode: { type: DataTypes.STRING, allowNull: false },
      ad_cs_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
