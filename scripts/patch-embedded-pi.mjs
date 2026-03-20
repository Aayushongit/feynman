import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const piPackageRoot = resolve(appRoot, "node_modules", "@mariozechner", "pi-coding-agent");
const packageJsonPath = resolve(piPackageRoot, "package.json");
const cliPath = resolve(piPackageRoot, "dist", "cli.js");

if (existsSync(packageJsonPath)) {
	const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
	if (pkg.piConfig?.name !== "feynman") {
		pkg.piConfig = {
			...(pkg.piConfig || {}),
			name: "feynman",
		};
		writeFileSync(packageJsonPath, JSON.stringify(pkg, null, "\t") + "\n", "utf8");
	}
}

if (existsSync(cliPath)) {
	const cliSource = readFileSync(cliPath, "utf8");
	if (cliSource.includes('process.title = "pi";')) {
		writeFileSync(cliPath, cliSource.replace('process.title = "pi";', 'process.title = "feynman";'), "utf8");
	}
}
