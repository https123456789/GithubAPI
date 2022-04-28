const reload = (data, path) => {
	var args = path[0];
	if (!args.length in [0, 1]) {
		console.error("reload: invalid args");
		return -1;
	}
	if (args.length == 0) {
		console.log("Reloading all modules...");
		var mk = Object.keys(global.cmds);
		console.log(mk);
		mk.forEach((item) => {
			console.log(item);
		})
	} else {
		console.log("Reloading module '" + args[0] + "'...");
		global.cmds[args[0]] = require("./udia/" + args[0] + ".js");
	}
}

module.exports = reload;