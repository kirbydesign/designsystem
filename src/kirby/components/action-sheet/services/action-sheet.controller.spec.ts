import { ActionSheetController } from './action-sheet.controller';
import { ActionSheetHelper } from './action-sheet.helper';

fdescribe('ActionSheetController', () => {
  let actionSheetController: ActionSheetController;

  beforeEach(() => {
    actionSheetController = new ActionSheetController(new ActionSheetHelper());
  });
});
