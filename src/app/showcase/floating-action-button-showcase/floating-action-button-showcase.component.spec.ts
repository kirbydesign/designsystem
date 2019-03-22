import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../kirby/kirby.module';
import { FloatingActionButtonShowcaseComponent } from './floating-action-button-showcase.component';

describe('FloatingActionButtonShowcaseComponent', () => {
  let component: FloatingActionButtonShowcaseComponent;
  let fixture: ComponentFixture<FloatingActionButtonShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [FloatingActionButtonShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingActionButtonShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
