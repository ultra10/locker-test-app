const log4js = require('log4js'); 
const fs = require('fs');

var logger;

var LoggerInit = function(config) {
    
    if(config.server.logPath) {
        if(!fs.existsSync(config.server.logPath)) {
            fs.mkdirSync(config.server.logPath);
        }
    }

    var path = config.server.logPath;
    if(config.name != undefined) {
        if(!fs.existsSync(config.server.logPath + "/" + config.name)) {
            fs.mkdirSync(config.server.logPath + "/" + config.name);
        }
        path += "/" +  config.name
    }
	
    log4js.configure({
      appenders: { 
            server: { 
                type: "dateFile",
                filename: path + "/" + config.name + "_server.log",
                pattern: "-MM-dd.log",
                alwaysIncludePattern: false,
                category: 'server'
            },
            logConsole :{ type: 'console' },
        },
        categories: { default: { appenders: ["server", "logConsole"], level: config.server.logLevel } }
    });
     
    logger = log4js.getLogger("server");
	return logger;
};

exports.init = LoggerInit;
exports.get = function(){
	return logger;
};
