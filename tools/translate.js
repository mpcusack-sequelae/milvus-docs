const fs = require("fs");
const { traverseDirectory, translate, mkdir } = require("./utils");

const targetDirectory = "./site/en";
const sourceLang = "en";
const targetLangs = ["ja", "ko", "fr", "de", "it", "pt", "es", "zh"];
const cacheFile = "./tools/cache.json";

async function bootstrap() {
	const cache = fs.existsSync(cacheFile)
		? JSON.parse(fs.readFileSync(cacheFile, "utf8") || "{}")
		: {};

  // get all md files in the site/en/ directory
	const mdFiles = traverseDirectory(targetDirectory);

	console.log(`--> Found ${mdFiles.length} files...`);

	const updatedFiles = mdFiles.filter((path) => {
		const stats = fs.statSync(path);
		const modifiedTime = stats.mtime;
		return !cache[path] || new Date(cache[path]) < modifiedTime;
	});
	console.log(`--> ${updatedFiles.length} updated files`);

	for (let path of updatedFiles) {
		const content = fs.readFileSync(path, "utf8");

		for (let targetLang of targetLangs) {
			const translateContent = await translate({
				text: content,
				targetLang,
			});
			const targetFilePath = path.replace(sourceLang, targetLang);
			mkdir(targetFilePath);
			fs.writeFileSync(targetFilePath, translateContent, "utf8");
			console.info(
				`-> ${targetLang.toUpperCase()}: file translated successfully:`,
				targetFilePath
			);
		}

		cache[path] = new Date().toISOString();
	}

	fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), "utf8");
	console.log("--> Cache updated successfully");
}

bootstrap().catch(console.error);
