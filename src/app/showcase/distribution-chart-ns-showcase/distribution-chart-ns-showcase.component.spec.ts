import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionChartNsShowcaseComponent } from './distribution-chart-ns-showcase.component';

describe('DistributionChartNsShowcaseComponent', () => {
  let component: DistributionChartNsShowcaseComponent;
  let fixture: ComponentFixture<DistributionChartNsShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionChartNsShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionChartNsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
