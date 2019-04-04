import { Component, Input, HostBinding } from '@angular/core';

import { CalendarDayContent } from '../helpers/calendar-day.modal';

@Component({
  selector: 'kirby-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.scss'],
})
export class CalendarCellComponent {
  @Input() day: CalendarDayContent;
  @Input() selected: boolean;

  @HostBinding('class.current-month') get currentMonth() {
    return this.day.currentMonth;
  }

  @HostBinding('class.weekend') get weekend() {
    return this.day.weekend;
  }

  @HostBinding('class.selected') get _selected() {
    return this.selected;
  }

  @HostBinding('class.today') get today() {
    return this.day.today;
  }
}
