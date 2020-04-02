import {
  Spectator,
  createComponentFactory,
  createHostFactory,
  SpectatorHost,
} from '@ngneat/spectator';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';
import { IonItem } from '@ionic/angular';

import { DropdownComponent } from './dropdown.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { CardComponent } from '../card/card.component';
import { ItemComponent } from '../item/item.component';

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
    let spectator: Spectator<DropdownComponent>;
    let buttonElement: HTMLButtonElement;

    const createComponent = createComponentFactory({
      component: DropdownComponent,
      declarations: [
        MockComponents(ButtonComponent, CardComponent, ItemComponent, IconComponent, IonItem),
      ],
    });

    beforeEach(() => {
      spectator = createComponent({
        props: {
          items: items,
        },
      });
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

    it('should have selected index = -1', () => {
      expect(spectator.component.selectedIndex).toEqual(-1);
    });

    it('should have default placeholder text', () => {
      expect(buttonElement).toHaveText(spectator.component.placeholder, true);
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

    it('should not render button as disabled ', () => {
      expect(buttonElement.disabled).toBeFalsy();
    });

    it('should not render disabled attribute on button', () => {
      expect(buttonElement.attributes['disabled']).toBeUndefined();
    });

    it('should receive focus', () => {
      spectator.element.focus();
      spectator.detectChanges();
      expect(spectator.element).toBeFocused();
    });

    it('should receive focus on button click', () => {
      spectator.click('button');
      expect(spectator.element).toBeFocused();
    });

    describe('when setting selected index', () => {
      let onChangeSpy: jasmine.Spy;
      const newSelectedIndex = 2;
      const expectedItem = items[newSelectedIndex];
      const expectedText = expectedItem.text;

      beforeEach(() => {
        onChangeSpy = spyOn(spectator.component.change, 'emit');
        spectator.setInput('selectedIndex', newSelectedIndex);
        spectator.detectChanges();
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
        spectator.component.isOpen = true;
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
        spectator.component.isOpen = false;
        spectator.detectChanges();
      });

      it('should have correct icon', () => {
        const icon = spectator.query<IconComponent>(IconComponent);
        expect(icon.name).toEqual('arrow-down');
      });

      describe('and button is clicked', () => {
        beforeEach(fakeAsync(() => {
          spectator.click('button');
          spectator.detectChanges();
          tick(openDelayInMs);
        }));
        it('should open dropdown', () => {
          expect(spectator.component.isOpen).toBeTruthy();
        });
        it('should recieve focus', () => {
          expect(spectator.element).toBeFocused();
        });
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
        });
        describe('and End key is pressed', () => {
          it('should not change selected item', () => {
            spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'End');
            expect(spectator.component.selectedIndex).toEqual(lastIndex);
          });
        });
      });

      const testMatrix = [
        {
          key: 'ArrowLeft',
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
          key: 'ArrowRight',
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
              spectator.setInput('selectedIndex', scenario.selectedIndex);
              for (let counter = 0; counter < scenario.keypressCount; counter++) {
                spectator.dispatchKeyboardEvent(spectator.element, 'keydown', keyEvent.key);
              }
              expect(spectator.component.selectedIndex).toEqual(scenario.expectedIndex);
              expect(spectator.component.value).toEqual(items[scenario.expectedIndex]);
            });
          });
        });
      });
    });

    describe('when open', () => {
      beforeEach(() => {
        spectator.component.isOpen = true;
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
        it('should not close dropdown', () => {
          spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Space');
          expect(spectator.component.isOpen).toBeTruthy();
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
          describe(`and selected item = ${scenario.selectedIndex} and ${keyEvent.key} key is pressed ${scenario.keypressCount} time(s)`, () => {
            it(`should set selected item = ${scenario.expectedIndex}`, () => {
              spectator.setInput('selectedIndex', scenario.selectedIndex);
              for (let counter = 0; counter < scenario.keypressCount; counter++) {
                spectator.dispatchKeyboardEvent(spectator.element, 'keydown', keyEvent.key);
              }
              expect(spectator.component.selectedIndex).toEqual(scenario.expectedIndex);
              expect(spectator.component.value).toEqual(items[scenario.expectedIndex]);
            });
          });
        });
      });
    });

    describe('when aligned to right side of viewport', () => {
      it('should align the dropdown to the right side of button and component container ', (done) => {
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

  describe('when configured with selected index', () => {
    let spectator: SpectatorHost<DropdownComponent>;
    let buttonElement: HTMLButtonElement;

    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        MockComponents(ButtonComponent, CardComponent, ItemComponent, IconComponent, IonItem),
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
    let buttonElement: HTMLButtonElement;
    let cardElement: HTMLElement;

    const createHost = createHostFactory({
      component: DropdownComponent,
      declarations: [
        MockComponents(ButtonComponent, CardComponent, ItemComponent, IconComponent, IonItem),
      ],
      host: OnPushHostComponent,
    });

    beforeEach(() => {
      spectator = createHost(`<kirby-dropdown></kirby-dropdown>`, {
        props: {
          items: items,
        },
      });
      buttonElement = spectator.query('button[kirby-button]');
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
});
