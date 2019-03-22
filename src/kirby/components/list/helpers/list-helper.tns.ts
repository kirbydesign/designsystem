import { RadListView } from 'nativescript-ui-listview';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';

export class ListHelper {
  onLoadOnDemand(component: ListComponent, event: LoadOnDemandEventData) {
    const listView: RadListView = event.object;

    if (listView) {
      if (component.isLoadOnDemandEnabled) {
        component.loadOnDemand.emit({
          complete: (disableLoadOnDemand: boolean) => {
            component.isLoadOnDemandEnabled = !disableLoadOnDemand;
            listView.notifyLoadOnDemandFinished(disableLoadOnDemand);
            event.returnValue = component.isLoadOnDemandEnabled;
          },
        });
      } else {
        listView.notifyLoadOnDemandFinished(true);
        event.returnValue = false;
      }
    }
  }
}
