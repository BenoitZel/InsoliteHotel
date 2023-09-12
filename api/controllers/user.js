const User = require('../models/User');
const err = require('../utils/error')

//PUT UPDATE
const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch {
        next(err);
    }
};

//DELETE
const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch {
            next(err);
        }
};

//GET
const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch {
            next(err);
        }
}

//GET ALL
const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
            res.status(200).json(users);
        } catch {
            next(err);
        }
};

module.exports = {deleteUser, updateUser, getUser, getUsers};