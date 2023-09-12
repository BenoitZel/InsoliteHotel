const createError = require("../utils/error");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//SignUp plus Bcrypt generate
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash
    });
    await newUser.save()
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);

  }
}

//LOGIN - JWT GENERATE
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Utilisateur introuvable !"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Mauvais identifiants !"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin }, process.env.JWT);
    const { password, isAdmin, isSuperAdmin, ...otherDetails } = user._doc;

    //RESPONSE WITH JWT IN COOKIE AND XSS SECURITY
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 86400000,
      })
      .status(200)
      .json({ details: { ...otherDetails, isAdmin, isSuperAdmin }, isAdmin, isSuperAdmin })
  } catch (err) {
    next(err);
  }
};

//LOGOUT
const logout = async (req, res, next) => {
  try {
    res.cookie('access_token', 'none', {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' })
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout };