const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const err = require("../utils/error");

//POST CREATE AND PUSH INTO HOTELS
const createRoom = async (req, res, next) => {
    const hotelid = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save()
        try {
            //on passe chaque savedRoom par son id dans le champ room (array) dans le model hotel
            //$push : methode mongodb pour push dans un array
            await Hotel.findByIdAndUpdate(hotelid, { $push: { rooms: savedRoom._id} })
        } catch (err) {
            next(err);   
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);   
    }
}

//PUT UPDATE 
const updateRoom = async (req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch {
        next(err);
    }
};

//PUT UPDATE ROOM AVAILIBILITY
const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
          { "roomNumbers._id": req.params.id },
          //MongoDb Push Methode
          {$push: {"roomNumbers.$.unavailableDates": req.body.dates},}
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
    };

//DELETE AND PULL INTO HOTELS
const deleteRoom = async (req, res, next) => {
    const hotelid = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
            try {
                //cette fois avec la methode mondodb pull pour enlever avec l'id
                await Hotel.findByIdAndUpdate(hotelid, { $pull: { rooms: req.params.id} });
            } catch (err) {
                next(err);   
            }
            res.status(200).json("Room has been deleted");
        } catch {
            next(err);
        }
    }

//GET ROOM
const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
            res.status(200).json(room);
        } catch {
            next(err);
        }
}

//GET ALL ROOMS
const getRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find();
            res.status(200).json(rooms);
        } catch {
            next(err);
        }
};

module.exports = {deleteRoom, createRoom, updateRoom, getRoom, getRooms, updateRoomAvailability};