export interface FabSheetConfig {
  openIconName?: string;
  closeIconName?: string;
  showShadow?: boolean;
  disabled?: boolean;
  actions?: Array<FabSheetOption>;
}

interface FabSheetOption {
  text: string;
  value: any;
}
