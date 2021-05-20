import { ResizeObserverCallback } from './resize-observer-callback';

export interface ResizeObserver {
  new (callback: ResizeObserverCallback);
  /**
   * Adds target to the list of observed elements.
   */
  observe: (target: Element) => void;
  /**
   * Removes target from the list of observed elements.
   */
  unobserve: (target: Element) => void;
  /**
   * Clears both the observationTargets and activeTargets lists.
   */
  disconnect: () => void;
}
