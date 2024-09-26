import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
  let spectator: SpectatorHost<ToggleButtonComponent>;
  const createHost = createHostFactory({
    component: ToggleButtonComponent,
    imports: [ButtonComponent],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-toggle-button>
        <button kirby-button unchecked>Unchecked</button>
        <button kirby-button checked>Checked</button>
      </kirby-toggle-button>`);
    });
    it('should toggle checked state on click', () => {
      spectator.component.checked = false;

      spectator.click('button');

      expect(spectator.component.checked).toBe(true);
    });

    it('should emit checkChanged event on click', () => {
      let checkChangedCalled;
      spectator.output('checkChanged').subscribe((result) => (checkChangedCalled = result));

      spectator.click('button');

      expect(checkChangedCalled).toBe(true);
    });
  });

  describe('when nested button is disabled', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-toggle-button>
        <button kirby-button unchecked [disabled]="true">Unchecked</button>
        <button kirby-button checked [disabled]="true">Checked</button>
      </kirby-toggle-button>`);
    });

    it('should not emit change-event on click', () => {
      let checkChangedCalled;
      spectator.output('checkChanged').subscribe((result) => (checkChangedCalled = result));

      spectator.click('button');

      expect(checkChangedCalled).toBe(undefined);
    });

    it('should not toggle checked state on click', () => {
      spectator.component.checked = true;

      spectator.click('button');

      expect(spectator.component.checked).toBe(true);
    });
  });
});
