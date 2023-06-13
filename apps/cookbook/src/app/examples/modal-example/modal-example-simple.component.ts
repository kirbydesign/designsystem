import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalConfig, ModalController, ModalFlavor } from '@kirbydesign/designsystem';

import { EmbeddedModalExampleComponent } from './embedded-modal-example/embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';
import {
  ModalExampleSizeSelectorComponent,
  ModalSizeOption,
} from './modal-example-configuration/modal-example-size-selector.component';

const config = {
  selector: 'cookbook-modal-example-simple',
  template: `<button kirby-button size="lg" (click)="showModal('modal', size)">Show modal</button>
<button kirby-button size="lg"(click)="showModal('drawer', size)">Show drawer</button>
<button kirby-button size="lg" (click)="showModal('compact')">Show compact</button>
<kirby-card>
  <kirby-card-header>
    <strong>Size of modal/drawer</strong><br />
    <em>(on screens larger than 768px)</em>
  </kirby-card-header>
  <cookbook-modal-example-size-selector (sizeChange)="sizeChange($event)"></cookbook-modal-example-size-selector>
</kirby-card>`,
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

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-example-simple.component.scss'],
})
export class ModalExampleSimpleComponent implements OnInit {
  static readonly template = config.template.split('<kirby-card')[0]; // Remove config part of the template
  static readonly defaultCodeSnippet = [config.showModalCodeSnippet].join('\n\n');
  static readonly showModalCodeSnippet = config.showModalCodeSnippet;

  @ViewChild(ModalExampleSizeSelectorComponent, { static: true })
  private sizeSelector?: ModalExampleSizeSelectorComponent;

  size: ModalSizeOption;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.size = this.sizeSelector.size;
  }

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
          title: `${flavor === 'modal' ? 'Modal' : 'Drawer'} - ${size.text}`,
          subtitle: 'Hello from the first embedded example component!',
          showNestedOptions: true,
          showDummyContent: false,
          showModalSizeSelector: true,
        },
      };
    }

    await this.modalController.showModal(config);
  }

  sizeChange(size: ModalSizeOption) {
    this.size = size;
  }
}
