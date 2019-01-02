import { Options } from 'highcharts';

export class AreaSplineOptions {
    get options(): Options {
        return {
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
                enabled: false,
                animation: false
            },
            chart: {
                type: 'areaspline',
                borderWidth: 0,
                plotBorderWidth: 0,
                margin: 0
            },
            xAxis: {
                visible: false,
                minPadding: 0,
                maxPadding: 0
            },
            yAxis: {
                visible: false,
                minPadding: 0,
                maxPadding: 0
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
                line: {
                    allowPointSelect: false
                },
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [{
                data: []
            }]
        };
    }
}
