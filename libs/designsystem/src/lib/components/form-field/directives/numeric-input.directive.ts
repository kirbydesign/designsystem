import { Directive, OnDestroy, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { NumericInputAnalyzer } from './numeric-input.analyzer';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-numeric-input]',
  providers: [],
})
export class NumericInputDirective implements OnInit, OnDestroy {
  constructor(@Self() private ngControl: NgControl) {
    console.log('constructor');
  }

  ngOnInit(): any {
    console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
