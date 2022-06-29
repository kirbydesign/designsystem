# Release Notes

[ TDB (about this document) ]

[ TOC ]

- [Version 7](#version-7) August 2022

## Version 7

Version 7 is mostly about improving the user experience for other devices than mobile/touch-based devices. In other words, making Kirby components more _desktop ready_.

### What's new?

- [Interaction States](#interaction-states)
- [Button attention level 4 is deprecated](#attention-level-4-is-deprecated)
- Charts
  - New _Stock Chart_ component
  - Dependency on _Highcharts_ removed
  - General refactoring
- Other
  - Various bugfixes
  - Refactor moving of modal elements to solve multiple issues

#### Interaction States

Most Kirby components have had an overhaul of how they look and behave when you interact with them using a keyboard or a pointing device like a mouse. This has been done by improving _Interaction States_ - and adding some that where missing.

<dl>
<dt>Hover</dt>
<dd>When you move the mouse cursor over an element. It's not a thing on touch devices.</dd>
<dt>Active</dt>
<dd>While you click or press an element it becomes active. When you release it, the element is no longer active.</dd>
<dt>Focus</dt>
<dd>When an element receives focus you can interact with it using a keyboard. E.g. submitting a form or following a link Elements can receive focus by using <code>TAB</code> on a keyboard, but also programmatically or by clicking on it. Not all elements will (or should) receive focus.</dd>
</dl>

##### How desktop ready are Kirby components?

Interaction states are not relevant for all components. See the table below for the current state of how _desktop ready_ each relevant component is:

| Component         | Hover | Active | Focus with `TAB` | `ENTER` / `SPACE` |
| :---------------- | :---: | :----: | :--------------: | :---------------: |
| Accordion         |  ✅   |   🟡   |        ❌        |         ?         |
| Action Sheet      |  ✅   |   🟡   |        ❌        |         ?         |
| Alert             |  ✅   |   🟡   |        ❌        |         ?         |
| Button            |  ✅   |   🟡   |        ❌        |         ?         |
| Calendar          |  ✅   |   🟡   |        ❌        |         ?         |
| Card              |  ✅   |   🟡   |        ❌        |         ?         |
| Chart             |  ✅   |   🟡   |        ❌        |         ?         |
| Checkbox          |  ✅   |   🟡   |        ❌        |         ?         |
| Chip              |  ✅   |   🟡   |        ❌        |         ?         |
| Dropdown          |  ✅   |   🟡   |        ❌        |         ?         |
| Fab Sheet         |  ✅   |   🟡   |        ❌        |         ?         |
| Form Field        |  ✅   |   🟡   |        ❌        |         ?         |
| Item ▶️ Picker    |  ✅   |   🟡   |        ❌        |         ?         |
| Link              |  ✅   |   🟡   |        ❌        |         ?         |
| List              |  ✅   |   🟡   |        ❌        |         ?         |
| List Swipe        |  ✅   |   🟡   |        ❌        |         ?         |
| Modal             |  ✅   |   🟡   |        ❌        |         ?         |
| Radio             |  ✅   |   🟡   |        ❌        |         ?         |
| Range             |  ✅   |   🟡   |        ❌        |         ?         |
| Reorder List      |  ✅   |   🟡   |        ❌        |         ?         |
| Segmented Control |  ✅   |   🟡   |        ❌        |         ?         |
| Slide Button      |  ✅   |   🟡   |        ❌        |         ?         |
| Slides            |  ✅   |   🟡   |        ❌        |         ?         |
| Tabs              |  ✅   |   🟡   |        ❌        |         ?         |
| Toggle            |  ✅   |   🟡   |        ❌        |         ?         |
| Toggle Button     |  ✅   |   🟡   |        ❌        |         ?         |

#### Attention level 4 is deprecated

No longer provide attention level 4. Use other levels instead. In deprecation period level 4 gets mapped to ???. With future release (which version?) using attention level 4 will throw and error.

### Where can I find more details?

See the [Changelog](https://github.com/kirbydesign/designsystem/blob/main/CHANGELOG.md) and the [Migration Guide](https://github.com/kirbydesign/designsystem/blob/main/MIGRATION.md) for more details.
