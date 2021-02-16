const router = require("express").Router();

var Destination = require("../db").import("../models/destination");
const validateSession = require("../middleware/validate-session");

//Create a destination
router.post("/", validateSession, (req, res) => {
  console.log('tring to post destination');
  let destinationEntry = {
    xid: req.body.destination.xid,
    owner_id: req.user.id,
    trip_id: req.body.destination.trip_id,
  };
  Destination.create(destinationEntry)
    .then((entry) =>
      res.status(200).json({ entry: entry, message: "Logged successfully" })
    )
    .catch((err) => res.status(500).json({ error: err,message:"Create destination failed" }));
});

//Get all of a user's destinations for a certain trip
router.get("/", validateSession, (req, res) => {
  Destination.findAll({ where: { owner_id: req.user.id } })
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
