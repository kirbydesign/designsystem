import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let spectator: Spectator<InputComponent>;
  let component: InputComponent;

  const createComponent = createComponentFactory({
    component: InputComponent,
    declarations: [InputComponent],
  });

  beforeEach(() => {
    spectator = createComponent({});
    spectator.detectChanges();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
