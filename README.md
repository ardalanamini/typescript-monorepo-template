# TypeScript Monorepo Template

## Initialize your project

After creating a repository from this template, open it in your preferred AI agent client and invoke the project-local [init-template skill](.agents/skills/init-template/SKILL.md):

```text
$init-template Set up this repository as "Acme Platform", with package name @acme/platform,
repository acme/platform, description "Shared services for Acme", and code owner @acme/maintainers.
```

The skill updates project names and metadata, removes template-specific content, runs the repository checks, and removes itself and this section when initialization succeeds. Review and commit the resulting changes.

## 3rd Party Agent Skills Reference

- Included:
  - [karpathy-guidelines](.agents/skills/karpathy-guidelines/SKILL.md) is copied from [andrej-karpathy-skills GitHub repository](https://github.com/multica-ai/andrej-karpathy-skills)
- Recommended:
  - [ponytail](https://ponytail.dev)
  - [caveman](https://www.getcaveman.dev)

## AI Contributions

If you are an AI agent contributing to this project, please refer to [AGENTS.md](./AGENTS.md) for guidelines that must be followed.
