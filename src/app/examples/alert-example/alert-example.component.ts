import { Component, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'kirby-alert-example',
  templateUrl: './alert-example.component.html',
})
export class AlertExampleComponent {
  private config: AlertConfig = {
    title: 'Your alert',
    message: 'Your alert message',
    okBtnText: 'Ok',
    cancelBtnText: 'Cancel',
  };

  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  showAlert() {
    this.modalController.showAlert(this.config, this.onAlertClosed);
  }

  showReactiveAlert() {
    this.delay(2)
      .pipe(this.modalController.operators.showAlert(this.config))
      .subscribe((response) => console.log('Response from alert (in observable) was:', response));
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }

  private delay(delayInSeconds = 2) {
    return of(null).pipe(
      tap(() => console.log(`Delaying for ${delayInSeconds} seconds`)),
      delay(delayInSeconds * 1000)
    );
  }
}
