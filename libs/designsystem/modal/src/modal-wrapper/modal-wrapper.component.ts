import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonicModule,
  IonTitle,
  IonToolbar,
  ScrollDetail,
} from '@ionic/angular';
import { firstValueFrom, merge, Observable, Subject } from 'rxjs';
import { debounceTime, first, map, takeUntil } from 'rxjs/operators';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

import { Modal, ModalElementsAdvertiser, ModalElementType } from '../modal.interfaces';
import { CanDismissHelper } from '../modal/services/can-dismiss.helper';
import { ModalConfig, ShowAlertCallback } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { ModalElementsMoverDelegate } from './modal-elements-mover.delegate';

const contentScrollDebounceTimeInMS = 10;
const contentScrolledOffsetInPixels = 4;

@Component({
  standalone: true,
  imports: [IonicModule, RouterModule, ButtonComponent, IconModule, CommonModule],
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  providers: [
    { provide: Modal, useExisting: ModalWrapperComponent },
    { provide: ModalElementsAdvertiser, useExisting: ModalWrapperComponent },
  ],
})
export class ModalWrapperComponent
  implements Modal, AfterViewInit, OnInit, OnDestroy, ModalElementsAdvertiser
{
  @HostBinding('class.collapsible-title')
  get _hasCollapsibleTitle() {
    return !!this.config?.collapseTitle;
  }

  static readonly KEYBOARD_HIDE_DELAY_IN_MS = 100;
  private readonly VIEWPORT_RESIZE_DEBOUNCE_TIME = 100;
  scrollY: number;

  set scrollDisabled(disabled: boolean) {
    this.ionContent.scrollY = !disabled;
  }

  set canDismiss(callback: ShowAlertCallback) {
    this.ionModalElement.canDismiss = this.canDismissHelper.getCanDismissCallback(callback);
  }

  @Input() config: ModalConfig;
  componentPropsInjector: Injector;

  @ViewChildren(ButtonComponent, { read: ElementRef }) private toolbarButtonsQuery: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChild(IonContent, { static: true }) private ionContent: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef })
  private ionContentElement: ElementRef<HTMLIonContentElement>;
  @ViewChild(IonHeader, { static: true, read: ElementRef })
  private ionHeaderElement: ElementRef<HTMLIonHeaderElement>;
  @ViewChild(IonToolbar, { static: true, read: ElementRef })
  private ionToolbarElement: ElementRef<HTMLIonToolbarElement>;
  @ViewChild(IonTitle, { static: true, read: ElementRef })
  private ionTitleElement: ElementRef<HTMLIonTitleElement>;
  @ViewChild(RouterOutlet, { static: true }) private routerOutlet: RouterOutlet;

  @ViewChild('contentTitle', { read: ElementRef })
  private _contentTitleElement: ElementRef<HTMLElement>;

  get contentTitleElement(): ElementRef<HTMLElement> {
    /* 
        contentTitleElement has ngIf directive dependent on _hasCollapsibleTitle; trigger CD to make sure element has been queried. 
        Solution taken from: https://danieleyassu.com/angular-viewchild-and-ngif/
      */
    if (!this._contentTitleElement && this._hasCollapsibleTitle) {
      this.changeDetector.detectChanges();
    }
    return this._contentTitleElement;
  }

  private keyboardVisible = false;
  private toolbarButtons: HTMLButtonElement[] = [];
  private delayedClose = () => {};
  private delayedCloseTimeoutId;
  private initialViewportHeight: number;
  private viewportResized = false;
  private ionModalElement?: HTMLIonModalElement;
  private readonly ionModalDidPresent = new Subject<void>();
  readonly didPresent = firstValueFrom(this.ionModalDidPresent);
  private readonly ionModalWillDismiss = new Subject<void>();
  readonly willClose = firstValueFrom(this.ionModalWillDismiss);
  private viewportResize = new Subject<void>();
  private viewportResize$ = this.viewportResize
    .asObservable()
    .pipe(debounceTime(this.VIEWPORT_RESIZE_DEBOUNCE_TIME));
  private _mutationObserver: MutationObserver;
  private _intersectionObserver: IntersectionObserver;
  private get intersectionObserver(): IntersectionObserver {
    if (!this._intersectionObserver) {
      this._intersectionObserver = this.createModalWrapperIntersectionObserver();
    }
    return this._intersectionObserver;
  }
  scrollEventsEnabled: boolean;
  isContentScrolled: boolean;

  private destroy$: Subject<void> = new Subject<void>();
  @HostBinding('class.drawer')
  get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  willClose$ = this.ionModalWillDismiss.pipe(first());

  private modalElementsMoverDelegate: ModalElementsMoverDelegate;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private zone: NgZone,
    private resizeObserverService: ResizeObserverService,
    private windowRef: WindowRef,
    private platform: PlatformService,
    private canDismissHelper: CanDismissHelper
  ) {
    this.scrollY = Math.abs(this.windowRef.nativeWindow.scrollY);
    this.setViewportHeight();
    this.observeViewportResize();
    this.modalElementsMoverDelegate = new ModalElementsMoverDelegate(renderer, elementRef);
  }

  ngOnInit(): void {
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    this.initializeSizing();
    this.initializeModalRoute();
    this.listenForIonModalDidPresent();
    this.listenForIonModalWillDismiss();
    this.listenForScroll();
    this.initializeResizeModalToModalWrapper();
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
    });
  }

  ngAfterViewInit(): void {
    if (this.toolbarButtonsQuery) {
      this.toolbarButtons = this.toolbarButtonsQuery.map((buttonRef) => buttonRef.nativeElement);
    }
  }

  private _currentFooter: HTMLElement | null = null;

  private set currentFooter(footer: HTMLElement | null) {
    if (footer !== null) {
      this.resizeObserverService.observe(footer, (entry) => {
        const [property, pixelValue] = [
          '--footer-height',
          `${Math.floor(entry.contentRect.height)}px`,
        ];
        this.setCssVar(this.elementRef.nativeElement, property, pixelValue);
      });
    }

    this._currentFooter = footer;
  }

  private get currentFooter(): HTMLElement | null {
    return this._currentFooter;
  }

  public addModalElement(type: ModalElementType, modalElement: ElementRef<HTMLElement>) {
    const addModalElementFn = {
      [ModalElementType.FOOTER]: () => {
        this.modalElementsMoverDelegate.addFooter(modalElement);
        this.currentFooter = modalElement.nativeElement;
      },
      [ModalElementType.TITLE]: () =>
        this.modalElementsMoverDelegate.addTitle(
          modalElement,
          this.contentTitleElement,
          this._hasCollapsibleTitle,
          this.ionTitleElement
        ),
      [ModalElementType.PAGE_PROGRESS]: () =>
        this.modalElementsMoverDelegate.addPageProgress(modalElement, this.ionToolbarElement),
    }[type];

    addModalElementFn();
  }

  public removeModalElement(type: ModalElementType, modalElement: ElementRef<HTMLElement>) {
    const removeModalElementFn = {
      [ModalElementType.FOOTER]: () => {
        this.modalElementsMoverDelegate.removeFooter(modalElement);
        this.currentFooter = null;
      },
      [ModalElementType.TITLE]: () =>
        this.modalElementsMoverDelegate.removeTitle(
          modalElement,
          this._hasCollapsibleTitle,
          this.contentTitleElement
        ),
      [ModalElementType.PAGE_PROGRESS]: () =>
        this.modalElementsMoverDelegate.removePageProgress(modalElement),
    }[type];

    removeModalElementFn();
  }

  private initializeResizeModalToModalWrapper() {
    if (this.config.flavor === 'drawer' && this.config.interactWithBackground) {
      merge(this.ionModalDidPresent, this.viewportResize$)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          // wait for template to render
          setTimeout(() => {
            const domRect = this.elementRef.nativeElement.getBoundingClientRect();
            const document = this.windowRef.nativeWindow.document.documentElement;
            const right = document.clientWidth - domRect.right;
            this.renderer.setStyle(this.ionModalElement, 'top', `${domRect.top}px`);
            this.renderer.setStyle(this.ionModalElement, 'left', `${domRect.left}px`);
            this.renderer.setStyle(this.ionModalElement, 'right', `${right}px`);
          });
        });
    }
  }

  private initializeSizing() {
    if (this.config.size === 'full-height') return;
    this.patchScrollElementSize();
    this.observeHeaderResize();
    this.observeModalFullHeight();
  }

  private initializeModalRoute() {
    if (this.config.modalRoute) {
      this.onSiblingModalRouteActivated(this.config.siblingModalRouteActivated$);
      // Load component from modal-route inside router-outlet:
      this.routerOutlet.activateWith(this.config.modalRoute);
    }
  }

  private onSiblingModalRouteActivated(siblingModalRouteActivated$?: Observable<ActivatedRoute>) {
    if (!siblingModalRouteActivated$) return;
    siblingModalRouteActivated$.pipe(takeUntil(this.willClose$)).subscribe((route) => {
      if (this.routerOutlet.isActivated) {
        this.routerOutlet.deactivate();
      }
      this.routerOutlet.activateWith(route);
    });
  }

  private patchScrollElementSize(): void {
    const supportsCssShadowParts = 'part' in HTMLElement.prototype;
    if (supportsCssShadowParts) return;
    this.ionContent.getScrollElement().then((scrollElement) => {
      this.renderer.setStyle(scrollElement, 'height', '100%');
      this.renderer.setStyle(scrollElement, 'position', 'relative');
      if (this.config.flavor === 'drawer') {
        this.renderer.setStyle(
          scrollElement,
          'transition',
          'padding-bottom ' + DesignTokenHelper.softKeyboardTransitionLeave
        );
      }
    });
  }

  private observeModalFullHeight() {
    const ionModalWrapper = this.getIonModalWrapperElement();

    if (!ionModalWrapper) return;
    // Start observing when modal has finished animating:
    this.didPresent.then(() => {
      this.intersectionObserver.observe(ionModalWrapper);
    });
  }

  // Extracted into function for ease of testing
  private getIonModalWrapperElement(): HTMLElement {
    return this.ionModalElement.shadowRoot.querySelector('.modal-wrapper');
  }

  private observeHeaderResize() {
    this.resizeObserverService.observe(this.ionHeaderElement.nativeElement, (entry) => {
      const [property, pixelValue] = ['--header-height', `${entry.contentRect.height}px`];
      this.setCssVar(this.elementRef.nativeElement, property, pixelValue);
    });
  }

  private listenForIonModalDidPresent() {
    if (this.ionModalElement) {
      this.ionModalElement.addEventListener('ionModalDidPresent', () => {
        this.ionModalDidPresent.next();
        this.ionModalDidPresent.complete();
      });
    }
  }

  private listenForIonModalWillDismiss() {
    if (this.ionModalElement) {
      this.ionModalElement.addEventListener('ionModalWillDismiss', () => {
        this.ionModalWillDismiss.next();
        this.ionModalWillDismiss.complete();
      });
    }
  }

  private listenForScroll() {
    const query = `(min-width: ${DesignTokenHelper.breakpoints.medium})`;
    const mediaQuery = this.windowRef.nativeWindow.matchMedia(query);
    const enableScrollEvents = (listOrEvent: MediaQueryList | MediaQueryListEvent) => {
      const isDesktop = listOrEvent.matches;
      this.scrollEventsEnabled = !isDesktop;
    };

    enableScrollEvents(mediaQuery);
    mediaQuery.onchange = enableScrollEvents;

    // Runs scroll subscription outside zone to avoid excessive amount of CD cycles
    // when ionScroll emits.
    this.zone.runOutsideAngular(() => {
      // Always subscribe as ionScroll only emits when scrollEventsEnabled is true
      this.ionContent.ionScroll
        .pipe(
          debounceTime(contentScrollDebounceTimeInMS),
          map((event) => event.detail),
          takeUntil(this.destroy$)
        )
        .subscribe((scrollInfo: ScrollDetail) => {
          const contentScrolledPastOffset = scrollInfo.scrollTop > contentScrolledOffsetInPixels;

          if (contentScrolledPastOffset !== this.isContentScrolled) {
            this.isContentScrolled = contentScrolledPastOffset;
            this.changeDetector.detectChanges();
          }
        });
    });
  }

  scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration || 0);
  }

  scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration || 0);
  }

  async close(data?: any): Promise<void> {
    if (!this.ionModalElement) {
      return;
    }
    if (!this.keyboardVisible || !this.viewportResized) {
      // No keyboard visible or viewport not resized:
      // Dismiss modal and return:
      clearTimeout(this.delayedCloseTimeoutId);
      await this.ionModalElement.dismiss(data);
      return;
    }

    // Keyboard visible:
    // Blur active element and wait for keyboard to hide,
    // then dismiss modal and return:
    this.blurActiveElement();
    return new Promise<void>((resolve) => {
      this.delayedClose = async () => {
        await this.ionModalElement.dismiss(data);
        resolve();
      };
      this.delayedCloseTimeoutId = setTimeout(
        this.delayedClose,
        ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS
      );
    });
  }

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    this.windowRef.nativeWindow.scrollTo({ top: this.scrollY });
  }

  @HostListener('window:ionKeyboardDidShow', ['$event.detail.keyboardHeight'])
  @HostListener('window:keyboardWillShow', ['$event.keyboardHeight'])
  _onKeyboardShow(keyboardHeight: number) {
    this.setKeyboardVisibility(keyboardHeight);
  }

  @HostListener('window:ionKeyboardDidHide')
  @HostListener('window:keyboardWillHide')
  _onKeyboardHide() {
    this.setKeyboardVisibility(0);
  }

  private toggleContentMaxHeight(freeze: boolean) {
    const shouldToggleMaxHeight =
      this.config.flavor === 'modal' && this.platform.isPhabletOrBigger();
    if (!shouldToggleMaxHeight) return;
    const style = 'max-height';
    const contentElement = this.ionContentElement.nativeElement;
    this.zone.run(() => {
      if (freeze) {
        const contentHeight = contentElement.offsetHeight;
        this.renderer.setStyle(contentElement, style, `${contentHeight}px`);
      } else {
        this.renderer.removeStyle(contentElement, style);
      }
    });
  }

  private setKeyboardVisibility(keyboardHeight: number) {
    const keyboardAlreadyVisible = keyboardHeight > 0 && this.keyboardVisible;
    const keyboardAlreadyHidden = keyboardHeight === 0 && !this.keyboardVisible;
    if (keyboardAlreadyVisible || keyboardAlreadyHidden) return;
    this.keyboardVisible = keyboardHeight > 0;
    this.toggleContentMaxHeight(this.keyboardVisible);
    this.setKeyboardOverlap(keyboardHeight);
  }

  private getKeyboardOverlap(keyboardHeight: number, element: Element) {
    if (keyboardHeight <= 0 || !element) return 0;
    const distanceFromViewportBottomToElement = Math.floor(
      this.windowRef.nativeWindow.innerHeight - element.getBoundingClientRect().bottom
    );
    return Math.max(keyboardHeight - distanceFromViewportBottomToElement, 0);
  }

  private setCssVar(element: Element, property: string, value: string) {
    this.zone.run(() =>
      this.renderer.setStyle(element, property, value, RendererStyleFlags2.DashCase)
    );
  }

  private toggleCssClass(element: Element, klass: string, condition: boolean) {
    this.zone.run(() =>
      condition ? this.renderer.addClass(element, klass) : this.renderer.removeClass(element, klass)
    );
  }

  private setKeyboardOverlap(keyboardHeight: number) {
    this.toggleCssClass(this.elementRef.nativeElement, 'keyboard-visible', keyboardHeight > 0);
    const keyboardOverlap = this.getKeyboardOverlap(keyboardHeight, this.elementRef.nativeElement);
    let snapFooterToKeyboard = false;
    const embeddedFooterElement = this.currentFooter;
    if (embeddedFooterElement) {
      this.setCssVar(embeddedFooterElement, '--keyboard-offset', `${keyboardOverlap}px`);
      snapFooterToKeyboard = embeddedFooterElement.classList.contains('snap-to-keyboard');
    }

    const contentElement = this.ionContentElement.nativeElement;
    const contentKeyboardOffset = snapFooterToKeyboard
      ? keyboardOverlap
      : this.getKeyboardOverlap(keyboardHeight, contentElement);
    this.setCssVar(contentElement, '--keyboard-offset', `${contentKeyboardOffset}px`);
  }

  onHeaderTouchStart(event: TouchEvent) {
    if (this.keyboardVisible) {
      const isToolbarButtonTouch = this.toolbarButtons.some((button) => {
        return (
          event.target instanceof HTMLElement &&
          (event.target === button || button.contains(event.target))
        );
      });
      // Prevent blur if event target is a toolbar button
      // (to allow tap event to fire):
      if (!isToolbarButtonTouch) {
        this.blurActiveElement();
      }
    }
  }

  @HostListener('window:resize')
  _onWindowResize() {
    this.setViewportHeight();
  }

  private setViewportHeight() {
    const vh = (this.windowRef.nativeWindow.innerHeight * 0.01).toFixed(2);
    this.setCssVar(this.elementRef.nativeElement, '--vh', `${vh}px`);
  }

  private observeViewportResize() {
    this.resizeObserverService.observe(this.windowRef.nativeWindow.document.body, (entry) =>
      this.onViewportResize(entry)
    );
  }

  private onViewportResize(entry: ResizeObserverEntry) {
    if (!this.initialViewportHeight) {
      // Initial observe callback, register initial height:
      this.initialViewportHeight = entry.contentRect.height;
      return;
    }
    this.viewportResized = entry.contentRect.height !== this.initialViewportHeight;
    if (!this.viewportResized) {
      // We are back to initial view port height, check for pending close func:
      if (this.delayedCloseTimeoutId) {
        clearTimeout(this.delayedCloseTimeoutId);
        this.delayedClose();
      }
    }
    this.viewportResize.next();
  }

  blurActiveElement() {
    const BLUR_TARGET_SELECTOR = 'input, textarea';
    if (this.keyboardVisible) {
      if (
        document.activeElement instanceof HTMLElement &&
        document.activeElement.matches(BLUR_TARGET_SELECTOR)
      ) {
        document.activeElement.blur();
      }
    }
  }
  private createModalWrapperIntersectionObserver(): IntersectionObserver {
    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      const isTouchingViewport = entry.intersectionRatio < 1;
      if (isTouchingViewport) {
        this.ionModalElement.classList.add('full-height');
      } else {
        this.ionModalElement.classList.remove('full-height');
      }
    };

    // Set explicit viewport root if within iframe:
    const root = this.windowRef.nativeWindow.frameElement
      ? (this.windowRef.nativeWindow.document as any) // Cast to `any` as Typescript lib.d.ts doesnt support Document type yet
      : undefined;
    const options: IntersectionObserverInit = {
      rootMargin: '0px 0px -1px 0px', // `bottom: -1px` allows checking when the modal bottom is touching the viewport
      root,
      threshold: [0.99, 1],
    };

    return new IntersectionObserver(callback, options);
  }

  ngOnDestroy() {
    if (this.routerOutlet.isActivated) {
      this.routerOutlet.deactivate();
    }
    //clean up the observer
    delete this._mutationObserver;
    this.intersectionObserver.disconnect();
    delete this._intersectionObserver;
    if (this.resizeObserverService) {
      this.resizeObserverService.unobserve(this.windowRef.nativeWindow.document.body);
      this.resizeObserverService.unobserve(this.ionHeaderElement.nativeElement);
      this.resizeObserverService.unobserve(this.currentFooter);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
