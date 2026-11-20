# Spec: Cookbook brand selector

## Objective

Let cookbook users preview every Kirby component in each customer brand theme.
A brand selector in the cookbook header switches the active design-token theme
for the whole cookbook — inline example frames, iPhone "islands" (iframes) and
popped-out example pages alike.

## Scope

- Brands offered: Kirby default + the "full" brand themes from the private repo
  (`apps/private/src/scss/bank/<bank>/_bank-colors-full.scss`): djurslandsbank,
  jyskebank, kreditbanken, landbobanken, skjernbank, spks, sydbank.
- The private repo's "vanilla" legacy-compat layer is out of scope.
- Jyske Bank's `Jyske` woff2 font files are included.

## Design

- Theme files are copied verbatim (they are generated) into
  `apps/cookbook/src/scss/brands/<bank>/`, each exposing `@mixin theme`.
- `apps/cookbook/src/scss/_brands.scss` scopes each theme under
  `[data-kirby-brand='<bank>']` and is loaded after Kirby's global styles, so
  brand tokens win over `:root, .kirby-surface-*` defaults.
- `BrandService` (cookbook) owns the active brand: sets `data-kirby-brand` on
  `<html>`, persists it in `localStorage`, and listens for `storage` events so
  every same-origin document (iPhone iframes, popped-out examples) follows along
  live. Each iframe boots the cookbook app, so it also picks up the stored brand
  on load.
- `BrandSelectorComponent` (a `kirby-dropdown`) lives in the empty right column
  of `cookbook-header`.

## Commands

- Serve: `npx nx serve cookbook`
- Build: `npx nx build cookbook`
- Lint: `npx nx lint cookbook` and `npx stylelint 'apps/cookbook/**/*.scss'`

## Testing strategy

The cookbook has no unit-test target. Verification is a successful build and
lint plus a manual check: switching brand restyles inline examples and iPhone
islands without reload, and the choice survives a reload.

## Boundaries

- Always: keep copied theme files verbatim so they can be re-synced.
- Ask first: changing library (`libs/`) code or the token generator.
- Never: change Kirby's default theme output.

## Success criteria

- Selector lists 8 entries; default is "Kirby".
- Selecting a brand sets `data-kirby-brand` on `<html>` of the cookbook and all
  iPhone iframes, without reload.
- Selection persists across reloads; "Kirby" removes the attribute.
- Jyske Bank renders with the Jyske font.
- `nx build cookbook` succeeds.
