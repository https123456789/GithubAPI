const fs = require("fs");
const dir = require("node-dir");
const path = require("path");
const { exec } = require("child_process");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

var terminalSize = [
	process.stdout.columns,
	process.stdout.rows
];

process.stdout.on("resize", () => {
	terminalSize = [
		process.stdout.columns,
		process.stdout.rows
	];
})

function print(message) {
	process.stdout.clearLine();
	process.stdout.write("\r" + message);
}

async function handleFile(file) {
	file = path.relative(
		__dirname + "/cache",
		file
	);
	var rf = file;
	var outLen = 9;
	var dotdot = false;
	if (file.length + outLen > terminalSize[0]) {
		outLen += 3;
		file = file.slice(0, (terminalSize[0] - outLen));
		dotdot = true;
	}
	var intem = rf;
	rf = file;
	file = intem;
	file = file.replaceAll("github/", "");
	file = file.replaceAll("%", "/");
	var sf = file.split("/");
	sf.pop();
	sf = sf.join("/");
	exec("echo " + file + " > test");
	//print(file);
	exec("mkdir -p /home/runner/GithubAPI/cache/githubSorted" + sf, (err, stdout, stderr) => {
		if (err) throw err;
		if (stdout) console.log(stdout);
		if (stderr) console.log(stderr);
	});
	if (file.at(-1) != "/") {
		var cf = file.replaceAll("/", "%");
		exec("cp /home/runner/GithubAPI/cache/github/" + cf + " /home/runner/GithubAPI/cache/githubSorted" + file.split("%").at(-1), (err, stdout, stderr) => {
			if (err) throw err;
			if (stdout) console.log(stdout);
			if (stderr) console.log(stderr);
		})
	}
	/*console.log(
		file.length + outLen > terminalSize[0],
		file.length + outLen,
		terminalSize[0]
	);*/
	//print("Sorting " + file + ((dotdot) ? "..." : ""));
	await delay(100);
}

async function printProg(i, max, message) {
	var perc = 100 * (i / max);
	var intPerc = Math.floor(perc);
	print(intPerc + "% (" + i + "/" + max + ") " + message);
}

/*exec("rm -rf /home/runner/GithubAPI/cache/githubSorted && mkdir -p /home/runner/GithubAPI/cache/githubSorted", (err, stdout, stderr) => {
	if (err) throw err;
	if (stdout) console.log(stdout);
	if (stderr) console.log(stderr);
})*/

print("Starting sorting...\n");

dir.files(__dirname + "/cache/github", async (err, files) => {
	if (err) throw err;
	print("Found " + files.length + " files.\n");
	await delay(1000);
	var max = files.length;
	for (var i = 0; i < files.length; i++) {
		await printProg(i, max, "Sorting...");
		await handleFile(files[i]);
	}
	if (files.length > 0) {
		await printProg(max, max, "Sorted.\n");
	}
	print("Done.\n");
});