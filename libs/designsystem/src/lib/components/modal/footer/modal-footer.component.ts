import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @HostBinding('class.fixed')
  isFixed: boolean = true;
  @HostBinding('class.inline')
  isInline: boolean;

  @Input() set type(type: 'inline' | 'fixed') {
    this.isFixed = type === 'fixed';
    this.isInline = type === 'inline';
  }
}
