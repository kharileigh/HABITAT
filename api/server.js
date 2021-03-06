const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const server = express();
// express using stuff
server.use(cookieParser());
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/users');
const plantsRoutes = require('./routes/plants');
const eventsRoutes = require('./routes/events');
//require middleware
const { authentication, requireAuth  } = require('./middleware/verifyToken');
const logRoutes = require("./middleware/log-routes");
// express middleware - for all routes do THIS function
// server.get('*', authentication)
server.use(logRoutes);
// server.get('*', authentication);
// routes
server.use('/users', usersRoutes);
server.use('/plants', plantsRoutes);
server.use('/events', requireAuth , eventsRoutes);

server.get('/', (req, res) => res.send('Welcome to Habitat'));

module.exports = server;