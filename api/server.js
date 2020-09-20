const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require(`../users/users-router`)
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: `Something went wrong, try again later`
    })
}
);

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
