import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SlidesComponent } from './slides.component';

describe('SlidesComponent', () => {
  let spectator: SpectatorHost<SlidesComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: SlidesComponent,
  });

  beforeEach(() => {
    spectator = createHost('<kirby-slides>Value</kirby-slides>');
    element = spectator.element as HTMLElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
