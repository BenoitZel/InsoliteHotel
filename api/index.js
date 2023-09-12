'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
//CSRF IMPORT
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csurf = require('csurf');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
//HELMET HTTPS IMPORT
const helmet = require("helmet");
const http = require('http');
const https = require('https');
const fs = require('fs');
//DOCKER IMPORT
// const PORT = 8080;
// const HOST = '0.0.0.0';

//HTTPS
const options = {
    key: fs.readFileSync('selfsigned.key'),
    cert: fs.readFileSync('server.crt')
};

//HELMET
app.use(helmet())

//CORS
const cors = require("cors");
const corsOptions = {
    origin: 'https://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization',
    maxAge: 3600, // Durée en secondes pour la mise en cache des résultats de pré-vérification CORS
};
app.use(cors(corsOptions));

//CONNECTION TO MONGODB CLUSTER WITH MONGOOSE
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb")
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected");
});

// //MIDDLEWARES EXPRESS
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

//Middleware express error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

//CSRF
// Configure session
// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: true,
// }));
// Configure CSRF protection
const csrfProtection = csurf({ cookie: true }); // Important to set 'cookie: true'
app.use(csrfProtection);
// Middleware to provide CSRF token to all views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

https.createServer(options, app).listen(8443, () => {
    connect(),
        console.log("Connected to backEnd with https");
});

//DOCKER LISTEN
// app.listen(PORT, HOST, () => {
//     connect(),
//         console.log(`Running on http://${HOST}:${PORT}`);
// });

//EXPRESS LISTEN
// app.listen(8080, () => {
//     connect(),
//         console.log("Connected to backEnd");
// });

//HTTPS OG LISTEN
// https.createServer(options, app).listen(8443);
module.exports = app;

