const Sequelize = require("sequelize");

const sequelize = require("../startup/db");

const Images = sequelize.define("images", {
  image_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image_src: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Images;
