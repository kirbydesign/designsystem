import { Component, OnInit } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-calendar-showcase',
  templateUrl: './calendar-showcase.component.html',
  styleUrls: ['./calendar-showcase.component.scss'],
})
export class CalendarShowcaseComponent {
  exampleHtml: string = require('../../examples/calendar-example/calendar-example.component.html');
  exampleWithCardHtml: string = require('../../examples/calendar-example/calendar-card-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'disableWeekends',
      description: 'Disables selection of weekends.',
      defaultValue: 'false',
      inputValues: ['true | false'],
    },
    {
      name: 'disablePastDates',
      description: 'Determines if dates in the past can be selected.',
      defaultValue: 'true',
      inputValues: ['true | false'],
    },
    {
      name: 'disableDates',
      description:
        'Array of dates that you want to disable inside the calendar. Date format is YYYY-MM-DD.',
      defaultValue: 'null',
      inputValues: ['Date[]'],
    },
    {
      name: 'currentDate',
      description: 'Date that you want to select inside the calendar. Date format is YYYY-MM-DD.',
      defaultValue: 'null',
      inputValues: ['Date'],
    },
  ];
}
