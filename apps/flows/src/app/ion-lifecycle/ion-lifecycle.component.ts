import { Component, OnInit } from '@angular/core';
import { EmitterService } from './emitter.service';

@Component({
  selector: 'app-ion-lifecycle',
  templateUrl: './ion-lifecycle.component.html',
  styleUrls: ['./ion-lifecycle.component.css'],
})
export class IonLifecycleComponent implements OnInit {
  constructor(private emitterService: EmitterService) {
    this.emitterService.componentInit.listen().subscribe((val) => console.log(`test; ${val}`));
    this.emitterService.componentDestroyed.listen().subscribe((val) => console.log(`test; ${val}`));
  }

  ngOnInit() {}
}
