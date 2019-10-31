import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex3',
  template: `
  <kirby-item>
  <kirby-label>
    <h3>Title</h3>
  </kirby-label>
  <kirby-toggle></kirby-toggle>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemTwoColumnsSingleLineWithToggleComponent {
  template: string = config.template;
}
