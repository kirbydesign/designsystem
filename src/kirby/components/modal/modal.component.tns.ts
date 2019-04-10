import { Color } from 'tns-core-modules/color';
import {
  Component,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData } from 'tns-core-modules/ui/content-view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { ModalStack } from 'nativescript-windowed-modal';

import { ModalConfig } from './config/modal-config';
import { ModalCloserService } from './services/modal-closer-service';
import { EmbeddedModalComponent } from './embedded-modal.component';
import { ModalConfigHelper } from './helpers/modal-config-helper';

const style: any = require('sass-extract-loader!./modal.component.scss');

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends ContentView implements OnInit {
  @ViewChild('container') viewContainer: ElementRef;
  config: ModalConfig;
  modalStack: ModalStack;
  uid: number;

  constructor(
    private modalCloserService: ModalCloserService,
    private params: ModalDialogParams,
    private componentFactoryResolver: ComponentFactoryResolver,
    public vcRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
    super();
    this.config = ModalConfigHelper.processOptionalValues(params.context);
    this.uid = params.context.uid;
    this.modalCloserService.registerModalCloseRef(this.uid, params.closeCallback);
  }

  ngOnInit() {
    this.appendComponent();
  }

  appendComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.component
    );
    const componentRef = this.vcRef.createComponent(componentFactory);
    (<EmbeddedModalComponent>componentRef.instance).uid = this.config.uid;
    this.renderer.appendChild(
      this.viewContainer.nativeElement,
      componentRef.location.nativeElement
    );
  }

  showModally(args: ShownModallyData): void {
    this.modalStack = <ModalStack>args.object;
    const stackLayout = <StackLayout>args.object;
    stackLayout.backgroundColor = new Color(0, 0, 0, 0);
    this.animateModal(stackLayout);
  }

  // TODO: better to call the modal-service somehow, circular dependency prevents this atm
  dismissModal(): void {
    this.params.closeCallback();
  }

  // TODO: fix animations
  // private animateBackgroundColor(stackLayout: StackLayout): void {
  //   const shadowColor = this.getThemeColor('kirby-grey-7');
  //   stackLayout.backgroundColor = new Color(
  //     this.getAlphaIn255Range(this.config.dim),
  //     shadowColor.r,
  //     shadowColor.g,
  //     shadowColor.b
  //   );
  //   stackLayout.color = new Color(this.getThemeColor('kirby-brand-5').hex);
  // }

  private animateModal(stackLayout: StackLayout): void {
    if (stackLayout.android) {
      stackLayout
        .animate({
          translate: { x: 0, y: Number(stackLayout.height) },
          duration: 0,
        })
        .then(() => {
          stackLayout.animate({
            translate: { x: 0, y: 0 },
            duration: 300,
          });
        });
    }
    // this is a default behaviour in iOS
  }

  // TODO: move these common functions in a utility class
  private getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value;
  }

  private getAlphaIn255Range(alpha: number): number {
    const defaultAlpha = 0.9;
    if (!alpha) {
      return defaultAlpha * 25500;
    }
    if (alpha <= 0) {
      return 255;
    } else if (alpha >= 1) {
      return 0;
    } else {
      return alpha * 25500;
    }
  }
}
