/* 
  This file has been created to contain unit tests for the new dropdown utilizing popover 
  instead of mixing them in with the ones for the old version. Having an additional file with 
  almost identic tests should make it easier to remove the ones for the old version when we have 
  to deprecate it. 
*/
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { IonItem } from '@ionic/angular';
import { createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { ButtonComponent, CardComponent, IconComponent, ItemComponent } from '..';
import { HorizontalDirection, PopoverComponent } from '../popover/popover.component';

import { DropdownComponent } from './dropdown.component';

@Component({
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushHostComponent {}

fdescribe('DropdownComponent + PopoverComponent', () => {
  const items = [
    { text: 'Item 1', value: 1 },
    { text: 'Item 2', value: 2 },
    { text: 'Item 3', value: 3 },
    { text: 'Item 4', value: 4 },
    { text: 'Item 5', value: 5 },
  ];
  const openDelayInMs = DropdownComponent.OPEN_DELAY_IN_MS;

  const createHost = createHostFactory({
    component: DropdownComponent,
    declarations: [
      ItemComponent,
      MockComponents(ButtonComponent, IconComponent, IonItem),
      PopoverComponent,
      CardComponent,
    ],
  });

  let spectator: Spectator<DropdownComponent>;
  let buttonElement: HTMLButtonElement;
  let cardElement: HTMLElement;

  afterEach(() => {
    spectator.query('kirby-popover').remove();
  });

  describe('when configured with popout direction', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-dropdown [usePopover]="true" popout="right"></kirby-dropdown>`,
        {
          props: {
            items: items,
          },
        }
      );
      buttonElement = spectator.query('button[kirby-button]');
    });

    it('should open card to the right when popout=right', fakeAsync(() => {
      spectator.component.open();
      tick(openDelayInMs);

      const buttonRect = buttonElement.getBoundingClientRect();
      const card = spectator.query('kirby-card');
      const cardRect = card.getBoundingClientRect();

      expect(cardRect.left).toEqual(buttonRect.left);
    }));
  });

  describe('when configured with expand=block', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-dropdown [usePopover]="true" expand="block"></kirby-dropdown>`,
        {
          props: {
            items: items,
          },
        }
      );
      buttonElement = spectator.query('button[kirby-button]');
    });

    it('should render button with full width', () => {
      const componentWidth = spectator.element.clientWidth;
      const buttonWidth = buttonElement.getBoundingClientRect().width;
      expect(buttonWidth).toEqual(componentWidth);
    });

    it('should render dropdown with full width', fakeAsync(() => {
      spectator.component.ngAfterViewInit();

      spectator.component.open();
      tick(openDelayInMs);

      const card = spectator.query('kirby-card');
      const componentWidth = spectator.element.clientWidth;
      const cardWidth = card.getBoundingClientRect().width;
      expect(cardWidth).toEqual(componentWidth);
      expect(card).toHaveComputedStyle({
        'min-width': '0px',
        'max-width': 'none',
      });
    }));
  });

  describe('when aligned to right side of viewport', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-dropdown [usePopover]="true"></kirby-dropdown>`, {
        props: {
          items: items,
        },
      });
      spectator.element.style.cssFloat = 'right';
      buttonElement = spectator.query('button[kirby-button]');
    });

    it('should align the dropdown to the right side of button and component container ', fakeAsync(() => {
      spectator.component.open();
      spectator.detectChanges();
      tick(openDelayInMs);
      spectator.detectChanges();

      const card = spectator.query('kirby-card');
      const cardClientRect = card.getClientRects()[0];
      const buttonClientRect = buttonElement.getClientRects()[0];
      expect(cardClientRect.right).toEqual(buttonClientRect.right);
    }));
  });

  fdescribe('when inside host component with ChangeDetectionStrategy.OnPush', () => {
    const createOnPushHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        PopoverComponent,
        MockComponents(ButtonComponent, CardComponent, ItemComponent, IconComponent),
      ],
      host: OnPushHostComponent,
    });

    beforeEach(fakeAsync(() => {
      spectator = createOnPushHost(`<kirby-dropdown [usePopover]="true"></kirby-dropdown>`, {
        props: {
          items: items,
        },
      });
      console.log('flag daddy');
      console.log(spectator.queryAll('kirby-card'));
      cardElement = spectator.query('kirby-card');

      // Assert that card is initially hidden:
      expect(cardElement).toBeHidden();

      spectator.click('button');
      tick(openDelayInMs);
      spectator.detectChanges();
    }));

    it('should open dropdown', () => {
      expect(spectator.component.isOpen).toBeTruthy();
    });

    it(`should have '.is-open' css class`, () => {
      expect(spectator.element).toHaveClass('is-open');
    });

    it('should have options be visible', () => {
      expect(cardElement).toBeVisible();
    });
  });
});
