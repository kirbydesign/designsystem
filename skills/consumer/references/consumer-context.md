# Consumer application context

Use this reference when Kirby runs inside a hosted microfrontend or behind application-owned UI
wrappers. The goal is to change the requested UI without replacing the application's integration.

## Establish ownership

Inspect only the affected feature and its nearest integration points:

| Surface                 | Establish before changing it                                                           |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Bootstrap and providers | Which setup belongs to the host, platform bootstrap and local Angular context?         |
| Dependencies            | Are Angular, Kirby and Ionic shared at runtime or bundled locally?                     |
| Routing                 | Is this navigation inside the feature, inside a modal, or outside the microfrontend?   |
| UI wrappers             | Does a shared component/service already own layout, forms, overlays or error handling? |
| Localization            | Which service/pipe owns application text, locale, currency and timezone formatting?    |
| Verification            | Which package scripts and nearby tests cover this feature?                             |

Use repository instructions, manifests, application configuration and neighboring implementations
as evidence. A neighboring implementation establishes a local convention, not proof of Kirby API
support or an accessibility requirement. Verify public APIs independently.

## Bootstrap and shared dependencies

Preserve the existing platform bootstrap. A microfrontend is not necessarily a standalone web app:
adding `bootstrapApplication`, a second root router or global Kirby initialization can bypass the
platform's integration.

For Kirby provider ownership, follow [setup](./setup.md#kirby-providers-in-a-hosted-microfrontend).
Keep existing modal, translation, theme and formatting providers unless the requested change
requires altering them.

The package manifest and lockfile describe build-time dependencies; a host may supply shared runtime
dependencies. Check the platform's installed documentation and sharing configuration before relying
on a newer API or proposing an upgrade. If the required runtime compatibility cannot be established,
ask rather than treating a package range as proof. Keep dependency/platform upgrades separate from
ordinary UI changes.

For platform-specific bootstrap, routing, runtime configuration or feature registration, use the
repository's platform skill when available, otherwise its installed documentation. Kirby guidance
does not replace those platform contracts.

## Existing UI and modal flows

- Extend a feature's shared UI wrapper when it already owns the required behavior. Inspect its
  inputs, outputs, validation and accessibility contract before bypassing it or adding another
  wrapper.
- For dialog mechanism and result contracts, follow [existing modal flows](./modals.md#existing-flow-first).
- Distinguish feature routes from host navigation. Use the platform's existing cross-application
  navigation mechanism for leaving the microfrontend; a root Angular route is not automatically
  the host root. Preserve lazy feature route composition and named modal outlets.
- Preserve compatibility guards/workarounds until their purpose and installed-version support are
  understood. A simpler Cookbook example is not evidence that an integration guard is unnecessary.
- Verify the actual host's back navigation, direct entry, dismissal and focus behavior for routing
  or overlay changes. Also check leaving and re-entering the microfrontend: platform visibility may
  have a different lifecycle from a Kirby page's `enter`/`leave` and Angular destruction.

For changes to translation, locale or domain formatting, read
[localization](./localization.md). Preserve the platform's provider ownership and runtime
language-switching integration while applying those recipes.

## Verify in the consumer repository

Use the repository's package manager, scripts and feature-level test conventions. Do not copy
Kirby's own Nx targets, test runner or build commands into a consumer repository.

- Use existing stories/component tests for UI behavior where available, and focused unit tests for
  isolated formatting, validation and result handling. Extend the existing suite rather than
  introducing a new runner.
- Reuse existing translation, platform and overlay test setup. Verify translated accessible names,
  form value payloads, cancellation versus confirmation, request failures and loading cleanup.
- Run the repository's applicable lint, style checks and focused build/type-check.
- For host-dependent routing, providers or overlays, use the documented local host/mock workflow
  and relevant integration tests. A passing isolated component test does not verify host navigation
  or shared-runtime compatibility.

Report checks actually run and any host/runtime behavior that remains unverified. Use synthetic
records in examples and tests; keep private application source and identifying data out of
reusable skill content.
