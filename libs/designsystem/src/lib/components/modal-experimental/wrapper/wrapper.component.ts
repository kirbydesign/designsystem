import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-modal-wrapper-experimental',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class ModalWrapperExperimentalComponent {
  @Input() title = '';
  @Input() hasCollapsibleTitle = true;
  @Input() scrollDisabled = false;
}
