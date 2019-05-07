export interface FabSheetConfig {
  openIconName?: string;
  closeIconName?: string;
  disabled?: boolean;
  actions?: Array<FabSheetOption>;
}

interface FabSheetOption {
  text: string;
  value: any;
}
