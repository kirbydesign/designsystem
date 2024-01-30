import { Component, NgModule, NgZone } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EMPTY } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { ModalNavigationService } from './modal-navigation.service';

@Component({})
class DummyHomeComponent {}

@Component({})
class BackdropComponent {}

@Component({})
class ModalPageComponent {}

const lazyLoadedRoutes: Routes = [
  {
    path: '',
    redirectTo: 'modal-backdrop',
    pathMatch: 'full',
  },
  {
    path: 'modal-backdrop',
    component: BackdropComponent,
    children: [
      {
        path: 'page1',
        outlet: 'modal',
        component: ModalPageComponent,
      },
      {
        path: 'page2',
        outlet: 'modal',
        component: ModalPageComponent,
      },
    ],
  },
  {
    path: 'other-modal-path',
    component: BackdropComponent,
    children: [
      {
        path: 'page1',
        outlet: 'modal',
        component: ModalPageComponent,
      },
      {
        path: 'page2',
        outlet: 'modal',
        component: ModalPageComponent,
      },
    ],
  },
  {
    path: 'modal-backdrop-with-url-param/:id',
    component: BackdropComponent,
    children: [
      {
        path: 'page1',
        outlet: 'modal',
        component: ModalPageComponent,
      },
      {
        path: 'page2',
        outlet: 'modal',
        component: ModalPageComponent,
      },
    ],
  },
  {
    path: 'modal-route-with-additional-level',
    component: BackdropComponent,
    children: [
      {
        path: 'additional-level',
        children: [
          {
            path: 'page1',
            outlet: 'modal',
            component: ModalPageComponent,
          },
          {
            path: 'page2',
            outlet: 'modal',
            component: ModalPageComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'modal-backdrop-with-url-param-and-additional-level/:id',
    component: BackdropComponent,
    children: [
      {
        path: 'additional-level',
        children: [
          {
            path: 'page1',
            outlet: 'modal',
            component: ModalPageComponent,
          },
          {
            path: 'page2',
            outlet: 'modal',
            component: ModalPageComponent,
          },
        ],
      },
    ],
  },
];

const lazyLoadedRouteConfig: Routes[] = [lazyLoadedRoutes];

@NgModule({
  imports: [RouterModule.forChild(lazyLoadedRoutes)],
})
export class LazyLoadedModule {}

describe('ModalNavigationService', () => {
  let spectator: SpectatorService<ModalNavigationService>;
  let router: Router;
  let zone: NgZone;

  const createService = createServiceFactory({
    service: ModalNavigationService,
    imports: [
      RouterTestingModule.withRoutes([
        {
          path: 'home',
          component: DummyHomeComponent,
          children: [
            {
              path: 'modal-lazy',
              loadChildren: () =>
                import('./modal-navigation.service.spec').then((m) => m.LazyLoadedModule),
            },
            {
              path: 'other-root-modal-path',
              component: BackdropComponent,
              children: [
                {
                  path: 'page1',
                  outlet: 'modal',
                  component: ModalPageComponent,
                },
                {
                  path: 'page2',
                  outlet: 'modal',
                  component: ModalPageComponent,
                },
              ],
            },
          ],
        },
      ]),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    router = spectator.inject(Router);
    zone = spectator.inject(NgZone);
    zone.run(() => router.initialNavigation());
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getModalNavigation', () => {
    describe('when navigation to modal route has NOT YET finished', () => {
      describe('modalNavigation.activated$', () => {
        it('should emit initial modal route activation', async () => {
          zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
              { outlets: { modal: ['page1'] } },
            ])
          );

          let modalRouteActivated = false;
          const subscription = (
            await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
          ).activated$.subscribe(() => (modalRouteActivated = true));

          expect(modalRouteActivated).toBeTrue();
          subscription.unsubscribe();
        });
      });
    });

    [false, true].forEach((navigationHasFinished) => {
      const navigationStateMsg = navigationHasFinished
        ? 'when navigation HAS finished'
        : 'when navigation has NOT YET finished';

      describe(navigationStateMsg, () => {
        beforeEach(async () => {
          const navToLazyLoadedRoot = () => zone.run(() => router.navigate(['home', 'modal-lazy']));
          if (navigationHasFinished) {
            await navToLazyLoadedRoot();
          } else {
            navToLazyLoadedRoot();
          }
        });

        [false, true].forEach((routeHasUrlParams) => {
          const urlMsg = routeHasUrlParams
            ? 'when route has url params'
            : 'when route DOES NOT have url params';
          const backdropSegments = routeHasUrlParams
            ? ['modal-backdrop-with-url-param', '123']
            : ['modal-backdrop'];
          describe(urlMsg, () => {
            describe('modalNavigation.activated$', () => {
              it('should emit when navigating within routeConfig', async () => {
                let modalRouteActivated = false;
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).activated$.subscribe(() => (modalRouteActivated = true));

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page1'] } },
                  ])
                );

                expect(modalRouteActivated).toBeTrue();
                subscription.unsubscribe();
              });

              it('should emit when navigating from backdrop route to child modal route within routeConfig', async () => {
                let modalRouteActivated = false;
                await zone.run(() => router.navigate(['home', 'modal-lazy', ...backdropSegments]));
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).activated$.subscribe(() => (modalRouteActivated = true));

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page1'] } },
                  ])
                );

                expect(modalRouteActivated).toBeTrue();
                subscription.unsubscribe();
              });

              it('should emit when navigating from modal route to another modal route within routeConfig', async () => {
                let modalRouteActivated = false;
                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page1'] } },
                  ])
                );
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).activated$.subscribe(() => (modalRouteActivated = true));

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    'other-modal-path',
                    { outlets: { modal: ['page1'] } },
                  ])
                );

                expect(modalRouteActivated).toBeTrue();
                subscription.unsubscribe();
              });

              it(`should emit with 'isNewModal=false' when navigating from modal route to sibling modal route within routeConfig`, async () => {
                let isNewModal: boolean;
                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page1'] } },
                  ])
                );
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).activated$.subscribe(
                  (modalRouteActivation) => (isNewModal = modalRouteActivation.isNewModal)
                );

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page2'] } },
                  ])
                );

                expect(isNewModal).toBeDefined();
                expect(isNewModal).toBeFalse();
                subscription.unsubscribe();
              });

              it('should NOT emit when navigating outside routeConfig', async () => {
                let modalRouteActivated = false;
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).activated$.subscribe(() => (modalRouteActivated = true));

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'other-root-modal-path',
                    { outlets: { modal: ['page1'] } },
                  ])
                );

                expect(modalRouteActivated).toBeFalse();
                subscription.unsubscribe();
              });

              it('should NOT emit when navigating from modal route to another modal route outside routeConfig', async () => {
                let modalRouteActivated = false;
                await zone.run(() =>
                  router.navigate([
                    'home',
                    'other-root-modal-path',
                    { outlets: { modal: ['page1'] } },
                  ])
                );
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).activated$.subscribe(() => (modalRouteActivated = true));

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'other-root-modal-path',
                    { outlets: { modal: ['page1'] } },
                  ])
                );

                expect(modalRouteActivated).toBeFalse();
                subscription.unsubscribe();
              });

              it('should NEVER emit when routeConfig is null', async () => {
                const actual = await spectator.service.getModalNavigation(null);
                expect(actual.activated$).toEqual(EMPTY);
              });
            });

            describe('ModalNavigation.deactivated$', () => {
              it('should emit when navigating away from modal route', async () => {
                let modalRouteDeactivated = false;
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).deactivated$.subscribe(() => (modalRouteDeactivated = true));
                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page1'] } },
                  ])
                );

                await zone.run(() => router.navigate(['home', 'modal-lazy', ...backdropSegments]));

                expect(modalRouteDeactivated).toBeTrue();
                subscription.unsubscribe();
              });

              it('should NOT emit on non-modal routes', async () => {
                let modalRouteDeactivated = false;
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).deactivated$.subscribe(() => (modalRouteDeactivated = true));

                await zone.run(() => router.navigate(['home', 'modal-lazy', ...backdropSegments]));
                await zone.run(() => router.navigate(['']));

                expect(modalRouteDeactivated).toBeFalse();
                subscription.unsubscribe();
              });

              it('should NOT emit when navigating from modal route to another modal route', async () => {
                let modalRouteDeactivated = false;
                const subscription = (
                  await spectator.service.getModalNavigation(lazyLoadedRouteConfig)
                ).deactivated$.subscribe(() => (modalRouteDeactivated = true));

                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page1'] } },
                  ])
                );
                await zone.run(() =>
                  router.navigate([
                    'home',
                    'modal-lazy',
                    ...backdropSegments,
                    { outlets: { modal: ['page2'] } },
                  ])
                );

                expect(modalRouteDeactivated).toBeFalse();
                subscription.unsubscribe();
              });

              it('should NEVER emit when routeConfig is null', async () => {
                const actual = await spectator.service.getModalNavigation(null);
                expect(actual.deactivated$).toEqual(EMPTY);
              });
            });
          });
        });
      });
    });
  });

  describe('navigateOutOfModalOutlet', () => {
    describe('by default', () => {
      it('should navigate 1 level up to backdrop route', async () => {
        await zone.run(() =>
          router.navigate([
            'home',
            'modal-lazy',
            'modal-backdrop',
            { outlets: { modal: ['page1'] } },
          ])
        );
        let urlAfterRedirects: string;
        router.events
          .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            first()
          )
          .subscribe((nav) => (urlAfterRedirects = nav.urlAfterRedirects));

        await spectator.service.navigateOutOfModalOutlet();

        expect(urlAfterRedirects).toEqual('/home/modal-lazy/modal-backdrop');
      });
    });

    describe('when modal backdrop route has url param', () => {
      it('should navigate 1 level up to backdrop route', async () => {
        await zone.run(() =>
          router.navigate([
            'home',
            'modal-lazy',
            'modal-backdrop-with-url-param',
            '1978',
            { outlets: { modal: ['page1'] } },
          ])
        );
        let urlAfterRedirects: string;
        router.events
          .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            first()
          )
          .subscribe((nav) => (urlAfterRedirects = nav.urlAfterRedirects));

        await spectator.service.navigateOutOfModalOutlet();

        expect(urlAfterRedirects).toEqual('/home/modal-lazy/modal-backdrop-with-url-param/1978');
      });
    });

    describe('when modal route has additional level', () => {
      it('should navigate 2 levels up to backdrop route', async () => {
        await zone.run(() =>
          router.navigate([
            'home',
            'modal-lazy',
            'modal-route-with-additional-level',
            'additional-level',
            { outlets: { modal: ['page1'] } },
          ])
        );
        let urlAfterRedirects: string;
        router.events
          .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            first()
          )
          .subscribe((nav) => (urlAfterRedirects = nav.urlAfterRedirects));

        await spectator.service.navigateOutOfModalOutlet();

        expect(urlAfterRedirects).toEqual('/home/modal-lazy/modal-route-with-additional-level');
      });
    });

    describe('when modal backdrop route has url param and additional level', () => {
      it('should navigate 2 level up to backdrop route', async () => {
        await zone.run(() =>
          router.navigate([
            'home',
            'modal-lazy',
            'modal-backdrop-with-url-param-and-additional-level',
            '1978',
            'additional-level',
            { outlets: { modal: ['page1'] } },
          ])
        );
        let urlAfterRedirects: string;
        router.events
          .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            first()
          )
          .subscribe((nav) => (urlAfterRedirects = nav.urlAfterRedirects));

        await spectator.service.navigateOutOfModalOutlet();

        expect(urlAfterRedirects).toEqual(
          '/home/modal-lazy/modal-backdrop-with-url-param-and-additional-level/1978'
        );
      });
    });
  });
});
