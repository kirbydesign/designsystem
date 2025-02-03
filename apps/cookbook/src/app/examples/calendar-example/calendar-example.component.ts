import { Component } from '@angular/core';
import { CalendarCardExampleComponent } from './examples/in-card';
import { CalendarYearNavigatorExampleComponent } from './examples/year-navigator';
import { CalendarNoBackgroundExampleComponent } from './examples/no-background';

@Component({
  selector: 'cookbook-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
  imports: [
    CalendarCardExampleComponent,
    CalendarYearNavigatorExampleComponent,
    CalendarNoBackgroundExampleComponent,
  ],
})
export class CalendarExampleComponent {}
