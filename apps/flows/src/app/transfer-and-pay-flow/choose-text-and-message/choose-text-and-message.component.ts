import { Component, OnInit } from '@angular/core';
import { TextAndDateService } from '../text-and-date.service';

@Component({
  selector: 'flows-choose-text-and-message',
  templateUrl: './choose-text-and-message.component.html',
  styleUrls: ['./choose-text-and-message.component.scss'],
})
export class ChooseTextAndMessageComponent implements OnInit {
  text: string;
  message: string;

  constructor(private textAndDateService: TextAndDateService) {}

  ngOnInit(): void {}

  okButton() {
    this.textAndDateService.setText(this.text);
    this.textAndDateService.setMessage(this.message);
  }
}
