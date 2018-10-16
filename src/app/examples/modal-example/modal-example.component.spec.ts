import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExampleComponent } from './modal-example.component';

describe('ModalExampleComponent', () => {
  let component: ModalExampleComponent;
  let fixture: ComponentFixture<ModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
