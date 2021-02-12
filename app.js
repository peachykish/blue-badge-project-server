//NEEDS WORK!

require('./controllers/node_modules/dotenv').config();
const express=require("express");
const app=express();
const sequelize=require("./db")
app.use(express.json());

const user=require("./controllers/user-controller");
const log=require("./controllers/log-controller");

sequelize.sync();


app.use(require("../middleware/headers"));
app.use("/user",user);
app.use("/log",log);

app.listen(3000,()=>console.log('App is listening on port 3000'));