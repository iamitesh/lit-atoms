# Contributing to lit-atoms

Thank you for your interest in contributing to lit-atoms! This document provides guidelines and conventions for contributing to this UI library.

## Table of Contents

- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit and Merge Practices](#commit-and-merge-practices)
- [Release Process](#release-process)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Workflow](#development-workflow)

## Branch Naming Conventions

We use a structured branch naming convention to maintain clarity and enable automation. All feature branches should follow the pattern: `type/short-description` with a numeric ID when available.

### Branch Types

| Type | Purpose | Example |
|------|---------|---------|
| `story/` | User stories and new features | `story/1234-add-icon-button` |
| `bug/` | Bug fixes | `bug/2345-fix-hover-color` |
| `enabler/` | Technical improvements, refactoring, tech debt | `enabler/3456-upgrade-rollup` |
| `hotfix/` | Urgent fixes off stable branches | `hotfix/5.6.3-fix-build` |
| `copilot/` | Copilot-assisted development tasks | `copilot/add-feature` |
| `feature/` | Feature development branches | `feature/new-component` |
| `release/` | Release branch lines | `release/5.6.x` |
| `stable/` | Stable long-lived branches | `stable/5.n.0` |

### Branch Naming Examples

✅ **Good Examples:**
```
story/1234-add-icon-button
bug/2345-fix-hover-color
enabler/3456-upgrade-rollup
hotfix/5.6.3-fix-build
copilot/add-feature
feature/new-component
story/add-tooltip-component
bug/calendar-date-picker-crash
```

❌ **Bad Examples:**
```
fix-bug (missing type and description)
john-working-branch (not descriptive)
TICKET-1234 (wrong format)
```

### Protected Branches

The following branches are protected and cannot accept direct pushes:
- `main` - Integration branch for ongoing development
- `stable/*` - Stable release lines (e.g., `stable/5.n.0`)
- `release/*` - Active release lines (e.g., `release/5.6.x`)

All changes to protected branches must go through pull requests with required reviews and passing checks.

## Commit and Merge Practices

### Merge Policy

1. **Squash Merges**: All feature branches are squashed into a single commit when merged to keep history clean and linear.

2. **Pull Request Required**: Direct pushes to `main`, `stable/*`, and `release/*` are blocked. All changes must go through pull requests.

3. **Review Required**: At least 1 approval from a team member is required before merging.

4. **Status Checks Required**: All CI/CD checks must pass before merging:
   - Build must succeed
   - Tests must pass
   - Linting must pass
   - No security vulnerabilities

5. **Linear History**: Merge commits are not allowed. The repository enforces a linear history through squash merges.

6. **Branch Cleanup**: Feature branches are automatically deleted after merge to keep the repository clean.

### Commit Message Guidelines

Write clear, concise commit messages:

```
Add icon button component

- Implement IconButton with Lit
- Add Storybook documentation
- Include unit tests
```

For squashed commits, the PR title becomes the commit message, so make your PR titles descriptive.

## Release Process

Our release process follows a structured branching strategy aligned with semantic versioning:

### Branch Strategy

```
main (development)
  ↓
release/5.6.x (minor release line)
  ↓
stable/5.n.0 (stable line)
```

### Release Workflow

1. **Development**: All new features and non-critical bug fixes are developed against `main`.

2. **Release Branch**: When preparing a new minor release, create a `release/X.Y.x` branch from `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b release/5.7.x
   ```

3. **Release Stabilization**: 
   - Critical bug fixes can be cherry-picked to the release branch
   - No new features are added during stabilization
   - Version bumps and changelog updates happen here

4. **Tagging**: Create version tags from the release branch:
   ```bash
   git tag -a v5.7.0 -m "Release 5.7.0"
   git push origin v5.7.0
   ```

5. **Stable Line**: After a successful release, the release branch can be merged to stable:
   ```bash
   git checkout stable/5.n.0
   git merge release/5.7.x
   ```

6. **Backport to Main**: Important fixes from release branches should be merged back to `main`:
   ```bash
   git checkout main
   git merge release/5.7.x
   ```

### Hotfix Process

For urgent production fixes:

1. Branch from the appropriate `stable/*` branch:
   ```bash
   git checkout stable/5.n.0
   git checkout -b hotfix/5.6.3-fix-critical-bug
   ```

2. Make the fix and create a PR targeting the stable branch

3. After merging, create a patch tag:
   ```bash
   git tag -a v5.6.3 -m "Hotfix 5.6.3"
   ```

4. Cherry-pick or merge the fix to relevant release branches and `main`

## Pull Request Guidelines

### Before Creating a PR

- [ ] Your branch follows the naming convention
- [ ] Code builds successfully
- [ ] All tests pass
- [ ] Code is properly linted
- [ ] You've added tests for new functionality
- [ ] Documentation is updated (if applicable)

### PR Description

Use the PR template to provide:
- Clear description of the changes
- Link to related issue or ticket
- Screenshots for UI changes
- Testing instructions
- Breaking changes (if any)

### Review Process

1. **Self-Review**: Review your own code before requesting reviews
2. **Request Reviews**: Tag relevant team members
3. **Address Feedback**: Respond to all review comments
4. **Keep PR Updated**: Rebase or merge latest changes from target branch
5. **Final Check**: Ensure all checks pass before merging

### Merging

Once approved and all checks pass:
1. Use "Squash and merge" option
2. Ensure the commit message is clear and descriptive
3. Delete the source branch (automated)

## Development Workflow

### Setting Up

1. Clone the repository:
   ```bash
   git clone https://github.com/iamitesh/lit-atoms.git
   cd lit-atoms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your feature branch:
   ```bash
   git checkout -b story/123-your-feature
   ```

### Development

1. Make your changes
2. Test locally:
   ```bash
   npm run build
   npm run test
   npm run storybook
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

### Creating a Pull Request

1. Push your branch:
   ```bash
   git push origin story/123-your-feature
   ```

2. Go to GitHub and create a pull request
3. Fill out the PR template
4. Request reviews from team members
5. Address any feedback
6. Wait for approval and passing checks
7. Merge using "Squash and merge"

## Code Quality Standards

- Follow TypeScript best practices
- Write meaningful tests for new functionality
- Ensure components work across modern browsers
- Document components in Storybook
- Follow existing code style and patterns
- Keep components focused and reusable

## Questions?

If you have questions about contributing, please:
- Check existing issues and PRs
- Review our documentation
- Ask in pull request comments
- Contact the maintainers

Thank you for contributing to lit-atoms! 🎉
