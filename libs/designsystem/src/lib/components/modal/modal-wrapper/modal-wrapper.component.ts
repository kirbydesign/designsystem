import {
  Component,
  HostListener,
  Injector,
  HostBinding,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { NavParams, IonContent } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { IModalController } from '../services/modal.controller.interface';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { Modal } from '../services/modal.model';

@Component({
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements AfterViewInit {
  scrollY: number = Math.abs(window.scrollY);
  config: ModalConfig;
  componentPropsInjector: Injector;
  @ViewChild(IonContent, { static: true }) private ionContent: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef }) private ionContentElement: ElementRef<
    HTMLIonContentElement
  >;

  @HostBinding('class.drawer')
  get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  constructor(
    params: NavParams,
    private modalController: IModalController,
    injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.config = params.get('config');
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: injector,
    });
    this.registerScrolling(this.config.modal);
  }

  ngAfterViewInit(): void {
    this.renderFooter();
  }

  private registerScrolling(modal: Modal) {
    modal.scrollToTop = this.scrollToTop.bind(this);
    modal.scrollToBottom = this.scrollToBottom.bind(this);
  }

  private scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration || 0);
  }

  private scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration || 0);
  }

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    window.scrollTo({ top: this.scrollY });
  }

  onClose() {
    this.modalController.hideTopmost();
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

  private renderFooter() {
    const embeddedFooter = this.ionContentElement.nativeElement.querySelector('kirby-modal-footer');
    if (embeddedFooter) {
      // Move embedded footer out of content for fixed rendering of footer:
      this.renderer.removeChild(embeddedFooter.parentElement, embeddedFooter);
      this.renderer.appendChild(this.elementRef.nativeElement, embeddedFooter);
    }
  }
}
