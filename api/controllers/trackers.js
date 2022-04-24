const Tracker= require('../models/trackers');

async function index (req, res) {
    try {
        const trackers = await Tracker.all;
        res.status(200).json(trackers);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function show (req, res) {
    try {
        const showTracker = await Tracker.findById(req.params.id);
        res.status(200).json(showTracker);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function create (req, res) {
    try {
        const createTracker = await Tracker.create(req.body);
        res.status(201).json(createTracker);
    } catch (err) {
        res.status(422).json({err});
    }
};

async function update (req, res) {
    try {
        const updateTracker = await Tracker.update(req.body);
        res.status(204).json(updateTracker);
    } catch (err) {
        res.status(404).json({err});
    };
};

async function destroy (req, res) {
    try {
        const destroyTracker = await Tracker.findById(req.params.id);
        const resp = await destroyTracker.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
};

module.exports = { index, show, create, update, destroy }