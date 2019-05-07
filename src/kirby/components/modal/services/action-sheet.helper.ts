import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';

import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';

@Injectable()
export class ActionSheetHelper {
  componentRef: ComponentRef<ActionSheetComponent>;
  constructor(private resolver: ComponentFactoryResolver) {}

  public async showActionSheet(config: ActionSheetConfig, vcRef: ViewContainerRef): Promise<any> {
    const factory = this.resolver.resolveComponentFactory(ActionSheetComponent);
    this.componentRef = vcRef.createComponent(factory);
    this.componentRef.instance.config = config;
  }

  // public hideActionSheet() {
  //   this.componentRef.destroy();
  // }
}
