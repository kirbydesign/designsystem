import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-tiny',
  template: `<kirby-item [size]="tiny">
  <h3>Size</h3>
  <data slot="end">Tiny</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleTinyComponent {
  template: string = config.template;
}
