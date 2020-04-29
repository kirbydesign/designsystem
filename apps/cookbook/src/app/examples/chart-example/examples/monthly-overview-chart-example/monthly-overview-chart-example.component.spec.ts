/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyOverviewChartExampleComponent } from './monthly-overview-chart-example.component';

describe('MonthlyOverviewChartExampleComponent', () => {
  let component: MonthlyOverviewChartExampleComponent;
  let fixture: ComponentFixture<MonthlyOverviewChartExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyOverviewChartExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyOverviewChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
