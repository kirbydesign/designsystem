import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalV2WrapperComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: ModalV2WrapperComponent;
  let fixture: ComponentFixture<ModalV2WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalV2WrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalV2WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
