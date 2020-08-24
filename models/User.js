const Sequelize = require("sequelize");

const sequelize = require("../startup/db");

const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
