import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ValueComponent } from './value.component';

describe('TitleComponent', () => {
  let spectator: Spectator<ValueComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ValueComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
