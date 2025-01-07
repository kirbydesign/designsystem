import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  HostListener,
  Input,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { filter, map, skip, startWith, tap } from 'rxjs';

import { ChipDirective } from './chip.directive';
import { OptionDirective } from './option.directive';
import { provideValueAccessor } from './provide-value-accessor';
import { ChipComponent } from './chip/chip.component';
import { isIterable } from './is-iterable';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ButtonComponent,
    ItemModule,
    IconModule,
    ReactiveFormsModule,
    ChipComponent,
    CardModule,
    NgTemplateOutlet,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  providers: [provideValueAccessor(AutocompleteComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<T extends { toString(): string }>
  implements ControlValueAccessor
{
  constructor() {
    // output values when they change
    this._emitValueEffect$.pipe(takeUntilDestroyed()).subscribe();

    // open dropdown when input changes
    this._openDropdownEffect$.pipe(takeUntilDestroyed()).subscribe();
  }

  /**
   * Whether the autocomplete is disabled.
   */
  @Input() public set disabled(disabled: boolean | string) {
    this.isDisabled = typeof disabled === 'string' ? true : disabled;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.isDisabled
      ? this.formControl.disable({ emitEvent: false })
      : this.formControl.enable({ emitEvent: false });
  }

  /**
   * The items to display in the autocomplete dropdown.
   */
  public items = input.required<T[]>();

  /**
   * If set, the autocomplete will allow selecting multiple options. The value of the control will then be an array of selected items.
   *
   * Selected items will be displayed as chips. To override the chip template, use the {@link ChipDirective}.
   *
   * Defaults to false.
   */
  public multiple = input<boolean, boolean | string>(false, {
    transform: (value) => (typeof value === 'string' ? true : value),
  });

  /**
   * Optional function to display the selected item in the input field.
   *
   * Defaults to calling `toString()` on the item.
   */
  public displayWith = input<(item: T) => string>((item) => item.toString());

  /**
   * The placeholder text to display in the input field.
   */
  public placeholder = input<string>('');

  /**
   * The label text to display above the input field.
   */
  public label = input<string>('');

  /**
   * The size of the component.
   *
   * Defaults to 'lg'.
   */
  public size = input<'xs' | 'sm' | 'md' | 'lg'>('lg');

  /**
   * Filter predicate to use when filtering items. Provide if you want to customize the filtering/search logic.
   *
   * Defaults to a case-insensitive string match.
   */
  public filterPredicate = input<(item: T, search: string) => boolean>((item, search) =>
    item.toString().toLowerCase().includes(search.toLowerCase())
  );

  /**
   * The direction in which the dropdown should open.
   *
   * Defaults to 'down'.
   */
  public direction = input<'up' | 'down'>('down');

  protected optionTemplate = contentChild(OptionDirective, { read: TemplateRef });
  protected chipTemplate = contentChild(ChipDirective, { read: TemplateRef });

  protected formControl = new FormControl<string>('');
  protected search = toSignal(
    this.formControl.valueChanges.pipe(startWith(this.formControl.value))
  );

  protected values = signal<T[]>([]);

  protected isDisabled = false;
  protected opened = false;
  protected buttonSize = computed(() => (this.size() === 'sm' ? 'xs' : 'sm'));

  protected filteredItems = computed(() =>
    this.items().filter((item) => {
      if (this.multiple()) {
        return (
          !this.values().some((value) => item === value) &&
          this.filterPredicate()(item, this.search() ?? '')
        );
      } else {
        return this.filterPredicate()(item, this.search() ?? '');
      }
    })
  );

  private _input = viewChild<ElementRef<HTMLInputElement>>('input');

  private _emitValueEffect$ = toObservable(this.values).pipe(
    skip(1), // skip signal initial value
    map((values) => (this.multiple() ? values : values[0])),
    map((value) => {
      const isEmpty = value === undefined || (Array.isArray(value) && value.length === 0);

      return isEmpty ? null : value;
    }),
    tap((value) => this.onChange(value))
  );

  private _openDropdownEffect$ = this.formControl.valueChanges.pipe(
    filter(() => this._input()?.nativeElement === document.activeElement),
    filter(() => this.opened === false),
    tap(() => (this.opened = true))
  );

  @HostListener('click', ['$event'])
  public onClick() {
    this._input()?.nativeElement.focus();
  }

  @HostListener('focusout', ['$event'])
  public onBlur(event: FocusEvent) {
    const currentTarget = event?.currentTarget as HTMLElement;
    const relatedTarget = event?.relatedTarget as HTMLElement;

    // ignore if focusout happens inside the component
    if (currentTarget.contains(relatedTarget)) return;

    // reset input field
    if (this.multiple() === false) {
      const currentValue = this.values()[0];

      this.formControl.setValue(currentValue ? this.displayWith()(currentValue) : '');
    }

    this.opened = false;
  }

  public toggle() {
    this.opened = !this.opened;
  }

  public clear() {
    this.values.set([]);
  }

  public select(item: T) {
    if (this.multiple()) {
      this.values.update((values) => [...values, item]);
      this.formControl.setValue('');
    } else {
      this.values.set([item]);
      this.formControl.setValue(this.displayWith()(item));
    }

    this.opened = false;
  }

  public delete(item: T) {
    this.values.update((values) => values.filter((value) => value !== item));
  }

  public onKeyDown(event: KeyboardEvent) {
    // remove last item if Backspace is pressed and input is empty
    if (event.key === 'Backspace' && this.formControl.value === '') {
      this.values.update((values) => values.slice(0, -1));
    }

    // select item if there is only one item in the list on Enter
    if (event.key === 'Enter' && this.filteredItems().length === 1) {
      this.select(this.filteredItems()[0]);
    }
  }

  /**
   * ControlValueAccessor
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function, @typescript-eslint/no-empty-function
  public onChange = (_: T | T[] | null) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function, @typescript-eslint/no-empty-function
  public onTouched = (_: T | T[] | null) => {};

  public writeValue(value: unknown) {
    if (this.multiple()) {
      this.formControl.setValue('');

      if (isIterable<T>(value)) {
        this.values.set([...value]);
      } else if (value !== null && value !== undefined) {
        this.values.set([value as T]);
        this.formControl.setValue(this.displayWith()(value as T));
      }
    } else {
      if (value !== null && value !== undefined) {
        this.values.set([value as T]);
        this.formControl.setValue(this.displayWith()(value as T));
      } else {
        this.values.set([]);
        this.formControl.setValue('');
      }
    }
  }

  public registerOnChange(fn: (value: T | T[] | null) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (value: T | T[] | null) => void) {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
