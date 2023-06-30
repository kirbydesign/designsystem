import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-disclosure-animation',
  template: `<kirby-item selectable="true" disclosure="arrow-down" [rotateIcon]="rotateIcon" (click)="rotateIcon = !rotateIcon">
    <kirby-avatar overlay="true" slot="start">
        <kirby-icon name="moneybag"></kirby-icon>
    </kirby-avatar>
  <h3>Title</h3>
  </kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleDisclosureAnimationComponent {
  template: string = config.template;

  rotateIcon = false;
}
