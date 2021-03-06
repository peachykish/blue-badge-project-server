const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

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
