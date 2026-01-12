import { ControlValueAccessor } from '@angular/forms';
import { extendValueAccessors } from './value-accessor-helper';

describe('extendValueAccessors', () => {
  let mockAccessor: ControlValueAccessor;
  let originalWriteValue: jasmine.Spy;
  let originalRegisterOnChange: jasmine.Spy;

  beforeEach(() => {
    originalWriteValue = jasmine.createSpy('writeValue');
    originalRegisterOnChange = jasmine.createSpy('registerOnChange');

    mockAccessor = {
      writeValue: originalWriteValue,
      registerOnChange: originalRegisterOnChange,
      registerOnTouched: jasmine.createSpy('registerOnTouched'),
      setDisabledState: jasmine.createSpy('setDisabledState'),
    };
  });

  describe('writeValue extension', () => {
    it('should call the original writeValue', () => {
      extendValueAccessors([mockAccessor], {
        writeValue: { afterWriteValue: () => {} },
      });

      mockAccessor.writeValue('test-value');

      expect(originalWriteValue).toHaveBeenCalledWith('test-value');
    });

    it('should call afterWriteValue callback after original writeValue', () => {
      const callOrder: string[] = [];
      originalWriteValue.and.callFake(() => callOrder.push('original'));

      const afterWriteValueSpy = jasmine
        .createSpy('afterWriteValue')
        .and.callFake(() => callOrder.push('after'));

      extendValueAccessors([mockAccessor], {
        writeValue: { afterWriteValue: afterWriteValueSpy },
      });

      mockAccessor.writeValue('test-value');

      expect(callOrder).toEqual(['original', 'after']);
    });

    it('should pass the value to afterWriteValue callback', () => {
      const afterWriteValueSpy = jasmine.createSpy('afterWriteValue');

      extendValueAccessors([mockAccessor], {
        writeValue: { afterWriteValue: afterWriteValueSpy },
      });

      mockAccessor.writeValue('test-value');

      expect(afterWriteValueSpy).toHaveBeenCalledWith('test-value');
    });

    it('should work with multiple accessors', () => {
      const accessor1WriteValue = jasmine.createSpy('accessor1WriteValue');
      const accessor2WriteValue = jasmine.createSpy('accessor2WriteValue');
      const afterWriteValueSpy = jasmine.createSpy('afterWriteValue');

      const accessor1: ControlValueAccessor = {
        writeValue: accessor1WriteValue,
        registerOnChange: () => {},
        registerOnTouched: () => {},
      };

      const accessor2: ControlValueAccessor = {
        writeValue: accessor2WriteValue,
        registerOnChange: () => {},
        registerOnTouched: () => {},
      };

      extendValueAccessors([accessor1, accessor2], {
        writeValue: { afterWriteValue: afterWriteValueSpy },
      });

      accessor1.writeValue('value-1');
      accessor2.writeValue('value-2');

      expect(accessor1WriteValue).toHaveBeenCalledWith('value-1');
      expect(accessor2WriteValue).toHaveBeenCalledWith('value-2');
      expect(afterWriteValueSpy).toHaveBeenCalledTimes(2);
      expect(afterWriteValueSpy).toHaveBeenCalledWith('value-1');
      expect(afterWriteValueSpy).toHaveBeenCalledWith('value-2');
    });
  });

  describe('registerOnChange extension', () => {
    it('should call the original registerOnChange with a wrapped function', () => {
      extendValueAccessors([mockAccessor], {
        registerOnChange: { transformValue: (v) => v },
      });

      const mockOnChange = jasmine.createSpy('onChange');
      mockAccessor.registerOnChange(mockOnChange);

      expect(originalRegisterOnChange).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('should transform the value using transformValue before passing to onChange', () => {
      let capturedOnChange: (value: unknown) => void;
      originalRegisterOnChange.and.callFake((fn: (value: unknown) => void) => {
        capturedOnChange = fn;
      });

      const mockOnChange = jasmine.createSpy('onChange');

      extendValueAccessors([mockAccessor], {
        registerOnChange: { transformValue: (v) => `transformed-${v}` },
      });

      mockAccessor.registerOnChange(mockOnChange);

      // Simulate the input triggering the change
      capturedOnChange!('original-value');

      expect(mockOnChange).toHaveBeenCalledWith('transformed-original-value');
    });

    it('should work with numeric transformations', () => {
      let capturedOnChange: (value: unknown) => void;
      originalRegisterOnChange.and.callFake((fn: (value: unknown) => void) => {
        capturedOnChange = fn;
      });

      const mockOnChange = jasmine.createSpy('onChange');

      extendValueAccessors([mockAccessor], {
        registerOnChange: { transformValue: (v) => parseFloat(v as string) },
      });

      mockAccessor.registerOnChange(mockOnChange);
      capturedOnChange!('42.5');

      expect(mockOnChange).toHaveBeenCalledWith(42.5);
    });
  });

  describe('combined writeValue and registerOnChange extensions', () => {
    it('should extend both methods when both configs are provided', () => {
      let capturedOnChange: (value: unknown) => void;
      originalRegisterOnChange.and.callFake((fn: (value: unknown) => void) => {
        capturedOnChange = fn;
      });

      const afterWriteValueSpy = jasmine.createSpy('afterWriteValue');
      const mockOnChange = jasmine.createSpy('onChange');

      extendValueAccessors([mockAccessor], {
        writeValue: { afterWriteValue: afterWriteValueSpy },
        registerOnChange: { transformValue: (v) => `transformed-${v}` },
      });

      // Test writeValue
      mockAccessor.writeValue('write-test');
      expect(originalWriteValue).toHaveBeenCalledWith('write-test');
      expect(afterWriteValueSpy).toHaveBeenCalledWith('write-test');

      // Test registerOnChange
      mockAccessor.registerOnChange(mockOnChange);
      capturedOnChange!('change-test');
      expect(mockOnChange).toHaveBeenCalledWith('transformed-change-test');
    });
  });

  describe('edge cases', () => {
    it('should handle accessor without writeValue method', () => {
      const accessorWithoutWriteValue: ControlValueAccessor = {
        writeValue: undefined as unknown as (value: unknown) => void,
        registerOnChange: () => {},
        registerOnTouched: () => {},
      };

      const afterWriteValueSpy = jasmine.createSpy('afterWriteValue');

      expect(() =>
        extendValueAccessors([accessorWithoutWriteValue], {
          writeValue: { afterWriteValue: afterWriteValueSpy },
        })
      ).not.toThrow();

      // Should still call afterWriteValue even if original is undefined
      accessorWithoutWriteValue.writeValue('test');
      expect(afterWriteValueSpy).toHaveBeenCalledWith('test');
    });

    it('should handle accessor without registerOnChange method', () => {
      const accessorWithoutRegisterOnChange: ControlValueAccessor = {
        writeValue: () => {},
        registerOnChange: undefined as unknown as (fn: (value: unknown) => void) => void,
        registerOnTouched: () => {},
      };

      expect(() =>
        extendValueAccessors([accessorWithoutRegisterOnChange], {
          registerOnChange: { transformValue: (v) => v },
        })
      ).not.toThrow();
    });

    it('should handle null values in writeValue', () => {
      const afterWriteValueSpy = jasmine.createSpy('afterWriteValue');

      extendValueAccessors([mockAccessor], {
        writeValue: { afterWriteValue: afterWriteValueSpy },
      });

      mockAccessor.writeValue(null);

      expect(originalWriteValue).toHaveBeenCalledWith(null);
      expect(afterWriteValueSpy).toHaveBeenCalledWith(null);
    });

    it('should handle undefined values in writeValue', () => {
      const afterWriteValueSpy = jasmine.createSpy('afterWriteValue');

      extendValueAccessors([mockAccessor], {
        writeValue: { afterWriteValue: afterWriteValueSpy },
      });

      mockAccessor.writeValue(undefined);

      expect(originalWriteValue).toHaveBeenCalledWith(undefined);
      expect(afterWriteValueSpy).toHaveBeenCalledWith(undefined);
    });
  });
});
