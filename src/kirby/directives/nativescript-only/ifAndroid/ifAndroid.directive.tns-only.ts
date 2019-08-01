import { Directive, ViewContainerRef } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';

@Directive({ selector: '[kirbyIfAndroid]' })
export class IfAndroidDirective {
  constructor(private _viewContainer: ViewContainerRef) {
    this._updateView();
  }

  private _updateView() {
    if (!isAndroid) {
      this._viewContainer.clear();
    }
  }
}
