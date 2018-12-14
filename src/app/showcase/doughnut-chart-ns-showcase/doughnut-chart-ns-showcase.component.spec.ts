import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartNsShowcaseComponent } from './doughnut-chart-ns-showcase.component';

describe('DoughnutChartNsShowcaseComponent', () => {
  let component: DoughnutChartNsShowcaseComponent;
  let fixture: ComponentFixture<DoughnutChartNsShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartNsShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartNsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
