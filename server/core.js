const fs = require("fs");

var core = {
	server: {
		responses: {
			internalError: {
				error: true,
				message: "Internal error"
			}
		}
	},
	cache: {
		updater: {
			lutSet: (t) => {
				var d = {};
				//fs.writeFileSync("/home/runner/GithubAPI/data/generic.json", "utf-8", d);
			},
			lutGet: () => {
				var d = null;
				fs.readFileSync("/home/runner/GithubAPI/data/generic.json", "r");
			}
		}
	}
}

module.exports = core;