import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  outlet$: ReplaySubject<IonRouterOutlet> = new ReplaySubject();

  constructor() {}

  setOutlet(outlet: IonRouterOutlet) {
    this.outlet$.next(outlet);
  }
}
