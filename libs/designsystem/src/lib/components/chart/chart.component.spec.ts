import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Options } from 'highcharts';
import { async } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { ChartHelper } from './chart-helper';

describe('ChartComponent', () => {
  let spectator: SpectatorHost<ChartComponent>;
  let chartHelper: ChartHelper;
  const createHost = createHostFactory({
    component: ChartComponent,
  });

  beforeEach(() => {
    chartHelper = new ChartHelper();
    spyOn(chartHelper, 'updateChart');

    spectator = createHost('<kirby-chart [height]="height" [options]="options"></kirby-chart>', {
      hostProps: { options: {} },
      providers: [
        {
          provide: ChartHelper,
          useValue: chartHelper,
        },
      ],
    });
  });

  it('should set correct height', () => {
    spectator.setHostInput({ height: 200 });

    const chartElm = spectator.query('[data-test=chart]'); // TODO: get height
    expect(chartElm).toHaveComputedStyle({ height: '200px' });
  });

  it('should render chart with provided options', async(() => {
    const options = {
      chart: {
        type: 'column',
      },
    } as Options;
    spectator.setHostInput({ options });

    expect(chartHelper.updateChart).toHaveBeenCalledWith(options);
  }));
});
