import {Options} from 'highcharts';
import {InjectionToken} from '@angular/core';

export const ACTIVITYGAUGE_OPTIONS = new InjectionToken<Options>('ActivityGaugeOptions');
export const ActivityGaugeOptions: Options = {
    chart: {
        style: {
            fontFamily: 'Roboto',
            fontWeight: '300'
        },
        type: 'solidgauge',
        description: '',
        height: '110%'
    },
    title: {
        text: '',
        style: {
            fontSize: '24px',
            fontWeight: 'bold'
        },
        margin: -70,
        x: 0,
        y: 140
    },
    subtitle: {
        text: 'Afdraget',
        style: {
            fontsize: '24px',
            fontWeight: 'bold'
        },
        x: 0,
        y: 180
    },
    credits: {
        enabled: false
    },
    tooltip: {
        enabled: false,
        animation: false
    },
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{
            outerRadius: '112%',
            innerRadius: '88%',
            borderWidth: 0
        }]
    },
    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },
    series: [{
        type: 'solidgauge',
        data: (this === undefined ? [] : this.data) as Array<Highcharts.SeriesGaugeDataOptions>
    }]
};
