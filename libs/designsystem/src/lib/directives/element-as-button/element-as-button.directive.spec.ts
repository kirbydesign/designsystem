import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { CardComponent } from '../../components/card/card.component';

import { ElementAsButtonDirective } from './element-as-button.directive';

describe('ElementAsButtonDirective', () => {
  let spectator: SpectatorDirective<ElementAsButtonDirective>;

  const createDirective = createDirectiveFactory({
    directive: ElementAsButtonDirective,
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

  it('should have an outline-offset of 2px', () => {
    expect(spectator.element).toHaveComputedStyle({ 'outline-offset': '2px' });
  });
});
