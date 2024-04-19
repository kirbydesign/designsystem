import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { PageProgressComponent, PageTitleComponent } from '@kirbydesign/designsystem/page';
import { IconModule } from '@kirbydesign/designsystem/icon';
import {
  CanDismissHelper,
  ModalFooterComponent,
  ModalWrapperComponent,
} from '@kirbydesign/designsystem/modal';

import {
  DynamicFooterEmbeddedComponent,
  DynamicPageProgressEmbeddedComponent,
  ModalWrapperTestBuilder,
  StaticFooterEmbeddedComponent,
  StaticPageProgressEmbeddedComponent,
  TitleEmbeddedComponent,
} from './modal-wrapper.testbuilder';

describe('ModalWrapperComponent + ModalFooterComponent', () => {
  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    imports: [RouterTestingModule, ModalFooterComponent, IconModule],
    entryComponents: [StaticFooterEmbeddedComponent, DynamicFooterEmbeddedComponent],
    mocks: [CanDismissHelper],
  });

  let modalWrapperTestBuilder: ModalWrapperTestBuilder;
  let spectator: Spectator<ModalWrapperComponent>;

  beforeEach(() => {
    modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent);
  });

  describe('when footer is static and embedded in component', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.withStaticFooter().build();
      spectator.detectChanges();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should move embedded footer to wrapper component', () => {
      const ionContentElement = spectator.query('ion-content');
      const embeddedComponentElement = ionContentElement.firstElementChild;
      const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
      expect(embeddedFooter).toBeNull();
      const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
      expect(footerAsWrapperChild).not.toBeNull();
    });

    describe(`should set custom CSS property '--keyboard-offset' on embedded footer`, () => {
      const keyboardHeight = 400;

      it('to a value', () => {
        const kirbyModalFooter = spectator.element.querySelector<HTMLElement>(
          ':scope > kirby-modal-footer'
        );
        spectator.component._onKeyboardShow(keyboardHeight);
        expect(kirbyModalFooter.style.getPropertyValue('--keyboard-offset')).toBeDefined();
      });

      it('to 0 when no keyboard overlap', () => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.element.style.position = 'fixed';
        spectator.element.style.bottom = `${keyboardHeight + 200}px`;
        spectator.component._onKeyboardShow(keyboardHeight);
        const keyboardOverlap = 0;
        expect(kirbyModalFooter).toHaveComputedStyle({
          '--keyboard-offset': `${keyboardOverlap}px`,
        });
      });

      it('to value of overlap when keyboard overlaps partially', () => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.element.style.position = 'fixed';
        spectator.element.style.bottom = `${keyboardHeight - 200}px`;
        spectator.component._onKeyboardShow(keyboardHeight);
        const keyboardOverlap = 200;
        expect(kirbyModalFooter).toHaveComputedStyle({
          '--keyboard-offset': `${keyboardOverlap}px`,
        });
      });

      it('to keyboard height when keyboard overlaps completely', () => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.element.style.position = 'fixed';
        spectator.element.style.bottom = '0px';
        spectator.component._onKeyboardShow(keyboardHeight);
        const keyboardOverlap = keyboardHeight;
        expect(kirbyModalFooter).toHaveComputedStyle({
          '--keyboard-offset': `${keyboardOverlap}px`,
        });
      });
    });
  });

  describe('when footer is dynamic and embedded in component', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.flavor('modal').withDynamicFooter().build();
      spectator.detectComponentChanges();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should move embedded footer to wrapper component when rendered', async () => {
      const footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).toBeNull();

      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
      embeddedComponent.showFooter = true;
      spectator.detectChanges();
      await TestHelper.waitForResizeObserver();

      const ionContentElement = spectator.query('ion-content');
      const embeddedComponentElement = ionContentElement.firstElementChild;
      const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
      expect(embeddedFooter).toBeNull();
      const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
      expect(footerAsWrapperChild).not.toBeNull();
    });

    /* Move to modal footer integration tests */
    it('should remove embedded footer from wrapper component when not rendered', async () => {
      let footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).toBeNull();

      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
      embeddedComponent.showFooter = true;
      spectator.detectChanges();
      await TestHelper.waitForResizeObserver();

      const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
      expect(footerAsWrapperChild).not.toBeNull();

      embeddedComponent.showFooter = false;
      spectator.detectChanges();
      footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).toBeNull();
    });

    it('should render changes to embedded footer inside wrapper component', async () => {
      const footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).not.toHaveClass('enabled');
      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
      embeddedComponent.showFooter = true;
      spectator.detectChanges();
      await TestHelper.waitForResizeObserver();

      const ionContentElement = spectator.query('ion-content');
      const embeddedComponentElement = ionContentElement.firstElementChild;
      const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
      expect(embeddedFooter).toBeNull();
      const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
      expect(footerAsWrapperChild).not.toBeNull();

      embeddedComponent.isEnabled = true;
      spectator.detectChanges();
      expect(footerAsWrapperChild).toHaveClass('enabled');
    });

    describe(`should set custom CSS property '--keyboard-offset' on embedded footer`, () => {
      const keyboardHeight = 400;

      beforeEach(async () => {
        const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();
        await TestHelper.waitForResizeObserver();
        TestHelper.scrollMainWindowToTop();
      });

      it('to a value', () => {
        const kirbyModalFooter = spectator.element.querySelector<HTMLElement>(
          ':scope > kirby-modal-footer'
        );
        spectator.component._onKeyboardShow(keyboardHeight);
        expect(kirbyModalFooter.style.getPropertyValue('--keyboard-offset')).toBeDefined();
      });

      it('to 0 when no keyboard overlap', () => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.element.style.position = 'fixed';
        spectator.element.style.bottom = `${keyboardHeight + 200}px`;
        spectator.component._onKeyboardShow(keyboardHeight);
        const keyboardOverlap = 0;
        expect(kirbyModalFooter).toHaveComputedStyle({
          '--keyboard-offset': `${keyboardOverlap}px`,
        });
      });

      it('to value of overlap when keyboard overlaps partially', () => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.element.style.position = 'fixed';
        spectator.element.style.bottom = `${keyboardHeight - 200}px`;
        spectator.component._onKeyboardShow(keyboardHeight);
        const keyboardOverlap = 200;
        expect(kirbyModalFooter).toHaveComputedStyle({
          '--keyboard-offset': `${keyboardOverlap}px`,
        });
      });

      it('to keyboard height when keyboard overlaps completely', () => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.element.style.position = 'fixed';
        spectator.element.style.bottom = '0px';
        spectator.component._onKeyboardShow(keyboardHeight);
        const keyboardOverlap = keyboardHeight;
        expect(kirbyModalFooter).toHaveComputedStyle({
          '--keyboard-offset': `${keyboardOverlap}px`,
        });
      });
    });
  });
});

describe('ModalWrapperComponent + PageTitleComponent', () => {
  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    imports: [RouterTestingModule],
    entryComponents: [TitleEmbeddedComponent],
    declarations: [PageTitleComponent],
    mocks: [CanDismissHelper],
  });

  let modalWrapperTestBuilder: ModalWrapperTestBuilder;
  let spectator: Spectator<ModalWrapperComponent>;

  const testTitle = 'This is a long test title';

  beforeEach(() => {
    modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent)
      .flavor('modal')
      .title(testTitle)
      .component(TitleEmbeddedComponent);
  });

  afterEach(() => {
    spectator.fixture.destroy();
  });

  describe("when 'collapseTitle' is enabled", () => {
    let ionContentElement: HTMLIonContentElement;
    let ionTitleElement: HTMLIonTitleElement;

    beforeEach(() => {
      spectator = modalWrapperTestBuilder.collapsibleTitle(true).build();

      ionContentElement = spectator.query('ion-content');
      ionTitleElement = spectator.query('ion-title');
    });

    it('should place the title in both the content & the header', () => {
      const contentTitle = ionContentElement.querySelector('kirby-page-title').innerHTML;
      const headerTitle = ionTitleElement.querySelector('kirby-page-title').innerHTML;

      expect(contentTitle).toBe(testTitle);
      expect(headerTitle).toBe(testTitle);
    });
  });

  describe("when 'collapseTitle' is disabled", () => {
    let ionTitle: HTMLIonTitleElement;

    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
      ionTitle = spectator.query('ion-header kirby-page-title');
    });

    it('should place the title in the header', () => {
      expect(ionTitle.innerHTML).toEqual(testTitle);
    });
  });
});

describe('ModalWrapperComponent + PageProgressComponent', () => {
  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    imports: [RouterTestingModule],
    entryComponents: [StaticPageProgressEmbeddedComponent, DynamicPageProgressEmbeddedComponent],
    declarations: [PageProgressComponent],
    mocks: [CanDismissHelper],
  });

  let modalWrapperTestBuilder: ModalWrapperTestBuilder;
  let spectator: Spectator<ModalWrapperComponent>;

  beforeEach(() => {
    modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent).flavor('modal');
  });

  afterEach(() => {
    // Ensure any observers are destroyed:
    spectator.fixture.destroy();
  });

  describe('when page progress is embedded in component and is', () => {
    describe('static', () => {
      beforeEach(() => {
        spectator = modalWrapperTestBuilder.withStaticPageProgress().build();
        spectator.detectComponentChanges();
      });

      it('should move embedded page progress to wrapper component', () => {
        const ionContentElement = spectator.query('ion-content');
        const ionToolbarElement = spectator.query('ion-toolbar');
        const embeddedComponentElement = ionContentElement.firstElementChild;
        const embeddedPageProgress = embeddedComponentElement.querySelector('kirby-page-progress');
        const pageProgressAsIonToolbarChild =
          ionToolbarElement.querySelector('kirby-page-progress');

        expect(embeddedPageProgress).toBeNull();
        expect(pageProgressAsIonToolbarChild).not.toBeNull();
      });
    });

    describe('dynamic', () => {
      beforeEach(() => {
        spectator = modalWrapperTestBuilder.withDynamicPageProgress().build();
        spectator.detectComponentChanges();
      });

      it('should move embedded page progress to wrapper component when rendered', async () => {
        const pageProgressContent = spectator.element.querySelector('kirby-page-progress');
        expect(pageProgressContent).toBeNull();

        const embeddedComponent = spectator.query(DynamicPageProgressEmbeddedComponent);
        embeddedComponent.showPageProgress = true;
        spectator.detectChanges();
        await TestHelper.waitForResizeObserver();

        const ionContentElement = spectator.query('ion-content');
        const ionToolbarElement = spectator.query('ion-toolbar');
        const embeddedComponentElement = ionContentElement.firstElementChild;
        const embeddedPageProgress = embeddedComponentElement.querySelector('kirby-page-progress');
        const pageProgressAsIonToolbarChild =
          ionToolbarElement.querySelector('kirby-page-progress');
        expect(embeddedPageProgress).toBeNull();
        expect(pageProgressAsIonToolbarChild).not.toBeNull();
      });

      it('should remove embedded page progress content from wrapper component when not rendered', async () => {
        const pageProgress = spectator.element.querySelector('kirby-page-progress');
        expect(pageProgress).toBeNull();

        const embeddedComponent = spectator.query(DynamicPageProgressEmbeddedComponent);
        embeddedComponent.showPageProgress = true;
        spectator.detectChanges();
        await TestHelper.waitForResizeObserver();

        const ionToolbarElement = spectator.query('ion-toolbar');
        let pageProgressAsIonToolbarChild = ionToolbarElement.querySelector('kirby-page-progress');
        expect(pageProgressAsIonToolbarChild).not.toBeNull();

        embeddedComponent.showPageProgress = false;
        spectator.detectChanges();

        pageProgressAsIonToolbarChild = ionToolbarElement.querySelector('kirby-page-progress');
        expect(pageProgressAsIonToolbarChild).toBeNull();
      });
    });
  });
});
