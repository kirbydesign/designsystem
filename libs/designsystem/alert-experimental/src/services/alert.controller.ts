import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from, Observable, Subject, switchMap, tap } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertExperimentalComponent } from '../alert.component';
import { AlertConfig } from '../config/alert-config';

type AlertDismissObservables = {
  onWillDismiss: Observable<OverlayEventDetail>;
  onDidDismiss: Observable<OverlayEventDetail>;
};

@Injectable()
export class AlertExperimentalController {
  constructor(private ionicModalController: ModalController) {}

  public showAlert(config: AlertConfig): AlertDismissObservables {
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

  private getComponentProps(config: AlertConfig) {
    return {
      ...config,
      okBtn: this.getOkBtn(config),
      cancelBtn: config.cancelBtn,
      okBtnIsDestructive: this.getOkBtnIsDestructive(config),
      iconName: config.icon && config.icon.name,
      iconThemeColor: config.icon && config.icon.themeColor,
    };
  }

  private getOkBtn(config: AlertConfig) {
    let text: string;

    if (config.okBtn) {
      if (typeof config.okBtn === 'string') {
        text = config.okBtn;
      } else {
        text = config.okBtn.text;
      }
    }
    return text;
  }

  getOkBtnIsDestructive(config) {
    return typeof config.okBtn === 'object' ? config.okBtn.isDestructive : undefined;
  }
}
