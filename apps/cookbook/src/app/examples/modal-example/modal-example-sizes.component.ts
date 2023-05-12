import { Component } from '@angular/core';

import { ModalConfig, ModalController, ModalFlavor, ModalSize } from '@kirbydesign/designsystem';

import { EmbeddedModalExampleComponent } from './embedded-modal-example/embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';

const config = {
  selector: 'cookbook-modal-example-sizes',
  template: `<button kirby-button size="lg" (click)="showModal('modal', size)">Show modal</button>
<button kirby-button size="lg"(click)="showModal('drawer', size)">Show drawer</button>
<button kirby-button size="lg" (click)="showModal('compact')">Show compact</button>

<kirby-card>
  <kirby-card-header
    [title]="'Size of modal/drawer:'"
  ></kirby-card-header>
  <kirby-radio-group [value]="size" (valueChange)="sizeChange($event)">
    <kirby-item size="xs" *ngFor="let item of modalSizeOptions">
      <kirby-radio [value]="item" slot="start"></kirby-radio>
      <kirby-label>{{item.text}}</kirby-label>
    </kirby-item> 
  </kirby-radio-group>
</kirby-card>


  `,
  showModalCodeSnippet: `constructor(private modalController: ModalController) {}

showModal(flavor: ModalFlavor, size?: ModalSize) {
  const config: ModalConfig = {
    component: YourEmbeddedModalComponent,
    flavor,
    size,
  };

  this.modalController.showModal(config);
}`,
};
type ModalSizeOption = { text: string; value: ModalSize };

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['modal-example-sizes.component.scss'],
})
export class ModalExampleSizesComponent {
  static readonly template = config.template.split('<kirby-card')[0]; // Remove config part of the template
  static readonly defaultCodeSnippet = [config.showModalCodeSnippet].join('\n\n');
  static readonly showModalCodeSnippet = config.showModalCodeSnippet;

  modalSizeOptions: ModalSizeOption[] = [
    { text: 'Small', value: 'small' },
    { text: 'Medium (default)', value: 'medium' },
    { text: 'Large', value: 'large' },
    { text: 'Full height (medium width only)', value: 'full-height' },
  ];

  size: ModalSizeOption = this.modalSizeOptions[1];

  constructor(private modalController: ModalController) {}

  async showModal(flavor: ModalFlavor, size?: ModalSizeOption) {
    let config: ModalConfig;

    if (flavor === 'compact') {
      config = {
        component: ModalCompactExampleComponent,
        flavor,
      };
    } else {
      config = {
        component: EmbeddedModalExampleComponent,
        flavor,
        size: size.value,
        componentProps: {
          title: `Modal - ${size.text}`,
          subtitle: 'Hello from the first embedded example component!',
          showNestedOptions: true,
          modalSizeOptions: this.modalSizeOptions,
        },
      };
    }

    await this.modalController.showModal(config);
  }

  sizeChange(size: ModalSizeOption) {
    this.size = size;
  }
}
