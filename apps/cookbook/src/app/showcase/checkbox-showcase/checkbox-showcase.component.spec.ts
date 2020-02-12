import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CheckboxShowcaseComponent } from './checkbox-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { KirbyModule } from '@kirbydesign/designsystem';

describe('CheckboxShowcaseComponent', () => {
  let component: CheckboxShowcaseComponent;
  let fixture: ComponentFixture<CheckboxShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ExamplesModule, KirbyModule],
      declarations: [CheckboxShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
