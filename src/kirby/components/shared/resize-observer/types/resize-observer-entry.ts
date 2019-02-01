export interface ResizeObserverEntry {
  /**
   * @param target The Element whose size has changed.
   */
  new(target: Element);
  /**
   * The Element whose size has changed.
   */
  readonly target: Element;
  /**
   * Element's content rect when ResizeObserverCallback is invoked.
   */
  readonly contentRect: DOMRectReadOnly;
}
