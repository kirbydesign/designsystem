import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ChildrenOutletContexts,
  NavigationEnd,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/operators';

import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

@Injectable({ providedIn: 'root' })
export class ModalOutlet {
  resolve$ = this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd),
    filter((event: NavigationEnd) => {
      return this.isModalRoute(event.url);
    })
  );

  constructor(private router: Router, private parentContexts: ChildrenOutletContexts) {}

  destroy() {
    if (!this.isModalRoute(this.router.url)) return;

    this.router.navigate([
      this.router.url.split('(')[0], // current route without secondary routes
      {
        outlets: {
          modal: null,
        },
      },
    ]);
  }

  activate(modalWrapper: ModalWrapperComponent) {
    if (!this.isModalRoute(this.router.url)) return;

    const routerState = this.getRouterState(this.router);
    const modalRouterState = this.getModalOutletRouterState(routerState);
    const outlet = this.parentContexts.getContext('modal').outlet;

    if (!modalRouterState || !outlet) {
      return;
    }

    if (outlet.isActivated) {
      outlet.deactivate();
    }

    // Set modal title from route configuration
    modalWrapper.config.title = modalRouterState.snapshot.data.modalTitle;

    // Load component inside router-outlet
    outlet.activateWith(modalRouterState, this.parentContexts.getContext('modal').resolver);
  }

  isModalRoute(url: string) {
    return url.includes('modal:');
  }

  private getRouterState(router: Router): ActivatedRoute {
    if (
      router ||
      router.routerState ||
      router.routerState['_root'] ||
      router.routerState['_root'].children[0] ||
      router.routerState['_root'].children[0].value
    ) {
      return router.routerState['_root'].children[0].value;
    }
  }

  /*
   * Returns last child of router state recursively
   */
  private getModalOutletRouterState(routerState: ActivatedRoute): ActivatedRoute {
    if (routerState.children[0]) {
      return this.getModalOutletRouterState(routerState.children[0]);
    } else {
      // TODO: CHECK MODAL
      return routerState;
    }
  }
}
