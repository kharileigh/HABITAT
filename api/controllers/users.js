const User = require('../models/users');

async function index (req, res) {
    try {
        const users = await User.all;
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
};

async function show (req, res) {
    try {
        const user = await Plant.findById(req.params.id);
        res.status(200).json(plant)
    } catch (err) {
        res.status(404).json({err})
    }
};

async function create (req, res) {
    try {
        const plant = await Plant.create(req.body);
        res.status(201).json(plant)
    } catch (err) {
        res.status(422).json({err})
    }
};

async function update (req, res) {
    try {
        const updatePlant = await Plant.update(req.body);
        res.status(204).json(updatePlant);
    } catch (err) {
        res.status(404).json({err});
    };
};

async function destroy (req, res) {
    try {
        const plant = await Plant.findById(req.params.id);
        const resp = await plant.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
};

module.exports = { index, show, create, update, destroy }