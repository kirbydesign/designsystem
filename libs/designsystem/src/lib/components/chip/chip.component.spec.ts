import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { ChipComponent } from './chip.component';

const getColor = DesignTokenHelper.getColor;

describe('ChipComponent', () => {
  let spectator: SpectatorHost<ChipComponent>;

  const createHost = createHostFactory({
    component: ChipComponent,
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-chip></kirby-chip>`, {
      props: { text: 'Test' },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have the configured text', () => {
    const expectedText = 'Test';
    expect(spectator.component.text).toEqual(expectedText);
    expect(spectator.element).toHaveText(expectedText, true);
  });

  it('should not be selected', () => {
    expect(spectator.component.isSelected).toBeFalsy();
  });

  it('should render with correct theme-color', () => {
    expect(spectator.element).toHaveComputedStyle({
      'background-color': getColor('white'),
      color: getColor('white', 'contrast'),
    });
  });

  describe('when selected', () => {
    it('should render with correct theme-color', () => {
      spectator.setInput('isSelected', true);
      spectator.detectChanges();
      expect(spectator.element).toHaveComputedStyle({
        'background-color': getColor('black'),
        color: getColor('black', 'contrast'),
      });
    });
  });

  describe('inside host with .kirby-color-brightness-dark class', () => {
    beforeEach(() => {
      spectator.hostElement.className = 'kirby-color-brightness-dark';
    });

    it('should render with correct theme-color', () => {
      expect(spectator.element).toHaveComputedStyle({
        'background-color': 'transparent',
        color: getColor('white'),
      });
    });

    describe('when selected', () => {
      it('should render with correct theme-color', () => {
        spectator.setInput('isSelected', true);
        spectator.detectChanges();
        expect(spectator.element).toHaveComputedStyle({
          'background-color': getColor('white'),
          color: getColor('white', 'contrast'),
        });
      });
    });
  });
});
