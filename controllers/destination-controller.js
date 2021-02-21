const express = require('express');
const router = express.Router();
const validateSession = require("../middleware/validate-session");
const Destination = require("../db").import("../models/destination");

//Create a destination
router.post("/create", validateSession, (req, res) => {
  const destinationEntry = {
    descr: req.body.destination.descr,
    image: req.body.destination.image,
    name: req.body.destination.name,
    wikidata: req.body.destination.wikidata,
    owner_id: req.user.id,
    trip_id: req.body.destination.trip_id,
  };
  Destination.create(destinationEntry)
    .then(destination => res.status(200).json(destination))
    .catch(err => res.status(500).json({ error: err }))
});

//Get all of a user's destinations for a certain trip
router.get("/", validateSession, (req, res) => {
  Destination.findAll({ where: { owner_id: req.user.id,trip_id: req.body.destination.trip_id,} })
    .then((entries) => res.status(200).json({ entries }))
    .catch((err) => res.status(500).json({ error: err }));
});


//Delete a destination from a trip
router.delete("/:id", validateSession, (req, res) => {
    Destination.destroy({where: { id: req.params.id, owner_id: req.user.id,trip_id:req.trip.id} })
    .then((entry) => {
        if(entry===0){
            res.status(403).json({message:"You are not allowed to delete another user's destination!"})
        } else {
            res.status(200).json({message:"Destination deleted"})
        }
    }) 
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
