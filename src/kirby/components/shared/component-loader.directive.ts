import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ComponentConfiguration } from './component-configuration';
import { DynamicComponent } from './dynamic-component';

@Directive({
  selector: '[kirbyLoadComponent]',
})
export class ComponentLoaderDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('kirbyLoadComponent') configuration: ComponentConfiguration;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.loadCard();
  }

  loadCard() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.configuration.component);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    (<DynamicComponent>componentRef.instance).data = this.configuration.data;
  }
}
