import { Component } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular/standalone';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { of } from 'rxjs';
import { Overlay } from '../../modal.interfaces';
import { AlertHelper } from './alert.helper';

@Component({
  template: `
    <h2>Dummy Component</h2>
  `,
  standalone: false,
})
class EmbeddedDummyComponent {}

describe('AlertHelper', () => {
  let spectator: SpectatorService<AlertHelper>;
  let alertHelper: AlertHelper;
  const backdropOpacity = '0.4';

  const createService = createServiceFactory({
    service: AlertHelper,
    imports: [TestHelper.ionicModuleForTest],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
  });

  beforeEach(() => {
    TestHelper.disableAnimationsInTest();
    spectator = createService();
    alertHelper = spectator.service;
  });

  describe('showAlert', () => {
    let overlay: Overlay;
    let ionModal: HTMLIonModalElement;
    let backdrop: HTMLIonBackdropElement;
    let ionModalController: IonicModalController;
    const title = 'Alert';

    beforeEach(async () => {
      ionModalController = spectator.inject(IonicModalController);
      overlay = await alertHelper.showAlert({ title });
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await overlay.dismiss();
    });

    // Flaky test
    xit('alert should have correct backdrop style', () => {
      expect(ionModal).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
    });

    it('modal wrapper should have correct max width', () => {
      const modalWrapper = ionModal.shadowRoot.querySelector('.modal-wrapper');
      expect(modalWrapper).toHaveComputedStyle({
        'max-width': DesignTokenHelper.compactModalMaxWidth(),
      });
    });

    it('alert should have correct backdrop style when opened on top of a modal', async () => {
      await overlay.dismiss();
      const ionModalElement = await ionModalController.create({
        component: EmbeddedDummyComponent,
      });
      await ionModalElement.present();
      const modalIonModal = await ionModalController.getTop();
      expect(modalIonModal).toBeTruthy();

      overlay = await alertHelper.showAlert({ title: 'Alert on top of modal' });

      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
      await ionModalElement.dismiss();
    });

    it('should set alert title text content as modal label', async () => {
      await TestHelper.whenReady(ionModal);
      const dialogElement = ionModal.shadowRoot.querySelector('[role="dialog"]');
      await TestHelper.whenTrue(() => dialogElement.hasAttribute('aria-label'));

      expect(dialogElement.getAttribute('aria-label')).toBe(title);
    });

    it('should set alert title as h2', async () => {
      await TestHelper.whenReady(ionModal);
      const kirbyAlert = ionModal.querySelector('kirby-alert');
      const titleTag = kirbyAlert.querySelector('.title')?.tagName?.toLowerCase();
      expect(titleTag).toBe('h2');
    });
  });

  describe('getComponentProps', () => {
    const getComponentProps = (config) => alertHelper['getComponentProps'](config);
    it('should return okBtn as string when okBtn is a string', () => {
      const config = { title: 'test', okBtn: 'OK' };
      const props = getComponentProps(config);
      expect(props.okBtn).toBe('OK');
    });

    it('should return okBtn as observable when okBtn is an observable', () => {
      const okBtnObservable = of('OK');
      const config = { title: 'test', okBtn: okBtnObservable };
      const props = getComponentProps(config);
      expect(props.okBtn).toEqual(okBtnObservable);
    });

    it('should return okBtn as text property when okBtn is an object with text property', () => {
      const config = { title: 'test', okBtn: { text: 'OK', isDestructive: true } };
      const props = getComponentProps(config);
      expect(props.okBtn).toBe('OK');
    });

    it('should return okBtnIsDestructive as true when okBtn is an object with isDestructive set to true', () => {
      const config = { title: 'test', okBtn: { text: 'OK', isDestructive: true } };
      const props = getComponentProps(config);
      expect(props.okBtnIsDestructive).toBeTrue();
    });

    it('should return cancelBtn as string when cancelBtn is a string', () => {
      const config = { title: 'test', okBtn: 'OK' };
      const props = getComponentProps(config);
      expect(props.okBtn).toBe('OK');
    });

    it('should return iconName and iconThemeColor from config icon', () => {
      const config = {
        title: 'test',
        icon: { name: 'alert-icon', themeColor: 'danger' },
      };
      const props = getComponentProps(config);
      expect(props.iconName).toBe('alert-icon');
      expect(props.iconThemeColor).toBe('danger');
    });
  });
});
