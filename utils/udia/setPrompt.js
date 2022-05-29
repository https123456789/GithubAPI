const setPrompt = (data, path) => {
	var args = path[0];
	if (!args[0]) {
		console.error("Invalid args.");
		return;
	}
	global.commandPrompt = args[0];
}

module.exports = {
	fn: setPrompt,
	help: "Changes the prompt",
	args: [
		{
			name: "value",
			required: true
		}
	]
};