const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../utils/verifyToken')
const { deleteRoom, createRoom, updateRoom, getRoom, getRooms, updateRoomAvailability } = require('../controllers/room');

//CREATE ADMIN MIDDLEWARE
router.post("/:hotelid", createRoom);
// router.post("/:hotelid",verifyAdmin, createRoom);

//UPDATE ADMIN MIDDLEWARE
router.put("/:id", updateRoom);
// router.put("/:id",verifyAdmin, updateRoom);

//
router.put("/availability/:id", updateRoomAvailability);

//DELETE ADMIN MIDDLEWARE
router.delete("/:id", deleteRoom);
// router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET BY ID
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms)

module.exports = router;
