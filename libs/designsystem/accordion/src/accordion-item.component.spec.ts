import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { ListComponent } from '@kirbydesign/designsystem/list';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { AccordionItemComponent } from './accordion-item.component';

const getColor = DesignTokenHelper.getColor;
const getTextColor = DesignTokenHelper.getTextColor;
const padding = DesignTokenHelper.size('s');

describe('AccordionItemComponent', () => {
  let spectator: SpectatorHost<AccordionItemComponent>;

  const createHost = createHostFactory({
    component: AccordionItemComponent,
    declarations: [ListComponent],
    imports: [IconModule, TestHelper.ionicModuleForTest],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-accordion-item [title]="title" [hasPadding]="hasPadding">content</kirby-accordion-item>`,
        {
          hostProps: { title: 'Title', hasPadding: true },
        }
      );
    });
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have the configured title', () => {
      const expectedText = 'Title';
      expect(spectator.component.title).toEqual(expectedText);
      expect(spectator.query('.title')).toHaveExactTrimmedText(expectedText);
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

    it('should have padding by default', () => {
      expect(spectator.query('.content-body')).toHaveComputedStyle({
        padding: `0px ${padding} ${padding}`,
      });
    });

    it('should have no padding if hasPadding is false', () => {
      spectator.setHostInput('hasPadding', false);
      spectator.detectChanges();

      expect(spectator.query('.content-body')).toHaveComputedStyle({
        padding: '0px',
      });
    });
  });

  describe('when expanded', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-accordion-item [isExpanded]="true">content</kirby-accordion-item>`
      );
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

  describe('with heading level', () => {
    describe('when headingLevel is defined', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-accordion-item headingLevel="3" title="Title">content</kirby-accordion-item>`
        );
      });

      it('should set role="heading"', () => {
        const headingElement = spectator.query('[role="heading"]');
        expect(headingElement).toBeTruthy();
      });

      it('should set aria-level to the correct heading level', () => {
        const headingElement = spectator.query('[role="heading"]');
        expect(headingElement?.getAttribute('aria-level')).toBe('3');
      });
    });

    describe('when headingLevel is undefined', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-accordion-item title="Title">content</kirby-accordion-item>`
        );
      });

      it('should not set role="heading"', () => {
        const headingElement = spectator.query('[role="heading"]');
        expect(headingElement).toBeNull();
      });

      it('should not set aria-level', () => {
        const element = spectator.query('.header')?.parentElement;
        expect(element?.hasAttribute('aria-level')).toBeFalse();
      });
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-accordion-item [isDisabled]="true">content</kirby-accordion-item>`
      );
    });

    it('should not show content', () => {
      expect(spectator.query('.content')).toBeHidden();
    });

    it('should use disabled-style', () => {
      expect(spectator.query('.title')).toHaveComputedStyle({
        color: getTextColor('semi-dark'),
      });
      expect(spectator.query('.kirby-icon')).toHaveComputedStyle({
        color: getColor('semi-dark'),
      });
    });

    it('should not emit the "toggle" event when clicked', () => {
      spyOn(spectator.component.toggle, 'emit');

      spectator.click('.header');

      expect(spectator.component.toggle.emit).not.toHaveBeenCalled();
    });
  });
  describe('with list', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-accordion-item><kirby-list></kirby-list></kirby-accordion-item>`
      );
    });

    it('should have no padding and set containing lists to have no shape', () => {
      spectator.component.listChildren.forEach((child) =>
        expect(child.shape === 'none').toBeTrue()
      );
      expect(spectator.component.hasPadding).toBeFalse();
      expect(spectator.component.hasList).toBeTrue();
    });
  });
});
