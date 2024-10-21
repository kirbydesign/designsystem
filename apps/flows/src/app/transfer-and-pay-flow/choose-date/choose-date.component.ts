import { Component } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';
import { TextAndDateService } from '../text-and-date.service';

@Component({
  selector: 'flows-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrls: ['./choose-date.component.scss'],
})
export class ChooseDateComponent {
  todayDate: Date = new Date();
  date: string;

  constructor(
    private textAndDateService: TextAndDateService,
    private modal: Modal
  ) {}

  newDateSelectedSetNewDate(date: Date) {
    this.date = date.toDateString();
  }

  saveDate() {
    this.textAndDateService.setDate(this.date);
    this.modal.close();
  }
}
