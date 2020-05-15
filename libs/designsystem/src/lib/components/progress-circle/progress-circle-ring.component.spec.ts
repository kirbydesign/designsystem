import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProgressCircleRingComponent } from './progress-circle-ring.component';

describe('ProgressCircleRingComponent', () => {
  let spectator: Spectator<ProgressCircleRingComponent>;

  const createHost = createComponentFactory({
    component: ProgressCircleRingComponent,
    declarations: [],
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
    it('computed size should equal diameter', () => {});

    it('should render progress stroke with themeColor', () => {});

    it('should render stroke with the correct width', () => {});

    it('should render circle with a radius equivalent to centerRadius', () => {});
  });
});
