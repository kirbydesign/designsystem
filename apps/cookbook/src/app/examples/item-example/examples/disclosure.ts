import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-disclosure',
  template: `<kirby-item selectable="true" [disclosure]="'arrow-down'" [rotateIcon]="rotateIcon" (click)="rotateIcon = !rotateIcon">
    <kirby-avatar overlay="true" slot="start">
        <kirby-icon name="moneybag"></kirby-icon>
    </kirby-avatar>
  <h3>Title</h3>
    <kirby-flag slot="end" themeColor="success">
        <data value="60.0">60</data>
    </kirby-flag>
  </kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleDisclosureComponent {
  template: string = config.template;

  rotateIcon = false;
}
