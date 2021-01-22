import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeShowcaseComponent } from './range-showcase.component';

describe('RangeShowcaseComponent', () => {
  let component: RangeShowcaseComponent;
  let fixture: ComponentFixture<RangeShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
