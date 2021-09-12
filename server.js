var args = process.argv.slice(2);

if(args.length > 0) {
	try {
		var config = require("./" + args[0]);
	} catch(e) {
		console.log(e);
		console.log("can't open config: ./" + args[0]);
	}
	var app = require("./src/TestApp.js");
	new app(config);
} else {
	console.log("Required config, try\nnode server.js path/to/config.json");
}
