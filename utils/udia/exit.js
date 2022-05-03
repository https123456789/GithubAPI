const exit = (data, path) => {
	var args = path[0];
	console.log("Exiting (" + process.pid + ")...");
	process.exit(0);
}

module.exports = exit;