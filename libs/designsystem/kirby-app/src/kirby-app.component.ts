import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'kirby-app',
  templateUrl: './kirby-app.component.html',
  styleUrls: ['./kirby-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterContentInit {
  @ViewChild(IonApp, { static: true, read: ElementRef })
  private ionAppElement: ElementRef<HTMLIonAppElement>;

  ngAfterContentInit(): void {
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
        formField.dispatchEvent(new CustomEvent('kirbyRegisterFormField'));
      });
    }, ensureIonicDeviceHacksDelay);
  }
}
