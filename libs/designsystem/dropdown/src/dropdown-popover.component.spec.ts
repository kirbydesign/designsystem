/*
  This file has been created to contain unit tests for the new dropdown utilizing popover
  instead of mixing them in with the ones for the old version. Having an additional file with
  almost identic tests should make it easier to remove the ones for the old version when we have
  to deprecate it.
*/
import { fakeAsync, tick } from '@angular/core/testing';
import { IonItem } from '@ionic/angular/standalone';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { CardComponent } from '@kirbydesign/designsystem/card';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent, ItemModule } from '@kirbydesign/designsystem/item';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';

import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DropdownComponent } from './dropdown.component';
import { OpenState } from './dropdown.types';

describe('DropdownComponent (popover version)', () => {
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
      imports: [TestHelper.ionicModuleForTest, IonItem, ItemModule],
      declarations: [
        ItemComponent,
        MockComponents(ButtonComponent, IconComponent, IonItem, PopoverComponent, CardComponent),
      ],
    });

    let spectator: SpectatorHost<DropdownComponent>;
    let buttonElement: HTMLButtonElement;

    beforeEach(() => {
      spectator = createHost(
        `<kirby-dropdown [usePopover]="true" [selectedIndex]="selectedIndex" aria-labelledby="labelId" [items]="items" [size]="size"></kirby-dropdown>`,
        { hostProps: { items } }
      );
      buttonElement = spectator.query('button[kirby-button]');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
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

    it('should render no-blur attribute', () => {
      expect(spectator.element.attributes['no-blur']).toBeDefined();
    });

    it('should not render disabled attribute', () => {
      expect(spectator.element.attributes['disabled']).toBeUndefined();
    });

    it('should not render button as disabled ', () => {
      expect(buttonElement.disabled).toBeFalsy();
    });

    it('should not render disabled attribute on button', () => {
      expect(buttonElement.attributes['disabled']).toBeUndefined();
    });

    it('should have type="button" attribute', () => {
      expect(buttonElement).toHaveAttribute('type', 'button');
    });

    it('should have correct id on button', () => {
      const comboboxId = spectator.component._comboboxId;
      expect(buttonElement.getAttribute('id')).toBe(comboboxId);
    });

    it('should have correct item size', fakeAsync(() => {
      spectator.component.open();
      tick(openDelayInMs);

      const itemElements = spectator.queryAll<HTMLElement>('kirby-item');
      expect(itemElements).toHaveLength(items.length);
      itemElements.forEach((item) => {
        expect(item.querySelector('ion-item')).toHaveComputedStyle({
          '--min-height': DesignTokenHelper.dropdownItemHeight(),
        });
      });
    }));

    describe('ARIA attributes', () => {
      let listboxId: string;

      beforeEach(() => {
        listboxId = spectator.component._listboxId;
      });

      it('should have correct aria attributes on button', () => {
        expect(buttonElement.getAttribute('role')).toBe('combobox');
        expect(buttonElement.getAttribute('aria-haspopup')).toBe('listbox');
        expect(buttonElement.getAttribute('aria-controls')).toBe(listboxId);
        expect(buttonElement.getAttribute('aria-expanded')).toBe('false');
      });

      it('should add aria-labelledby on button', () => {
        expect(buttonElement.getAttribute('aria-labelledby')).toBe('labelId');
      });

      it('should set aria-activedescendant when focusedIndex is set', () => {
        spectator.component.focusedIndex = 2;
        spectator.detectChanges();
        expect(buttonElement.getAttribute('aria-activedescendant')).toBe(
          `${listboxId}-item-${spectator.component.focusedIndex}`
        );
      });

      it('should set correct aria attributes on listbox when open', () => {
        spectator.component.open();
        spectator.detectChanges();

        const listbox = spectator.query('[role="listbox"]');
        expect(listbox).toBeTruthy();
        expect(listbox.getAttribute('id')).toBe(listboxId);
      });

      it('should update aria-expanded when opened', fakeAsync(() => {
        spectator.component.open();
        tick(openDelayInMs);
        spectator.detectChanges();
        const updatedButtonElement = spectator.query('button');
        expect(updatedButtonElement.getAttribute('aria-expanded')).toBe('true');
      }));

      it('should set correct aria attributes on options when open', () => {
        spectator.component.open();
        spectator.detectChanges();

        const options = spectator.queryAll('[role="option"]');
        expect(options.length).toBe(items.length);
        options.forEach((option: HTMLElement, i: number) => {
          expect(option.getAttribute('id')).toBe(`${listboxId}-item-${i}`);
        });
      });
    });

    describe('when setting selected index', () => {
      let onChangeSpy: jasmine.Spy;
      const newSelectedIndex = 2;
      const expectedItem = items[newSelectedIndex];
      const expectedText = expectedItem.text;

      beforeEach(() => {
        onChangeSpy = spyOn(spectator.component.change, 'emit');
        spectator.setHostInput('selectedIndex', newSelectedIndex);
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
          spectator.setHostInput('selectedIndex', 2);
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
      it('should open card to the left when popout=left', fakeAsync(() => {
        spectator.component.popout = HorizontalDirection.left;
        spectator.element.style.cssFloat = 'right';

        spectator.component.open();
        tick(openDelayInMs);
        spectator.detectChanges();

        const card = spectator.query('kirby-card');
        const buttonRect = buttonElement.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        expect(cardRect.right).toEqual(buttonRect.right);
      }));
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
    });

    describe('when closed', () => {
      beforeEach(() => {
        spectator.component['state'] = OpenState.closed;
        spectator.detectChanges();
      });

      it('should set focusedIndex to selectedIndex if selectedIndex is set', () => {
        spectator.component.selectedIndex = 2;
        spectator.component.open();
        expect(spectator.component.focusedIndex).toBe(2);
      });

      it('should set focusedIndex to 0 if no selectedIndex is set', () => {
        spectator.component.selectedIndex = -1;
        spectator.component.open();
        expect(spectator.component.focusedIndex).toBe(0);
      });

      it('should have correct icon', () => {
        const icon = spectator.query<IconComponent>(IconComponent);
        expect(icon.name).toEqual('arrow-down');
      });

      describe('and button is clicked', () => {
        // Flaky test
        xit('should open and focus dropdown', fakeAsync(() => {
          spectator.click('button');
          tick(openDelayInMs);
          expect(spectator.component.isOpen).toBeTruthy();
          expect(spectator.element).toBeFocused();
        }));
      });

      describe('and Space key is pressed', () => {
        it('should open dropdown', fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Space');
          tick(openDelayInMs);

          expect(spectator.component.isOpen).toBeTruthy();
        }));
      });

      describe('and Enter key is pressed', () => {
        it('should open dropdown', fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
          tick(openDelayInMs);

          expect(spectator.component.isOpen).toBeTruthy();
        }));
      });

      describe('and Home key is pressed', () => {
        beforeEach(fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Home');
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
        it('should focus first item', () => {
          expect(spectator.component.focusedIndex).toBe(0);
        });
      });

      describe('and End key is pressed', () => {
        beforeEach(fakeAsync(() => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'End');
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
        it('should focus last item', () => {
          expect(spectator.component.focusedIndex).toBe(items.length - 1);
        });
      });

      describe('and ArrowUp key is pressed', () => {
        beforeEach(fakeAsync(() => {
          buttonElement.focus();
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowUp');
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
        it('should focus first item', () => {
          expect(spectator.component.focusedIndex).toBe(0);
        });
        it('should keep DOM focus on the button', () => {
          expect(document.activeElement).toEqual(buttonElement);
        });
      });

      describe('and ArrowDown key is pressed', () => {
        beforeEach(fakeAsync(() => {
          buttonElement.focus();
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowDown');
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
        it('should keep DOM focus on the button', () => {
          expect(document.activeElement).toEqual(buttonElement);
        });
      });

      describe('and Alt+ArrowDown is pressed', () => {
        beforeEach(fakeAsync(() => {
          const event = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            altKey: true,
            bubbles: true,
            cancelable: true,
          });
          spectator.element.dispatchEvent(event);
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
      });

      describe('and first item is selected', () => {
        beforeEach(() => {
          spectator.setHostInput('selectedIndex', 0);
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
          spectator.setHostInput('selectedIndex', lastIndex);
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
        });
        describe('and End key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'End');
            expect(spectator.component.selectedIndex).toEqual(lastIndex);
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

      describe('and popover is clicked', () => {
        it('should close dropdown', () => {
          spectator.click('kirby-popover');

          expect(spectator.component.isOpen).toBeFalsy();
        });
      });

      describe('and ArrowLeft key is pressed', () => {
        it('should not change selected item', () => {
          spectator.setHostInput('selectedIndex', 2);
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowLeft');
          expect(spectator.component.selectedIndex).toEqual(2);
        });
      });
      describe('and ArrowRight key is pressed', () => {
        it('should not change selected item', () => {
          spectator.setHostInput('selectedIndex', 2);
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'ArrowRight');
          expect(spectator.component.selectedIndex).toEqual(2);
        });
      });

      describe('and first item is selected', () => {
        beforeEach(() => {
          spectator.setHostInput('selectedIndex', 0);
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
          describe(`and selected item = ${scenario.selectedIndex} and ${keyEvent.key} key is pressed ${scenario.keypressCount} time(s)`, () => {
            it(`should set selected item = ${scenario.expectedIndex}`, () => {
              spectator.setHostInput('selectedIndex', scenario.selectedIndex);
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

      describe('when a printable character key is pressed', () => {
        beforeEach(() => {
          spectator.component['state'] = OpenState.open;
          spectator.detectChanges();
        });

        it('should focus/select the first item starting with that character', () => {
          const testItems = [
            { text: 'Apple', value: 1 },
            { text: 'Banana', value: 2 },
            { text: 'Cherry', value: 3 },
            { text: 'Date', value: 4 },
            { text: 'Elderberry', value: 5 },
          ];
          spectator.setHostInput('items', testItems);
          spectator.detectChanges();

          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'c');
          spectator.detectChanges();
          expect(spectator.component.focusedIndex).toBe(2);
          expect(spectator.component.value).not.toEqual(testItems[2]);

          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'b');
          spectator.detectChanges();
          expect(spectator.component.focusedIndex).toBe(1);

          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'E');
          spectator.detectChanges();
          expect(spectator.component.focusedIndex).toBe(4);

          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'D');
          spectator.detectChanges();
          expect(spectator.component.focusedIndex).toBe(3);
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
          spectator.detectChanges();
          expect(spectator.component.selectedIndex).toBe(3);
          expect(spectator.component.value).toEqual(testItems[3]);
        });

        it('should not change focus if no item starts with the character', () => {
          const initialFocusedIndex = spectator.component.focusedIndex;
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Z');
          spectator.detectChanges();
          expect(spectator.component.focusedIndex).toBe(initialFocusedIndex);
        });
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
          spectator.setHostInput('selectedIndex', selectedIndex);
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
        return createHost(
          `<kirby-dropdown [items]="items" [usePopover]="true" size="${size}"></kirby-dropdown>`,
          {
            hostProps: { items },
          }
        );
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
        return createHost(
          `<kirby-dropdown [usePopover]="true" [items]="items" [size]="size"></kirby-dropdown>`,
          {
            hostProps: { items: items, size: size },
          }
        );
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
      describe('when changing size', () => {
        it('should have correct size', () => {
          const newSize = 'sm';
          spectator = getSpectatorWithStringSize('md');
          spectator.setHostInput('size', newSize);
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
          `<kirby-dropdown [usePopover]="true" [items]="items" selectedIndex="${defaultSelectedIndex}"></kirby-dropdown>`,
          {
            hostProps: {
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
          `<kirby-dropdown [usePopover]="true" [items]="items" [selectedIndex]="selectedIndex"></kirby-dropdown>`,
          {
            hostProps: {
              items: items,
              selectedIndex: defaultSelectedIndex,
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

      describe('when changing selected index', () => {
        it('should have correct new selected item', () => {
          const newSelectedIndex = 0;
          const expectedItem = items[newSelectedIndex];
          spectator.setHostInput('selectedIndex', newSelectedIndex);
          spectator.detectChanges();
          expect(spectator.component.value).toEqual(expectedItem);
        });

        it('should have selected text from new selected item', () => {
          const newSelectedIndex = 0;
          const expectedText = items[newSelectedIndex].text;
          spectator.setHostInput('selectedIndex', newSelectedIndex);
          spectator.detectChanges();
          expect(spectator.component.selectedText).toEqual(expectedText);
          expect(buttonElement).toHaveText(expectedText, true);
        });

        it('should not emit change event', () => {
          const newSelectedIndex = 0;
          const onChangeSpy = spyOn(spectator.component.change, 'emit');
          spectator.setHostInput('selectedIndex', newSelectedIndex);
          spectator.detectChanges();
          expect(onChangeSpy).not.toHaveBeenCalled();
        });
      });
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
        `<kirby-dropdown [usePopover]="true" [items]="items">
           <kirby-item
             *kirbyListItemTemplate="let item; let selected = selected"
             selectable="true"
             [selected]="selected">
             @if (selected) {
               <kirby-icon name="checkmark-selected" slot="start"></kirby-icon>
             }
             <p>{{ item.title }}</p>
           </kirby-item>
         </kirby-dropdown>`,
        {
          hostProps: {
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

  describe('with popover enabled', () => {
    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        ItemComponent,
        MockComponents(ButtonComponent, CardComponent, IconComponent, IonItem, PopoverComponent),
      ],
    });

    let spectator: SpectatorHost<DropdownComponent>;
    let popoverElement: HTMLElement;

    beforeEach(() => {
      spectator = createHost(`<kirby-dropdown [usePopover]="true"></kirby-dropdown>`, {
        hostProps: {
          items: items,
        },
      });
      popoverElement = spectator.query('kirby-popover');
    });

    it("should render with embedded 'kirby-popover' component", () => {
      expect(popoverElement).toBeTruthy();
    });

    it("should render 'kirby-popover' with correct max-height", () => {
      expect(popoverElement).toHaveComputedStyle({ '--max-height': '352px' });
    });
  });
});
