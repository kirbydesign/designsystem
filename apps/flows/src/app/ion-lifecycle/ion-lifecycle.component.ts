import { Component, OnInit } from '@angular/core';
import { NavController } from '@kirbydesign/designsystem/components/router-outlet';
import { EmitterService } from './emitter.service';

@Component({
  selector: 'app-ion-lifecycle',
  templateUrl: './ion-lifecycle.component.html',
  styleUrls: ['./ion-lifecycle.component.css'],
})
export class IonLifecycleComponent {
  constructor(private emitterService: EmitterService, public navCtrl: NavController) {
    this.emitterService.componentInit.$emitter.subscribe((val) => console.log(`test; ${val}`));
    this.emitterService.componentDestroyed.$emitter.subscribe((val) => console.log(`test; ${val}`));
  }
}
