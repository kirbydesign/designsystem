import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../kirby/kirby.module';
import { IconExampleComponent } from './icon-example.component';
import { CUSTOM_FONT_SETTINGS } from '~/kirby/components/icon/custom-icon-settings';
import { customIconSettings } from '../examples.common';

describe('IconExampleComponent', () => {
  let component: IconExampleComponent;
  let fixture: ComponentFixture<IconExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      providers: [
        {
          provide: CUSTOM_FONT_SETTINGS,
          useValue: customIconSettings,
          multi: true,
        },
      ],
      declarations: [IconExampleComponent],
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
