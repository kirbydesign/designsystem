import { ModalController } from './modal.controller';

describe('modalController', () => {
  const modalWindowHelperSpy = jasmine.createSpyObj('ModalWindowHelper', ['showModal']);
  const actionSheetHelperSpy = jasmine.createSpyObj('ActionSheetHelper', ['showActionSheet']);
  const alertHelperSpy = jasmine.createSpyObj('AlertHelper', ['showAlert']);
  let modalController: ModalController;
  let expectedError = new Error('No modal windows are currently registered');
  let mockCallback = (): string => {
    return 'closing modal window...';
  };

  beforeEach(() => {
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
      modalController.register({
        close: mockCallback,
        scrollToTop: () => {},
        scrollToBottom: () => {},
      });
      expect(() => {
        modalController.hideTopmost();
      }).not.toThrow();
    });

    it('should allow hideAll even if no modals are registered', () => {
      expect(() => {
        modalController.hideAll;
      }).not.toThrow();
    });

    describe('scrollToTop', () => {
      it('should throw an error when scrolling to top, when no modals have been opened', () => {
        expect(() => {
          modalController.scrollToTop();
        }).toThrow(expectedError);
      });
    });

    describe('scrollToBottom', () => {
      it('should throw an error when scrolling to bottom, when no modals have been opened', () => {
        expect(() => {
          modalController.scrollToBottom();
        }).toThrow(expectedError);
      });
    });
  });
});
