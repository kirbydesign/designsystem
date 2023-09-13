import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-default',
  template: `<kirby-header [title]="'Title'" [subtitle1]="['Mr. My Name Is Really Long', '&', 'Mrs. I Also Have A Really Really Long Name With A Surname']">
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleDefaultComponent {
  template: string = config.template;
}
