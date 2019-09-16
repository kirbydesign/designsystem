import any = jasmine.any;
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalController } from './modal.controller';
import {
  ActionSheetConfig,
  ActionSheetItem,
  AlertConfig,
  ModalConfig,
} from '@kirbydesign/designsystem/modal';
import { ListComponent } from '@kirbydesign/designsystem/list';

describe('modalController', () => {
  const modalWindowHelperSpy = jasmine.createSpyObj('ModalWindowHelper', ['showModalWindow']);
  const actionSheetHelperSpy = jasmine.createSpyObj('ActionSheetHelper', ['showActionSheet']);
  const alertHelperSpy = jasmine.createSpyObj('AlertHelper', ['showAlert']);
  let modalController: ModalController;
  let expectedError = new Error('No modal windows are currently registered');
  let mockCallback = (): string => {
    return 'closing modal window...';
  };

  beforeEach(() => {
    modalWindowHelperSpy.showModalWindow.and.returnValue(Promise.resolve());
    actionSheetHelperSpy.showActionSheet.and.returnValue(Promise.resolve());
    alertHelperSpy.showAlert.and.returnValue(Promise.resolve());

    modalController = new ModalController(
      modalWindowHelperSpy,
      actionSheetHelperSpy,
      alertHelperSpy
    );
  });

  describe('modalController', () => {
    it('should throw an error when closing a modal, when no modals have been registered', () => {
      expect(() => {
        modalController.hideTopmost();
      }).toThrow(expectedError);
    });

    it('should succesfully invoke a registered callback', () => {
      modalController.register({ close: mockCallback });
      expect(() => {
        modalController.hideTopmost();
      }).not.toThrow();
    });
  });

  describe('operators', () => {
    beforeEach(() => {
      modalController.register({ close: mockCallback });
    });

    afterEach(() => {
      // The callback won't trigger, until the modal is closed (hence the Observable never emits anything nor completes)
      modalController.hideAll();
    });

    describe('showModal', () => {
      const config: Readonly<ModalConfig> = {
        flavor: 'modal',
        component: ListComponent,
        title: 'Foo',
      };

      beforeEach(() => {
        spyOn(modalController, 'showModal').and.callThrough();
      });

      it('should be able to open a modal based on a configuration as an ModalConfig-object', (done) => {
        of(1)
          .pipe(
            map((value) => ({ data: value })),
            modalController.operators.showModal(config)
          )
          .subscribe(() => {
            expect(modalController.showModal).toHaveBeenCalledWith(
              { ...config, componentProps: { data: 1 } },
              null,
              any(Function)
            );
            done();
          });
      });

      it('should be able to open a modal based on a configuration as an Observable with a ModalConfig-object', (done) => {
        const config$ = of(config);

        of(1)
          .pipe(
            map((value) => ({ data: value })),
            modalController.operators.showModal(config$)
          )
          .subscribe(() => {
            expect(modalController.showModal).toHaveBeenCalledWith(
              { ...config, componentProps: { data: 1 } },
              null,
              any(Function)
            );
            done();
          });
      });

      it('should complete the output Observable, when the modal is closed / hidden', (done) => {
        const noOp = () => {};
        of(1)
          .pipe(
            map((value) => ({ data: value })),
            modalController.operators.showModal(config)
          )
          .subscribe(noOp, noOp, done);
      });
    });

    describe('showActionSheet', () => {
      const config: Readonly<ActionSheetConfig> = {
        header: 'Header',
        subheader: 'Sub-header',
        items: [],
        cancelButtonText: 'Nooooo!',
      };

      function asItem(value: number): ActionSheetItem {
        return { id: value.toString(), text: `Item #${value}` };
      }

      beforeEach(() => {
        spyOn(modalController, 'showActionSheet').and.callThrough();
      });

      it('should be able to open an action sheet based on a configuration as an ActionSheetConfig-object', (done) => {
        const values = [1, 2, 3];
        const items = values.map(asItem);

        of(values)
          .pipe(
            map((value) => value.map(asItem)),
            modalController.operators.showActionSheet(config)
          )
          .subscribe(() => {
            expect(modalController.showActionSheet).toHaveBeenCalledWith(
              { ...config, items },
              null,
              any(Function)
            );
            done();
          });
      });

      it('should be able to open a modal based on a configuration as an Observable with a ActionSheetConfig-object', (done) => {
        const values = [1, 2, 3];
        const items = values.map(asItem);
        const config$ = of(config);

        of(values)
          .pipe(
            map((value) => value.map(asItem)),
            modalController.operators.showActionSheet(config$)
          )
          .subscribe(() => {
            expect(modalController.showActionSheet).toHaveBeenCalledWith(
              { ...config, items },
              null,
              any(Function)
            );
            done();
          });
      });

      it('should complete the output Observable, when the action sheet is closed / hidden', (done) => {
        const noOp = () => {};
        const values = [1, 2, 3];

        of(values)
          .pipe(
            map((value) => value.map(asItem)),
            modalController.operators.showActionSheet(config)
          )
          .subscribe(noOp, noOp, done);
      });
    });

    describe('showAlert', () => {
      const config: Readonly<AlertConfig> = {
        title: 'Foo',
        message: 'Bar',
        cancelBtnText: 'Nope',
        okBtnText: 'Yep',
      };

      beforeEach(() => {
        spyOn(modalController, 'showAlert').and.callThrough();
      });

      it('should be able to display an alert based on a configuration as an AlertConfig-object', (done) => {
        of(null)
          .pipe(modalController.operators.showAlert(config))
          .subscribe(() => {
            expect(modalController.showAlert).toHaveBeenCalledWith(config, any(Function));
            done();
          });
      });

      it('should be able to open a modal based on a configuration as an Observable with a AlertConfig-object', (done) => {
        const config$ = of(config);

        of(null)
          .pipe(modalController.operators.showAlert(config$))
          .subscribe(() => {
            expect(modalController.showAlert).toHaveBeenCalledWith(config, any(Function));
            done();
          });
      });

      it('should complete the output Observable, when the alert is closed / hidden', (done) => {
        const noOp = () => {};

        of(null)
          .pipe(modalController.operators.showAlert(config))
          .subscribe(noOp, noOp, done);
      });
    });
  });
});
