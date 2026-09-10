# Dev publishing

## Context

Consumers of Kirby need to verify an unreleased change inside their own application before
it is released. Kirby publishes to npm with trusted publishing over OIDC, which binds trust
to a specific workflow **filename** and authenticates `npm publish` and `npm stage publish`
— and nothing else.

## Decision

A dev publish is a manually dispatched publication of a package and its dependency closure,
at `<version>-dev-<short SHA>`, under the `dev` dist-tag.

- It lives in its own workflow, `publish-dev.yml`, which calls the same `scripts/publish.js`
  as the release workflows.
- It is gated by the GitHub environment `npm-dev-publish`, whose name is also registered in
  each package's npm trusted publisher configuration.
- Dev versions are permanent.

## Considered options

**Extending `publish.yml` in place** instead of a separate workflow. Rejected: it puts
conditional logic into the highest-stakes workflow in the repository, where a dev-publish
bug could break releasing. A separate file costs four npm registrations, which is a one-off.

**An `if: github.actor` check** instead of an environment. Rejected: `workflow_dispatch` is
available to anyone with write access, and a dispatched run executes the workflow file as it
exists on the selected ref — so the check is deletable by exactly the person it is meant to
stop. Environment protection rules are repository settings and cannot be edited from a
branch.

**An environment without registering its name with npm.** Rejected: an attacker could strip
the `environment` key from their branch's copy of the workflow to skip the reviewer.
Registering the environment name means such a run produces an OIDC token npm rejects, so the
two halves close each other's gap.

**A bare SHA suffix**, `11.11.0-abc1234`. Rejected: about 3.7% of short SHAs are all digits,
and a leading-zero numeric identifier is not valid SemVer, so roughly one publish in 270
would fail confusingly. The `dev-` infix makes the version valid for every possible SHA.

**Per-branch or per-SHA dist-tags.** Rejected: dist-tags accumulate permanently and cannot
be removed under OIDC. `@kirbydesign/core` already carries six dead dist-tags from earlier
ad-hoc experiments. A single reused `dev` tag adds exactly one, forever.

## Consequences

Each package needs a trusted publisher registered against `publish-dev.yml` with the
`npm-dev-publish` environment. Registrations cannot be edited, only deleted and recreated,
and a package must already exist on the registry before one can be created.

Every dev publish requires an approval click, including from the admin who dispatched it.

Dev versions accumulate permanently and there is no cleanup job — not by oversight, but
because OIDC cannot authenticate `unpublish`, `deprecate`, or `dist-tag rm`. Reintroducing a
long-lived token to enable cleanup would defeat the reason for using trusted publishing.

Because peer ranges within a closure are pinned to exact dev versions, a consumer must
install the whole closure rather than a single package.
