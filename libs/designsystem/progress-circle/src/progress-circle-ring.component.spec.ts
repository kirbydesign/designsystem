import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProgressCircleRingComponent } from './progress-circle-ring.component';

describe('ProgressCircleRingComponent', () => {
  let spectator: Spectator<ProgressCircleRingComponent>;

  const createHost = createComponentFactory({
    component: ProgressCircleRingComponent,
  });

  beforeEach(() => {
    spectator = createHost();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.value).toBe(0);
  });

  describe('progress within upperBound', () => {
    it('should return the value as progress percentage', () => {
      spectator.setInput({ value: 33 });
      expect(spectator.component._progress).toBe(33);
    });

    it('should return the remaining percentage (100 - progress) as remainder', () => {
      spectator.setInput({ value: 33 });
      expect(spectator.component._remainder).toBe(67);
    });
  });

  describe('progress larger than upperBound', () => {
    it('should clamp progress to leave a gap from 100', () => {
      spectator.setInput({ value: 99 });
      expect(spectator.component._progress).toBe(97.5);
    });

    it('should return the remaining percentage as the gap', () => {
      spectator.setInput({ value: 99 });
      expect(spectator.component._remainder).toBe(2.5);
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      spectator.setInput({ value: 50 });
    });

    it('should normalize the progress path length to 100', () => {
      expect(spectator.query('circle.progress')).toHaveAttribute('pathLength', '100');
    });

    it('should render the progress stroke-dasharray as [progress, remainder] percentages', () => {
      spectator.setInput({ value: 33 });
      spectator.detectChanges();
      expect(spectator.query('circle.progress')).toHaveAttribute('stroke-dasharray', '33 67');
    });

    it('should have default themeColor when themeColor is not set from outside', () => {
      expect(spectator.component.themeColor).toBe('success');
    });
  });
});
