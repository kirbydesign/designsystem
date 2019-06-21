import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-calendar-showcase',
  templateUrl: './calendar-showcase.component.html',
  styleUrls: ['./calendar-showcase.component.scss'],
})
export class CalendarShowcaseComponent {
  disableWeekends = false;
  disablePastDates = false;
  disableFutureDates = false;
  setMinDate = false;
  setMaxDate = false;
  setdisabledDates = false;
  minDate: Date;
  maxDate: Date;
  disabledDates: Array<Date> = new Array();

  constructor() {
    const today = new Date();

    this.minDate = new Date();
    this.minDate.setDate(today.getDate() - 60);
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate() + 60);

    const date1 = new Date();
    date1.setDate(today.getDate() + 3);
    const date2 = new Date();
    date2.setDate(today.getDate() + 5);
    const date3 = new Date();
    date3.setDate(today.getDate() + 7);
    const date4 = new Date();
    date4.setDate(today.getDate() + 10);
    const date5 = new Date();
    date5.setDate(today.getDate() + 15);
    const date6 = new Date();
    date6.setDate(today.getDate() + 25);
    const date7 = new Date();
    date7.setDate(today.getDate() + 28);
    const date8 = new Date();
    date8.setDate(today.getDate() + 35);
    this.disabledDates.push(date1, date2, date3, date4, date5, date6, date7, date8);
  }

  exampleHtml: string = require('../../examples/calendar-example/calendar-example.component.html');
  exampleWithCardHtml: string = require('../../examples/calendar-example/calendar-card-example.component.html');
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
  ];
}
