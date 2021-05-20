import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers';
import { TestHelper } from '../../testing/test-helper';
import { BadgeComponent } from '../badge/badge.component';
import { ChipComponent } from '../chip/chip.component';
import { SegmentItem } from '../segmented-control/segment-item';
import { Mode, SegmentedControlComponent } from '../segmented-control/segmented-control.component';

const getColor = DesignTokenHelper.getColor;

describe('ChipComponent in SegmentedControlComponent', () => {
  let spectator: SpectatorHost<SegmentedControlComponent>;
  let items: SegmentItem[] = [
    {
      text: 'Chip-1',
      id: '1',
    },
  ];

  const createHost = createHostFactory({
    component: SegmentedControlComponent,
    declarations: [ChipComponent, BadgeComponent],
    imports: [TestHelper.ionicModuleForTest],
  });

  describe("when mode is 'compactChip'", () => {
    let chip: Element;

    beforeEach(() => {
      spectator = createHost(
        `<kirby-segmented-control [mode]="mode" [items]="items" selectedIndex="1">
         </kirby-segmented-control>`,
        {
          hostProps: {
            items: items,
            mode: Mode.compactChip,
          },
        }
      );
      chip = spectator.queryHostAll('kirby-chip')[0];
    });

    it('should render with correct inline margin', () => {
      expect(chip).toHaveComputedStyle({
        'margin-inline-start': DesignTokenHelper.size('xxxxs'),
        'margin-inline-end': DesignTokenHelper.size('xxxxs'),
      });
    });

    it('should render with correct padding', () => {
      expect(chip).toHaveComputedStyle({
        'padding-left': '13px',
        'padding-right': '13px',
      });
    });

    it('should render with correct minimum width', () => {
      expect(chip).toHaveComputedStyle({
        'min-width': '44px',
      });
    });

    it('should not shrink', () => {
      expect(chip).toHaveComputedStyle({
        'flex-shrink': '0',
      });
    });

    it('should render with correct colors', () => {
      expect(chip).toHaveComputedStyle({
        'background-color': 'transparent',
        color: getColor('black'),
      });
    });

    describe('and the chip is selected', () => {
      beforeEach(() => {
        spectator.setInput('selectedIndex', 0);
      });

      it('should render with correct colors', () => {
        expect(chip).toHaveComputedStyle({
          'background-color': getColor('black'),
          color: getColor('white'),
        });
      });
    });

    describe('and the screen size is <=320px', () => {
      beforeEach(() => {
        TestHelper.resizeTestWindow(TestHelper.screensize.phonesmall);
      });

      afterEach(() => {
        TestHelper.resetTestWindow();
      });

      it('should render with no inline margin', () => {
        expect(chip).toHaveComputedStyle({
          'margin-inline-start': '0px',
          'margin-inline-end': '0px',
        });
      });
    });
  });
});
