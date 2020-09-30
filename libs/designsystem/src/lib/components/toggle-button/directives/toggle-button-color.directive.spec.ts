import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator';

import { ToggleButtonColorDirective } from './toggle-button-color.directive';
import { NotificationColor } from '../../../helpers/color-helper';

describe('ToggleButtonColorDirective', () => {
  let spectator: SpectatorDirective<ToggleButtonColorDirective>;
  const createDirective = createDirectiveFactory({
    directive: ToggleButtonColorDirective,
    declarations: [ToggleButtonColorDirective],
  });

  [NotificationColor.success, NotificationColor.warning, NotificationColor.danger].forEach(
    (notificationColor) => {
      it('should should add notification colors to class', () => {
        spectator = createDirective(
          `<button kirby-button color="${notificationColor}">Lala</button>`
        );
        const containsClass = spectator.element.classList.contains(notificationColor);
        expect(containsClass).toBe(true);
      });
    }
  );
});
