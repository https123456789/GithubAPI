const fs = require("fs");
const path = require("path");
var readline = require('readline-sync');

global.commandPrompt = "udia:";

global.cmds = {
	clear: require("./udia/clear.js"),
	exit: require("./udia/exit.js"),
	mvc: require("./udia/mvc.js"),
	print: require("./udia/print.js"),
	reload: require("./udia/reload.js"),
	setPrompt: require("./udia/setPrompt.js")
};

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
	try {
		global.cmds[cmdPld[0]](data, cmdPld.slice(1));
	} catch (err) {
		if (err.message == "global.cmds[cmdPld[0]] is not a function") {
			console.error(cmdPld[0] + " is not a function");
		} else {
			throw err;
		}
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