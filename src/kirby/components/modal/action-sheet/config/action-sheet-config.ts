import { ActionSheetItem } from './action-sheet-item';

export interface ActionSheetConfig {
  header?: string;
  subheader?: string;
  position?: any;
  items: Array<ActionSheetItem>;
}
