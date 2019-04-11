import {
  Component,
  ComponentFactoryResolver,
  ViewContainerRef,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { ModalConfigHelper } from './helpers/modal-config-helper';
import { ModalNestedComponentHelper } from './helpers/modal-nested-component-helper';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  config: ModalConfig;
  @ViewChild('container') viewContainer: ElementRef;

  constructor(
    private modalController: ModalController,
    private params: NavParams,
    private modalNestedComponentHelper: ModalNestedComponentHelper,
    private componentFactoryResolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
    this.config = ModalConfigHelper.processOptionalValues(this.params.get('config'));
  }

  ngOnInit() {
    this.modalNestedComponentHelper.appendComponent(
      this.viewContainer,
      this.vcRef,
      this.renderer,
      this.componentFactoryResolver,
      this.config.component,
      this.config.uid
    );
  }

  // TODO: better to call the modal-service somehow, circular dependency prevents this atm
  dismissModal(): void {
    this.modalController.dismiss();
  }
}
