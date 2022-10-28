import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'kirby-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  // Typically referenced to your ion-router-outlet
  presentingElement = this.ionRouterOutlet.nativeEl;
  constructor(private readonly ionRouterOutlet: IonRouterOutlet) {}

  ngOnInit() {
    console.log('This is presenting element', this.presentingElement);
  }
}
