import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOwnAccountComponent } from './choose-own-account.component';

describe('ChooseOwnAccountComponent', () => {
  let component: ChooseOwnAccountComponent;
  let fixture: ComponentFixture<ChooseOwnAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseOwnAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseOwnAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
