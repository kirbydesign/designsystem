import { ListSwipeAction } from '@kirbydesign/designsystem/components/list/list-swipe-actions/list-swipe-action';

export class ListSwipeActionsHelper {
  private static instance: ListSwipeActionsHelper;
  private swipeActionsLeft: ListSwipeAction[] = [];
  private swipeActionsRight: ListSwipeAction[] = [];

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
    return {
      left: this.swipeActionsLeft,
      right: this.swipeActionsRight,
    };
  }

  private setUpSwipeActions() {
    this.swipeActionsLeft.push({
      swipeActionFlag: 'archived',
      title: 'Archive',
      altTitle: 'Unarchive',
      iconName: 'verifiy',
      themeColor: 'warning',
      onSelected: this.onArchiveItem,
    });
    this.swipeActionsLeft.push({
      swipeActionFlag: 'flagged',
      title: 'Flag',
      iconName: 'attach',
      altIconName: 'moneybag',
      themeColor: 'success',
      onSelected: this.onFlagItem,
    });
    this.swipeActionsRight.push({
      swipeActionFlag: 'deleted',
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
