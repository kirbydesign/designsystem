import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemSwipeComponent } from './list-item-swipe.component';

describe('ListItemSwipeComponent', () => {
  let component: ListItemSwipeComponent;
  let fixture: ComponentFixture<ListItemSwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListItemSwipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
