import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { GridCardDirective } from '../grid-card.directive';
import { GridCardConfiguration } from '../grid-card-configuration';

@Component({
  selector: 'kirby-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss']
})
export class CardWrapperComponent implements OnInit {
  @Input() cardConfig: GridCardConfiguration;
  @ViewChild(GridCardDirective) cardHost: GridCardDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadCard();
  }

  loadCard() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.cardConfig.component);
    const viewContainerRef = this.cardHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

}
