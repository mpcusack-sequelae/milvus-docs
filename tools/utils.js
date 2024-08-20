import fs from "fs";
import path from "path";
import { Milvus } from "@zilliz/toolkit";

/**
 * Each branch needs to be updated.
 */
const VERSION = "v2.4.x";
const PATH = "/docs/";

export function traverseDirectory(dirPath, fileList = []) {
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
export function mkdir(filePath) {
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

export function renderDocHTML(content) {
	const { tree } = Milvus.md2html(content, {
		showAnchor: true,
		version: VERSION,
		path: PATH,
	});
	return tree;
}

export async function translate(params) {
	const { text, sourceLang = "EN", targetLang } = params;
	// Translation logic
	return text;
}

export function separateYamlAndContent(markdown) {
	const frontMatterRegex = /^---\s*([\s\S]*?)\s*---/;

	const match = markdown.match(frontMatterRegex);

	let frontMatter = "";
	let body = "";

	if (match) {
		frontMatter = match[1].trim();
		body = markdown.slice(match[0].length).trim();
	} else {
		body = markdown.trim();
	}

	return {
		frontMatter,
		body,
	};
}
