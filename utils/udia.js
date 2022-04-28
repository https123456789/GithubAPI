const fs = require("fs");
const path = require("path");
var readline = require('readline-sync');

global.cmds = {
	print: require("./udia/print.js"),
	reload: require("./udia/reload.js")
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
		console.error(cmdPld[0] + " is not a function");
	}
}

const args = process.argv.slice(2);

var data = fs.readFileSync(path.resolve(args[0]), {
	encoding: "utf-8",
	flag: "r"
});

data = JSON.parse(data);

while (true) {
	var i = readline.question(":");
	var pr = parseInputToCommand(i);
	execCmd(data, pr);
}