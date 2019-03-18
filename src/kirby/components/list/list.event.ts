export interface KirbyLoadMoreEvent {
  complete: (hasMoreToLoad?: boolean) => void;
}
