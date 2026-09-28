import { calculateVerticalPopoverPosition } from './popover.helper';

describe('calculateVerticalPopoverPosition', () => {
  const BODY_PADDING = 12;

  it('should constrain the available max-height to the space below the target when opening downwards', () => {
    const viewportHeight = 800;
    const targetTop = 80;
    const targetBottom = 100;
    const contentHeight = 200;
    const spaceBelowTarget = viewportHeight - targetBottom;

    const { opensUpwards, availableMaxHeightInDirection } = calculateVerticalPopoverPosition({
      viewportHeight,
      targetTop,
      targetBottom,
      contentHeight,
      bodyPadding: BODY_PADDING,
    });

    expect(opensUpwards).toBe(false);
    expect(availableMaxHeightInDirection).toBe(spaceBelowTarget - BODY_PADDING);
  });

  it('should constrain the available max-height to the space above the target when opening upwards', () => {
    const viewportHeight = 800;
    const targetTop = 700;
    const targetNearViewportBottom = 780;
    const contentTooTallToFitBelow = 400;
    const spaceAboveTarget = targetTop;

    const { opensUpwards, availableMaxHeightInDirection } = calculateVerticalPopoverPosition({
      viewportHeight,
      targetTop,
      targetBottom: targetNearViewportBottom,
      contentHeight: contentTooTallToFitBelow,
      bodyPadding: BODY_PADDING,
    });

    expect(opensUpwards).toBe(true);
    expect(availableMaxHeightInDirection).toBe(spaceAboveTarget - BODY_PADDING);
  });

  it('should subtract the body padding from the available space', () => {
    const viewportHeight = 500;
    const targetTop = 80;
    const targetBottom = 100;
    const contentHeight = 50;
    const spaceBelowTarget = viewportHeight - targetBottom;

    const { availableMaxHeightInDirection } = calculateVerticalPopoverPosition({
      viewportHeight,
      targetTop,
      targetBottom,
      contentHeight,
      bodyPadding: BODY_PADDING,
    });

    expect(availableMaxHeightInDirection).toBe(spaceBelowTarget - BODY_PADDING);
  });

  it('should anchor the offset to the space below the target when opening downwards', () => {
    const viewportHeight = 800;
    const targetTop = 80;
    const targetBottom = 100;
    const contentHeight = 200;

    const { offsetFromEdge } = calculateVerticalPopoverPosition({
      viewportHeight,
      targetTop,
      targetBottom,
      contentHeight,
      bodyPadding: BODY_PADDING,
    });

    expect(offsetFromEdge).toBe(targetBottom);
  });

  it('should anchor the offset to the space above the target when opening upwards', () => {
    const viewportHeight = 800;
    const targetTop = 700;
    const targetBottom = 780;
    const contentHeight = 400;

    const { offsetFromEdge } = calculateVerticalPopoverPosition({
      viewportHeight,
      targetTop,
      targetBottom,
      contentHeight,
      bodyPadding: BODY_PADDING,
    });

    expect(offsetFromEdge).toBe(viewportHeight - targetTop);
  });
});
