import { Component } from '@angular/core';

import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';

const config = {
  selector: 'cookbook-modal-example',
  template: `<button kirby-button (click)="showModal()">Show modal</button>
<button kirby-button (click)="showDrawer()">Show drawer</button>
<button kirby-button (click)="showCompact()">Show compact</button>
<button kirby-button (click)="showModalWithFooter()">Show modal with footer</button>`,
  footerTemplate: `<p>Some content of the embedded component</p>
...
<kirby-modal-footer>
  <button kirby-button (click)="scrollToBottom()">Scroll to bottom</button>
</kirby-modal-footer>`,
  defaultCodeSnippet: `constructor(private modalController: ModalController) {}

showModal() {
  const config: ModalConfig = {
    title: 'Your Modal Title',
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
    componentProps: {
      prop1: 'value1',
      prop2: 'value2'
    }
  };
  this.modalController.showModal(config);
}`,
  drawerCodeSnippet: `showModal() {
  const config: ModalConfig = {
    title: 'Your Drawer Title',
    flavor: 'drawer',
    drawerSupplementaryAction: {
      iconName: 'qr',
      action: this.onSupplementaryActionSelect.bind(this),
    },
    component: YourEmbeddedDrawerComponent
  };
  this.modalController.showModal(config);
}

private onSupplementaryActionSelect() {
  console.log('Supplementary action selected');
}`,
  callbackCodeSnippet: `this.modalController.showModal(config, onClose);

onClose() {
  ...
}`,
  callbackWithDataCodeSnippet: `// Inside the parent (caller) component:
@Component()
export class ParentComponent() {
  this.modalController.showModal(config, onClose);

  onClose(dataReturnedByModal: CustomDataType) {
    ...
  }
}

// Inside the embedded component:
// Pass the data, which will be available in the parent callback:
@Component()
export class EmbeddedComponent() {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  const returnData: CustomDataType = {...};
  this.modal.close(returnData);
}`,
  scrollingCodeSnippet: `import { KirbyAnimation, Modal } from '@kirbydesign/designsystem';
...
constructor(@Optional() @SkipSelf() private modal: Modal) {}

// scrollToTop example - with long scroll animation:
this.modal.scrollToTop(KirbyAnimation.Duration.LONG);

// scrollToBottom example:
this.modal.scrollToBottom();`,
  embeddedCodeSnippet: `import { Component, Inject } from '@angular/core';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem';

@Component()
export class EmbeddedComponent() {
  constructor(@Inject(COMPONENT_PROPS) private componentProps) {
    this.props = componentProps;
  }
}`,
  closeModalCodeSnippet: `import { Component, Optional, SkipSelf } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';

@Component()
export class EmbeddedComponent() {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  onDismiss() {
    this.modal.close();
  }

  // (Optional) If you need to wait for the modal to close:
  async onDismiss() {
    await this.modal.close();
    // Do something...
  }
    
  // (Optional) You can additionally pass data, which will be available in the parent callback:
  onDismiss() {
    const returnData = {...};
    this.modal.close(returnData);
  }
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ModalExampleComponent {
  template = config.template;
  footerTemplate = config.footerTemplate;
  defaultCodeSnippet = config.defaultCodeSnippet;
  drawerCodeSnippet = config.drawerCodeSnippet;
  callbackCodeSnippet = config.callbackCodeSnippet;
  callbackWithDataCodeSnippet = config.callbackWithDataCodeSnippet;
  scrollingCodeSnippet = config.scrollingCodeSnippet;
  embeddedCodeSnippet = config.embeddedCodeSnippet;
  closeModalCodeSnippet = config.closeModalCodeSnippet;

  constructor(private modalController: ModalController) {}

  showModal(showFooter = false) {
    const config: ModalConfig = {
      title: 'My Modal Title',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
        showFooter: showFooter,
      },
    };
    this.modalController.showModal(config, this.onModalClose);
  }

  showCompact() {
    const config: ModalConfig = {
      title: null,
      flavor: 'compact',
      component: ModalCompactExampleComponent,
    };

    this.modalController.showModal(config, this.onModalClose);
  }

  showDrawer() {
    const config: ModalConfig = {
      title: 'My Drawer Title',
      flavor: 'drawer',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };

    this.modalController.showModal(config, this.onDrawerClose);
  }

  showModalWithFooter() {
    this.showModal(true);
  }

  onModalClose(data: any): void {
    console.log('Callback from Embedded Modal:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }

  onDrawerClose(data: any): void {
    console.log('Callback from Embedded Drawer:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }
}
