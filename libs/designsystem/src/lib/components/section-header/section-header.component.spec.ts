import { IonItemDivider, IonLabel } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers';
import { LabelComponent } from '../item/label/label.component';

import { SectionHeaderComponent } from './section-header.component';

const { fontSize, fontWeight, lineHeight } = DesignTokenHelper;

describe('SectionHeaderComponent', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    declarations: [
      SectionHeaderComponent,
      LabelComponent,
      MockComponent(IonItemDivider),
      MockComponent(IonLabel),
    ],
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('with heading, detail and label attributes', () => {
    beforeEach(() => {
      spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
        <p heading>Section Header</p>
        <p label>Section Header</p>
        <p detail>Section Header</p>
      </kirby-section-header>`);
    });

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

  describe('with kirby-label around heading, detail and label', () => {
    beforeEach(() => {
      spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
        <kirby-label>
          <p heading>Section Header</p>
          <p label>Section Header</p>
          <p detail>Section Header</p>
        </kirby-label>
      </kirby-section-header>`);
    });

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
