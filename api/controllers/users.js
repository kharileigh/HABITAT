const User = require('../models/users');

async function index (req, res) {
    try {
        const users = await User.all;
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function show (req, res) {
    try {
        const showUser = await User.findById(req.params.id);
        res.status(200).json(showUser);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function create (req, res) {
    try {
        const createdUser = await User.create(req.body);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(422).json({err});
    }
};

async function update (req, res) {
    try {
        const updateUser = await User.update(req.body);
        res.status(204).json(updateUser);
    } catch (err) {
        res.status(404).json({err});
    };
};

async function destroy (req, res) {
    try {
        const destroyedUser = await User.findById(req.params.id);
        const resp = await destroyedUser.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
};

module.exports = { index, show, create, update, destroy }