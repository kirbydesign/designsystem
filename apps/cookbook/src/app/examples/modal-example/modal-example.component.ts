import { Component } from '@angular/core';

import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';

const config = {
  selector: 'cookbook-modal-example',
  template: `<button kirby-button (click)="showModal()">Show modal</button>
<button kirby-button (click)="showDrawer()">Show drawer</button>
<button kirby-button (click)="showCompact()">Show compact</button>`,
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
  const returnData: CustomDataType = {...};
  this.modalController.hideTopmost(returnData);
}`,
  scrollingCodeSnippet: `// scrollToTop example - with long scroll animation:
this.modalController.scrollToTop(KirbyAnimation.Duration.LONG);

// scrollToBottom example:
this.modalController.scrollToBottom();`,
  embeddedCodeSnippet: `import { COMPONENT_PROPS, ModalController } from '@kirbydesign/designsystem';

@Component()
export class EmbeddedComponent() {
  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private modalController: ModalController,
  ) {
    this.props = componentProps;
  }
}`,
  hideTopmostCodeSnippet: `@Component()
export class EmbeddedComponent() {

  constructor(private modalController: ModalController) {}

  onDismiss() {
    this.modalController.hideTopmost();
  }
    
  // (Optional) You can additionally pass data, which will be available in the parent callback:
  onDismiss() {
    const returnData = {...};
    this.modalController.hideTopmost(returnData);
  }
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ModalExampleComponent {
  template = config.template;
  defaultCodeSnippet = config.defaultCodeSnippet;
  drawerCodeSnippet = config.drawerCodeSnippet;
  callbackCodeSnippet = config.callbackCodeSnippet;
  callbackWithDataCodeSnippet = config.callbackWithDataCodeSnippet;
  scrollingCodeSnippet = config.scrollingCodeSnippet;
  embeddedCodeSnippet = config.embeddedCodeSnippet;
  hideTopmostCodeSnippet = config.hideTopmostCodeSnippet;

  constructor(private modalController: ModalController) {}

  showModal() {
    const config: ModalConfig = {
      title: 'My Modal Title',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
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

  onModalClose(data: any): void {
    console.log('Callback from Embedded Modal:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }

  onDrawerClose(data: any): void {
    console.log('Callback from Embedded Drawer:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }
}
