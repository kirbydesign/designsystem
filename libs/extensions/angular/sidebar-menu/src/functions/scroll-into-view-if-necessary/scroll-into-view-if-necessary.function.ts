/**
 * the HTMLElement.scrollIntoViewIfNecessary is non-standard and not supported in all browsers (e.g. firefox),
 * so we implement a version based on standard
 */
export function scrollIntoViewIfNecessary(
  scrollContainer: HTMLElement,
  child: HTMLElement,
  position: ScrollLogicalPosition = 'center'
) {
  const containerRect = scrollContainer.getBoundingClientRect();
  const elementRect = child.getBoundingClientRect();
  if (containerRect.top > elementRect.top || containerRect.bottom < elementRect.bottom) {
    child.scrollIntoView({
      behavior: 'instant',
      block: position,
      inline: position,
    });
  }
}
