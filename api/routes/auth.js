const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const router = express.Router();
// const csurf = require('csurf');


//POST SIGNUP
router.post("/register", register);

//POST LOGIN
router.post("/login", login);
// router.post("/login", csurf({ cookie: true }), login);

//POST LOGOUT
router.post("/logout", logout);

module.exports = router;
