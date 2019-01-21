import { Options } from 'highcharts';
import { InjectionToken } from '@angular/core';

export const AREASPLINE_OPTIONS = new InjectionToken<Options>('AreasplineOptions');
export const AreaSplineOptions: Options = {
    chart: {
        type: 'areaspline',
        borderWidth: 0,
        plotBorderWidth: 0,
        margin: 0,
        marginTop: 48
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    tooltip: {
        enabled: true,
        animation: false,
        shape: 'square',
        borderColor: '#FFFFFF',
        shadow: false,
        backgroundColor: '#FFFFFF',
        style: {
            fontSize: '1.25rem'
        },
        formatter: function () {
            return this.y;
        },
        positioner: function () {
            return { x: (this.chart.plotSizeX / 2) - (this.label.width / 2), y: 0 };
        }
    },
    xAxis: {
        visible: false,
        minPadding: 0,
        maxPadding: 0,
        crosshair: {
            zIndex: 3,
            width: 1,
            color: '#177E17'
        }
    },
    yAxis: {
        visible: false,
        endOnTick: false,
        startOnTick: false
    },
    plotOptions: {
        areaspline: {
            shadow: true,
            showInLegend: false,
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 0.8 },
                stops: [
                    [0, '#C9E5C9'],
                    [1, '#FFFFFF']
                ]
            },
            lineColor: '#177E17',
            lineWidth: 2
        },
        series: {
            states: {
                hover: {
                    halo: {
                        size: 0
                    }
                }
            },
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true,
                        fillColor: '#177E17'
                    }
                }
            }
        }
    },
    series: [{
        data: []
    }]
};
