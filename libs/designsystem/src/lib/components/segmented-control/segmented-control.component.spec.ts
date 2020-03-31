import { MockComponents, MockDirective } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { ThemeColorDirective } from '../../directives';
import { BadgeComponent } from '../badge/badge.component';
import { ChipComponent } from '../chip/chip.component';
import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentItem } from './segment-item';

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let onSegmentSelectSpy: jasmine.Spy;
  let items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      checked: false,
      badge: {
        content: '2',
        themeColor: 'danger',
      },
    },
    {
      text: 'Second item',
      checked: true,
      id: 'second',
    },
    {
      text: 'Third item',
      checked: false,
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
    imports: [IonicModule.forRoot({ mode: 'ios' })],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-segmented-control [items]="items">
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

  it('should not emit segmentSelect when created', () => {
    expect(onSegmentSelectSpy).not.toHaveBeenCalled();
  });

  it('should have checked item as activeSegment when created', () => {
    expect(component.activeSegment).toBe(items[1]);
  });

  describe('default mode', () => {
    it("should have a 'default' mode when created", () => {
      expect(component.isDefaultMode).toBeTruthy();
      expect(component.isChipMode).toBeFalsy();
    });

    it('should have a segment button per item', () => {
      expect(spectator.queryHostAll('ion-segment-button').length).toBe(items.length);
    });

    it('should not have any segmented chips', () => {
      expect(spectator.queryHostAll('kirby-chip').length).toBe(0);
    });

    it('should call onSegmentSelect when ionChange event fires', async () => {
      expect(component.activeSegment).toBe(items[1]);
      const ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
      await TestHelper.whenHydrated(ionSegmentElement);
      spyOn(component, 'onSegmentSelect');
      const changeEvent = new CustomEvent('ionChange', { detail: { value: items[0] } });
      ionSegmentElement.dispatchEvent(changeEvent);
      expect(component.onSegmentSelect).toHaveBeenCalledWith(items[0]);
    });

    it('should set activeSegment to event.detail.value when ionChange event fires', async () => {
      expect(component.activeSegment).toBe(items[1]);
      const ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
      await TestHelper.whenHydrated(ionSegmentElement);
      const changeEvent = new CustomEvent('ionChange', { detail: { value: items[2] } });
      ionSegmentElement.dispatchEvent(changeEvent);
      expect(component.activeSegment).toBe(items[2]);
    });

    describe('when updating items', () => {
      it('should not emit segmentSelect event', async () => {
        const ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
        await TestHelper.whenHydrated(ionSegmentElement);

        const clonedItems = JSON.parse(JSON.stringify(items));
        spectator.setHostInput({ items: clonedItems });
        expect(onSegmentSelectSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('chip mode', () => {
    beforeEach(() => {
      component.mode = 'chip';
      spectator.detectChanges();
    });

    it("should have a 'chip' mode when created", () => {
      expect(component.isDefaultMode).toBeFalsy();
      expect(component.isChipMode).toBeTruthy();
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
      expect(component.activeSegment).toBe(items[1]);
      spyOn(component, 'onSegmentSelect');
      spectator.dispatchMouseEvent('kirby-chip:first-of-type', 'click');
      expect(component.onSegmentSelect).toHaveBeenCalled();
    });

    it('should set activeSegment when clicking a different segment chip', () => {
      expect(component.activeSegment).toBe(items[1]);
      spectator.dispatchMouseEvent('kirby-chip:last-of-type', 'click');
      expect(component.activeSegment).toBe(items[2]);
    });
  });
});
