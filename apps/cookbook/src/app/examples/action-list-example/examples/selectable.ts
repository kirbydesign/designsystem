import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-action-list-selectable-example',
  template: `<kirby-action-list>
  <kirby-item [selectable]="true">
    <h3>Action 1</h3>
  </kirby-item>
  <kirby-item [selectable]="true">
    <h3>Action 2</h3>
  </kirby-item>
</kirby-action-list>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ActionListSelectableExampleComponent {
  template: string = config.template;
}
