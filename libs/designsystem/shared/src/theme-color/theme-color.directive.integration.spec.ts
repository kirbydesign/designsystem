import { EmptyStateComponent } from '@kirbydesign/designsystem/empty-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

/*
 * `ThemeColorDirective` has no selector and is only applied to components through
 * `hostDirectives`. It is therefore verified through a host component (here `kirby-empty-state`)
 * that composes it.
 */
describe('ThemeColorDirective', () => {
  let spectator: Spectator<EmptyStateComponent>;

  const createComponent = createComponentFactory({
    component: EmptyStateComponent,
  });

  function setup(themeColor: string): HTMLElement {
    spectator = createComponent();
    spectator.setInput('themeColor' as keyof EmptyStateComponent, themeColor);
    spectator.detectChanges();
    return spectator.element;
  }

  describe('when applied to a component via hostDirectives', () => {
    it('should add CSS Custom Property for theming background-color', () => {
      const element = setup('primary');

      expect(
        getComputedStyle(element).getPropertyValue('--kirby-inputs-background-color')
      ).not.toBe('');
    });

    it('should add CSS Custom Property for theming color', () => {
      const element = setup('primary');

      expect(getComputedStyle(element).getPropertyValue('--kirby-inputs-color')).not.toBe('');
    });
  });

  it('should add color brightness class for white', () => {
    const element = setup('white');

    expect(element).toHaveClass('kirby-color-brightness-white');
  });

  it('should add color brightness class for light', () => {
    const element = setup('light');

    expect(element).toHaveClass('kirby-color-brightness-light');
  });

  it('should add color brightness class for dark', () => {
    const element = setup('dark');

    expect(element).toHaveClass('kirby-color-brightness-dark');
  });
});
