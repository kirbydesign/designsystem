import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;

  const createHost = createHostFactory({
    component: RangeComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost('<kirby-range></kirby-range>');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should always have a pinFormatter function when pin is set', () => {
    spectator.setInput('pin', true);
    expect(spectator.component.pinFormatter).toBeDefined();
  });
});
