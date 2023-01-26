import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListShowcaseComponent } from './action-list-showcase.component';

describe('ActionListShowcaseComponent', () => {
  let component: ActionListShowcaseComponent;
  let fixture: ComponentFixture<ActionListShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionListShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionListShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
