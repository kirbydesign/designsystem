import { IonItemDivider, IonLabel } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { LabelComponent } from '../item/label/label.component';

import { SectionHeaderComponent } from './section-header.component';

fdescribe('SectionHeaderComponent', () => {
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

  describe('with heading, detail and label', () => {
    beforeEach(() => {
      spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
        <p heading>Hello</p>
        <p label>Hello</p>
        <p detail>Hello</p>
      </kirby-section-header>`);
    });

    it('should have correct typography styles', () => {
      expect(true).toBeFalse();
    });

    it('should have correct margin', () => {
      expect(true).toBeFalse();
    });
  });

  describe('with kirby-label around heading, detail and label', () => {
    beforeEach(() => {
      spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
        <kirby-label>
          <p heading>Hello</p>
          <p label>Hello</p>
          <p detail>Hello</p>
        </kirby-label>
      </kirby-section-header>`);
    });

    it('should have correct typography styles', () => {
      expect(true).toBeFalse();
    });

    it('should have correct margin', () => {
      expect(true).toBeFalse();
    });
  });
});
