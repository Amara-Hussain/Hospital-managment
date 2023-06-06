const Sequelize = require("sequelize");

const sequelize = new Sequelize("hospital-db", "root", "rootuser", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  // Additional configuration options if needed
});

module.exports = sequelize;
