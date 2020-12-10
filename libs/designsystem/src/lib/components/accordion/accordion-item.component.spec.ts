import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { IconComponent } from '../icon/icon.component';
import { AccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let spectator: SpectatorHost<AccordionItemComponent>;

  const createHost = createHostFactory({
    component: AccordionItemComponent,
    declarations: [IconComponent],
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-accordion-item>content</kirby-accordion-item>`, {
      props: { title: 'Title' },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have the configured title', () => {
    const expectedText = 'Title';
    expect(spectator.component.title).toEqual(expectedText);
    expect(spectator.query('.title')).toHaveText(expectedText, true);
  });

  it('should not be expanded', () => {
    expect(spectator.component.isExpanded).toBeFalsy();
  });

  it('should not show the content', () => {
    expect(spectator.query('.content')).toHaveComputedStyle({
      visibility: 'hidden',
    });
  });

  describe('when expanded', () => {
    it('should show the content', () => {
      spectator.setInput('isExpanded', true);
      spectator.detectChanges();
      expect(spectator.query('.content')).toHaveComputedStyle({
        visibility: 'visible',
      });
    });
  });
});
