import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { DateInputDirective } from './date-input.directive';

describe('DateInputDirective', () => {
  let spectator: SpectatorDirective<DateInputDirective>;
  const createDirective = createDirectiveFactory({
    directive: DateInputDirective,
    imports: [],
    providers: [],
  });

  beforeEach(() => {
    spectator = createDirective(`<input kirby-input type="date" />`);
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  it('should have initial date-mask value', () => {
    spectator.directive.ngAfterViewInit();
    // @ts-ignore
    expect(spectator.element.placeholder).toEqual('mm/dd/yyyy');
  });

  it('should keep date-mask when typing', () => {
    spectator.typeInElement('11', spectator.element);
    expect(spectator.element).toHaveValue('11/dd/yyyy');
  });

  it('should add leading zero for month > 4', () => {
    spectator.typeInElement('4', spectator.element);
    expect(spectator.element).toHaveValue('04/dd/yyyy');
  });

  it('should add leading zero for day > 4', () => {
    spectator.typeInElement('01/4', spectator.element);
    expect(spectator.element).toHaveValue('01/04/yyyy');
  });

  it('should have inputmode="numeric"', () => {
    expect((spectator.element as HTMLInputElement).inputMode).toBe('numeric');
  });

  it('should replace type="date", with type="text"', () => {
    expect((spectator.element as HTMLInputElement).type).toBe('text');
  });

  it('should only allow numbers or valid date formats', () => {
    spectator.typeInElement('a', spectator.element);
    expect(spectator.element).toHaveValue('');
    // @ts-ignore
    expect(spectator.element.placeholder).toEqual('mm/dd/yyyy');

    spectator.typeInElement('01-01-2021', spectator.element);
    expect(spectator.element).toHaveValue('01/01/2021');

    spectator.typeInElement('01/01/2021', spectator.element);
    expect(spectator.element).toHaveValue('01/01/2021');
  });
});
