import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

export enum HorizontalDirection {
  right = 'right',
  left = 'left',
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'kirby-popover',
  template: `
    <div #wrapper class="wrapper"><ng-content></ng-content></div>
  `,
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements AfterViewInit, OnDestroy {
  // removeEventListener same instance of event handler & options
  private readonly preventScrollEventListenerOptions = {
    passive: false,
  } as EventListenerOptions;

  private readonly POPOVER_BODY_PADDING = 12;

  private isShowing: boolean = false;
  private isFirstToLockScroll: boolean;
  private zIndex: number;
  private document: Document;

  @ViewChild('wrapper', { static: true, read: ElementRef })
  wrapperElement: ElementRef<HTMLDivElement>;

  @Input()
  popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;

  @Input()
  target: HTMLElement | ElementRef<HTMLElement>;

  @Output()
  willHide = new EventEmitter<void>();

  private get targetElement(): HTMLElement {
    if (this.target instanceof ElementRef) {
      return this.target.nativeElement;
    } else {
      return this.target;
    }
  }

  @HostListener('window:resize')
  _onWindowResize() {
    this.hide();
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.document = elementRef.nativeElement.ownerDocument;
  }

  ngAfterViewInit(): void {
    this.placePopoverAboveClosestModal();
    this.renderer.removeChild(
      this.elementRef.nativeElement.parentElement,
      this.elementRef.nativeElement
    );
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private placePopoverAboveClosestModal() {
    const closestIonModal = this.elementRef.nativeElement.closest('ion-modal');
    if (closestIonModal) {
      this.zIndex = parseInt((closestIonModal as HTMLElement).style.zIndex) + 1;
      this.elementRef.nativeElement.style.zIndex = `${this.zIndex}`;
    } else {
      this.zIndex = parseInt(DesignTokenHelper.zLayer('popover'));
    }
  }

  // document.removeEventListener needs the exact same event handler & options reference:
  private static preventEventOutsidePopover(event: TouchEvent) {
    if (event.target instanceof HTMLElement) {
      const targetIsInPopover = !!event.target.closest('kirby-popover');
      if (!targetIsInPopover) {
        event.preventDefault();
      }
    }
  }

  private preventScroll() {
    this.isFirstToLockScroll = !this.document.body.classList.contains('backdrop-no-scroll');
    if (this.isFirstToLockScroll) {
      this.renderer.addClass(this.document.body, 'backdrop-no-scroll');
    }

    // preventDefault does not work with Renderer2.listen method; add event listener directly to document instead
    this.document.addEventListener(
      'touchmove',
      PopoverComponent.preventEventOutsidePopover,
      this.preventScrollEventListenerOptions
    );
  }

  private releaseScroll() {
    if (this.isFirstToLockScroll) {
      this.renderer.removeClass(this.document.body, 'backdrop-no-scroll');
    }

    this.document.removeEventListener(
      'touchmove',
      PopoverComponent.preventEventOutsidePopover,
      this.preventScrollEventListenerOptions
    );
  }

  show() {
    this.renderer.addClass(this.elementRef.nativeElement, 'is-opening');
    this.renderer.appendChild(this.document.body, this.elementRef.nativeElement);

    this.preventScroll();
    this.positionWrapper();

    this.renderer.addClass(this.elementRef.nativeElement, 'is-open');
    this.renderer.removeClass(this.elementRef.nativeElement, 'is-opening');

    this.isShowing = true;
  }

  hide() {
    if (!this.isShowing) return;

    this.willHide.emit();
    this.renderer.removeChild(
      this.elementRef.nativeElement.parentElement,
      this.elementRef.nativeElement
    );
    this.releaseScroll();

    this.renderer.removeStyle(this.targetElement, 'z-index');
    this.renderer.removeStyle(this.targetElement, 'pointer-events');
    this.isShowing = false;
  }

  private positionWrapper() {
    const targetDimensions = this.targetElement.getBoundingClientRect();

    this.renderer.appendChild(this.document.body, this.elementRef.nativeElement);

    const wrapperElement = this.wrapperElement.nativeElement;
    const wrapperDimensions = wrapperElement.getBoundingClientRect();
    const viewport = wrapperElement.ownerDocument.defaultView;
    this.positionHorizontally(viewport, wrapperElement, targetDimensions, wrapperDimensions);
    this.positionVertically(viewport, wrapperElement, targetDimensions, wrapperDimensions);
  }

  private positionHorizontally(
    viewPort: Window,
    wrapperElement: HTMLDivElement,
    targetDimensions: DOMRect,
    wrapperDimensions: DOMRect
  ) {
    const viewPortWidth = viewPort.innerWidth;
    const contentWidth = wrapperDimensions.width;
    const availableSpaceRight = viewPortWidth - targetDimensions.left;
    const availableSpaceLeft = targetDimensions.right;
    const contentCanFitRightOfTarget =
      availableSpaceRight >= contentWidth + this.POPOVER_BODY_PADDING;
    const openRight = contentCanFitRightOfTarget || availableSpaceRight >= availableSpaceLeft;

    const [direction, oppositeDirection] =
      this.popout === HorizontalDirection.left || !openRight
        ? ['left', 'right']
        : ['right', 'left'];

    const pxValue =
      direction === 'left' ? viewPortWidth - targetDimensions.right : targetDimensions.left;

    this.renderer.removeStyle(wrapperElement, direction);
    this.renderer.setStyle(wrapperElement, oppositeDirection, `${pxValue}px`);
  }

  private positionVertically(
    viewPort: Window,
    wrapperElement: HTMLDivElement,
    targetDimensions: DOMRect,
    wrapperDimensions: DOMRect
  ) {
    const viewPortHeight = viewPort.innerHeight;
    const contentHeight = wrapperDimensions.height;
    const availableSpaceDown = viewPortHeight - targetDimensions.bottom;
    const availableSpaceUp = targetDimensions.top;
    const contentCanFitBelowTarget =
      availableSpaceDown >= contentHeight + this.POPOVER_BODY_PADDING;

    const isAvailableSpaceBelow =
      contentCanFitBelowTarget || availableSpaceDown >= availableSpaceUp;
    const [direction, oppositeDirection] = isAvailableSpaceBelow
      ? ['bottom', 'top']
      : ['top', 'bottom'];

    const pxValue =
      direction === 'bottom' ? targetDimensions.bottom : viewPortHeight - targetDimensions.top;

    this.renderer.removeStyle(wrapperElement, direction);
    this.renderer.setStyle(wrapperElement, oppositeDirection, `${pxValue}px`);

    if (direction === 'top') {
      // Ensure target is elevated above shadows in popover, i.e. content wrapped in Card:
      this.renderer.setStyle(this.targetElement, 'z-index', `${this.zIndex + 1}`);
      this.renderer.setStyle(this.targetElement, 'pointer-events', 'none');
    }
  }
}
