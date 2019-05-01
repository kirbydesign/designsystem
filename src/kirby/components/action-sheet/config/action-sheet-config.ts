import { ActionSheetOption } from './action-sheet-option';

export interface ActionSheetConfig {
  title?: string;
  message?: string;
  actions?: Array<ActionSheetOption>;
  cancelButtonText?: string;
}
