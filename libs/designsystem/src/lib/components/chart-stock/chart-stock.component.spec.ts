import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStockComponent } from './chart-stock.component';
import { stockChartOptions } from './options/chart-stock-options';

describe('HighstockChartComponent', () => {
  let component: ChartStockComponent;
  let fixture: ComponentFixture<ChartStockComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartStockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStockComponent);
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
