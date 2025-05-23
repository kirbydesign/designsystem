import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let spectator: SpectatorHost<LinkComponent>;
  const createHost = createHostFactory({
    component: LinkComponent,
    shallow: true,
  });

  it('should render projected content', () => {
    spectator = createHost(`<button kirby-link>Click me</button>`);
    const button = spectator.query('button');
    expect(button?.textContent?.trim()).toBe('Click me');
  });

  it('should render as a native <button> element', () => {
    spectator = createHost(`<button kirby-link>Click</button>`);
    const button = spectator.query('button');
    expect(button?.tagName.toLowerCase()).toBe('button');
  });

  it('should be focusable and clickable', () => {
    spectator = createHost(`<button kirby-link (click)="clicked = true">Click</button>`, {
      hostProps: {
        clicked: false,
      },
    });

    spectator.click('button');
    expect(spectator.hostComponent['clicked']).toBe(true);
  });

  it('should inherit font and color styles from parent', () => {
    spectator = createHost(`
      <div style="color: rgb(255, 0, 0); font-family: monospace">
        <button kirby-link>Styled</button>
      </div>
    `);
    const button = spectator.query('button');
    expect(button).toBeTruthy();

    if (button) {
      const computed = getComputedStyle(button);
      expect(computed.color).toBe('rgb(255, 0, 0)');
      expect(computed.fontFamily.toLowerCase()).toContain('monospace');
    }
  });

  it('should show underline by default and remove it on hover (simulated)', () => {
    spectator = createHost(`<button kirby-link>Link</button>`);
    const button = spectator.query('button');
    expect(button).toBeTruthy();

    if (button) {
      const style = getComputedStyle(button);
      expect(style.textDecorationLine).toContain('underline');

      button.classList.add('hover');
      const afterHover = getComputedStyle(button);
      expect(afterHover.textDecorationLine).not.toContain('underline');
    }
  });
});
