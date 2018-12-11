import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionChartNsExampleComponent } from './distribution-chart-ns-example.component';

describe('DistributionChartNsExampleComponent', () => {
  let component: DistributionChartNsExampleComponent;
  let fixture: ComponentFixture<DistributionChartNsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionChartNsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionChartNsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
