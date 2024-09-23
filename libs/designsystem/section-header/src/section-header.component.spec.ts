import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SectionHeaderComponent } from './section-header.component';

const { fontSize, fontWeight, lineHeight } = DesignTokenHelper;

describe('SectionHeaderComponent', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <p heading>Section Header</p>
      <p label>Section Header</p>
      <p detail>Section Header</p>
    </kirby-section-header>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('with heading, detail and label attributes', () => {
    // FIXME: Refactor typography test
    xit('should have heading with correct typography styles', () => {
      const heading = spectator.queryHost<HTMLElement>('[heading]');
      expect(heading).toHaveComputedStyle({
        'font-size': fontSize('m'),
        'font-weight': fontWeight('bold'),
        'line-height': lineHeight('m'),
      });
    });

    // FIXME: Refactor typography test
    xit('should have detail with correct typography styles', () => {
      const detail = spectator.queryHost<HTMLElement>('[detail]');
      expect(detail).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });

    // FIXME: Refactor typography test
    xit('should have label with correct typography styles', () => {
      const label = spectator.queryHost<HTMLElement>('[label]');
      expect(label).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });
  });

  describe('ion-item-divider inside section header', () => {
    it('should have correct z-index', () => {
      const divider = spectator.queryHost('ion-item-divider');
      expect(divider).toHaveComputedStyle({
        'z-index': 'auto',
      });
    });
  });
});
