const reload = (data, path) => {
	var args = path[0];
	if (!args.length in [0, 1]) {
		console.error("reload: invalid args");
		return -1;
	}
	if (args.length == 0) {
		console.log("Reloading all commands...");
		//console.log(require.cache);
		var mk = Object.keys(global.cmds);
		var i = 0;
		mk.forEach((item) => {
			var p = Math.floor((i / mk.length) * 100);
			process.stdout.clearLine();
			process.stdout.write("\rReloading " + p + "% (" + i + "/" + mk.length + ")...");
			delete require.cache[require.resolve("./" + item + ".js")];
			global.cmds[item] = require("./" + item + ".js");
			i += 1;
		});
		var p = Math.floor((i / mk.length) * 100);
		process.stdout.clearLine();
		process.stdout.write("\rReloading " + p + "% (" + i + "/" + mk.length + ")...");
		process.stdout.write("\n");
	} else {
		console.log("Reloading module '" + args[0] + "'...");
		delete require.cache[require.resolve("./" + args[0] + ".js")];
		global.cmds[args[0]] = require("./" + args[0] + ".js");
	}
}

module.exports = {
	fn: reload,
	help: "Reloads command or all commands."
};