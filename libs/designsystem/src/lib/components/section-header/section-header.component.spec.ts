import { IonItemDivider } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    declarations: [SectionHeaderComponent, MockComponent(IonItemDivider)],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
    </kirby-section-header>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
