import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-card',
  template: `<kirby-card>
  <kirby-item [selectable]="true">
    <h3>Title</h3>
    <kirby-toggle slot="end"></kirby-toggle>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleCardComponent {
  template: string = config.template;
}
