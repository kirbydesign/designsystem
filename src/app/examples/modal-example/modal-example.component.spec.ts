import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../kirby/kirby.module';
import { ModalExampleComponent } from './modal-example.component';

describe('ModalExampleComponent', () => {
  let component: ModalExampleComponent;
  let fixture: ComponentFixture<ModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [ModalExampleComponent],
    }).compileComponents();
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
