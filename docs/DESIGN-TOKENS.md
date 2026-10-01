# Design Tokens

This document temporarily describes the design token and theming model for Kirby, until a formalized guidelines exists.

In addition to this description of the theming model, a generator for emitting design tokens from the Figma Extended Collections that implement this model can be found in [`tools/generate-design-tokens/README.md`](../tools/generate-design-tokens/README.md).

## Token types

These are the foundational terms and naming that describe how to use tokens, and how they relate to each other.

**Value**
The data associated with the token name. Could be a color hex value, a percentage value or a pixel value.

**Primitive token**
A token that directly references a value. This gives every value in our system a descriptive name.

**Semantic token**
A token that communicates intent by referencing another token, rather than pointing directly to a value.
These map primitive tokens to specific roles in the UI.

**Component token**
A token used for a particular component or special use case, where the semantic tokens do not offer the needed mapping.

### Token categories

Based on the above naming, Kirbys token sets are divided into categories (or sets) that we group together in Figma so they are easier to talk and reason about.

**Primitive tokens**
Tokens that specify layout such as spacing, elevation and border-radius.

**Primitive color tokens**
Tokens thar specify color palettes. Due to the amount of tokens, color primitives live in their own category of primitive tokens.

**Typography tokens**
All tokens related to typography, such as font-family, font-size, font-weight, and line-height.

## Surfaces and contexts

**Surface**:
An element that _contains_ other elements and _establishes_ a context, like the app
background, a card or a list. Has a fixed **kind** (`base`/`raised`/`brand`), an
**absolute** appearance (does not read any css custom properties from the context).
The surface context supplies the semantic and component token mappings for every component inside it, and consumes its own base tokens for fill border and content. See more under the description of the [semantic Intention level](#intention).

**Mode**:
A light/dark colour scheme (the Figma `modeName`). Reserved for
light/dark — never used to describe surfaces or contexts.

## Token naming

The primitive tokens follow a simple naming pattern with an optional property followed by a type and an identifier.

Examples include spacing-s, elevation-2 or color-green-100 (the color is the optional property here).

### Semantic color token structure

The semantic color tokens is a comprehensive sub-system that allows us to do both light/dark mode as well as larger themeable surfaces throughout the app, at the same time.

The system is designed to be predictable, composable and brand-agnostic, with the cost of some degree of repitition and less simplicity.

Each surface defines a set of variables, almost exclusively related to color, but not limited to it. Elevations, radii or really any other primitive token could be mapped to a semantic token by the surface, if the need arises.

```
selector  .kirby-surface-<surface>
          surface ∈ base | raised | brand
          (base is also the default at :root)

variable  --kirby-<component*>-<property>-<intention>-<attention*>-<state>

  component  ∈ any component name
  property   ∈ fill | border | content
  intention  ∈ success | warning | danger | base | raised | brand
  attention  ∈ loud | normal (omitted from name) | quiet | silent
  state      ∈ default (omitted from name) | hover | active | focus | disabled
```

(\*) optional variable name segments

```
--kirby-color-fill-raised
--kirby-color-fill-raised-hover
--kirby-color-fill-brand-loud
--kirby-color-border-danger-quiet-active
```

Component groups follow the same grammar with the component name in front:
`--kirby-spot-color-fill-base`, `--kirby-toggle-color-border-engaged-hover`.

#### Component

Component name for the specific token. If a token starts with a component name, use it only for that particular component. Eg. spot-base-content-brand is only relevant for the Spot Illustration component.

#### Property

Properties define the building blocks of the UI elements and map to traditional concepts of background/border/text .

| Property    | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| **Fill**    | The fill color for an element or area — often its background color |
| **Border**  | The line that delineates an element or area                        |
| **Content** | Text and icons                                                     |

### Intention

The intention creates visual hierarchy levels between elements, and ensures that each level has correct contrast ratios across surfaces.

Many components implement either a base, raised or brand intention, creating visual consistency between ordinary components and components that act as surfaces.

| Property   | Description                                                                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Base**   | The least prominent level, visually aligned with the surface background. Examples are: Item and Accordion.                                                                             |
| **Raised** | The second most prominent level. Visually raised from the background via a solid fill and border that stands out from the background. Examples are: Checkbox, Radio, Buttons and Card. |
| **Brand**  | The most prominent level. Visually elevated from the background via a branded solid fill and border. Examples are: Buttons and Card.                                                   |

Other elements require signalling outside of the base/raised/brand hierarchy, so intention can also be:

- Danger, warning, success, neutral
- Positive, negative
- Engaged (e.g. activated radio or toggle)

### Attention

Attention is used to further destinguish UI elements within an Intention variation.
This ensures the possibility to visually emphasize UI elements regardless of the intention.

An example is a branded button that can be loud as a standalone element and normal when used in a Segmented Control.

Attention examples from least to most visually prominent:

- Silent, Quiet, Normal, Loud

### State

Every interactive color token includes four states: default, hover, active and focus.
This ensures consistent feedback across all interactive elements without manual color adjustments.

- **Default** - Resting
- **Hover** - Hovered state, on platforms that support pointers
- **Active** - Pointer activation / pressed state
- **Focus** - Keyboard focus
