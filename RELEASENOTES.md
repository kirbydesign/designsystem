# Release Notes

This document highlights what is new in major versions of Kirby. See the [Changelog](https://github.com/kirbydesign/designsystem/blob/main/CHANGELOG.md) and the [Migration Guide](https://github.com/kirbydesign/designsystem/blob/main/MIGRATION.md) for more details.

- [Version 7](#version-7) August 2022

## Version 7

Version 7 is mostly about improving the user experience for other devices than mobile/touch-based devices. In other words, making Kirby components more _desktop ready_.

### What's new?

- [Button attention level 4 has been deprecated](#button-attention-level-4-has-been-deprecated)
- [Interaction States](#interaction-states)
- Charts
  - New _Stock Chart_ component
  - _Highcharts_ dependency removed
  - General refactoring
- Refactor moving of modal elements to solve multiple issues
- Various bugfixes

### Button attention level 4 has been deprecated

In order to clarify and simplify the design of the `<kirby-button>` attention levels it has been revised. Attention level 4 has been deprecated and the continued usage of this level will result in a console deprecation warning message and the button will be rendered as attention level 3.

Up until now attention level 4 has primarily been used for transparent icon-only buttons. The continued need for this specific kind of buttons has been recognized and is now available through a new `noDecoration` parameter of `<kirby-button>` .

Furthermore the design of `<kirby-button>` on all light backgrounds is now identical to the their former presence on a _white_ kirby-card background. The biggest visual change will be on `<kirby-button>` s with attention level 2 on a _light_ `<kirby-card>` which will have their background color change from _white_ to _black_.

#### Migration

- When migrating change attention level 2 to attention level 3 on all `<kirby-button>` s which aren't black by design
- Also replace all attention level 4 usage on icon-only `<kirby-button>` s with the new _no decoration_ parameter

### Interaction States

Most Kirby components have had an overhaul of how they look and behave when you interact with them using a keyboard or a pointing device such as a mouse. Interaction includes _clicking_ with a mouse, _navigating_ using the `TAB` key and _activating_ interactive elements using `ENTER` or `SPACE` keys.

<dl>
  <dt>Hover</dt>
  <dd>When you move the mouse cursor over an element. Does not apply to touch devices.</dd>
  <dt>Active</dt>
  <dd>While you click or press (activate) an element it becomes active. When you release, the element is no longer active.</dd>
  <dt>Focus</dt>
  <dd>When an element receives focus you can interact with it using a keyboard. Types of interaction could be e.g. activating a button, following a link, checking/unchecking checkboxes or selecting an option. Elements receive focus by using <code>TAB</code> on a keyboard to navigate to it. Not all elements will (or should) receive focus.</dd>
</dl>

#### What needs to be done?

On a high level: Not much. You should check that the Kirby components you use look and behave as described in this section. You do not have to check every instance of Kirby components. A few samples should suffice.

You _should_ test more thoroughly if you have applied your own styling and/or behavior. This could be either modifications made to existing interaction states or to make up for lacking ones. In either case you should aim for removing modifications and prefer to use the new baked-in interaction states.

#### How desktop ready are Kirby components?

Interaction states are not relevant for all components. See the tables below for the state of _desktop readiness_ for each relevant component before and after the improvements.

##### Before

| Component         | Hover | Active | Focus `TAB` | `ENTER` / `SPACE` |
| :---------------- | :---: | :----: | :---------: | :---------------: |
| Accordion         |  🟡   |   🟡   |     ❌      |        ❌         |
| Action Sheet      |  ❌   |   ❌   |     ✅      |        ✅         |
| Alert             |  ✅   |   ❌   |     ✅      |        ✅         |
| Button            |  ✅   |   ❌   |     ✅      |         ?         |
| Calendar          |   ?   |   ?    |     🟡      |        🟡         |
| Card              |  🟡   |   ❌   |     ❌      |        ❌         |
| Chart             |  ✅   |   ✅   |     🟡      |        🟡         |
| Checkbox          |  ✅   |   ✅   |     ✅      |        ✅         |
| Chip              |  ✅   |   ❌   |     ❌      |        ❌         |
| Dropdown          |  ✅   |   🟡   |     ✅      |        ✅         |
| Fab Sheet         |  ✅   |   ❌   |     ✅      |        ❌         |
| Form Field        |  ✅   |   ✅   |     ✅      |         ?         |
| Item - Picker     |  🟡   |   ❌   |     ✅      |        ✅         |
| Link              |  ❌   |   ❌   |     ✅      |        ✅         |
| List              |  🟡   |   ❌   |     🟡      |        ✅         |
| List Swipe        |  ❌   |   ❌   |     ❌      |        ❌         |
| Modal             |  ✅   |   ❌   |     ✅      |        ✅         |
| Radio             |  🟡   |   ✅   |     ✅      |        ✅         |
| Range             |   ?   |   ?    |     ❌      |         ?         |
| Reorder List      |   ?   |   ✅   |     ❌      |        ❌         |
| Segmented Control |  ✅   |   ❌   |     ✅      |        ✅         |
| Slide Button      |   ?   |   ?    |      ?      |         ?         |
| Slides            |  🟡   |   🟡   |     ❌      |        ❌         |
| Tabs              |  ❌   |   ❌   |     🟡      |        ✅         |
| Toggle            |   ?   |   ✅   |     ❌      |        ✅         |
| Toggle Button     |  ✅   |   ❌   |     ✅      |         ?         |

##### After

| Component         | Hover | Active | Focus `TAB` | `ENTER` / `SPACE` |
| :---------------- | :---: | :----: | :---------: | :---------------: |
| Accordion         |  ✅   |   ✅   |     🟡      |        🟡         |
| Action Sheet      |  ✅   |   ✅   |     🟡      |        ✅         |
| Alert             |  ✅   |   ✅   |     ✅      |        ✅         |
| Button            |  ✅   |   ✅   |     ✅      |        ✅         |
| Calendar          |  ✅   |   ✅   |     🟡      |        🟡         |
| Card              |  ✅   |   ✅   |     ✅      |        ✅         |
| Chart             |  ✅   |   🟡   |     🟡      |         ?         |
| Checkbox          |  ✅   |   ✅   |     ✅      |        🟡         |
| Chip              |  ✅   |   ✅   |     ✅      |        ✅         |
| Dropdown          |  ✅   |   ✅   |     ✅      |        ✅         |
| Fab Sheet         |  ✅   |   ✅   |     🟡      |        🟡         |
| Form Field        |  ✅   |   ✅   |     ✅      |         ?         |
| Item - Picker     |  ✅   |   ✅   |     🟡      |        ✅         |
| Link              |  ✅   |   ✅   |     ✅      |        ✅         |
| List              |  ✅   |   ✅   |     ✅      |        ✅         |
| List Swipe        |  🟡   |   🟡   |     🟡      |        🟡         |
| Modal             |   ?   |   ?    |      ?      |         ?         |
| Radio             |  ✅   |   ✅   |     ✅      |        ✅         |
| Range             |  ✅   |   ✅   |     ✅      |        ✅         |
| Reorder List      |  🟡   |   🟡   |     ❌      |        ❌         |
| Segmented Control |  ✅   |   ✅   |     ✅      |        ✅         |
| Slide Button      |  ✅   |   ✅   |      ?      |         ?         |
| Slides            |  ❌   |   ❌   |     ❌      |        ❌         |
| Tabs              |  ❌   |   ❌   |     🟡      |        ✅         |
| Toggle            |  ✅   |   ✅   |     ✅      |        ✅         |
| Toggle Button     |  ✅   |   ✅   |     ✅      |        ✅         |
