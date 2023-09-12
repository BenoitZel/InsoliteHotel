const express = require('express');
const router = express.Router();
const { verifyToken, verifyUser, verifyAdmin, verifySuperAdmin } = require('../utils/verifyToken')
const { deleteUser, updateUser, getUser, getUsers } = require('../controllers/user');

//UPDATE USER MIDDLEWARE
router.put("/:id", verifySuperAdmin, updateUser);
// router.put("/:id",verifyUser,  updateUser);

//DELETE USER MIDDLEWARE
router.delete("/:id", verifySuperAdmin, deleteUser);
// router.delete("/:id", verifyUser, deleteUser);

//GET BY ID USER MIDDLEWARE
router.get("/:id", verifySuperAdmin, getUser);
// router.get("/:id", verifyUser, getUser);

//GET ALL ADMIN MIDDLEWARE
// router.get("/", verifySuperAdmin, getUsers)
router.get("/", verifyAdmin, getUsers)

module.exports = router;




