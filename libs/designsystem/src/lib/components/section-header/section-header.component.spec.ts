import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SectionHeaderComponent } from './section-header.component';

const { fontSize, fontWeight, lineHeight } = DesignTokenHelper;

fdescribe('SectionHeaderComponent', async () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    // declarations: [SectionHeaderComponent, MockComponent(IonItemDivider)],
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <p heading>Section Header</p>
      <p label>Section Header</p>
      <p detail>Section Header</p>
    </kirby-section-header>`);

    // const ionContent = spectator.query('ion-slide');

    // await TestHelper.ionComponentOnReady(ionContent);
  });
  const ionContent = spectator.query('ion-slides');

  await TestHelper.ionComponentOnReady(ionContent);

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('with heading, detail and label attributes', () => {
    it('should have heading with correct typography styles', () => {
      const heading = spectator.queryHost<HTMLElement>('[heading]');
      expect(heading).toHaveComputedStyle({
        'font-size': fontSize('m'),
        'font-weight': fontWeight('bold'),
        'line-height': lineHeight('m'),
      });
    });

    it('should have detail with correct typography styles', () => {
      const detail = spectator.queryHost<HTMLElement>('[detail]');
      expect(detail).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });

    it('should have label with correct typography styles', () => {
      const label = spectator.queryHost<HTMLElement>('[label]');
      expect(label).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });
  });
});
