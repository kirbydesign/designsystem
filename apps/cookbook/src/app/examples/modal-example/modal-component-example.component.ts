import { Component, OnInit } from '@angular/core';

import { ModalConfig } from '@kirbydesign/designsystem';

import { ModalSizeOption } from './modal-example-configuration/modal-example-size-selector.component';

const config = {
  selector: 'cookbook-modal-component-example',
  template: `
<button kirby-button size="lg" (click)="openModal()">Show modal</button>

<kirby-modal
  (willDismiss)="closeModal()"
  [open]="open"
  [config]="config"
>

  <ng-template>
    <kirby-page-progress>
      <kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
        2/4
      </kirby-progress-circle>
    </kirby-page-progress>

    <kirby-page-title>Hello there</kirby-page-title>
    
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>
    <p>hey</p>

    <kirby-modal-footer>
      <button kirby-button attentionLevel="3">
        <kirby-icon name="arrow-back"></kirby-icon>
      </button>

      <button kirby-button>Finish</button>
    </kirby-modal-footer>
    
  </ng-template>
</kirby-modal>

<kirby-card>
  <kirby-card-header>
    <strong>Size of modal/drawer</strong><br />
    <em>(on screens larger than 768px)</em>
  </kirby-card-header>
  <cookbook-modal-example-size-selector (sizeChange)="sizeChange($event)"></cookbook-modal-example-size-selector>
</kirby-card>
`,
  showModalCodeSnippet: `openModal() {
  this.open = true;
}

closeModal() {
  this.open = false;
}`,
};
@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-component-example.component.scss'],
})
export class ModalComponentExampleComponent implements OnInit {
  static readonly template = config.template.split('<kirby-card')[0]; // Remove config part of the template
  static readonly showModalCodeSnippet = config.showModalCodeSnippet;

  open: boolean = false;
  config: ModalConfig;

  ngOnInit(): void {
    this.config = {
      flavor: 'modal',
      collapseTitle: true,
    };
  }

  sizeChange(size: ModalSizeOption) {
    this.config.size = size.value;
  }

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  drawerSupplementaryAction: {
    iconName: 'qr';
  };
}
