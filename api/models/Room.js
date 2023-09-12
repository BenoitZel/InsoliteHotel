const mongoose = require('mongoose');

//MONGOOSE SCHEMA
const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    desc:{
        type: String,
        required: true
    },
    maxPeople:{
        type: Number,
        default: false
    },
    //ROOM NUMBER WITH DATES UNAVAILABLES
    roomNumbers:[{number:Number, unavailableDates: {type: [Date]}}],
},
//CREATED UPDATED TO
{timestamps: true}
);

//EXPORT SCHEMA UNDER THE NAME ROOM
module.exports = mongoose.model("Room", RoomSchema);



//exemple pour roomNumbers
//A chaque reservation, la date de reservation viendra s'ajouter dans le tableau de unaivalable... et la numéro de chambre dans Number
// [
//     {number:101, unaivalableDates:[01.05.2022,02.02.2022]}
//     {number:102, unaivalableDates:[04.05.2022,08.02.2022]}
//     {number:103, unaivalableDates:[20.05.2022,25.02.2022]}
//     {number:104, unaivalableDates:[01.05.2022,02.02.2022]}
// ]