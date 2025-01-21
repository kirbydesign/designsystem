import { Component } from '@angular/core';
import { CalendarComponent } from '@kirbydesign/designsystem/calendar';

const config = {
  selector: 'cookbook-calendar-no-background-example',
  template: `<kirby-calendar></kirby-calendar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [CalendarComponent],
})
export class CalendarNoBackgroundExampleComponent {
  template: string = config.template;
}
