import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private outletSubject$: ReplaySubject<IonRouterOutlet> = new ReplaySubject(1);
  public outlet$ = this.outletSubject$.asObservable();

  public setOutlet(outlet: IonRouterOutlet) {
    this.outletSubject$.next(outlet);
  }

  public resetOutlet() {
    this.outletSubject$.next(null);
  }
}

export { IonRouterOutlet };
