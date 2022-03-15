import { MuteErrorService } from './mute-error.service';

describe('MuteErrorService', () => {
  let muteErrorService: MuteErrorService;

  beforeEach(() => {
    muteErrorService = new MuteErrorService();
  });

  it('should create service', () => {
    expect(muteErrorService).toBeInstanceOf(MuteErrorService);
  });

  it('should register error message supplied as string', () => {
    const firstErrorMsg: string = 'Evil Error';
    const secondErrorMsg: string = 'Even more Evil Error';

    muteErrorService.register(firstErrorMsg);

    expect(muteErrorService['mutedErrors']).toEqual([firstErrorMsg]);

    muteErrorService.register(secondErrorMsg);

    expect(muteErrorService['mutedErrors']).toEqual([firstErrorMsg, secondErrorMsg]);
  });

  it('should register error message supplied as array', () => {
    const errorMsgs: string[] = ['Evil Error', 'Even more Evil Error'];

    muteErrorService.register(errorMsgs);

    expect(muteErrorService['mutedErrors']).toEqual(errorMsgs);
  });

  describe('handleError method', () => {
    it('should return error if not registered in service', () => {
      const error = { message: 'Evil Error' };
      const result = muteErrorService['handleError'](error);

      expect(result).toBe(error);
    });

    it('should mute error message if it is registered in service', () => {
      muteErrorService.register('Evil Error');

      const error = { message: 'Evil Error' };
      const result = muteErrorService['handleError'](error);

      expect(result).toBe(true);
    });

    it('should call errorHandler when passed handleError method', () => {
      const error = { message: 'Evil Error', modified: false };
      const errorHandler = jasmine.createSpy('errorHandler');
      muteErrorService['handleError'](error, errorHandler);

      expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it('should reuse supplied error handler when returning error', () => {
      const error = { message: 'Evil Error', modified: false };
      const errorHandler = (error) => {
        error.modified = true;
        return error;
      };

      const result = muteErrorService['handleError'](error, errorHandler);

      expect(result.message).toBe(error.message);
      expect(result.modified).toBe(true);
    });
  });
});
