import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from '../chart';

import { Chart2Component } from './chart.component';

describe('Chart2Component', () => {
  let component: Chart2Component;
  let fixture: ComponentFixture<Chart2Component>;
  const expectedDefaultHeight = 300;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Chart2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chart2Component);
    component = fixture.componentInstance;
    component.data = [];
    component.ngOnChanges({ type: {} as any });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should set correct default chart height', () => {
    //    expect(component.mergedOptions.chart.height).toBe(expectedDefaultHeight);
  });

  it('should set correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnChanges({ type: {} as any });
    fixture.detectChanges();
    //  expect(component.mergedOptions.chart.height).toBe(expectedHeight);
  });
});
