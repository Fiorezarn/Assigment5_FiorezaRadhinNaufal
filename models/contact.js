"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.Customer, {
        foreignKey: "ct_cs_id",
        as: "customer",
      });
    }
  }
  Contact.init(
    {
      ct_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ct_phoneNumber: { type: DataTypes.STRING, allowNull: false },
      ct_email: { type: DataTypes.STRING, allowNull: false },
      ct_cs_id: { type: DataTypes.INTEGER },
      ct_type: {
        type: DataTypes.ENUM("primary", "secondary"),
        defaultValue: "primary",
      },
    },
    {
      sequelize,
      modelName: "Contact",
    }
  );
  return Contact;
};
