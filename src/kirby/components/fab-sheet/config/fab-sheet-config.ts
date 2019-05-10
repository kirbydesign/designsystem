import { ActionSheetConfig } from '~/kirby/components/modal/action-sheet/config/action-sheet-config';

export interface FabSheetConfig {
  disabled?: boolean;
  horizontalAlignment?: string;
  actionSheetConfig: ActionSheetConfig;
}
