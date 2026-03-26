import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

import { FIREWORKS_SERVERLESS_MODELS } from "../src/model/fireworks-catalog.js";

export { FIREWORKS_SERVERLESS_MODELS } from "../src/model/fireworks-catalog.js";

/**
 * Fireworks AI Provider Extension
 *
 * Registers Fireworks AI as a provider for Feynman.
 * Fireworks uses an OpenAI-compatible API at https://api.fireworks.ai/inference/v1
 *
 * Set FIREWORKS_API_KEY environment variable to authenticate.
 */
export default function fireworksProvider(pi: ExtensionAPI): void {
	pi.registerProvider("fireworks", {
		baseUrl: "https://api.fireworks.ai/inference/v1",
		apiKey: "FIREWORKS_API_KEY",
		api: "openai-completions",
		models: FIREWORKS_SERVERLESS_MODELS,
	});
}
