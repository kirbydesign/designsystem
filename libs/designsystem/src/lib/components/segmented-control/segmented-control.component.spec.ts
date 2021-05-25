import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents, MockDirective } from 'ng-mocks';

import { ThemeColorDirective } from '../../directives';
import { TestHelper } from '../../testing/test-helper';
import { BadgeComponent } from '../badge/badge.component';
import { ChipComponent } from '../chip/chip.component';

import { SegmentItem } from './segment-item';
import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

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
