/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { SizeDirective } from './size.directive';

describe('Directive: Size', () => {
  it('should create an instance', () => {
    const directive = new SizeDirective();
    expect(directive).toBeTruthy();
  });

  it(`should be small size if input is 'small'`, () => {
    const directive = new SizeDirective();
    directive.size = 'small';

    expect(directive.isSmallSize).toBeTruthy();
  });

  it(`should be medium size if input is 'medium'`, () => {
    const directive = new SizeDirective();
    directive.size = 'medium';

    expect(directive.isMediumSize).toBeTruthy();
  });

  it(`should be large size if input is 'large'`, () => {
    const directive = new SizeDirective();
    directive.size = 'large';

    expect(directive.isLargeSize).toBeTruthy();
  });
});
