/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideButtonComponent } from './slide-button.component';

describe('SlideButtonComponent', () => {
  let component: SlideButtonComponent;
  let fixture: ComponentFixture<SlideButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
