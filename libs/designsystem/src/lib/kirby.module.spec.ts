import { KirbyModule } from './kirby.module';

describe('KirbyModule', () => {
  let kirbyModule: KirbyModule;

  beforeEach(() => {
    kirbyModule = new KirbyModule();
  });

  it('should create an instance', () => {
    expect(kirbyModule).toBeTruthy();
  });
});
