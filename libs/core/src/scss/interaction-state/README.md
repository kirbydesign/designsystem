# Interaction State

Visual indicators for UI states on non-touch devices.

## Hover

TBD

### State layer solution

* Based on Material
* Requires two DOM elements in the template(s):
    - A container for the content `.content-layer`
    - A state layer `.state-layer`
* Works for:
    - "Normal" elements, e.g. `<button>`
* Limitations/shortcomings
    - Ionic components
    - Atomic/singleton elements, e.g. `<input type="text">`
    - See custom solutions

CSS: `libs/core/src/scss/interaction-state/_layer.scss`

**HTML**

Examples can be found, e.g. in [Button](https://github.com/kirbydesign/designsystem/blob/main/libs/designsystem/src/lib/components/button/button.component.html) and [Calendar](https://github.com/kirbydesign/designsystem/blob/main/libs/designsystem/src/lib/components/calendar/calendar.component.html) components.

```HTML
<span class="state-layer" aria-hidden="true"></span>
<span class="content-layer">
    <ng-content></ng-content>
</span>
```

### Custom solutions for Ionic components

TBD

## Active/pressed

TBD

## Focus

TBD

## Disabled

TBD
