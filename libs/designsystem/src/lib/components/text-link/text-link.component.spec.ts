import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { TextLinkComponent } from './text-link.component';
import { DesignTokenHelper } from '../../helpers';
import { SizeDirective } from '../../directives';
import { IconComponent } from '../icon';
const getColor = DesignTokenHelper.getColor;

describe('TextLinkComponent', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [IconComponent, SizeDirective],
    imports: [RouterTestingModule, MockComponent(IconComponent)],
  });

  it('should create', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct color', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);
    const link = spectator.queryHost<HTMLElement>('a');
    expect(link).toHaveComputedStyle({ color: getColor('black') });
  });

  it('should render with an underline', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);
    const link = spectator.queryHost<HTMLElement>('a');
    expect(link).toHaveComputedStyle({ 'text-decoration-line': 'underline' });
  });

  it('should have a pointer as the cursor', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);

    const link = spectator.hostElement.getElementsByTagName('kirby-text-link');
    expect(link[0]).toHaveComputedStyle({ cursor: 'pointer' });
  });

  describe('Test TextLink with icon', () => {
    it('should render a text link with a icon', () => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      expect(icon).toBeTruthy();
    });
    it('should render the icon named [link]', () => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');

      const IconName = icon.getAttribute('name');
      expect(IconName).toBe('link');
    });

    it('should render the icon to the right from the text', () => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      const text = spectator.queryHost<HTMLElement>('a');
      const textPosition = text.getBoundingClientRect();
      const iconPosition = icon.getBoundingClientRect();
      expect(textPosition.right).toBeLessThan(iconPosition.right);
    });
  });
});
