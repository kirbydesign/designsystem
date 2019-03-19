export interface LoadOnDemandEvent {
  complete: (disableLoadOnDemand?: boolean) => void;
}
