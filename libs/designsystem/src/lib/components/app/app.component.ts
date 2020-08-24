import { Component, ContentChild, ElementRef, AfterContentInit, ViewChild } from '@angular/core';
import { IonApp } from '@ionic/angular';

import { RouterOutletComponent } from '../router-outlet/router-outlet.component';
import { ModalController } from '../modal/services/modal.controller';

@Component({
  selector: 'kirby-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  @ViewChild(IonApp, { static: true, read: ElementRef })
  private ionAppElement: ElementRef<HTMLIonAppElement>;

  @ContentChild(RouterOutletComponent, { static: false, read: ElementRef })
  private routerOutlet?: ElementRef<HTMLElement>;

  constructor(private modalController: ModalController) {}

  ngAfterContentInit(): void {
    if (this.routerOutlet && this.routerOutlet.nativeElement) {
      this.modalController.registerPresentingElement(this.routerOutlet.nativeElement);
    }

    this.ionAppElement.nativeElement.componentOnReady().then(() => this.registerInputs());
  }

  registerInputs() {
    // Input might be already loaded in the DOM before ion-device-hacks did.
    // At this point we need to look for all of the inputs not registered yet
    // and register them.
    // There is no Ionic event to hook into, so we'll use a timeout
    // to ensure ion-device-hacks has run:
    const ensureIonicDeviceHacksDelay = 250;
    setTimeout(() => {
      document.querySelectorAll('kirby-form-field').forEach((formField) => {
        document.dispatchEvent(
          new CustomEvent('ionInputDidLoad', {
            detail: formField,
          })
        );
      });
    }, ensureIonicDeviceHacksDelay);
  }
}
