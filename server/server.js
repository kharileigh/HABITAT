const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const booksRoutes = require('./routes/books')
const authorsRoutes = require('./routes/authors')

server.use('/books', booksRoutes)
server.use('/authors', authorsRoutes)

const port = process.env.PORT || 3000;

server.get('/', (req, res) => res.send('Welcome to the Plants'))

module.exports = server