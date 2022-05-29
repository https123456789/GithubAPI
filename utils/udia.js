const fs = require("fs");
const path = require("path");
var readline = require('readline-sync');

global.commandPrompt = "udia:";

var cmdsData = fs.readFileSync(__dirname + "/udia/cmds.json");
cmdsData = JSON.parse(cmdsData);

var cmdKeys = Object.keys(cmdsData.cmds);

global.cmds = {};

for (var i = 0; i < cmdKeys.length; i++) {
	global.cmds[cmdKeys[i]] = require(cmdsData.cmds[cmdKeys[i]]);
}

/*global.cmds = {
	clear: require("./udia/clear.js"),
	exit: require("./udia/exit.js"),
	help: require("./udia/help.js"),
	mvc: require("./udia/mvc.js"),
	print: require("./udia/print.js"),
	reload: require("./udia/reload.js"),
	setPrompt: require("./udia/setPrompt.js")
};*/

var parseInputToCommand = (input) => {
	var splitInput = input.split(" ");
	var command = splitInput[0];
	var args = splitInput.slice(1);
	return [
		command,
		args
	];
};

var execCmd = (data, cmdPld) => {
	if (global.cmds[cmdPld[0]]) {
		if (!global.cmds[cmdPld[0]].fn) {
			console.error(cmdPld[0] + " is improperly formatted command: no member fn.");
			return;
		}
		global.cmds[cmdPld[0]].fn(data, cmdPld.slice(1));
	} else {
		console.error(cmdPld[0] + " is not a function");
	}
}

const args = process.argv.slice(2);

var data = fs.readFileSync(path.resolve(args[0]), {
	encoding: "utf-8",
	flag: "r"
});

data = JSON.parse(data);

global.dataPointer = "";

while (true) {
	var i = readline.question(global.commandPrompt);
	var pr = parseInputToCommand(i);
	execCmd(data, pr);
}