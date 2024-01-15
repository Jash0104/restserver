const express = require('express')
const cors = require('cors');
class Server {
    constructor() {
            this.app = express();
            this.port = process.env.PORT
            this.usersPath = '/api/users'

            // Middlewares
            this.middlewares()

            // Rutas de la app
            this.routes();
    }

    middlewares() {
        // LECTURA Y PARSEO DEL BODY (JSON)
        this.app.use( express.json() )

        // CORS
        this.app.use( cors())

        // PUBLIC DIRECTORY
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
        
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }
}


module.exports = Server; 