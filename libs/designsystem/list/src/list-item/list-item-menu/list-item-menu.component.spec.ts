import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemMenuComponent } from './list-item-menu.component';

describe('ListItemMenuComponent', () => {
  let component: ListItemMenuComponent;
  let fixture: ComponentFixture<ListItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListItemMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
