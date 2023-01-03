import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWrapperExperimentalComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: ModalWrapperExperimentalComponent;
  let fixture: ComponentFixture<ModalWrapperExperimentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalWrapperExperimentalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalWrapperExperimentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
