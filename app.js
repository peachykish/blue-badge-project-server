//NEEDS WORK!

require('dotenv').config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const user = require("./controllers/user-controller");
const trip = require("./controllers/trip-controller");
const destination = require("./controllers/destination-controller");

sequelize.sync();

app.use(express.json());

app.use(require("./middleware/headers"));
app.use("/user", user);
app.use("/trip", trip);
app.use("/destination", destination);


app.listen(3000, ()=> {
    console.log('App is listening on port 3000')
});