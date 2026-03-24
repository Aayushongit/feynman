---
description: Compare multiple sources on a topic and produce a source-grounded matrix of agreements, disagreements, and confidence.
args: <topic>
section: Research Workflows
topLevelCli: true
---
Compare sources for: $@

Requirements:
- Before starting, outline the comparison plan: which sources to compare, which dimensions to evaluate, expected output structure. Present the plan to the user and confirm before proceeding.
- Use the `researcher` subagent to gather source material when the comparison set is broad, and the `verifier` subagent to verify sources and add inline citations to the final matrix.
- Build a comparison matrix covering: source, key claim, evidence type, caveats, confidence.
- Generate charts with `pi-charts` when the comparison involves quantitative metrics. Use Mermaid for method or architecture comparisons.
- Distinguish agreement, disagreement, and uncertainty clearly.
- Save exactly one comparison to `outputs/` as markdown.
- End with a `Sources` section containing direct URLs for every source used.
