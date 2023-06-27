import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-disclosure',
  template: `<kirby-item selectable="true" [disclosure]="icon" [rotateIcon]="rotateIcon" (click)="rotateIcon = !rotateIcon">
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
  // TEMP Input for demo purposes:
  @Input() icon: 'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null;

  template: string = config.template;

  rotateIcon = false;
}
