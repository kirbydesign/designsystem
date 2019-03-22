export interface LoadOnDemandEvent {
  complete: (disableLoadOnDemand?: boolean) => void;
}

/**
 * This is a wrapper for {N} RadListView LoadOnDemandListViewEventData (https://docs.nativescript.org/ns-ui-api-reference/classes/loadondemandlistvieweventdata)
 */
export interface LoadOnDemandEventData {
  object: any;
  returnValue: any;
}
