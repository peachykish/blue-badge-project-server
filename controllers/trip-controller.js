const express = require("express");
const router = express.Router();
const Trip = require("../db").import("../models/trip");
const validateSession = require("../middleware/validate-session");

//Create a trip
router.post("/", validateSession, (req, res) => {
  const tripEntry = {
    description: req.body.trip.description,
    place:req.body.trip.place,
    lat: req.body.trip.lat,
    lon: req.body.trip.lon,
    owner_id: req.user.id,
  };
  Trip.create(tripEntry)
    .then((entry) =>
      res.status(200).json({ entry: entry, message: "Logged successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//Get all of a user's trips
router.get("/", validateSession, (req, res) => {
  Trip.findAll({ where: { owner_id: req.user.id } })
    .then((entries) => res.status(200).json({ entries }))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get a trip by id
router.get("/:id", validateSession, (req, res) => {
  Trip.findOne({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((entries) => {
        if(entries===null){
            res.status(403).json({message:"You are not allowed to see another user's entry!"})
        } else{
            res.status(200).json({ entries })
        }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Edit a trip
router.put("/update/:id", validateSession, (req, res) => {
  const updatedTripEntry = {
    description: req.body.trip.description,
    place: req.body.trip.place,
    // lat: req.body.trip.lat,
    // lon: req.body.trip.lon,
    //owner_id: req.user.id,
  };
  Trip.update(updatedTripEntry, {
    where: { id: req.params.id, owner_id: req.user.id },
  })
    .then((entry) => {
        if(entry[0]===0){
            res.status(403).json({message:"You are not allowed to edit another user's trip!"})
        } else {
            res.status(200).json({entry:entry,message:"Trip updated"})
        }
    }) 
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete a trip
router.delete("/:id", validateSession, (req, res) => {
    Trip.destroy({where: { id: req.params.id, owner_id: req.user.id }})
    .then((entry) => {
        if(entry===0){
            res.status(403).json({message:"You are not allowed to delete another user's trip!"})
        } else {
            res.status(200).json({message:"Trip deleted"})
        }
    }) 
    .catch((err) => res.status(500).json({ error: err }));
});



module.exports = router;
