const setPrompt = (data, path) => {
	var args = path[0];
	global.commandPrompt = args[0];
}

module.exports = setPrompt;