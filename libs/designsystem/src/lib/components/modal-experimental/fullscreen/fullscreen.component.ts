import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'kirby-fullscreen-modal-experimental',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenModalExperimentalComponent {
  @Input() open = false;
  @Input() hasCollapsibleTitle = false;

  @Output() close = new EventEmitter();

  closeModal() {
    this.close.emit();
  }
}
