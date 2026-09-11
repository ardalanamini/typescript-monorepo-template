# Agents Guidelines

This document outlines the guidelines that must be followed by the agents working on this project.

## Code changes

This section outlines the steps to take in case of making code changes.

### After making code changes

- Run `pnpm lint:fix --format=agent`.

### Before considering the task finished

- Run `pnpm lint:fix --deny-warnings --format=agent` and ensure the linter does not report any errors.
- Run `pnpm test:coverage --reporter=minimal` and ensure the tests pass and coverage is at least 80%.
