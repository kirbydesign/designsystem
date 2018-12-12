import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import { WebView, LoadEventData } from 'ui/web-view';
import { android, ios, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';
import { Options } from 'highcharts';
import { DonutOptions } from './donut/options';

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type = 'pie';
  @Input() description = '';
  @Input() dataLabelsEnabled = true;

  options: Options = {};

  @ViewChild('webView') private webView: ElementRef;
  private chartWebViewInterface;
  private WEBVIEW_HEIGHT_OFFSET = 40;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.setupWebViewInterface();
  }

  private setupWebViewInterface() {
    const webView: WebView = this.webView.nativeElement;
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart/chart.webview.html');

    // loading chart data, on load of webView
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.loadChartDataInWebView();
        this.setupWebViewForPlatforms(webView);
      }
    });
  }

  private loadChartDataInWebView() {
    const chartType = this.type === 'donut' ? 'pie' : this.type;
    if (chartType === 'pie') {
      this.options = new DonutOptions().options;
      this.options.chart.type = chartType;
    }
    this.setChartProperties();
    const data = {
      options: this.options,
      height: this.height - this.WEBVIEW_HEIGHT_OFFSET
    };
    this.chartWebViewInterface.emit('loadChartData', data);
  }

  ngOnChanges() {
    this.updateChart();
  }

  public updateChart() {
    if (this.options.chart && this.options.chart.type === 'pie') {
      this.setChartProperties();
    }
    const data = {
      options: this.options,
      height: this.height - this.WEBVIEW_HEIGHT_OFFSET
    };
    this.chartWebViewInterface.emit('updateChart', data);
  }

  setChartProperties() {
    if (this.options.chart && this.options.chart.type === 'pie') {
      this.options.chart.height = this.height;
      this.options.series[0].data = this.data;
      this.options.chart.description = this.description;
      this.options.plotOptions.pie.dataLabels.enabled = this.dataLabelsEnabled;
      this.options.plotOptions.pie.dataLabels.format = '{point.label}';
    }
  }

  private setupWebViewForPlatforms(webView: WebView) {
    const platformWebView = android ? webView.android : webView.ios;
    if (android) {
      platformWebView.getSettings().setBuiltInZoomControls(false);
      platformWebView.getSettings().setDisplayZoomControls(false);
      android.on(AndroidApplication.activityPausedEvent, (args: AndroidActivityEventData) => {
        platformWebView.onPause();
      });
      android.on(AndroidApplication.activityResumedEvent, (args: AndroidActivityEventData) => {
        platformWebView.onResume();
      });
    } else if (ios) {
      const sw = platformWebView.scrollView;
      sw.bounces = false;
      sw.scrollEnabled = false;
    }
  }

}
