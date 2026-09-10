# Releasing

Kirby has two kinds of publish. Both run on CI and authenticate to npm with
[trusted publishing][trusted-publishing] over OIDC — there are no npm tokens anywhere in
this repository.

|           | Release publish                          | Dev publish                              |
| --------- | ---------------------------------------- | ---------------------------------------- |
| Trigger   | Pushing a protected tag                  | Manual dispatch of `publish-dev.yml`     |
| Who       | Repository admins                        | Repository admins                        |
| Version   | Exactly what is in `libs/*/package.json` | `<version>-dev-<short SHA>`              |
| dist-tag  | `latest`                                 | `dev`                                    |
| Supported | Yes                                      | No — see [Dev publishes](#dev-publishes) |

## Publishable packages

| Package                           | Source                    | Depends on     |
| --------------------------------- | ------------------------- | -------------- |
| `@kirbydesign/core`               | `libs/core`               | —              |
| `@kirbydesign/designsystem`       | `libs/designsystem`       | `core`         |
| `@kirbydesign/extensions-angular` | `libs/extensions/angular` | `designsystem` |
| `@kirbydesign/stylelint-plugin`   | `libs/stylelint-plugin`   | —              |

## Release publishes

1. Open a release PR bumping the version in the relevant `libs/*/package.json`.
2. Once merged, an admin pushes the matching tag. Tag creation is restricted by a
   repository ruleset, which is what makes releasing admin-only.

| Tag                         | Workflow                         | Publishes              |
| --------------------------- | -------------------------------- | ---------------------- |
| `vX.Y.Z`                    | `publish.yml`                    | `core`, `designsystem` |
| `vX.Y.Z-extensions-angular` | `publish-extensions-angular.yml` | `extensions-angular`   |
| `vX.Y.Z-stylelint-plugin`   | `publish-stylelint-plugin.yml`   | `stylelint-plugin`     |

## Dev publishes

A dev publish lets a consumer install an unreleased change into a real application before
it is released.

> [!WARNING]
> Dev versions are **permanent, unsupported, and never removed**. npm's OIDC tokens
> authenticate `npm publish` only — `npm unpublish`, `npm deprecate` and `npm dist-tag rm`
> all require a long-lived token, which this repository deliberately does not have. Never
> reference a dev version from a production dependency.

### Producing one

Actions → **Publish dev version to npm** → **Run workflow** → pick the branch and the
package → **Run workflow**. The run then waits on the `npm-dev-publish` environment; an
admin clicks **Review deployments** → **Approve and deploy** on the run page. Admins can
approve their own dispatch.

When it finishes, the run summary lists every published version and the exact
`npm install` command to hand to the consumer.

### What gets published

A dev publish publishes the chosen package **and everything it depends on**, because these
are peer dependencies and npm enforces them:

| Chosen               | Published                                    |
| -------------------- | -------------------------------------------- |
| `core`               | `core`                                       |
| `designsystem`       | `core`, `designsystem`                       |
| `extensions-angular` | `core`, `designsystem`, `extensions-angular` |
| `stylelint-plugin`   | `stylelint-plugin`                           |

Inter-package peer dependency ranges are rewritten to the exact dev versions. This is not
cosmetic: a prerelease never satisfies a caret range, so a dev `designsystem` still asking
for `"@kirbydesign/core": "^0.0.92"` would make the consumer's `npm install` fail with
`ERESOLVE`. Install the whole set the run summary lists, not just one package.

### Versions and tags

A dev version looks like `11.11.0-dev-abc1234` — the package's current version with the
commit appended as a prerelease identifier. Two consequences worth knowing:

- **Nothing resolves to it by accident.** npm excludes prereleases from ranges, so
  `11.11.0-dev-abc1234` satisfies neither `^11.11.0` nor `>=11.0.0`. A consumer only ever
  gets a dev build by asking for that exact version.
- **The `dev-` infix is required.** A bare SHA such as `0123456` is a leading-zero numeric
  identifier and not valid SemVer, which would break roughly one publish in 270.

Every dev publish uses the single dist-tag `dev`, which points at whichever dev publish ran
most recently. It carries no meaning — always pin the exact version.

Re-running a dispatch for the same commit is safe: any package whose dev version already
exists is skipped, so a run that failed part way through can simply be re-run.

## Running the publish script locally

`npm run publish -- <package>` off CI does **not** publish. It builds and writes a tarball
to `dist/`, which you can install with `npm install <path to tarball>`. Dev publishes are
refused entirely outside CI, because they rewrite `libs/*/package.json` in place.

## Adding a new publishable package

1. Publish the first version manually — a trusted publisher cannot be registered for a
   package that does not yet exist on the registry.
2. Register a trusted publisher for its release workflow.
3. Register a second trusted publisher for `publish-dev.yml`, with environment
   `npm-dev-publish`.
4. Add it to `sourcePackageJsonPaths` and `publishChains` in `scripts/publish.js`, and to
   the `package` input of `.github/workflows/publish-dev.yml`.

Each package may have up to 10 trusted publishers, but an existing one cannot be edited —
only deleted and recreated.

[trusted-publishing]: https://docs.npmjs.com/trusted-publishers
