import { ModalController } from '@kirbydesign/designsystem/modal';
import { KirbyModule } from './kirby.module';

describe('KirbyModule', () => {
  let kirbyModule: KirbyModule;
  let modalControllerSpy: ModalController;

  beforeEach(() => {
    modalControllerSpy = jasmine.createSpyObj<ModalController>('ModalController', ['initialize']);
    kirbyModule = new KirbyModule(modalControllerSpy);
  });

  it('should create an instance', () => {
    expect(kirbyModule).toBeTruthy();
  });

  it('should initialize modalController', () => {
    expect(modalControllerSpy.initialize).toHaveBeenCalledTimes(1);
  });
});
