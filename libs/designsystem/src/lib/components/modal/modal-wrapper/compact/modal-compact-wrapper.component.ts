import {
  Component,
  HostListener,
  Injector,
  HostBinding,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

import { ModalConfig } from '../config/modal-config';
import { COMPONENT_PROPS } from '../config/modal-config.helper';
import { Modal } from '../../services/modal.model';

@Component({
  selector: 'kirby-modal-compact-wrapper',
  templateUrl: './modal-compact-wrapper.component.html',
  styleUrls: ['./modal-compact-wrapper.component.scss'],
  providers: [{ provide: Modal, useExisting: ModalCompactWrapperComponent }],
})
export class ModalCompactWrapperComponent implements Modal, OnInit {
  scrollY: number = Math.abs(window.scrollY);
  @Input() config: ModalConfig;
  componentPropsInjector: Injector;

  private _ionPageReset = false;
  @HostBinding('class.ion-page')
  get ionPageReset() {
    return this._ionPageReset;
  }

  constructor(private injector: Injector, private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: this.injector,
    });
  }

  public close(data?: any) {
    const ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    ionModalElement && ionModalElement.dismiss(data);
  }

  scrollToTop: (_?: any) => void;
  scrollToBottom: (_?: any) => void;

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    window.scrollTo({ top: this.scrollY });
  }
}
