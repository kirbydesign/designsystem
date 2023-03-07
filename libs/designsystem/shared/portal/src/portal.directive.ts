import { CdkPortalOutlet, DomPortal, Portal } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
} from '@angular/core';

/**
 * @summary PortalDirective is a utility that lets you portal the host element into another DOM element.
 * This is designed to be beneficial when there's issues with the stacking context.
 *
 * Extends CdkPortalOutlet to gain functionality for attaching/detaching the host element, and for proper cleanup.
 *
 * Using portal directive to reposition HTML elements, might break angular functionality and/or styling, so use
 * with care.
 */
@Directive({
  selector: '[kirbyPortal]',
  standalone: true,
})
export class PortalDirective extends CdkPortalOutlet {
  private _outlet: HTMLElement | undefined;

  /** The DOM element for which the host element should be appended as a child. */
  @Input() public set outlet(outlet: HTMLElement | undefined) {
    this._outlet = outlet;

    if (this.outlet) {
      this.portal = new DomPortal(this.elementRef);
    }
  }

  public get outlet(): HTMLElement | undefined {
    return this._outlet;
  }

  /**
   * Override portal to handle if user provides a portal of another type than DOMPortal, which CdkPortal would
   * otherwise allow. This can be modified to handle other portal types in the future, should the need arise
   */
  public override set portal(portal: Portal<unknown> | null) {
    const isDOMPortal: boolean = portal instanceof DomPortal;

    if (!isDOMPortal) {
      throw Error(`Portal type ${portal} is not supported`);
    }

    super.portal = portal;
  }

  public constructor(
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  /**
   * Nearly identical to super class, yet we want to use provided outlet instead of directive host as new content
   * parent which is otherwise the default for CdKPortal
   */
  public override attachDomPortal = (portal: DomPortal): void => {
    if (!this.outlet) {
      throw Error('Outlet must be defined!');
    }

    const { element } = portal;

    if (!element.parentNode) {
      throw Error('DOM portal content must be attached to a parent node.');
    }

    // Anchor used to save the element's previous position so
    // that we can restore it when the portal is detached.
    const anchorNode = document.createComment('dom-portal');

    portal.setAttachedHost(this);
    element.parentNode.insertBefore(anchorNode, element);
    this.outlet.appendChild(element);
    this._attachedPortal = portal;

    super.setDisposeFn(() => {
      if (anchorNode.parentNode) {
        anchorNode.parentNode.replaceChild(element, anchorNode);
      }
    });
  };
}
