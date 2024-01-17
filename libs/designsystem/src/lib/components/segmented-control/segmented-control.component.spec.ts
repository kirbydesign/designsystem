import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockDirective } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

import { SegmentItem } from './segment-item';
import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

const fatFingerSize = DesignTokenHelper.fatFingerSize;

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  const items: SegmentItem[] = [
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
  let ionSegmentElement: HTMLIonSegmentElement;

  const createHost = createHostFactory({
    component: SegmentedControlComponent,
    declarations: [MockDirective(ThemeColorDirective)],
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(async () => {
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

    ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
    await TestHelper.whenReady(ionSegmentElement);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have checked item as value when created', () => {
    expect(component.value).toBe(items[1]);
  });

  describe('in chip mode', () => {
    it('should have ion-segment with same width as segmented control', () => {
      spectator.setInput('mode', SegmentedControlMode.chip);
      const ionSegment = spectator.queryHost('ion-segment') as HTMLElement;

      expect(spectator.element.offsetWidth).toEqual(ionSegment.offsetWidth);
    });
  });

  const testModes = [
    SegmentedControlMode.default,
    SegmentedControlMode.chip,
    SegmentedControlMode.compactChip,
  ];

  testModes.forEach((testMode) => {
    describe(`in '${testMode}' mode`, () => {
      beforeEach(() => {
        spectator.setInput('mode', testMode);
      });

      it(`should have a '${testMode}' mode when created`, () => {
        expect(component.mode).toBe(testMode);
      });

      it('should have an ion-segment control', () => {
        expect(spectator.queryHost('ion-segment')).toBeDefined();
      });

      it('should have a segment button per item', () => {
        expect(spectator.queryHostAll('ion-segment-button').length).toBe(items.length);
      });

      it('should call onSegmentSelect when ionChange event fires', () => {
        expect(component.value).toBe(items[1]);
        spyOn(component, 'onSegmentSelect');
        const changeEvent = new CustomEvent('ionChange', { detail: { value: items[0].id } });
        ionSegmentElement.dispatchEvent(changeEvent);
        expect(component.onSegmentSelect).toHaveBeenCalledWith(items[0].id);
      });

      it('should set value to event.detail.value when ionChange event fires', () => {
        expect(component.value).toBe(items[1]);
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
        it('should not emit segmentSelect event', () => {
          const onSegmentSelectSpy = spyOn(component.segmentSelect, 'emit');

          const clonedItems = JSON.parse(JSON.stringify(items));
          spectator.setHostInput({ items: clonedItems });
          expect(onSegmentSelectSpy).not.toHaveBeenCalled();
        });
      });

      it('should set the correct value when changing the selected-index', () => {
        spectator.setInput('selectedIndex', 2);

        expect(component.value).toBe(items[2]);
      });

      it('should invoke the selected-index-change when changing the selected-index', () => {
        const subscriber = jasmine.createSpy('subcriber');
        spectator.output('selectedIndexChange').subscribe(subscriber);

        spectator.setInput('selectedIndex', 2);

        expect(subscriber).toHaveBeenCalledTimes(1);
      });

      it('should set the correct value when changing the selected-index in segment-select call-back', fakeAsync(() => {
        spectator
          .output('segmentSelect')
          .subscribe((value) => spectator.setInput('selectedIndex', 2));

        spectator.dispatchMouseEvent('ion-segment-button:first-of-type', 'click');
        tick();

        expect(component.value).toBe(items[2]);
      }));
    });
  });
});

describe('SegmentedControl with Badge', () => {
  const itemsWithBadge: SegmentItem[] = [
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
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-segmented-control>
       </kirby-segmented-control>`
    );
  });

  it('should render a badge per item with badge property defined', () => {
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
    const iconComponent = spectator.debugElement.query(
      By.directive(IconComponent)
    ).componentInstance;

    expect(iconComponent.name).toBe(item.badge.icon);
  });

  it('should render badge with icon if both icon and content is provided', () => {
    spectator.setInput({ items: [itemsWithBadge[2]] });
    const iconComponent = spectator.debugElement.query(
      By.directive(IconComponent)
    ).componentInstance;

    expect(iconComponent).toBeDefined();
  });
});
