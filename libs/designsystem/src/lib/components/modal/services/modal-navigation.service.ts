import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';

@Injectable()
export class ModalNavigationService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  private isModalRoute(url: string) {
    return url.includes('(modal:');
  }

  private getCurrentActivatedRoute() {
    let childRoute = this.route.firstChild;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }
    return childRoute;
  }

  private navigationEndListener$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => this.isModalRoute(event.url))
  );

  modalRouteActivated$ = this.navigationEndListener$.pipe(
    filter((isModalRoute) => isModalRoute),
    map(() => this.getCurrentActivatedRoute())
  );

  modalRouteDeactivated$ = this.navigationEndListener$.pipe(
    pairwise(),
    map(([wasModalRoute, isModalRoute]) => wasModalRoute && !isModalRoute),
    filter((isDeactivation) => isDeactivation)
  );

  async navigateToModal(path: string | string[]): Promise<boolean> {
    const commands = Array.isArray(path) ? path : [path];
    const childPath = commands.pop();
    return this.router.navigate([...commands, { outlets: { modal: [childPath] } }], {
      relativeTo: this.getCurrentActivatedRoute(),
    });
  }

  async navigateWithinModal(relativePath: string): Promise<boolean> {
    return this.router.navigate([relativePath], {
      relativeTo: this.getCurrentActivatedRoute(),
    });
  }

  async navigateOutOfModalOutlet(): Promise<boolean> {
    let result = Promise.resolve(true);
    const currentActivatedRoute = this.getCurrentActivatedRoute();
    if (currentActivatedRoute.snapshot.outlet === 'modal') {
      result = this.router.navigate(['./'], {
        relativeTo: this.getCurrentActivatedRoute().parent,
      });
    }
    return result;
  }
}
