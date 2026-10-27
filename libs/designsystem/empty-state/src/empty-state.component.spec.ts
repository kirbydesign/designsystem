import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: EmptyStateComponent,
    imports: [TestHelper.ionicModuleForTest, IconComponent],
  });

  beforeEach(() => {
    spectator = createHost(`
    <kirby-empty-state
      iconName="help"
      title="No items"
      subtitle="You don't have any items. Call support to add some items to your account."
    >
      <button kirby-button>Call support</button>
    </kirby-empty-state>
    `);
    element = spectator.element;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with the correct border width', () => {
    const outlineElement = element.getElementsByClassName('icon-outline')[0];
    expect(outlineElement).toHaveComputedStyle({ 'border-width': DesignTokenHelper.size('xxxs') });
  });
  it('should have title', () => {
    const titleElement = element.querySelector('.title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toBe('No items');
  });

  it('should have title as span', () => {
    const titleElement = element.querySelector('.title');
    expect(titleElement?.tagName.toLowerCase()).toBe('span');
  });

  it('should have subtitle', () => {
    const subtitleElement = element.querySelector('.subtitle');
    expect(subtitleElement).toBeTruthy();
    expect(subtitleElement.textContent).toBe(
      "You don't have any items. Call support to add some items to your account."
    );
  });
});

describe('EmptyStateComponent themeColor', () => {
  const supportedColors = ['success', 'warning', 'danger', 'medium'];
  const deprecatedColors = ['primary', 'secondary', 'tertiary', 'light', 'dark', 'white'];

  const createHost = createHostFactory({
    component: EmptyStateComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spyOn(console, 'warn');
  });

  supportedColors.forEach((themeColor) => {
    it(`should not warn when set to '${themeColor}'`, () => {
      createHost(`<kirby-empty-state themeColor="${themeColor}"></kirby-empty-state>`);

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  deprecatedColors.forEach((themeColor) => {
    it(`should warn that '${themeColor}' is deprecated`, () => {
      createHost(`<kirby-empty-state themeColor="${themeColor}"></kirby-empty-state>`);

      expect(console.warn).toHaveBeenCalledWith(
        jasmine.stringContaining(`themeColor '${themeColor}' is deprecated`)
      );
    });
  });
});
