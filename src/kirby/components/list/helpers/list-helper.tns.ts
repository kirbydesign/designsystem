import { RadListView } from 'nativescript-ui-listview';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';

export class ListHelper {
  onLoadOnDemand(component: ListComponent, args: LoadOnDemandEventData): void {
    const listView: RadListView = args.object;

    if (component.isLoadOnDemandEnabled) {
      component.loadOnDemand.emit({
        complete: (disableLoadOnDemand: boolean) => {
          component.isLoadOnDemandEnabled = !disableLoadOnDemand;
          listView.notifyLoadOnDemandFinished(disableLoadOnDemand);
          args.returnValue = component.isLoadOnDemandEnabled;
        },
      });
    } else {
      listView.notifyLoadOnDemandFinished(true);
      args.returnValue = false;
    }
  }
}
