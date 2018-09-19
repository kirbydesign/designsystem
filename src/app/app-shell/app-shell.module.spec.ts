import { AppShellModule } from './app-shell.module';

describe('AppShellModule', () => {
  let appShellModule: AppShellModule;

  beforeEach(() => {
    appShellModule = new AppShellModule();
  });

  it('should create an instance', () => {
    expect(appShellModule).toBeTruthy();
  });
});
