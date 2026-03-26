import test from "node:test";
import assert from "node:assert/strict";

import { buildPiArgs, buildPiEnv, resolvePiPaths } from "../src/pi/runtime.js";

test("buildPiArgs includes configured runtime paths and prompt", () => {
	const args = buildPiArgs({
		appRoot: "/repo/feynman",
		workingDir: "/workspace",
		sessionDir: "/sessions",
		feynmanAgentDir: "/home/.feynman/agent",
		initialPrompt: "hello",
		explicitModelSpec: "openai:gpt-5.4",
		thinkingLevel: "medium",
	});

	assert.deepEqual(args, [
		"--session-dir",
		"/sessions",
		"--extension",
		"/repo/feynman/extensions/research-tools.ts",
		"--extension",
		"/repo/feynman/extensions/fireworks-provider.ts",
		"--prompt-template",
		"/repo/feynman/prompts",
		"--model",
		"openai:gpt-5.4",
		"--thinking",
		"medium",
		"hello",
	]);
});

test("buildPiEnv wires Feynman paths into the Pi environment", () => {
	const originalUpper = process.env.NPM_CONFIG_PREFIX;
	const originalLower = process.env.npm_config_prefix;
	delete process.env.NPM_CONFIG_PREFIX;
	delete process.env.npm_config_prefix;

	try {
		const env = buildPiEnv({
			appRoot: "/repo/feynman",
			workingDir: "/workspace",
			sessionDir: "/sessions",
			feynmanAgentDir: "/home/.feynman/agent",
			feynmanVersion: "0.1.5",
		});

		assert.equal(env.FEYNMAN_SESSION_DIR, "/sessions");
		assert.equal(env.FEYNMAN_BIN_PATH, "/repo/feynman/bin/feynman.js");
		assert.equal(env.FEYNMAN_MEMORY_DIR, "/home/.feynman/memory");
		assert.equal(env.FEYNMAN_NPM_PREFIX, "/home/.feynman/npm-global");
		assert.equal(env.NPM_CONFIG_PREFIX, "/home/.feynman/npm-global");
		assert.equal(env.npm_config_prefix, "/home/.feynman/npm-global");
		assert.ok(
			env.PATH?.startsWith(
				"/repo/feynman/node_modules/.bin:/repo/feynman/.feynman/npm/node_modules/.bin:/home/.feynman/npm-global/bin:",
			),
		);
	} finally {
		if (originalUpper === undefined) {
			delete process.env.NPM_CONFIG_PREFIX;
		} else {
			process.env.NPM_CONFIG_PREFIX = originalUpper;
		}
		if (originalLower === undefined) {
			delete process.env.npm_config_prefix;
		} else {
			process.env.npm_config_prefix = originalLower;
		}
	}
});

test("resolvePiPaths includes the Promise.withResolvers polyfill path", () => {
	const paths = resolvePiPaths("/repo/feynman");

	assert.equal(paths.promisePolyfillPath, "/repo/feynman/dist/system/promise-polyfill.js");
});
