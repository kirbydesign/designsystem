import { IonList, IonItemSliding } from '@ionic/angular';
import { Subject } from 'rxjs';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';
import { SelectedItemWithOption, ItemOption } from '../list-item-option/list-item-option';

declare var require: any;
const style: any = require('sass-extract-loader!../list.component.scss');

export class ListHelper {
  private selectedItemWithOption = new Subject<SelectedItemWithOption>();
  private slidingDisabled = new Subject<boolean>();
  public selectedItemWithOption$ = this.selectedItemWithOption.asObservable();
  public slidingDisabled$ = this.slidingDisabled.asObservable();
  private list: IonList;

  onLoadOnDemand(component: ListComponent, _event: LoadOnDemandEventData) {
    if (component.isLoadOnDemandEnabled && !component.isLoading) {
      component.isLoading = true;
      component.loadOnDemand.emit({
        complete: (disableLoadOnDamand: boolean) => {
          component.isLoadOnDemandEnabled = !disableLoadOnDamand;
          component.isLoading = false;
        },
      });
    }
  }

  getSelectedItem(items: any[], item: any) {
    return item;
  }

  setSelectedItemWithOption(item: any) {
    this.selectedItemWithOption.next(item);
  }

  setList(list: IonList) {
    this.list = list;
  }

  resizeList() {
    this.onResize(window.innerWidth);
  }

  closeSlidingItems() {
    if (this.list) {
      this.list.closeSlidingItems();
    }
  }

  async listItemSwipe(slidingItem: IonItemSliding, item: any): Promise<SelectedItemWithOption> {
    return new Promise<SelectedItemWithOption>((resolve) => {
      slidingItem.getSlidingRatio().then((percent) => {
        let option: ItemOption = undefined;

        if (item.slidingOptions.start && percent < 0) {
          option = item.slidingOptions.start[0];
        }

        if (item.slidingOptions.end && percent > 0) {
          option = item.slidingOptions.end[item.slidingOptions.end.length - 1];
        }

        const selectedItemWithOption: SelectedItemWithOption = {
          item: item,
          option: option,
        };
        resolve(selectedItemWithOption);
      });
    });
  }

  onResize(width: number) {
    const large = style.global['$breakpoints'].value['large'].value;
    const disabled = width >= large;

    if (disabled) {
      this.closeSlidingItems();
    }
    this.slidingDisabled.next(disabled);
  }

  renderShadow(_: any): void {
    // only native implementation
    return;
  }
}
