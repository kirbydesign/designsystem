import { Directive, ViewContainerRef } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';

@Directive({ selector: '[ifAndroid]' })
export class IfAndroid {
  constructor(private _viewContainer: ViewContainerRef) {
    this._updateView();
  }

  private _updateView() {
    if (!isAndroid) {
      this._viewContainer.clear();
    }
  }
}
