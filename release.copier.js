const fs = require("fs");
const path = require("path");

const options = {
  packagePath: "package.json",
  manifestPath: "manifest.json",
  distDir: "./dist",
  sourcePath: "./",
  ignoreFilePath: ".ignoreme",
  verbose: true,
};

function log(message) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${message}`);
}

function shouldIgnore(relativePath, ignorePatterns) {
  if (!relativePath) return false;
  return ignorePatterns.some((pattern) => {
    if (pattern === relativePath) return true;
    if (pattern.endsWith("/*") && relativePath.startsWith(pattern.slice(0, -1))) return true;
    if (pattern.startsWith("*.") && relativePath.endsWith(pattern.slice(1))) return true;
    const regexPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
    return new RegExp(`^${regexPattern}$`).test(relativePath);
  });
}

function copyFilesRecursively(source, destination, ignorePatterns, baseSource) {
  if (!fs.existsSync(source)) {
    console.error(`Source path does not exist: ${source}`);
    return;
  }
  const stats = fs.statSync(source);
  const relativePath = path.relative(baseSource, source);
  if (shouldIgnore(relativePath, ignorePatterns)) {
    if (options.verbose) log(`Skipping ignored path: ${source}`);
    return;
  }
  if (stats.isDirectory()) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
      if (options.verbose) log(`Created directory: ${destination}`);
    }
    fs.readdirSync(source).forEach((file) => {
      copyFilesRecursively(path.join(source, file), path.join(destination, file), ignorePatterns, baseSource);
    });
  } else if (stats.isFile()) {
    fs.copyFileSync(source, destination);
    log(`Copied file: ${source} -> ${destination}`);
  }
}

function cleanFolder(folder) {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
}

function main(timestart) {
  return () => {
    const packageFile = fs.readFileSync(options.packagePath);
    const packageJson = JSON.parse(packageFile);
    const releaseDir = `./release/${packageJson.name}-${packageJson.version}`;
    log(`Release directory: ${releaseDir}`);

    cleanFolder(releaseDir);

    let ignorePatterns = [];
    if (fs.existsSync(options.ignoreFilePath)) {
      const ignoreContent = fs.readFileSync(options.ignoreFilePath, "utf8");
      ignorePatterns = ignoreContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"));
      if (options.verbose) log(`Loaded ${ignorePatterns.length} ignore patterns from ${options.ignoreFilePath}`);
    }

    copyFilesRecursively(options.sourcePath, releaseDir, ignorePatterns, options.sourcePath);

    log(`Release folder created and files copied successfully\nFinished in ${(new Date() - timestart)} ms`);
  };
}

module.exports = main;