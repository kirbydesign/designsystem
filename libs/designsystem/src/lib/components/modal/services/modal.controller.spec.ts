import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Subject, EMPTY } from 'rxjs';

import { Overlay, OverlayEventDetail } from './modal.interfaces';
import { ModalController } from './modal.controller';
import { ModalHelper } from './modal.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { AlertHelper } from './alert.helper';
import { ModalNavigationService } from './modal-navigation.service';

describe('ModalController', () => {
  let spectator: SpectatorService<ModalController>;
  let modalController: ModalController;

  const createService = createServiceFactory({
    service: ModalController,
    mocks: [ActionSheetHelper, AlertHelper, ModalHelper, ModalNavigationService],
  });

  let modalHelperSpy: jasmine.SpyObj<ModalHelper>;
  let actionSheetHelperSpy: jasmine.SpyObj<ActionSheetHelper>;
  let alertHelperSpy: jasmine.SpyObj<AlertHelper>;
  let modalNavigationServiceSpy: jasmine.SpyObj<ModalNavigationService>;

  const expectedError = 'No modal overlays are currently registered';
  let callbackSpy: jasmine.Spy;

  beforeEach(() => {
    spectator = createService();
    modalController = spectator.service;
    modalHelperSpy = spectator.inject(ModalHelper);
    actionSheetHelperSpy = spectator.inject(ActionSheetHelper);
    alertHelperSpy = spectator.inject(AlertHelper);
    modalNavigationServiceSpy = spectator.inject(ModalNavigationService);
    modalNavigationServiceSpy.getModalNavigation.and.resolveTo({
      activated$: EMPTY,
      deactivated$: EMPTY,
    });
    callbackSpy = jasmine.createSpy('callback');
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should subscribe to modal route navigation', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      await modalController.initialize();

      expect(modalNavigationServiceSpy.getModalNavigation).toHaveBeenCalledTimes(1);
    });
  });

  describe('hideTopmost', () => {
    it('should throw an error when closing an overlay, when no overlays have been registered', async () => {
      await expectAsync(modalController.hideTopmost()).toBeRejectedWithError(expectedError);
    });
  });

  describe('hideAll', () => {
    it('should allow hideAll even if no overlays are registered', async () => {
      await expectAsync(modalController.hideAll()).toBeResolved();
    });

    it('should close all opened overlays', async () => {
      const overlaySpy1: jasmine.SpyObj<Overlay> = jasmine.createSpyObj('overlay', ['dismiss']);
      const onDidDismiss1$ = new Subject<OverlayEventDetail>();
      overlaySpy1.onDidDismiss = onDidDismiss1$.toPromise();
      overlaySpy1.dismiss.and.callFake((data) => {
        onDidDismiss1$.next();
        onDidDismiss1$.complete();
        return Promise.resolve(true);
      });
      const overlaySpy2: jasmine.SpyObj<Overlay> = jasmine.createSpyObj('overlay', ['dismiss']);
      const onDidDismiss2$ = new Subject<OverlayEventDetail>();
      overlaySpy2.onDidDismiss = onDidDismiss2$.toPromise();
      overlaySpy2.dismiss.and.callFake((data) => {
        onDidDismiss2$.next();
        onDidDismiss2$.complete();
        return Promise.resolve(true);
      });
      const overlaySpy3: jasmine.SpyObj<Overlay> = jasmine.createSpyObj('overlay', ['dismiss']);
      const onDidDismiss3$ = new Subject<OverlayEventDetail>();
      overlaySpy3.onDidDismiss = onDidDismiss3$.toPromise();
      overlaySpy3.dismiss.and.callFake((data) => {
        onDidDismiss3$.next();
        onDidDismiss3$.complete();
        return Promise.resolve(true);
      });

      modalHelperSpy.showModalWindow.and.returnValues(
        Promise.resolve(overlaySpy1),
        Promise.resolve(overlaySpy2),
        Promise.resolve(overlaySpy3)
      );

      await modalController.showModal({ title: 'Modal 1', component: undefined });
      await modalController.showModal({ title: 'Modal 2', component: undefined });
      await modalController.showModal({ title: 'Modal 3', component: undefined });
      expect(modalController['overlays'].length).toBe(3);

      await modalController.hideAll();
      await expectAsync(overlaySpy1.onDidDismiss).toBeResolved();
      await expectAsync(overlaySpy2.onDidDismiss).toBeResolved();
      await expectAsync(overlaySpy3.onDidDismiss).toBeResolved();
      expect(modalController['overlays'].length).toBe(0);
    });
  });

  describe('showModal', () => {
    let overlaySpy: jasmine.SpyObj<Overlay>;
    beforeEach(() => {
      overlaySpy = jasmine.createSpyObj('overlay', ['dismiss']);
      const onDidDismiss$ = new Subject<OverlayEventDetail>();
      overlaySpy.onDidDismiss = onDidDismiss$.toPromise();
      overlaySpy.dismiss.and.callFake((data: any) => {
        onDidDismiss$.next({ data: data });
        onDidDismiss$.complete();
        return Promise.resolve(true);
      });
      modalHelperSpy.showModalWindow.and.resolveTo(overlaySpy);
    });

    it('should invoke the registered callback when closed', async () => {
      await modalController.showModal({ title: 'Modal 1', component: undefined }, callbackSpy);
      await modalController.hideTopmost();
      expect(callbackSpy).toHaveBeenCalled();
    });

    it('should invoke the registered callback with data when closed', async () => {
      const expectedValue = 'Returned Data 123';
      await modalController.showModal({ title: 'Modal 1', component: undefined }, callbackSpy);
      await modalController.hideTopmost(expectedValue);
      expect(callbackSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should call close() on the returned modal when closed', async () => {
      await modalController.showModal({ title: 'Modal 1', component: undefined });
      await modalController.hideTopmost();
      expect(overlaySpy.dismiss).toHaveBeenCalled();
    });
  });

  describe('showActionSheet', () => {
    let overlaySpy: jasmine.SpyObj<Overlay>;
    beforeEach(() => {
      overlaySpy = jasmine.createSpyObj('overlay', ['dismiss']);
      const onDidDismiss$ = new Subject<OverlayEventDetail>();
      overlaySpy.onDidDismiss = onDidDismiss$.toPromise();
      overlaySpy.dismiss.and.callFake((data: any) => {
        onDidDismiss$.next({ data: data });
        onDidDismiss$.complete();
        return Promise.resolve(true);
      });
      actionSheetHelperSpy.showActionSheet.and.resolveTo(overlaySpy);
    });

    it('should invoke the registered callback when closed', async () => {
      await modalController.showActionSheet({ items: [] }, callbackSpy);
      await modalController.hideTopmost();
      expect(callbackSpy).toHaveBeenCalled();
    });

    it('should invoke the registered callback with data when closed', async () => {
      const expectedValue = 'Returned Data 123';
      await modalController.showActionSheet({ items: [] }, callbackSpy);
      await modalController.hideTopmost(expectedValue);
      expect(callbackSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should call close() on the returned overlay when closed', async () => {
      await modalController.showActionSheet({ items: [] });
      await modalController.hideTopmost();
      expect(overlaySpy.dismiss).toHaveBeenCalled();
    });
  });

  describe('showAlert', () => {
    let overlaySpy: jasmine.SpyObj<Overlay>;
    beforeEach(() => {
      overlaySpy = jasmine.createSpyObj('overlay', ['dismiss']);
      const onDidDismiss$ = new Subject<OverlayEventDetail>();
      overlaySpy.onDidDismiss = onDidDismiss$.toPromise();
      overlaySpy.dismiss.and.callFake((data: any) => {
        onDidDismiss$.next({ data: data });
        onDidDismiss$.complete();
        return Promise.resolve(true);
      });
      alertHelperSpy.showAlert.and.resolveTo(overlaySpy);
    });

    it('should invoke the registered callback when closed', async () => {
      await modalController.showAlert({ title: 'Alert' }, callbackSpy);
      await modalController.hideTopmost();
      expect(callbackSpy).toHaveBeenCalled();
    });

    it('should invoke the registered callback with data when closed', async () => {
      const expectedValue = 'Returned Data 123';
      await modalController.showAlert({ title: 'Alert' }, callbackSpy);
      await modalController.hideTopmost(expectedValue);
      expect(callbackSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should call close() on the returned overlay when closed', async () => {
      await modalController.showAlert({ title: 'Alert' });
      await modalController.hideTopmost();
      expect(overlaySpy.dismiss).toHaveBeenCalled();
    });
  });
});
