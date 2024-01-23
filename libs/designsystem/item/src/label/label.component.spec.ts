import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let spectator: Spectator<LabelComponent>;

  const createHost = createComponentFactory({
    providers: [provideIonicAngular({ mode: 'ios', _testing: true })],
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
