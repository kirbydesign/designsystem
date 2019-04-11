import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  Renderer2,
  ElementRef,
  Type,
  Injector,
} from '@angular/core';

import { ModalUidProvider } from '../modal-uid-provider';

@Injectable()
export class ModalNestedComponentHelper {
  public appendComponent(
    viewContainer: ElementRef,
    vcRef: ViewContainerRef,
    renderer: Renderer2,
    componentFactoryResolver: ComponentFactoryResolver,
    component: Type<{}>,
    modalUid: number
  ): void {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = vcRef.createComponent(
      componentFactory,
      null,
      Injector.create({
        providers: [{ provide: ModalUidProvider, useValue: { uid: modalUid } }],
      })
    );
    componentRef.injector;
    renderer.appendChild(viewContainer.nativeElement, componentRef.location.nativeElement);
  }
}
