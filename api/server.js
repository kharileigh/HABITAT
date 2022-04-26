const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/users');
const plantsRoutes = require('./routes/plants');
const habitsRoutes = require('./routes/habits');
const eventsRoutes = require('./routes/events');

server.use('/users', usersRoutes);
server.use('/plants', plantsRoutes);
server.use('/trackers', habitsRoutes);
server.use('/events', eventsRoutes);

server.get('/', (req, res) => res.send('Welcome to Habitat'));

module.exports = server;