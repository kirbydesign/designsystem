import { Component, Input, Output } from '@angular/core';
import { ChartConfiguration, ChartDataSets, ChartPoint } from 'chart.js';
import moment, { Moment } from 'moment';

import { TimeSeriesOptions } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-chart-example-timeseries-1',
  template: `<kirby-card>
  <kirby-card-header title="Timeseries Datasets"></kirby-card-header>
  <kirby-chart-2 
    type="line"
    [height]="height"
    [options]="timeseriesOptions"   
    >
  </kirby-chart-2> 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleTimeseries1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 275;

  timeseriesOptions: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['day 1', 'day 2', 'day 3', 'day 4'],
      datasets: [
        {
          label: 'TimeSeries Chart',
          backgroundColor: 'lightblue',
          data: [
            { t: moment().add('1', 'd'), y: 1 },
            { t: moment().add('2', 'd'), y: 2 },
            { t: moment().add('3', 'd'), y: 3 },
            { t: moment().add('4', 'd'), y: 2 },
            { t: moment().add('5', 'd'), y: 3 },
            { t: moment().add('6', 'd'), y: 2 },
            { t: moment().add('7', 'd'), y: 3 },
            { t: moment().add('8', 'd'), y: 1 },
          ],
          pointRadius: 0,
          fill: false,
          lineTension: 0.4,
          borderWidth: 2,
        },
      ],
    },
    options: {
      animation: {
        duration: 0,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            distribution: 'series',
            offset: true,
            ticks: {
              major: {
                enabled: true,
                fontStyle: 'bold',
              },
              source: 'data',
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0,
              sampleSize: 100,
            },
            afterBuildTicks: function(scale, ticks: any) {
              var majorUnit = scale._majorUnit;
              var firstTick = ticks[0];
              var i, ilen, val, tick, currMajor, lastMajor;

              val = moment(ticks[0].value);
              firstTick.major = true;
              lastMajor = val.get(majorUnit);

              for (i = 1, ilen = ticks.length; i < ilen; i++) {
                tick = ticks[i];
                val = moment(tick.value);
                currMajor = val.get(majorUnit);
                tick.major = currMajor !== lastMajor;
                lastMajor = currMajor;
              }
              return ticks;
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Gold prices ($)',
            },
          },
        ],
      },
      tooltips: {
        intersect: false,
        mode: 'index',
        callbacks: {
          label: function(tooltipItem, myData) {
            var label = myData.datasets[tooltipItem.datasetIndex].label || '';
            if (label) {
              label += ': ';
            }
            label += parseFloat(tooltipItem.value).toFixed(2);
            return label;
          },
        },
      },
    },
  };
}
