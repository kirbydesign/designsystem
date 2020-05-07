import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighstockChartComponent } from './highstock-chart.component';
import { stockChartOptions } from './options/highstock-chart-options';

describe('HighstockChartComponent', () => {
  let component: HighstockChartComponent;
  let fixture: ComponentFixture<HighstockChartComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighstockChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighstockChartComponent);
    component = fixture.componentInstance;
    component.options = stockChartOptions('da', expectedDefaultHeight);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });
});
