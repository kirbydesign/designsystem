import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let spectator: Spectator<PopoverComponent>;
  const createComponent = createComponentFactory({
    component: PopoverComponent,
  });

  // Mirrors the private POPOVER_BODY_PADDING in PopoverComponent
  const padding = 12;

  beforeEach(() => {
    spectator = createComponent();
  });

  const getMaxHeight = (): string =>
    spectator.component.wrapperElement.nativeElement.style.getPropertyValue(
      '--available-max-height'
    );

  const positionVertically = (
    viewPort: Partial<Window>,
    targetDimensions: Partial<DOMRect>,
    wrapperDimensions: Partial<DOMRect>
  ): void =>
    spectator.component['positionVertically'](
      viewPort as Window,
      spectator.component.wrapperElement.nativeElement,
      targetDimensions as DOMRect,
      wrapperDimensions as DOMRect
    );

  describe('available height calculation', () => {
    it('should constrain --available-max-height to the space below the target when opening downwards', () => {
      // availableSpaceDown = innerHeight - target.bottom = 800 - 100 = 700
      positionVertically({ innerHeight: 800 }, { top: 80, bottom: 100 }, { height: 200 });

      expect(getMaxHeight()).toBe(`${700 - padding}px`);
    });

    it('should constrain --available-max-height to the space above the target when opening upwards', () => {
      // Target sits low in the viewport with little room below, so it opens upwards.
      // targetElement is accessed when opening upwards, so provide one.
      spectator.component.target = document.createElement('button');

      // availableSpaceUp = target.top = 700
      positionVertically({ innerHeight: 800 }, { top: 700, bottom: 780 }, { height: 400 });

      expect(getMaxHeight()).toBe(`${700 - padding}px`);
    });

    it('should subtract the body padding from the available space', () => {
      // availableSpaceDown = 500 - 100 = 400
      positionVertically({ innerHeight: 500 }, { top: 80, bottom: 100 }, { height: 50 });

      expect(getMaxHeight()).toBe(`${400 - padding}px`);
    });
  });
});
