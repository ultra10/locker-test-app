const Logger = require('../utils/Logger.js');
const fs = require('fs');

class DataMapper {
    constructor(pathToFile) {
        this.logger = Logger.get();
        this.data = null;

        this.init(pathToFile);
    }   

    init(pathToFile) {
        let data = this.openFile(pathToFile);
        let json = null;
        try {
            json = JSON.parse(data);
        } catch(e) {
            this.logger.error("[DataMapper] JSON parse error: " + e);
        }
        if(json !== null) {
            this.parseData(json);
        } else {
            this.logger.error("[DataMapper] json is null");
        }
    }

    getData() {
        return this.data;
    }

    parseData(json) {
        if(json['events'][0]['competitions'][0]['competitors'] !== undefined) {
            let data = json['events'][0]['competitions'][0]['competitors'];
            let ret = [];    
            data.forEach((element) => {
                ret.push({
                    'position': this.getPlayerPosition(element),        
                    'playerName': this.getPlayerName(element),        
                    'totalScore': this.getPlayerTotalScore(element),       
                    'totalScore4Rounds': this.getPlayerTotalScore4Rounds(element),       
                    'strokesTaken': this.getPlayerStrokesTaken(element),       
                });         
            });
            this.logger.info("[DataMapper] Found " + ret.length + " entries");
            this.data = ret;
            
        }
    }

    getPlayerPosition(jsonData) {
        return jsonData['status']['position']['id'] !== undefined ? jsonData['status']['position']['id'] : null;
    }

    getPlayerName(jsonData) {
        return jsonData['athlete']['displayName'] !== undefined ? jsonData['athlete']['displayName'] : null;
    }

    getPlayerTotalScore(jsonData) {
        return jsonData['score']['value'] !== undefined ? jsonData['score']['value'] : null;
    }

    getPlayerTotalScore4Rounds(jsonData) {
        let linescores = [];
        if(jsonData['linescores'] !== undefined) {
            jsonData['linescores'].forEach((element) => {
                if(element['value'] !== undefined) {
                    linescores.push(element['value']);  
                }
            });
        }
        return linescores;
    }

    getPlayerStrokesTaken(jsonData) {
        return jsonData['movement'] !== undefined ? jsonData['movement'] : null;
    }

    openFile(pathToFile) {
        try {
            return fs.readFileSync(pathToFile, 'utf8');
        } catch (err) {
            this.logger.fatal(err);
        }
    }

}

module.exports = DataMapper;