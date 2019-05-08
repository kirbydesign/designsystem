import { ModalController } from './modal.controller';

describe('modalController', () => {
  const modalWindowHelperSpy = jasmine.createSpyObj('ModalWindowHelper', ['showModal']);
  const actionSheetHelperSpy = jasmine.createSpyObj('ActionSheetHelper', ['showModal']);
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
        modalController.hideWindow();
      }).toThrow(expectedError);
    });

    it('should succesfully invoke a registered callback', () => {
      modalController.registerWindow({ close: mockCallback });
      expect(() => {
        modalController.hideWindow();
      }).not.toThrow();
    });
  });
});
