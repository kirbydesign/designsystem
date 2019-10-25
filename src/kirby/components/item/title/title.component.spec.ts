import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let spectator: Spectator<TitleComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: TitleComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
