import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListComponent } from './action-list.component';

describe('ActionListComponent', () => {
  let component: ActionListComponent;
  let fixture: ComponentFixture<ActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
