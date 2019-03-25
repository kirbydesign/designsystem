import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedChipControlComponent } from './segmentes-chip-control.component';

describe('SegmentedChipControlComponent', () => {
  let component: SegmentedChipControlComponent;
  let fixture: ComponentFixture<SegmentedChipControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentedChipControlComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedChipControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
