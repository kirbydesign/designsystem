import { Spectator, createTestComponentFactory } from '@ngneat/spectator';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let spectator: Spectator<TextareaComponent>;
  let component: TextareaComponent;

  const createComponent = createTestComponentFactory({
    component: TextareaComponent,
    declarations: [TextareaComponent],
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
