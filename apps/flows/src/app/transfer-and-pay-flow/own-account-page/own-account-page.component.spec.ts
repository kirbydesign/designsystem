import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnAccountPageComponent } from './own-account-page.component';

describe('OwnAccountPageComponent', () => {
  let component: OwnAccountPageComponent;
  let fixture: ComponentFixture<OwnAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnAccountPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
