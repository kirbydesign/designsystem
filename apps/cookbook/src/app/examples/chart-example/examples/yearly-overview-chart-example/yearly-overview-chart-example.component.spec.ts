/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YearlyOverviewChartExampleComponent } from './yearly-overview-chart-example.component';

describe('YearlyOverviewChartExampleComponent', () => {
  let component: YearlyOverviewChartExampleComponent;
  let fixture: ComponentFixture<YearlyOverviewChartExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearlyOverviewChartExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyOverviewChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
