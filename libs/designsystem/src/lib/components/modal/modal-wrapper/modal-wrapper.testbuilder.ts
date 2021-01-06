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
  withDynamicAndInlineFooter() {
    this.config.component = InlineFooterEmbeddedComponent;
    return this;
  }
  withEmbeddedInputComponent() {
    this.config.component = InputEmbeddedComponent;
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
    <kirby-page-title>InlineFooterEmbeddedComponent - Some test content</kirby-page-title>
    <h4>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
    <p>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium "
    </p>
    <button kirby-button>Toggle footer</button>
    <kirby-inline-footer>Inline Footer</kirby-inline-footer>
    <kirby-modal-footer>
      <button kirby-button attentionLevel="3">
        <kirby-icon name="arrow-back"></kirby-icon>
      </button>
      <button kirby-button>Finish</button>
    </kirby-modal-footer>
  `,
})
export class InlineFooterEmbeddedComponent {
  showFooter = true;
  isEnabled = true;
}
