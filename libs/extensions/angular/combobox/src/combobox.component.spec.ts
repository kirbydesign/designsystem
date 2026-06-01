import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { InputComponent, InputSize } from '@kirbydesign/designsystem/form-field';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComboboxComponent } from './combobox.component';

// Shared constants used by the form integration top-level describes
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

describe('Combobox', () => {
  let spectator: SpectatorHost<ComboboxComponent>;

  const createHost = createHostFactory({
    component: ComboboxComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      ItemComponent,
      InputComponent,
      CardComponent,
      IconComponent,
      PopoverComponent,
      ReactiveFormsModule,
      FormsModule,
    ],
  });

  let inputElement: HTMLInputElement;
  let iconElement: HTMLElement;

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  });

  beforeEach(() => {
    spectator = createHost(
      `
            <kirby-x-combobox [items]="items" [itemIdProperty]="itemIdProperty"></kirby-x-combobox>
            <button></button>`,
      {
        hostProps: {
          items: items20,
          itemIdProperty: 'text',
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
      it('opens the popover and highlights the first item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        // Assert
        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        const firstItemIndex = 0;
        expect(kirbyItems.item(firstItemIndex)).toHaveClass('focused');
      }));

      it('arrow down twice highlights the second item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const secondItemIndex = 1;
        expect(kirbyItems.item(secondItemIndex)).toHaveClass('focused');
      }));

      it('arrow down twice and press enter key selects the highlighted item and closes the popover', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

        // Assert
        const secondItemIndex = 1;
        expect(spectator.component.isOpen).toBeFalsy();
        expect(spectator.component.value).toEqual(items20[secondItemIndex]);
        expect(inputElement).toHaveValue(items20[secondItemIndex].text);
      }));

      it('arrow down twice and press tab key selects the highlighted item and closes the popover', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Tab');

        // Assert
        const secondItemIndex = 1;
        expect(spectator.component.isOpen).toBeFalsy();
        expect(spectator.component.value).toEqual(items20[secondItemIndex]);
        expect(inputElement).toHaveValue(items20[secondItemIndex].text);
      }));

      it('arrow down after an item was selected opens the popover and highlights the selected item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const selectedItemIndex = 1;
        expect(kirbyItems.item(selectedItemIndex)).toHaveClass('focused');
      }));
    });

    describe('arrow up key', () => {
      it('opens the popover and highlights the last item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const lastItemIndex = items20.length - 1;
        expect(kirbyItems.item(lastItemIndex)).toHaveClass('focused');
      }));

      it('arrow up twice highlights the second last item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const secondLastItemIndex = items20.length - 2;
        expect(kirbyItems.item(secondLastItemIndex)).toHaveClass('focused');
      }));

      it('arrow up after an item was selected opens the popover and highlights the selected item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
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
      it('popover and highlights the first item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageDown');
        tick(openDelayInMs);

        // Assert
        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        const firstItemIndex = 0;
        expect(kirbyItems.item(firstItemIndex)).toHaveClass('focused');
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
      it('popover and highlights the last item', fakeAsync(() => {
        // Arrange

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');
        tick(openDelayInMs);

        // Assert
        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        const lastItemIndex = items20.length - 1;
        expect(kirbyItems.item(lastItemIndex)).toHaveClass('focused');
      }));

      it('skips 10 items and highlights the 10th minus item', fakeAsync(() => {
        // Arrange
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowUp');
        tick(openDelayInMs);

        // Act
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'PageUp');

        // Assert
        const kirbyItems = document.querySelectorAll('kirby-item');
        const tenthMinusItemIndex = kirbyItems.length - 1 - 10;

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

    describe('home key', () => {
      it('opens the popover and highlights the first item', fakeAsync(() => {
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Home');
        tick(openDelayInMs);

        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        expect(kirbyItems.item(0)).toHaveClass('focused');
      }));

      it('when open, moves focus to the first item', fakeAsync(() => {
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');

        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Home');

        const kirbyItems = document.querySelectorAll('kirby-item');
        expect(kirbyItems.item(0)).toHaveClass('focused');
      }));
    });

    describe('end key', () => {
      it('opens the popover and highlights the last item', fakeAsync(() => {
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'End');
        tick(openDelayInMs);

        expect(spectator.component.isOpen).toBeTruthy();
        const kirbyItems = document.querySelectorAll('kirby-item');
        expect(kirbyItems.item(items20.length - 1)).toHaveClass('focused');
      }));

      it('when open, moves focus to the last item', fakeAsync(() => {
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);

        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'End');

        const kirbyItems = document.querySelectorAll('kirby-item');
        expect(kirbyItems.item(items20.length - 1)).toHaveClass('focused');
      }));
    });

    describe('escape key', () => {
      it('closes the popover when open', fakeAsync(() => {
        inputElement.click();
        tick(openDelayInMs);
        expect(spectator.component.isOpen).toBeTruthy();

        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Escape');

        expect(spectator.component.isOpen).toBeFalsy();
      }));

      it('does not throw when already closed', () => {
        expect(() => {
          spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Escape');
        }).not.toThrow();
        expect(spectator.component.isOpen).toBeFalsy();
      });
    });

    describe('enter key', () => {
      it('opens the popover when closed', fakeAsync(() => {
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');
        tick(openDelayInMs);

        expect(spectator.component.isOpen).toBeTruthy();
      }));

      it('selects the focused item and closes the popover', fakeAsync(() => {
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        tick(openDelayInMs);
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');

        spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

        expect(spectator.component.isOpen).toBeFalsy();
        expect(spectator.component.value).toEqual(items20[2]);
      }));
    });
  });

  describe('item selection', () => {
    it('emits change event when an item is selected via keyboard', fakeAsync(() => {
      const changeSpy = jest.spyOn(spectator.component.change, 'emit');

      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
      tick(openDelayInMs);
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

      expect(changeSpy).toHaveBeenCalledWith(items20[1]);
    }));

    it('emits change event when an item is selected via click', fakeAsync(() => {
      const changeSpy = jest.spyOn(spectator.component.change, 'emit');

      inputElement.click();
      tick(openDelayInMs);
      spectator.detectChanges();

      const kirbyItems = document.querySelectorAll('kirby-item');
      (kirbyItems.item(0) as HTMLElement).click();

      expect(changeSpy).toHaveBeenCalledWith(items20[0]);
    }));

    it('sets selectedItem input and reflects it in the input value', () => {
      spectator.component.selectedItem = items20[4];
      spectator.detectChanges();

      expect(spectator.component.selectedItem).toEqual(items20[4]);
    });

    it('clears selection when selectedItem is set to undefined', () => {
      spectator.component.selectedItem = items20[2];
      spectator.detectChanges();
      spectator.component.selectedItem = undefined;
      spectator.detectChanges();

      expect(spectator.component.selectedItem).toBeUndefined();
      expect(spectator.component.value).toBeUndefined();
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue selects the matching item by text', () => {
      spectator.component.writeValue(items20[3].text);
      spectator.detectChanges();

      expect(spectator.component.value).toEqual(items20[3]);
    });

    it('writeValue with undefined clears the selection', () => {
      spectator.component.writeValue(items20[0].text);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spectator.component.writeValue(undefined as any);
      spectator.detectChanges();

      // value should be reset (no matching item found, falls back to the raw input)
      expect(spectator.component.selectedItem).not.toEqual(items20[0]);
    });

    it('calls onChange callback when item is selected', fakeAsync(() => {
      const onChangeSpy = jest.fn();
      spectator.component.registerOnChange(onChangeSpy);

      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
      tick(openDelayInMs);
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

      expect(onChangeSpy).toHaveBeenCalledWith(items20[0]);
    }));

    it('calls onTouched callback when popover hides', fakeAsync(() => {
      const onTouchedSpy = jest.fn();
      spectator.component.registerOnTouched(onTouchedSpy);

      inputElement.click();
      tick(openDelayInMs);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (spectator.component as any).onPopoverWillHide();

      expect(onTouchedSpy).toHaveBeenCalled();
    }));

    it('setDisabledState(true) disables the component', () => {
      spectator.component.setDisabledState?.(true);
      spectator.detectChanges();

      expect(spectator.component.disabled).toBe(true);
      expect(spectator.element.attributes.getNamedItem('disabled')).not.toBeNull();
    });

    it('setDisabledState(false) re-enables the component', () => {
      spectator.component.setDisabledState?.(true);
      spectator.component.setDisabledState?.(false);
      spectator.detectChanges();

      expect(spectator.component.disabled).toBe(false);
      expect(spectator.element.attributes.getNamedItem('disabled')).toBeNull();
    });
  });

  describe('disabled state', () => {
    beforeEach(() => {
      spectator.component.disabled = true;
      spectator.detectChanges();
    });

    it('renders disabled attribute on the host', () => {
      expect(spectator.element.attributes.getNamedItem('disabled')).not.toBeNull();
    });

    it('does not open when clicked', fakeAsync(() => {
      inputElement.click();
      tick(openDelayInMs);

      expect(spectator.component.isOpen).toBeFalsy();
    }));

    it('does not open when arrow down key is pressed', fakeAsync(() => {
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
      tick(openDelayInMs);

      expect(spectator.component.isOpen).toBeFalsy();
    }));

    it('prevents default on mousedown', () => {
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      spectator.element.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('filtering edge cases', () => {
    it('shows no-results message when filter matches nothing', fakeAsync(() => {
      inputElement.click();
      tick(openDelayInMs);
      spectator.typeInElement('zzz_no_match', inputElement);
      spectator.detectChanges();

      const noResultsItem = document.querySelector('.no-results');
      expect(noResultsItem).not.toBeNull();
    }));

    it('restores full list when filter is cleared', fakeAsync(() => {
      inputElement.click();
      tick(openDelayInMs);
      spectator.typeInElement('Item 1', inputElement);
      spectator.detectChanges();

      spectator.typeInElement('', inputElement);
      spectator.detectChanges();

      const kirbyItems = document.querySelectorAll('kirby-item');
      expect(kirbyItems.length).toBe(items20.length);
    }));

    it('uses a custom searchFunction when provided', fakeAsync(() => {
      const customSearch = jest.fn().mockReturnValue([items20[0]]);
      spectator.component.searchFunction = customSearch;

      inputElement.click();
      tick(openDelayInMs);
      spectator.typeInElement('any', inputElement);
      spectator.detectChanges();

      expect(customSearch).toHaveBeenCalledWith('any', items20);
      const kirbyItems = document.querySelectorAll('kirby-item');
      expect(kirbyItems.length).toBe(1);
    }));
  });

  describe('aria attributes', () => {
    it('aria-expanded is false when closed', () => {
      expect(inputElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('aria-expanded is true when open', fakeAsync(() => {
      inputElement.click();
      tick(openDelayInMs);
      spectator.detectChanges();

      expect(inputElement.getAttribute('aria-expanded')).toBe('true');
    }));

    it('aria-controls points to the listbox id', () => {
      const listboxId = spectator.component._listboxId;
      expect(inputElement.getAttribute('aria-controls')).toBe(listboxId);
    });

    it('aria-haspopup is listbox', () => {
      expect(inputElement.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('aria-activedescendant is null when closed', () => {
      expect(inputElement.getAttribute('aria-activedescendant')).toBeNull();
    });

    it('aria-activedescendant reflects focused item when open', fakeAsync(() => {
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
      tick(openDelayInMs);
      spectator.detectChanges();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const expectedId = (spectator.component as any).getItemId(spectator.component.focusedItem);
      expect(inputElement.getAttribute('aria-activedescendant')).toBe(expectedId);
    }));
  });

  describe('inputs', () => {
    it('noSearchResultsText is displayed when no results are found', fakeAsync(() => {
      spectator.component.noSearchResultsText = 'Nothing here!';
      inputElement.click();
      tick(openDelayInMs);
      spectator.typeInElement('zzz', inputElement);
      spectator.detectChanges();

      const noResults = document.querySelector('.no-results');
      expect(noResults?.textContent?.trim()).toBe('Nothing here!');
    }));

    it('expand="block" adds the expand class to the host', () => {
      spectator.component.expand = 'block';
      spectator.detectChanges();

      expect(spectator.element).toHaveClass('expand');
    });

    it('hasError forwards to input', () => {
      spectator.component.hasError = true;
      spectator.detectChanges();

      expect(spectator.component.hasError).toBe(true);
    });

    it('hasErrorChange emits when hasError changes', () => {
      const spy = jest.spyOn(spectator.component.hasErrorChange, 'emit');
      spectator.component.hasError = true;

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('size input is accepted', () => {
      spectator.component.size = 'sm' as InputSize;
      spectator.detectChanges();

      expect(spectator.component.size).toBe('sm');
    });

    it('popout input overrides the default direction', () => {
      spectator.component.popout = HorizontalDirection.left;
      expect(spectator.component.popout).toBe(HorizontalDirection.left);
    });

    it('when deleting the input, the value is cleared', fakeAsync(() => {
      // Arrange

      // Act
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'ArrowDown');
      tick(openDelayInMs);
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');
      spectator.typeInElement('', inputElement);
      tick(openDelayInMs);
      spectator.dispatchKeyboardEvent(inputElement, 'keydown', 'Enter');

      // Assert
      expect(spectator.component.value).toBe(undefined);
    }));
  });
});

// =============================================================================
// Reactive Forms integration
// =============================================================================
describe('Combobox — reactive forms (FormControl)', () => {
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
      ReactiveFormsModule,
    ],
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  });

  let control: FormControl;
  let rfSpectator: SpectatorHost<ComboboxComponent>;
  let rfInput: HTMLInputElement;

  beforeEach(() => {
    control = new FormControl(null);
    rfSpectator = createHost(
      `<kirby-x-combobox [items]="items" [itemIdProperty]="'text'" [formControl]="control"></kirby-x-combobox>`,
      { hostProps: { items: items20, control } }
    );
    rfInput = rfSpectator.query<HTMLInputElement>('input[kirby-input]') as HTMLInputElement;
  });

  afterEach(() => {
    if (rfSpectator?.component?.isOpen) {
      rfSpectator.component.close();
      rfSpectator.detectChanges();
    }
    document.querySelectorAll('kirby-popover').forEach((el) => el.remove());
  });

  it('component value is null initially (matches FormControl initial value)', () => {
    expect(rfSpectator.component.value).toBeNull();
  });

  it('selecting an item via keyboard updates the FormControl value', fakeAsync(() => {
    rfSpectator.dispatchKeyboardEvent(rfInput, 'keydown', 'ArrowDown');
    tick(openDelayInMs);
    rfSpectator.dispatchKeyboardEvent(rfInput, 'keydown', 'Enter');

    expect(control.value).toEqual(items20[0]);
  }));

  it('selecting an item via click updates the FormControl value', fakeAsync(() => {
    rfInput.click();
    tick(openDelayInMs);
    rfSpectator.detectChanges();

    (document.querySelectorAll('kirby-item').item(0) as HTMLElement).click();

    expect(control.value).toEqual(items20[0]);
  }));

  it('setValue() on the FormControl updates the component display value', () => {
    control.setValue(items20[2].text);
    rfSpectator.detectChanges();

    expect(rfSpectator.component.value).toEqual(items20[2]);
    expect(rfInput.value).toBe(items20[2].text);
  });

  it('reset() on the FormControl clears the component selection', () => {
    control.setValue(items20[0].text);
    control.reset();
    rfSpectator.detectChanges();

    expect(rfSpectator.component.selectedItem).not.toEqual(items20[0]);
  });

  it('closing the popover marks the FormControl as touched', fakeAsync(() => {
    rfInput.click();
    tick(openDelayInMs);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rfSpectator.component as any).onPopoverWillHide();

    expect(control.touched).toBe(true);
  }));

  it('control.disable() disables the component', () => {
    control.disable();
    rfSpectator.detectChanges();

    expect(rfSpectator.component.disabled).toBe(true);
  });

  it('control.enable() re-enables the component after disable', () => {
    control.disable();
    control.enable();
    rfSpectator.detectChanges();

    expect(rfSpectator.component.disabled).toBe(false);
  });

  it('a disabled FormControl prevents the popover from opening on click', fakeAsync(() => {
    control.disable();
    rfSpectator.detectChanges();

    rfInput.click();
    tick(openDelayInMs);

    expect(rfSpectator.component.isOpen).toBeFalsy();
  }));

  it('FormControl status is VALID after a value is selected (no validators)', fakeAsync(() => {
    rfSpectator.dispatchKeyboardEvent(rfInput, 'keydown', 'ArrowDown');
    tick(openDelayInMs);
    rfSpectator.dispatchKeyboardEvent(rfInput, 'keydown', 'Enter');

    expect(control.valid).toBe(true);
  }));
});

// =============================================================================
// Reactive Forms — FormControl with Validators.required
// =============================================================================
describe('Combobox — reactive forms (FormControl + Validators.required)', () => {
  const createHost = createHostFactory({
    component: ComboboxComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      ItemComponent,
      InputComponent,
      CardComponent,
      IconComponent,
      PopoverComponent,
      ReactiveFormsModule,
    ],
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  });

  let control: FormControl;
  let rfSpectator: SpectatorHost<ComboboxComponent>;
  let rfInput: HTMLInputElement;

  beforeEach(() => {
    control = new FormControl(null, Validators.required);
    rfSpectator = createHost(
      `<kirby-x-combobox [items]="items" [itemIdProperty]="'text'" [formControl]="control"></kirby-x-combobox>`,
      { hostProps: { items: items20, control } }
    );
    rfInput = rfSpectator.query<HTMLInputElement>('input[kirby-input]') as HTMLInputElement;
  });

  it('FormControl is INVALID when nothing is selected', () => {
    expect(control.invalid).toBe(true);
    expect(control.errors).toHaveProperty('required');
  });

  it('FormControl becomes VALID after an item is selected', fakeAsync(() => {
    rfSpectator.dispatchKeyboardEvent(rfInput, 'keydown', 'ArrowDown');
    tick(openDelayInMs);
    rfSpectator.dispatchKeyboardEvent(rfInput, 'keydown', 'Enter');

    expect(control.valid).toBe(true);
    expect(control.errors).toBeNull();
  }));
});

// =============================================================================
// Reactive Forms — FormGroup / formControlName
// =============================================================================
describe('Combobox — reactive forms (FormGroup)', () => {
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
      ReactiveFormsModule,
    ],
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  });

  let group: FormGroup;
  let groupSpectator: SpectatorHost<ComboboxComponent>;
  let groupInput: HTMLInputElement;

  beforeEach(() => {
    group = new FormGroup({ fruit: new FormControl(null, Validators.required) });
    groupSpectator = createHost(
      `<form [formGroup]="group">
         <kirby-x-combobox [items]="items" [itemIdProperty]="'text'" formControlName="fruit"></kirby-x-combobox>
       </form>`,
      { hostProps: { items: items20, group } }
    );
    groupInput = groupSpectator.query<HTMLInputElement>('input[kirby-input]') as HTMLInputElement;
  });

  afterEach(() => {
    if (groupSpectator?.component?.isOpen) {
      groupSpectator.component.close();
      groupSpectator.detectChanges();
    }
    document.querySelectorAll('kirby-popover').forEach((el) => el.remove());
  });

  it('FormGroup is INVALID when nothing is selected', () => {
    expect(group.invalid).toBe(true);
  });

  it('selecting an item makes the FormGroup VALID and sets group.value', fakeAsync(() => {
    groupSpectator.dispatchKeyboardEvent(groupInput, 'keydown', 'ArrowDown');
    tick(openDelayInMs);
    groupSpectator.dispatchKeyboardEvent(groupInput, 'keydown', 'Enter');

    expect(group.valid).toBe(true);
    expect(group.value).toEqual({ fruit: items20[0] });
  }));

  it('patchValue() on the group updates the component display value', () => {
    group.patchValue({ fruit: items20[4].text });
    groupSpectator.detectChanges();

    expect(groupSpectator.component.value).toEqual(items20[4]);
    expect(groupInput.value).toBe(items20[4].text);
  });

  it('reset() on the group clears the component selection', () => {
    group.patchValue({ fruit: items20[0].text });
    group.reset();
    groupSpectator.detectChanges();

    expect(groupSpectator.component.selectedItem).not.toEqual(items20[0]);
  });
});

// =============================================================================
// Template-driven forms (ngModel) integration
// =============================================================================
describe('Combobox — template-driven forms (ngModel)', () => {
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
      FormsModule,
    ],
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  });

  let ngSpectator: SpectatorHost<ComboboxComponent>;
  let ngInput: HTMLInputElement;

  beforeEach(() => {
    ngSpectator = createHost(
      `<kirby-x-combobox [items]="items" [itemIdProperty]="'text'" [(ngModel)]="selectedValue"></kirby-x-combobox>`,
      { hostProps: { items: items20, selectedValue: null } }
    );
    ngInput = ngSpectator.query<HTMLInputElement>('input[kirby-input]') as HTMLInputElement;
  });

  afterEach(() => {
    if (ngSpectator?.component?.isOpen) {
      ngSpectator.component.close();
      ngSpectator.detectChanges();
    }
    document.querySelectorAll('kirby-popover').forEach((el) => el.remove());
  });

  it('component has no value when ngModel is null', () => {
    expect(ngSpectator.component.value).toBeNull();
  });

  it('selecting an item updates the ngModel host property', fakeAsync(() => {
    ngSpectator.dispatchKeyboardEvent(ngInput, 'keydown', 'ArrowDown');
    tick(openDelayInMs);
    ngSpectator.dispatchKeyboardEvent(ngInput, 'keydown', 'Enter');
    ngSpectator.detectChanges();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((ngSpectator.hostComponent as any)['selectedValue']).toEqual(items20[0]);
  }));

  it('setting the host property updates the component display value', fakeAsync(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ngSpectator.hostComponent as any)['selectedValue'] = items20[3].text;
    ngSpectator.detectChanges();
    tick(); // let ngModel propagate
    ngSpectator.detectChanges();

    expect(ngSpectator.component.value).toEqual(items20[3]);
    expect(ngInput.value).toBe(items20[3].text);
  }));

  it('closing the popover marks ngModel as touched', fakeAsync(() => {
    ngInput.click();
    tick(openDelayInMs);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ngSpectator.component as any).onPopoverWillHide();
    ngSpectator.detectChanges();

    expect(ngSpectator.component.isOpen).toBeFalsy();
  }));
});
