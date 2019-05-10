import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { SegmentedChipControlShowcaseComponent } from './segmented-chip-control-showcase.component';

describe('ChipShowcaseComponent', () => {
  let component: SegmentedChipControlShowcaseComponent;
  let fixture: ComponentFixture<SegmentedChipControlShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [SegmentedChipControlShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedChipControlShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
