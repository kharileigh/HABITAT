const Plant = require('../models/events');

async function index (req, res) {
    try {
        const events = await Event.all;
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function show (req, res) {
    try {
        const showEvent = await Event.findById(req.params.id);
        res.status(200).json(showEvent);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function create (req, res) {
    try {
        const createEvent = await Event.create(req.body);
        res.status(201).json(createEvent);
    } catch (err) {
        res.status(422).json({err});
    }
};

async function update (req, res) {
    try {
        const updateEvent = await Event.update(req.body);
        res.status(204).json(updateEvent);
    } catch (err) {
        res.status(404).json({err});
    };
};

async function destroy (req, res) {
    try {
        const destroyedEvent = await Event.findById(req.params.id);
        const resp = await destroyedEvent.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
};

module.exports = { index, show, create, update, destroy }