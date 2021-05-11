import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  outlet$: ReplaySubject<IonRouterOutlet> = new ReplaySubject();

  public setOutlet(outlet: IonRouterOutlet) {
    this.outlet$.next(outlet);
  }
}
