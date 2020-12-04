import { TestBed } from '@angular/core/testing';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ElementRef } from '@angular/core';

import { NumericInputDirective } from './numeric-input.directive';

describe('NumericInputDirective', () => {
  let directive: NumericInputDirective;

  beforeEach(() => {
    // spyOn$()
    TestBed.configureTestingModule({
      declarations: [NumericInputDirective, DecimalPipe, CurrencyPipe, ElementRef],
      providers: [NumericInputDirective, DecimalPipe, CurrencyPipe, ElementRef],
    });
    directive = TestBed.inject(NumericInputDirective);
    // console.log('directive', directive);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it(`should have regular pattern match number 100`, () => {
    const d = '100';
    const s = d.match(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/) != null;
    console.log(s, d);
    if (!s && d) {
      console.log('no match');
    }
    expect(s).toBeTrue();
  });

  it(`should NOT have regular pattern match invalid number`, () => {
    const d = 'abc';
    const s = d.match(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/) != null;
    console.log(s, d);
    if (!s && d) {
      console.log('no match');
    }
    expect(s).toBeFalse();
  });

  it(`should have regular pattern match number 100.0`, () => {
    const d = '100.0';
    const s = d.match(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/) != null;
    console.log(s, d);
    if (!s && d) {
      console.log('no match');
    }
    expect(s).toBeTrue();
  });
});
