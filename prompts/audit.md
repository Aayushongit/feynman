---
description: Compare a paper's claims against its public codebase and identify mismatches, omissions, and reproducibility risks.
args: <item>
section: Research Workflows
topLevelCli: true
---
Audit the paper and codebase for: $@

Requirements:
- Before starting, outline the audit plan: which paper, which repo, which claims to check. Present the plan to the user and confirm before proceeding.
- Use the `researcher` subagent for evidence gathering and the `verifier` subagent to verify sources and add inline citations when the audit is non-trivial.
- Compare claimed methods, defaults, metrics, and data handling against the actual code.
- Call out missing code, mismatches, ambiguous defaults, and reproduction risks.
- Save exactly one audit artifact to `outputs/` as markdown.
- End with a `Sources` section containing paper and repository URLs.
