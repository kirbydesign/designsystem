import { ModalController } from './modal.controller';

describe('modalController', () => {
  const modalWindowHelperSpy = jasmine.createSpyObj('ModalWindowHelper', ['showModalWindow']);
  const actionSheetHelperSpy = jasmine.createSpyObj('ActionSheetHelper', ['showModalWindow']);
  let modalController: ModalController;
  let expectedError = new Error('No modal windows are currently registered');
  let mockCallback = (): string => {
    return 'closing modal window...';
  };

  beforeEach(() => {
    modalController = new ModalController(modalWindowHelperSpy, actionSheetHelperSpy);
  });

  describe('modalController', () => {
    it('should throw an error when closing a modal, when no modals have been registered', () => {
      expect(() => {
        modalController.closeTopmost();
      }).toThrow(expectedError);
    });

    it('should succesfully invoke a registered callback', () => {
      modalController.register({ close: mockCallback });
      expect(() => {
        modalController.closeTopmost();
      }).not.toThrow();
    });
  });
});
