import { ActionSheetItem } from './action-sheet-item';

export interface ActionSheetConfig {
  header?: string;
  subheader?: string;
  items: Array<ActionSheetItem>;
  cancelButtonText?: string;
}
