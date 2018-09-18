import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShowcaseComponent } from './button-showcase.component';

describe('ButtonShowcaseComponent', () => {
  let component: ButtonShowcaseComponent;
  let fixture: ComponentFixture<ButtonShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
