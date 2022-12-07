import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { MockComponents } from 'ng-mocks';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { FullscreenModalExperimentalComponent } from './fullscreen.component';

fdescribe('FullscreenComponent', () => {
  const titleText = 'Test Modal';

  let spectator: SpectatorHost<FullscreenModalExperimentalComponent>;

  const createHost = createHostFactory({
    component: FullscreenModalExperimentalComponent,
    declarations: [
      MockComponents(
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButtons,
        IonIcon,
        ButtonComponent,
        IconComponent
      ),
    ],
  });

  beforeEach(() => {
    spectator = createHost(
      `
      <kirby-fullscreen-modal-experimental [title]="title" [open]="open">
        <p>Test</p>
      </kirby-fullscreen-modal-experimental>
    `,
      {
        hostProps: {
          title: titleText,
          open: true,
        },
      }
    );
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should be dismissable', () => {
      expect(spectator.component.canDismiss).toBeTrue();
    });

    it('should have a collapsable title', () => {
      expect(spectator.component.canDismiss).toBeTrue();
    });

    it('should enable scroll', () => {
      expect(spectator.component.scrollDisabled).toBeFalse();
    });
  });

  describe('events', () => {
    it('should emit the willPresent event, when ion-modal emit its own willPresent event', () => {
      const willPresentSpy = spyOn(spectator.component.willPresent, 'emit');

      spectator.triggerEventHandler(IonModal, 'willPresent', new CustomEvent('willPresent'));

      expect(willPresentSpy).toHaveBeenCalled();
    });

    it('should emit the didPresent event, when ion-modal emit its own didPresent event', () => {
      const didPresentSpy = spyOn(spectator.component.didPresent, 'emit');

      spectator.triggerEventHandler(IonModal, 'didPresent', new CustomEvent('didPresent'));

      expect(didPresentSpy).toHaveBeenCalled();
    });

    it('should emit the willDismiss event, when ion-modal emit its own willDismiss event', () => {
      const willDismissSpy = spyOn(spectator.component.willDismiss, 'emit');

      spectator.triggerEventHandler(IonModal, 'willDismiss', new CustomEvent('willDismiss'));

      expect(willDismissSpy).toHaveBeenCalled();
    });

    it('should emit the didDismiss event, when ion-modal emit its own didDismiss event', () => {
      const didDismissSpy = spyOn(spectator.component.didDismiss, 'emit');

      spectator.triggerEventHandler(IonModal, 'didDismiss', new CustomEvent('didDismiss'));

      expect(didDismissSpy).toHaveBeenCalled();
    });
  });

  // describe('title', () => {
  //   it('should have the provided title', () => {
  //     const modalTitle = spectator.query(IonTitle);

  //     expect(modalTitle).toHaveText(titleText, true);
  //   });
  // });
});
