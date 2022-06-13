import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
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
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, first, takeUntil } from 'rxjs/operators';

import { DesignTokenHelper } from '@kirbydesign/core';

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { PlatformService } from '../../../helpers/platform.service';
import { WindowRef } from '../../../types/window-ref';
import { ButtonComponent } from '../../button/button.component';
import { ResizeObserverService } from '../../shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '../../shared/resize-observer/types/resize-observer-entry';
import { Modal } from '../services/modal.interfaces';

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';

@Component({
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  providers: [{ provide: Modal, useExisting: ModalWrapperComponent }],
})
export class ModalWrapperComponent implements Modal, AfterViewInit, OnInit, OnDestroy {
  @HostBinding('class.collapsible-title')
  get _hasCollapsibleTitle() {
    return !!this.config?.collapseTitle;
  }

  static readonly KEYBOARD_HIDE_DELAY_IN_MS = 100;

  scrollY: number = Math.abs(this.windowRef.nativeWindow.scrollY);
  private readonly VIEWPORT_RESIZE_DEBOUNCE_TIME = 100;

  set scrollDisabled(disabled: boolean) {
    this.ionContent.scrollY = !disabled;
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
  private contentTitle: ElementRef<HTMLElement>;

  private keyboardVisible = false;
  private toolbarButtons: HTMLButtonElement[] = [];
  private delayedClose = () => {};
  private delayedCloseTimeoutId;
  private initialViewportHeight: number;
  private viewportResized = false;
  private ionModalElement?: HTMLIonModalElement;
  private readonly ionModalDidPresent = new Subject<void>();
  readonly didPresent = this.ionModalDidPresent.toPromise();
  private readonly ionModalWillDismiss = new Subject<void>();
  readonly willClose = this.ionModalWillDismiss.toPromise();
  private viewportResize = new Subject<void>();
  private viewportResize$ = this.viewportResize
    .asObservable()
    .pipe(debounceTime(this.VIEWPORT_RESIZE_DEBOUNCE_TIME));
  private _mutationObserver: MutationObserver;
  private get mutationObserver(): MutationObserver {
    if (!this._mutationObserver) {
      this._mutationObserver = this.createEmbeddedElementsMutationObserver();
    }
    return this._mutationObserver;
  }
  private _intersectionObserver: IntersectionObserver;
  private get intersectionObserver(): IntersectionObserver {
    if (!this._intersectionObserver) {
      this._intersectionObserver = this.createModalWrapperIntersectionObserver();
    }
    return this._intersectionObserver;
  }
  private destroy$ = new Subject();

  @HostBinding('class.drawer')
  get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  willClose$ = this.ionModalWillDismiss.pipe(first());

  constructor(
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private zone: NgZone,
    private resizeObserverService: ResizeObserverService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private windowRef: WindowRef,
    private platform: PlatformService
  ) {
    this.setViewportHeight();
    this.observeViewportResize();
  }

  ngOnInit(): void {
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    this.initializeSizing();
    this.initializeModalRoute();
    this.listenForIonModalDidPresent();
    this.listenForIonModalWillDismiss();
    this.initializeResizeModalToModalWrapper();
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
    });
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
      this.routerOutlet.activateWith(this.config.modalRoute, this.componentFactoryResolver);
    }
  }

  private onSiblingModalRouteActivated(siblingModalRouteActivated$?: Observable<ActivatedRoute>) {
    if (!siblingModalRouteActivated$) return;
    siblingModalRouteActivated$.pipe(takeUntil(this.willClose$)).subscribe((route) => {
      if (this.routerOutlet.isActivated) {
        this.mutationObserver.disconnect();
        this.routerOutlet.deactivate();
        this.clearEmbeddedElements();
      }
      this.routerOutlet.activateWith(route, this.componentFactoryResolver);
      this.checkForEmbeddedElements();
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

  private closestElement(selector: string, base: Element) {
    function __closestFrom(el: Element | Window | Document): Element {
      if (!el || el === document || el === window) return null;
      if ((el as Slottable).assignedSlot) el = (el as Slottable).assignedSlot;
      let found = (el as Element).closest(selector);
      return found ? found : __closestFrom(((el as Element).getRootNode() as ShadowRoot).host);
    }
    return __closestFrom(base);
  }

  private observeModalFullHeight() {
    const ionModalWrapper = this.closestElement('.modal-wrapper', this.elementRef.nativeElement);

    if (!ionModalWrapper) return;
    // Start observing when modal has finished animating:
    this.didPresent.then(() => {
      this.intersectionObserver.observe(ionModalWrapper);
    });
  }

  ngAfterViewInit(): void {
    if (this.toolbarButtonsQuery) {
      this.toolbarButtons = this.toolbarButtonsQuery.map((buttonRef) => buttonRef.nativeElement);
    }
    this.checkForEmbeddedElements();
  }

  private checkForEmbeddedElements() {
    this.moveEmbeddedElements();
    this.observeEmbeddedElements();
  }

  private observeHeaderResize() {
    this.resizeObserverService.observe(this.ionHeaderElement.nativeElement, (entry) => {
      const [property, pixelValue] = ['--header-height', `${entry.contentRect.height}px`];
      this.setCssVar(this.elementRef.nativeElement, property, pixelValue);
    });
  }

  private moveEmbeddedElements() {
    const parentElement = this.getEmbeddedComponentElement();
    if (parentElement) {
      Object.entries(this.elementToParentMap).forEach(([tagName, getNewParent]) => {
        const embeddedElement = parentElement.querySelector<HTMLElement>(tagName);
        if (embeddedElement) {
          this.moveChild(embeddedElement, getNewParent());
        }
      });
    }
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
    const embeddedFooterElement = this.getEmbeddedFooterElement();
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

  private readonly elementToParentMap: { [key: string]: () => HTMLElement[] } = {
    'KIRBY-MODAL-FOOTER': () => [this.elementRef.nativeElement],
    'KIRBY-PAGE-TITLE': () =>
      [this.ionTitleElement.nativeElement, this.contentTitle?.nativeElement].filter(
        (element) => element !== undefined
      ),
    'KIRBY-PAGE-PROGRESS': () => [this.ionToolbarElement.nativeElement],
  };

  private clearEmbeddedElements() {
    Object.entries(this.elementToParentMap).forEach(([tagName, getParents]) => {
      const newParents = getParents();
      newParents.forEach((newParent) => {
        const embeddedElement = newParent.querySelector<HTMLElement>(`:scope > ${tagName}`);
        this.removeChild(embeddedElement);
      });
    });
  }

  /* TODO: Rewrite to make this function independent of element order. 
     See: https://github.com/kirbydesign/designsystem/issues/2096
  */
  private getEmbeddedComponentElement(): null | Element {
    const contentElementChildren = Array.from(
      this.ionContentElement.nativeElement.children
    ).reverse(); // Reverse makes it easier to retrieve the last children in the list

    const embeddedComponentElement = !!this.config.modalRoute
      ? contentElementChildren[0]
      : contentElementChildren[1];

    /* 
      As ModalConfig.component has type 'any' all values are valid for component; 
      explicitly handle the case where no embedded component element is found due to 
      this.
    */
    if (!embeddedComponentElement) return null;
    return embeddedComponentElement;
  }

  private getEmbeddedFooterElement() {
    return this.elementRef.nativeElement.querySelector<HTMLElement>('kirby-modal-footer');
  }

  private moveChild(child: Element, newParents: Element[]) {
    this.renderer.removeChild(child.parentElement, child);

    newParents.forEach((newParent, index) => {
      const childToAppend = index > 0 ? child.cloneNode(true) : child;
      this.renderer.appendChild(newParent, childToAppend);
      // Append adds child as last element of parent; therefore retrieve with lastElementChild
      const childElement = newParent.lastElementChild;

      if (childElement.tagName === 'KIRBY-MODAL-FOOTER') {
        this.resizeObserverService.observe(childElement, (entry) => {
          const [property, pixelValue] = [
            '--footer-height',
            `${Math.floor(entry.contentRect.height)}px`,
          ];
          this.setCssVar(this.elementRef.nativeElement, property, pixelValue);
        });
      }
    });
  }

  private removeChild(child?: Element) {
    if (!!child) {
      this.renderer.removeChild(child.parentElement, child);
    }
  }

  private observeEmbeddedElements() {
    const parentElement = this.getEmbeddedComponentElement();
    if (parentElement === null) return; // Mute observe warning when parentElement is null

    this.mutationObserver.observe(parentElement, {
      childList: true, // Listen for addition or removal of child nodes
    });
  }

  private createEmbeddedElementsMutationObserver(): MutationObserver {
    const observedElements = Object.keys(this.elementToParentMap);
    const callback = (mutations: MutationRecord[]) => {
      const addedNodes = mutations
        .filter((mutation) => mutation.type === 'childList') // Filter for mutation to the tree of nodes
        .map((mutation) => {
          // Only check for addedNodes as removal is handled by the Angular renderer:
          return Array.from(mutation.addedNodes).filter((node) =>
            observedElements.includes(node.nodeName)
          );
        });

      const addedElements = Array.prototype
        .concat(...addedNodes)
        .filter((node): node is HTMLElement => node instanceof HTMLElement);

      addedElements.forEach((addedElement) => {
        const newParentElement = this.elementToParentMap[addedElement.nodeName]();
        // Move embedded element out of content and append to new parent:
        this.moveChild(addedElement, newParentElement);
      });
    };
    return new MutationObserver(callback);
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
    this.mutationObserver.disconnect();
    delete this._mutationObserver;
    this.intersectionObserver.disconnect();
    delete this._intersectionObserver;
    if (this.resizeObserverService) {
      this.resizeObserverService.unobserve(this.windowRef.nativeWindow.document.body);
      this.resizeObserverService.unobserve(this.ionHeaderElement.nativeElement);
      this.resizeObserverService.unobserve(this.getEmbeddedFooterElement());
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
