import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalExperimentalComponent } from '@kirbydesign/designsystem/modal/experimental';
import { KirbyAnimation, ReorderEvent } from '@kirbydesign/designsystem';

export const fullscreenModalExampleTemplateHTML = `<kirby-modal-experimental
  [open]="open"
  (willDismiss)="close()"
>  
  <div>
    <button kirby-button (click)="scrollToBottom()">
      Scroll to bottom
      <kirby-icon name="arrow-down"></kirby-icon>
    </button>

    <button kirby-button (click)="toggleCanDismiss()">
      Can dismiss: {{ canDismiss }}
    </button>
    <p>
      Lorem ipsum dolor sit amet...
    </p>
  </div>
</kirby-modal-experimental>

<button kirby-button (click)="openModal()">Open Modal</button>
`;

export const fullscreenModalExampleTemplateTS = `openModal() { this.open = true; }`;

export const headerStartSlotExampleTemplate = `<kirby-page-progress header-start>
  <kirby-progress-circle themeColor="warning" value="25" size="sm" class="kirby-text-xsmall">
    1/4
  </kirby-progress-circle>
</kirby-page-progress>
`;

export const footerSlotExampleTemplate = `<kirby-modal-footer-experimental footer>
  <button kirby-button attentionLevel="3">
    To top
    <kirby-icon name="arrow-up"></kirby-icon>
  </button>
  <button kirby-button>Close</button>
</kirby-modal-footer-experimental>
`;
@Component({
  templateUrl: './fullscreen-experimental-example.component.html',
  styleUrls: ['./fullscreen-experimental-example.component.scss'],
})
export class FullscreenModalExperimentalExampleComponent {
  @ViewChild(ModalExperimentalComponent) modal: ModalExperimentalComponent;
  @ViewChild(ModalExperimentalComponent, { static: false, read: ElementRef })
  modalElement: ElementRef<HTMLElement>;

  open = false;
  canDismiss = true;
  showFooter = true;
  showPageProgress = true;
  isInlineFooter = false;
  collapseTitle = false;
  scrollDisabled = false;
  width;
  height;

  inputEnabled = false;

  onToggleInput(enable) {
    this.inputEnabled = enable;
    if (!enable) {
      this.width = undefined;
      this.height = undefined;
    }
  }

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  scrollToTop() {
    this.modal.scrollToTop(KirbyAnimation.Duration.LONG);
  }

  scrollToBottom() {
    this.modal.scrollToBottom(KirbyAnimation.Duration.LONG);
  }

  toggleCanDismiss() {
    this.canDismiss = !this.canDismiss;
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  togglePageProgress() {
    this.showPageProgress = !this.showPageProgress;
  }

  toggleIsInlineFooter() {
    this.isInlineFooter = !this.isInlineFooter;
  }

  toggleCollapseTitle() {
    this.collapseTitle = !this.collapseTitle;
  }

  toggleScrollDisabled() {
    this.scrollDisabled = !this.scrollDisabled;
  }

  items: any[] = [
    {
      title: '1',
      ownerName: 'xyz',
      isOwnAccount: false,
      shadowAccounts: [
        {
          title: '1a',
        },
        {
          title: '1b',
        },
        {
          title: '1c',
        },
      ],
    },
    {
      title: '2',
    },
    {
      title: '3',
      ownerName: 'John',
      isOwnAccount: true,
      shadowAccounts: [
        {
          title: '3a',
        },
      ],
    },
  ];
  headerTexts = ['skjul/vis', 'flyt'];

  doReorderItem(ev: ReorderEvent) {
    ev.complete(this.items);
  }

  doReorderShadowAccount(ev: ReorderEvent) {
    ev.complete(ev.parentItem.shadowAccounts);
  }

  itemsFullList: any[] = [
    {
      id: 0,
      title: 'Depoter',
      subTitle: '2000 pcs',
      amount: '5.587.218.309 DKK',
      detail: 'Alfabetisk',
      color: 'default',
    },
    {
      id: 1,
      title: 'Værdipapirer og puljer',
      subTitle: '1827 pcs',
      amount: '76.980 DKK',
      detail: 'Alfabetisk',
      color: 'light',
    },
    {
      id: 2,
      title: 'Vis med egne depoter',
      subTitle: '787 pcs',
      amount: '83.004 DKK',
      detail: '0 af 1 valgt',
      color: 'white',
    },
  ];

  getSectionName(item: any) {
    return item.title !== 'Vis med egne depoter' ? 'Sortering' : 'Fuldmagter';
  }

  radioItems = ['xxs', 'xs', 'sm', 'md', 'lg'];
  selected = 'md';
}
