import { ResizeObserver } from './resize-observer';
import { ResizeObserverEntry } from './resize-observer-entry';

export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;
