import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActionsComponent } from './header-actions.component';

describe('ButtonGroupComponent', () => {
  let component: HeaderActionsComponent;
  let fixture: ComponentFixture<HeaderActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
