import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-calendar-no-background-example',
  template: `<kirby-calendar (dateChange)="onDateChange($event)"></kirby-calendar>
<div *ngIf="selectedDate">Selected Date: {{ selectedDate | date }}</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
})
export class CalendarNoBackgroundExampleComponent {
  template: string = config.template;

  selectedDate: Date;

  onDateChange(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }
}
