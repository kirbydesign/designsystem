import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ModalController } from './modal.controller';
import { ModalOutlet } from './modal-outlet.service';

@Injectable({ providedIn: 'root' })
export class ModalResolver implements Resolve<any> {
  constructor(private modalController: ModalController, private modalOutlet: ModalOutlet) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    /*
    const config: any = {
      title: route.data['modalTitle'],
    };

    console.log('xx resolver!!!');

    if (this.modalOutlet.isModalRoute(state.url)) {
      this.modalController.showModal(config);
    }
*/
    return of(true);
  }
}
