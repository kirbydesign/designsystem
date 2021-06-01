// These types were copied from the vscroll package internals (vscroll/dist/typings/interfaces/settings.d.ts)

export interface VirtualScrollerSettings<T = unknown> {
  adapter?: boolean;
  startIndex?: number;
  minIndex?: number;
  maxIndex?: number;
  itemSize?: number;
  bufferSize?: number;
  padding?: number;
  infinite?: boolean;
  horizontal?: boolean;
  windowViewport?: boolean;
  viewportElement?: HTMLElement | (() => void) | null;
  inverse?: boolean;
  onBeforeClip?: ItemsProcessor<T> | null;
}

export declare type ItemsProcessor<T = unknown> = (items: ItemAdapter<T>[]) => void;

export interface ItemAdapter<Data = unknown> {
  $index: number;
  data: Data;
  element?: HTMLElement;
}
