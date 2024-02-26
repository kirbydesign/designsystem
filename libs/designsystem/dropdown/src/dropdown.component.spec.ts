import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { IonItem } from '@ionic/angular';
import { createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent, ItemModule } from '@kirbydesign/designsystem/item';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

import { DropdownComponent } from './dropdown.component';
import { OpenState } from './dropdown.types';

@Component({
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushHostComponent {}

describe('DropdownComponent', () => {
  const items = [
    { text: 'Item 1', value: 1 },
    { text: 'Item 2', value: 2 },
    { text: 'Item 3', value: 3 },
    { text: 'Item 4', value: 4 },
    { text: 'Item 5', value: 5 },
  ];
  const openDelayInMs = DropdownComponent.OPEN_DELAY_IN_MS;

  describe('by default', () => {
    const createHost = createHostFactory({
      component: DropdownComponent,
      imports: [ItemModule],
      declarations: [
        ItemComponent,
        MockComponents(ButtonComponent, CardComponent, IconComponent, IonItem, PopoverComponent),
      ],
    });

    let spectator: Spectator<DropdownComponent>;
    let buttonElement: HTMLButtonElement;

    beforeEach(() => {
      spectator = createHost(`<kirby-dropdown></kirby-dropdown>`, {
        props: {
          items: items,
        },
      });
      buttonElement = spectator.query('button[kirby-button]');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have popover disabled', () => {
      expect(spectator.component.usePopover).toBeFalse();
    });

    it('should be closed', () => {
      expect(spectator.component.isOpen).toBeFalsy();
    });

    it('should not have value', () => {
      expect(spectator.component.value).toBeNull();
    });

    it('should not have selected text', () => {
      expect(spectator.component.selectedText).toBeNull();
    });

    it('should have selected index = -1', () => {
      expect(spectator.component.selectedIndex).toEqual(-1);
    });

    it('should have default placeholder text', () => {
      expect(buttonElement).toHaveText(spectator.component.placeholder, true);
    });

    it('should have default popout set', () => {
      expect(spectator.component.popout).toEqual(HorizontalDirection.right);
    });

    it('should render as inline block', () => {
      expect(spectator.element).toHaveComputedStyle({ display: 'inline-block' });
    });

    it('should render button with default attentionLevel', () => {
      const button = spectator.query(ButtonComponent);
      expect(button.attentionLevel).toEqual('3');
    });

    it('should not render disabled attribute', () => {
      expect(spectator.element.attributes['disabled']).toBeUndefined();
    });

    it('should render no-blur attribute', () => {
      expect(spectator.element.attributes['no-blur']).toBeDefined();
    });

    it('should not render button as disabled ', () => {
      expect(buttonElement.disabled).toBeFalsy();
    });

    it('should not render disabled attribute on button', () => {
      expect(buttonElement.attributes['disabled']).toBeUndefined();
    });

    it('should have correct item size', () => {
      const itemElements = spectator.queryAll<HTMLElement>('kirby-item');
      expect(itemElements).toHaveLength(items.length);
      itemElements.forEach((item) => {
        expect(item.querySelector('ion-item')).toHaveComputedStyle({
          '--min-height': DesignTokenHelper.dropdownItemHeight(),
        });
      });
    });

    it('should receive focus', () => {
      spectator.element.focus();
      expect(spectator.element).toBeFocused();
    });

    it('should receive focus on button click', () => {
      spectator.click('button');
      expect(spectator.element).toBeFocused();
    });

    // Fixes https://github.com/kirbydesign/designsystem/issues/1987
    it('should have type="button" attribute', () => {
      expect(buttonElement).toHaveAttribute('type', 'button');
    });

    describe('when setting selected index', () => {
      let onChangeSpy: jasmine.Spy;
      const newSelectedIndex = 2;
      const expectedItem = items[newSelectedIndex];
      const expectedText = expectedItem.text;

      beforeEach(() => {
        onChangeSpy = spyOn(spectator.component.change, 'emit');
        spectator.setInput('selectedIndex', newSelectedIndex);
      });

      it('should have correct selected item', () => {
        expect(spectator.component.value).toEqual(expectedItem);
      });

      it('should have selected text from new selected item', () => {
        expect(spectator.component.selectedText).toEqual(expectedText);
        expect(buttonElement).toHaveText(expectedText, true);
      });

      it('should not emit change event', () => {
        expect(onChangeSpy).not.toHaveBeenCalled();
      });
    });

    describe('onItemSelect', () => {
      describe('when no selected index', () => {
        let onChangeSpy: jasmine.Spy;
        const newSelectedIndex = 2;
        const expectedItem = items[newSelectedIndex];
        const expectedText = expectedItem.text;

        beforeEach(() => {
          onChangeSpy = spyOn(spectator.component.change, 'emit');
          spectator.component.onItemSelect(newSelectedIndex);
          spectator.detectChanges();
        });

        it('should have correct new selected index', () => {
          expect(spectator.component.selectedIndex).toEqual(newSelectedIndex);
        });

        it('should have correct new focused index', () => {
          expect(spectator.component.focusedIndex).toEqual(newSelectedIndex);
        });

        it('should have correct new selected item', () => {
          expect(spectator.component.value).toEqual(expectedItem);
        });

        it('should have selected text from new selected item', () => {
          expect(spectator.component.selectedText).toEqual(expectedText);
          expect(buttonElement).toHaveText(expectedText, true);
        });

        it('should emit change event with new selected item', () => {
          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(expectedItem);
        });
      });

      describe('when having selected index', () => {
        let onChangeSpy: jasmine.Spy;

        beforeEach(() => {
          spectator.setInput('selectedIndex', 2);
          onChangeSpy = spyOn(spectator.component.change, 'emit');
        });

        describe('and called with a selected index >= 0', () => {
          const newSelectedIndex = 4;
          const expectedItem = items[newSelectedIndex];
          const expectedText = expectedItem.text;

          beforeEach(() => {
            spectator.component.onItemSelect(newSelectedIndex);
            spectator.detectChanges();
          });

          it('should have correct new selected index', () => {
            expect(spectator.component.selectedIndex).toEqual(newSelectedIndex);
          });

          it('should have correct new selected item', () => {
            expect(spectator.component.value).toEqual(expectedItem);
          });

          it('should have selected text from new selected item', () => {
            expect(spectator.component.selectedText).toEqual(expectedText);
            expect(buttonElement).toHaveText(expectedText, true);
          });

          it('should emit change event with new selected item', () => {
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(expectedItem);
          });
        });

        describe('and called with selected index = -1', () => {
          const newSelectedIndex = -1;

          beforeEach(() => {
            spectator.component.onItemSelect(newSelectedIndex);
            spectator.detectChanges();
          });

          it('should have correct new selected index', () => {
            expect(spectator.component.selectedIndex).toEqual(newSelectedIndex);
          });

          it('should not have a selected item', () => {
            expect(spectator.component.value).toBeNull();
          });

          it('should not have selected text', () => {
            expect(spectator.component.selectedText).toBeNull();
          });

          it('should have default placeholder text', () => {
            expect(buttonElement).toHaveText(spectator.component.placeholder, true);
          });

          it('should emit change event with no selected item', () => {
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(null);
          });
        });
      });
    });

    describe('when configured with attentionLevel', () => {
      it('should render button with correct attentionLevel', () => {
        spectator.component.attentionLevel = '1';
        spectator.detectChanges();
        const button = spectator.query(ButtonComponent);
        expect(button.attentionLevel).toEqual('1');
      });
    });

    describe('when configured with popout direction', () => {
      it('open card to the right when popout=right', () => {
        spectator.component.popout = HorizontalDirection.right;
        spectator.component['state'] = OpenState.open;
        spectator.detectChanges();

        const buttonRect = buttonElement.getBoundingClientRect();
        const card = spectator.query('kirby-card');
        const cardRect = card.getBoundingClientRect();

        expect(cardRect.left).toEqual(buttonRect.left);
      });

      it('open card to the left when popout=left', () => {
        spectator.component.popout = HorizontalDirection.left;
        spectator.element.style.cssFloat = 'right';
        spectator.component['state'] = OpenState.open;
        spectator.detectChanges();

        const card = spectator.query('kirby-card');
        const buttonRect = buttonElement.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        expect(cardRect.right).toEqual(buttonRect.right);
      });
    });

    describe('when configured with expand=block', () => {
      beforeEach(() => {
        spectator.component.expand = 'block';
        spectator.detectChanges();
      });

      it('should render as block level', () => {
        expect(spectator.element).toHaveComputedStyle({ display: 'block' });
      });

      it('should render button with full width', () => {
        const componentWidth = spectator.element.clientWidth;
        const buttonWidth = buttonElement.getBoundingClientRect().width;
        expect(buttonWidth).toEqual(componentWidth);
      });

      it('should render dropdown with full width', () => {
        spectator.component['state'] = OpenState.open;
        spectator.detectChanges();
        const card = spectator.query('kirby-card');
        const componentWidth = spectator.element.clientWidth;
        const cardWidth = card.getBoundingClientRect().width;
        expect(cardWidth).toEqual(componentWidth);
        expect(card).toHaveComputedStyle({ 'min-width': '0px', 'max-width': 'none' });
      });
    });

    describe('when closed', () => {
      beforeEach(() => {
        spectator.component['state'] = OpenState.closed;
        spectator.detectChanges();
      });

      it('should have correct icon', () => {
        const icon = spectator.query<IconComponent>(IconComponent);
        expect(icon.name).toEqual('arrow-down');
      });

      describe('and button is clicked', () => {
        it('should open and focus dropdown', fakeAsync(() => {
          spectator.click('button');
          tick(openDelayInMs);
          expect(spectator.component.isOpen).toBeTruthy();
          expect(spectator.element).toBeFocused();
        }));
      });

      describe('and Space key is pressed', () => {
        beforeEach(fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Space');
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
      });

      describe('and Enter key is pressed', () => {
        beforeEach(fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
      });

      describe('and first item is selected', () => {
        beforeEach(() => {
          spectator.setInput('selectedIndex', 0);
          spectator.detectChanges();
        });
        describe('and ArrowLeft key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowLeft');
            expect(spectator.component.selectedIndex).toEqual(0);
          });
        });
        describe('and ArrowUp key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
            expect(spectator.component.selectedIndex).toEqual(0);
          });

          it('should not change focused item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
            expect(spectator.component.focusedIndex).toEqual(0);
          });
        });
        describe('and Home key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Home');
            expect(spectator.component.selectedIndex).toEqual(0);
          });
        });
      });

      describe('and last item is selected', () => {
        const lastIndex = 4;
        beforeEach(() => {
          spectator.setInput('selectedIndex', lastIndex);
          spectator.detectChanges();
        });
        describe('and ArrowRight key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowRight');
            expect(spectator.component.selectedIndex).toEqual(lastIndex);
          });
        });
        describe('and ArrowDown key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
            expect(spectator.component.selectedIndex).toEqual(lastIndex);
          });

          it('should not change focused item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
            expect(spectator.component.focusedIndex).toEqual(lastIndex);
          });
        });
        describe('and End key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'End');
            expect(spectator.component.selectedIndex).toEqual(lastIndex);
          });
        });

        describe('and focused', () => {
          beforeEach(() => {
            spectator.element.focus();
          });

          it('should open the dropdown when ArrowUp key is pressed', fakeAsync(() => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
            tick(openDelayInMs);

            expect(spectator.component.isOpen).toBeTruthy();
          }));

          it('should open the dropdown when ArrowDown key is pressed', fakeAsync(() => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
            tick(openDelayInMs);

            expect(spectator.component.isOpen).toBeTruthy();
          }));

          it('should highlight the first item in the list, if no item is selected and ArrowDown key is pressed', () => {
            spectator.setInput('selectedIndex', -1);

            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');

            expect(spectator.component.focusedIndex).toEqual(0);
          });

          it('should highlight the last item in the list, if no item is selected and ArrowUp key is pressed', () => {
            spectator.setInput('selectedIndex', -1);

            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');

            expect(spectator.component.focusedIndex).toEqual(4);
          });

          it('should highlight the selected item, when the ArrowUp key is pressed', () => {
            spectator.setInput('selectedIndex', 2);

            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');

            expect(spectator.component.focusedIndex).toEqual(2);
          });

          it('should highlight the selected item, when the ArrowDown key is pressed', () => {
            spectator.setInput('selectedIndex', 3);

            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');

            expect(spectator.component.focusedIndex).toEqual(3);
          });
        });
      });
    });

    describe('when open', () => {
      beforeEach(() => {
        spectator.component['state'] = OpenState.open;
        spectator.detectChanges();
      });

      it('should have correct icon', () => {
        const icon = spectator.query<IconComponent>(IconComponent);
        expect(icon.name).toEqual('arrow-up');
      });

      describe('and button is clicked', () => {
        beforeEach(() => {
          spectator.click('button');
          spectator.detectChanges();
        });
        it('should close dropdown', () => {
          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and Space key is pressed', () => {
        it('should close dropdown', () => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Space');
          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and Enter key is pressed', () => {
        it('should close dropdown', () => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and Escape key is pressed', () => {
        it('should close dropdown', () => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Escape');
          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and Tab key is pressed', () => {
        it('should close dropdown', () => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Tab');
          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and looses focus', () => {
        it('should close dropdown', () => {
          spectator.dispatchFakeEvent(spectator.element, 'blur');
          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and ArrowLeft key is pressed', () => {
        it('should not change selected item', () => {
          spectator.setInput('selectedIndex', 2);
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowLeft');
          expect(spectator.component.selectedIndex).toEqual(2);
        });
      });
      describe('and ArrowRight key is pressed', () => {
        it('should not change selected item', () => {
          spectator.setInput('selectedIndex', 2);
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowRight');
          expect(spectator.component.selectedIndex).toEqual(2);
        });
      });

      describe('and first item is selected', () => {
        beforeEach(() => {
          spectator.setInput('selectedIndex', 0);
          spectator.detectChanges();
        });
        describe('and ArrowLeft key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowLeft');
            expect(spectator.component.selectedIndex).toEqual(0);
          });
        });
        describe('and Home key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Home');
            expect(spectator.component.selectedIndex).toEqual(0);
          });
        });
      });

      const testMatrix = [
        {
          key: 'ArrowUp',
          scenario: [
            {
              selectedIndex: 1,
              keypressCount: 1,
              expectedIndex: 0,
            },
            {
              selectedIndex: 2,
              keypressCount: 1,
              expectedIndex: 1,
            },
            {
              selectedIndex: 2,
              keypressCount: 2,
              expectedIndex: 0,
            },
          ],
        },
        {
          key: 'ArrowDown',
          scenario: [
            {
              selectedIndex: 0,
              keypressCount: 1,
              expectedIndex: 1,
            },
            {
              selectedIndex: 0,
              keypressCount: 2,
              expectedIndex: 2,
            },
            {
              selectedIndex: 1,
              keypressCount: 1,
              expectedIndex: 2,
            },
          ],
        },
        {
          key: 'Home',
          scenario: [
            {
              selectedIndex: 1,
              keypressCount: 1,
              expectedIndex: 0,
            },
            {
              selectedIndex: 2,
              keypressCount: 1,
              expectedIndex: 0,
            },
            {
              selectedIndex: 4,
              keypressCount: 1,
              expectedIndex: 0,
            },
          ],
        },
        {
          key: 'End',
          scenario: [
            {
              selectedIndex: 0,
              keypressCount: 1,
              expectedIndex: 4,
            },
            {
              selectedIndex: 1,
              keypressCount: 1,
              expectedIndex: 4,
            },
            {
              selectedIndex: 2,
              keypressCount: 1,
              expectedIndex: 4,
            },
          ],
        },
      ];

      testMatrix.forEach((keyEvent) => {
        keyEvent.scenario.forEach((scenario) => {
          describe(`and selected item = ${scenario.selectedIndex} and focused item = ${scenario.selectedIndex} and ${keyEvent.key} key is pressed ${scenario.keypressCount} time(s)`, () => {
            it(`should set selected item = ${scenario.expectedIndex}`, () => {
              spectator.setInput('selectedIndex', scenario.selectedIndex);
              for (let counter = 0; counter < scenario.keypressCount; counter++) {
                spectator.dispatchKeyboardEvent(spectator.element, 'keydown', keyEvent.key);
              }
              // focused
              expect(spectator.component.focusedIndex).toEqual(scenario.expectedIndex);
              // selected
              spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
              expect(spectator.component.selectedIndex).toEqual(scenario.expectedIndex);
              expect(spectator.component.value).toEqual(items[scenario.expectedIndex]);
            });
          });
        });
      });
    });

    describe('when aligned to right side of viewport', () => {
      /**
       * Temporaly removed, see #2736
       */
      xit('should align the dropdown to the right side of button and component container ', (done) => {
        spectator.element.style.cssFloat = 'right';
        spectator.component.open();
        spectator.detectChanges();
        setTimeout(() => {
          spectator.detectChanges();
          const card = spectator.query('kirby-card');
          expect(card).toHaveComputedStyle({ right: '0px' });
          done();
        }, openDelayInMs);
      });
    });

    describe('when disabled', () => {
      beforeEach(() => {
        spectator.component.disabled = true;
        spectator.detectChanges();
      });

      it('should render disabled attribute', () => {
        expect(spectator.element.attributes['disabled']).toBeDefined();
      });

      it('should render button as disabled ', () => {
        expect(buttonElement.disabled).toBeTruthy();
      });

      it('should render disabled attribute on button', () => {
        expect(buttonElement.attributes['disabled']).toBeDefined();
      });

      it('should not open', fakeAsync(() => {
        spectator.component.open();
        tick(openDelayInMs);
        expect(spectator.component.isOpen).toBeFalsy();
      }));

      it('should not toggle', fakeAsync(() => {
        spectator.component.toggle();
        tick(openDelayInMs);
        expect(spectator.component.isOpen).toBeFalsy();
      }));

      it('should not recieve focus on button click', () => {
        spectator.click('button');
        spectator.detectChanges();
        expect(spectator.element).not.toBeFocused();
      });

      describe('on keypress', () => {
        const selectedIndex = 2;
        const expectedItem = items[selectedIndex];
        let onChangeSpy: jasmine.Spy;
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

        beforeEach(() => {
          onChangeSpy = spyOn(spectator.component.change, 'emit');
          spectator.setInput('selectedIndex', selectedIndex);
          spectator.detectChanges();
        });

        it('should not open dropdown when Space key is pressed', fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Space');
          tick(openDelayInMs);
          expect(spectator.component.isOpen).toBeFalsy();
        }));

        it('should not open dropdown when Enter key is pressed', fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
          tick(openDelayInMs);
          expect(spectator.component.isOpen).toBeFalsy();
        }));

        keys.forEach((key) => {
          it(`should not change selected item when ${key} key is pressed`, () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', key);
            expect(spectator.component.selectedIndex).toEqual(selectedIndex);
            expect(spectator.component.value).toEqual(expectedItem);
            expect(onChangeSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('implementing ControlValueAccessor interface', () => {
      describe('when writeValue() function is invoked', () => {
        it('should select the item', () => {
          const selectedIndex = 2;
          const expectedItem = items[selectedIndex];
          spectator.component.writeValue(expectedItem);
          expect(spectator.component.selectedIndex).toEqual(selectedIndex);
          expect(spectator.component.value).toEqual(expectedItem);
        });

        it('should not emit change event', () => {
          const onChangeSpy = spyOn(spectator.component.change, 'emit');
          spectator.component.writeValue(items[2]);
          expect(onChangeSpy).not.toHaveBeenCalled();
        });
      });

      it('should invoke callback from registerOnChange() function on change', () => {
        const selectedIndex = 2;
        const expectedItem = items[selectedIndex];
        const onChangeSpy = jasmine.createSpy('_onChange');
        spectator.component.registerOnChange(onChangeSpy);
        spectator.component.onItemSelect(selectedIndex);
        expect(onChangeSpy).toHaveBeenCalledWith(expectedItem);
      });

      it('should invoke callback from registerOnTouched() function on blur', () => {
        const onTouchedSpy = jasmine.createSpy('_onTouched');
        spectator.component.registerOnTouched(onTouchedSpy);
        spectator.blur();
        spectator.detectChanges();
        expect(onTouchedSpy).toHaveBeenCalled();
      });

      describe('when setDisabledState() function is invoked', () => {
        it('should set disabled = false when invoked with false', () => {
          spectator.component.disabled = true;
          spectator.component.setDisabledState(false);
          expect(spectator.component.disabled).toBeFalsy();
        });

        it('should set disabled = true when invoked with true', () => {
          spectator.component.disabled = false;
          spectator.component.setDisabledState(true);
          expect(spectator.component.disabled).toBeTruthy();
        });
      });
    });
  });

  describe('when configured with size', () => {
    let spectator: SpectatorHost<DropdownComponent>;

    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        MockComponents(
          ButtonComponent,
          CardComponent,
          ItemComponent,
          IconComponent,
          PopoverComponent
        ),
      ],
    });

    describe('through template one-time string initialization', () => {
      function getSpectatorWithStringSize(size: string) {
        return createHost(`<kirby-dropdown size="${size}"></kirby-dropdown>`, {
          props: { items: items },
        });
      }

      it('should have small size on button', () => {
        const size = 'sm';
        spectator = getSpectatorWithStringSize(size);
        const button: ButtonComponent = spectator.query(ButtonComponent);

        expect(button.size).toBe(size);
      });

      it('should have medium size on button', () => {
        const size = 'md';
        spectator = getSpectatorWithStringSize(size);
        const button: ButtonComponent = spectator.query(ButtonComponent);

        expect(button.size).toBe(size);
      });
    });

    describe('through template property binding', () => {
      function getSpectatorWithStringSize(size: string) {
        return createHost(`<kirby-dropdown [size]="'${size}'"></kirby-dropdown>`, {
          props: { items: items },
        });
      }

      it('should have small size on button', () => {
        const size = 'sm';
        spectator = getSpectatorWithStringSize(size);
        const button: ButtonComponent = spectator.query(ButtonComponent);

        expect(button.size).toBe(size);
      });

      it('should have medium size on button', () => {
        const size = 'md';
        spectator = getSpectatorWithStringSize(size);
        const button: ButtonComponent = spectator.query(ButtonComponent);

        expect(button.size).toBe(size);
      });
    });

    describe('through input properties', () => {
      function getSpectatorWithSize(size: 'sm' | 'md') {
        return createHost(`<kirby-dropdown></kirby-dropdown>`, {
          props: { items: items, size: size },
        });
      }

      it('should have small size on button', () => {
        const size = 'sm';
        spectator = getSpectatorWithSize(size);
        const button: ButtonComponent = spectator.query(ButtonComponent);

        expect(button.size).toBe(size);
      });

      it('should have medium size on button', () => {
        const size = 'md';
        spectator = getSpectatorWithSize(size);
        const button: ButtonComponent = spectator.query(ButtonComponent);

        expect(button.size).toBe(size);
      });

      describe('when changing size', () => {
        it('should have correct size', () => {
          const newSize = 'sm';
          spectator = getSpectatorWithSize('md');
          spectator.setInput('size', newSize);
          const button: ButtonComponent = spectator.query(ButtonComponent);

          expect(button.size).toBe(newSize);
        });
      });
    });
  });

  describe('when configured with selected index', () => {
    let spectator: SpectatorHost<DropdownComponent>;
    let buttonElement: HTMLButtonElement;

    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        MockComponents(
          ButtonComponent,
          CardComponent,
          ItemComponent,
          IconComponent,
          PopoverComponent
        ),
      ],
    });

    const defaultSelectedIndex = 2;
    const expectedItem = items[defaultSelectedIndex];
    const expectedText = expectedItem.text;

    describe('through template one-time string initialization', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-dropdown selectedIndex="${defaultSelectedIndex}"></kirby-dropdown>`,
          {
            props: {
              items: items,
            },
          }
        );
        buttonElement = spectator.query('button[kirby-button]');
      });

      it('should have selected item', () => {
        expect(spectator.component.value).toEqual(expectedItem);
      });

      it('should have selected text from selected item', () => {
        expect(spectator.component.selectedText).toEqual(expectedText);
        expect(buttonElement).toHaveText(expectedText, true);
      });
    });

    describe('through template property binding', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-dropdown [selectedIndex]="${defaultSelectedIndex}"></kirby-dropdown>`,
          {
            props: {
              items: items,
            },
          }
        );
        buttonElement = spectator.query('button[kirby-button]');
      });

      it('should have selected item', () => {
        expect(spectator.component.value).toEqual(expectedItem);
      });

      it('should have selected text from selected item', () => {
        expect(spectator.component.selectedText).toEqual(expectedText);
        expect(buttonElement).toHaveText(expectedText, true);
      });
    });

    describe('through input properties', () => {
      beforeEach(() => {
        spectator = createHost(`<kirby-dropdown></kirby-dropdown>`, {
          props: {
            items: items,
            selectedIndex: defaultSelectedIndex,
          },
        });
        buttonElement = spectator.query('button[kirby-button]');
      });

      it('should have selected item', () => {
        expect(spectator.component.value).toEqual(expectedItem);
      });

      it('should have selected text from selected item', () => {
        expect(spectator.component.selectedText).toEqual(expectedText);
        expect(buttonElement).toHaveText(expectedText, true);
      });

      describe('when changing selected index', () => {
        it('should have correct new selected item', () => {
          const newSelectedIndex = 0;
          const expectedItem = items[newSelectedIndex];
          spectator.setInput('selectedIndex', newSelectedIndex);
          spectator.detectChanges();
          expect(spectator.component.value).toEqual(expectedItem);
        });

        it('should have selected text from new selected item', () => {
          const newSelectedIndex = 0;
          const expectedText = items[newSelectedIndex].text;
          spectator.setInput('selectedIndex', newSelectedIndex);
          spectator.detectChanges();
          expect(spectator.component.selectedText).toEqual(expectedText);
          expect(buttonElement).toHaveText(expectedText, true);
        });

        it('should not emit change event', () => {
          const newSelectedIndex = 0;
          const onChangeSpy = spyOn(spectator.component.change, 'emit');
          spectator.setInput('selectedIndex', newSelectedIndex);
          spectator.detectChanges();
          expect(onChangeSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when inside host component with ChangeDetectionStrategy.OnPush', () => {
    let spectator: SpectatorHost<DropdownComponent>;
    let cardElement: HTMLElement;

    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        MockComponents(
          ButtonComponent,
          CardComponent,
          ItemComponent,
          IconComponent,
          PopoverComponent
        ),
      ],
      host: OnPushHostComponent,
    });

    beforeEach(() => {
      spectator = createHost(`<kirby-dropdown></kirby-dropdown>`, {
        props: {
          items: items,
        },
      });
    });

    beforeEach(fakeAsync(() => {
      cardElement = spectator.query('kirby-card');
      // Assert that card is initially hidden:
      expect(cardElement).toBeHidden();
      expect(cardElement).toHaveComputedStyle({ opacity: '0' });
      // Act:
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

    it('options should be visible', () => {
      expect(cardElement).toBeVisible();
      expect(cardElement).toHaveComputedStyle({ opacity: '1' });
    });
  });

  describe('when configured with custom item template', () => {
    let spectator: SpectatorHost<DropdownComponent>;

    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        ItemComponent,
        ListItemTemplateDirective,
        MockComponents(ButtonComponent, CardComponent, IconComponent, IonItem, PopoverComponent),
      ],
    });

    beforeEach(() => {
      spectator = createHost(
        `<kirby-dropdown>
           <kirby-item
             *kirbyListItemTemplate="let item; let selected = selected"
             selectable="true"
             [selected]="selected">
             <kirby-icon *ngIf="selected" name="checkmark-selected" slot="start"></kirby-icon>
             <h3>{{ item.title }}</h3>
           </kirby-item>
         </kirby-dropdown>`,
        {
          props: {
            items: items,
          },
        }
      );
    });

    it('should have correct item size', () => {
      const itemElements = spectator.queryAll<HTMLElement>('kirby-item');
      expect(itemElements).toHaveLength(items.length);
      itemElements.forEach((item) => {
        expect(item.querySelector('ion-item')).toHaveComputedStyle({
          '--min-height': DesignTokenHelper.dropdownItemHeight(),
        });
      });
    });

    it('should set up click listernes for slotted items', () => {
      spectator.detectChanges();
      const clickListeners = spectator.component['itemClickUnlisten'];
      expect(clickListeners).toHaveLength(items.length);
    });

    describe('ngOnDestroy', () => {
      it('should call each item click unlisten function for slotted items', () => {
        const unlistenMockArray = [
          () => unlistenCounter++,
          () => unlistenCounter++,
          () => unlistenCounter++,
        ];
        const unlistenMockArrayLength = unlistenMockArray.length;
        let unlistenCounter = 0;
        spectator.component['itemClickUnlisten'] = unlistenMockArray;
        spectator.component.ngOnDestroy();
        expect(spectator.component['itemClickUnlisten']).toHaveLength(0);
        expect(unlistenCounter).toEqual(unlistenMockArrayLength);
      });
    });
  });

  describe('when configured with expand=block and usePopover=true', () => {
    const createHost = createHostFactory({
      component: DropdownComponent,
      imports: [ItemModule],
      declarations: [
        ItemComponent,
        MockComponents(ButtonComponent, CardComponent, IconComponent, IonItem, PopoverComponent),
      ],
    });

    let spectator: SpectatorHost<DropdownComponent>;

    beforeEach(() => {
      spectator = createHost(`<kirby-dropdown></kirby-dropdown>`, {
        props: {
          items: items,
          expand: 'block',
          usePopover: true,
        },
      });
    });

    it('should update popover card size when resized', async () => {
      const initWidth = spectator.element.clientWidth;
      const popoverCard = spectator.element.querySelector<HTMLElement>('kirby-card');
      const initCardWidth = popoverCard.style.getPropertyValue('--kirby-card-width');
      expect(initCardWidth).toEqual(`${initWidth}px`);

      const newWidth = '200px';
      (spectator.hostElement as HTMLElement).style.width = newWidth;
      await TestHelper.waitForResizeObserver();
      // Resize observe callback can be flaky in test, so ensure width has changed before asserting:
      await TestHelper.whenTrue(
        () => popoverCard.style.getPropertyValue('--kirby-card-width') !== `${initWidth}px`
      );

      const cardWidth = popoverCard.style.getPropertyValue('--kirby-card-width');
      expect(cardWidth).toEqual(newWidth);
    });
  });
});
