import { Component } from '@angular/core';
import { ShowcaseEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ShowcaseProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

declare var require: any;

@Component({
  selector: 'cookbook-calendar-showcase',
  templateUrl: './calendar-showcase.component.html',
  styleUrls: ['./calendar-showcase.component.scss'],
})
export class CalendarShowcaseComponent {
  disableWeekends = false;
  alwaysEnableToday = false;
  disablePastDates = false;
  disableFutureDates = false;
  setMinDate = false;
  setMaxDate = false;
  setTodayDate = false;
  setDisabledDates = false;
  useTimezoneUTC = false;
  showYearNavigator = false;
  minDate: Date;
  maxDate: Date;
  todayDate: Date;

  constructor() {
    const today = new Date();

    this.minDate = new Date();
    this.minDate.setDate(today.getDate() - 60);
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate() + 60);
    this.todayDate = new Date();
    this.todayDate.setDate(today.getDate() + 3);
  }

  exampleHtml: string = require('!raw-loader!../../examples/calendar-example/calendar-example.component.html')
    .default;
  exampleWithCardHtml: string = require('!raw-loader!../../examples/calendar-example/calendar-card-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'selectedDate',
      description: '(Optional) Returns/sets the selected date.',
      defaultValue: 'null',
      inputValues: ['Date'],
    },
    {
      name: 'disableWeekends',
      description: '(Optional) Disables selection of weekends.',
      defaultValue: 'false',
      inputValues: ['true | false'],
    },
    {
      name: 'alwaysEnableToday',
      description:
        '(Optional) Allows selection of current date regardless of whether it is disabled (e.g. disableWeekends=true, disabledDates=[...]).',
      defaultValue: 'false',
      inputValues: ['true | false'],
    },
    {
      name: 'disablePastDates',
      description: '(Optional) Disables selection of dates earlier then the current date.',
      defaultValue: 'false',
      inputValues: ['true | false'],
    },
    {
      name: 'disableFutureDates',
      description: '(Optional) Disables selection of dates later than the current date.',
      defaultValue: 'false',
      inputValues: ['true | false'],
    },
    {
      name: 'todayDate',
      description:
        '(Optional) The date to be marked as today. If omitted, will use current date in browser timezone.',
      defaultValue: 'null',
      inputValues: ['Date'],
    },
    {
      name: 'minDate',
      description: '(Optional) The earliest date that should be selectable.',
      defaultValue: 'null',
      inputValues: ['Date'],
    },
    {
      name: 'maxDate',
      description: '(Optional) The latest date that should be selectable.',
      defaultValue: 'null',
      inputValues: ['Date'],
    },
    {
      name: 'disabledDates',
      description: '(Optional) Array of dates that should not be selectable.',
      defaultValue: 'null',
      inputValues: ['Date[]'],
    },
    {
      name: 'timezone',
      description:
        '(Optional) Specify timezone for aligning Date objects. Emitted Date objects will be constructed to point to midnight in the given timezone. Input Date objects may be in either of the two timezones but we highly recommend aligning them with midnight.',
      defaultValue: '"local"',
      inputValues: ['"local" | "UTC"'],
    },
    {
      name: 'yearNavigatorOptions',
      description:
        '(Optional) Displays a dropdown to navigate between years and specifies the navigable year interval with either numbers or dates. Navigable years are set by getting the year difference between `from` and `to`, but prioritize `minDate` and `maxDate`: if `minDate` and `maxDate` are set, they override `from` and `to`.',
      defaultValue: 'null',
      inputValues: ['{ from: number | Date; to: number | Date }'],
    },
  ];

  events: ShowcaseEvent[] = [
    {
      name: 'dateSelect',
      description: 'Emitted when a date is clicked.',
      signature: 'EventEmitter<Date>',
    },
    {
      name: 'dateChange',
      description: 'Emitted when selectedDate changes value.',
      signature: 'EventEmitter<Date>',
    },
  ];
}
