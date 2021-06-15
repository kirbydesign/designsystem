import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ChartJSService } from './chart-js/chart-js.service';
import { ChartWipComponent } from './chart-wip.component';
import { ChartType } from './chart-wip.types';

fdescribe('ChartWipComponent', () => {
  let spectator: Spectator<ChartWipComponent>;
  let component: ChartWipComponent;

  const createComponent = createComponentFactory({
    component: ChartWipComponent,
    declarations: [ChartWipComponent],
    // TODO: Mock ChartJSService - this is not a integration test...
    componentProviders: [ChartJSService],
  });

  beforeEach(() => {
    spectator = createComponent({});
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render chart once after view init', () => {
    const renderChartSpy = spyOn<any>(component, 'renderChart');

    component.ngAfterViewInit();

    expect(renderChartSpy).toHaveBeenCalledTimes(1);
  });

  describe('when changes occur to', () => {
    const scenarios = {
      options: { updateFn: 'updateOptions', newValue: { onClick: () => console.log('testing') } },
      data: { updateFn: 'updateData', newValue: [1, 2, 3] },
      dataLabels: { updateFn: 'updateDataLabels', newValue: ['one', 'two', 'three'] },
      type: { updateFn: 'updateType', newValue: ChartType.column },
    };

    Object.entries(scenarios).forEach(([property, { updateFn, newValue }]) => {
      describe(`${property}`, () => {
        it(`should only update ${property}`, () => {
          const updateFnSpy = spyOn<any>(component, updateFn);

          spectator.setInput(property as any, newValue);

          expect(updateFnSpy).toHaveBeenCalledTimes(1);
        });

        it('should redraw once', () => {
          const redrawChartSpy = spyOn<any>(component, 'redrawChart');

          spectator.setInput(property as any, newValue);

          expect(redrawChartSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('multiple chartJS related input properties at the same time', () => {
      it('should update all of the properties once', () => {
        const updateFnSpies = [
          spyOn<any>(component, 'updateData'),
          spyOn<any>(component, 'updateDataLabels'),
          spyOn<any>(component, 'updateType'),
          //spyOn<any>(component, 'updateOptions'),
        ];

        spectator.setInput({
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
          type: ChartType.column,
          // TODO: implement options & test it
          //options: { onClick: () => console.log('testing') },
        });

        updateFnSpies.forEach((updateFnSpy) => {
          expect(updateFnSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('should redraw chart once', () => {
        const redrawChartSpy = spyOn<any>(component, 'redrawChart');

        spectator.setInput({
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
          type: ChartType.column,
          // TODO: implement options & test it
          //options: { onClick: () => console.log('testing') },
        });

        expect(redrawChartSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when "type" is not provided', () => {
    it('should default to correct type', () => {
      expect(component.type).toBe(ChartType.bar);
    });
  });
});
