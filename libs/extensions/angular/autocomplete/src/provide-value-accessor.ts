import { forwardRef, Provider, Type } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Provide value accessor for a component.
 * @param component The component to provide the value accessor for.
 * @returns The provider for the value accessor.
 */
export function provideValueAccessor<T>(component: Type<T>): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
