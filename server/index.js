const express = require("express");
const fs = require("fs");
const axios = require("axios");
const { exec } = require("child_process");
var core = require("./core.js");

var basicHandle = (req, res, next) => {
	// Runs for every request
	res.set("content-type", "application/json");
	res.set("access-control-allow-origin", "*");
	console.log("Request for " + req.path);
	next();
};

var sendDataFromFile = (path, req, res) => {
	// Sends data read from a file directly to the response
	res.set("content-type", "application/json");
	// Read the file
	fs.readFile(path, "utf-8", (err, data) => {
		if (err) {
			// Errors
			console.error(err);
			res.status = 500;
			res.send(JSON.stringify(
				core
					.server
					.responses
					.internalError,
				null,
				4
			));
			return;
		}
		// Data
		res.status = 200;
		var d = JSON.parse(data);
		d = JSON.stringify(d, null, 4);
		res.send(d);
	});
	return;
};

var retriveGithubAPIData = (path, method) => {
	console.log("Fetching Github API data for " + path + "...");
	var reqOpts = {
		hostname: "api.github.com",
		port: 443,
		path: path,
		method: method
	};
	console.log(`${method} api.github.com${path}:`);
	var resData = null;
	switch (method) {
		case "GET":
		case "get":
			return axios.get(`https://api.github.com${path}`)
			break;
	}
};

var saveData = (fn, data) => {
	fs.writeFileSync(__dirname + "/" + fn, JSON.stringify(data, null, "\t"));
	return;
}

var app = express();
app.use(basicHandle);

app.get("/", (req, res) => {
	sendDataFromFile(__dirname + "/../data/generic.json", req, res);
});

app.get("/github*", (req, res) => {
	res.set("content-type", "application/json");
	try {
		var data = fs.readFileSync(__dirname + "/../data/generic.json", "utf-8");
	} catch (err) {
		console.error(err);
	}
	data = JSON.parse(data);
	var path = req.path;
	path = path.slice(7);
	var queryKeys = Object.keys(req.query);
	var getQueryString = "";
	for (var i = 0; i < queryKeys.length; i++) {
		if (i == 0) {
			getQueryString += "?";
		} else {
			getQueryString += "&";
		}
		getQueryString += queryKeys[i] + "=" + req.query[queryKeys[i]];
	}
	path = path + getQueryString;
	var currentTime = Math.floor(new Date().getTime() / 1000);
	var needToGetData = false;
	var timeNeed = false;
	/*if ((currentTime % data.updater.interval) == 0) {
		timeNeed = true;
	}*/
	var cachedFileExists = false;
	try {
		var p = path.replaceAll("/", "%");
		var fe = fs.existsSync("/home/runner/GithubAPI/cache/github/GET/" + p);
		cachedFileExists = fe;
	} catch(err) {
		cachedFileExists = false;
	}
	if (data.GETPathUpdates[path]) {
		var pd = data.GETPathUpdates[path];
		if (currentTime > (pd.time + pd.interval)) {
			timeNeed = true;
		}
	} else {
		// Generate the path update data
		data.GETPathUpdates[path] = {
			time: currentTime,
			interval: data.updater.interval,
			method: "GET"
		}
		saveData("../data/generic.json", data);
		timeNeed = true;
	}
	if (timeNeed || !cachedFileExists) {
		needToGetData = true;
	}
	var dd = "" + (currentTime % data.updater.interval);
	if (needToGetData) {
		data.GETPathUpdates[path].time = currentTime;
		saveData("../data/generic.json", data);
		dd = retriveGithubAPIData(path, "GET")
			.then((resp) => {
				var resetDate = new Date(resp.headers["x-ratelimit-reset"] * 1000);
				console.log(`\tStatus: ${resp.status} - ${resp.statusText}`);
				console.log(`\tContent Type: ${resp.headers["content-type"]}`);
				console.log(`\tRate Limit:\n\t\tMax: ${resp.headers["x-ratelimit-limit"]}\n\t\tRemaining: ${resp.headers["x-ratelimit-remaining"]}\n\t\tReset: ${resetDate.toLocaleString()} (now ${(new Date()).toLocaleString()})`);
				dd = resp.data;
				dd = JSON.stringify(dd, null, 4);
				// Save data to cache
				fs.writeFile("/home/runner/GithubAPI/cache/github/GET/" + (path.replaceAll("/", "%")), dd, (err) => {
					if (err) {
						console.error(err);
					}
					res.send(dd);
				})
			})
			.catch((err) => {
				var dd = err.response.data;
				dd = JSON.stringify(dd, null, 4);
				res.status = err.response.status;
				var resetDate = new Date(err.response.headers["x-ratelimit-reset"] * 1000);
				console.log(`\tStatus: ${err.response.status} - ${err.response.statusText}`);
				console.log(`\tContent Type: ${err.response.headers["content-type"]}`);
				console.log(`\tRate Limit:\n\t\tMax: ${err.response.headers["x-ratelimit-limit"]}\n\t\tRemaining: ${err.response.headers["x-ratelimit-remaining"]}\n\t\tReset: ${resetDate.toLocaleString()} (now ${(new Date()).toLocaleString()})`);
				fs.writeFile(
					"/home/runner/GithubAPI/cache/github/GET/" +
					(path.replaceAll("/", "%")),
					dd,
					(werr) => {
						if (werr) {
							console.error(werr);
						}
						core.cache.updater.lutSet(+(new Date()));
						res.send(dd);
				});
			});
	} else {
		var p = path.replaceAll("/", "%");
		fs.readFile("/home/runner/GithubAPI/cache/github/GET/" + p, "utf-8", (err, data) => {
			if (err) {
				console.log("r");
				console.error(err);
				var dd = JSON.stringify(
					core.server.responses.internalError,
					null,
					4
				);
			}
			var dd = data;
			res.send(dd);
		});
	}
});

app.listen(3000, () => {
	console.log("Server running in " + process.env.NODE_ENV + " mode.");
});