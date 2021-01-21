import { ElementRef } from '@angular/core';
import { Spectator, createComponentFactory, createSpyObject } from '@ngneat/spectator';

import { PageComponent } from '../page.component';
import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
  let spectator: Spectator<PageFooterComponent>;
  let elementRef = {
    nativeElement: {
      remove: jasmine.createSpy('remove'),
    },
  } as ElementRef;
  let pageComponent = createSpyObject(PageComponent, { hideTabs: true });
  const createComponent = createComponentFactory({
    component: PageFooterComponent,
    providers: [
      {
        provide: PageComponent,
        useValue: pageComponent,
      },
      {
        provide: ElementRef,
        useValue: elementRef,
      },
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  describe('close', () => {
    it('should show tabs and remove element', () => {
      spectator.component.close();

      expect(pageComponent.hideTabs).toBe(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should show tabs', () => {
      spectator.component.ngOnDestroy();

      expect(pageComponent.hideTabs).toBe(false);
    });
  });
});
