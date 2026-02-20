import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MultiSelectAutocompleteComponent } from './multi-select-autocomplete.component';

describe('MultiSelectAutocomplete', () => {
  let spectator: SpectatorHost<MultiSelectAutocompleteComponent>;
  const createHost = createHostFactory({
    component: MultiSelectAutocompleteComponent,
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
