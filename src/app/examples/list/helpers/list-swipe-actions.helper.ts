import { ListSwipeAction } from '@kirbydesign/designsystem/components/list/helpers/list-swipe-action';

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
      swipeActionFlag: 'archived',
      position: 'left',
      title: 'Archive',
      altTitle: 'Unarchive',
      iconName: 'verify',
      themeColor: 'warning',
      onSelected: this.onArchiveItem,
    });
    this.swipeActions.push({
      swipeActionFlag: 'flagged',
      position: 'left',
      title: 'Flag',
      iconName: 'attach',
      altIconName: 'moneybag',
      themeColor: 'success',
      onSelected: this.onFlagItem,
    });
    this.swipeActions.push({
      swipeActionFlag: 'deleted',
      position: 'right',
      title: 'Delete',
      iconName: 'trash',
      themeColor: 'danger',
      onSelected: this.onDeleteItem,
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
