const print = (data, path) => {
	var args = path[0];
	if (args.length > 1) {
		console.error("print: invalid args.");
		return -1;
	}
	var cd = data;
	if (global.dataPointer != "") {
		var si = global.dataPointer.split(".");
		si.forEach((ci) => {
			cd = cd[ci];
		});
	}
	if (args.length == 0) {
		if (cd != data) {
			console.log("Scoped to '" + global.dataPointer + "'.");
		}
		console.log(cd);
		return;
	}
	var sa = args[0].split(".");
	sa.forEach((ci) => {
		cd = cd[ci];
	});
	console.log(cd);
};

module.exports = {
	fn: print,
	help: "Prints the current (possibly scoped) data.",
	args: [
		{
			name: "Data member",
			required: false,
			withoutAction: "Prints all data (possibly scoped)"
		}
	]
};