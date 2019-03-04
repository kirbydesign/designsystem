import {
  Directive,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  OnInit,
  Renderer2,
} from '@angular/core';

import { ComponentConfiguration } from './component-configuration';
import { DynamicComponent } from './dynamic-component';

@Directive({
  selector: '[kirbyLoadComponent]',
})
export class ComponentLoaderDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('kirbyLoadComponent') configuration: ComponentConfiguration;
  @Input() cssClass: string;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadCard();
  }

  loadCard() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.configuration.component
    );
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    if (componentRef && componentRef.location && componentRef.location.nativeElement) {
      this.renderer.addClass(componentRef.location.nativeElement, this.cssClass);
    }
    (<DynamicComponent>componentRef.instance).data = this.configuration.data;
  }
}
