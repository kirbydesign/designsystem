import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-calendar-no-background-example',
  template: `<kirby-calendar></kirby-calendar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  standalone: false,
})
export class CalendarNoBackgroundExampleComponent {
  template: string = config.template;
}
