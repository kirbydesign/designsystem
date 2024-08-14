import { Component, Inject, OnInit, Optional, SkipSelf } from '@angular/core';

import {
  ActionSheetConfig,
  AlertConfig,
  ModalController,
  ModalFlavor,
  ModalSize,
} from '@kirbydesign/designsystem';
import { COMPONENT_PROPS, Modal, ModalConfig } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { KirbyAnimation } from '@kirbydesign/designsystem';
import { ModalSizeOption } from '../modal-example-configuration/modal-example-size-selector.component';

@Component({
  selector: 'cookbook-embedded-modal-example',
  templateUrl: './embedded-modal-example.component.html',
  styleUrls: ['./embedded-modal-example.component.scss'],
})
export class EmbeddedModalExampleComponent implements OnInit {
  title: string;
  subtitle: string;

  flavor: ModalFlavor;

  exampleProperties: {
    stringProperty: string;
    numberProperty: number;
    booleanProperty: boolean;
  };

  showDummyKeyboard: boolean;
  showDummyContent: boolean;
  showStaticDummyContent: boolean;
  delayLoadDummyContent: boolean;
  loadAdditionalContent: boolean;
  disableScroll: boolean;

  // We always want to allow config of footer and page progress, so initialize to false
  showPageProgress: boolean = false;
  showFooter: boolean = false;
  snapFooterToKeyboard: boolean = false;
  displayFooterAsInline: boolean = false;

  showNestedOptions: boolean;
  showNestedCollapseTitle: boolean;
  showNestedPageProgress: boolean = false;
  showNestedFooter: boolean = false;
  snapNestedFooterToKeyboard: boolean = false;
  showNestedDummyContent: boolean = false;
  displayNestedFooterAsInline: boolean = false;

  isLoading = false;
  isLoadingAdditionalContent = false;

  showModalSizeSelector: boolean;
  selectedModalSize: ModalSize;
  alertBeforeClose: boolean;

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

    this.modal.canDismiss = () => this.canDismiss();
  }

  private canDismiss() {
    if (!this.alertBeforeClose) return true;

    const config: AlertConfig = {
      title: 'Are you sure you want to close?',
      okBtn: 'Yes',
      cancelBtn: 'Take me back',
      icon: {
        name: 'warning',
        themeColor: 'warning',
      },
    };

    return config;
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
      collapseTitle: this.showNestedCollapseTitle,
      componentProps: {
        title,
        subtitle: 'Hello from second embedded example component!',
        flavor,
        delayLoadDummyContent: this.delayLoadDummyContent,
        loadAdditionalContent: this.loadAdditionalContent,
        showPageProgress: this.showNestedPageProgress,
        showFooter: this.showNestedFooter,
        snapFooterToKeyboard: this.snapNestedFooterToKeyboard,
        displayFooterAsInline: this.displayNestedFooterAsInline,
        showDummyContent: this.showNestedDummyContent,
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

  setSelectedModalSize(size: ModalSizeOption) {
    this.selectedModalSize = size.value;
  }
}
