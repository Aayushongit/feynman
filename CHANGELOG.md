# CHANGELOG

Workspace lab notebook for long-running or resumable research work.

Use this file to track chronology, not release notes. Keep entries short, factual, and operational.

## Entry template

### YYYY-MM-DD HH:MM TZ — [slug or objective]

- Objective: ...
- Changed: ...
- Verified: ...
- Failed / learned: ...
- Blockers: ...
- Next: ...

### 2026-03-25 00:00 local — scaling-laws

- Objective: Set up a deep research workflow for scaling laws.
- Changed: Created plan artifact at `outputs/.plans/scaling-laws.md`; defined 4 disjoint researcher dimensions and acceptance criteria.
- Verified: Read `CHANGELOG.md` and checked prior memory for related plan `scaling-laws-implications`.
- Failed / learned: No prior run-specific changelog entries existed beyond the template.
- Blockers: Waiting for user confirmation before launching researcher round 1.
- Next: On confirmation, spawn 4 parallel researcher subagents and begin evidence collection.

### 2026-03-25 00:30 local — scaling-laws (T4 inference/time-scale pass)

- Objective: Complete T4 on inference/test-time scaling and reasoning-time compute, scoped to 2023–2026.
- Changed: Wrote `notes/scaling-laws-research-inference.md`; updated `outputs/.plans/scaling-laws.md` to mark T4 done and log the inference-scaling verification pass.
- Verified: Cross-read 13 primary/official sources covering Tree-of-Thoughts, PRMs, repeated sampling, compute-optimal test-time scaling, provable laws, o1, DeepSeek-R1, s1, verifier failures, Anthropic extended thinking, and OpenAI reasoning API docs.
- Failed / learned: OpenAI blog fetch for `learning-to-reason-with-llms` returned malformed content, so the note leans on the o1 system card and API docs instead of that blog post.
- Blockers: T2 and T5 remain open before final synthesis; no single unified law for inference-time scaling emerged from public sources.
- Next: Complete T5 implications synthesis, then reconcile T3/T4 with foundational T2 before drafting the cited brief.

### 2026-03-25 11:20 local — scaling-laws (T6 draft synthesis)

- Objective: Synthesize the four research notes into a single user-facing draft brief for the scaling-laws workflow.
- Changed: Wrote `outputs/.drafts/scaling-laws-draft.md` with an executive summary, curated reading list, qualitative meta-analysis, core-paper comparison table, explicit training-vs-inference distinction, and numbered inline citations with direct-URL sources.
- Verified: Cross-checked the draft against `notes/scaling-laws-research-foundations.md`, `notes/scaling-laws-research-revisions.md`, `notes/scaling-laws-research-inference.md`, and `notes/scaling-laws-research-implications.md` to ensure the brief explicitly states the literature is too heterogeneous for a pooled effect-size estimate.
- Failed / learned: The requested temp-run `context.md` and `plan.md` were absent, so the synthesis used `outputs/.plans/scaling-laws.md` plus the four note files as the working context.
- Blockers: Citation/claim verification pass still pending; this draft should be treated as pre-verification.
- Next: Run verifier/reviewer passes, then promote the draft into the final cited brief and provenance sidecar.

### 2026-03-25 11:28 local — scaling-laws (final brief + pdf)

- Objective: Deliver a paper guide and qualitative meta-analysis on AI scaling laws.
- Changed: Finalized `outputs/scaling-laws.md` and sidecar `outputs/scaling-laws.provenance.md`; rendered preview PDF at `outputs/scaling-laws.pdf`; updated plan ledger and verification log in `outputs/.plans/scaling-laws.md`.
- Verified: Ran a reviewer pass recorded in `notes/scaling-laws-verification.md`; spot-checked key primary papers via alpha-backed reads for Kaplan 2020, Chinchilla 2022, and Snell 2024; confirmed PDF render output exists.
- Failed / learned: A pooled statistical meta-analysis would be misleading because the literature mixes heterogeneous outcomes, scaling axes, and evaluation regimes; final deliverable uses a qualitative meta-analysis instead.
- Blockers: None for this brief.
- Next: If needed, extend into a narrower sub-survey (e.g. only pretraining laws, only inference-time scaling, or only post-Chinchilla data-quality revisions).

### 2026-03-25 14:52 local — skills-only-install

- Objective: Let users download the Feynman research skills without installing the full terminal runtime.
- Changed: Added standalone skills-only installers at `scripts/install/install-skills.sh` and `scripts/install/install-skills.ps1`; synced website-public copies; documented user-level and repo-local install flows in `README.md`, `website/src/content/docs/getting-started/installation.md`, and `website/src/pages/index.astro`.
- Verified: Ran `sh -n scripts/install/install-skills.sh`; ran `node scripts/sync-website-installers.mjs`; ran `cd website && npm run build`; executed `sh scripts/install/install-skills.sh --dir <tmp>` and confirmed extracted `SKILL.md` files land in the target directory.
- Failed / learned: PowerShell installer behavior was not executed locally because PowerShell is not installed in this environment.
- Blockers: None for the Unix installer flow; Windows remains syntax-only by inspection.
- Next: If users want this exposed more prominently, add a dedicated docs/reference page and a homepage-specific skills-only CTA instead of a text link.

### 2026-03-27 00:51 IST — env-secret-hardening

- Objective: Remove repository-level secret loading and sanitize env placeholders after an API key exposure scare.
- Changed: Stopped auto-loading `.env` from `src/cli.ts`; removed `dotenv` from `package.json`, `package-lock.json`, and `pnpm-lock.yaml`; tightened `.gitignore` to ignore `.env*` while keeping `.env.example`; updated `.env.example`, `README.md`, and `website/src/content/docs/getting-started/configuration.md` to keep provider variables as blank placeholders and direct real credentials to `~/.bashrc`.
- Verified: `git status` shows `.env` ignored and untracked; `npm test` passed with 27/27 tests; root runtime and lockfiles no longer reference `dotenv`.
- Failed / learned: `npm run typecheck` still fails due to a pre-existing type error in `extensions/fireworks-provider.ts` where `string[]` is assigned to `("text" | "image")[]`.
- Blockers: Remote remediation is still manual if a real key was already pushed to GitHub or used outside local `.env`.
- Next: Rotate the exposed provider keys immediately, purge any leaked secret from remote Git history if it was committed, and update deployment/provider settings to use shell or platform env vars only.
