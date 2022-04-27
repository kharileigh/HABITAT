const express = require('express');
const cors = require('cors');
const logRoutes = require("./middleware/log-routes");
const server = express();
server.use(cors());
server.use(express.json());

const authRoute = require('./routes/auth');
const usersRoutes = require('./routes/users');
const plantsRoutes = require('./routes/plants');
const eventsRoutes = require('./routes/events');

// express middleware
server.use(logRoutes);

server.use('/auth', authRoute)
server.use('/users', usersRoutes);
server.use('/plants', plantsRoutes);
server.use('/events', eventsRoutes);

server.get('/', (req, res) => res.send('Welcome to Habitat'));

module.exports = server;