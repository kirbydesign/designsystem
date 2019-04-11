import { ModalService } from './modal-service';

describe('ModalService', () => {
  let modalService: ModalService;

  const modalServiceHelperSpy = jasmine.createSpyObj('ModalServiceHelper', [
    'showModal',
    'hideModal',
  ]);

  const mockModalConfig = {
    title: 'test',
    component: undefined,
  };

  beforeEach(() => {
    modalService = new ModalService(modalServiceHelperSpy);
  });

  describe('ModalService', () => {
    it('should, upon showing a modal, return a newly created modalUid, based on the current timestamp', () => {
      let modalUid = modalService.showModal(mockModalConfig, null, null);
      expect(modalUid).toBeGreaterThanOrEqual(new Date().getTime());
    });
  });
});
