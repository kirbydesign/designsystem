import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DesignTokenHelper, ThemeColor } from '@kirbydesign/core';

import { ProgressCircleRingComponent } from './progress-circle-ring.component';

const getColor = DesignTokenHelper.getColor;

describe('ProgressCircleRingComponent', () => {
  let spectator: Spectator<ProgressCircleRingComponent>;

  const createHost = createComponentFactory({
    component: ProgressCircleRingComponent,
  });

  beforeEach(() => {
    spectator = createHost({ props: { radius: 50, strokeWidth: 4 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.value).toBe(0);
  });

  describe('centerRadius', () => {
    it('should return distance from center to middle of stroke', () => {
      expect(spectator.component._centerRadius).toBe(
        spectator.component.radius - spectator.component.strokeWidth / 2
      );
    });
  });

  describe('centerCircumference', () => {
    it('should return circumference in middle of stroke', () => {
      expect(spectator.component._centerCircumference).toBe(
        spectator.component._centerRadius * 2 * Math.PI
      );
    });
  });

  describe('diameter', () => {
    it('should calculate diameter as 2*radius', () => {
      expect(spectator.component._diameter).toBe(spectator.component.radius * 2);
    });
  });

  describe('progress within upperBound', () => {
    it('should return the non-progress circumference (1 - progress) as remainder', () => {
      const value = 33;
      const upperBound = 96;
      spectator.setInput({
        value,
        upperBound,
      });

      expect(spectator.component._remainder).toBe(
        spectator.component._centerCircumference -
          spectator.component._centerCircumference * (value / 100)
      );
    });
  });

  describe('progress larger than upperBound', () => {
    it('should return the non-progress circumference (1 - upperBound) as remainder', () => {
      const value = 99;
      const upperBound = 96;
      spectator.setInput({
        value,
        upperBound,
      });

      expect(spectator.component._remainder).toBe(
        spectator.component._centerCircumference -
          spectator.component._centerCircumference * (upperBound / 100)
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
      const expectedSize = `${2 * radius}px`;
      spectator.setInput({ radius });
      // As width and height are set via hostbinding, it is necessary to run a change detection cycle.
      spectator.detectChanges();

      expect(spectator.element).toHaveComputedStyle({
        width: expectedSize,
        height: expectedSize,
      });
    });

    it('should render progress stroke with themeColor when themeColor class is set', () => {
      const themeColor: ThemeColor = 'warning';
      spectator.element.classList.add(themeColor);
      spectator.element.style.transition = 'none';
      spectator.detectChanges();

      expect(spectator.query('circle.progress')).toHaveComputedStyle({
        stroke: getColor(themeColor),
      });
    });

    it('should have default themeColor when themeColor is not set from outside', () => {
      expect(spectator.component.themeColor).toBe('success');
    });

    it('should render background stroke in semi-light', () => {
      expect(spectator.query('circle.circle')).toHaveComputedStyle({
        stroke: getColor('semi-light'),
      });
    });

    it('should render progress stroke with the correct width', () => {
      expect(spectator.query('circle.progress')).toHaveAttribute(
        'stroke-width',
        '' + spectator.component.strokeWidth
      );
    });

    it('should render background stroke with the defined stroke width', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.circle')).toHaveAttribute(
        'stroke-width',
        '' + spectator.component.strokeWidth
      );
    });

    it('should render circle with a radius equivalent to calculated centerRadius', () => {
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveAttribute(
        'r',
        '' + spectator.component._centerRadius
      );
    });
  });
});
