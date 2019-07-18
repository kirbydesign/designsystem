import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';

export class ListHelper {
  onLoadOnDemand(component: ListComponent, _event: LoadOnDemandEventData) {
    if (component.isLoadOnDemandEnabled && !component.isLoading) {
      component.isLoading = true;
      component.loadOnDemand.emit({
        complete: (disableLoadOnDamand: boolean) => {
          component.isLoadOnDemandEnabled = !disableLoadOnDamand;
          component.isLoading = false;

          if (component.noMoreItemsText !== undefined && !component.isLoadOnDemandEnabled) {
            component.isLoadOnDemandEnabled = true;
            component.showNoMoreItemsText = true;
          }
        },
      });
    }
  }

  getSelectedItem(items: any[], item: any) {
    return item;
  }
}
