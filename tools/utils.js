const fs = require("fs");
const path = require("path");

function traverseDirectory(dirPath, fileList = []) {
	const files = fs.readdirSync(dirPath);

	files.forEach((file) => {
		const filePath = path.join(dirPath, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			traverseDirectory(filePath, fileList);
		} else if (stats.isFile() && path.extname(file) === ".md") {
			fileList.push(filePath);
		}
	});

	return fileList;
}

const dirCache = {};
function mkdir(filePath) {
	const pathArr = filePath.split("/");
	let dir = pathArr[0];
	for (let i = 1; i < pathArr.length; i++) {
		if (!dirCache[dir] && !fs.existsSync(dir)) {
			dirCache[dir] = true;
			fs.mkdirSync(dir);
		}
		dir = path.join(dir, pathArr[i]);
	}
}

async function translate(params) {
	const { text, sourceLang = "EN", targetLang } = params;
	// Translation logic
	return text;
}

module.exports = { traverseDirectory, translate, mkdir };
