import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from, Observable, Subject, switchMap, tap } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertExperimentalConfig } from '../config/alert-config';
import { AlertExperimentalComponent } from '../alert-experimental.component';

type AlertDismissObservables = {
  onWillDismiss: Observable<OverlayEventDetail>;
  onDidDismiss: Observable<OverlayEventDetail>;
};

@Injectable()
export class AlertExperimentalController {
  constructor(private ionicModalController: ModalController) {}

  public showAlert(config: AlertExperimentalConfig): AlertDismissObservables {
    const $onWillDismiss = new Subject<OverlayEventDetail>();
    const onWillDismiss$ = $onWillDismiss.asObservable();

    const $onDidDismiss = new Subject<OverlayEventDetail>();
    const onDidDismiss$ = $onDidDismiss.asObservable();

    const modal$ = from(
      this.ionicModalController.create({
        component: AlertExperimentalComponent,
        componentProps: this.getComponentProps(config),
        cssClass: ['kirby-overlay', 'kirby-alert'],
        mode: 'ios',
        backdropDismiss: false,
      })
    );

    modal$
      .pipe(
        tap((modal) => from(modal.present())),
        switchMap((modal) => modal.onWillDismiss())
      )
      .subscribe((res) => {
        $onWillDismiss.next(res);
        $onWillDismiss.complete();

        $onDidDismiss.next(res);
        $onDidDismiss.complete();
      });

    return {
      onWillDismiss: onWillDismiss$,
      onDidDismiss: onDidDismiss$,
    };
  }

  private getComponentProps(config: AlertExperimentalConfig) {
    return {
      ...config,
      okButton: this.getOkButton(config),
      cancelButton: config.cancelButton,
      okButtonIsDestructive: this.getOkButtonIsDestructive(config),
      iconName: config.icon && config.icon.name,
      iconThemeColor: config.icon && config.icon.themeColor,
    };
  }

  private getOkButton(config: AlertExperimentalConfig) {
    let text: string;

    if (config.okButton) {
      if (typeof config.okButton === 'string') {
        text = config.okButton;
      } else {
        text = config.okButton.text;
      }
    }
    return text;
  }

  getOkButtonIsDestructive(config) {
    return typeof config.okButton === 'object' ? config.okButton.isDestructive : undefined;
  }
}
