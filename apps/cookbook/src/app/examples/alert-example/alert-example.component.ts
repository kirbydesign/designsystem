import { Component } from '@angular/core';
import { of, Subject, timer } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/operators';

import { ModalController } from '@kirbydesign/designsystem';
import { AlertConfig } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

const alertConfigWithIcon = {
  title: 'Alert With Icon',
  message: 'This message can have more than 1 line.',
  okBtn: 'I agree',
  cancelBtn: 'Take me back',
  icon: { name: 'warning', themeColor: 'warning' },
};

@Component({
  selector: 'cookbook-alert-example',
  templateUrl: './alert-example.component.html',
  styles: [':host { display: block; }'],
})
export class AlertExampleComponent {
  static readonly alertConfigWithIcon = `const config: AlertConfig = ${AlertExampleComponent.stringify(
    alertConfigWithIcon
  )}
  
this.modalController.showAlert(config);`;

  private static stringify(value: any): string {
    return JSON.stringify(value, null, '\t')
      .replace(/"(\w+)":/g, '$1:')
      .replace(/"/g, "'");
  }

  private alertClose$: Subject<void> = new Subject<void>();

  static readonly alertConfigWithDynamicValues = `const title$ = of('Need more time?');
  const message$ = remainingSeconds$.pipe(
    map((remainingSeconds) => \`Time remaining: \${remainingSeconds}\`)
  );

  const config: AlertConfig = {
    title: title$,
    icon: {
      name: 'clock',
      themeColor: 'warning',
    },
    message: message$,
    okBtn: 'Logout',
    cancelBtn: 'Take me back',
  };
  
  this.modalController.showAlert(config);`;
  constructor(private modalController: ModalController, private toastController: ToastController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Default Alert',
      message: 'The default alert is just a title, a message, an OK and (optional) cancel button',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  showAlertWithIcon() {
    this.modalController.showAlert(alertConfigWithIcon, this.onAlertClosed.bind(this));
  }

  showAlertWithoutCancel() {
    const config: AlertConfig = {
      title: 'Alert Without Cancel',
      message: 'This is an alert that can only be acknowledged (no cancel option)',
      okBtn: 'I understand',
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  showDestructiveAlert() {
    const config: AlertConfig = {
      title: 'Desctructive Alert',
      message:
        'This is to indicate that something destructive will happen when clicking the OK button',
      cancelBtn: 'Get me out of here',
      okBtn: { text: 'Confirm', isDestructive: true },
    };
    this.modalController.showAlert(config, this.onAlertDestructiveClosed.bind(this));
  }

  showAlertWithNewline() {
    const config: AlertConfig = {
      title: 'Alert with newline',
      message: 'This is message one.\n\nThis is message two.',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  showAlertWithDynamicValues() {
    const countdownTimeInSeconds = 60;
    const countdownTimeInMs = countdownTimeInSeconds * 1000;
    const intervalInMs = 1000;
    const toRemainingTimeInMs = (count: number) => countdownTimeInMs - count * intervalInMs;
    const toSeconds = (timeInMs: number) => Math.ceil(timeInMs / 1000);

    const remainingTime$ = timer(0, intervalInMs).pipe(
      map(toRemainingTimeInMs),
      takeUntil(this.alertClose$),
      takeWhile((countdownTimeInMs) => countdownTimeInMs >= 0)
    );

    const title$ = of('Need more time?');
    const message$ = remainingTime$.pipe(
      map((remainingTimeInMs) => `Time remaining: ${toSeconds(remainingTimeInMs)}`)
    );
    const config: AlertConfig = {
      title: title$,
      icon: {
        name: 'clock',
        themeColor: 'warning',
      },
      message: message$,
      okBtn: 'Logout',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  private onAlertClosed(result?: boolean) {
    const config: ToastConfig = {
      message: `Alert selection: ${result}`,
      messageType: result ? 'success' : 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
    this.alertClose$.next();
  }

  private onAlertDestructiveClosed(result?: boolean) {
    const config: ToastConfig = {
      message: result ? 'Message deleted' : 'Nothing happened',
      messageType: result ? 'warning' : 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
