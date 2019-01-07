import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSectionHeaderComponent } from './list-section-header.component';

describe('ListSectionHeaderComponent', () => {
  let component: ListSectionHeaderComponent;
  let fixture: ComponentFixture<ListSectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
