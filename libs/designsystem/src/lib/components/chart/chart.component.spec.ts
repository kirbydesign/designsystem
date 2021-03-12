import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Options, PlotSeriesDataLabelsOptions, XAxisOptions } from 'highcharts';

import { ChartType } from './chart-type';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const expectedDefaultHeight = 300;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChartComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data = [];
    component.ngOnChanges({ type: {} as any });
    fixture.detectChanges();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should set correct default chart height', () => {
    expect(component.mergedOptions.chart.height).toBe(expectedDefaultHeight);
  });

  it('should set correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnChanges({ type: {} as any });
    fixture.detectChanges();
    expect(component.mergedOptions.chart.height).toBe(expectedHeight);
  });

  it('should have correct default chart type', () => {
    expect((component.type = ChartType.PIE));
    component.ngOnChanges({ type: {} as any });

    expect(component.mergedOptions.chart.type).toBe(ChartType.PIE);
    expect(component.mergedOptions.plotOptions.pie.innerSize).toBe('0%');
  });

  it('should convert donut chart type to highcharts pie with 50% innerSize', () => {
    component.type = ChartType.DONUT;
    component.ngOnChanges({ type: {} as any });

    expect((component.type = ChartType.DONUT));
    expect(component.mergedOptions.chart.type).toBe(ChartType.PIE);
    expect(component.mergedOptions.plotOptions.pie.innerSize).toBe('50%');
  });

  it('should set areaspline chart type', () => {
    component.type = ChartType.AREASPLINE;
    component.ngOnChanges({ type: {} as any });

    expect((component.type = ChartType.AREASPLINE));
    expect(component.mergedOptions.chart.type).toBe(ChartType.AREASPLINE);
  });

  it('should have dataLabels enabled as default', () => {
    expect(
      (component.mergedOptions.plotOptions.pie.dataLabels as PlotSeriesDataLabelsOptions).enabled
    ).toBe(true);
  });

  it('should disable dataLabels when false', () => {
    component.showDataLabels = false;
    component.ngOnChanges({ type: {} as any });

    expect(
      (component.mergedOptions.plotOptions.pie.dataLabels as PlotSeriesDataLabelsOptions).enabled
    ).toBe(false);
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
    component.ngOnChanges({ type: {} as any });
    const data = (component.mergedOptions.series[0] as Highcharts.SeriesAreasplineOptions).data;

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
      component.ngOnChanges({ type: {} as any });

      expect(component.mergedOptions.title.text).toBe('1.234.567');
      expect(component.mergedOptions.subtitle.text).toBe('Afdraget');
    });

    it('should add backgroundColor to optionsarray', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      const ActivityGaugeOptions: Options = {
        pane: {
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [1, 'rgba(255, 255, 255, 0.3)'],
                  [0, 'rgba(255, 255, 255, 0.3)'],
                ],
              },
              outerRadius: '112%',
              innerRadius: '88%',
              borderWidth: 0,
            },
          ],
        },
      };

      component.mergedOptions = ActivityGaugeOptions;

      component.data = [
        {
          paneBackgroundColor: 'red',
        },
      ];
      component.ngOnChanges({ type: {} as any });

      expect(component.mergedOptions.pane.background[0].backgroundColor).toEqual(
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
      component.ngOnChanges({ type: {} as any });

      const expected = component.data[0].color;

      expect(component.mergedOptions.title.style.color).toEqual(expected);
      expect(component.mergedOptions.subtitle.style.color).toEqual(expected);
    });

    it('should set type to solidgauge when ACTIVITYGAUGE is chosen', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      component.data = [
        {
          title: '',
          subtitle: '',
        },
      ];
      component.ngOnChanges({ type: {} as any });

      expect(component.mergedOptions.series[0].type).toEqual('solidgauge');
    });

    it('should set activitygauge chart type', () => {
      component.type = ChartType.ACTIVITYGAUGE;
      component.data = [
        {
          title: 'test',
          subtitle: 'test',
        },
      ];
      component.ngOnChanges({ type: {} as any });

      expect(component.mergedOptions.chart.type).toBe(ChartType.ACTIVITYGAUGE);
    });
  });

  describe('column', () => {
    it('should set inputs correct', () => {
      component.type = ChartType.COLUMN;
      component.data = [1, 2, 3];
      component.categories = ['jan', 'feb', 'mar'];
      component.ngOnChanges({ type: {} as any });
      const dataMax = Math.max(...component.data);

      expect(component.mergedOptions.series as any).toEqual([
        {
          type: 'column',
          name: 'InvisibleClickReceiver',
          data: component.data.map((_, idx) => dataMax - component.data[idx]),
          opacity: 0,
        },
        {
          type: 'column',
          data: component.data,
        },
      ]);

      expect((component.mergedOptions.xAxis as XAxisOptions).categories).toEqual(
        component.categories
      );
    });
  });

  describe('bar', () => {
    it('should set inputs correct', () => {
      component.type = ChartType.BAR;
      component.data = [1, 2, 3];
      component.categories = ['jan', 'feb', 'mar'];
      component.ngOnChanges({ type: {} as any });

      expect(component.mergedOptions.series as any).toEqual([
        {
          type: 'bar',
          name: 'InvisibleClickReceiver',
          data: component.data.map((dataEntry, idx) => Math.max(...component.data) - dataEntry),
          edgeColor: 'rgb(255, 255, 255, 0)',
          opacity: 0,
        },
        {
          type: 'bar',
          data: component.data,
        },
      ]);

      expect((component.mergedOptions.xAxis as XAxisOptions).categories).toEqual(
        component.categories
      );
    });
  });

  describe('override options', () => {
    it('should override options', () => {
      component.type = ChartType.PIE;
      component.data = [
        {
          data: [1, 1],
        },
      ];

      component.options = {
        series: [
          {
            data: [2, 2],
          } as any,
        ],
      };
      component.ngOnChanges({ type: {} as any });

      expect((component.mergedOptions.series[0] as any).data).toEqual([2, 2]);
    });
  });
});
