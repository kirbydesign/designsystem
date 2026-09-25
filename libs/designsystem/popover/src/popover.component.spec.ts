import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let spectator: Spectator<PopoverComponent>;
  const createComponent = createComponentFactory({
    component: PopoverComponent,
  });

  const POPOVER_BODY_PADDING = 12;

  beforeEach(() => {
    spectator = createComponent();
  });

  const getAvailableMaxHeight = (): string =>
    spectator.component.wrapperElement.nativeElement.style.getPropertyValue(
      '--kirby-popover-available-max-height'
    );

  const positionVerticallyWith = (dimensions: {
    viewportHeight: number;
    targetTop: number;
    targetBottom: number;
    contentHeight: number;
  }): void =>
    spectator.component['positionVertically'](
      { innerHeight: dimensions.viewportHeight } as Window,
      spectator.component.wrapperElement.nativeElement,
      { top: dimensions.targetTop, bottom: dimensions.targetBottom } as DOMRect,
      { height: dimensions.contentHeight } as DOMRect
    );

  describe('available height calculation', () => {
    it('should constrain the available max-height to the space below the target when opening downwards', () => {
      const viewportHeight = 800;
      const targetBottom = 100;
      const spaceBelowTarget = viewportHeight - targetBottom;

      positionVerticallyWith({
        viewportHeight,
        targetTop: 80,
        targetBottom,
        contentHeight: 200,
      });

      expect(getAvailableMaxHeight()).toBe(`${spaceBelowTarget - POPOVER_BODY_PADDING}px`);
    });

    it('should constrain the available max-height to the space above the target when opening upwards', () => {
      const viewportHeight = 800;
      const targetTop = 700;
      const targetNearViewportBottom = 780;
      const contentTooTallToFitBelow = 400;
      const spaceAboveTarget = targetTop;
      spectator.component.target = document.createElement('button');

      positionVerticallyWith({
        viewportHeight,
        targetTop,
        targetBottom: targetNearViewportBottom,
        contentHeight: contentTooTallToFitBelow,
      });

      expect(getAvailableMaxHeight()).toBe(`${spaceAboveTarget - POPOVER_BODY_PADDING}px`);
    });

    it('should subtract the body padding from the available space', () => {
      const viewportHeight = 500;
      const targetBottom = 100;
      const spaceBelowTarget = viewportHeight - targetBottom;

      positionVerticallyWith({
        viewportHeight,
        targetTop: 80,
        targetBottom,
        contentHeight: 50,
      });

      expect(getAvailableMaxHeight()).toBe(`${spaceBelowTarget - POPOVER_BODY_PADDING}px`);
    });
  });
});
