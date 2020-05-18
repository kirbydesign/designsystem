import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProgressCircleRingComponent } from './progress-circle-ring.component';
import { DesignTokenHelper } from './../../helpers/design-token-helper';
import { ThemeColor } from './../../helpers/theme-color.type';

describe('ProgressCircleRingComponent', () => {
  let spectator: Spectator<ProgressCircleRingComponent>;

  const createHost = createComponentFactory({
    component: ProgressCircleRingComponent,
  });

  beforeEach(() => {
    spectator = createHost({ props: { radius: 50 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.value).toBe(0);
  });

  describe('centerRadius', () => {
    it('should return distance from center to middle of stroke', () => {
      expect(spectator.component.centerRadius).toBe(
        spectator.component.radius - spectator.component.strokeWidth / 2
      );
    });
  });

  describe('centerCircumference', () => {
    it('should return circumference in middle of stroke', () => {
      expect(spectator.component.centerCircumference).toBe(
        spectator.component.centerRadius * 2 * Math.PI
      );
    });
  });

  describe('diameter', () => {
    it('should calculate diameter as 2*radius', () => {
      expect(spectator.component.diameter).toBe(spectator.component.radius * 2);
    });
  });

  describe('offset (progress)', () => {
    it('should return the non-progress circumference (1-progress) as offset', () => {
      const value = 33;
      spectator.setInput({
        value,
      });
      expect(spectator.component.offset).toBe(
        spectator.component.centerCircumference -
          spectator.component.centerCircumference * (value / 100)
      );
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      spectator.setInput({
        value: 50,
      });
    });

    it('computed size should equal 2*radius', () => {
      const radius = 33;
      spectator.setInput({ radius });
      spectator.detectChanges();
      expect(spectator.element).toHaveComputedStyle({
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
      });
    });

    it('should render progress stroke with themeColor when themeColor class is set', () => {
      const themeColor: ThemeColor = 'warning';
      spectator.element.classList.add(themeColor);
      spectator.element.style.transition = 'none';
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveComputedStyle({
        stroke: DesignTokenHelper.getColor(themeColor),
      });
    });

    it('should render progress stroke with success color when themeColor class is not set', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveComputedStyle({
        stroke: DesignTokenHelper.getColor('success'),
      });
    });

    it('should render background stroke in white', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.circle')).toHaveComputedStyle({
        stroke: DesignTokenHelper.getColor('white'),
      });
    });

    it('should render progress stroke with the correct width', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveAttribute(
        'stroke-width',
        '' + spectator.component.strokeWidth
      );
    });

    it('should render background stroke with the defined stroke width', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveAttribute(
        'stroke-width',
        '' + spectator.component.strokeWidth
      );
    });

    it('should render circle with a radius equivalent to calculated centerRadius', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveAttribute(
        'r',
        '' + spectator.component.centerRadius
      );
    });
  });
});
