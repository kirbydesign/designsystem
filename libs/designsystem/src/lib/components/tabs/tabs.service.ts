import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private outletSubject$: ReplaySubject<IonRouterOutlet> = new ReplaySubject();
  public outlet$ = this.outletSubject$.asObservable();

  public setOutlet(outlet: IonRouterOutlet) {
    this.outletSubject$.next(outlet);
  }
}
