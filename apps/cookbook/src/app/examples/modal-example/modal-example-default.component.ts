import { Component } from '@angular/core';

import { ModalConfig, ModalController } from '@kirbydesign/designsystem';

import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';
import { WindowRef } from '@kirbydesign/designsystem/types/window-ref';

const config = {
  selector: 'cookbook-modal-example-default',
  template: `<button kirby-button (click)="showModal()">Show modal</button>
  <button kirby-button (click)="showDrawer()">Show drawer</button>
  <button kirby-button (click)="showCompact()">Show compact</button>
  <cookbook-modal-example-configuration
    [(showDummyKeyboard)]="showDummyKeyboard"
    [(showFooter)]="showFooter"
    [(loadContent)]="loadContent"
    [(loadAdditionalContent)]="loadAdditionalContent"
  ></cookbook-modal-example-configuration>`,
  titleTemplate: `<kirby-page-title>My Modal Title</kirby-page-title>
 
<p>Some content of the embedded component</p>
...
`,
  footerTemplate: `<p>Some content of the embedded component</p>
...
<kirby-modal-footer>
  <button kirby-button (click)="scrollToBottom()">Scroll to bottom</button>
</kirby-modal-footer>`,
  showModalCodeSnippet: `constructor(private modalController: ModalController) {}

showModal() {
  const config: ModalConfig = {
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
    componentProps: {
      prop1: 'value1',
      prop2: 'value2'
    }
  };
  this.modalController.showModal(config);
}`,
  drawerCodeSnippet: `showDrawer() {
  const config: ModalConfig = {
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
  showCompactCodeSnippet: `showCompact() {
  const config: ModalConfig = {
    flavor: 'compact',
    component: YourEmbeddedModalComponent,
  };
  this.modalController.showModal(config);
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
  this.modal?.close(returnData);
}`,
  scrollingCodeSnippet: `import { KirbyAnimation, Modal } from '@kirbydesign/designsystem';
...
constructor(@Optional() @SkipSelf() private modal: Modal) {}

// scrollToTop example - with long scroll animation:
this.modal?.scrollToTop(KirbyAnimation.Duration.LONG);

// scrollToBottom example:
this.modal?.scrollToBottom();`,

  disableScrollingCodeSnippet: `import { KirbyAnimation, Modal } from '@kirbydesign/designsystem';
...
constructor(@Optional() @SkipSelf() private modal: Modal) {}

// Disable scroll Y
this.modal?.scrollDisabled = true;`,

  didPresentCodeSnippet: `constructor(@Optional() @SkipSelf() private modal: Modal) {}

@ViewChild('nameInput', { static: false, read: ElementRef }) private nameInputElement: ElementRef<HTMLInputElement>;

ngOnInit() {
  this.modal?.didPresent.then(() => this.nameInputElement?.nativeElement.focus()); 
}`,
  willCloseCodeSnippet: `constructor(@Optional() @SkipSelf() private modal: Modal) {}

  ngOnInit() {
    this.modal?.willClose.then(() => console.log('this modal is about to close'));
  }`,
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
    this.modal?.close();
  }

  // (Optional) If you need to wait for the modal to close:
  async onDismiss() {
    await this.modal?.close();
    // Do something...
  }
    
  // (Optional) You can additionally pass data, which will be available in the parent callback:
  onDismiss() {
    const returnData = {...};
    this.modal?.close(returnData);
  }
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-example-default.component.scss'],
})
export class ModalExampleDefaultComponent {
  template = config.template.split('<cookbook-modal-example-configuration')[0]; // Remove config part of the template
  titleTemplate = config.titleTemplate;
  footerTemplate = config.footerTemplate;
  defaultCodeSnippet = [
    config.showModalCodeSnippet,
    config.drawerCodeSnippet,
    config.showCompactCodeSnippet,
  ].join('\n\n');
  showModalCodeSnippet = config.showModalCodeSnippet;
  drawerCodeSnippet = config.drawerCodeSnippet;
  callbackCodeSnippet = config.callbackCodeSnippet;
  callbackWithDataCodeSnippet = config.callbackWithDataCodeSnippet;
  didPresentCodeSnippet = config.didPresentCodeSnippet;
  willCloseCodeSnippet = config.willCloseCodeSnippet;
  scrollingCodeSnippet = config.scrollingCodeSnippet;
  disableScrollingCodeSnippet = config.disableScrollingCodeSnippet;
  embeddedCodeSnippet = config.embeddedCodeSnippet;
  closeModalCodeSnippet = config.closeModalCodeSnippet;

  showDummyKeyboard = !!this.window.sessionStorage.getItem('kirby-cookbook-show-dummy-keyboard');
  showFooter = false;
  loadAdditionalContent = false;
  loadContent = true;

  constructor(private modalController: ModalController, private window: WindowRef) {}

  private async showOverlay(flavor: 'modal' | 'drawer') {
    const title = flavor === 'modal' ? 'Modal Title' : 'Drawer Title';
    const config: ModalConfig = {
      flavor,
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        title,
        subtitle: 'Hello from the first embedded example component!',
        exampleProperties: {
          stringProperty: 'Value injected from parent component',
          numberProperty: 123,
          booleanProperty: true,
        },
        showNestedOptions: true,
        showDummyKeyboard: this.showDummyKeyboard,
        showFooter: this.showFooter,
        loadContent: this.loadContent,
        loadAdditionalContent: this.loadAdditionalContent,
        disableScroll: false,
      },
    };
    await this.modalController.showModal(config, this.onOverlayClose);
  }

  async showModal() {
    await this.showOverlay('modal');
  }

  async showCompact() {
    const config: ModalConfig = {
      flavor: 'compact',
      component: ModalCompactExampleComponent,
    };
    await this.modalController.showModal(config, this.onOverlayClose);
  }

  async showDrawer() {
    await this.showOverlay('drawer');
  }

  private onOverlayClose(data: any): void {
    console.log('Callback from Embedded Modal:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }
}
