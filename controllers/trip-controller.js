var express = require("express");
var router = express.Router();
var Log = require("../db").import("../models/trip");
const validateSession = require("../middleware/validate-session");

//Create a workout log
router.post("/", validateSession, (req, res) => {
  let logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  Log.create(logEntry)
    .then((entry) =>
      res.status(200).json({ entry: entry, message: "Logged successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//Get all of a user's logs
router.get("/", validateSession, (req, res) => {
  Log.findAll({ where: { owner_id: req.user.id } })
    .then((entries) => res.status(200).json({ entries }))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get a workout log by id
router.get("/:id", validateSession, (req, res) => {
  Log.findOne({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((entries) => {
        if(entries===null){
            res.status(403).json({message:"You are not allowed to see another user's entry!"})
        } else{
            res.status(200).json({ entries })
        }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Edit a workout log
router.put("/:id", validateSession, (req, res) => {
  let updatedEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    //owner_id: req.user.id,
  };
  Log.update(updatedEntry, {
    where: { id: req.params.id, owner_id: req.user.id },
  })
    .then((entry) => {
        if(entry[0]===0){
            res.status(403).json({message:"You are not allowed to edit another user's entry!"})
        } else {
            res.status(200).json({entry:entry,message:"Log updated"})
        }
    }) 
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete a workout log
router.delete("/:id", validateSession, (req, res) => {
    Log.destroy({where: { id: req.params.id, owner_id: req.user.id }})
    .then((entry) => {
        if(entry===0){
            res.status(403).json({message:"You are not allowed to delete another user's entry!"})
        } else {
            res.status(200).json({message:"Entry deleted"})
        }
    }) 
    .catch((err) => res.status(500).json({ error: err }));
});



module.exports = router;
