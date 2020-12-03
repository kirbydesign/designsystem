import { Spectator, createHostComponentFactory } from '@ngneat/spectator';

import { PageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
  let spectator: Spectator<PageTitleComponent>;
  const createComponent = createHostComponentFactory({ component: PageTitleComponent });

  it('should create', () => {
    spectator = createComponent(`<kirby-page-title>My Title</kirby-page-title>`);
    expect(spectator.component).toBeTruthy();
  });
  it('should have class has-children when it has any html children', () => {
    spectator = createComponent(`<kirby-page-title>
      <div>here is some additional content</div>
      My title
    </kirby-page-title>`);
    const rootElement: HTMLElement = spectator.element;
    expect(rootElement.classList).toContain('has-children');
  });
  it('should not have class has-children when it has no html children', () => {
    spectator = createComponent(`<kirby-page-title>
      My title
    </kirby-page-title>`);
    const rootElement: HTMLElement = spectator.element;
    expect(rootElement.classList).not.toContain('has-children');
  });
});
