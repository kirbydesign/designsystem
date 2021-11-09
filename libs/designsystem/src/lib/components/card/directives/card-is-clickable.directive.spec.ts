import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { CardComponent } from '../card.component';

import { CardIsClickableDirective } from './card-is-clickable.directive';

describe('CardIsClickableDirective', () => {
  let spectator: SpectatorDirective<CardIsClickableDirective>;

  registerLocaleData(localeDa);

  const createDirective = createDirectiveFactory({
    directive: CardIsClickableDirective,
    imports: [],
    declarations: [CardComponent],
  });
  beforeEach(() => {
    spectator = createDirective(`<kirby-card (click)="someMethod()"> </kirby-card>`);
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  it('should have cursor: pointer', () => {
    expect(spectator.element).toHaveComputedStyle({ cursor: 'pointer' });
  });
});
