import { Component, Inject } from '@angular/core';
import { Spectator, SpectatorFactory } from '@ngneat/spectator';

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { ModalWrapperComponent } from './modal-wrapper.component';

export class ModalWrapperTestBuilder {
  private config: ModalConfig = {
    component: null,
    flavor: null,
  };

  constructor(private readonly createComponent: SpectatorFactory<ModalWrapperComponent>) {}

  title(title: string) {
    this.config['componentProps'] = { ...this.config?.componentProps, title };
    return this;
  }

  collapsibleTitle(value: boolean) {
    this.config['collapseTitle'] = value;
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
    spyOn(spectator.element, 'closest').withArgs('ion-modal').and.returnValue(ionModal);

    spectator.component['getIonModalWrapperElement'] = () => {
      return ionModalWrapper;
    };

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
    <kirby-page-progress></kirby-page-progress>
  `,
})
export class StaticPageProgressEmbeddedComponent {}

@Component({
  template: `
    <kirby-page-progress *ngIf="showPageProgress"></kirby-page-progress>
  `,
})
export class DynamicPageProgressEmbeddedComponent {
  showPageProgress = false;
}

@Component({
  template: `
    <kirby-page-title>{{ _title }}</kirby-page-title>
  `,
})
export class TitleEmbeddedComponent {
  _title: string;
  constructor(@Inject(COMPONENT_PROPS) { title }: any) {
    this._title = title;
  }
}

@Component({
  template: `
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aperiam deserunt
      dolore error esse laborum magni natus nihil optio perferendis placeat, quae sed, sequi sunt
      totam voluptatem! Dicta, quaerat!
    </p>
    <p>
      Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut! Ad aliquid beatae cum
      esse et eveniet facere natus numquam obcaecati qui quia quisquam quo repellat repudiandae sit,
      soluta voluptatibus!
    </p>
    <p>
      Aspernatur dolore enim incidunt libero molestiae nostrum quasi? Accusamus aut culpa dolores
      doloribus laborum nesciunt voluptates! Consectetur cumque doloremque eius esse et excepturi
      hic, inventore mollitia nisi, reiciendis, tempora unde!
    </p>
    <p>
      Blanditiis, cupiditate distinctio earum illo impedit laborum velit veritatis. Accusamus
      adipisci alias aperiam, assumenda corporis culpa cum debitis exercitationem impedit laborum
      possimus quam qui repellat, saepe similique sint soluta. Unde.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aperiam deserunt
      dolore error esse laborum magni natus nihil optio perferendis placeat, quae sed, sequi sunt
      totam voluptatem! Dicta, quaerat!
    </p>
    <p>
      Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut! Ad aliquid beatae cum
      esse et eveniet facere natus numquam obcaecati qui quia quisquam quo repellat repudiandae sit,
      soluta voluptatibus!
    </p>
    <p>
      Aspernatur dolore enim incidunt libero molestiae nostrum quasi? Accusamus aut culpa dolores
      doloribus laborum nesciunt voluptates! Consectetur cumque doloremque eius esse et excepturi
      hic, inventore mollitia nisi, reiciendis, tempora unde!
    </p>
    <p>
      Blanditiis, cupiditate distinctio earum illo impedit laborum velit veritatis. Accusamus
      adipisci alias aperiam, assumenda corporis culpa cum debitis exercitationem impedit laborum
      possimus quam qui repellat, saepe similique sint soluta. Unde.
    </p>
  `,
})
export class DummyContentEmbeddedComponent {}
