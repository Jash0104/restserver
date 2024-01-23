const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";
        this.authPath = "/api/auth";

        // Conectar a la DB
        this.connectDB()

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        // LECTURA Y PARSEO DEL BODY (JSON)
        this.app.use(express.json());

        // CORS
        this.app.use(cors());

        // PUBLIC DIRECTORY
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usersPath, require("../routes/user"));
    }

    listen() {
        this.app.listen(this.port, () =>
            console.log(`Example app listening on port ${this.port}!`)
        );
    }
}

module.exports = Server;
