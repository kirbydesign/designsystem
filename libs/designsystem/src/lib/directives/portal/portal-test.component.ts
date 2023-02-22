import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { PortalDirective } from './portal.directive';

/** For usage in portal.directive.spec.ts */
@Component({
  selector: 'kirby-portal-test',
  templateUrl: './portal-test.component.html',
  imports: [PortalDirective],
  standalone: true,
})
export class PortalTestComponent {
  @ViewChild('outletElement') public outletElement: ElementRef;
  @ViewChild(PortalDirective) public portalDirective: PortalDirective;
  @ViewChild('hostElement') public hostElement: ElementRef;
  @ViewChild('templateRef', { read: TemplateRef }) public templateRef: TemplateRef<unknown>;

  constructor() {}
}
