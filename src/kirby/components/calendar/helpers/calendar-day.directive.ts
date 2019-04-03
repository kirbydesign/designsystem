import { Directive, TemplateRef } from '@angular/core';

import { CalendarDayContent } from './calendar-day.modal';

@Directive({
  selector: '[kirbyCalendarDay]',
})
export class CalendarDayDirective {
  constructor(public template: TemplateRef<CalendarDayContent>) {}
}
