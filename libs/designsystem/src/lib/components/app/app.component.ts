import { Component, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

import { RouterOutletComponent } from '../router-outlet/router-outlet.component';
import { ModalController } from '../modal/services/modal.controller';

@Component({
  selector: 'kirby-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  @ContentChild(RouterOutletComponent, { static: false, read: ElementRef })
  private routerOutlet?: ElementRef<HTMLElement>;

  constructor(private modalController: ModalController) {}

  ngAfterContentInit(): void {
    if (this.routerOutlet && this.routerOutlet.nativeElement) {
      this.modalController.registerPresentingElement(this.routerOutlet.nativeElement);
    }
  }
}
