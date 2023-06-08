import { Component, EventEmitter, Output } from '@angular/core';
import { ModalSize } from '@kirbydesign/designsystem';

export type ModalSizeOption = { text: string; value: ModalSize };

@Component({
  selector: 'cookbook-modal-example-size-selector',
  templateUrl: './modal-example-size-selector.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ModalExampleSizeSelectorComponent {
  modalSizeOptions: ModalSizeOption[] = [
    { text: 'Small', value: 'small' },
    { text: 'Medium (default)', value: 'medium' },
    { text: 'Large', value: 'large' },
    { text: 'Full height (medium width only)', value: 'full-height' },
  ];

  size: ModalSizeOption = this.modalSizeOptions[1];

  @Output() sizeChange = new EventEmitter<ModalSizeOption>();

  onValueChange(size: ModalSizeOption) {
    this.size = size;
    this.sizeChange.emit(this.size);
  }
}
