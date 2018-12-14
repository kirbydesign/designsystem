import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionChartNsComponent } from './distribution-chart-ns.component';

describe('DistributionChartNsComponent', () => {
  let component: DistributionChartNsComponent;
  let fixture: ComponentFixture<DistributionChartNsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionChartNsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionChartNsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
