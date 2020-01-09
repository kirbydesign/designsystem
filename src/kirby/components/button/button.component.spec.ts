/// <reference path="../../testing/element-css-custom-matchers.d.ts"/>

import { MockComponent } from 'ng-mocks';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { ElementCssCustomMatchers } from '../../testing/element-css-custom-matchers';
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
    declarations: [ButtonComponent, MockComponent(IconComponent)],
  });

  beforeEach(() => {
    jasmine.addMatchers(ElementCssCustomMatchers);
    spectator = createHost('<button kirby-button>Test</button>');
    element = spectator.element as HTMLButtonElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct background-color', () => {
    expect(element).toHaveThemeColorStyle({
      'background-color': getColor('primary'),
    });
  });

  it('should render with correct border-color', () => {
    expect(element).toHaveThemeColorStyle({
      'border-color': getColor('primary'),
    });
  });

  it('should render with correct color', () => {
    expect(element).toHaveThemeColorStyle({ color: getColor('primary', 'contrast') });
  });

  it('should render with correct border-radius', () => {
    const expected = DesignTokenHelper.borderRadiusRound();
    expect(element).toHaveStyle({ 'border-radius': expected });
  });

  it('should render with correct font-size', () => {
    expect(element).toHaveStyle({ 'font-size': fontSize('s') });
  });

  it('should render with correct height', () => {
    expect(element).toHaveStyle({ height: size('xl') });
  });

  it('should render with correct margin', () => {
    expect(element).toHaveStyle({ margin: size('xxxs') });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      element.disabled = true;
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveThemeColorStyle({
        'background-color': getColor('light', 'tint'),
      });
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeColorStyle({
        'border-color': getColor('light', 'tint'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColorStyle({
        color: getColor('semi-dark', 'shade'),
      });
    });
  });

  describe('when configured with attentionlevel 1', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '1';
      spectator.detectChanges();
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveThemeColorStyle({
        'background-color': getColor('primary'),
      });
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeColorStyle({
        'border-color': getColor('primary'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColorStyle({
        color: getColor('white', 'contrast'),
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveThemeColorStyle({
          'background-color': getColor('danger'),
        });
      });

      it('should render with correct border-color', () => {
        expect(element).toHaveThemeColorStyle({
          'border-color': getColor('danger'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveThemeColorStyle({
          color: getColor('danger', 'contrast'),
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
      expect(element).toHaveThemeColorStyle({
        'background-color': getColor('white'),
      });
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeColorStyle({
        'border-color': getColor('white'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColorStyle({
        color: getColor('white', 'contrast'),
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveThemeColorStyle({
          'background-color': getColor('light'),
        });
      });

      it('should render with correct border-color', () => {
        expect(element).toHaveThemeColorStyle({
          'border-color': getColor('light'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveThemeColorStyle({
          color: getColor('danger'),
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
      expect(element).toHaveStyle({ 'background-color': 'transparent' });
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeColorStyle({
        'border-color': getColor('medium'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColorStyle({
        color: getColor('medium', 'contrast'),
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveStyle({ 'background-color': 'transparent' });
      });

      it('should render with correct border-color', () => {
        expect(element).toHaveThemeColorStyle({
          'border-color': getColor('medium'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveThemeColorStyle({
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
      expect(element).toHaveStyle({ 'background-color': 'transparent' });
    });

    it('should render with no border-color', () => {
      expect(element).toHaveStyle({ 'border-color': 'transparent' });
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColorStyle({
        color: getColor('primary', 'contrast'),
      });
    });

    describe('and is destructive', () => {
      beforeEach(() => {
        spectator.component.isDestructive = true;
        spectator.detectChanges();
      });

      it('should render with no background-color', () => {
        expect(element).toHaveStyle({ 'background-color': 'transparent' });
      });

      it('should render with no border-color', () => {
        expect(element).toHaveStyle({ 'border-color': 'transparent' });
      });

      it('should render with correct color', () => {
        expect(element).toHaveThemeColorStyle({ color: getColor('danger') });
      });
    });
  });
});
