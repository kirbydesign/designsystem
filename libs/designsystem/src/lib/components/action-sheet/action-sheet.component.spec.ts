import { fakeAsync } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { PlatformService } from '../..';
import { OpenState } from '../../models';
import { WindowRef } from '../../types';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon';
import { ModalController } from '../modal';

import { ActionSheetPopoutComponent } from './action-sheet-popout/action-sheet-popout.component';
import { ActionSheetComponent } from './action-sheet.component';

describe('ActionSheetComponent', () => {
  let spectator: SpectatorHost<ActionSheetComponent>;
  let popout;
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

    it('should toggle open on click', () => {
      expect(spectator.component['state']).toEqual(OpenState.closed);
      expect(popout).toHaveComputedStyle({ display: 'none' });

      spectator.click('button');

      expect(spectator.component['state']).toEqual(OpenState.open);
      expect(popout).toHaveComputedStyle({ display: 'block' });
    });

    it('should toggle closed when clicked and open', () => {
      spectator.component['state'] = OpenState.open;
      spectator.detectChanges();
      expect(popout).toHaveComputedStyle({ display: 'block' });

      spectator.click('button');

      expect(popout).toHaveComputedStyle({ display: 'none' });
    });

    it('should close (delayed) when trigger blures', fakeAsync(() => {
      spectator.component['state'] = OpenState.open;
      spectator.blur('button');
      spectator.tick(500); // TODO: Refactor blur event OR get magic number from host component
      expect(popout).toHaveComputedStyle({ display: 'none' });
    }));

    it('should call modalController on touch', () => {
      mockPlatformService.isTouch = () => true;
      spectator.click('button');
      expect(modalControllerSpy.showActionSheet).toHaveBeenCalled();
    });
  });
});
