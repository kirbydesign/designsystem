import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockDirective } from 'ng-mocks';

import { IconExampleComponent } from './icon-example.component';
import { ICON_SETTINGS, IconComponent } from '@kirbydesign/designsystem';
import { iconSettings } from '../examples.common';
import { SizeDirective } from '@kirbydesign/designsystem/directives/size/size.directive';

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
        MockDirective(SizeDirective),
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
