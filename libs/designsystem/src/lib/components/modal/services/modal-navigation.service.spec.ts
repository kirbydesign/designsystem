import { Component, NgModule, NgZone } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EMPTY } from 'rxjs';

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

      describe('modalRouteActivatedFor', () => {
        it('should emit when navigating within routeConfig', async () => {
          let modalRouteActivated = false;
          const subscription = (
            await spectator.service.modalRouteActivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteActivated = true));

          await zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
              { outlets: { modal: ['page1'] } },
            ])
          );

          expect(modalRouteActivated).toBeTrue();
          subscription.unsubscribe();
        });

        it('should emit when navigating from backdrop route to child modal route within routeConfig', async () => {
          let modalRouteActivated = false;
          await zone.run(() => router.navigate(['home', 'modal-lazy', 'modal-backdrop']));
          const subscription = (
            await spectator.service.modalRouteActivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteActivated = true));

          await zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
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
              'modal-backdrop',
              { outlets: { modal: ['page1'] } },
            ])
          );
          const subscription = (
            await spectator.service.modalRouteActivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteActivated = true));

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
              'modal-backdrop',
              { outlets: { modal: ['page1'] } },
            ])
          );
          const subscription = (
            await spectator.service.modalRouteActivatedFor(lazyLoadedRouteConfig)
          ).subscribe((modalRouteActivation) => (isNewModal = modalRouteActivation.isNewModal));

          await zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
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
            await spectator.service.modalRouteActivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteActivated = true));

          await zone.run(() =>
            router.navigate(['home', 'other-root-modal-path', { outlets: { modal: ['page1'] } }])
          );

          expect(modalRouteActivated).toBeFalse();
          subscription.unsubscribe();
        });

        it('should NOT emit when navigating from modal route to another modal route outside routeConfig', async () => {
          let modalRouteActivated = false;
          await zone.run(() =>
            router.navigate(['home', 'other-root-modal-path', { outlets: { modal: ['page1'] } }])
          );
          const subscription = (
            await spectator.service.modalRouteActivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteActivated = true));

          await zone.run(() =>
            router.navigate(['home', 'other-root-modal-path', { outlets: { modal: ['page1'] } }])
          );

          expect(modalRouteActivated).toBeFalse();
          subscription.unsubscribe();
        });

        it('should NEVER emit when routeConfig is null', async () => {
          const actual = await spectator.service.modalRouteActivatedFor(null);
          expect(actual).toEqual(EMPTY);
        });
      });

      describe('modalRouteDeactivatedFor', () => {
        it('should emit when navigating away from modal route', async () => {
          let modalRouteDeactivated = false;
          const subscription = (
            await spectator.service.modalRouteDeactivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteDeactivated = true));
          await zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
              { outlets: { modal: ['page1'] } },
            ])
          );

          await zone.run(() => router.navigate(['home', 'modal-lazy', 'modal-backdrop']));

          expect(modalRouteDeactivated).toBeTrue();
          subscription.unsubscribe();
        });

        it('should NOT emit on non-modal routes', async () => {
          let modalRouteDeactivated = false;
          const subscription = (
            await spectator.service.modalRouteDeactivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteDeactivated = true));

          await zone.run(() => router.navigate(['home', 'modal-lazy', 'modal-backdrop']));
          await zone.run(() => router.navigate(['']));

          expect(modalRouteDeactivated).toBeFalse();
          subscription.unsubscribe();
        });

        it('should NOT emit when navigating from modal route to another modal route', async () => {
          let modalRouteDeactivated = false;
          const subscription = (
            await spectator.service.modalRouteDeactivatedFor(lazyLoadedRouteConfig)
          ).subscribe((_) => (modalRouteDeactivated = true));

          await zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
              { outlets: { modal: ['page1'] } },
            ])
          );
          await zone.run(() =>
            router.navigate([
              'home',
              'modal-lazy',
              'modal-backdrop',
              { outlets: { modal: ['page2'] } },
            ])
          );

          expect(modalRouteDeactivated).toBeFalse();
          subscription.unsubscribe();
        });

        it('should NEVER emit when routeConfig is null', async () => {
          const actual = await spectator.service.modalRouteDeactivatedFor(null);
          expect(actual).toEqual(EMPTY);
        });
      });
    });
  });
});
