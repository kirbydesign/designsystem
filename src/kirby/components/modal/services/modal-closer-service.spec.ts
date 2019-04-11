import { ModalCloserService } from './modal-closer-service';

describe('ModalCloserService', () => {
  let modalCloserService: ModalCloserService;
  const mockModalCloseFunction: () => any = () => {};
  const mockUid = 1;
  const mockError = new Error(`No modal was registered with uid: ${mockUid}.`);

  beforeEach(() => {
    modalCloserService = new ModalCloserService();
  });

  describe('ModalCloserService', () => {
    it('should throw an error when modal id is not found', () => {
      expect(function() {
        modalCloserService.closeModal(mockUid);
      }).toThrow(mockError);
    });

    it('should properly close a previously registered modal without an error', () => {
      modalCloserService.registerModalCloseRef(mockUid, mockModalCloseFunction);
      expect(function() {
        modalCloserService.closeModal(mockUid);
      }).not.toThrow(mockError);
    });

    it('should perform a cleanup after a successful close', () => {
      modalCloserService.registerModalCloseRef(mockUid, mockModalCloseFunction);
      expect(function() {
        modalCloserService.closeModal(mockUid);
      }).not.toThrow(mockError);
      // call second time with same uid, expect an error this time
      expect(function() {
        modalCloserService.closeModal(mockUid);
      }).toThrow(mockError);
    });
  });
});
