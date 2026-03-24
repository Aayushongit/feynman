---
description: Run a literature review on a topic using paper search and primary-source synthesis.
args: <topic>
section: Research Workflows
topLevelCli: true
---
Investigate the following topic as a literature review: $@

## Workflow

1. **Plan** — Outline the scope: key questions, source types to search (papers, web, repos), time period, and expected sections. Present the plan to the user and confirm before proceeding.
2. **Gather** — Use the `researcher` subagent when the sweep is wide enough to benefit from delegated paper triage before synthesis. For narrow topics, search directly.
2. **Synthesize** — Separate consensus, disagreements, and open questions. When useful, propose concrete next experiments or follow-up reading. Generate charts with `pi-charts` for quantitative comparisons across papers and Mermaid diagrams for taxonomies or method pipelines.
4. **Cite** — Spawn the `verifier` agent to add inline citations and verify every source URL in the draft.
5. **Verify** — Spawn the `reviewer` agent to check the cited draft for unsupported claims, logical gaps, and single-source critical findings. Fix FATAL issues before delivering. Note MAJOR issues in Open Questions.
6. **Deliver** — Save exactly one literature review to `outputs/` as markdown. Write a provenance record alongside it as `<filename>.provenance.md` listing: date, sources consulted vs. accepted vs. rejected, verification status, and intermediate research files used.
