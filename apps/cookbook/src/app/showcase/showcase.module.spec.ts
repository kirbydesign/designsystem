import { ShowcaseModule } from './showcase.module';

describe('ShowcaseModule', () => {
  let showcaseModule: ShowcaseModule;

  beforeEach(() => {
    showcaseModule = new ShowcaseModule();
  });

  it('should create an instance', () => {
    expect(showcaseModule).toBeTruthy();
  });
});
