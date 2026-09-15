import { Component } from '@angular/core';
import { AlertConfig, ModalController, SlideButtonComponent } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-simple-slide-button-example',
  template: `<kirby-slide-button
  [text]="'Confirm'"
  aria-label="Confirm"
  (slideDone)="showAlert()"
></kirby-slide-button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [SlideButtonComponent],
})
export class SimpleSlideButtonExampleComponent {
  template: string = config.template;

  constructor(private modalController: ModalController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Confirmation',
      message: 'Are you sure you want to proceed?',
      okBtn: 'Ok',
      cancelBtn: 'Cancel',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
