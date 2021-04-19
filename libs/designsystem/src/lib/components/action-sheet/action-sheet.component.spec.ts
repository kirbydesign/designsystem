import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, Spectator } from '@ngneat/spectator';
import { PlatformService } from 'libs/designsystem/src';
import { MockComponent } from 'ng-mocks';

import { OpenState } from '../../models';
import { WindowRef } from '../../types';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon';
import { ModalController } from '../modal';

import { ActionSheetComponent, ActionSheetPopoutComponent } from './';

describe('ActionSheetComponent', () => {
  let spectator: Spectator<ActionSheetComponent>;
  let popout: HTMLElement;
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
    spectator = createHost('<kirby-action-sheet></kirby-action-sheet>', {
      props: {
        items: [
          { id: '1', text: 'Action 1' },
          { id: '2', text: 'Action 2' },
          { id: '3', text: 'Action 3' },
        ],
        header: 'Test header',
        subheader: 'Test subheader',
        cancelButtonText: 'Test cancel button text',
      },
    });

    popout = spectator.query('kirby-action-sheet-popout');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('icon', () => {
    it('should have default icon', () => {
      expect(spectator.component.iconName).toEqual('more');
    });

    it('should support custom icon', () => {
      const iconName = 'pension';
      spectator.setInput('iconName', iconName);
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
      spectator.setInput('buttonText', buttonText);
      const button = spectator.query('button');
      expect(button.textContent).toEqual(buttonText);
    });
  });

  describe('popout', () => {
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
      spectator.component._isTouch = true;
      spectator.click('button');
      expect(modalControllerSpy.showActionSheet).toHaveBeenCalled();
    });
  });

  fdescribe('keyboard support', () => {
    it('should toggle open on enter', fakeAsync(() => {
      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
      tick(openDelayInMs);
      expect(spectator.component.isOpen).toBeTrue();
    }));

    it('should toggle close on enter', fakeAsync(() => {
      spectator.component['state'] = OpenState.open;
      spectator.detectChanges();
      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
      tick(openDelayInMs);
      expect(spectator.component.isOpen).toBeFalse();
    }));

    it('should toggle open on space', fakeAsync(() => {
      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Space');
      tick(openDelayInMs);
      expect(spectator.component.isOpen).toBeTrue();
    }));

    it('should toggle close on escape', fakeAsync(() => {
      spectator.component['state'] = OpenState.open;
      spectator.detectChanges();
      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Escape');
      tick(openDelayInMs);
      expect(spectator.component.isOpen).toBeFalse();
    }));

    it('should set and increment focused items on arrow down', () => {
      expect(spectator.component._focusedIndex).toEqual(-1);

      spectator.component['state'] = OpenState.open;
      spectator.detectChanges();

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
      expect(spectator.component._focusedIndex).toEqual(0);

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
      expect(spectator.component._focusedIndex).toEqual(1);

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
      expect(spectator.component._focusedIndex).toEqual(2);

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
      expect(spectator.component._focusedIndex).toEqual(2);
    });

    it('should decrement focused items on arrow up', () => {
      spectator.component['state'] = OpenState.open;
      spectator.component['_focusedIndex'] = 2;
      spectator.detectChanges();

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
      expect(spectator.component._focusedIndex).toEqual(1);

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
      expect(spectator.component._focusedIndex).toEqual(0);

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
      expect(spectator.component._focusedIndex).toEqual(0);
    });

    it('should select focused item on enter', () => {
      const onSelectSpy = spyOn(spectator.component.itemSelect, 'emit');
      spectator.component['state'] = OpenState.open;
      spectator.component['_focusedIndex'] = 1;
      spectator.detectChanges();

      spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(spectator.component.items[1]);
    });
  });
});
