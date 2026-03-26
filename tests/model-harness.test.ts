import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { FIREWORKS_SERVERLESS_MODELS } from "../src/model/fireworks-catalog.js";
import { resolveInitialPrompt } from "../src/cli.js";
import { buildModelStatusSnapshotFromRecords, chooseRecommendedModel } from "../src/model/catalog.js";
import { setDefaultModelSpec } from "../src/model/commands.js";

function createAuthPath(contents: Record<string, unknown>): string {
	const root = mkdtempSync(join(tmpdir(), "feynman-auth-"));
	const authPath = join(root, "auth.json");
	writeFileSync(authPath, JSON.stringify(contents, null, 2) + "\n", "utf8");
	return authPath;
}

test("chooseRecommendedModel prefers the strongest authenticated research model", () => {
	const authPath = createAuthPath({
		openai: { type: "api_key", key: "openai-test-key" },
		anthropic: { type: "api_key", key: "anthropic-test-key" },
	});

	const recommendation = chooseRecommendedModel(authPath);

	assert.equal(recommendation?.spec, "anthropic/claude-opus-4-6");
});

test("setDefaultModelSpec accepts a unique bare model id from authenticated models", () => {
	const authPath = createAuthPath({
		openai: { type: "api_key", key: "openai-test-key" },
	});
	const settingsPath = join(mkdtempSync(join(tmpdir(), "feynman-settings-")), "settings.json");

	setDefaultModelSpec(settingsPath, authPath, "gpt-5.4");

	const settings = JSON.parse(readFileSync(settingsPath, "utf8")) as {
		defaultProvider?: string;
		defaultModel?: string;
	};
	assert.equal(settings.defaultProvider, "openai");
	assert.equal(settings.defaultModel, "gpt-5.4");
});

test("buildModelStatusSnapshotFromRecords flags an invalid current model and suggests a replacement", () => {
	const snapshot = buildModelStatusSnapshotFromRecords(
		[
			{ provider: "anthropic", id: "claude-opus-4-6" },
			{ provider: "openai", id: "gpt-5.4" },
		],
		[{ provider: "openai", id: "gpt-5.4" }],
		"anthropic/claude-opus-4-6",
	);

	assert.equal(snapshot.currentValid, false);
	assert.equal(snapshot.recommended, "openai/gpt-5.4");
	assert.ok(snapshot.guidance.some((line) => line.includes("Configured default model is unavailable")));
});

test("Fireworks provider only exposes vetted serverless models", () => {
	const ids = FIREWORKS_SERVERLESS_MODELS.map((model) => model.id);

	assert.deepEqual(ids, [
		"accounts/fireworks/models/glm-5",
		"accounts/fireworks/models/glm-4p7",
		"accounts/fireworks/models/kimi-k2-instruct-0905",
		"accounts/fireworks/models/kimi-k2-thinking",
		"accounts/fireworks/models/kimi-k2p5",
		"accounts/fireworks/models/deepseek-v3p1",
		"accounts/fireworks/models/deepseek-v3p2",
		"accounts/fireworks/models/qwen3-8b",
		"accounts/fireworks/models/qwen3-vl-235b-a22b-instruct",
		"accounts/fireworks/models/qwen3-vl-30b-a3b-instruct",
		"accounts/fireworks/models/qwen3-vl-30b-a3b-thinking",
		"accounts/fireworks/models/minimax-m2p1",
		"accounts/fireworks/models/minimax-m2p5",
		"accounts/fireworks/models/gpt-oss-120b",
		"accounts/fireworks/models/gpt-oss-20b",
	]);
	assert.ok(!ids.includes("accounts/fireworks/models/mixtral-8x7b-instruct"));
	assert.ok(!ids.includes("accounts/fireworks/models/kimi-k2-instruct"));
	assert.ok(!ids.includes("accounts/fireworks/models/minimax-m1"));
});

test("resolveInitialPrompt maps top-level research commands to Pi slash workflows", () => {
	const workflows = new Set(["lit", "watch", "jobs", "deepresearch"]);
	assert.equal(resolveInitialPrompt("lit", ["tool-using", "agents"], undefined, workflows), "/lit tool-using agents");
	assert.equal(resolveInitialPrompt("watch", ["openai"], undefined, workflows), "/watch openai");
	assert.equal(resolveInitialPrompt("jobs", [], undefined, workflows), "/jobs");
	assert.equal(resolveInitialPrompt("chat", ["hello"], undefined, workflows), "hello");
	assert.equal(resolveInitialPrompt("unknown", ["topic"], undefined, workflows), "unknown topic");
});
