import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-modal-footer-experimental',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class ModalFooterExperimentalComponent {
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @HostBinding('class')
  @Input()
  type: 'inline' | 'fixed' = 'fixed';
}
