const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/users')
const plantsRoutes = require('./routes/plants')
const trackersRoutes = require('./routes/trackers')

server.use('/users', usersRoutes)
server.use('/plants', plantsRoutes)
server.use('/trackers', trackersRoutes)

const port = process.env.PORT || 3000;

server.get('/', (req, res) => res.send('Welcome to the Hood Mothafucker'))

module.exports = server