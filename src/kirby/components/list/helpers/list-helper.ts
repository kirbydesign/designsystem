import { Subject } from 'rxjs';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';
import { SelectedItemWithOption } from '../list-item-option/list-item-option';

export class ListHelper {
  private selectedItemWithOption = new Subject<SelectedItemWithOption>();
  public selectedItemWithOption$ = this.selectedItemWithOption.asObservable();

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

  renderShadow(_: any): void {
    // only native implementation
    return;
  }
}
