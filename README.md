# TypeScript Monorepo Template

## Initialize your project

After creating a repository from this template, open it in your preferred AI agent client and invoke the project-local [init-template skill](.agents/skills/init-template/SKILL.md):

```text
$init-template Set up this repository as "Acme Platform", with package name @acme/platform,
repository acme/platform, description "Shared services for Acme", and code owner @acme/maintainers.
```

The skill updates project names and metadata, removes template-specific content, runs the repository checks, and removes itself and this section when initialization succeeds. Review and commit the resulting changes.

## AI Contributions

If you are an AI agent contributing to this project, please refer to [AGENTS.md](./AGENTS.md) for guidelines that must be followed.
