import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ModalCompactExampleComponent } from './modal-compact-example.component';

describe('ModalCompactExampleComponent', () => {
  let component: ModalCompactExampleComponent;
  let fixture: ComponentFixture<ModalCompactExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [ModalCompactExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompactExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
