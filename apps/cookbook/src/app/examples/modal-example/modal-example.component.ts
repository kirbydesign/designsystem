import { Component, OnInit } from '@angular/core';

import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';

const config = {
  selector: 'cookbook-modal-example',
  template: `<button kirby-button (click)="showModal()">Show modal</button>
<button kirby-button (click)="showDrawer()">Show drawer</button>
<button kirby-button (click)="showCompact()">Show compact</button>
<button kirby-button (click)="showModalWithFooter()">Show modal with footer</button>

<kirby-divider [hasMargin]="true"></kirby-divider>

<button kirby-button (click)="navigateToModalRoute('page1')">Open modal by route</button>
<button kirby-button kirbyModalRouterLink="page1">Open modal by router link</button>
<button kirby-button class="deeplink" (click)="navigateToModalRoute(['/examples', 'modal', 'page1'])">Deep link to modal route</button>
<button kirby-button class="deeplink" [kirbyModalRouterLink]="['/examples', 'modal', 'page1']">Deep link to modal by router link</button>
`,
  footerTemplate: `<p>Some content of the embedded component</p>
...
<kirby-modal-footer>
  <button kirby-button (click)="scrollToBottom()">Scroll to bottom</button>
</kirby-modal-footer>`,
  defaultCodeSnippet: `constructor(private modalController: ModalController) {}

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
  drawerCodeSnippet: `showModal() {
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
  modalWithOutletCodeSnippet: `{
    path: 'route-which-is-behind-the-modal',
    component: SomeComponent,
    children: [
      {
        path: 'some-route',
        outlet: 'modal',
        component: SomeOtherComponent,
      },
    ],
  }`,
  routerLinkForModalOutletCodeSnippet: `[routerLink]="['/', { outlets: { modal: ['some-route'] } }]"`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    'button.deeplink { display: none; } ',
    ':host-context(cookbook-modal-showcase) button.deeplink { display: initial; } ',
  ],
})
export class ModalExampleComponent implements OnInit {
  template = config.template;
  footerTemplate = config.footerTemplate;
  defaultCodeSnippet = config.defaultCodeSnippet;
  drawerCodeSnippet = config.drawerCodeSnippet;
  modalWithOutletCodeSnippet = config.modalWithOutletCodeSnippet;
  callbackCodeSnippet = config.callbackCodeSnippet;
  callbackWithDataCodeSnippet = config.callbackWithDataCodeSnippet;
  didPresentCodeSnippet = config.didPresentCodeSnippet;
  willCloseCodeSnippet = config.willCloseCodeSnippet;
  scrollingCodeSnippet = config.scrollingCodeSnippet;
  disableScrollingCodeSnippet = config.disableScrollingCodeSnippet;
  embeddedCodeSnippet = config.embeddedCodeSnippet;
  closeModalCodeSnippet = config.closeModalCodeSnippet;
  routerLinkForModalOutletCodeSnippet = config.routerLinkForModalOutletCodeSnippet;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  showModal(showFooter = false) {
    const config: ModalConfig = {
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
      flavor: 'compact',
      component: ModalCompactExampleComponent,
    };

    this.modalController.showModal(config, this.onModalClose);
  }

  showDrawer() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        flavor: 'drawer',
        prop1: 'value1',
        prop2: 'value2',
      },
    };

    this.modalController.showModal(config, this.onDrawerClose);
  }

  showModalWithFooter() {
    this.showModal(true);
  }

  navigateToModalRoute(path: string) {
    this.modalController.navigateToModal(path);
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
