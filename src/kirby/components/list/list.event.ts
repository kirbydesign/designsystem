export interface LoadOnDemandEvent {
  complete: (disableLoadOnDemand?: boolean) => void;
}

export interface LoadOnDemandEventData {
  object: any;
  returnValue: any;
}
