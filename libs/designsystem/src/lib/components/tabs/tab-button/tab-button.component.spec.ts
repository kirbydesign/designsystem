import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent, MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { TabButtonComponent } from './tab-button.component';
import { IconComponent } from '../../icon/icon.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabButtonComponent>;

  const createHost = createComponentFactory({
    imports: [MockModule(IonicModule)],
    component: TabButtonComponent,
    declarations: [MockComponent(IconComponent)],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
