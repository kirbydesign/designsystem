import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let spectator: Spectator<LabelComponent>;

  const createHost = createComponentFactory({
    imports: [TestHelper.ionicModuleForTest],
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
