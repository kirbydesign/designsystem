import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should set correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnChanges({ type: {} as any });
    fixture.detectChanges();
    expect(component.height).toBe(expectedHeight);
  });

  it('should have correct default chart type', () => {
    component.ngOnChanges({ type: {} as any });
    expect(component.type).toBe('line');
    expect(component.mergedOptions.type).toBe('line');
  });

  it('should have correct default Kirby variables', () => {
    component.ngOnChanges({ type: {} as any });
    const r: any = document.querySelector(':root');
    const rs = getComputedStyle(r);

    expect(rs.getPropertyValue('--kirby-chart-height')).toBe('300px');
    expect(rs.getPropertyValue('--kirby-chart-width')).toBe('100%');
    expect(rs.getPropertyValue('--kirby-chart-padding')).toBe('20px');
    expect(rs.getPropertyValue('--kirby-chart-padding-top')).toBe('30px');
    expect(rs.getPropertyValue('--kirby-chart-margin')).toBe('10px');
  });
});
