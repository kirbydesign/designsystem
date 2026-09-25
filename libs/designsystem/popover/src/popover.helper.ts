export interface VerticalPositionInput {
  viewportHeight: number;
  targetTop: number;
  targetBottom: number;
  contentHeight: number;
  bodyPadding: number;
}

export interface VerticalPosition {
  opensUpwards: boolean;
  offset: number;
  /** Max height for the content in the chosen direction without leaving the viewport. */
  availableMaxHeight: number;
}

export function calculateVerticalPosition({
  viewportHeight,
  targetTop,
  targetBottom,
  contentHeight,
  bodyPadding,
}: VerticalPositionInput): VerticalPosition {
  const availableSpaceBelow = viewportHeight - targetBottom;
  const availableSpaceAbove = targetTop;
  const contentFitsBelow = availableSpaceBelow >= contentHeight + bodyPadding;
  const opensUpwards = !contentFitsBelow && availableSpaceBelow < availableSpaceAbove;

  const availableSpace = opensUpwards ? availableSpaceAbove : availableSpaceBelow;
  const offset = opensUpwards ? viewportHeight - targetTop : targetBottom;

  return {
    opensUpwards,
    offset,
    availableMaxHeight: availableSpace - bodyPadding,
  };
}
