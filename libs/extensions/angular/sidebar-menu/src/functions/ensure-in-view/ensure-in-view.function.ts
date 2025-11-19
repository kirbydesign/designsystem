import { scrollIntoViewIfNecessary } from '../scroll-into-view-if-necessary';

/**
 * Ensures the element top is not smaller than the scroll container top.
 */
export function ensureInView(scrollContainer: Element, element: Element, durationMs: number): void {
  let startTime: number | null = null;

  const updatePosition = (timestamp: number) => {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsedTime = timestamp - startTime;

    if (elapsedTime < durationMs) {
      scrollIntoViewIfNecessary(scrollContainer, element, 'start');
      requestAnimationFrame(updatePosition);
    }
  };

  requestAnimationFrame(updatePosition);
}
