import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockDirective } from 'ng-mocks';

import { IconExampleComponent } from './icon-example.component';
import { ICON_SETTINGS } from '@kirbydesign/designsystem';
import { iconSettings } from '../examples.common';
import { SizeDirective } from '@kirbydesign/designsystem/directives/size/size.directive';
import { ThemeColorDirective } from '@kirbydesign/designsystem/directives/theme-color/theme-color.directive';
import { CheckboxComponent } from '@kirbydesign/designsystem/components/checkbox/checkbox.component';
import { IconComponent } from '@kirbydesign/designsystem/components/icon/icon.component';

describe('IconExampleComponent', () => {
  let component: IconExampleComponent;
  let fixture: ComponentFixture<IconExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ICON_SETTINGS,
          useValue: iconSettings,
          multi: true,
        },
      ],
      declarations: [
        IconExampleComponent,
        MockComponent(IconComponent),
        MockComponent(CheckboxComponent),
        MockDirective(SizeDirective),
        MockDirective(ThemeColorDirective),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
