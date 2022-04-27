const Event = require('../models/events');

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
        const showEvent = await Event.findAllById(req.params.id);
        res.status(200).json(showEvent);
    } catch (err) {
        res.status(404).json({err});
    }
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

module.exports = { index, show, destroy }