const Plant = require('../models/plants');

async function index (req, res) {
    try {
        const plants = await Plant.all;
        res.status(200).json(plants)
    } catch (err) {
        res.status(500).json({err})
    }
};

async function show (req, res) {
    try {
        const plant = await Plant.findById(req.params.id);
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

async function destroy (req, res) {
    try {
        const plant = await Plant.findById(req.params.id);
        const resp = await plant.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { index, show, create, update, destroy }