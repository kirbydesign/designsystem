import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem';
import { SlideButtonComponent } from '@kirbydesign/designsystem/slide-button';

const config = {
  template: `<kirby-slide-button
  [text]="'Slide to confirm'"
  aria-label="Confirm"
  (slideDone)="showAlert()"
  aria-label="Unlock"
></kirby-slide-button>
<kirby-slide-button
  [text]="'Slide to confirm'"
  aria-label="Confirm"
  expand="block"
  (slideDone)="showAlert()"
  aria-label="Transfer"
></kirby-slide-button>`,
};
@Component({
  selector: 'cookbook-slide-button-example',
  templateUrl: './slide-button-example.component.html',
  imports: [SlideButtonComponent],
})
export class SlideButtonExampleComponent {
  template: string = config.template;

  constructor(private modalController: ModalController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Your alert',
      message: 'Your alert message',
      okBtn: 'Ok',
      cancelBtn: 'Cancel',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
