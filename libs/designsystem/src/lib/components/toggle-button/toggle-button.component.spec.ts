import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { first } from 'rxjs/operators';

import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
  let spectator: Spectator<ToggleButtonComponent>;
  const createComponent = createComponentFactory(ToggleButtonComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should toggle checked state on click', (done) => {
    spectator.component.checked = true;
    spectator.component.checkChanged.pipe(first()).subscribe((check) => {
      expect(check).toBe(false);
      done();
    });

    spectator.component.onClick();

    expect(spectator.component.checked).toBe(false);
  });
});
