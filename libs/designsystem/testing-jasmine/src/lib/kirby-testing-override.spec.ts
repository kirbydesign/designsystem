import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { MockButtonComponent, MockIconComponent } from '@kirbydesign/designsystem/testing-base';
import {
  KirbyTestingModule,
  kirbyTestingOverride,
  overrideKirbyImports,
} from '@kirbydesign/designsystem/testing-jasmine';

// See https://github.com/kirbydesign/designsystem/issues/3751:
// Standalone components compile against their own imports, so the real Kirby components
// were rendered (and crashed) even though KirbyTestingModule was imported in the test.

@Component({
  selector: 'kirby-test-standalone-icon-module',
  template: `
    <kirby-icon name="arrow-back"></kirby-icon>
  `,
  imports: [IconModule],
})
class StandaloneWithIconModuleComponent {}

@Component({
  selector: 'kirby-test-standalone-kirby-module',
  template: `
    <kirby-icon name="arrow-back"></kirby-icon>
    <button kirby-button>Click</button>
  `,
  imports: [KirbyModule],
})
class StandaloneWithKirbyModuleComponent {}

@Component({
  selector: 'kirby-test-standalone-components',
  template: `
    <button kirby-button>Click</button>
  `,
  imports: [ButtonComponent],
})
class StandaloneWithStandaloneKirbyComponent {}

describe('Kirby testing of standalone components', () => {
  const render = <T>(component: new (...args: unknown[]) => T) => {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  };

  it('should render mocks instead of components from an imported Kirby module', () => {
    TestBed.configureTestingModule({
      imports: [KirbyTestingModule, StandaloneWithIconModuleComponent],
    });
    overrideKirbyImports(StandaloneWithIconModuleComponent);

    const fixture = render(StandaloneWithIconModuleComponent);

    const icon = fixture.debugElement.query(By.css('kirby-icon'));
    expect(icon.componentInstance).toBeInstanceOf(MockIconComponent);
  });

  it('should render mocks instead of components from an imported KirbyModule', () => {
    TestBed.configureTestingModule({
      imports: [KirbyTestingModule, StandaloneWithKirbyModuleComponent],
    });
    overrideKirbyImports(StandaloneWithKirbyModuleComponent);

    const fixture = render(StandaloneWithKirbyModuleComponent);

    const icon = fixture.debugElement.query(By.css('kirby-icon'));
    const button = fixture.debugElement.query(By.css('button'));
    expect(icon.componentInstance).toBeInstanceOf(MockIconComponent);
    expect(button.componentInstance).toBeInstanceOf(MockButtonComponent);
  });

  it('should render mocks instead of directly imported standalone Kirby components', () => {
    TestBed.configureTestingModule({
      imports: [KirbyTestingModule, StandaloneWithStandaloneKirbyComponent],
    });
    overrideKirbyImports(StandaloneWithStandaloneKirbyComponent);

    const fixture = render(StandaloneWithStandaloneKirbyComponent);

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.componentInstance).toBeInstanceOf(MockButtonComponent);
  });

  it('should support the override object directly, e.g. for TestBed.overrideComponent', () => {
    TestBed.configureTestingModule({
      imports: [KirbyTestingModule, StandaloneWithIconModuleComponent],
    });
    TestBed.overrideComponent(StandaloneWithIconModuleComponent, kirbyTestingOverride);

    const fixture = render(StandaloneWithIconModuleComponent);

    const icon = fixture.debugElement.query(By.css('kirby-icon'));
    expect(icon.componentInstance).toBeInstanceOf(MockIconComponent);
  });
});
