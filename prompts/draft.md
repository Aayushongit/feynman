---
description: Turn research findings into a polished paper-style draft with equations, sections, and explicit claims.
args: <topic>
section: Research Workflows
topLevelCli: true
---
Write a paper-style draft for: $@

Requirements:
- Before writing, outline the draft structure: proposed title, sections, key claims to make, and source material to draw from. Present the outline to the user and confirm before proceeding.
- Use the `writer` subagent when the draft should be produced from already-collected notes, then use the `verifier` subagent to add inline citations and verify sources.
- Include at minimum: title, abstract, problem statement, related work, method or synthesis, evidence or experiments, limitations, conclusion.
- Use clean Markdown with LaTeX where equations materially help.
- Generate charts with `pi-charts` for quantitative data, benchmarks, and comparisons. Use Mermaid for architectures and pipelines. Every figure needs a caption.
- Save exactly one draft to `papers/` as markdown.
- End with a `Sources` appendix with direct URLs for all primary references.
