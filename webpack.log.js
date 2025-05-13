// Fixed webpack plugin that properly follows webpack plugin API
const fs = require("fs");
const path = require("path");

class WebpackReleasePlugin {
  constructor(options = {}) {
    this.options = {
      releaseDir: "./release/none",
      packagePath: "package.json",
      manifestPath: "manifest.json",
      distDir: "./dist",
      sourcePath: "./",
      ignoreFilePath: ".ignoreme",
      verbose: false,
      ...options,
    };

    const packageFile = fs.readFileSync(this.options.packagePath);
    const packageJson = JSON.parse(packageFile);

    this.options.releaseDir = `./release/${packageJson.name}-${packageJson.version}`;
    this.log(`saved to ${this.options.releaseDir}`);

    this.cleanDistFolder();
  }

  log(message) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${message}`);
  }

  apply(compiler) {
    // Log when compilation starts
    compiler.hooks.compile.tap("WebpackReleasePlugin", () => {
      this.log("start compile...");
    });

    // After emit hook is more appropriate for file operations
    compiler.hooks.afterEmit.tap("WebpackReleasePlugin", (compilation) => {
      this.log("compilation finished...");

      try {
        this.createReleaseFolder();
      } catch (error) {
        console.error("Error creating release folder:", error);
      }
    });
  }

  createReleaseFolder() {
    const { releaseDir, sourcePath, ignoreFilePath, verbose } = this.options;

    // Create release directory if it doesn't exist
    if (!fs.existsSync(releaseDir)) {
      fs.mkdirSync(releaseDir, { recursive: true });
      if (verbose) this.log(`Created release directory: ${releaseDir}`);
    }

    this.cleanReleaseFolder();

    // Read ignore file if it exists
    let ignorePatterns = [];
    if (fs.existsSync(ignoreFilePath)) {
      const ignoreContent = fs.readFileSync(ignoreFilePath, "utf8");
      ignorePatterns = ignoreContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"));

      if (verbose) console.log(`Loaded ${ignorePatterns.length} ignore patterns from ${ignoreFilePath}`);
    }

    // Copy files
    this.copyFilesRecursively(sourcePath, releaseDir, ignorePatterns);

    this.log(`Release folder created and files copied successfully`);
  }

  copyFilesRecursively(source, destination, ignorePatterns) {
    const { verbose } = this.options;

    // Check if source exists
    if (!fs.existsSync(source)) {
      console.error(`Source path does not exist: ${source}`);
      return;
    }

    // Get stats of the source path
    const stats = fs.statSync(source);

    // Get relative path for ignore pattern checking
    const relativePath = path.relative(this.options.sourcePath, source);

    // Check if the current path should be ignored
    if (this.shouldIgnore(relativePath, ignorePatterns)) {
      if (verbose) this.log(`Skipping ignored path: ${source}`);
      return;
    }

    // If source is a directory, create it in destination and recurse into its contents
    if (stats.isDirectory()) {
      const files = fs.readdirSync(source);

      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
        if (verbose) this.log(`Created directory: ${destination}`);
      }

      // Process each file/folder within this directory
      files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);
        this.copyFilesRecursively(sourcePath, destPath, ignorePatterns);
      });
    }
    // If it's a file, copy it if not ignored
    else if (stats.isFile()) {
      fs.copyFileSync(source, destination);
      this.log(`Copied file: ${source} -> ${destination}`);
    }
  }

  cleanReleaseFolder() {
    const { releaseDir } = this.options;
    if (fs.existsSync(releaseDir)) {
      fs.rmSync(releaseDir, { recursive: true, force: true });
    }
  }

  cleanDistFolder() {
    const { distDir } = this.options;
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }
  }

  shouldIgnore(relativePath, ignorePatterns) {
    if (!relativePath) return false;

    return ignorePatterns.some((pattern) => {
      // Handle exact matches
      if (pattern === relativePath) return true;

      // Handle directory wildcards (dir/*)
      if (pattern.endsWith("/*") && relativePath.startsWith(pattern.slice(0, -1))) return true;

      // Handle file extension wildcards (*.ext)
      if (pattern.startsWith("*.") && relativePath.endsWith(pattern.slice(1))) return true;

      // Handle simple glob patterns
      const regexPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");

      return new RegExp(`^${regexPattern}$`).test(relativePath);
    });
  }
}

module.exports = WebpackReleasePlugin;
