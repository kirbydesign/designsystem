import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { InputComponent } from '@kirbydesign/designsystem/form-field';
import { fakeAsync, tick } from '@angular/core/testing';
import { ComboboxComponent } from './combobox.component';

describe('Combobox', () => {
  let spectator: SpectatorHost<ComboboxComponent>;

  const items20 = [
    { text: 'Item 1', value: 1 },
    { text: 'Item 2', value: 2 },
    { text: 'Item 3', value: 3 },
    { text: 'Item 4', value: 4 },
    { text: 'Item 5', value: 5 },
    { text: 'Item 6', value: 6 },
    { text: 'Item 7', value: 7 },
    { text: 'Item 8', value: 8 },
    { text: 'Item 9', value: 9 },
    { text: 'Item 10', value: 10 },
    { text: 'Item 11', value: 11 },
    { text: 'Item 12', value: 12 },
    { text: 'Item 13', value: 13 },
    { text: 'Item 14', value: 14 },
    { text: 'Item 15', value: 15 },
    { text: 'Item 16', value: 16 },
    { text: 'Item 17', value: 17 },
    { text: 'Item 18', value: 18 },
    { text: 'Item 19', value: 19 },
    { text: 'Item 20', value: 20 },
  ];
  const openDelayInMs = ComboboxComponent.OPEN_DELAY_IN_MS;

  const createHost = createHostFactory({
    component: ComboboxComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      ItemComponent,
      InputComponent,
      CardComponent,
      IconComponent,
      PopoverComponent,
    ],
  });

  let inputElement: HTMLInputElement;
  let iconElement: HTMLElement;

  beforeEach(() => {
    spectator = createHost(
      `
            <kirby-x-combobox [items]="items"></kirby-x-combobox>
            <button></button>`,
      {
        hostProps: {
          items: items20,
        },
      }
    );
    const inputQuery = spectator.query<HTMLInputElement>('input[kirby-input]');
    if (!inputQuery) throw new Error('Input element not found');
    inputElement = inputQuery;

    const iconQuery = spectator.query<HTMLElement>('kirby-icon');
    if (!iconQuery) throw new Error('Icon element not found');
    iconElement = iconQuery;
  });

  afterEach(() => {
    // Ensure dropdown is closed to trigger popover cleanup
    if (spectator?.component?.isOpen) {
      spectator.component.close();
      spectator.detectChanges();
    }
    // Clean up any lingering popover elements from document.body
    document.querySelectorAll('kirby-popover').forEach((el) => el.remove());
    spectator.component.selectedItem = undefined;
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should be closed', () => {
      expect(spectator.component.isOpen).toBeFalsy();
    });

    it('should not have value', () => {
      expect(spectator.component.value).toBeUndefined();
    });

    it('should have default placeholder text', () => {
      expect(inputElement).toHaveAttribute('placeholder', spectator.component.placeholder);
    });

    it('should have default popout set', () => {
      expect(spectator.component.popout).toEqual(HorizontalDirection.right);
    });

    it('should not render disabled attribute', () => {
      expect(spectator.element.attributes.getNamedItem('disabled')).toBeNull();
    });

    it('should not render button as disabled', () => {
      expect(inputElement?.disabled).toBeFalsy();
    });

    it('should not render disabled attribute on input', () => {
      expect(inputElement?.attributes.getNamedItem('disabled')).toBeNull();
    });

    it('should have type="text" attribute on button', () => {
      expect(inputElement).toHaveAttribute('type', 'text');
    });

    it('should have correct id on button', () => {
      const inputId = spectator.component._comboboxId;
      expect(inputElement?.getAttribute('id')).toBe(inputId);
    });
  });

  describe('clicking', () => {
    it('input field opens the popover and the input has focus', fakeAsync(() => {
      // Arrange

      // Act
      inputElement?.click();
      tick(openDelayInMs);

      // Assert

      expect(spectator.component.isOpen).toBeTruthy();
      expect(inputElement).toBeFocused();
    }));

    it('icon opens the popover and the input has focus', fakeAsync(() => {
      // Arrange

      // Act
      iconElement?.click();
      tick(openDelayInMs);

      // Assert

      expect(spectator.component.isOpen).toBeTruthy();
      expect(inputElement).toBeFocused();
    }));
  });

  describe('filtering', () => {
    it('entering text into the input field filters the popover items', fakeAsync(() => {
      // Arrange

      // Act
      inputElement?.click();
      tick(openDelayInMs);
      spectator.typeInElement('Item 1', inputElement);

      // Assert
      const kirbyItems = document.querySelectorAll('kirby-item');
      expect(kirbyItems.length).toBe(11);
      expect(kirbyItems.item(0)).toHaveText('Item 1');
    }));
  });

  describe('keyboard navigation', () => {
    describe('arrow down key', () => {
      it('opens the popover and highlights the last item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        // Assert
        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        const lastItemIndex = kirbyItems.length - 1;
        expect(kirbyItems.item(lastItemIndex)).toHaveClass('focused');
      }));

      it('arrow down and then arrow up highlights the second last item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const secondLastItemIndex = kirbyItems.length - 2;
        expect(kirbyItems.item(secondLastItemIndex)).toHaveClass('focused');
      }));

      it('arrow down and then arrow up and press enter key selects the highlighted item and closes the popover', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

        // Assert
        const secondLastItemIndex = items20.length - 2;
        expect(spectator.component.isOpen).toBeFalsy();
        expect(spectator.component.value).toEqual(items20[secondLastItemIndex]);
        expect(inputElement).toHaveValue(items20[secondLastItemIndex].text);
      }));

      it('arrow down and then arrow up and press tab key selects the highlighted item and closes the popover', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Tab');

        // Assert
        const secondLastItemIndex = items20.length - 2;
        expect(spectator.component.isOpen).toBeFalsy();
        expect(spectator.component.value).toEqual(items20[secondLastItemIndex]);
        expect(inputElement).toHaveValue(items20[secondLastItemIndex].text);
      }));

      it('arrow down after an item was selected opens the popover and highlights the selected item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const selectedItemIndex = items20.length - 2;
        expect(kirbyItems.item(selectedItemIndex)).toHaveClass('focused');
      }));
    });

    describe('arrow up key', () => {
      it('opens the popover and highlights the first item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const firstItemIndex = 0;
        expect(kirbyItems.item(firstItemIndex)).toHaveClass('focused');
      }));

      it('arrow up and then down highlights the second item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const secondItemIndex = 1;
        expect(kirbyItems.item(secondItemIndex)).toHaveClass('focused');
      }));

      it('arrow up after an item was selected opens the popover and highlights the selected item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const selectedItemIndex = items20.length - 2;
        expect(kirbyItems.item(selectedItemIndex)).toHaveClass('focused');
      }));
    });

    describe('page down key', () => {
      it('popover and highlights the last item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageDown');
        tick(openDelayInMs);

        // Assert
        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        const lastItemIndex = kirbyItems.length - 1;
        expect(kirbyItems.item(lastItemIndex)).toHaveClass('focused');
      }));

      it('skips 10 items and highlights the 10th plus item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'arrowUp');
        tick(openDelayInMs);

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageDown');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const tenthPlusItemIndex = 9;
        expect(kirbyItems.item(tenthPlusItemIndex)).toHaveClass('focused');
      }));

      it('there are less than 10 items left, highlights the last item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageDown');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const lastItemIndex = kirbyItems.length - 1;
        expect(kirbyItems.item(lastItemIndex)).toHaveClass('focused');
      }));
    });

    describe('page up key', () => {
      it('popover and highlights the first item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');
        tick(openDelayInMs);

        // Assert
        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        const firstItemIndex = 0;
        expect(kirbyItems.item(firstItemIndex)).toHaveClass('focused');
      }));

      it('skips 10 items and highlights the 10th minus item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const tenthMinusItemIndex = kirbyItems.length - 1 - 10;

        kirbyItems.forEach((element) => {
          console.log(element.className);
        });

        expect(kirbyItems.item(tenthMinusItemIndex)).toHaveClass('focused');
      }));

      it('there are less than 10 items left, highlights the first item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const firstItemIndex = 0;
        expect(kirbyItems.item(firstItemIndex)).toHaveClass('focused');
      }));
    });
  });
});
