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
});
