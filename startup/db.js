const Sequelize = require("sequelize");

const sequelize = new Sequelize("done-with-it", "root", "Helloworld!1", {
  dialect: "mysql",
  host: "localhost",
});

// if (sequelize) {
//   console.log("Mysql Connected!");
// } else {
//   console.log("Not!");
// }

module.exports = sequelize;
