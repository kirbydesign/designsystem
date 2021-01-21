import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { InlineFooterComponent } from './inline-footer.component';
import { ModalWrapperComponent } from '../../modal-wrapper/modal-wrapper.component';
import { TestHelper } from '../../../../testing/test-helper';
import { ResizeObserverService } from '../../../shared';
import {
  DynamicFooterEmbeddedComponent,
  InlineFooterEmbeddedComponent,
  InputEmbeddedComponent,
  StaticFooterEmbeddedComponent,
} from '../../modal-wrapper/modal-wrapper.testbuilder';
import { ModalConfig } from '../../modal-wrapper/config/modal-config';
import { WindowRef } from '../../../../types';
import { IconComponent } from '../../../icon';
import { ButtonComponent } from '../../../button/button.component';
import { ModalFooterComponent } from '../modal-footer.component';

const createComponent = createComponentFactory({
  component: ModalWrapperComponent,
  imports: [RouterTestingModule],
  entryComponents: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons],
  providers: [
    {
      provide: WindowRef,
      useValue: window,
    },
  ],
  declarations: [],
});

describe('InlineFooterComponent', () => {
  let spectator: Spectator<ModalWrapperComponent>;
  let config: ModalConfig;

  describe('Component instantiation', () => {
    let component: InlineFooterComponent;
    let fixture: ComponentFixture<InlineFooterComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [InlineFooterComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(InlineFooterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create instanse', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('hosted in ModalWrapperComponent', () => {
    beforeEach(() => {
      config = {
        title: null,
        component: StaticFooterEmbeddedComponent, // InlineFooterEmbeddedComponent,
        flavor: null,
      };
      spectator = createComponent({
        props: {
          config: config,
        },
        detectChanges: false,
      });

      // remove this mock
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
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    describe(`should find `, () => {
      it('modal footer and inline footer', async () => {
        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();
        const modalFooter = spectator.element.querySelector('kirby-modal-footer');
        expect(modalFooter).not.toBeNull();
        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();
      });
    });

    describe(`should set custom CSS property value'--margin-top' on inline footer`, () => {
      beforeEach(async () => {
        // await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
        // await TestHelper.waitForResizeObserver();
        //   await TestHelper.whenTrue(() => spectator.component['viewportResized']);
      });

      afterEach(() => {
        TestHelper.resetTestWindow();
      });

      it('to 0 property value for small phone device', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phonesmall);
        await TestHelper.waitForResizeObserver();

        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        // should not be calling private method. Verify that gthe method is called through the event system
        // @ts-ignore
        // spectator.fixture.componentInstance.setInlineFooterPosition();
        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');

        // get CssProperty
        const value = inlineFooter.style.getPropertyValue('--margin-top');

        console.log(value);
        expect(value).toEqual('0');
      });

      it('to 0 property value for phone', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
        await TestHelper.waitForResizeObserver();

        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();

        // get CssProperty
        const value = inlineFooter.style.getPropertyValue('--margin-top');

        expect(value).toEqual('0');
      });

      it('to not 0 property value', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phablet);
        await TestHelper.waitForResizeObserver();

        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();

        // get CssProperty
        const value = inlineFooter.style.getPropertyValue('--margin-top');

        //expect value must be found.
        expect(value).not.toEqual('0');
      });

      it('to 608 property value for tablet size', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);
        await TestHelper.waitForResizeObserver();

        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();

        // get CssProperty
        const value = inlineFooter.style.getPropertyValue('--margin-top');

        //expect value must be found.
        expect(value).toEqual('608');
      });

      it('to 608 property value for desktop size', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
        await TestHelper.waitForResizeObserver();

        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();

        // get CssProperty
        const value = inlineFooter.style.getPropertyValue('--margin-top');

        //expect value must be found.
        expect(value).toEqual('608');
      });

      it('to change position when footer is hidden for desktop size', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
        await TestHelper.waitForResizeObserver();

        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();

        // get CssProperty
        const prevValue = parseInt(inlineFooter.style.getPropertyValue('--margin-top'));

        //expect value must be found.
        expect(prevValue).toEqual(608);

        embeddedComponent.showFooter = false;
        spectator.detectChanges();

        const postValue: number = parseInt(inlineFooter.style.getPropertyValue('--margin-top'));

        //expect value must be found.
        expect(prevValue).toBeLessThan(postValue);
      });
    });
  });
});
