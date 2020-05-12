import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RadioButtonGroupComponent } from './radio-button-group.component';

describe('RadioButtonGroupComponent', () => {
  let spectator: Spectator<RadioButtonGroupComponent>;
  const createComponent = createComponentFactory(RadioButtonGroupComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
