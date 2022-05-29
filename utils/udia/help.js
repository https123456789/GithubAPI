const help = (data, path) => {
	console.log("Help\n-----");
	var keys = Object.keys(global.cmds);
	for (var i = 0; i < keys.length; i++) {
		console.log("\u2022 " + keys[i]);
		if (global.cmds[keys[i]].help) {
			console.log("\t" + global.cmds[keys[i]].help);
		}
	}
}

module.exports = {
	fn: help,
	"help": "View the help information."
};