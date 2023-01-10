import { Component, ElementRef, HostListener, Injector, Input, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { WindowRef } from '@kirbydesign/designsystem/types';

import { Modal } from '../../services/modal.interfaces';
import { ModalConfig } from '../config/modal-config';
import { COMPONENT_PROPS } from '../config/modal-config.helper';

@Component({
  selector: 'kirby-modal-compact-wrapper',
  templateUrl: './modal-compact-wrapper.component.html',
  styleUrls: ['./modal-compact-wrapper.component.scss'],
  providers: [{ provide: Modal, useExisting: ModalCompactWrapperComponent }],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.ion-page]': 'false' }, //Ensure ion-page class doesn't get applied by Ionic Modal Controller
})
export class ModalCompactWrapperComponent implements Modal, OnInit {
  scrollY: number = Math.abs(this.windowRef.nativeWindow.scrollY);
  scrollDisabled = false;
  @Input() config: ModalConfig;
  componentPropsInjector: Injector;

  private ionModalElement: HTMLIonModalElement;
  private readonly ionModalDidPresent = new Subject<void>();
  private readonly ionModalWillDismiss = new Subject<void>();
  readonly didPresent = firstValueFrom(this.ionModalDidPresent);
  readonly willClose = firstValueFrom(this.ionModalWillDismiss);

  constructor(
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private windowRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    this.listenForIonModalDidPresent();
    this.listenForIonModalWillDismiss();
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
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

  async close(data?: any): Promise<void> {
    const ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    if (ionModalElement) {
      await ionModalElement.dismiss(data);
    }
  }

  scrollToTop: (_?: any) => void;
  scrollToBottom: (_?: any) => void;

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    this.windowRef.nativeWindow.scrollTo({ top: this.scrollY });
  }
}
