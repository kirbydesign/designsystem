import { Component, NgZone } from '@angular/core';
import { Router, Routes, ROUTES } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ModalNavigationService } from './modal-navigation.service';

@Component({})
class BackdropComponent {}

@Component({})
class ModalPageComponent {}

describe('ModalNavigationService', () => {
  let spectator: SpectatorService<ModalNavigationService>;
  let routeConfig: Routes[];
  let router: Router;
  let zone: NgZone;

  const createService = createServiceFactory({
    service: ModalNavigationService,
    imports: [
      RouterTestingModule.withRoutes([
        {
          path: '',
          redirectTo: 'backdrop',
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
            {
              path: 'subbackdrop',
              children: [
                {
                  path: 'page3',
                  outlet: 'modal',
                  component: ModalPageComponent,
                },
              ],
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
            {
              path: 'subbackdrop',
              children: [
                {
                  path: 'page3',
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
    routeConfig = spectator.inject(ROUTES);
    router = spectator.inject(Router);
    zone = spectator.inject(NgZone);
    zone.run(() => router.initialNavigation());
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('modalRouteActivated$', () => {
    it('should emit on modal routes', async () => {
      let modalRouteActivated = false;
      const subscription = spectator.service.modalRouteActivated$.subscribe(
        (_) => (modalRouteActivated = true)
      );

      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));

      expect(modalRouteActivated).toBeTrue();
      subscription.unsubscribe();
    });

    it('should NOT emit on non-modal routes', async () => {
      let modalRouteActivated = false;
      const subscription = spectator.service.modalRouteActivated$.subscribe(
        (_) => (modalRouteActivated = true)
      );

      await zone.run(() => router.navigate(['']));

      expect(modalRouteActivated).toBeFalse();
      subscription.unsubscribe();
    });
  });

  describe('modalRouteDeactivatedFor', () => {
    it('should emit when navigating away from modal route', async () => {
      let modalRouteDeactivated = false;
      const subscription = spectator.service
        .modalRouteDeactivatedFor(routeConfig)
        .subscribe((_) => (modalRouteDeactivated = true));
      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));

      await zone.run(() => router.navigate(['modal-backdrop']));

      expect(modalRouteDeactivated).toBeTrue();
      subscription.unsubscribe();
    });

    it('should NOT emit on non-modal routes', async () => {
      let modalRouteDeactivated = false;
      const subscription = spectator.service
        .modalRouteDeactivatedFor(routeConfig)
        .subscribe((_) => (modalRouteDeactivated = true));

      await zone.run(() => router.navigate(['modal-backdrop']));
      await zone.run(() => router.navigate(['']));

      expect(modalRouteDeactivated).toBeFalse();
      subscription.unsubscribe();
    });

    it('should NOT emit when navigating from modal route to another modal route', async () => {
      let modalRouteDeactivated = false;
      const subscription = spectator.service
        .modalRouteDeactivatedFor(routeConfig)
        .subscribe((_) => (modalRouteDeactivated = true));

      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));
      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page2'] } }]));

      expect(modalRouteDeactivated).toBeFalse();
      subscription.unsubscribe();
    });
  });

  describe('modalRouteActivatedFor', () => {
    it('should emit when navigating within routeConfig', async () => {
      let modalRouteActivated = false;
      const subscription = spectator.service
        .modalRouteActivatedFor(routeConfig)
        .subscribe((_) => (modalRouteActivated = true));

      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));

      expect(modalRouteActivated).toBeTrue();
      subscription.unsubscribe();
    });

    it('should emit when navigating from modal route to another modal route within routeConfig', async () => {
      let modalRouteActivated = false;
      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));
      const subscription = spectator.service
        .modalRouteActivatedFor(routeConfig)
        .subscribe((_) => (modalRouteActivated = true));

      await zone.run(() =>
        router.navigate(['other-modal-path', { outlets: { modal: ['page1'] } }])
      );

      expect(modalRouteActivated).toBeTrue();
      subscription.unsubscribe();
    });

    it('should NOT emit when navigating from modal route to sibling modal route within routeConfig', async () => {
      let modalRouteActivated = false;
      const routeConfig = spectator.inject(ROUTES);
      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));
      const subscription = spectator.service
        .modalRouteActivatedFor(routeConfig)
        .subscribe((_) => (modalRouteActivated = true));

      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page2'] } }]));

      expect(modalRouteActivated).toBeFalse();
      subscription.unsubscribe();
    });

    it('should NOT emit when navigating outside routeConfig', async () => {
      let modalRouteActivated = false;
      const routeConfig = spectator.inject(ROUTES);
      const flattenedRoutes: Routes = [].concat(...routeConfig);
      const modalRoute = flattenedRoutes.find((route) => route.path === 'modal-backdrop');
      const subscription = spectator.service
        .modalRouteActivatedFor([[modalRoute]])
        .subscribe((_) => (modalRouteActivated = true));

      await zone.run(() =>
        router.navigate(['other-modal-path', { outlets: { modal: ['page1'] } }])
      );

      expect(modalRouteActivated).toBeFalse();
      subscription.unsubscribe();
    });

    it('should NOT emit when navigating from modal route to another modal route outside routeConfig', async () => {
      let modalRouteActivated = false;
      const routeConfig = spectator.inject(ROUTES);
      await zone.run(() => router.navigate(['modal-backdrop', { outlets: { modal: ['page1'] } }]));
      const flattenedRoutes: Routes = [].concat(...routeConfig);
      const modalRoute = flattenedRoutes.find((route) => route.path === 'modal-backdrop');
      const subscription = spectator.service
        .modalRouteActivatedFor([[modalRoute]])
        .subscribe((_) => (modalRouteActivated = true));

      await zone.run(() =>
        router.navigate(['other-modal-path', { outlets: { modal: ['page1'] } }])
      );

      expect(modalRouteActivated).toBeFalse();
      subscription.unsubscribe();
    });
  });
});
