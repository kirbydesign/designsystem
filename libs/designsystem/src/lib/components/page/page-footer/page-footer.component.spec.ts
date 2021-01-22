import { Renderer2 } from '@angular/core';
import { createComponentFactory, createSpyObject, Spectator } from '@ngneat/spectator';

import { PageComponent } from '../page.component';

import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
  let spectator: Spectator<PageFooterComponent>;
  const pageComponent = createSpyObject(PageComponent, { hideTabs: true });
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
    it('should show tabs and remove element', () => {
      // can't use spectator.inject here https://stackoverflow.com/questions/56737965/how-test-directive-with-renderer2
      const renderer = spectator.fixture.componentRef.injector.get(Renderer2);
      const destroySpy = spyOn(renderer, 'destroy');
      spectator.component.close();

      expect(pageComponent.hideTabs).toBe(false);
      expect(destroySpy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should show tabs', () => {
      spectator.component.ngOnDestroy();

      expect(pageComponent.hideTabs).toBe(false);
    });
  });
});
