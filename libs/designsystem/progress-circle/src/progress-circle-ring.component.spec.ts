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
    spectator = createHost({ props: { strokeWidth: 4 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.value).toBe(0);
  });

  describe('radius', () => {
    it('should inset the relative radius by half the stroke width', () => {
      spectator.setInput({ strokeWidth: 4 });
      expect(spectator.component._radius).toBe('calc(50% - 2px)');
    });
  });

  describe('progress within upperBound', () => {
    it('should return the value as progress percentage', () => {
      spectator.setInput({ value: 33, upperBound: 96 });
      expect(spectator.component._progress).toBe(33);
    });

    it('should return the remaining percentage (100 - progress) as remainder', () => {
      spectator.setInput({ value: 33, upperBound: 96 });
      expect(spectator.component._remainder).toBe(67);
    });
  });

  describe('progress larger than upperBound', () => {
    it('should clamp progress to the upperBound percentage', () => {
      spectator.setInput({ value: 99, upperBound: 96 });
      expect(spectator.component._progress).toBe(96);
    });

    it('should return the remaining percentage (100 - upperBound) as remainder', () => {
      spectator.setInput({ value: 99, upperBound: 96 });
      expect(spectator.component._remainder).toBe(4);
    });
  });

  describe('progressStrokeWidth', () => {
    it('should render no stroke when progress is 0', () => {
      spectator.setInput({ value: 0, upperBound: 96 });
      expect(spectator.component._progressStrokeWidth).toBe(0);
    });

    it('should render the stroke width when progress is greater than 0', () => {
      spectator.setInput({ value: 50, upperBound: 96 });
      expect(spectator.component._progressStrokeWidth).toBe(spectator.component.strokeWidth);
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      spectator.setInput({
        value: 50,
      });
    });

    it('should normalize the progress path length to 100', () => {
      expect(spectator.query('circle.progress')).toHaveAttribute('pathLength', '100');
    });

    it('should render the progress stroke-dasharray as [progress, remainder] percentages', () => {
      spectator.setInput({ value: 33, upperBound: 96 });
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveAttribute('stroke-dasharray', '33,67');
    });

    it('should render progress stroke with themeColor when themeColor class is set', () => {
      const themeColor: ThemeColor = 'warning';
      spectator.element.classList.add(themeColor);
      spectator.element.style.transition = 'none';
      spectator.detectChanges();

      expect(spectator.query('circle.progress')).toHaveComputedStyle({
        stroke: getColor('warning', 'shade'),
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
  });
});
