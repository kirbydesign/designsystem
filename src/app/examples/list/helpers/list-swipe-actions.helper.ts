import { ListSwipeAction } from '@kirbydesign/designsystem/components/list/list-swipe-action';

export class ListSwipeActionsHelper {
  private static instance: ListSwipeActionsHelper;
  private swipeActions: ListSwipeAction[] = [];

  private constructor() {
    this.setUpSwipeActions();
  }

  public static getInstance(): ListSwipeActionsHelper {
    if (!ListSwipeActionsHelper.instance) {
      ListSwipeActionsHelper.instance = new ListSwipeActionsHelper();
    }
    return ListSwipeActionsHelper.instance;
  }

  public getSwipeActions() {
    return this.swipeActions;
  }

  private setUpSwipeActions() {
    this.swipeActions.push({
      position: 'left',
      title: 'Archive',
      themeColor: 'warning',
      onSelected: this.onArchiveItem,
      isDisabled: (item) => item.archived || item.id === 3,
    });
    this.swipeActions.push({
      position: 'left',
      title: 'Flag',
      iconName: (item) => (item.flagged ? null : 'attach'),
      themeColor: 'success',
      onSelected: this.onFlagItem,
      isDisabled: (item) => item.id === 3,
    });
    this.swipeActions.push({
      position: 'right',
      title: (item) => (item.deleted ? 'UnDelete' : 'Delete'),
      iconName: 'trash',
      themeColor: (item) => (item.deleted ? 'warning' : 'danger'),
      onSelected: this.onDeleteItem,
      isDisabled: (item) => item.id === 3,
    });
  }

  private onArchiveItem(item: any): void {
    console.log(`onArchiveItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.archived = !item.archived;
  }

  private onFlagItem(item: any): void {
    console.log(`onFlagItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.flagged = !item.flagged;
  }

  private onDeleteItem(item: any): void {
    console.log(`onDeleteItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.deleted = !item.deleted;
  }
}
