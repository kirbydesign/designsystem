import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { Options } from 'highcharts';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const options: Options = {
    chart: {
        type: 'pie',
        description: ''
    },
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: 120,
            allowPointSelect: false,
            cursor: 'pointer'
        },
        series: {
            animation: false
        }
    },
    series: [{
        name: 'fordeling',
        data: []
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
    expect(component.options['chart'].height).toBe(expectedDefaultHeight);
  });

  it('should have correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnInit();
    expect(component.options['chart'].height).toBe(expectedHeight);
  });

  it('should have correct default chart type', () => {
    expect(component.options['chart'].type).toBe('pie');
  });

  it('should have dataLabels enabled as default', () => {
    expect(component.options['plotOptions'].pie.dataLabels.enabled).toBe(true);
  });

  it('should disable dataLabels when set', () => {
    component.dataLabelsEnabled = false;
    component.ngOnInit();
    expect(component.options['plotOptions'].pie.dataLabels.enabled).toBe(false);
  });

  it('should have correct donut chart type and convert it to highcharts pie type', () => {
    component.type = 'donut';
    component.ngOnInit();
    expect(component.options['chart'].type).toBe('pie');
  });

  it('should have correct input data', () => {
    component.data = [
      {
          name: 'Boomerangs 20%',
          y: 20,
          label: '20%'
      },
      {
          name: 'Bubbles 41%',
          y: 41,
          label: '41%'
      }
  ];
    component.ngOnInit();
    expect(component.options['series'][0].data.length).toBe(2);
    expect(component.options['series'][0].data[0]['name']).toBe('Boomerangs 20%');
  });

});
