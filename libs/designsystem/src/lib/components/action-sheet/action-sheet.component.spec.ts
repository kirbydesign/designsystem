import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { PlatformService } from '../..';
import { OpenState } from '../../models';
import { TestHelper } from '../../testing/test-helper';
import { WindowRef } from '../../types';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon';
import { ModalController } from '../modal';

import { ActionSheetPopoutComponent } from './action-sheet-popout/action-sheet-popout.component';
import { ActionSheetComponent } from './action-sheet.component';

describe('ActionSheetComponent', () => {
  let spectator: SpectatorHost<ActionSheetComponent>;
  let popout;
  const openDelayInMs = ActionSheetComponent.OPEN_DELAY_IN_MS;
  const modalControllerSpy = jasmine.createSpyObj('ModalController', ['showActionSheet']);
  const mockPlatformService = { isTouch: () => false };
  const createHost = createHostFactory({
    component: ActionSheetComponent,
    declarations: [
      MockComponent(IconComponent),
      MockComponent(ButtonComponent),
      MockComponent(ActionSheetPopoutComponent),
    ],
    providers: [
      {
        provide: WindowRef,
        useValue: window,
      },
      {
        provide: ModalController,
        useValue: modalControllerSpy,
      },
      {
        provide: PlatformService,
        useValue: mockPlatformService,
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost('<kirby-action-sheet></kirby-action-sheet>');

    spectator.component.header = 'Test header';
    spectator.component.subheader = 'Test subheader';
    spectator.component.items = [
      { id: '1', text: 'Action 1' },
      { id: '2', text: 'Action 2' },
      { id: '3', text: 'Action 3' },
    ];
    spectator.component.cancelButtonText = 'Test cancel button text';
    popout = spectator.element.getElementsByTagName('kirby-action-sheet-popout')[0];
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('icon', () => {
    it('should have default icon', () => {
      expect(spectator.component.triggerIconName).toEqual('more');
    });

    it('should support custom icon', () => {
      const iconName = 'pension';
      spectator.setInput('triggerIconName', iconName);
      const icon = spectator.query(IconComponent);
      expect(icon.name).toEqual(iconName);
    });
  });

  describe('text', () => {
    it('should have no initial text', () => {
      const button = spectator.query('button');
      expect(button.textContent).toEqual('');
    });

    it('should render custom button text', () => {
      const buttonText = 'Custom text';
      spectator.setInput('triggerText', buttonText);
      const button = spectator.query('button');
      expect(button.textContent).toEqual(buttonText);
    });
  });

  describe('popout', () => {
    beforeEach(() => {
      mockPlatformService.isTouch = () => false;
    });

    it('should open and focus on click', fakeAsync(() => {
      spectator.click('button');
      tick(openDelayInMs);
      expect(spectator.component.isOpen).toBeTruthy();
      expect(spectator.element).toBeFocused();
    }));

    it('should toggle closed when clicked and open', () => {
      spectator.component['state'] = OpenState.open;
      spectator.detectChanges();
      expect(popout).toHaveComputedStyle({ display: 'block' });

      spectator.click('button');
      popout = spectator.query('kirby-action-sheet-popout');

      expect(spectator.component['state']).toBe(+OpenState.closed);
      expect(spectator.component.isOpen).toBeFalse();
      expect(spectator.element.classList).not.toContain('is-open');
      expect(popout).toHaveComputedStyle({ display: 'none' });
    });

    it('should close when trigger blures', () => {
      spectator.component['state'] = OpenState.open;
      spectator.detectChanges();
      expect(popout).toHaveComputedStyle({ display: 'block' });

      spectator.blur();
      expect(popout).toHaveComputedStyle({ display: 'none' });
    });

    it('should call modalController on touch', () => {
      spectator.component.isTouch = true;
      spectator.click('button');
      expect(modalControllerSpy.showActionSheet).toHaveBeenCalled();
    });
  });
});
