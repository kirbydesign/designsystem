import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { LOCALE_ID } from '@angular/core';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { CardComponent } from '../card.component';

import { CardIsClickableDirective } from './card-is-clickable.directive';

fdescribe('CardIsClickableDirective', () => {
  let locale: 'da' | 'en-GB' = 'en-GB';
  let spectator: SpectatorDirective<CardIsClickableDirective>;

  registerLocaleData(localeDa);

  const createDirective = createDirectiveFactory({
    directive: CardIsClickableDirective,
    imports: [],
    declarations: [CardComponent],
    providers: [
      {
        provide: LOCALE_ID,
        useFactory: () => locale,
      },
    ],
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
