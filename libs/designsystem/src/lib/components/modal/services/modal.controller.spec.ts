import { Subject } from 'rxjs';

import { IModal } from './modal.model';
import { ModalController } from './modal.controller';
import { ModalHelper } from './modal.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { AlertHelper } from './alert.helper';

describe('modalController', () => {
  let modalController: ModalController;
  const modalHelperSpy: jasmine.SpyObj<ModalHelper> = jasmine.createSpyObj('ModalHelper', [
    'showModalWindow',
  ]);
  const actionSheetHelperSpy: jasmine.SpyObj<ActionSheetHelper> = jasmine.createSpyObj(
    'ActionSheetHelper',
    ['showActionSheet']
  );
  const alertHelperSpy: jasmine.SpyObj<AlertHelper> = jasmine.createSpyObj('AlertHelper', [
    'showAlert',
  ]);
  const expectedError = 'No modal windows are currently registered';
  let callbackSpy: jasmine.Spy;

  beforeEach(() => {
    modalController = new ModalController(modalHelperSpy, actionSheetHelperSpy, alertHelperSpy);
    callbackSpy = jasmine.createSpy('callback');
  });

  describe('hideTopmost', () => {
    it('should throw an error when closing a modal, when no modals have been registered', async () => {
      await expectAsync(modalController.hideTopmost()).toBeRejectedWithError(expectedError);
    });
  });

  describe('hideAll', () => {
    it('should allow hideAll even if no modals are registered', async () => {
      await expectAsync(modalController.hideAll()).toBeResolved();
    });

    it('should close all opened modals', async () => {
      const modalSpy1: jasmine.SpyObj<IModal> = jasmine.createSpyObj('modal', ['close']);
      const onClosed1$ = new Subject<any>();
      modalSpy1.onClose = onClosed1$.toPromise();
      modalSpy1.close.and.callFake((data) => {
        onClosed1$.next();
        onClosed1$.complete();
        return Promise.resolve(true);
      });
      const modalSpy2: jasmine.SpyObj<IModal> = jasmine.createSpyObj('modal', ['close']);
      const onClosed2$ = new Subject<any>();
      modalSpy2.onClose = onClosed2$.toPromise();
      modalSpy2.close.and.callFake((data) => {
        onClosed2$.next();
        onClosed2$.complete();
        return Promise.resolve(true);
      });
      const modalSpy3: jasmine.SpyObj<IModal> = jasmine.createSpyObj('modal', ['close']);
      const onClosed3$ = new Subject<any>();
      modalSpy3.onClose = onClosed3$.toPromise();
      modalSpy3.close.and.callFake((data) => {
        onClosed3$.next();
        onClosed3$.complete();
        return Promise.resolve(true);
      });

      modalHelperSpy.showModalWindow.and.returnValues(
        Promise.resolve(modalSpy1),
        Promise.resolve(modalSpy2),
        Promise.resolve(modalSpy3)
      );

      await modalController.showModal({ title: 'Modal 1', component: undefined });
      await modalController.showModal({ title: 'Modal 2', component: undefined });
      await modalController.showModal({ title: 'Modal 3', component: undefined });
      expect(modalController['modals'].length).toBe(3);

      await modalController.hideAll();
      await expectAsync(modalSpy1.onClose).toBeResolved();
      await expectAsync(modalSpy2.onClose).toBeResolved();
      await expectAsync(modalSpy3.onClose).toBeResolved();
      expect(modalController['modals'].length).toBe(0);
    });
  });

  describe('showModal', () => {
    let modalSpy: jasmine.SpyObj<IModal>;
    beforeEach(() => {
      modalSpy = jasmine.createSpyObj('modal', ['close']);
      const onClosed$ = new Subject<any>();
      modalSpy.onClose = onClosed$.toPromise();
      modalSpy.close.and.callFake((data: any) => {
        onClosed$.next(data);
        onClosed$.complete();
        return Promise.resolve(true);
      });
      modalHelperSpy.showModalWindow.and.resolveTo(modalSpy);
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
      expect(modalSpy.close).toHaveBeenCalled();
    });
  });

  describe('showActionSheet', () => {
    let modalSpy: jasmine.SpyObj<IModal>;
    beforeEach(() => {
      modalSpy = jasmine.createSpyObj('modal', ['close']);
      const onClosed$ = new Subject<any>();
      modalSpy.onClose = onClosed$.toPromise();
      modalSpy.close.and.callFake((data: any) => {
        onClosed$.next(data);
        onClosed$.complete();
        return Promise.resolve(true);
      });
      actionSheetHelperSpy.showActionSheet.and.resolveTo(modalSpy);
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

    it('should call close() on the returned modal when closed', async () => {
      await modalController.showActionSheet({ items: [] });
      await modalController.hideTopmost();
      expect(modalSpy.close).toHaveBeenCalled();
    });
  });

  describe('showAlert', () => {
    let modalSpy: jasmine.SpyObj<IModal>;
    beforeEach(() => {
      modalSpy = jasmine.createSpyObj('modal', ['close']);
      const onClosed$ = new Subject<any>();
      modalSpy.onClose = onClosed$.toPromise();
      modalSpy.close.and.callFake((data: any) => {
        onClosed$.next(data);
        onClosed$.complete();
        return Promise.resolve(true);
      });
      alertHelperSpy.showAlert.and.resolveTo(modalSpy);
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

    it('should call close() on the returned modal when closed', async () => {
      await modalController.showAlert({ title: 'Alert' });
      await modalController.hideTopmost();
      expect(modalSpy.close).toHaveBeenCalled();
    });
  });
});
