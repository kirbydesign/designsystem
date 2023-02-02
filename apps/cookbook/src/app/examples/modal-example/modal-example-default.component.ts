import { Component } from '@angular/core';

import { AlertConfig, ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { WindowRef } from '@kirbydesign/designsystem/types';

import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';
import { EmbeddedModalExampleComponent } from './embedded-modal-example/embedded-modal-example.component';

const config = {
  selector: 'cookbook-modal-example-default',
  template: `<button kirby-button (click)="showModal()" [disabled]="interactWithBackground || preventInteraction">Show modal</button>
  <button kirby-button (click)="showDrawer()" [disabled]="preventInteraction">Show drawer</button>
  <button kirby-button (click)="showCompact()" [disabled]="interactWithBackground || preventInteraction">Show compact</button>
  <cookbook-example-configuration-wrapper>
      <cookbook-modal-example-configuration [disabled]="preventInteraction" [(showDummyKeyboard)]="showDummyKeyboard"
      [(showPageProgress)]="showPageProgress"
      [(showFooter)]="showFooter"
      [(displayFooterAsInline)]="displayFooterAsInline"
      [(collapseTitle)]="collapseTitle"
      [(alertBeforeClose)]="alertBeforeClose"
      [(showDummyContent)]="showDummyContent"
      [(delayLoadDummyContent)]="delayLoadDummyContent"
      [(loadAdditionalContent)]="loadAdditionalContent"
      [(openFullHeight)]="openFullHeight"
      [(interactWithBackground)]="interactWithBackground"
      [(customCssClass)]="customCssClass"
      >
      </cookbook-modal-example-configuration>
  </cookbook-example-configuration-wrapper>
  
  <ng-container *ngIf="interactWithBackground">
    <p *ngFor="let dummyText of dummyBackgroundTexts">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
    </p>
  </ng-container>
  `,
  titleTemplate: `<kirby-page-title>My Modal Title</kirby-page-title>
 
<p>Some content of the embedded component</p>
...
`,
  pageProgressTemplate: `<kirby-page-progress>
  <kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
  2/4
  </kirby-progress-circle>
</kirby-page-progress>

<kirby-page-title>
  My Modal Title
</kirby-page-title>
 
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
  alertBeforeCloseCodeSnippet: `// Inside the parent (caller) component:
@Component()
export class ParentComponent() {
  const alertConfig: AlertConfig = {
    title: 'Do you want to close the modal?',
    okBtn: {
      text: 'Yes',
      isDestructive: true,
    },
    cancelBtn: 'No',
  };

  this.modalController.showModal(config, null, alertConfig)
}
`,
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
  template = config.template.split('<cookbook-example-configuration-wrapper>')[0]; // Remove config part of the template
  titleTemplate = config.titleTemplate;
  pageProgressTemplate = config.pageProgressTemplate;
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
  alertBeforeCloseCodeSnippet = config.alertBeforeCloseCodeSnippet;
  didPresentCodeSnippet = config.didPresentCodeSnippet;
  willCloseCodeSnippet = config.willCloseCodeSnippet;
  scrollingCodeSnippet = config.scrollingCodeSnippet;
  disableScrollingCodeSnippet = config.disableScrollingCodeSnippet;
  embeddedCodeSnippet = config.embeddedCodeSnippet;
  closeModalCodeSnippet = config.closeModalCodeSnippet;

  showDummyKeyboard = !!this.windowRef.nativeWindow.sessionStorage.getItem(
    'kirby-cookbook-show-dummy-keyboard'
  );
  showPageProgress = false;
  showFooter = false;
  displayFooterAsInline = false;
  collapseTitle = false;
  alertBeforeClose = false;
  showDummyContent = true;
  delayLoadDummyContent = true;
  loadAdditionalContent = false;
  openFullHeight = false;
  interactWithBackground = false;
  customCssClass = false;
  dummyBackgroundTexts = new Array(100).map(() => '');
  preventInteraction = false;

  constructor(private modalController: ModalController, private windowRef: WindowRef) {}

  private async showOverlay(flavor: 'modal' | 'drawer') {
    let title = flavor === 'modal' ? 'Modal Title' : 'Drawer Title';
    if (this.customCssClass) {
      title = flavor === 'modal' ? 'Modal with Custom CSS' : 'Drawer with Custom CSS';
    }
    this.preventInteraction = this.interactWithBackground;
    const config: ModalConfig = {
      flavor,
      collapseTitle: this.collapseTitle,
      component: EmbeddedModalExampleComponent,
      interactWithBackground: this.interactWithBackground,
      cssClass: this.customCssClass ? ['my-custom-modal-class'] : [],
      size: this.openFullHeight ? 'full-height' : null,
      componentProps: {
        title,
        displayFooterAsInline: this.displayFooterAsInline,
        subtitle: 'Hello from the first embedded example component!',
        exampleProperties: {
          stringProperty: 'Value injected from parent component',
          numberProperty: 123,
          booleanProperty: true,
        },
        showNestedOptions: !this.interactWithBackground,
        showDummyKeyboard: this.showDummyKeyboard,
        showPageProgress: this.showPageProgress,
        showFooter: this.showFooter,
        showDummyContent: this.showDummyContent && !this.interactWithBackground,
        showStaticDummyContent: this.interactWithBackground,
        delayLoadDummyContent: this.delayLoadDummyContent,
        loadAdditionalContent: this.loadAdditionalContent,
        disableScroll: false,
        openFullHeight: this.openFullHeight,
      },
    };

    let alertConfig: AlertConfig = null;
    if (this.alertBeforeClose) {
      alertConfig = {
        title: 'Do you want to close the modal?',
        okBtn: {
          text: 'Yes',
          isDestructive: true,
        },
        cancelBtn: 'No',
      };
    }

    await this.modalController.showModal(config, this.onOverlayClose.bind(this), alertConfig);
  }

  async showModal() {
    await this.showOverlay('modal');
  }

  async showCompact() {
    const config: ModalConfig = {
      flavor: 'compact',
      component: ModalCompactExampleComponent,
    };
    await this.modalController.showModal(config, this.onOverlayClose.bind(this));
  }

  async showDrawer() {
    await this.showOverlay('drawer');
  }

  private onOverlayClose(data: any): void {
    this.preventInteraction = false;
    console.log('Callback from Embedded Modal:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }
}
