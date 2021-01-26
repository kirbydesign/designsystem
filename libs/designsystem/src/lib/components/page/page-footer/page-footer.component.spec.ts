import { Renderer2 } from '@angular/core';
import { createComponentFactory, createSpyObject, Spectator } from '@ngneat/spectator';

import { PageComponent } from '../page.component';

import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
  let spectator: Spectator<PageFooterComponent>;
  const pageComponent = createSpyObject(PageComponent, { tabBarBottomHidden: true });
  const createComponent = createComponentFactory({
    component: PageFooterComponent,
    providers: [
      {
        provide: PageComponent,
        useValue: pageComponent,
      },
      Renderer2,
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  describe('close', () => {
    it('should show tabs', () => {
      pageComponent.tabBarBottomHidden = true;
      spectator.component.close();

      expect(pageComponent.tabBarBottomHidden).toBe(false);
    });

    it('should remove host element', () => {
      expect(spectator.element.parentElement).not.toBeNull();

      spectator.component.close();
      spectator.detectChanges();

      expect(spectator.element.parentElement).toBeNull();
      expect(spectator.element.isConnected).toBe(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should show tabs', () => {
      pageComponent.tabBarBottomHidden = true;

      spectator.component.ngOnDestroy();

      expect(pageComponent.tabBarBottomHidden).toBe(false);
    });
  });
});
