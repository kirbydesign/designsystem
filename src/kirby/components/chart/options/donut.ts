import { Options } from 'highcharts';
import { InjectionToken } from '@angular/core';

export const DONUT_OPTIONS = new InjectionToken<Options>('DonutOptions');
export const DonutOptions: Options = {
    chart: {
        style: {
            fontFamily: 'Roboto',
            fontWeight: '300'
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
            allowPointSelect: false,
            cursor: 'pointer',
            showInLegend: true,
            borderColor: null,
            dataLabels: {
                format: '{point.label}',
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
    exporting: {
        enabled: false
    },
    responsive: {
        rules: [{
            condition: {
                minWidth: 640
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
