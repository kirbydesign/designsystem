import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RadiobuttonShowcaseComponent } from './radiobutton-showcase.component';

describe('RadiobuttonShowcaseComponent', () => {
  let spectator: Spectator<RadiobuttonShowcaseComponent>;
  const createComponent = createComponentFactory(RadiobuttonShowcaseComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
