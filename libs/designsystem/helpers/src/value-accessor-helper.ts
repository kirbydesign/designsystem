import { ControlValueAccessor } from '@angular/forms';

/**
 * Configuration for extending a ControlValueAccessor's `writeValue` method.
 * @typeParam T - The type of value being written
 */
export interface WriteValueExtension<T = unknown> {
  /**
   * Callback invoked after `writeValue` is called on each accessor.
   * @param value - The value being written
   */
  afterWriteValue: (value: T) => void;
}

/**
 * Configuration for extending a ControlValueAccessor's `registerOnChange` method.
 * @typeParam TInput - The type of value received from the input
 * @typeParam TOutput - The type of value passed to the form control
 */
export interface RegisterOnChangeExtension<TInput = unknown, TOutput = unknown> {
  /**
   * Transform the value before it's passed to the original onChange function.
   * @param value - The original value from the input event
   * @returns The transformed value to pass to the form control
   */
  transformValue: (value: TInput) => TOutput;
}

/**
 * Configuration options for extending ControlValueAccessor methods.
 * @typeParam TWrite - The type of value for writeValue
 * @typeParam TChangeInput - The type of value received in registerOnChange
 * @typeParam TChangeOutput - The type of value output from registerOnChange
 */
export interface ValueAccessorExtensionConfig<
  TWrite = unknown,
  TChangeInput = unknown,
  TChangeOutput = unknown,
> {
  /**
   * Configuration for extending `writeValue`.
   * When provided, the `afterWriteValue` callback will be invoked after each accessor's
   * `writeValue` method is called.
   */
  writeValue?: WriteValueExtension<TWrite>;

  /**
   * Configuration for extending `registerOnChange`.
   * When provided, the `transformValue` function will be used to transform values
   * before they're passed to the form control's onChange handler.
   */
  registerOnChange?: RegisterOnChangeExtension<TChangeInput, TChangeOutput>;
}

/**
 * Extends the methods of provided ControlValueAccessors.
 *
 * This utility wraps the original methods to add custom behavior while preserving
 * the original functionality. It's commonly used to:
 * - Emit custom events when values are written programmatically
 * - Transform or normalize values before they're passed to form controls
 *
 * @param accessors - Array of ControlValueAccessors to extend, typically injected via `NG_VALUE_ACCESSOR`
 * @param config - Configuration specifying which methods to extend and how
 *
 * @example
 * // Simple usage - emit changes when writeValue is called
 * extendValueAccessors(this.valueAccessors, {
 *   writeValue: {
 *     afterWriteValue: (value) => this.kirbyChange.emit(value)
 *   }
 * });
 *
 * @example
 * // Advanced usage - transform values in registerOnChange
 * extendValueAccessors(this.valueAccessors, {
 *   writeValue: {
 *     afterWriteValue: (value) => this.updateDisplay(value)
 *   },
 *   registerOnChange: {
 *     transformValue: (value) => this.normalizeValue(value)
 *   }
 * });
 */
export function extendValueAccessors<
  TWrite = unknown,
  TChangeInput = unknown,
  TChangeOutput = unknown,
>(
  accessors: ControlValueAccessor[] | null | undefined,
  config: ValueAccessorExtensionConfig<TWrite, TChangeInput, TChangeOutput>
): void {
  if (!accessors) return;

  accessors.forEach((accessor) => {
    if (config.writeValue) {
      extendWriteValue(accessor, config.writeValue);
    }

    if (config.registerOnChange) {
      extendRegisterOnChange(accessor, config.registerOnChange);
    }
  });
}

function extendWriteValue<T>(
  accessor: ControlValueAccessor,
  extension: WriteValueExtension<T>
): void {
  const originalWriteValue = accessor.writeValue?.bind(accessor);

  accessor.writeValue = (value: T) => {
    if (originalWriteValue) {
      originalWriteValue(value);
    }
    extension.afterWriteValue(value);
  };
}

function extendRegisterOnChange<TInput, TOutput>(
  accessor: ControlValueAccessor,
  extension: RegisterOnChangeExtension<TInput, TOutput>
): void {
  const originalRegisterOnChange = accessor.registerOnChange?.bind(accessor);

  if (originalRegisterOnChange) {
    accessor.registerOnChange = (fn: (value: TOutput) => void) => {
      const wrappedFn = (value: TInput) => {
        fn(extension.transformValue(value));
      };
      originalRegisterOnChange(wrappedFn);
    };
  }
}
