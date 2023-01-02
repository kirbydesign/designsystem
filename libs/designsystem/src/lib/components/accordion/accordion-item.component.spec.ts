import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from '../icon/icon.component';

import { AccordionItemComponent } from './accordion-item.component';

const getColor = DesignTokenHelper.getColor;
const getTextColor = DesignTokenHelper.getTextColor;

describe('AccordionItemComponent', () => {
  let spectator: SpectatorHost<AccordionItemComponent>;

  const createHost = createHostFactory({
    component: AccordionItemComponent,
    declarations: [IconComponent],
    imports: [TestHelper.ionicModuleForTest],
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

  describe('Disabled', () => {
    it('should not show content if disabled', () => {
      spectator.setInput('isDisabled', true);
      spectator.detectChanges();
      expect(spectator.query('.content')).toHaveComputedStyle({
        visibility: 'hidden',
      });
    });
    it('should use disabled-style if disabled', () => {
      spectator.setInput('isDisabled', true);
      spectator.detectChanges();
      expect(spectator.query('.title')).toHaveComputedStyle({
        color: getTextColor('semi-dark'),
      });
      expect(spectator.query('.kirby-icon')).toHaveComputedStyle({
        color: getColor('semi-dark'),
      });
    });
  });
});
