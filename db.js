const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "travel-app-server",
  "postgres",
  "password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to travel-app-server postgres database!");
  },
  function (err) {
    console.log(err);
  }
)
.catch(console.log);

module.exports = sequelize;
