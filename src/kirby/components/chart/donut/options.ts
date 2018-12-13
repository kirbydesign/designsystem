import { ChartValues } from './chart-values';
import { Options } from 'highcharts';

export class DonutOptions {
    private MIN_WIDTH = 640;
    get options(): Options {
        return {
            accessibility: {
                enabled: true
            },
            chart: {
                style: {
                    fontFamily: 'Effra'
                },
                type: '',
                description: ''
            },
            title: {
                text: ''
            },
            tooltip: {
                enabled: false,
                animation: false
            },
            legend: {
                layout: 'vertical',
                symbolRadius: 0,
                itemStyle: {
                    fontSize: '.875rem'
                }
            },
            plotOptions: {
                pie: {
                    colors: ['#015132', '#B2D1BF', '#AABC08', '#1FA05A', 'yellowgreen'],
                    innerSize: '50%',
                    allowPointSelect: false,
                    cursor: 'pointer',
                    showInLegend: true,
                    borderColor: null,
                    dataLabels: {
                        enabled: true,
                        connectorWidth: 0,
                        distance: 5,
                        style: {
                            fontSize: '1rem',
                            fontWeight: '200'
                        }
                    },
                    point: {
                        events: {
                            legendItemClick: (e) => {
                                e.preventDefault();
                            }
                        }
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                },
                series: {
                    animation: true,
                }
            },
            series: [{
                name: '',
                data: []
            }],
            credits: {
                enabled: false
            },
            responsive: {
                rules: [{
                    condition: {
                        minWidth: this.MIN_WIDTH
                    },
                    chartOptions: {
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            itemMarginTop: 12,
                            symbolRadius: 0,
                            symbolWidth: 14,
                            symbolHeight: 14,
                            x: -100
                        }
                    }
                },
                {
                    condition: {
                        minWidth: 0
                    },
                    chartOptions: {
                        legend: {
                            symbolRadius: 0
                        }
                    }
                }]
            }
        };
    }
}
