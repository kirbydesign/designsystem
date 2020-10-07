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
} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Subject } from 'rxjs';

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
  @ViewChild(IonContent, { static: true }) private ionContent: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef }) private ionContentElement: ElementRef<
    HTMLIonContentElement
  >;

  private mutationObserver: MutationObserver;
  private keyboardVisible = false;
  private toolbarButtons: HTMLButtonElement[] = [];
  private delayedClose = () => {};
  private delayedCloseTimeoutId;
  private initialViewportHeight: number;
  private viewportResized = false;
  private ionModalElement: HTMLIonModalElement;
  private embeddedComponentElement: HTMLElement;
  private embeddedFooterElement: HTMLElement;
  private readonly ionModalDidPresent = new Subject<void>();
  readonly didPresent = this.ionModalDidPresent.toPromise();
  private readonly ionModalWillDismiss = new Subject<void>();
  readonly willClose = this.ionModalWillDismiss.toPromise();

  @HostBinding('class.drawer')
  get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  constructor(
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private resizeObserverService: ResizeObserverService,
    private windowRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.observeViewportResize();
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    this.listenForIonModalDidPresent();
    this.listenForIonModalWillDismiss();
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
    });

    this.moveUnderlyingModalBackdropsInFrontOfModals();
  }

  private moveUnderlyingModalBackdropsInFrontOfModals() {
    const underlyingModalElements = this.ionModalElement.parentElement.querySelectorAll(
      'ion-modal:not(:last-of-type)'
    );
    if (underlyingModalElements.length === 0) return;

    underlyingModalElements.forEach((modalElement) => {
      this.renderer.setStyle(modalElement.querySelector('ion-backdrop'), 'z-index', '20');
    });

    this.willClose.then(() => {
      underlyingModalElements.forEach((modalElement) => {
        this.renderer.setStyle(modalElement.querySelector('ion-backdrop'), 'z-index', '2');
      });
    });
  }

  private getAvailableContentHeight(modalWrapper: any): number {
    const ionContentElementTop = this.ionContentElement.nativeElement.getBoundingClientRect().top;
    const modalWrapperTop = modalWrapper.getBoundingClientRect().top;

    const distanceFromContentToModalWrapper = ionContentElementTop - modalWrapperTop;
    const ionModalHeight = this.ionModalElement.getBoundingClientRect().height;

    const availableHeight = ionModalHeight - distanceFromContentToModalWrapper;
    return availableHeight;
  }

  private onScrollElementResize() {
    if (!this.embeddedComponentElement) return;
    const modalWrapper = this.ionModalElement.querySelector('.modal-wrapper');
    const embeddedComponentHeight = this.embeddedComponentElement.getBoundingClientRect().height;

    if (embeddedComponentHeight >= this.getAvailableContentHeight(modalWrapper)) {
      this.renderer.addClass(modalWrapper, 'content-overflows');
    } else {
      this.renderer.removeClass(modalWrapper, 'content-overflows');
    }
  }

  private observeScrollElementResize() {
    if (this.config.flavor === 'modal') {
      this.embeddedComponentElement = this.ionContentElement.nativeElement.querySelector(
        ':first-child'
      );

      const scrollElementPromise = this.ionContent.getScrollElement();
      if (!scrollElementPromise) return;

      scrollElementPromise.then((scrollElement) => {
        // TODO: Do you know how we can access main (scrollElement) of ion-content from scss?
        this.renderer.setStyle(scrollElement, 'position', 'relative');
        this.resizeObserverService.observe(scrollElement, () => this.onScrollElementResize());
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.toolbarButtonsQuery) {
      this.toolbarButtons = this.toolbarButtonsQuery.map((buttonRef) => buttonRef.nativeElement);
    }
    this.checkForEmbeddedFooter();
    this.observeScrollElementResize();
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

  @HostListener('window:keyboardWillShow', ['$event'])
  _onKeyboardWillShow(info?: { keyboardHeight: number }) {
    this.keyboardVisible = true;
    if (info && info.keyboardHeight) {
      this.setKeyboardOffset(info.keyboardHeight);
    }
  }

  @HostListener('window:keyboardWillHide')
  _onKeyboardWillHide() {
    this.keyboardVisible = false;
    this.setKeyboardOffset(0);
  }

  private setKeyboardOffset(value: number) {
    const [key, pixelValue] = ['--keyboard-offset', `${value}px`];
    this.ionContentElement.nativeElement.style.setProperty(key, pixelValue);
    if (this.embeddedFooterElement) {
      this.embeddedFooterElement.style.setProperty(key, pixelValue);
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

  private checkForEmbeddedFooter() {
    const embeddedComponentElement = this.ionContentElement.nativeElement.firstElementChild;

    if (embeddedComponentElement) {
      this.embeddedFooterElement = embeddedComponentElement.querySelector('kirby-modal-footer');
      this.moveEmbeddedFooter();
      this.observeEmbeddedFooter(embeddedComponentElement);
    }
  }

  private moveEmbeddedFooter() {
    if (this.embeddedFooterElement) {
      // Move embedded footer out of content for fixed rendering of footer:
      this.renderer.removeChild(
        this.embeddedFooterElement.parentElement,
        this.embeddedFooterElement
      );
      this.embeddedFooterElement.setAttribute('slot', 'fixed');
      this.renderer.appendChild(this.ionContentElement.nativeElement, this.embeddedFooterElement);
    }
  }

  private observeEmbeddedFooter(embeddedComponentElement: Node) {
    const callback = (mutations: MutationRecord[]) => {
      const addedFooter = mutations
        .filter((mutation) => mutation.type === 'childList') // Filter for mutation to the tree of nodes
        .map((mutation) => {
          // Only check for addedNodes as removal is handled by the Angular renderer:
          return Array.from(mutation.addedNodes).find(
            (node) => node.nodeName === 'KIRBY-MODAL-FOOTER'
          );
        })[0];
      if (addedFooter) {
        this.embeddedFooterElement = <HTMLElement>addedFooter;
        this.moveEmbeddedFooter();
      }
    };
    this.mutationObserver = new MutationObserver(callback);
    this.mutationObserver.observe(embeddedComponentElement, {
      childList: true, // Listen for addition or removal of child nodes
    });
  }

  ngOnDestroy() {
    //clean up the observer
    this.mutationObserver && this.mutationObserver.disconnect();
    delete this.mutationObserver;
    this.resizeObserverService.unobserve(this.windowRef.document.body);
    if (this.embeddedComponentElement) {
      this.resizeObserverService.unobserve(this.embeddedComponentElement);
    }
  }
}
