import { By } from '@angular/platform-browser';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents, MockDirective } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/core';

import { BadgeComponent } from '../';
import { ThemeColorDirective } from '../../directives';
import { TestHelper } from '../../testing/test-helper';
import { ChipComponent } from '../chip/chip.component';
import { IconComponent } from '../icon';

import { SegmentItem } from './segment-item';
import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

const fatFingerSize = DesignTokenHelper.fatFingerSize;

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let onSegmentSelectSpy: jasmine.Spy;
  let items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      badge: {
        content: '2',
        themeColor: 'danger',
      },
    },
    {
      text: 'Second item',
      id: 'second',
    },
    {
      text: 'Third item',
      id: 'third',
    },
  ];

  let spectator: SpectatorHost<SegmentedControlComponent>;

  const createHost = createHostFactory({
    component: SegmentedControlComponent,
    declarations: [
      MockComponents(ChipComponent, BadgeComponent),
      MockDirective(ThemeColorDirective),
    ],
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-segmented-control [items]="items" selectedIndex="1">
       </kirby-segmented-control>`,
      {
        hostProps: {
          items: items,
        },
      }
    );
    component = spectator.component;
    onSegmentSelectSpy = spyOn(component.segmentSelect, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have checked item as value when created', () => {
    expect(component.value).toBe(items[1]);
  });

  describe("in 'default' mode", () => {
    it("should have a 'default' mode when created", () => {
      expect(component.mode).toBe(SegmentedControlMode.default);
    });

    it('should have a segment button per item', () => {
      expect(spectator.queryHostAll('ion-segment-button').length).toBe(items.length);
    });

    it('should not have any segmented chips', () => {
      expect(spectator.queryHostAll('kirby-chip').length).toBe(0);
    });

    it('should call onSegmentSelect when ionChange event fires', async () => {
      expect(component.value).toBe(items[1]);
      const ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
      await TestHelper.whenReady(ionSegmentElement);
      spyOn(component, 'onSegmentSelect');
      const changeEvent = new CustomEvent('ionChange', { detail: { value: items[0].id } });
      ionSegmentElement.dispatchEvent(changeEvent);
      expect(component.onSegmentSelect).toHaveBeenCalledWith(items[0].id);
    });

    it('should set value to event.detail.value when ionChange event fires', async () => {
      expect(component.value).toBe(items[1]);
      const ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
      await TestHelper.whenReady(ionSegmentElement);
      const changeEvent = new CustomEvent('ionChange', { detail: { value: items[2].id } });
      ionSegmentElement.dispatchEvent(changeEvent);
      expect(component.value).toBe(items[2]);
    });

    it('should have touch area with minimum size equal to fat finger size', () => {
      const touchArea = window.getComputedStyle(
        spectator.element.querySelector('ion-segment-button'),
        '::after'
      );

      expect(parseInt(touchArea.height)).toBeGreaterThanOrEqual(parseInt(fatFingerSize()));
      expect(parseInt(touchArea.width)).toBeGreaterThanOrEqual(parseInt(fatFingerSize()));
    });

    describe('when updating items', () => {
      it('should not emit segmentSelect event', async () => {
        const ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
        await TestHelper.whenReady(ionSegmentElement);

        const clonedItems = JSON.parse(JSON.stringify(items));
        spectator.setHostInput({ items: clonedItems });
        expect(onSegmentSelectSpy).not.toHaveBeenCalled();
      });
    });
  });

  const testModes = [SegmentedControlMode.chip, SegmentedControlMode.compactChip];

  testModes.forEach((testMode) => {
    describe(`in '${testMode}' mode`, () => {
      beforeEach(() => {
        spectator.setInput('mode', testMode);
      });

      it(`should have a '${testMode}' mode when created`, () => {
        expect(component.mode).toBe(testMode);
      });

      it('should not have an ion-segment control', () => {
        expect(spectator.queryHost('ion-segment')).toBeNull();
      });

      it('should not have any segments buttons', () => {
        expect(spectator.queryHostAll('ion-segment-button').length).toBe(0);
      });

      it('should have a segment chip per item', () => {
        expect(spectator.queryHostAll('kirby-chip').length).toBe(items.length);
      });

      it('should call onSegmentSelect when clicking a different segment chip', () => {
        expect(component.value).toBe(items[1]);

        spyOn(component, 'onSegmentSelect');
        spectator.dispatchMouseEvent('kirby-chip:first-of-type', 'click');

        expect(component.onSegmentSelect).toHaveBeenCalled();
      });

      it('should set value when clicking a different segment chip', () => {
        expect(component.value).toBe(items[1]);

        spectator.dispatchMouseEvent('kirby-chip:last-of-type', 'click');

        expect(component.value).toBe(items[2]);
      });
    });
  });
});

describe('SegmentedControl with Badge', () => {
  let itemsWithBadge: SegmentItem[] = [
    {
      text: 'First Item',
      id: 'first',
      badge: {
        content: '1',
        themeColor: 'danger',
      },
    },
    {
      text: 'Second item',
      id: 'second',
      badge: {
        icon: 'attach',
        themeColor: 'danger',
      },
    },
    {
      text: 'Third item',
      id: 'third',
      badge: {
        content: '1',
        icon: 'attach',
        themeColor: 'danger',
      },
    },
  ];

  let spectator: SpectatorHost<SegmentedControlComponent>;

  const createHost = createHostFactory({
    component: SegmentedControlComponent,
    declarations: [MockComponents(ChipComponent, BadgeComponent, IconComponent)],
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-segmented-control>
       </kirby-segmented-control>`
    );
  });

  it('should render a badge per item that has it defined', () => {
    spectator.setInput({ items: itemsWithBadge });

    expect(spectator.queryHostAll('kirby-badge').length).toBe(itemsWithBadge.length);
  });

  it('should render badge with content (text-string)', () => {
    const item: SegmentItem = itemsWithBadge[0];
    spectator.setInput({ items: [item] });
    const badgeElement: HTMLElement = spectator.query('kirby-badge');

    expect(badgeElement.innerText.trim).toContainText(item.badge.content);
  });

  it('should render icon in badge with correct name', () => {
    const item: SegmentItem = itemsWithBadge[1];
    spectator.setInput({ items: [item] });
    const iconComponent = spectator.debugElement.query(By.directive(IconComponent))
      .componentInstance;

    expect(iconComponent.name).toBe(item.badge.icon);
    expect(iconComponent.customName).toBe(item.badge.icon);
  });

  it('should render badge with icon if both icon and content is provided', () => {
    spectator.setInput({ items: [itemsWithBadge[2]] });
    const iconComponent = spectator.debugElement.query(By.directive(IconComponent))
      .componentInstance;

    expect(iconComponent).toBeDefined();
  });
});
