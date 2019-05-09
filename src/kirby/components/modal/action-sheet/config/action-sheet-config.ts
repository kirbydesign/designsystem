export interface ActionSheetConfig {
  header?: string;
  subheader?: string;
  actions?: Array<string>;
  fabSheet?: FabSheet;
}

export interface FabSheet {
  alignment?: string;
}
