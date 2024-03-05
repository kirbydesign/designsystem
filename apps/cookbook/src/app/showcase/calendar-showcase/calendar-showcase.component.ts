import { Component } from '@angular/core';
import exampleHtml from '../../examples/calendar-example/calendar-example.component.html?raw';
import { moduleProviderExample } from '../../examples/calendar-example/calendar-locales-examples';
import { ApiDescriptionEvent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { CalendarCardExampleComponent } from '~/app/examples/calendar-example/calendar-card-example.component';

@Component({
  selector: 'cookbook-calendar-showcase',
  templateUrl: './calendar-showcase.component.html',
  styleUrls: ['./calendar-showcase.component.scss'],
})
export class CalendarShowcaseComponent {
  exampleHtml = exampleHtml;
  moduleProviderExample = moduleProviderExample;
  calendarCardExample = CalendarCardExampleComponent;

  disableWeekends = false;
  alwaysEnableToday = false;
  disablePastDates = false;
  disableFutureDates = false;
  setMinDate = false;
  setMaxDate = false;
  setTodayDate = false;
  setDisabledDates = false;
  setEnabledDates = false;
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

  properties: ApiDescriptionProperty[] = [
    {
      name: 'selectedDate',
      description:
        '(Optional) Returns/sets the selected date. Any currently selected date can be deselected by passing null',
      defaultValue: 'undefined',
      type: ['Date', 'null'],
    },
    {
      name: 'disableWeekends',
      description: '(Optional) Disables selection of weekends.',
      defaultValue: 'false',
      type: ['true | false'],
    },
    {
      name: 'alwaysEnableToday',
      description:
        '(Optional) Allows selection of current date regardless of whether it is disabled (e.g. disableWeekends=true, disabledDates=[...]).',
      defaultValue: 'false',
      type: ['true | false'],
    },
    {
      name: 'disablePastDates',
      description: '(Optional) Disables selection of dates earlier then the current date.',
      defaultValue: 'false',
      type: ['true | false'],
    },
    {
      name: 'disableFutureDates',
      description: '(Optional) Disables selection of dates later than the current date.',
      defaultValue: 'false',
      type: ['true | false'],
    },
    {
      name: 'todayDate',
      description:
        '(Optional) The date to be marked as today. If omitted, will use current date in browser timezone.',
      defaultValue: 'null',
      type: ['Date'],
    },
    {
      name: 'minDate',
      description: '(Optional) The earliest date that should be selectable.',
      defaultValue: 'null',
      type: ['Date'],
    },
    {
      name: 'maxDate',
      description: '(Optional) The latest date that should be selectable.',
      defaultValue: 'null',
      type: ['Date'],
    },
    {
      name: 'disabledDates',
      description:
        '(Optional) Array of dates that should not be selectable. Should not be used together with enabledDates.',
      defaultValue: 'null',
      type: ['Date[]'],
    },
    {
      name: 'enabledDates',
      description:
        '(Optional) Array of dates that should be selectable. Should not be used together with disabledDates.',
      defaultValue: 'null',
      type: ['Date[]'],
    },
    {
      name: 'timezone',
      description:
        '(Optional) Specify timezone for aligning Date objects. Emitted Date objects will be constructed to point to midnight in the given timezone. Input Date objects may be in either of the two timezones but we highly recommend aligning them with midnight.',
      defaultValue: '"local"',
      type: ['"local" | "UTC"'],
    },
    {
      name: 'yearNavigatorOptions',
      description:
        '(Optional) Displays a dropdown to navigate between years and specifies the navigable year interval with either numbers or dates. Navigable years are set by getting the year difference between `from` and `to`, but prioritize `minDate` and `maxDate`: if `minDate` and `maxDate` are set, they override `from` and `to`.',
      defaultValue: 'null',
      type: ['{ from: number | Date; to: number | Date }'],
    },
    {
      name: 'locales',
      description:
        '(Optional) Danish and English locales are built in, but if additional existing locales are needed (fx. Spanish), they can be specified here.',
      defaultValue: '{}',
      type: ['{ [key: string]: Locale }'],
    },
    {
      name: 'customLocales',
      description:
        '(Optional) Danish and English locales are built in, but if custom locales are needed, they can be specified here.',
      defaultValue: '{}',
      type: ['{ [key: string]: Locale }'],
    },
  ];

  events: ApiDescriptionEvent[] = [
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
    {
      name: 'yearSelect',
      description: 'Emitted when yearNavigator changes value.',
      signature: 'EventEmitter<number>',
    },
    {
      name: 'previousMonthClicked',
      description: 'Emitted when clicking the button to navigate to the previous month.',
      signature: 'EventEmitter<Date>',
    },
    {
      name: 'nextMonthClicked',
      description: 'Emitted when clicking the button to navigate to the next month.',
      signature: 'EventEmitter<Date>',
    },
  ];
}
