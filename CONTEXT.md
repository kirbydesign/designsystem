# Kirby Design System

Kirby is the design system used across Bankdata's products: a set of web components, an
Angular component library, and the supporting tooling published to npm under the
`@kirbydesign` scope.

## Language

### Publishing

**Release publish**:
Publication of a package at the version recorded in its source `package.json`, triggered
by pushing a protected tag. Carries the `latest` dist-tag and is supported.
_Avoid_: official publish, production release, real release.

**Dev publish**:
Publication of a publish closure at commit-stamped prerelease versions, dispatched
manually by an admin so a consumer can verify an unreleased change in a real application.
Permanent, unsupported, and never removed.
_Avoid_: branch publish, PR publish, canary, snapshot, nightly.

**Dev version**:
A version of the form `<release version>-dev-<short SHA>`. Identifies a commit rather than
a branch, and is excluded from every SemVer range, so nothing resolves to it by accident.
_Avoid_: prerelease, beta, RC — an `-rc.N` version means a release candidate, which is a
different thing.

**Publish closure**:
The package being published together with everything it depends on, in publish order. A
consumer must install the whole closure, because the peer dependency ranges within it are
pinned to exact versions.
