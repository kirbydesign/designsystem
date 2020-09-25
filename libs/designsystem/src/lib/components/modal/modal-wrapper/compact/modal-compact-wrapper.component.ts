import {
  Component,
  HostListener,
  Injector,
  HostBinding,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

import { ModalConfig } from '../config/modal-config';
import { COMPONENT_PROPS } from '../config/modal-config.helper';
import { Modal } from '../../services/modal.interfaces';
import { WindowRef } from 'libs/designsystem/src/lib/types';

@Component({
  selector: 'kirby-modal-compact-wrapper',
  templateUrl: './modal-compact-wrapper.component.html',
  styleUrls: ['./modal-compact-wrapper.component.scss'],
  providers: [{ provide: Modal, useExisting: ModalCompactWrapperComponent }],
})
export class ModalCompactWrapperComponent implements Modal, OnInit {
  scrollY: number = Math.abs(this.window.scrollY);
  scrollDisabled = false;
  @Input() config: ModalConfig;
  componentPropsInjector: Injector;

  private ionModalElement: HTMLIonModalElement;
  private readonly ionModalDidPresent = new Subject<void>();
  private readonly ionModalWillDismiss = new Subject<void>();
  readonly didPresent = this.ionModalDidPresent.toPromise();
  readonly willClose = this.ionModalWillDismiss.toPromise();

  private _ionPageReset = false;
  @HostBinding('class.ion-page')
  get ionPageReset() {
    return this._ionPageReset;
  }

  constructor(
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
    private window: WindowRef
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
    this.window.scrollTo({ top: this.scrollY });
  }
}
