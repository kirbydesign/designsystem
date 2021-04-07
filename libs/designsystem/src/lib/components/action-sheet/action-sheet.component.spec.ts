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
      spectator.component.triggerIconName = 'pension';
      spectator.detectChanges();
      const icon = spectator.element.getElementsByTagName('kirby-icon')[0];
      expect(icon.getAttribute('ng-reflect-name')).toEqual('pension');
    });
  });

  describe('text', () => {
    it('should have no initial text', () => {
      const button = spectator.element.getElementsByTagName('button')[0];
      expect(button.innerText).toEqual('');
    });

    it('should render custom button text', () => {
      const buttonText = 'Custom text';
      spectator.component.triggerText = buttonText;
      spectator.detectChanges();
      const button = spectator.element.getElementsByTagName('button')[0];
      expect(button.innerText).toEqual(buttonText);
    });
  });

  describe('popout', () => {
    beforeEach(() => {
      mockPlatformService.isTouch = () => false;
      spectator.detectChanges();
    });

    it('should toggle open on click', () => {
      spectator.component['state'] = OpenState.closed;
      spectator.click('button');
      spectator.detectChanges();
      expect(popout).toHaveComputedStyle({ display: 'block' });
    });

    it('should toggle closed when clicked and open', () => {
      spectator.component['state'] = OpenState.open;
      spectator.click('button');
      spectator.detectChanges();
      expect(popout).toHaveComputedStyle({ display: 'none' });
    });

    it('should close (delayed) when trigger blures', async () => {
      spectator.component['state'] = OpenState.open;
      spectator.blur('button');
      await TestHelper.whenTrue(() => !spectator.component.isOpen, 600);
      spectator.detectChanges();
      expect(popout).toHaveComputedStyle({ display: 'none' });
    });

    it('should call modalController on touch', () => {
      mockPlatformService.isTouch = () => true;
      spectator.click('button');
      spectator.detectChanges();
      expect(modalControllerSpy.showActionSheet).toHaveBeenCalled();
    });
  });
});
