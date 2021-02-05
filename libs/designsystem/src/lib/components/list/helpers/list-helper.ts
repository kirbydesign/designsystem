import { ListComponent } from '../list.component';
import { LoadOnDemandEventData } from '../list.event';

export class ListHelper {
  onLoadOnDemand(component: ListComponent, _event: LoadOnDemandEventData) {
    if (
      !component.disableLoadOnDemand &&
      !component.isLoading &&
      component.hasLoadOnDemandObservers()
    ) {
      component.isLoading = true;
      component.loadOnDemand.emit({
        complete: (disableLoadOnDemand: boolean) => {
          component.disableLoadOnDemand = disableLoadOnDemand;
          component.isLoading = false;
        },
      });
    }
  }

  getSelectedItem(items: any[], item: any) {
    return item;
  }
}
