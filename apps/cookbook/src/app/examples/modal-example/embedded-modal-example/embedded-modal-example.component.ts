import { Component, Inject, OnInit, Optional, SkipSelf } from '@angular/core';

import {
  ActionSheetConfig,
  AlertConfig,
  ModalController,
  ModalSize,
} from '@kirbydesign/designsystem';
import { COMPONENT_PROPS, Modal, ModalConfig } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { KirbyAnimation } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-embedded-modal-example',
  templateUrl: './embedded-modal-example.component.html',
  styleUrls: ['./embedded-modal-example.component.scss'],
})
export class EmbeddedModalExampleComponent implements OnInit {
  title: string;
  subtitle: string;

  exampleProperties: {
    stringProperty: string;
    numberProperty: number;
    booleanProperty: boolean;
  };

  showNestedOptions: boolean;
  showDummyKeyboard: boolean;
  showPageProgress: boolean;
  showFooter: boolean;
  snapFooterToKeyboard: boolean;
  showDummyContent: boolean;
  showStaticDummyContent: boolean;
  showNestedPageProgress: boolean = false;
  showNestedFooter: boolean = false;
  snapNestedFooterToKeyboard: boolean = false;
  showNestedDummyContent: boolean = true;
  delayLoadDummyContent: boolean;
  loadAdditionalContent: boolean;
  disableScroll: boolean = false;
  displayFooterAsInline: boolean = false;
  openFullHeight: boolean;

  isLoading = false;
  isLoadingAdditionalContent = false;

  modalSizeOptions = [
    { text: 'small', value: 'small' },
    { text: 'medium (default)', value: 'medium' },
    { text: 'large', value: 'large' },
    { text: 'full-height', value: 'full-height' },
  ];

  selectedModalSize: ModalSize;

  get _footerType(): 'inline' | 'fixed' {
    return this.displayFooterAsInline ? 'inline' : 'fixed';
  }

  constructor(
    @Inject(COMPONENT_PROPS) componentProps,
    private modalController: ModalController,
    private toastController: ToastController,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    Object.assign(this, componentProps);
  }

  ngOnInit() {
    if (this.showDummyContent) {
      if (this.delayLoadDummyContent) {
        this.isLoading = true;
        setTimeout(() => (this.isLoading = false), 1000);
      }
      if (this.loadAdditionalContent) {
        this.isLoadingAdditionalContent = true;
        setTimeout(() => (this.isLoadingAdditionalContent = false), 2000);
      }
    }
  }

  private showNestedOverlay(flavor: 'modal' | 'drawer') {
    const title = flavor === 'modal' ? 'Nested Modal Title' : 'Nested Drawer Title';
    const config: ModalConfig = {
      flavor,
      drawerSupplementaryAction: {
        iconName: 'edit',
        action: this.onSupplementaryActionSelect.bind(this),
      },
      component: EmbeddedModalExampleComponent,
      size: this.selectedModalSize,
      componentProps: {
        title,
        subtitle: 'Hello from second embedded example component!',
        showDummyKeyboard: this.showDummyKeyboard,
        showPageProgress: this.showNestedPageProgress,
        showFooter: this.showNestedFooter,
        snapFooterToKeyboard: this.snapFooterToKeyboard,
        showDummyContent: this.showNestedDummyContent,
        delayLoadDummyContent: this.delayLoadDummyContent,
        loadAdditionalContent: this.loadAdditionalContent,
        modalSizeOptions: this.modalSizeOptions,
      },
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config);
  }

  showNestedModal() {
    this.showNestedOverlay('modal');
  }

  showNestedDrawer() {
    this.showNestedOverlay('drawer');
  }

  showNestedAlert() {
    const config: AlertConfig = {
      title: 'Embedded Alert',
      message: 'The default alert is just a title, a message, an OK and (optional) cancel button',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClose);
  }

  showNestedActionSheet() {
    const config: ActionSheetConfig = {
      header: 'Nested action sheet',
      subheader: 'Action sheet subheader',
      items: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' },
      ],
      cancelButtonText: 'Custom cancel',
    };
    this.modalController.showActionSheet(config);
  }

  scrollToBottom() {
    this.modal.scrollToBottom(KirbyAnimation.Duration.EXTRA_LONG);
  }

  scrollToTop() {
    this.modal.scrollToTop(KirbyAnimation.Duration.SHORT);
  }

  toggleDisableScroll(disabled: boolean) {
    this.modal.scrollDisabled = disabled;
  }

  togglePageProgress() {
    this.showPageProgress = !this.showPageProgress;
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  close() {
    const someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }

  onSupplementaryActionSelect() {
    const config: ToastConfig = {
      message: `Supplementary action selected`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  onSnapFooterToKeyboardCheckbox(checked: boolean) {
    this.snapFooterToKeyboard = checked;
  }

  onAlertClose(result?: boolean): void {
    console.log(`Alert closed: ${result}`);
  }

  setSelectedModalSize(size) {
    this.selectedModalSize = size.value;
  }
}
