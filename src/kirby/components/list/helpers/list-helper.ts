import { IonList } from '@ionic/angular';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';

declare var require: any;
const style: any = require('sass-extract-loader!../list.component.scss');

export class ListHelper {
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

  setList(list: IonList) {
    this.list = list;
  }

  getIsSlidingDisabled(width: number): boolean {
    const large = style.global['$breakpoints'].value['large'].value;
    const disabled = width >= large;

    if (disabled) {
      this.closeActionItems();
    }
    return disabled;
  }

  closeActionItems() {
    if (this.list) {
      this.list.closeSlidingItems();
    }
  }

  renderShadow(_: any): void {
    // only native implementation
    return;
  }
}
