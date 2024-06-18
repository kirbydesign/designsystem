import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Params,
  Route,
  Router,
  Routes,
} from '@angular/router';
import { EMPTY, firstValueFrom, Observable } from 'rxjs';
import { filter, map, pairwise, skipUntil, startWith, takeUntil } from 'rxjs/operators';

import { Location } from '@angular/common';
import { ModalRouteActivation, NavigationData } from './modal.interfaces';
import { AlertConfig } from './public_api';

@Injectable({ providedIn: 'root' })
export class ModalNavigationService {
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

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

  private async getModalRoutes(
    routeConfig: Routes[],
    moduleRootRoutePath?: string
  ): Promise<string[]> {
    const flattenedRoutes: Routes = [].concat(...routeConfig);
    let modalRoutes: string[] = [];
    const moduleRootPaths = await this.getModuleRootPath(flattenedRoutes, moduleRootRoutePath);
    if (moduleRootPaths) {
      modalRoutes = this.getModalRoutePaths(flattenedRoutes, moduleRootPaths);
    }
    return modalRoutes;
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
    const moduleRootPaths = this.getRoutePathsWithoutChildSegments(currentRoutePaths, routes);
    return moduleRootPaths;
  }

  private async getCurrentRoutePaths(): Promise<string[]> {
    const rootPath = [''];
    const currentNavigation = this.router.getCurrentNavigation();

    if (!this.router.navigated && !currentNavigation) {
      // If router hasn't navigated yet and we are not in the middle of navigating, assume root:
      return rootPath;
    }

    if (currentNavigation) {
      // Wait for current navigation to finish:
      await firstValueFrom(this.navigationEndListener$);
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

  private getRoutePathsWithoutChildSegments(routePaths: string[], routes: Routes): string[] {
    if (!routePaths.length) return routePaths;

    const matchedChildRoute = this.findChildRouteForUrl(routePaths.join('/'), routes);

    if (!matchedChildRoute) return routePaths;

    const startSlashRegex = /^\//;
    const relativeChildRoute = matchedChildRoute.replace(startSlashRegex, '');
    const childSegmentCount = relativeChildRoute.split('/').length;
    const routePathsWithoutChildSegments = routePaths.slice(0, -childSegmentCount); // Remove child segments from end of route path array
    return routePathsWithoutChildSegments;
  }

  private findChildRouteForUrl(url: string, routes: Routes) {
    const moduleRelativePaths = this.getRoutePaths(routes, ['']).sort().reverse(); // Ensure child paths are evaluated first
    let matchedChildRoute = moduleRelativePaths.find((path) => url.endsWith(path));
    if (!matchedChildRoute) {
      // No static child route found matching current route - look for child route with url params:
      const exactMatch = false;
      matchedChildRoute = moduleRelativePaths.find(
        (path) =>
          path.includes('/:') && this.pathContainsChildRouteWithUrlParams(url, path, exactMatch)
      );
    }
    return matchedChildRoute;
  }

  private pathContainsChildRouteWithUrlParams(
    path: string,
    childRouteWithUrlParams: string,
    exactMatch: boolean
  ) {
    const pathSegments = path.split('/');
    const startSlashRegex = /^\//;
    let childRouteToMatch = childRouteWithUrlParams;
    if (!exactMatch) {
      const relativeChildRoute = childRouteWithUrlParams.replace(startSlashRegex, '');
      childRouteToMatch = relativeChildRoute;
    }
    const childRouteSegments = childRouteToMatch.split('/');
    // Match each child route segment against url
    // Match backwards from end to start of child route, i.e. "url ends with child route":
    const pathContainsChildRoute = childRouteSegments.reverse().every((childRouteSegment) => {
      const pathSegment = pathSegments.pop();
      // url params (e.g. `/:id/`) are treated as a match:
      return childRouteSegment.startsWith(':') || childRouteSegment === pathSegment;
    });
    if (exactMatch) {
      // Only match if we've reached the start of the url to match against:
      return pathSegments.length === 0 && pathContainsChildRoute;
    }
    return pathContainsChildRoute;
  }

  private getRoutePaths(routes: Routes, parentPath: string[]): string[] {
    return Array.isArray(routes)
      ? ([] as string[]).concat(...routes.map((route) => this.getRoutePath(route, parentPath)))
      : [];
  }

  private getRoutePath(route: Route, parentPath: string[]): string[] {
    const routes: string[] = [];
    if (route.outlet) return routes; // Don't return relative paths for outlet routes

    const currentPath = [...parentPath];
    if (route.path) {
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
    if (route.path) {
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
      const currentNavigationEnd = await firstValueFrom(this.navigationEndListener$);
      return this.navigationEndListener$.pipe(startWith(currentNavigationEnd));
    }
    return this.navigationEndListener$;
  }

  private modalRouteActivatedFor(
    navigationEnd$: Observable<NavigationEnd>,
    modalRouteSet: Set<string>,
    modalRoutesContainsUrlParams: boolean
  ): Observable<ModalRouteActivation> {
    return navigationEnd$.pipe(
      filter((navigationEnd) =>
        this.modalRouteSetContainsPath(modalRouteSet, navigationEnd, modalRoutesContainsUrlParams)
      ),
      map((navigationEnd) => {
        const locationState = this.location.getState() as NavigationData;
        return {
          route: this.getCurrentActivatedRoute(),
          modalData: locationState.navigationData,
          isNewModal: this.isNewModalWindow(navigationEnd),
        };
      })
    );
  }

  private modalRouteDeactivatedFor(
    navigationEnd$: Observable<NavigationEnd>,
    modalRouteSet: Set<string>,
    modalRoutesContainsUrlParams: boolean
  ): Observable<boolean> {
    return navigationEnd$.pipe(
      pairwise(),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      filter(([prevNavigation, _]) =>
        this.modalRouteSetContainsPath(modalRouteSet, prevNavigation, modalRoutesContainsUrlParams)
      ), // Only emit if previous route was modal
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_, currentNavigation]) => {
        const isNewModalRoute = this.isModalRoute(currentNavigation.urlAfterRedirects);
        // Deactivate modal route if new route is NOT modal OR is outside current parent route:
        return !isNewModalRoute || this.isNewModalWindow(currentNavigation);
      }),
      filter((isDeactivation) => isDeactivation)
    );
  }

  private modalRouteSetContainsPath(
    modalRouteSet: Set<string>,
    navigationEnd: NavigationEnd,
    modalRoutesContainsUrlParams: boolean
  ) {
    const pathname = navigationEnd.urlAfterRedirects.split('?')[0];
    let hasRoute = modalRouteSet.has(pathname);
    if (!hasRoute && modalRoutesContainsUrlParams) {
      // Use `for ... of` instead of `forEach` so we can break out of the loop if route is found:
      for (const route of modalRouteSet) {
        const exactMatch = true;
        const routeMatchesPath = this.pathContainsChildRouteWithUrlParams(
          pathname,
          route,
          exactMatch
        );
        if (routeMatchesPath) {
          hasRoute = true;
          break;
        }
      }
    }
    return hasRoute;
  }

  async getModalNavigation(
    routeConfig: Routes[],
    moduleRootRoutePath?: string
  ): Promise<{ activated$: Observable<ModalRouteActivation>; deactivated$: Observable<boolean> }> {
    if (Array.isArray(routeConfig)) {
      const navigationEnd$ = await this.waitForCurrentThenGetNavigationEndStream();
      const modalRoutes = await this.getModalRoutes(routeConfig, moduleRootRoutePath);
      const hasModalRoutes = modalRoutes.length > 0;
      if (hasModalRoutes) {
        const modalRoutesContainsUrlParams = modalRoutes.some((route) => route.includes('/:'));
        const modalRouteSet = new Set(modalRoutes);
        const activated$ = this.modalRouteActivatedFor(
          navigationEnd$,
          modalRouteSet,
          modalRoutesContainsUrlParams
        );
        const deactivated$ = this.modalRouteDeactivatedFor(
          navigationEnd$,
          modalRouteSet,
          modalRoutesContainsUrlParams
        );
        return { activated$, deactivated$ };
      }
    }

    return { activated$: EMPTY, deactivated$: EMPTY };
  }

  async navigateToModal(
    path: string | string[],
    queryParams?: Params,
    alertConfig?: AlertConfig
  ): Promise<boolean> {
    const commands = Array.isArray(path) ? [...path] : path.split('/');
    const childPath = commands.pop();
    const navigationData: NavigationData = { navigationData: { alertConfig } };
    const result = await this.router.navigate([...commands, { outlets: { modal: [childPath] } }], {
      queryParams,
      relativeTo: this.getCurrentActivatedRoute(),
      state: navigationData,
    });
    return result;
  }

  async navigateWithinModal(relativePath: string, queryParams?: Params): Promise<boolean> {
    return this.router.navigate([relativePath], {
      queryParams,
      relativeTo: this.getCurrentActivatedRoute(),
    });
  }

  async navigateOutOfModalOutlet(): Promise<boolean> {
    const currentActivatedRoute = this.getCurrentActivatedRoute();
    const currentNavigationFinalUrl = this.router.getCurrentNavigation()?.finalUrl?.toString();
    const isCurrentlyNavigatingOutOfModalOutlet =
      currentNavigationFinalUrl && !this.isModalRoute(currentNavigationFinalUrl);

    if (currentActivatedRoute.outlet !== 'modal' || isCurrentlyNavigatingOutOfModalOutlet) {
      // Nothing to do here, bail out:
      return Promise.resolve(true);
    }

    const parentRoute = this.getBackdropRoute(currentActivatedRoute);
    return this.router.navigate(['./'], {
      relativeTo: parentRoute,
    });
  }

  private getBackdropRoute(currentActivatedRoute: ActivatedRoute) {
    let parentRoute = currentActivatedRoute.parent;
    while (parentRoute && !parentRoute.component && !!parentRoute.parent) {
      parentRoute = parentRoute.parent;
    }
    return parentRoute;
  }

  handleBrowserBackButton(modal: HTMLIonModalElement) {
    const popstateNavigationStart$ = this.router.events.pipe(
      filter(
        (event): event is NavigationStart =>
          event instanceof NavigationStart && event.navigationTrigger === 'popstate'
      )
    );
    const navigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navigationEnd$
      .pipe(skipUntil(popstateNavigationStart$), takeUntil(modal.onWillDismiss()))
      .subscribe(() => {
        modal.dismiss();
      });
  }
}
