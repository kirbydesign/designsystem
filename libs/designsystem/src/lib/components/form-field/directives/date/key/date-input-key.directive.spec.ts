import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

describe('DateInputKeyDirective', () => {
  let regexp: RegExp;

  beforeEach(() => {
    // spyOn$()
    TestBed.configureTestingModule({
      declarations: [
        //        DateInputDirective,
        DatePipe,
      ],
      providers: [
        // DateInputDirective,
        DatePipe,
      ],
    });

    // regexp = analyzer.createValidationPattern();
  });

  it('should create an instance', () => {
    // expect(analyzer).toBeTruthy();
    expect(regexp).toBeTruthy();
  });

  it(`should have regular pattern match date`, () => {
    console.log(regexp);
    expect(regexp.test('31.01.2021')).toBeTrue();
    expect(regexp.test('01.01.2021')).toBeTrue();
    expect(regexp.test('1.10.2021')).toBeTrue();
    expect(regexp.test('01.10.2021')).toBeTrue();
    expect(regexp.test('21.10.2021')).toBeTrue();
  });
});
