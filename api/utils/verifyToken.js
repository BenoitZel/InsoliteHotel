const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

//MIDDLEWARE VERIFY TOKEN
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

//MIDDLEWARE VERIFY USER
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin || req.user.isSuperAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//MIDDLEWARE VERIFY ADMIN
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//MIDDLEWARE VERIFY SUPERADMIN
const verifySuperAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isSuperAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin, verifySuperAdmin };