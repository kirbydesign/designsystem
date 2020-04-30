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

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { Modal } from '../services/modal.interfaces';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  providers: [{ provide: Modal, useExisting: ModalWrapperComponent }],
})
export class ModalWrapperComponent implements Modal, AfterViewInit, OnInit, OnDestroy {
  static readonly KEYBOARD_HIDE_DELAY_IN_MS = 25;

  scrollY: number = Math.abs(window.scrollY);
  @Input() config: ModalConfig;
  componentPropsInjector: Injector;

  @ViewChildren(ButtonComponent, { read: ElementRef }) private toolbarButtonsQuery: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChild(IonContent, { static: true }) private ionContent: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef }) private ionContentElement: ElementRef<
    HTMLIonContentElement
  >;
  private observer: MutationObserver;
  private keyboardVisible = false;
  private toolbarButtons: HTMLButtonElement[] = [];

  @HostBinding('class.drawer')
  get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  constructor(
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
    });
  }

  ngAfterViewInit(): void {
    if (this.toolbarButtonsQuery) {
      this.toolbarButtons = this.toolbarButtonsQuery.map((buttonRef) => buttonRef.nativeElement);
    }
    this.checkForEmbeddedFooter();
  }

  scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration || 0);
  }

  scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration || 0);
  }

  async close(data?: any): Promise<void> {
    const ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    if (!ionModalElement) {
      return;
    }
    if (!this.keyboardVisible) {
      // No keyboard visible:
      // Dismiss modal and return:
      await ionModalElement.dismiss(data);
      return;
    }
    // Keyboard visible:
    // Blur active element and wait for keyboard to hide,
    // then dismiss modal and return:
    this.blurActiveElement();
    return new Promise((resolve) => {
      setTimeout(async () => {
        await ionModalElement.dismiss(data);
        resolve();
      }, ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS);
    });
  }

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    window.scrollTo({ top: this.scrollY });
  }

  // This prevents Ionic from setting --keyboard-offset on ion-content inside modal:
  @HostListener('focusin', ['$event'])
  @HostListener('focusout', ['$event'])
  checkFocusTarget(event: FocusEvent) {
    const input = event.target as HTMLElement;
    if (input.tagName === 'INPUT' && input.closest('ion-modal')) {
      event.stopPropagation();
    }
  }

  @HostListener('window:keyboardWillShow')
  _onKeyboardWillShow() {
    this.keyboardVisible = true;
  }

  @HostListener('window:keyboardWillHide')
  _onKeyboardWillHide() {
    this.keyboardVisible = false;
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
      const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
      if (embeddedFooter) {
        this.moveEmbeddedFooter(embeddedFooter);
      }
      this.observeEmbeddedFooter(embeddedComponentElement);
    }
  }

  private moveEmbeddedFooter(footer: Node) {
    if (footer) {
      // Move embedded footer out of content for fixed rendering of footer:
      this.renderer.removeChild(footer.parentElement, footer);
      this.renderer.appendChild(this.elementRef.nativeElement, footer);
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
        this.moveEmbeddedFooter(addedFooter);
      }
    };
    this.observer = new MutationObserver(callback);
    this.observer.observe(embeddedComponentElement, {
      childList: true, // Listen for addition or removal of child nodes
    });
  }

  ngOnDestroy() {
    //clean up the observer
    this.observer && this.observer.disconnect();
    delete this.observer;
  }
}
