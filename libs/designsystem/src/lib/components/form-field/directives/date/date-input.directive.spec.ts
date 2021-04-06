import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { IMaskModule } from 'angular-imask';

import { DateInputDirective } from './date-input.directive';
import { DateMaskService } from './date-mask.service';

describe('DateInputDirective', () => {
  let spectator: SpectatorDirective<DateInputDirective>;
  const createDirective = createDirectiveFactory({
    directive: DateInputDirective,
    imports: [IMaskModule],
    providers: [DateMaskService],
  });

  beforeEach(() => {
    spectator = createDirective(`<input kirby-input type="date" />`);
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  it('should have initial date-mask value', () => {
    expect(spectator.element).toHaveValue('mm/dd/yyyy');
  });

  it('should keep date-mask when typing', () => {
    spectator.typeInElement('11', spectator.element);
    expect(spectator.element).toHaveValue('11/dd/yyyy');
  });

  it('should have inputmode="numeric"', () => {
    expect((spectator.element as HTMLInputElement).inputMode).toBe('numeric');
  });

  it('should replace type="date", with type="text"', () => {
    expect((spectator.element as HTMLInputElement).type).toBe('text');
  });

  it('should only allow numbers or valid date formats', () => {
    spectator.typeInElement('a', spectator.element);
    expect(spectator.element).toHaveValue('mm/dd/yyyy');

    spectator.typeInElement('01-01-2021', spectator.element);
    expect(spectator.element).toHaveValue('01/01/2021');

    spectator.typeInElement('01/01/2021', spectator.element);
    expect(spectator.element).toHaveValue('01/01/2021');
  });

  describe('month', () => {
    it('should replace numbers > 1, as first character with "1"', () => {
      spectator.typeInElement('0', spectator.element);
      expect(spectator.element).toHaveValue('0m/dd/yyyy');

      spectator.typeInElement('2', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('3', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('4', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('5', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('6', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('7', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('8', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');

      spectator.typeInElement('9', spectator.element);
      expect(spectator.element).toHaveValue('1m/dd/yyyy');
    });

    it('should replace numbers > 2, as second character with "2", if first character is "1"', () => {
      spectator.typeInElement('10', spectator.element);
      expect(spectator.element).toHaveValue('10/dd/yyyy');

      spectator.typeInElement('11', spectator.element);
      expect(spectator.element).toHaveValue('11/dd/yyyy');

      spectator.typeInElement('12', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('13', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('14', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('15', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('16', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('17', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('18', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');

      spectator.typeInElement('19', spectator.element);
      expect(spectator.element).toHaveValue('12/dd/yyyy');
    });

    it('should replace month > 12 with "12"', () => {
      spectator.typeInElement('99/01/2021', spectator.element);
      expect(spectator.element).toHaveValue('12/01/2021');
    });
  });

  describe('day', () => {
    it('should replace numbers > 3, as first character with "3"', () => {
      spectator.typeInElement('01/1', spectator.element);
      expect(spectator.element).toHaveValue('01/1d/yyyy');

      spectator.typeInElement('01/2', spectator.element);
      expect(spectator.element).toHaveValue('01/2d/yyyy');

      spectator.typeInElement('01/3', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');

      spectator.typeInElement('01/4', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');

      spectator.typeInElement('01/5', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');

      spectator.typeInElement('01/6', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');

      spectator.typeInElement('01/7', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');

      spectator.typeInElement('01/8', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');

      spectator.typeInElement('01/9', spectator.element);
      expect(spectator.element).toHaveValue('01/3d/yyyy');
    });

    it('should replace day > 31 with "31"', () => {
      spectator.typeInElement('01/99/2021', spectator.element);
      expect(spectator.element).toHaveValue('01/31/2021');
    });
  });

  describe('year', () => {
    it('should replace < "1900" with "1900', () => {
      spectator.typeInElement('01-01-1000', spectator.element);
      expect(spectator.element).toHaveValue('01/01/1900');
    });

    it('should only allow 4 digits', () => {
      spectator.typeInElement('01-01-99999', spectator.element);
      expect(spectator.element).toHaveValue('01/01/9999');
    });
  });
});

// TODO: REACTIVE FORM VALIDATION?
