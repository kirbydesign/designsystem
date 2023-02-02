import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListSectionHeaderComponent } from './list-section-header.component';

describe('ListSectionHeaderComponent', () => {
  let component: ListSectionHeaderComponent;
  let fixture: ComponentFixture<ListSectionHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListSectionHeaderComponent],
    }).compileComponents();
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
