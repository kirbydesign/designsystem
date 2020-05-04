import { MockComponent } from 'ng-mocks';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;
const fontSize = DesignTokenHelper.fontSize;

describe('ButtonComponent', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;

  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [MockComponent(IconComponent)],
  });

  beforeEach(() => {
    spectator = createHost('<button kirby-button>Test</button>');
    element = spectator.element as HTMLButtonElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct background-color', () => {
    expect(element).toHaveComputedStyle({
      'background-color': getColor('primary'),
    });
  });

  it('should render with correct color', () => {
    expect(element).toHaveComputedStyle({ color: getColor('primary', 'contrast') });
  });

  it('should render without border', () => {
    expect(element).toHaveComputedStyle({
      'border-width': '0px',
      'border-style': 'none',
    });
  });

  it('should render with correct border-radius', () => {
    const expected = DesignTokenHelper.borderRadiusRound();
    expect(element).toHaveComputedStyle({ 'border-radius': expected });
  });

  it('should render with correct font-size', () => {
    expect(element).toHaveComputedStyle({ 'font-size': fontSize('s') });
  });

  it('should render with correct height', () => {
    expect(element).toHaveComputedStyle({ height: size('xl') });
  });

  it('should render with correct margin', () => {
    expect(element).toHaveComputedStyle({ margin: size('xxxs') });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      element.disabled = true;
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': getColor('semi-light'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({
        color: getColor('semi-dark', 'shade'),
      });
    });

    it('should render without border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });
  });

  describe('when configured with attentionlevel 1', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '1';
      spectator.detectChanges();
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': getColor('primary'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({
        color: getColor('white', 'contrast'),
      });
    });

    it('should render without border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({
          'background-color': getColor('danger'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('danger', 'contrast'),
        });
      });

      it('should render without border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '0px',
          'border-style': 'none',
        });
      });
    });
  });

  describe('when configured with attentionlevel 2', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '2';
      spectator.detectChanges();
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({
        color: getColor('white', 'contrast'),
      });
    });

    it('should render without border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({
          'background-color': getColor('light'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('danger'),
        });
      });

      it('should render without border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '0px',
          'border-style': 'none',
        });
      });
    });
  });

  describe('when configured with attentionlevel 3', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '3';
      spectator.detectChanges();
    });

    it('should render with no background-color', () => {
      expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
    });

    it('should render with correct border', () => {
      expect(element).toHaveComputedStyle({
        'border-color': getColor('medium'),
        'border-width': '1px',
        'border-style': 'solid',
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({
        color: getColor('medium', 'contrast'),
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
      });

      it('should render with correct border-color', () => {
        expect(element).toHaveComputedStyle({
          'border-color': getColor('medium'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('danger'),
        });
      });
    });
  });

  describe('when configured with attentionlevel 4', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '4';
      spectator.detectChanges();
    });

    it('should render with no background-color', () => {
      expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
    });

    it('should render without border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({
        color: getColor('primary', 'contrast'),
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with no background-color', () => {
        expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
      });

      it('should render without border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '0px',
          'border-style': 'none',
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({ color: getColor('danger') });
      });
    });
  });
});
