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
      /*
      const resizeObserverService = spectator.inject(ResizeObserverService);
      spyOn(resizeObserverService, 'observe');
      spyOn(resizeObserverService, 'unobserve');
      spectator.detectComponentChanges();
*/

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
    describe(`should set custom CSS property value'--margin-top' on inline footer`, () => {
      beforeEach(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);

        await TestHelper.waitForResizeObserver();

        //   await TestHelper.whenTrue(() => spectator.component['viewportResized']);
      });

      afterEach(() => {
        TestHelper.resetTestWindow();
      });

      it('to a NOT empty property value', async () => {
        const embeddedComponent = spectator.query(InlineFooterEmbeddedComponent);
        embeddedComponent.showFooter = true;
        spectator.detectChanges();

        // calling private method
        // @ts-ignore
        // spectator.fixture.componentInstance.setInlineFooterPosition();
        const modalFooter = spectator.element.querySelector('kirby-modal-footer');
        expect(modalFooter).not.toBeNull();
        const inlineFooter = spectator.element.querySelector<HTMLElement>('kirby-inline-footer');
        expect(inlineFooter).not.toBeNull();

        // get CssProperty
        const value = inlineFooter.style.getPropertyValue('--margin-top');

        console.log(value);
        expect(value).toEqual('');
      });
    });
  });
});
