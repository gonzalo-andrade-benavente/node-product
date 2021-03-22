const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3002;
        this.productPath = '/app/products';

        this.middlewares();

        this.routes();
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${ this.port }`);
        });
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Parser JSON
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.productPath , require('../routes/product'));
     }


}

module.exports = Server;