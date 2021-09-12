class EventsEmitter {
	
	constructor() {
	    this.eventsList = {};
	}

	on(eventName, fun) {
		if(this.eventsList[eventName] !== undefined) {
			if(typeof fun == "function") {
				this.eventsList[eventName].push(fun);
				return true;
			} else {
				console.log("secend param is not a function");
				return false;
			}
		} else {
			console.log("unknown event type: " + eventName);
			return false;
		}
	}
	
	emitEvent(...params) {
		let eventName = params[0];
		this.eventsList[eventName].map((elem) => {
			params.shift();
			elem.apply(null, params);
		});
	};

	removeAllEventListeners(eventName) {
		if(this.eventsList[eventName] !== undefined) {
			this.eventsList[eventName] = [];
		}
	}

	removeEventListener(eventName, fun) {
		if(this.eventsList[eventName] !== undefined) {
			for(var i = 0; i < this.eventsList[eventName].length; i++) {
				if(this.eventsList[eventName][i] == fun) {
					this.eventsList[eventName].splice(i, 1);
				}
			}
		}
	}
	
}

module.exports = EventsEmitter;