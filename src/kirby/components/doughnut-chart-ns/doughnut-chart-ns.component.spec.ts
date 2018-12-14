import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartNsComponent } from './doughnut-chart-ns.component';

describe('DoughnutChartNsComponent', () => {
  let component: DoughnutChartNsComponent;
  let fixture: ComponentFixture<DoughnutChartNsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartNsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartNsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
