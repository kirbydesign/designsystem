import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { ItemComponent } from '../../item';
import { InputComponent } from './input.component';

describe('InputComponent in Item', () => {
  let spectator: SpectatorHost<InputComponent>;
  let element: HTMLInputElement;

  const createHost = createHostFactory({
    component: InputComponent,
    declarations: [ItemComponent],
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeEach(() => {
    spectator = createHost(`
    <kirby-item>
      <input kirby-input/>
    </kirby-item>`);
    element = spectator.element as HTMLInputElement;
  });

  it('should render with correct padding', () => {
    expect(element).toHaveComputedStyle({
      padding: '0px',
    });
  });

  it('should render without border-radius', () => {
    expect(element).toHaveComputedStyle({
      'border-radius': '0px',
    });
  });

  it('should render without box-shadow', () => {
    expect(element).toHaveComputedStyle({
      'border-shadow': '',
    });
  });

  it('should render with default width', () => {
    //window.getComputedStyle() returns width in pixels - so use element.computedStyleMap:
    const styleWidth = (element as any)
      .computedStyleMap()
      .get('width')
      .toString();
    expect(styleWidth).toBe('auto');
  });
});
