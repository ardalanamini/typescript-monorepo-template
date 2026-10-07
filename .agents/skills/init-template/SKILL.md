---
name: init-template
description: Initialize a repository created from this TypeScript monorepo template by setting its project identity, replacing template metadata, and removing template-only instructions and this skill. Use for first-time template setup or resuming incomplete initialization, not routine package renames or maintenance of the template itself.
---

# Initialize the template

Turn this checkout into the user's project, leaving local changes ready for them to review and commit. Run from the repository root and follow its AGENTS.md. Read the working tree and preserve existing user edits, including partially completed initialization.

## Establish the project identity

Use values supplied by the user. Inspect `git remote -v` for the destination repository; do not treat an upstream template remote as the new identity. Ask together for missing details that cannot be reliably inferred:

- Project display name and a short description.
- Root npm package name, scoped or unscoped. Do not assume the npm scope equals the GitHub owner.
- Destination repository URL or GitHub owner/repository.
- GitHub users or teams for CODEOWNERS, or whether to remove the template ownership rule.
- Whether to keep or remove the optional Codecov integration, including its commented CI example. Ask explicitly unless the user has already supplied this choice; a commented step is not permission to delete it. While awaiting an answer, preserve it and continue independent initialization work.

A repository slug can supply a default display name; a description can simply use that name if none is provided. Check npm name syntax before editing manifests. Never invent an owner or retain a template owner as a default.

## Replace template identity

Inspect the current files before editing. The original values and locations are:

| Location | Template content | Action |
| --- | --- | --- |
| `package.json` | `@typescript-monorepo-org/typescript-monorepo-template` | Set `name` to the chosen npm package name. |
| `package.json` | `description`, `repository.url`, `bugs.url` | Set the project description and destination repository/issue URLs, preserving the repository object format. |
| `README.md` | `TypeScript Monorepo Template` | Set the title and add the project description; retain useful project guidance, including the AGENTS.md link. |
| `CODEOWNERS` | `* @ardalanamini` | Replace with the chosen owners, or remove this template rule if requested; delete the file only if nothing useful remains. |
| `.github/workflows/ci.yml` | Codecov upload step (initially commented) with `typescript-monorepo-org/typescript-monorepo-template` | Apply the user's Codecov choice as described below. |

Search tracked and non-ignored project files, including hidden files, for these old identifiers and title. Inspect matches in any added workspace manifests, internal imports, dependency names, and Nx project references; update related names consistently. Regenerate the lockfile with the repository's pinned pnpm version if dependency metadata changes.

Do not globally replace `ardalanamini` or the word `template`: `ardalanamini/auto-changelog@v5` in the release workflow is a third-party action, and dependency names containing `template` are not project branding. Preserve working tooling, CI/CD, workspace structure, AGENTS.md, and any license or attribution notices. Do not rename the checkout directory, change Git remotes/history, create or rename a hosted repository, commit, or push unless separately requested.

## Configure the chosen Codecov integration

If the user chooses **keep**:

- Retain the upload step after `pnpm test:coverage`. Preserve its enabled or commented state unless the user asks to enable or disable it; update commented YAML too.
- Replace the template `slug` with `${{ github.repository }}` for the repository running CI, or the explicitly chosen destination `owner/repository` if uploads intentionally target a different repository. The slug is not an npm package name or scope.
- Check the [official Codecov action documentation](https://github.com/codecov/codecov-action) for current supported inputs and action versions before making compatibility changes. Preserve a supported existing version and authentication method.
- Inspect the workspace test/coverage configuration. Ensure it emits a Codecov-supported report (for example, LCOV; add `lcov` to the existing Vitest coverage reporters if necessary, preserving other reporters). Let the uploader discover reports recursively from the repository root so it includes tested apps and packages. If existing `files`, `directory`, or `disable_search` inputs restrict discovery, update them to include the actual report locations across the monorepo; do not assume a single root `coverage` directory or pass unverified glob patterns as `files`.
- For token authentication, retain `${{ secrets.CODECOV_TOKEN }}` and tell the user to configure the destination repository's Codecov token as a GitHub Actions secret. Preserve existing OIDC authentication and its required `id-token: write` permission. Report any required external setup without claiming it has been completed.

If the user chooses **remove**, delete the Codecov upload step or commented example and remove only Codecov-specific configuration and documentation. Keep coverage generation, coverage thresholds, and tests.

Verify that the resulting workflow matches the user's choice and contains no template Codecov slug. Do not finish initialization or remove this skill while the choice is unanswered.

## Clean up and verify

Remove the README's template initialization section and any links or instructions invoking this skill. Remove other content only when it is specific to adopting the template; preserve user-added documentation and code.

Run the checks required by AGENTS.md:

```sh
pnpm lint:fix --deny-warnings --format=agent
pnpm test:coverage --reporter=minimal
```

Inspect the actual results, including the required 80% coverage. This template may have no workspace projects or tests yet: an Nx command reporting no targets is not evidence of test coverage. Report that limitation explicitly; do not invent tests or claim coverage passed. If checks fail, keep this skill available for resuming initialization and report the blocker.

After the applicable checks succeed, remove this skill's own directory, `.agents/skills/init-template`, as the final cleanup step. Do not delete sibling skills or the entire `.agents` directory. Inspect the final diff and search again for old project identifiers and dangling references to this skill, excluding Git internals, dependencies, caches, and generated artifacts. Explain any intentionally retained matches.

Summarize the chosen identity, cleanup, and actual validation results. Leave the changes uncommitted.
