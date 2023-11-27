import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { IonModal } from '@ionic/angular';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ModalComponent } from './modal.component';

describe('Modal Component', () => {
  const titleText = 'Test Modal';

  let spectator: SpectatorHost<ModalComponent>;

  const createHost = createHostFactory({
    component: ModalComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost(
      `
      <kirby-modal>
        <p>Test</p>
      </kirby-modal>
    `
    );

    TestHelper.disableAnimationsInTest();
  });

  afterEach(() => {
    spectator.component.open = false;
    spectator.detectChanges();
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should be dismissable', () => {
      expect(spectator.component.canDismiss).toBeTrue();
    });

    it('should have a collapsable title', () => {
      expect(spectator.component.collapseTitle).toBeTrue();
    });

    it('should enable scroll', () => {
      expect(spectator.component.scrollDisabled).toBeFalse();
    });

    it('should have a flavor of "modal"', () => {
      expect(spectator.component.flavor).toBe('modal');
    });
  });

  describe('events', () => {
    it('should emit the willPresent event, when ion-modal emit its own willPresent event', () => {
      const willPresentSpy = spyOn(spectator.component.willPresent, 'emit');

      spectator.triggerEventHandler(IonModal, 'willPresent', new CustomEvent('willPresent'));

      expect(willPresentSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the didPresent event, when ion-modal emit its own didPresent event', () => {
      const didPresentSpy = spyOn(spectator.component.didPresent, 'emit');

      spectator.triggerEventHandler(IonModal, 'didPresent', new CustomEvent('didPresent'));

      expect(didPresentSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the willDismiss event, when ion-modal emit its own willDismiss event', () => {
      const willDismissSpy = spyOn(spectator.component.willDismiss, 'emit');

      spectator.triggerEventHandler(IonModal, 'willDismiss', new CustomEvent('willDismiss'));

      expect(willDismissSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the didDismiss event, when ion-modal emit its own didDismiss event', () => {
      const didDismissSpy = spyOn(spectator.component.didDismiss, 'emit');

      spectator.triggerEventHandler(IonModal, 'didDismiss', new CustomEvent('didDismiss'));

      expect(didDismissSpy).toHaveBeenCalledTimes(1);
    });
  });
});
