import { Component, OnInit } from '@angular/core';
import { CalendarComponent, Modal } from '@kirbydesign/designsystem';
import { TextAndDateService } from '../text-and-date.service';

@Component({
  selector: 'flows-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrls: ['./choose-date.component.scss'],
})
export class ChooseDateComponent {
  private date: string;

  constructor(private textAndDateService: TextAndDateService, private modal: Modal) {}

  onDateChange(date: Date) {
    this.date = date.toDateString();
    console.log(this.date);
  }

  saveDate() {
    this.textAndDateService.setDate(this.date);
    this.modal.close();
  }
}
