import {
  Component,
  HostListener,
  Injector,
  HostBinding,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
  ComponentFactoryResolver,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IonContent, IonTitle } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { Modal } from '../services/modal.interfaces';
import { ButtonComponent } from '../../button/button.component';
import { ResizeObserverService } from '../../shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '../../shared/resize-observer/types/resize-observer-entry';
import { WindowRef } from '../../../types/window-ref';

@Component({
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  providers: [{ provide: Modal, useExisting: ModalWrapperComponent }],
})
export class ModalWrapperComponent implements Modal, AfterViewInit, OnInit, OnDestroy {
  static readonly KEYBOARD_HIDE_DELAY_IN_MS = 100;

  scrollY: number = Math.abs(this.windowRef.scrollY);
  set scrollDisabled(disabled: boolean) {
    this.ionContent.scrollY = !disabled;
  }

  @Input() config: ModalConfig;
  componentPropsInjector: Injector;

  @ViewChildren(ButtonComponent, { read: ElementRef }) private toolbarButtonsQuery: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef }) private ionContentElement: ElementRef<
    HTMLIonContentElement
  >;
  @ViewChild(IonTitle, { static: true, read: ElementRef }) private ionTitleElement: ElementRef<
    HTMLIonTitleElement
  >;
  @ViewChild(RouterOutlet, { static: true }) private routerOutlet: RouterOutlet;

  private keyboardVisible = false;
  private keyboardHeight: number;
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
  private readonly defaultSize = 'medium';
  private _mutationObserver: MutationObserver;
  private get mutationObserver(): MutationObserver {
    if (!this._mutationObserver) {
      this._mutationObserver = this.createEmbeddedElementsMutationObserver();
    }
    return this._mutationObserver;
  }

  @HostBinding('class.drawer')
  get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  willClose$ = this.ionModalWillDismiss.pipe(first());

  constructor(
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private resizeObserverService: ResizeObserverService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private windowRef: WindowRef
  ) {
    this.observeViewportResize();
  }

  ngOnInit(): void {
    this.observeViewportResize();
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    this.setModalSize();
    this.initializeModalRoute();
    this.listenForIonModalDidPresent();
    this.listenForIonModalWillDismiss();
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
    });
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

  private setModalSize() {
    this.renderer.addClass(this.ionModalElement, this.config.size || this.defaultSize);
  }

  private getAvailableContentHeight(ionModalWrapper: HTMLElement): number {
    const ionContentElementTop = this.ionContentElement.nativeElement.getBoundingClientRect().top;
    const modalWrapperTop = ionModalWrapper.getBoundingClientRect().top;

    const distanceFromContentToModalWrapper = ionContentElementTop - modalWrapperTop;
    const ionModalHeight = this.ionModalElement.getBoundingClientRect().height;

    const availableHeight = ionModalHeight - distanceFromContentToModalWrapper;
    return availableHeight;
  }

  private onScrollElementResize() {
    if (!this.getEmbeddedComponentElement()) return;
    const ionModalWrapper = this.elementRef.nativeElement.closest<HTMLElement>('.modal-wrapper');
    if (!ionModalWrapper) return;
    const embeddedComponentHeight = this.getEmbeddedComponentElement().getBoundingClientRect()
      .height;
    const availableHeight = this.getAvailableContentHeight(ionModalWrapper);

    if (embeddedComponentHeight >= availableHeight) {
      this.renderer.addClass(ionModalWrapper, 'content-overflows');
      this.renderer.setStyle(this.ionContentElement.nativeElement, 'max-height', 'none');
    } else {
      // If not in timeout, height of ionContent is not correct
      setTimeout(() => {
        this.renderer.setStyle(
          this.ionContentElement.nativeElement,
          'max-height',
          `${this.ionContentElement.nativeElement.clientHeight - this.keyboardHeight}px`
        );
      });

      this.renderer.removeClass(ionModalWrapper, 'content-overflows');
    }
  }

  private observeScrollElementResize() {
    if (!this.ionContent) return;

    this.ionContent.getScrollElement().then((scrollElement) => {
      this.renderer.setStyle(scrollElement, 'height', '100%');
      this.renderer.setStyle(scrollElement, 'position', 'relative');
      this.resizeObserverService.observe(this.getEmbeddedComponentElement(), () =>
        this.onScrollElementResize()
      );
    });
  }

  ngAfterViewInit(): void {
    if (this.toolbarButtonsQuery) {
      this.toolbarButtons = this.toolbarButtonsQuery.map((buttonRef) => buttonRef.nativeElement);
    }
    this.observeScrollElementResize();
    this.checkForEmbeddedElements();
  }

  private checkForEmbeddedElements() {
    this.moveEmbeddedElements();
    this.observeEmbeddedElements();
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
    return new Promise((resolve) => {
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
    this.windowRef.scrollTo({ top: this.scrollY });
  }

  @HostListener('window:ionKeyboardDidShow', ['$event'])
  _onKeyboardWillShow(event: { detail: { keyboardHeight: number } }) {
    this.keyboardVisible = true;
    this.setKeyboardOffset(event.detail.keyboardHeight);
    const ionModalWrapper = this.elementRef.nativeElement.closest<HTMLElement>('.modal-wrapper');
    if (!ionModalWrapper) return;
    const distanceFromWindowBottomToModalBottom =
      this.windowRef.innerHeight - ionModalWrapper.getBoundingClientRect().bottom;
    const keyboardOverlap = this.keyboardHeight - distanceFromWindowBottomToModalBottom;
    console.warn('keyboardOverlap:', keyboardOverlap);
  }
  @HostListener('window:ionKeyboardDidHide')
  _onKeyboardWillHide() {
    this.keyboardVisible = false;
    this.setKeyboardOffset(0);
  }
  private setKeyboardOffset(value: number) {
    this.keyboardHeight = value;
    const [key, pixelValue] = ['--keyboard-offset', `${value}px`];
    this.ionContentElement.nativeElement.style.setProperty(key, pixelValue);
    const embeddedFooterElement = this.elementRef.nativeElement.querySelector<HTMLElement>(
      'kirby-modal-footer'
    );
    if (embeddedFooterElement) {
      this.renderer.setStyle(embeddedFooterElement, key, pixelValue);
    }
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

  private observeViewportResize() {
    this.resizeObserverService.observe(
      this.windowRef.document.body,
      this.onViewportResize.bind(this)
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

  private readonly elementToParentMap: { [key: string]: () => HTMLElement } = {
    'KIRBY-MODAL-FOOTER': () => this.elementRef.nativeElement,
    'KIRBY-PAGE-TITLE': () => this.ionTitleElement.nativeElement,
  };

  private clearEmbeddedElements() {
    Object.entries(this.elementToParentMap).forEach(([tagName, getParent]) => {
      const embeddedElement = getParent().querySelector<HTMLElement>(tagName);
      this.removeChild(embeddedElement);
    });
  }

  private getEmbeddedComponentElement() {
    return !!this.config.modalRoute
      ? this.ionContentElement.nativeElement.lastElementChild
      : this.ionContentElement.nativeElement.firstElementChild;
  }

  private moveChild(child: Element, newParent: Element) {
    this.renderer.removeChild(child.parentElement, child);
    this.renderer.appendChild(newParent, child);
  }

  private removeChild(child?: Element) {
    if (!!child) {
      this.renderer.removeChild(child.parentElement, child);
    }
  }

  private observeEmbeddedElements() {
    const parentElement = this.getEmbeddedComponentElement();
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

  ngOnDestroy() {
    if (this.routerOutlet.isActivated) {
      this.routerOutlet.deactivate();
    }
    //clean up the observer
    this.mutationObserver.disconnect();
    delete this._mutationObserver;
    this.resizeObserverService && this.resizeObserverService.unobserve(window.document.body);

    const scrollElement = this.ionContent.getScrollElement();
    if (this.ionContent && scrollElement && scrollElement.then) {
      this.ionContent.getScrollElement().then((scrollElement) => {
        this.resizeObserverService.unobserve(scrollElement);
      });
    }
  }
}
