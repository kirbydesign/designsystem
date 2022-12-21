import { ResizeObserverEntry } from './resize-observer-entry';

export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;
