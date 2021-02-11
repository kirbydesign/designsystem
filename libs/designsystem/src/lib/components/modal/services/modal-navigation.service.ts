import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, Routes } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { filter, first, map, pairwise, startWith, tap } from 'rxjs/operators';

import { ModalRouteActivation } from './modal.interfaces';

@Injectable({ providedIn: 'root' })
export class ModalNavigationService {
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('*************** ModalNavigationService ctor ***************');
  }

  isModalRoute(url: string): boolean {
    return url.includes('(modal:');
  }

  private getCurrentActivatedRoute(): ActivatedRoute {
    let childRoute = this.route.root;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }
    return childRoute;
  }

  private async getModalRouteMap(
    routeConfig: Routes[],
    moduleRootRoutePath?: string
  ): Promise<Map<string, string>> {
    const flattenedRoutes: Routes = [].concat(...routeConfig);
    let modalRoutes: string[] = [];
    const moduleRootPaths = await this.getModuleRootPath(flattenedRoutes, moduleRootRoutePath);
    if (moduleRootRoutePath) {
      console.warn('ModalNavigationService.getModalRouteMap - moduleRootPaths:', moduleRootPaths);
    }
    if (moduleRootPaths) {
      modalRoutes = this.getModalRoutePaths(flattenedRoutes, moduleRootPaths);
      console.warn('ModalNavigationService.getModalRouteMap - modalRoutes:', modalRoutes);
    }
    return new Map(modalRoutes.map((modalRoute) => [modalRoute, modalRoute]));
  }

  private async getModuleRootPath(routes: Routes, moduleRootRoutePath?: string): Promise<string[]> {
    if (moduleRootRoutePath) {
      const trimmedPaths = moduleRootRoutePath
        .trim()
        .split('/')
        .filter((path) => !!path);
      const rootPath = [''];
      return rootPath.concat(trimmedPaths);
    }

    const currentRoutePaths = await this.getCurrentRoutePaths();
    console.log('currentRoutePaths BEFORE:', currentRoutePaths);
    this.removeChildSegments(currentRoutePaths, routes);
    console.log('currentRoutePaths AFTER:', currentRoutePaths);
    return currentRoutePaths;
  }

  private async getCurrentRoutePaths(): Promise<string[]> {
    const rootPath = [''];
    const currentNavigation = this.router.getCurrentNavigation();

    console.log('this.router.navigated:', this.router.navigated);
    console.log('currentNavigation:', currentNavigation);
    if (!this.router.navigated && !currentNavigation) {
      // If router hasn't navigated yet and we are not in the middle of navigating, assume root:
      console.log('assume root...');
      return rootPath;
    }

    if (currentNavigation) {
      // Wait for current navigation to finish:
      await this.navigationEndListener$.pipe(first()).toPromise();
    }

    let childRoute = this.route.snapshot.root;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }
    const currentBackdropRoutePath = childRoute.pathFromRoot.filter(
      (route) => route.outlet !== 'modal'
    );

    return rootPath.concat(
      ...currentBackdropRoutePath.map((route) =>
        route.url.filter((segment) => !!segment.path).map((segment) => segment.path)
      )
    );
  }

  private removeChildSegments(currentRoutePaths: string[], routes: Routes): void {
    if (!currentRoutePaths.length) return;

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

  private isNewModalWindow(navigationEnd: NavigationEnd): boolean {
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

  private async waitForCurrentThenGetNavigationEndStream(): Promise<Observable<NavigationEnd>> {
    if (this.router.getCurrentNavigation()) {
      const currentNavigationEnd = await this.navigationEndListener$.pipe(first()).toPromise();
      return this.navigationEndListener$.pipe(startWith(currentNavigationEnd));
    }
    return this.navigationEndListener$;
  }

  private modalRouteActivatedFor(
    navigationEnd$: Observable<NavigationEnd>,
    modalRouteMap: Map<string, string>
  ): Observable<ModalRouteActivation> {
    return navigationEnd$.pipe(
      tap((navigationEnd) => {
        console.log('navigationEnd:', navigationEnd);
        console.log('isModalRoute:', this.isModalRoute(navigationEnd.urlAfterRedirects));
        console.log('isNewModal:', this.isNewModalWindow(navigationEnd));
        console.log('modalRouteMap:', modalRouteMap);
      }),
      filter((navigationEnd) => modalRouteMap.has(navigationEnd.urlAfterRedirects)),
      map((navigationEnd) => ({
        route: this.getCurrentActivatedRoute(),
        isNewModal: this.isNewModalWindow(navigationEnd),
      }))
    );
  }

  private modalRouteDeactivatedFor(
    navigationEnd$: Observable<NavigationEnd>,
    modalRouteMap: Map<string, string>
  ): Observable<boolean> {
    return navigationEnd$.pipe(
      pairwise(),
      filter(([prevNavigation, _]) => modalRouteMap.has(prevNavigation.urlAfterRedirects)), // Only emit if previous route was modal
      map(([_, currentNavigation]) => {
        const isNewModalRoute = this.isModalRoute(currentNavigation.urlAfterRedirects);
        // Deactivate modal route if new route is NOT modal OR is outside current parent route:
        return !isNewModalRoute || this.isNewModalWindow(currentNavigation);
      }),
      filter((isDeactivation) => isDeactivation)
    );
  }

  async getModalNavigation(
    routeConfig: Routes[],
    moduleRootRoutePath?: string
  ): Promise<{ activated$: Observable<ModalRouteActivation>; deactivated$: Observable<boolean> }> {
    if (Array.isArray(routeConfig)) {
      const navigationEnd$ = await this.waitForCurrentThenGetNavigationEndStream();
      const modalRouteMap = await this.getModalRouteMap(routeConfig, moduleRootRoutePath);
      const hasModalRoutes = modalRouteMap.size > 0;
      if (hasModalRoutes) {
        const activated$ = this.modalRouteActivatedFor(navigationEnd$, modalRouteMap);
        const deactivated$ = this.modalRouteDeactivatedFor(navigationEnd$, modalRouteMap);
        return { activated$, deactivated$ };
      }
    }
    return { activated$: EMPTY, deactivated$: EMPTY };
  }

  async navigateToModal(path: string | string[]): Promise<boolean> {
    const commands = Array.isArray(path) ? path : path.split('/');
    const childPath = commands.pop();
    const result = await this.router.navigate([...commands, { outlets: { modal: [childPath] } }], {
      relativeTo: this.getCurrentActivatedRoute(),
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
