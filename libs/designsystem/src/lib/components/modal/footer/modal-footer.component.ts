import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {
  @Input()
  themeColor?: 'white' | 'light';
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;
}
