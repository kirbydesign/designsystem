import { Spectator, createTestComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let spectator: Spectator<LabelComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: LabelComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
