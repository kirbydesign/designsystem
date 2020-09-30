import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator';

import { ToggleButtonThemeColorDirective } from './toggle-button-color.directive';
import { NotificationColor } from '../../../helpers/color-helper';

describe('ToggleButtonColorDirective', () => {
  let spectator: SpectatorDirective<ToggleButtonThemeColorDirective>;
  const createDirective = createDirectiveFactory({
    directive: ToggleButtonThemeColorDirective,
    declarations: [ToggleButtonThemeColorDirective],
  });

  [NotificationColor.success, NotificationColor.warning, NotificationColor.danger].forEach(
    (notificationColor) => {
      it('should should add notification colors to class', () => {
        spectator = createDirective(
          `<button kirby-button checked themeColor="${notificationColor}">Lala</button>`
        );
        const containsClass = spectator.element.classList.contains(notificationColor);
        expect(containsClass).toBe(true);
      });
    }
  );
});
