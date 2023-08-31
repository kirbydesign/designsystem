import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { CardComponent } from '../card.component';
import { CardAsButtonDirective } from './card-as-button.directive';

@Component({ selector: 'kirby-card-click-host', template: '' })
class KirbyCardClickHostComponent {
  someMethod() {
    //noop
  }
}

describe('CardAsButtonDirective', () => {
  let spectator: SpectatorDirective<CardAsButtonDirective>;
  let cardElement: HTMLElement;

  const createDirective = createDirectiveFactory({
    directive: CardAsButtonDirective,
    imports: [],
    declarations: [CardComponent],
    host: KirbyCardClickHostComponent,
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
        expect(cardElement).not.toHaveClass('interaction-state-active');
        spectator.dispatchKeyboardEvent('kirby-card', 'keydown', key);
      });

      it('should add class "interaction-state-active" to host', () => {
        expect(cardElement).toHaveClass('interaction-state-active');
      });

      describe(`and keyup is then activated for ${key}`, () => {
        beforeEach(() => {
          expect(cardElement).toHaveClass('interaction-state-active');
          spectator.dispatchKeyboardEvent('kirby-card', 'keyup', key);
        });

        it('should remove class "interaction-state-active" from host', () => {
          expect(cardElement).not.toHaveClass('interaction-state-active');
        });
      });

      describe('and the element is then unfocused', () => {
        beforeEach(() => {
          expect(cardElement).toHaveClass('interaction-state-active');
          spectator.blur(cardElement);
        });

        it('should set host "aria-pressed" attribute to "false"', () => {
          expect(cardElement).not.toHaveClass('interaction-state-active');
        });
      });
    });
  });
});
