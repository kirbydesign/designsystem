import { Injectable } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class RouterOutletService {
  outlet: IonRouterOutlet;
  constructor(private navCtrl: NavController) {}

  disableSwipe() {
    //this.navCtrl.setTopOutlet(this.outlet);
  }
}
