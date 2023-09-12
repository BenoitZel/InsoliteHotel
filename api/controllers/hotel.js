const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const err = require('../utils/error')

//POST CREATE
const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch {
        next(err);
    }
};

//PUT  UPDATE
const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch {
        next(err);
    }
};

//DELETE
const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch {
        next(err);
    }
};

//GET HOTEL
const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch {
        next(err);
    }
}

//GET ALL HOTELS WITH QUERIES
const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;

    try {
        const hotels = await Hotel.find({
            ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        })
        res.status(200).json(hotels);
    } catch {
        next(err);
    }
};


//GET ALL HOTELS AND COUNT BY CITIES
const countByCity = async (req, res, next) => {
    //Nous allons récupérer un array donc je séparre les éléments grace à la methode split qui les spéparera avec une virgule
    //on récupére dans la requéte les cities entrées par l'utilisateur
    const cities = req.query.cities.split(",")
    try {
        //on crée une liste et inclue dedans un map sur le array cities et la méthode countDocuments fournie par mongodb compte les city identiques  dans le collection Hotel et on retourne cette liste
        //on recupére la demande et map dessus. dans le map la méthode fournie par mongodb countDocument va cherchait toutes les cities demandés et les additionner. On renvoi cette liste
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch {
        next(err);
    }
};

//GET ALL HOTELS AND COUNT BY TYPES
const countByType = async (req, res, next) => {
    try {
        const ecoLodgeCount = await Hotel.countDocuments({ type: "EcoLodge" });
        const roulotteCount = await Hotel.countDocuments({ type: "Roulotte" });
        const penicheCount = await Hotel.countDocuments({ type: "Péniche" });
        const lodgeCount = await Hotel.countDocuments({ type: "Lodge" });

        res.status(200).json([
            { type: "EcoLodge", count: ecoLodgeCount },
            { type: "Roulotte", count: roulotteCount },
            { type: "Péniche", count: penicheCount },
            { type: "Lodge", count: lodgeCount },
        ])
    } catch {
        next(err);
    }
};

//GET ROOM BY HOTEL ID
const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};

module.exports = { deleteHotel, createHotel, updateHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms };