/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideButtonShowcaseComponent } from './slide-button-showcase.component';

describe('SlideButtonShowcaseComponent', () => {
  let component: SlideButtonShowcaseComponent;
  let fixture: ComponentFixture<SlideButtonShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideButtonShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideButtonShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
