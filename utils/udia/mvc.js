const mvc = (data, path) => {
	var args = path[0];
	global.dataPointer = args[0];
}

module.exports = {
	fn: mvc
};