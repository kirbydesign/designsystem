import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { DesignTokenHelper } from '../../helpers';

export enum HorizontalDirection {
  right = 'right',
  left = 'left',
}
@Component({
  selector: 'kirby-popover',
  template: `
    <div #wrapper class="wrapper"><ng-content></ng-content></div>
  `,
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('wrapper', { static: true, read: ElementRef })
  wrapperElement: ElementRef<HTMLDivElement>;

  @Input()
  target: HTMLElement | ElementRef<HTMLElement>;

  @Output()
  willHide = new EventEmitter<void>();

  private targetElement: HTMLElement;

  private isShowing = false;

  @Input()
  popout: HorizontalDirection = HorizontalDirection.right;

  @HostListener('click')
  _backdropClick() {
    this.willHide.emit();
    this.hide();
  }

  @HostListener('window:resize')
  _onWindowResize() {
    if (this.isShowing) {
      this.willHide.emit();
      this.hide();
    }
  }

  private document: Document;

  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.document = elementRef.nativeElement.ownerDocument;
  }

  private zIndex = parseInt(DesignTokenHelper.zLayer('popover'));

  ngAfterViewInit(): void {
    const ionModal = this.elementRef.nativeElement.closest('ion-modal');
    if (ionModal) {
      this.zIndex = parseInt(ionModal.style.zIndex) + 1;
      this.elementRef.nativeElement.style.zIndex = `${this.zIndex}`;
    }
    this.renderer.removeChild(
      this.elementRef.nativeElement.parentElement,
      this.elementRef.nativeElement
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.target.currentValue) {
      this.targetElement =
        this.target instanceof ElementRef ? this.target.nativeElement : this.target;
    }
  }

  ngOnDestroy(): void {
    this.hide();
  }

  // document.removeEventListener needs the exact same event handler & options reference:
  private readonly preventScrollEventListenerOptions = {
    passive: false,
  } as EventListenerOptions;

  // document.removeEventListener needs the exact same event handler & options reference:
  private preventEvent(event: TouchEvent) {
    event.preventDefault();
  }

  private preventScroll() {
    this.renderer.addClass(this.document.body, 'backdrop-no-scroll'); // TODO use our own class instead of relying on Ionic?
    this.document.addEventListener(
      'touchmove',
      this.preventEvent,
      this.preventScrollEventListenerOptions
    );
  }

  private releaseScroll() {
    this.renderer.removeClass(this.document.body, 'backdrop-no-scroll'); // TODO use our own class instead of relying on Ionic?
    this.document.removeEventListener(
      'touchmove',
      this.preventEvent,
      this.preventScrollEventListenerOptions
    );
  }

  show() {
    this.renderer.addClass(this.elementRef.nativeElement, 'is-opening');
    this.renderer.appendChild(this.document.body, this.elementRef.nativeElement);

    this.positionWrapper();
    this.preventScroll();

    this.renderer.addClass(this.elementRef.nativeElement, 'is-open');
    this.renderer.removeClass(this.elementRef.nativeElement, 'is-opening');

    this.isShowing = true;
  }

  hide() {
    this.renderer.removeChild(this.document.body, this.elementRef.nativeElement);
    this.releaseScroll();

    this.renderer.removeStyle(this.targetElement, 'z-index');
    this.renderer.removeStyle(this.targetElement, 'pointer-events');
    this.isShowing = false;
  }

  private readonly POPOVER_BODY_PADDING = 12;
  private positionWrapper() {
    const targetDimensions = this.targetElement.getBoundingClientRect();

    this.renderer.addClass(this.elementRef.nativeElement, 'is-opening');
    this.renderer.appendChild(this.document.body, this.elementRef.nativeElement);

    const popoverElement = this.wrapperElement.nativeElement;
    const popoverDimensions = popoverElement.getBoundingClientRect();
    const viewport = popoverElement.ownerDocument.defaultView;
    this.positionHorizontally(viewport, targetDimensions, popoverDimensions);
    this.positionVertically(viewport, targetDimensions, popoverDimensions);
  }

  private positionHorizontally(
    viewPort: Window,
    targetDimensions: DOMRect,
    popoverDimensions: DOMRect
  ) {
    const viewPortWidth = viewPort.innerWidth;
    const popoverElement = this.wrapperElement.nativeElement;
    const contentWidth = popoverDimensions.width;
    const availableSpaceRight = viewPortWidth - targetDimensions.left;
    const availableSpaceLeft = targetDimensions.right;
    const contentCanRightOfTarget = availableSpaceRight >= contentWidth + this.POPOVER_BODY_PADDING;
    const openRight = contentCanRightOfTarget || availableSpaceRight >= availableSpaceLeft;
    if (this.popout === HorizontalDirection.left || !openRight) {
      // Open left:
      const rightPxValue = `${viewPortWidth - targetDimensions.right}px`;
      this.renderer.removeStyle(popoverElement, 'left');
      this.renderer.setStyle(popoverElement, 'right', rightPxValue);
    } else {
      // Open right:
      const leftPxValue = `${targetDimensions.left}px`;
      this.renderer.removeStyle(popoverElement, 'right');
      this.renderer.setStyle(popoverElement, 'left', leftPxValue);
    }
  }

  private positionVertically(
    viewPort: Window,
    targetDimensions: DOMRect,
    popoverDimensions: DOMRect
  ) {
    const viewPortHeight = viewPort.innerHeight;
    const popoverElement = this.wrapperElement.nativeElement;
    const contentHeight = popoverDimensions.height;
    const availableSpaceDown = viewPortHeight - targetDimensions.bottom;
    const availableSpaceUp = targetDimensions.top;
    const contentCanFitBelowTarget =
      availableSpaceDown >= contentHeight + this.POPOVER_BODY_PADDING;
    const openDown = contentCanFitBelowTarget || availableSpaceDown >= availableSpaceUp;
    if (openDown) {
      // Open down:
      const topPxValue = `${targetDimensions.bottom}px`;
      this.renderer.removeStyle(popoverElement, 'bottom');
      this.renderer.setStyle(popoverElement, 'top', topPxValue);
    } else {
      // Open up:
      const bottomPxValue = `${viewPortHeight - targetDimensions.top}px`;
      this.renderer.removeStyle(popoverElement, 'top');
      this.renderer.setStyle(popoverElement, 'bottom', bottomPxValue);
      // Ensure target element is elevated above any shadow inside popover, i.e. content wrapped in Card:
      this.renderer.setStyle(this.targetElement, 'z-index', `${this.zIndex + 1}`);
      this.renderer.setStyle(this.targetElement, 'pointer-events', 'none');
    }
  }
}
