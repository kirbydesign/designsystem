import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-long-title',
  template: `<kirby-item>
  <h3>Title that will be truncated because it has a very long text that cannot fit in the width of the container as it's way too long for that and this is why it will be truncated</h3>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleLongTitleComponent {
  template: string = config.template;
}
