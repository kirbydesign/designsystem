import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { Options } from 'highcharts';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const options: Options = {
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: 120,
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            }
        },
        series: {
            animation: false
        }
    },
    series: [{
        name: 'fordeling',
        data: [
            ['Aktier', 20],
            ['ETF', 3],
            ['Certifikater', 25],
            ['Obligationer', 52]
        ]
    }],
    credits: {
        enabled: false
    }
  };

  const expectedDefaultHeight = 300;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.options = options;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should have correct default chart height', () => {
    expect(component.options.chart.height).toBe(expectedDefaultHeight);
  });

  it('should have correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnInit();
    expect(component.options.chart.height).toBe(expectedHeight);
  });

});
