import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex3-disabled',
  template: `
  <kirby-item disabled>
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
export class ItemTwoColumnsSingleLineWithToggleDisabledComponent {
  template: string = config.template;
}
