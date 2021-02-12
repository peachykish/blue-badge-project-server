require("dotenv").config();

const router = require("express").Router(); //here
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.post("/register",(req,res)=>{
    const username=req.body.user.username;
    const password=bcrypt.hashSync(req.body.user.password,13);
    User.create({
        username: username,
        password: password
    })
    .then(function createUser(user) {
        let token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:24*60*60});
        let responseObject={user:user,message:"User created successfully",sessionToken:token};
        res.status(201).json(responseObject)
    })
    .catch((err)=>res.status(500).json({error:err}))
})


router.post("/login", (req, res) => {
  User.findOne({ where: { username: req.body.user.username } })
    .then(function login(user) {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          function (err, matches) {
            if (matches) {
              const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 * 60,
              });
              let responseObject = {
                user: user,
                message: "Sign in successful",
                sessionToken: token,
              };
              res.status(200).json(responseObject);
            } else {
              res.status(401).json({ message: "Incorrect password" });
            }
          }
        );
      }
    })
    .catch((error) => res.status(500).json({ error: error }));
});

module.exports = router;
