const Plant = require('../models/plants');

async function index (req, res) {
    try {
        const plants = await Plant.all;
        res.status(200).json(plants);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function show (req, res) {
    try {
        const showPlant = await Plant.findById(req.params.id);
        res.status(200).json(showPlant);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function create (req, res) {
    try {
        const createPlant = await Plant.create(req.body);
        res.status(201).json(createPlant);
    } catch (err) {
        res.status(422).json({err});
    }
};

async function update (req, res) {
    try {
        const updatePlant = await Plant.update(req.body);
        res.status(204).json({success: true});
    } catch (err) {
        res.status(404).json({err});
    };
};

async function destroy (req, res) {
    try {
        const destroyedPlant = await Plant.findById(req.params.id);
        const resp = await destroyedPlant.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
};

module.exports = { index, show, create, update, destroy }