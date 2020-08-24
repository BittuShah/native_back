const Sequelize = require("sequelize");

const sequelize = require("../startup/db");

const Product = sequelize.define("product", {
  product_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
