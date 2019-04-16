import { ModalController } from './modal.controller';

describe('modalController', () => {
  const modalHelperSpy = jasmine.createSpyObj('ModalHelper', ['showModal']);
  let modalController: ModalController;
  let expectedError = new Error('No modals are currently registered');
  let mockCallback = (): string => {
    return 'closing modal...';
  };

  beforeEach(() => {
    modalController = new ModalController(modalHelperSpy);
  });

  describe('modalController', () => {
    it('should throw an error when closing a modal, while closeFuncRefs list is empty', () => {
      expect(() => {
        modalController.hideModal();
      }).toThrow(expectedError);
    });

    it('should succesfully invoke a registered callback', () => {
      modalController.registerModalCloseRef(mockCallback);
      expect(() => {
        modalController.hideModal();
      }).not.toThrow();
    });
  });
});
