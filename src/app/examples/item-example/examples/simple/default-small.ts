import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-small',
  template: `<kirby-item [size]="sm">
  <h3>Title</h3>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleSmallComponent {
  template: string = config.template;
}
