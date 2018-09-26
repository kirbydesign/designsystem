import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShowcaseComponent } from './list-showcase.component';

describe('ListShowcaseComponent', () => {
  let component: ListShowcaseComponent;
  let fixture: ComponentFixture<ListShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
