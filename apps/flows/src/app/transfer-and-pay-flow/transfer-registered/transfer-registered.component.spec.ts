import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRegisteredComponent } from './transfer-registered.component';

describe('TransferRegisteredComponent', () => {
  let component: TransferRegisteredComponent;
  let fixture: ComponentFixture<TransferRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferRegisteredComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
