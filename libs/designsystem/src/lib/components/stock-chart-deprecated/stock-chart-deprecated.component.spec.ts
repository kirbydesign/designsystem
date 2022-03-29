import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { stockChartDeprecatedOptions } from './options/stock-chart-deprecated-options';
import { StockChartDeprecatedComponent } from './stock-chart-deprecated.component';

describe('StockChartDeprecatedComponent', () => {
  let component: StockChartDeprecatedComponent;
  let fixture: ComponentFixture<StockChartDeprecatedComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StockChartDeprecatedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChartDeprecatedComponent);
    component = fixture.componentInstance;
    component.options = stockChartDeprecatedOptions('da', expectedDefaultHeight);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });
});
