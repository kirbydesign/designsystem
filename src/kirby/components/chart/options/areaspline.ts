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
                enabled: true,
                animation: false,
                shape: 'circle',
                borderColor: '#C9E5C9',
                backgroundColor: '#FFFFFF',
                useHTML: true,
                style: {
                    fontSize: '1rem'
                },
                formatter: function () {
                    return '<div style=\'margin-top: 6px;\'>' + this.y + '</div>';
                }
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
                line: {
                    allowPointSelect: true
                },
                series: {
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
    }
}
