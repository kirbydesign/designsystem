import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { WindowRef } from '../../../types';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon';
import { ResizeObserverService } from '../../shared';
import { ModalFooterComponent } from '../footer/modal-footer.component';
import { ModalConfig } from './config/modal-config';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { ProgressCircleComponent } from '../../progress-circle/progress-circle.component';
import { PageHeaderComponent } from '../../page/page.component';

export class ModalWrapperTestBuilder {
  private config: ModalConfig = {
    title: null,
    component: null,
    flavor: null,
  };
  private readonly createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    imports: [RouterTestingModule],
    entryComponents: [
      StaticFooterEmbeddedComponent,
      DynamicFooterEmbeddedComponent,
      InputEmbeddedComponent,
      StaticCustomHeaderContentEmbeddedComponent,
      DynamicCustomHeaderContentEmbeddedComponent,
    ],
    providers: [
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
    declarations: [
      MockComponents(
        IconComponent,
        ButtonComponent,
        PageHeaderComponent,
        ProgressCircleComponent,
        ModalFooterComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonContent
      ),
    ],
  });

  title(title: string) {
    this.config.title = title;
    return this;
  }

  flavor(flavor: ModalConfig['flavor']) {
    this.config.flavor = flavor;
    return this;
  }

  withStaticFooter() {
    this.config.component = StaticFooterEmbeddedComponent;
    return this;
  }

  withDynamicFooter() {
    this.config.component = DynamicFooterEmbeddedComponent;
    return this;
  }

  withEmbeddedInputComponent() {
    this.config.component = InputEmbeddedComponent;
    return this;
  }

  withStaticCustomHeaderContent() {
    this.config.component = StaticCustomHeaderContentEmbeddedComponent;
    return this;
  }

  withDynamicCustomHeadercontent() {
    this.config.component = DynamicCustomHeaderContentEmbeddedComponent;
    return this;
  }

  component(component: any) {
    this.config.component = component;
    return this;
  }

  build() {
    const spectator: Spectator<ModalWrapperComponent> = this.createComponent({
      props: {
        config: this.config,
      },
      detectChanges: false,
    });
    spyOn(spectator.component['ionContent'], 'getScrollElement').and.returnValue(
      Promise.resolve(document.createElement('DIV'))
    );
    const resizeObserverService = spectator.inject(ResizeObserverService);
    spyOn(resizeObserverService, 'observe');
    spyOn(resizeObserverService, 'unobserve');

    const ionModalWrapper = document.createElement('div');
    const ionModal = document.createElement('div');
    ionModal['dismiss'] = jasmine.createSpy('dissmissSpy');
    spyOn(spectator.element, 'closest')
      .withArgs('.modal-wrapper')
      .and.returnValue(ionModalWrapper)
      .withArgs('ion-modal')
      .and.returnValue(ionModal);

    spectator.detectChanges();

    return spectator;
  }
}

@Component({
  template: `
    <div>Some test content</div>
    <kirby-modal-footer>
      <button kirby-button>Test</button>
    </kirby-modal-footer>
  `,
})
export class StaticFooterEmbeddedComponent {}

@Component({
  template: `
    <div>DynamicFooterEmbeddedComponent - Some test content</div>
    <kirby-modal-footer *ngIf="showFooter" [class.enabled]="isEnabled">
      <button kirby-button>Test</button>
    </kirby-modal-footer>
  `,
})
export class DynamicFooterEmbeddedComponent {
  showFooter = false;
  isEnabled = false;
}

@Component({
  template: `
    <h2>Embedded Input</h2>
    <input />
    <textarea></textarea>
    <button>Test Button</button>
  `,
})
export class InputEmbeddedComponent {}

@Component({
  template: `
    <kirby-page-header>
      <kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
        2/4
      </kirby-progress-circle>
    </kirby-page-header>
    <div>My Title</div>
  `,
})
export class StaticCustomHeaderContentEmbeddedComponent {}
@Component({
  template: `
    <kirby-page-header *ngIf="showCustomHeader">
      <kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
        2/4
      </kirby-progress-circle>
    </kirby-page-header>
    <div>My title</div>
  `,
})
export class DynamicCustomHeaderContentEmbeddedComponent {
  showCustomHeader = false;
}
