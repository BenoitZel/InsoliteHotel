const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../utils/verifyToken')
const { deleteHotel, createHotel, updateHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } = require('../controllers/hotel');

//CREATE ADMIN MIDDLEWARE
router.post("/", createHotel);
//router.post("/",verifyAdmin, createHotel);

//UPDATE ADMIN MIDDLEWARE
router.put("/:id", updateHotel);
// router.put("/:id", verifyAdmin, updateHotel);

//DELETE ADMIN MIDDLEWARE
router.delete("/:id", deleteHotel);
// router.delete("/:id", verifyAdmin, deleteHotel);

//GET BY ID
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels)

//GET COUNTCITY
router.get("/countByCity", countByCity)

//GET COUNTTYPE
router.get("/countByType", countByType)

//GET ROOM BY HOTEL ID
router.get("/room/:id", getHotelRooms)

module.exports = router;
