import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowcaseComponent } from './modal-showcase.component';

describe('ModalShowcaseComponent', () => {
  let component: ModalShowcaseComponent;
  let fixture: ComponentFixture<ModalShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
