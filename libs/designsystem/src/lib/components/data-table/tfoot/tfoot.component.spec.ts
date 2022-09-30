import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfootComponent } from './tfoot.component';

describe('TfootComponent', () => {
  let component: TfootComponent;
  let fixture: ComponentFixture<TfootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfootComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TfootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
