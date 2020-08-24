const Sequelize = require("sequelize");

const sequelize = require("../startup/db");

const Category = sequelize.define("category", {
  category_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  icon: {
    type: Sequelize.STRING,
  },
});

module.exports = Category;
