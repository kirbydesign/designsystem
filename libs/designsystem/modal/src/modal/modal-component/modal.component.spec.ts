import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { IonModal } from '@ionic/angular';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { CanDismissHelper } from '../services/can-dismiss.helper';
import { AlertHelper } from '../services/alert.helper';
import { ModalComponent } from './modal.component';

describe('Modal Component', () => {
  let spectator: SpectatorHost<ModalComponent>;

  const createHost = createHostFactory({
    component: ModalComponent,
    imports: [TestHelper.ionicModuleForTest],
    providers: [CanDismissHelper, AlertHelper],
  });

  beforeEach(() => {
    spectator = createHost(
      `
      <kirby-modal>
        <p>Test</p>
      </kirby-modal>
    `
    );
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should be dismissable', () => {
      expect(spectator.component._canDismiss).toBeTrue();
    });

    it('should have a collapsible title', () => {
      expect(spectator.component.collapseTitle).toBeTrue();
    });

    it('should not have scroll disabled', () => {
      expect(spectator.component.scrollDisabled).toBeFalse();
    });

    it('should have a flavor of "modal"', () => {
      expect(spectator.component.flavor).toBe('modal');
    });
  });

  describe('events', () => {
    it('should emit the willPresent event, when ion-modal emits its own willPresent event', () => {
      const willPresentSpy = spyOn(spectator.component.willPresent, 'emit');

      spectator.triggerEventHandler(IonModal, 'willPresent', new CustomEvent('willPresent'));

      expect(willPresentSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the didPresent event, when ion-modal emits its own didPresent event', () => {
      const didPresentSpy = spyOn(spectator.component.didPresent, 'emit');

      spectator.triggerEventHandler(IonModal, 'didPresent', new CustomEvent('didPresent'));

      expect(didPresentSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the willDismiss event, when ion-modal emits its own willDismiss event', () => {
      const willDismissSpy = spyOn(spectator.component.willDismiss, 'emit');

      spectator.triggerEventHandler(IonModal, 'willDismiss', new CustomEvent('willDismiss'));

      expect(willDismissSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the didDismiss event, when ion-modal emits its own didDismiss event', () => {
      const didDismissSpy = spyOn(spectator.component.didDismiss, 'emit');

      spectator.triggerEventHandler(IonModal, 'didDismiss', new CustomEvent('didDismiss'));

      expect(didDismissSpy).toHaveBeenCalledTimes(1);
    });
  });
});
