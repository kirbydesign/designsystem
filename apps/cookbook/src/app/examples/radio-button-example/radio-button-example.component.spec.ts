import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RadioButtonExampleComponent } from './radio-button-example.component';

describe('RadioButtonExampleComponent', () => {
  let spectator: Spectator<RadioButtonExampleComponent>;
  const createComponent = createComponentFactory(RadioButtonExampleComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
