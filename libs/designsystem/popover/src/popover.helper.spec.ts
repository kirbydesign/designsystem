import { calculateVerticalPosition } from './popover.helper';

describe('calculateVerticalPosition', () => {
  const BODY_PADDING = 12;

  it('should constrain the available max-height to the space below the target when opening downwards', () => {
    const viewportHeight = 800;
    const targetBottom = 100;
    const spaceBelowTarget = viewportHeight - targetBottom;

    const { opensUpwards, availableMaxHeight } = calculateVerticalPosition({
      viewportHeight,
      targetTop: 80,
      targetBottom,
      contentHeight: 200,
      bodyPadding: BODY_PADDING,
    });

    expect(opensUpwards).toBe(false);
    expect(availableMaxHeight).toBe(spaceBelowTarget - BODY_PADDING);
  });

  it('should constrain the available max-height to the space above the target when opening upwards', () => {
    const targetTop = 700;
    const targetNearViewportBottom = 780;
    const contentTooTallToFitBelow = 400;
    const spaceAboveTarget = targetTop;

    const { opensUpwards, availableMaxHeight } = calculateVerticalPosition({
      viewportHeight: 800,
      targetTop,
      targetBottom: targetNearViewportBottom,
      contentHeight: contentTooTallToFitBelow,
      bodyPadding: BODY_PADDING,
    });

    expect(opensUpwards).toBe(true);
    expect(availableMaxHeight).toBe(spaceAboveTarget - BODY_PADDING);
  });

  it('should subtract the body padding from the available space', () => {
    const viewportHeight = 500;
    const targetBottom = 100;
    const spaceBelowTarget = viewportHeight - targetBottom;

    const { availableMaxHeight } = calculateVerticalPosition({
      viewportHeight,
      targetTop: 80,
      targetBottom,
      contentHeight: 50,
      bodyPadding: BODY_PADDING,
    });

    expect(availableMaxHeight).toBe(spaceBelowTarget - BODY_PADDING);
  });

  it('should anchor the offset to the space below the target when opening downwards', () => {
    const targetBottom = 100;

    const { offset } = calculateVerticalPosition({
      viewportHeight: 800,
      targetTop: 80,
      targetBottom,
      contentHeight: 200,
      bodyPadding: BODY_PADDING,
    });

    expect(offset).toBe(targetBottom);
  });

  it('should anchor the offset to the space above the target when opening upwards', () => {
    const viewportHeight = 800;
    const targetTop = 700;

    const { offset } = calculateVerticalPosition({
      viewportHeight,
      targetTop,
      targetBottom: 780,
      contentHeight: 400,
      bodyPadding: BODY_PADDING,
    });

    expect(offset).toBe(viewportHeight - targetTop);
  });
});
