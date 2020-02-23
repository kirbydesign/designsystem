import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { fakeAsync, tick } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';
import { IonItem } from '@ionic/angular';

import { DropdownComponent } from './dropdown.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { CardComponent } from '../card/card.component';
import { ItemComponent } from '../item/item.component';

describe('DropdownComponent', () => {
  let spectator: Spectator<DropdownComponent>;
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const createHost = createComponentFactory({
    imports: [],
    component: DropdownComponent,
    declarations: [
      MockComponents(ButtonComponent, CardComponent, ItemComponent, IconComponent, IonItem),
    ],
  });

  beforeEach(() => {
    spectator = createHost({
      props: {
        items: items,
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should be closed', () => {
    expect(spectator.component.isOpen).toBeFalsy();
  });

  it('should have default placeholder text', () => {
    expect(spectator.component.selectedText).toEqual(spectator.component.placeholder);
    expect(spectator.element).toHaveText(spectator.component.placeholder);
  });

  it('should render as inline block', () => {
    expect(spectator.element).toHaveComputedStyle({ display: 'inline-block' });
  });

  it('should render button with default attentionLevel', () => {
    const button = spectator.query(ButtonComponent);
    expect(button.attentionLevel).toEqual('3');
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
      const button = spectator.query('button[kirby-button]');
      const componentWidth = spectator.element.getBoundingClientRect().width;
      const buttonWidth = button.getBoundingClientRect().width;
      expect(buttonWidth).toEqual(componentWidth);
    });

    it('should render dropdown with full width', () => {
      spectator.component.isOpen = true;
      spectator.detectChanges();
      const card = spectator.query('kirby-card');
      const componentWidth = spectator.element.getBoundingClientRect().width;
      const cardWidth = card.getBoundingClientRect().width;
      expect(cardWidth).toEqual(componentWidth);
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
        spectator.dispatchMouseEvent('button', 'click');
        spectator.detectChanges();
        tick();
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
        tick();
      }));
      it('should open dropdown', () => {
        expect(spectator.component.isOpen).toBeTruthy();
      });
    });

    describe('and Enter key is pressed', () => {
      beforeEach(fakeAsync(() => {
        spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
        tick();
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
        describe(`and selected item = ${scenario.selectedIndex} and ${
          keyEvent.key
        } key is pressed ${scenario.keypressCount} time(s)`, () => {
          it(`should set selected item = ${scenario.expectedIndex}`, () => {
            spectator.setInput('selectedIndex', scenario.selectedIndex);
            for (let counter = 0; counter < scenario.keypressCount; counter++) {
              spectator.dispatchKeyboardEvent(spectator.element, 'keydown', keyEvent.key);
            }
            expect(spectator.component.selectedIndex).toEqual(scenario.expectedIndex);
            expect(spectator.component.selectedItem).toEqual(items[scenario.expectedIndex]);
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
      beforeEach(fakeAsync(() => {
        spectator.dispatchMouseEvent('button', 'click');
        spectator.detectChanges();
        tick();
      }));
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
        describe(`and selected item = ${scenario.selectedIndex} and ${
          keyEvent.key
        } key is pressed ${scenario.keypressCount} time(s)`, () => {
          it(`should set selected item = ${scenario.expectedIndex}`, () => {
            spectator.setInput('selectedIndex', scenario.selectedIndex);
            for (let counter = 0; counter < scenario.keypressCount; counter++) {
              spectator.dispatchKeyboardEvent(spectator.element, 'keydown', keyEvent.key);
            }
            expect(spectator.component.selectedIndex).toEqual(scenario.expectedIndex);
            expect(spectator.component.selectedItem).toEqual(items[scenario.expectedIndex]);
          });
        });
      });
    });
  });
});
