import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { WindowRef } from '../../../types';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon';
import { PageProgressComponent } from '../../page/page.component';
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
      StaticPageProgressEmbeddedComponent,
      DynamicPageProgressEmbeddedComponent,
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
        PageProgressComponent,
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

  interactWithBackground(interactWithBackground: boolean = true) {
    this.config.interactWithBackground = interactWithBackground;
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

  withStaticPageProgress() {
    this.config.component = StaticPageProgressEmbeddedComponent;
    return this;
  }

  withDynamicPageProgress() {
    this.config.component = DynamicPageProgressEmbeddedComponent;
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

    // TODO: Figure out how to mock ResizeObserverService methods - at this point it's too late as ModalWrapper calls .observe in it's constructor
    // const resizeObserverService = spectator.inject(ResizeObserverService);
    // spyOn(resizeObserverService, 'observe');
    // spyOn(resizeObserverService, 'unobserve');

    const ionModalWrapper = document.createElement('div');
    const ionModal = document.createElement('div');
    ionModal['dismiss'] = jasmine.createSpy('dissmissSpy').and.resolveTo(true);
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
    <kirby-page-progress> </kirby-page-progress>
  `,
})
export class StaticPageProgressEmbeddedComponent {}
@Component({
  template: `
    <kirby-page-progress *ngIf="showPageProgress"> </kirby-page-progress>
  `,
})
export class DynamicPageProgressEmbeddedComponent {
  showPageProgress = false;
}
