import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProgressCircleComponent } from './progress-circle.component';

describe('ProgressCircleComponent', () => {
  let spectator: Spectator<ProgressCircleComponent>;

  const createHost = createComponentFactory({
    component: ProgressCircleComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({ props: { value: 30 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('radius', () => {
    it('should translate sm to 20px', () => {});
    it('should translate md to 28px', () => {});
    it('should translate lg to 48px', () => {});
  });

  describe('shownValue', () => {
    it('should return 0 until element has been visible', () => {});
    it('should return value after element has been visible', () => {});
  });
  describe('diameter', () => {
    it('should calculate diameter as 2*radius', () => {});
  });
  describe('ngAfterViewInit', () => {
    it('should set up an intersection observer on element and viewport after view init', () => {});
  });

  describe('onElementVisible', () => {
    it('should mark element as visible if element is intersecting when observer is called', () => {});
    it('should not mark element as visible if elements are not intersecting when observer is called (on init)', () => {});
    it('should not mark element as visible if elements are not present when called', () => {});
    it('should mark component for change detection when visible to start animation', () => {});
  });
});
