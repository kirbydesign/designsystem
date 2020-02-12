import { DesignerModule } from './designer.module';

describe('DesignerModule', () => {
  let designerModule: DesignerModule;

  beforeEach(() => {
    designerModule = new DesignerModule();
  });

  it('should create an instance', () => {
    expect(designerModule).toBeTruthy();
  });
});
