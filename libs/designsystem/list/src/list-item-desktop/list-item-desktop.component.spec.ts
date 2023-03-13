import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDesktopComponent } from './list-item-desktop.component';

describe('ListItemDesktopComponent', () => {
  let component: ListItemDesktopComponent;
  let fixture: ComponentFixture<ListItemDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListItemDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
