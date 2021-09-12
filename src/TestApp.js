const Logger = require('./utils/Logger.js');
const HttpServer = require('./libs/HttpServer.js');
const DataMapper = require('./libs/DataMapper.js');


class TestApp {
    constructor(config) {
        this.config = config;

        this.logger = Logger.init(this.config);
        this.logger.info("[APP] Logger init");

        this.restApiServer = null;

        this.init();
    }

    init() {
        this.dataMapper = new DataMapper(this.config.dataPath);
        this.HttpServer = new HttpServer(this.config);

        this.HttpServer.on("getDataRequest", (req, res) => {
            this.logger.info("[APP] Send data to client");
            res.send(JSON.stringify(this.dataMapper.getData()));
        });
    }
}

module.exports = TestApp;