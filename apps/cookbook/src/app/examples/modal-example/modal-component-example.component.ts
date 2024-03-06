import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalSize } from '@kirbydesign/designsystem';
import { ModalSizeOption } from './modal-example-configuration/modal-example-size-selector.component';

const modalAndDrawerContent = `<ng-template>
    <kirby-page-title>Modal Component</kirby-page-title>

    <p>
      Lorem ipsum. 
    </p>

    <kirby-modal-footer>
      <button kirby-button>Button in footer</button>
    </kirby-modal-footer>
  </ng-template>`;

const compactContent = `<ng-template>
    <kirby-empty-state
      iconName="close"
      title="Out of service"
      subtitle="The system is currently down. Please contact customer support."
      themeColor="danger"
      ></kirby-empty-state>
  </ng-template>`;

const config = {
  selector: 'cookbook-modal-component-example',
  template: `<button kirby-button size="lg" id="open-modal">Show modal</button>
<button kirby-button size="lg" id="open-drawer">Show drawer</button>
<button kirby-button size="lg" id="open-compact">Show compact</button>

<kirby-modal [size]="size" flavor="modal" trigger="open-modal">
  ${modalAndDrawerContent}
</kirby-modal>

<!-- Additional flavor examples omitted from example for brevity -->
<kirby-modal trigger="open-drawer" flavor="drawer" [size]="size">
  ${modalAndDrawerContent}
</kirby-modal>

<kirby-modal trigger="open-compact" flavor="compact">
  ${compactContent}
</kirby-modal>

<kirby-card>
  <kirby-card-header>
    <strong>Size of modal</strong><br />
    <em>(on screens larger than 768px)</em>
  </kirby-card-header>
  <cookbook-modal-example-size-selector (sizeChange)="sizeChange($event)"></cookbook-modal-example-size-selector>
</kirby-card>
`,
  isOpenExampleHtml: `<button kirby-button size="lg" (click)="openModal()">Show modal</button>

<kirby-modal [isOpen]="isOpen" (didDismiss)="didDismiss()">
  <ng-template>
    Modal content
  </ng-template>
</kirby-modal>
`,
  isOpenCodeSnippet: `openModal() {
  this.isOpen = true;
}

didDismiss() {
  this.isOpen = false;
}`,
};
@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-component-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponentExampleComponent {
  static readonly template = config.template.split('<kirby-modal trigger="open-drawer"')[0];
  static readonly isOpenExampleHtml = config.isOpenExampleHtml;
  static readonly isOpenCodeSnippet = config.isOpenCodeSnippet;

  size: ModalSize = 'medium';
  isOpen: boolean = false;

  sizeChange(size: ModalSizeOption) {
    this.size = size.value;
  }
}
