import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChartComponent } from './stock-chart.component';
import { stockChartOptions } from './options/stock-chart-options';

describe('StockChartComponent', () => {
  let component: StockChartComponent;
  let fixture: ComponentFixture<StockChartComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockChartComponent],
    }).compileComponents();
  }));

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
