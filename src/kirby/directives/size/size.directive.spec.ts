import { SizeDirective } from './size.directive';

describe('Directive: Size', () => {
  it('should create an instance', () => {
    const directive = new SizeDirective();
    expect(directive).toBeTruthy();
  });

  it(`should be small size if input is 'sm'`, () => {
    const directive = new SizeDirective();
    directive.size = 'sm';

    expect(directive.isSmallSize).toBeTruthy();
  });

  it(`should be medium size if input is 'md'`, () => {
    const directive = new SizeDirective();
    directive.size = 'md';

    expect(directive.isMediumSize).toBeTruthy();
  });

  it(`should be large size if input is 'lg'`, () => {
    const directive = new SizeDirective();
    directive.size = 'lg';

    expect(directive.isLargeSize).toBeTruthy();
  });
});
