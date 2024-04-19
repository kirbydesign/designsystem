import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { AccordionItemComponent } from './accordion-item.component';

const getColor = DesignTokenHelper.getColor;
const getTextColor = DesignTokenHelper.getTextColor;

describe('AccordionItemComponent', () => {
  let spectator: SpectatorHost<AccordionItemComponent>;

  const createHost = createHostFactory({
    component: AccordionItemComponent,
    imports: [IconModule],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-accordion-item>content</kirby-accordion-item>`, {
      props: { title: 'Title' },
    });
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have the configured title', () => {
      const expectedText = 'Title';
      expect(spectator.component.title).toEqual(expectedText);
      expect(spectator.query('.title')).toHaveExactTrimmedText(expectedText);
    });

    it('should have correct tabindex', () => {
      expect(spectator.query('.header')).toHaveAttribute('tabIndex', '0');
    });

    it('should not be expanded', () => {
      expect(spectator.component.isExpanded).toBeFalse();
      expect(spectator.query('.header')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not be disabled', () => {
      expect(spectator.component.isDisabled).toBeFalse();
      expect(spectator.query('.header')).not.toHaveAttribute('aria-disabled');
    });

    it('should not show the content', () => {
      expect(spectator.query('.content')).toBeHidden();
    });

    it('should emit the "toggle" event when expanded', () => {
      spyOn(spectator.component.toggle, 'emit');

      spectator.click('.header');

      expect(spectator.component.toggle.emit).toHaveBeenCalledOnceWith(true);
    });
  });

  describe('when expanded', () => {
    beforeEach(() => {
      spectator.setInput('isExpanded', true);
      spectator.detectChanges();
    });

    it('should show the content', () => {
      expect(spectator.query('.content')).toBeVisible();
    });

    it('should have aria-expanded attribute = true on header', () => {
      expect(spectator.query('.header')).toHaveAttribute('aria-expanded', 'true');
    });

    it('should emit the "toggle" event when collapsed', () => {
      spyOn(spectator.component.toggle, 'emit');

      spectator.click('.header');

      expect(spectator.component.toggle.emit).toHaveBeenCalledOnceWith(false);
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      spectator.setInput('isDisabled', true);
      spectator.detectChanges();
    });

    it('should not show content', () => {
      expect(spectator.query('.content')).toBeHidden();
    });

    it('should have correct tabindex', () => {
      expect(spectator.query('.header')).toHaveAttribute('tabIndex', '-1');
    });

    it('should use disabled-style', () => {
      expect(spectator.query('.title')).toHaveComputedStyle({
        color: getTextColor('semi-dark'),
      });
      expect(spectator.query('.kirby-icon')).toHaveComputedStyle({
        color: getColor('semi-dark'),
      });
    });

    it('should add aria-disabled attribute on header', () => {
      expect(spectator.query('.header')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not emit the "toggle" event when clicked', () => {
      spyOn(spectator.component.toggle, 'emit');

      spectator.click('.header');

      expect(spectator.component.toggle.emit).not.toHaveBeenCalled();
    });
  });
});
