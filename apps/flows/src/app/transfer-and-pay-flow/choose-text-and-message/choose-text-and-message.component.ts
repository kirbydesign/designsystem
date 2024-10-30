import { Component } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';
import { TextAndDateService } from '../text-and-date.service';

@Component({
  selector: 'flows-choose-text-and-message',
  templateUrl: './choose-text-and-message.component.html',
  styleUrls: ['./choose-text-and-message.component.scss'],
})
export class ChooseTextAndMessageComponent {
  public text: string;
  public message: string;

  constructor(
    private textAndDateService: TextAndDateService,
    private modal: Modal
  ) {}

  setTextAndMessage() {
    this.textAndDateService.setText(this.text);
    this.textAndDateService.setMessage(this.message);
    this.modal.close();
  }
}
