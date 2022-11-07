import { Component, OnInit } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';
import { TextAndDateService } from '../text-and-date.service';

@Component({
  selector: 'flows-choose-text-and-message',
  templateUrl: './choose-text-and-message.component.html',
  styleUrls: ['./choose-text-and-message.component.scss'],
})
export class ChooseTextAndMessageComponent implements OnInit {
  text: string;
  message: string;

  constructor(private textAndDateService: TextAndDateService, private modal: Modal) {}

  ngOnInit(): void {}

  okButton() {
    this.textAndDateService.setText(this.text);
    this.textAndDateService.setMessage(this.message);
    this.modal?.close();
  }
}
