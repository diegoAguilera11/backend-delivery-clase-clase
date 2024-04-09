const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('../database/connection');
const User = require('./user');
const Role = require('./role');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);


        // Paths
        this.paths = {
            auth: '/api/auth',
            user: '/api/user'
        }

        // Connect to database
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes Application
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            await Role.sync({force: false});
            await User.sync({force: false});
            console.log('DATABASE CONNECTED');
        } catch (error) {
            console.log(error);
        }
    }

    middlewares() {

        // Morgan
        this.app.use(logger('dev'));

        // Cors
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authRoutes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server Running, Port:', this.port);
        });
    }
}

module.exports = Server;