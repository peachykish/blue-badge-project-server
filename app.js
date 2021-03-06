//NEEDS WORK!

require('dotenv').config();
const express=require("express");
const app=express();
const sequelize=require("./db")
app.use(express.json());

const user=require("./controllers/user-controller");
const trip=require("./controllers/trip-controller");
const destination=require("./controllers/destination-controller");


sequelize.sync();


app.use(require("./middleware/headers"));
app.use("/user",user);
app.use("/trip",trip);
app.use("/destination",destination);


app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
});