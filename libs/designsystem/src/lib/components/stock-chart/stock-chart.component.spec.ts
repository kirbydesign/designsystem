import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { stockChartOptions } from './options/stock-chart-options';
import { StockChartComponent } from './stock-chart.component';

describe('StockChartComponent', () => {
  let component: StockChartComponent;
  let fixture: ComponentFixture<StockChartComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StockChartComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChartComponent);
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
