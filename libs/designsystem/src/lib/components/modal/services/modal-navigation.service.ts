import { Injectable } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationEnd, Route, Router, Routes } from '@angular/router';
import { EMPTY } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
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

  private getModalRouteMap(routeConfig: Routes[]): Map<string, string> {
    const flattenedRoutes: Routes = [].concat(...routeConfig);
    let modalRoutes: string[] = [];
    const moduleRootPaths = this.getModuleRootPath(flattenedRoutes);
    if (moduleRootPaths) {
      modalRoutes = this.getModalRoutePaths(flattenedRoutes, ['', ...moduleRootPaths]);
    }
    return new Map(modalRoutes.map((modalRoute) => [modalRoute, modalRoute]));
  }

  private getModuleRootPath(routes: Routes) {
    const currentRoutePaths = this.getCurrentRoutePaths(this.router.getCurrentNavigation());
    this.removeChildSegments(currentRoutePaths, routes);
    return currentRoutePaths;
  }

  private getCurrentRoutePaths(navigation: Navigation) {
    if (!navigation) return [];

    const urlTree = navigation.finalUrl || navigation.extractedUrl; // finalUrl not always available, fallback to extractedUrl
    const primaryOutletKey = 'primary';
    const primaryUrlSegmentGroup = urlTree.root.children[primaryOutletKey];
    const primaryUrlSegments = (primaryUrlSegmentGroup && primaryUrlSegmentGroup.segments) || [];
    return primaryUrlSegments.map((segment) => segment.path);
  }

  private removeChildSegments(currentRoutePaths: string[], routes: Routes) {
    if (!currentRoutePaths || !currentRoutePaths.length) return;

    const moduleRelativePaths = this.getRoutePaths(routes, ['']);
    moduleRelativePaths.sort().reverse(); // Ensure child paths are evaluated first
    const currentUrl = currentRoutePaths.join('/');
    let matchedChildRoute = moduleRelativePaths.find((path) => currentUrl.endsWith(path));
    if (matchedChildRoute) {
      const relativeChildRoute = matchedChildRoute.startsWith('/')
        ? matchedChildRoute.substring(1)
        : matchedChildRoute;
      const childSegmentCount = relativeChildRoute.split('/').length;
      currentRoutePaths.splice(-childSegmentCount); // Pop child segments from end of current route path
    }
  }

  private getRoutePaths(routes: Routes, parentPath: string[]): string[] {
    return Array.isArray(routes)
      ? ([] as string[]).concat(...routes.map((route) => this.getRoutePath(route, parentPath)))
      : [];
  }

  private getRoutePath(route: Route, parentPath: string[]): string[] {
    const routes: string[] = [];
    if (!!route.outlet) return routes; // Don't return relative paths for outlet routes

    const currentPath = [...parentPath];
    if (!!route.path) {
      currentPath.push(route.path);
      routes.push(currentPath.join('/'));
    }

    return routes.concat(this.getRoutePaths(route.children, currentPath));
  }

  private getModalRoutePath(route: Route, parentPath: string[]): string[] {
    const modalOutletName = 'modal';
    if (!!route.path && route.outlet === modalOutletName) {
      const modalOutletPath = `(${modalOutletName}:${route.path})`;
      const modalRoutePath = [...parentPath, modalOutletPath].join('/');
      return [modalRoutePath];
    }
    const currentPath = [...parentPath];
    if (!!route.path) {
      currentPath.push(route.path);
    }
    return ([] as string[]).concat(...this.getModalRoutePaths(route.children, currentPath));
  }

  private getModalRoutePaths(routes: Routes, parentPath: string[]): string[] {
    return Array.isArray(routes)
      ? ([] as string[]).concat(...routes.map((route) => this.getModalRoutePath(route, parentPath)))
      : [];
  }

  private isNewModalWindow(navigationEnd: NavigationEnd) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation || !currentNavigation.previousNavigation) {
      return true;
    }
    const previousRoutePath = (
      currentNavigation.previousNavigation.finalUrl ||
      currentNavigation.previousNavigation.extractedUrl
    ).toString();
    const wasModalRoute = this.isModalRoute(previousRoutePath);
    const isModalRoute = this.isModalRoute(navigationEnd.urlAfterRedirects);
    if (!wasModalRoute && isModalRoute) {
      return true;
    }

    const currentModalRouteParent = navigationEnd.urlAfterRedirects.split('/(modal:')[0];
    const previousModalRouteParent = previousRoutePath.split('/(modal:')[0];

    return previousModalRouteParent !== currentModalRouteParent;
  }

  private navigationEndListener$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  );

  modalRouteActivated$ = this.navigationEndListener$.pipe(
    map((event) => this.isModalRoute(event.urlAfterRedirects)),
    filter((isModalRoute) => isModalRoute),
    map(() => this.getCurrentActivatedRoute())
  );

  modalRouteDeactivatedFor(routeConfig: Routes[]) {
    if (Array.isArray(routeConfig)) {
      const modalRouteMap = this.getModalRouteMap(routeConfig);
      const hasModalRoutes = modalRouteMap.size > 0;
      if (hasModalRoutes) {
        return this.navigationEndListener$.pipe(
          pairwise(),
          filter(([prevNavigation, _]) => this.isModalRoute(prevNavigation.urlAfterRedirects)), // Only emit if previous route was modal
          map(([_, currentNavigation]) => {
            const isNewModalRoute = this.isModalRoute(currentNavigation.urlAfterRedirects);
            // Deactivate modal route if new route is NOT modal OR is outside current parent route:
            return !isNewModalRoute || this.isNewModalWindow(currentNavigation);
          }),
          filter((isDeactivation) => isDeactivation)
        );
      }
    }
    return EMPTY;
  }

  modalRouteActivatedFor(routeConfig: Routes[]) {
    if (Array.isArray(routeConfig)) {
      const modalRouteMap = this.getModalRouteMap(routeConfig);
      const hasModalRoutes = modalRouteMap.size > 0;

      if (hasModalRoutes) {
        return this.navigationEndListener$.pipe(
          filter((navigationEnd) => modalRouteMap.has(navigationEnd.urlAfterRedirects)),
          map((navigationEnd) => ({
            route: this.getCurrentActivatedRoute(),
            isNewModal: this.isNewModalWindow(navigationEnd),
          }))
        );
      }
    }
    return EMPTY;
  }

  async navigateToModal(path: string | string[], route?: ActivatedRoute): Promise<boolean> {
    const commands = Array.isArray(path) ? path : path.split('/');
    const childPath = commands.pop();
    const result = await this.router.navigate([...commands, { outlets: { modal: [childPath] } }], {
      relativeTo: route || this.getCurrentActivatedRoute(),
    });
    return result;
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
