import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartNsExampleComponent } from './doughnut-chart-ns-example.component';

describe('DoughnutChartNsExampleComponent', () => {
  let component: DoughnutChartNsExampleComponent;
  let fixture: ComponentFixture<DoughnutChartNsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartNsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartNsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
