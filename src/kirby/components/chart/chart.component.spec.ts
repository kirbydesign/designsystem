import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChartType } from './chart-type';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should set correct default chart height', () => {
    expect(component.options['chart'].height).toBe(expectedDefaultHeight);
  });

  it('should set correct non-default chart height', () => {
    const expectedHeight = 400;
    component.height = expectedHeight;
    component.ngOnInit();
    expect(component.options['chart'].height).toBe(expectedHeight);
  });

  it('should have correct default chart type', () => {
    expect(component.options['chart'].type).toBe(ChartType.PIE);
    expect(component.options.plotOptions.pie.innerSize).toBe('0%');
  });

  it('should convert donut chart type to highcharts pie with 50% innerSize', () => {
    component.type = ChartType.DONUT;
    component.ngOnInit();
    expect(component.options['chart'].type).toBe(ChartType.PIE);
    expect(component.options.plotOptions.pie.innerSize).toBe('50%');
  });

  it('should set areaspline chart type', () => {
    component.type = ChartType.AREASPLINE;
    component.ngOnInit();
    expect(component.options['chart'].type).toBe(ChartType.AREASPLINE);
  });

  it('should have dataLabels enabled as default', () => {
    expect(component.options['plotOptions'].pie.dataLabels.enabled).toBe(true);
  });

  it('should disable dataLabels when false', () => {
    component.showDataLabels = false;
    component.ngOnInit();
    expect(component.options['plotOptions'].pie.dataLabels.enabled).toBe(false);
  });

  it('should set correct input data in chart series', () => {
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
