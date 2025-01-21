import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { CalendarComponent } from '@kirbydesign/designsystem/calendar';

const config = {
  template: `<kirby-card>
  <kirby-calendar [yearNavigatorOptions]="yearNavigatorOptions" [usePopover]="true"></kirby-calendar>
</kirby-card>`,
};

@Component({
  selector: 'cookbook-calendar-year-navigator-example',
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [CardModule, CalendarComponent],
})
export class CalendarYearNavigatorExampleComponent {
  template: string = config.template;

  yearNavigatorOptions = { from: -6, to: 3 };
}
