import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator';

import { ToggleButtonShowWhenDirective } from './toggle-button-show-when.directive';

describe('toggleButtonShowWhenDirective', () => {
  let spectator: SpectatorDirective<ToggleButtonShowWhenDirective>;
  const createDirective = createDirectiveFactory(ToggleButtonShowWhenDirective);

  beforeEach(() => {
    spectator = createDirective(`<button kirby-button kirbyToggleButtonShowWhen></button>`);
  });

  [true, false].forEach((showWhen) => {
    it(`should show when showWhen is: ${showWhen}`, () => {});
  });
});
