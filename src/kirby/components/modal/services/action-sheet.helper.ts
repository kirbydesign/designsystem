import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';

@Injectable()
export class ActionSheetHelper {
  constructor(private resolver: ComponentFactoryResolver) {}

  public async showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const factory = this.resolver.resolveComponentFactory(ActionSheetComponent);
    const componentRef = vcRef.createComponent(factory);
    componentRef.instance.config = config;

    const result = new Promise((resolve, _) => {
      registerModal({
        close: () => {
          componentRef.destroy();
          resolve(null);
          return {};
        },
      });

      componentRef.instance.result.subscribe((selection: string) => {
        componentRef.destroy();
        resolve(selection);
      });
    });

    return result;
  }
}
