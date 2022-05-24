import { createDirectiveFactory, createKeyboardEvent, SpectatorDirective } from '@ngneat/spectator';

import { CardComponent } from '../../components/card/card.component';

import { ElementAsButtonDirective } from './element-as-button.directive';

describe('ElementAsButtonDirective', () => {
  let spectator: SpectatorDirective<ElementAsButtonDirective>;
  let cardElement: HTMLElement;

  const createDirective = createDirectiveFactory({
    directive: ElementAsButtonDirective,
    imports: [],
    declarations: [CardComponent],
  });
  beforeEach(() => {
    spectator = createDirective(`<kirby-card (click)="someMethod()"> </kirby-card>`);
    cardElement = spectator.query('kirby-card');
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  const keyScenarios = ['space', 'enter'];

  keyScenarios.forEach((key) => {
    describe(`when keydown is activated for ${key}`, () => {
      beforeEach(() => {
        expect(cardElement.getAttribute('aria-pressed')).toEqual('false');
        spectator.dispatchKeyboardEvent('kirby-card', 'keydown', key);
      });

      it('should set host "aria-pressed" attribute to "true"', () => {
        expect(cardElement.getAttribute('aria-pressed')).toEqual('true');
      });

      describe(`and keyup is then activated for ${key}`, () => {
        beforeEach(() => {
          expect(cardElement.getAttribute('aria-pressed')).toEqual('true');
          spectator.dispatchKeyboardEvent('kirby-card', 'keyup', key);
        });

        it('should set host "aria-pressed" attribute to "false"', () => {
          expect(cardElement.getAttribute('aria-pressed')).toEqual('false');
        });
      });

      describe('and the element is then unfocused', () => {
        beforeEach(() => {
          expect(cardElement.getAttribute('aria-pressed')).toEqual('true');
          spectator.blur(cardElement);
        });

        it('should set host "aria-pressed" attribute to "false"', () => {
          expect(cardElement.getAttribute('aria-pressed')).toEqual('false');
        });
      });
    });
  });
});
