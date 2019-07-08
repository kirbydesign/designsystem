import { RadListView, ListViewEventData } from 'nativescript-ui-listview';
import { isIOS } from 'tns-core-modules/platform';
import { View, EventData } from 'tns-core-modules/ui/page/page';

import { LoadOnDemandEventData } from '../list.event';
import { ListComponent } from './../list.component';
import { ScssHelper } from '../../../scss/scss-helper';

declare const CGSizeMake: any;

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

  getSelectedItem(items: any[], args: ListViewEventData) {
    let selectedItem: any;
    if (args.index >= 0) {
      selectedItem = items[args.index];
    }
    return selectedItem;
  }

  renderShadow(args: EventData): void {
    // android shadow is handled by the android-elevation css property
    if (isIOS) {
      const elevation = 2;
      const iosView = (<View>args.object).ios;
      iosView.layer.masksToBounds = true; // prevents scrolling bugs
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      // the numbers below are used to align the appearances of android elevations and iOS shadows
      // source: https://github.com/Especializa/nativescript-ng-shadow/blob/master/src/common/shadow.ts
      iosView.layer.shadowOffset = CGSizeMake(0, 0.54 * elevation - 0.14);
      iosView.layer.shadowOpacity = 0.006 * elevation + 0.25;
    }
  }
}
