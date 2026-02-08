# GitHub Conventions — Research Summary and Implementation Plan

This document provides a comprehensive guide for implementing GitHub conventions and automation for the lit-atoms UI library. It includes best-practice research findings and a step-by-step implementation plan.

---

## Research Summary

### Best-Practice Standards

This plan applies industry-standard GitHub conventions focusing on what GitHub natively supports today:

#### 1. Branch Protection Rules
Branch protection rules are the **primary control plane** for merge behavior in GitHub. They enforce:
- Required pull requests before merging
- Required reviews from team members
- Required status checks (CI/CD)
- Linear history enforcement
- Protection against force pushes
- Restricted push access to critical branches

#### 2. Merge Strategy Control
GitHub's repository settings allow fine-grained control over merge methods:
- **Squash merges** can be enforced by enabling "Allow squash merging" and disabling "Create a merge commit" and "Rebase and merge"
- This ensures all feature branches collapse to a single commit, maintaining clean history
- Squash merges work well with linear history requirements

#### 3. Automated Branch Cleanup
The **"Automatically delete head branches"** repository setting removes merged branches automatically:
- Keeps repository clean without manual intervention
- Reduces clutter and confusion
- Applies to all merged pull requests

#### 4. Required Status Checks
GitHub Actions and other CI/CD tools integrate as required status checks:
- Block merges until all checks pass (build, test, lint, security)
- Configurable per branch protection rule
- Supports multiple check requirements

#### 5. Linear History Enforcement
The **"Require linear history"** option prevents merge commits:
- Ensures a clean, readable commit history
- Works seamlessly with squash merge strategy
- Makes bisecting and reverting easier

#### 6. Templates for Standardization
GitHub supports built-in templates for consistency:
- **PR Templates** (`.github/PULL_REQUEST_TEMPLATE.md`) standardize pull request descriptions
- **Issue Templates** (`.github/ISSUE_TEMPLATE/`) guide bug reports, feature requests, and other issues
- Templates ensure all necessary information is captured

#### 7. Protected Release Branches
Release and stable branches should be protected:
- Block direct pushes; require PRs for all changes
- Maintain audit trail for production changes
- Enable controlled release process

---

## Implementation Plan

### 1. Branch Naming Convention

**Final Rules:**

Use the pattern: `type/short-description` with numeric IDs when available.

**Approved Types:**

| Type | Purpose | Pattern |
|------|---------|---------|
| `story/` | User stories and features | `story/[ID]-description` |
| `bug/` | Bug fixes | `bug/[ID]-description` |
| `enabler/` | Technical improvements | `enabler/[ID]-description` |
| `hotfix/` | Urgent fixes from stable | `hotfix/[version]-description` |
| `release/` | Release branch lines | `release/X.Y.x` |
| `stable/` | Stable long-lived branches | `stable/X.n.0` |

**Examples:**

```
✅ story/1234-add-icon-button
✅ story/add-tooltip-component
✅ bug/2345-fix-hover-color
✅ bug/calendar-date-picker-crash
✅ enabler/3456-upgrade-rollup
✅ enabler/refactor-theme-system
✅ hotfix/5.6.3-fix-build
✅ release/5.6.x
✅ stable/5.n.0

❌ feature/new-button (use 'story/')
❌ fix-bug (missing type)
❌ TICKET-1234 (wrong format)
❌ john-working (not descriptive)
```

---

### 2. Merge Policy

**Final Rules:**

1. **Default to Squash Merges**
   - All feature branches (`story/`, `bug/`, `enabler/`, `hotfix/`) are squashed into a single commit
   - PR title becomes the commit message
   - Keeps history clean and linear

2. **Require Pull Requests**
   - Direct pushes blocked to: `main`, `stable/*`, `release/*`
   - All changes go through PR review process
   - Maintains audit trail

3. **Review Requirements**
   - Minimum 1 approval required
   - Reviewers must have write access
   - Stale reviews dismissed on new commits (optional)

4. **Required Status Checks**
   - Build must pass
   - Tests must pass
   - Linting must pass
   - Branch name validation (via GitHub Action)
   - Security scanning (if configured)

5. **Linear History**
   - Enforce "Require linear history" on all protected branches
   - No merge commits allowed
   - Clean, bisectable commit history

6. **Automatic Branch Deletion**
   - Delete head branches after merge
   - Reduces repository clutter
   - Automatic cleanup

---

### 3. Release Flow

**Aligned with Current Branching Scheme:**

```
┌──────────────────────────────────────────────────────┐
│  main (development, integration branch)              │
│  • All new features developed here                   │
│  • Non-critical bug fixes                            │
└────────────────┬─────────────────────────────────────┘
                 │
                 │ Cherry-pick or backport
                 ↓
┌──────────────────────────────────────────────────────┐
│  release/5.6.x (minor release line)                  │
│  • Stabilization for release                         │
│  • Critical bug fixes only                           │
│  • Version bumps and tags                            │
└────────────────┬─────────────────────────────────────┘
                 │
                 │ Merge after release
                 ↓
┌──────────────────────────────────────────────────────┐
│  stable/5.n.0 (stable line)                          │
│  • Long-lived stable branch                          │
│  • Hotfix source                                     │
│  • Production reference                              │
└──────────────────────────────────────────────────────┘
```

**Process:**

1. **Normal Development**
   - Develop features in `story/` branches off `main`
   - Fix bugs in `bug/` branches off `main`
   - Technical improvements in `enabler/` branches off `main`
   - Merge to `main` via squash merge after PR approval

2. **Preparing a Release**
   - Create `release/X.Y.x` branch from `main`
   - Apply release-specific fixes via PR to release branch
   - No new features during stabilization
   - Update version numbers and changelog

3. **Tagging a Release**
   - Create annotated tag from `release/X.Y.x`:
     ```bash
     git tag -a vX.Y.Z -m "Release X.Y.Z"
     git push origin vX.Y.Z
     ```
   - Publish package to npm (if applicable)
   - Create GitHub release with notes

4. **Post-Release**
   - Merge `release/X.Y.x` to `stable/X.n.0`
   - Backport critical fixes to `main` if needed
   - Keep release branch for patch releases

5. **Hotfix Process**
   - Branch from `stable/X.n.0` as `hotfix/X.Y.Z-description`
   - Fix critical issue via PR to stable
   - Create patch tag: `vX.Y.Z`
   - Cherry-pick to `release/` and `main` as needed

---

### 4. GitHub Repository Settings

**Settings Checklist to Implement:**

#### A. General Settings

Navigate to: **Settings → General → Pull Requests**

- ✅ **Allow squash merging** ← Enable
  - Default commit message: "Pull request title"
  - This is the ONLY merge method enabled
- ❌ **Allow merge commits** ← Disable
- ❌ **Allow rebase merging** ← Disable
- ✅ **Automatically delete head branches** ← Enable

#### B. Branch Protection Rules

Navigate to: **Settings → Branches → Branch protection rules**

Create rules for:

**Rule 1: Protect `main` branch**

- Branch name pattern: `main`
- ✅ Require a pull request before merging
  - ✅ Require approvals: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require approval of the most recent reviewable push
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - Status checks required (add these as they are configured):
    - `build`
    - `test`
    - `lint`
    - `branch-name-check` (from GitHub Action)
- ✅ Require conversation resolution before merging
- ✅ Require linear history
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes ← Keep disabled
- ❌ Allow deletions ← Keep disabled

**Rule 2: Protect `release/*` branches**

- Branch name pattern: `release/*`
- Same settings as `main` branch above

**Rule 3: Protect `stable/*` branches**

- Branch name pattern: `stable/*`
- Same settings as `main` branch above
- Optional: Restrict who can push (limit to release managers)

#### C. GitHub Actions Permissions

Navigate to: **Settings → Actions → General**

- ✅ Allow all actions and reusable workflows
- ✅ Read and write permissions (for automated workflows)

---

### 5. Templates

#### A. Pull Request Template

Create: `.github/PULL_REQUEST_TEMPLATE.md`

Provides structure for all PRs with:
- Change description
- Related issue/ticket
- Type of change
- Testing checklist
- Screenshots (for UI)

#### B. Issue Templates

Create directory: `.github/ISSUE_TEMPLATE/`

Templates to create:

1. **Bug Report** (`bug_report.md`)
   - What went wrong
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

2. **Feature Request** (`feature_request.md`)
   - User story format
   - Problem description
   - Proposed solution
   - Alternatives considered

3. **Technical Improvement** (`technical_improvement.md`)
   - Current technical debt
   - Proposed improvement
   - Impact and benefits
   - Implementation approach

4. **Configuration** (`config.yml`)
   - Blank issues disabled
   - Template chooser enabled

---

### 6. Automation with GitHub Actions

#### A. Branch Name Validation

Create: `.github/workflows/branch-name-check.yml`

**Purpose:** Automatically validate branch names against conventions

**Triggers:** On pull request creation/update

**Validation Regex:**
```regex
^(story|bug|enabler|hotfix)\/[0-9]+-[a-z0-9-]+$ OR
^(story|bug|enabler)\/[a-z0-9-]+$ OR
^release\/\d+\.\d+\.x$ OR
^stable\/\d+\.n\.0$
```

**Action:** Fail the check if branch name doesn't match pattern

**Example Workflow:**
```yaml
name: Branch Name Check

on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  check-branch-name:
    runs-on: ubuntu-latest
    steps:
      - name: Check branch name
        run: |
          BRANCH="${{ github.head_ref }}"
          if [[ ! "$BRANCH" =~ ^(story|bug|enabler|hotfix)\/([0-9]+-)?[a-z0-9-]+$ ]] && \
             [[ ! "$BRANCH" =~ ^release\/[0-9]+\.[0-9]+\.x$ ]] && \
             [[ ! "$BRANCH" =~ ^stable\/[0-9]+\.n\.0$ ]]; then
            echo "Branch name '$BRANCH' does not follow conventions"
            exit 1
          fi
```

#### B. Other Recommended Automations

1. **Automated Labeling**
   - Auto-label PRs based on changed files
   - Example: PRs touching `src/components/` get "component" label

2. **Stale Issue/PR Management**
   - Close stale issues after 90 days of inactivity
   - Add "stale" label after 60 days

3. **Release Automation**
   - Auto-generate release notes from PRs
   - Update changelog on release tag creation

---

### 7. Documentation

#### A. CONTRIBUTING.md

Create comprehensive contributing guide covering:
- Branch naming conventions with examples
- Commit and merge practices
- Release process and workflow
- PR guidelines and checklist
- Development setup
- Code quality standards

Status: ✅ Created

#### B. README.md Update

Add section referencing conventions:
- Link to CONTRIBUTING.md
- Brief overview of development process
- How to report issues
- How to submit changes

#### C. Additional Documentation

Optional additions:
- `RELEASING.md` - Detailed release process for maintainers
- `SECURITY.md` - Security vulnerability reporting
- `CODE_OF_CONDUCT.md` - Community guidelines

---

## Implementation Checklist

### Phase 1: Documentation (Immediate)
- [x] Create CONTRIBUTING.md
- [ ] Update README.md with contribution section
- [ ] Create this GITHUB_CONVENTIONS.md document

### Phase 2: Templates (Day 1)
- [ ] Create `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] Create `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] Create `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] Create `.github/ISSUE_TEMPLATE/technical_improvement.md`
- [ ] Create `.github/ISSUE_TEMPLATE/config.yml`

### Phase 3: Automation (Day 1-2)
- [ ] Create `.github/workflows/branch-name-check.yml`
- [ ] Test branch name validation
- [ ] Add build workflow (if not exists)
- [ ] Add test workflow (if not exists)
- [ ] Add lint workflow (if not exists)

### Phase 4: Repository Settings (Day 2)
- [ ] Configure merge settings (squash only)
- [ ] Enable auto-delete branches
- [ ] Set up branch protection for `main`
- [ ] Set up branch protection for `release/*`
- [ ] Set up branch protection for `stable/*`
- [ ] Configure required status checks

### Phase 5: Team Communication (Day 3)
- [ ] Announce new conventions to team
- [ ] Provide training/walkthrough
- [ ] Update existing PRs to follow conventions
- [ ] Monitor adoption and provide support

---

## Benefits

Implementing these conventions provides:

1. **Consistency** - All contributors follow the same process
2. **Quality** - Automated checks ensure code quality
3. **Traceability** - Clear history and audit trail
4. **Efficiency** - Automated workflows reduce manual work
5. **Collaboration** - Standardized templates improve communication
6. **Maintainability** - Clean history makes debugging easier
7. **Professionalism** - Well-organized project attracts contributors

---

## Maintenance

These conventions should be:
- **Reviewed** quarterly for effectiveness
- **Updated** as team needs evolve
- **Enforced** consistently by all team members
- **Documented** when changes are made

---

## Questions and Support

For questions about these conventions:
1. Review this document and CONTRIBUTING.md
2. Check existing issues and PRs for examples
3. Ask in team channels
4. Contact repository maintainers

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-08  
**Maintained By:** lit-atoms maintainers
