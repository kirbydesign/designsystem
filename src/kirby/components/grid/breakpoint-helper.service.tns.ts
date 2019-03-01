import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { screen } from 'tns-core-modules/platform';
import { OrientationChangedEventData } from 'tns-core-modules/application';
import * as app from 'tns-core-modules/application';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointHelperService implements OnDestroy {
  currentScreenWidth: number;
  private orientationChangedSubject = new Subject<void>();

  constructor(private zone: NgZone) {
    this.init();
  }

  private init() {
    this.currentScreenWidth = screen.mainScreen.widthDIPs;
    app.on(app.orientationChangedEvent, (args: OrientationChangedEventData) => {
      if (args.newValue === 'portrait') {
        if (screen.mainScreen.heightDIPs > screen.mainScreen.widthDIPs) {
          this.currentScreenWidth = screen.mainScreen.widthDIPs;
        } else {
          this.currentScreenWidth = screen.mainScreen.heightDIPs;
        }
      } else if (args.newValue === 'landscape') {
        if (screen.mainScreen.heightDIPs > screen.mainScreen.widthDIPs) {
          this.currentScreenWidth = screen.mainScreen.heightDIPs;
        } else {
          this.currentScreenWidth = screen.mainScreen.widthDIPs;
        }
      }
      // Run in the zone, to make sure Angular data binding is informed of this:
      this.zone.run(() => this.orientationChangedSubject.next());
    });
  }

  observe(): Observable<void> {
    return this.orientationChangedSubject.asObservable();
  }

  ngOnDestroy() {
    this.orientationChangedSubject.complete();
  }
}
