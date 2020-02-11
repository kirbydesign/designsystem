import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { TextareaComponent } from './textarea.component';

const getColor = DesignTokenHelper.getColor;

fdescribe('TextareaComponent', () => {
  let spectator: SpectatorHost<TextareaComponent>;
  let element: HTMLTextAreaElement;

  const createHost = createHostFactory({
    component: TextareaComponent,
    declarations: [TextareaComponent],
  });

  beforeEach(() => {
    spectator = createHost('<textarea kirby-textarea></textarea>');
    element = spectator.element as HTMLTextAreaElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct color', () => {
    expect(element).toHaveComputedStyle({ color: getColor('black') });
  });

  it('should render with correct box-sizing', () => {
    expect(element).toHaveComputedStyle({ 'box-sizing': 'border-box' });
  });

  it('should render without border', () => {
    expect(element).toHaveComputedStyle({
      'border-width': '0px',
      'border-style': 'none',
    });
  });

  it('should render without outline', () => {
    expect(element).toHaveComputedStyle({
      'outline-width': '0px',
      'outline-style': 'none',
    });
  });

  it('should render with correct border-radius', () => {
    const expected = DesignTokenHelper.borderRadius();
    expect(element).toHaveComputedStyle({ 'border-radius': expected });
  });

  describe('when hasError', () => {
    beforeEach(() => {
      spectator.component.hasError = true;
      spectator.detectChanges();
    });

    it('should render with correct border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': getColor('danger'),
      });
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      element.disabled = true;
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': getColor('light', 'tint'),
      });
    });
  });
});
