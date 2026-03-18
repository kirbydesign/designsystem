import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { InputComponent } from '@kirbydesign/designsystem/form-field';
import { MultiSelectAutocompleteComponent } from './multi-select-autocomplete.component';

describe('MultiSelectAutocomplete', () => {
  let spectator: SpectatorHost<MultiSelectAutocompleteComponent>;

  const items = [
    { text: 'Item 1', value: 1 },
    { text: 'Item 2', value: 2 },
    { text: 'Item 3', value: 3 },
    { text: 'Item 4', value: 4 },
    { text: 'Item 5', value: 5 },
  ];
  const openDelayInMs = DropdownComponent.OPEN_DELAY_IN_MS;

  afterEach(() => {
    // Ensure dropdown is closed to trigger popover cleanup
    if (spectator?.component?.isOpen) {
      spectator.component.close();
      spectator.detectChanges();
    }
    // Clean up any lingering popover elements from document.body
    document.querySelectorAll('kirby-popover').forEach((el) => el.remove());
  });

  describe('by default', () => {
    const createHost = createHostFactory({
      component: MultiSelectAutocompleteComponent,
      imports: [
        TestHelper.ionicModuleForTest,
        ItemComponent,
        InputComponent,
        CardComponent,
        IconComponent,
        PopoverComponent,
      ],
    });

    let inputElement: HTMLInputElement | null;

    beforeEach(() => {
      spectator = createHost(
        `<kirby-multi-select-autocomplete [items]="items"></kirby-multi-select-autocomplete>`,
        {
          hostProps: {
            items: items,
          },
        }
      );
      inputElement = spectator.query('input[kirby-input]');
    });

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

    it('should have tabindex="0" by default on button', () => {
      expect(inputElement).toHaveAttribute('tabindex', '0');
    });

    it('should have correct id on button', () => {
      const inputId = spectator.component._comboboxId;
      expect(inputElement?.getAttribute('id')).toBe(inputId);
    });
  });
});
