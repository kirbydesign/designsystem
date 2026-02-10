import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MultiSelectAutocomplete } from './multi-select-autocomplete.component';

describe('MultiSelectAutocomplete', () => {
  let spectator: SpectatorHost<MultiSelectAutocomplete>;
  const createHost = createHostFactory({
    component: MultiSelectAutocomplete,
  });

  beforeEach(async () => {
    spectator = createHost(
      `<kirby-x-multi-select-autocomplete></kirby-x-multi-select-autocomplete>`
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
