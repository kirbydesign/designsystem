import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Options } from 'highcharts';

import { ChartComponent } from './chart.component';
import { ChartType } from './chart-type';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should set correct default chart height', () => {
    expect(component.options.chart.height).toBe(expectedDefaultHeight);
  });

  it('should set correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnInit();
    expect(component.options.chart.height).toBe(expectedHeight);
  });

  it('should have correct default chart type', () => {
    expect((component.type = ChartType.PIE));
    expect(component.options.chart.type).toBe(ChartType.PIE);
    expect(component.options.plotOptions.pie.innerSize).toBe('0%');
  });

  it('should convert donut chart type to highcharts pie with 50% innerSize', () => {
    component.type = ChartType.DONUT;
    component.ngOnInit();
    expect((component.type = ChartType.DONUT));
    expect(component.options.chart.type).toBe(ChartType.PIE);
    expect(component.options.plotOptions.pie.innerSize).toBe('50%');
  });

  it('should set areaspline chart type', () => {
    component.type = ChartType.AREASPLINE;
    component.ngOnInit();
    expect((component.type = ChartType.AREASPLINE));
    expect(component.options.chart.type).toBe(ChartType.AREASPLINE);
  });

  it('should have dataLabels enabled as default', () => {
    expect(component.options.plotOptions.pie.dataLabels.enabled).toBe(true);
  });

  it('should disable dataLabels when false', () => {
    component.showDataLabels = false;
    component.ngOnInit();
    expect(component.options.plotOptions.pie.dataLabels.enabled).toBe(false);
  });

  it('should set correct input data in chart series', () => {
    component.data = [
      {
        name: 'Boomerangs 20%',
        y: 20,
        label: '20%',
      },
      {
        name: 'Bubbles 41%',
        y: 41,
        label: '41%',
      },
    ];
    component.ngOnInit();
    const data = (component.options.series[0] as Highcharts.SeriesAreasplineOptions).data;
    expect(data.length).toBe(2);
    expect(data[0]['name']).toBe('Boomerangs 20%');
  });

  describe('ActivityGauge', () => {
    it('should set correct title and subtitle', () => {
      component.type = ChartType.ACTIVITYGAUGE;

      component.data = [
        {
          title: '1.234.567',
          subtitle: 'Afdraget',
        },
      ];

      component.ngOnInit();

      expect(component.options.title.text).toBe('1.234.567');
      expect(component.options.subtitle.text).toBe('Afdraget');
    });

    it('should add backgroundColor to optionsarray', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      const ActivityGaugeOptions: Options = {
        pane: {
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [[1, 'rgba(255, 255, 255, 0.3)'], [0, 'rgba(255, 255, 255, 0.3)']],
              },
              outerRadius: '112%',
              innerRadius: '88%',
              borderWidth: 0,
            },
          ],
        },
      };

      component.options = ActivityGaugeOptions;

      component.data = [
        {
          paneBackgroundColor: 'red',
        },
      ];

      component.ngOnInit();

      expect(component.options.pane.background[0].backgroundColor).toEqual(
        component.data[0].paneBackgroundColor
      );
    });

    it('should change title and subtitle color when color-attribute is set', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      component.data = [
        {
          color: 'red',
        },
      ];
      const expected = component.data[0].color;

      component.ngOnInit();

      expect(component.options.title.style.color).toEqual(expected);
      expect(component.options.subtitle.style.color).toEqual(expected);
    });

    it('should set type to solidgauge when ACTIVITYGAUGE is chosen', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      component.data = [
        {
          title: '',
          subtitle: '',
        },
      ];

      component.ngOnInit();

      expect(component.options.series[0].type).toEqual('solidgauge');
    });

    it('should set activitygauge chart type', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      component.data = [
        {
          title: 'test',
          subtitle: 'test',
        },
      ];
      component.ngOnInit();
      expect(component.options.chart.type).toBe(ChartType.ACTIVITYGAUGE);
    });
  });
});
