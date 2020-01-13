import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let spectator: Spectator<LabelComponent>;

  const createHost = createComponentFactory({
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
