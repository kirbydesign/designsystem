import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let spectator: Spectator<RadioButtonComponent>;
  const createComponent = createComponentFactory(RadioButtonComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
