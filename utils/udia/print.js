const print = (data, path) => {
	var args = path[0];
	if (args.length != 1) {
		console.error("print: invalid args.");
		return -1;
	}
	console.log(args);
};

module.exports = print;