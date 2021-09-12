const Logger = require('../utils/Logger.js');
const EventsEmitter = require('../utils/EventsEmitter.js');
const path = require('path');
const express = require('express')

class HttpServer extends EventsEmitter { 
    constructor(config) {
        super();
        this.config = config;
        this.logger = Logger.get();

		this.eventsList = {
			"getDataRequest": []
		};

        this.expressApp = null;

        this.init();
    }

    init() {
        this.expressApp = express();

        this.expressApp.use(express.urlencoded({extended: true})); 
        this.expressApp.use(express.json());
        
        this.setEndPoints();    

        this.expressApp.listen(this.config.server.port, this.config.server.ip, () => {this.logger.info("[HttpServer] Server start listning at " + this.config.server.ip + ":" + this.config.server.port)});   
    }

    setEndPoints() {
        this.expressApp.get('/getData', (req, res) => {
            this.emitEvent("getDataRequest", req, res);
            
        });

        this.expressApp.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname + './../client/index.html'));
        });
    }
}

module.exports = HttpServer;