import{Ca as g,Fe as n,X as c,Xa as l,da as d,va as m,wa as h,xa as p,ze as y}from"./chunk-KOBTGBI7.js";import{a as r,b as s}from"./chunk-FIRXXYNY.js";var D=(()=>{let t=class t{static get barDemoDataString(){return this.demoDataToString(t.barDemoData)}static get demoDataString(){return this.demoDataToString(t.demoData)}};t.demoData=[{x:1637049659e3,y:127.15},{x:1637049662e3,y:127.15},{x:163704976e4,y:127.08},{x:1637049926e3,y:127.08},{x:163705049e4,y:126.93},{x:1637050637e3,y:127.25},{x:1637050736e3,y:127.08},{x:1637050797e3,y:127.03},{x:1637050923e3,y:127.03},{x:163705116e4,y:127.08}],t.barDemoData=[{x:1,y:50},{x:2,y:200},{x:3,y:83},{x:4,y:102}],t.demoDataToString=o=>{let a="";return o.forEach(i=>{a+=`  { x: ${i.x}, y: ${i.y} },
`}),`demoData: ScatterDataPoint[] = [ 
${a}]`};let e=t;return e})();var f={selector:"cookbook-chart-example-config-base-stock",template:`<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --> </canvas>
</div>`,codeSnippet:`
  private _chart: Chart;

  public ngAfterViewInit(): void {
    StockChartConfig.registerPlugins();
    this.createChart();
  }

  public ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    let config = StockChartConfig.baseConfig;

    config = {
      ...config,
      data: {
        datasets: [
          {
            data: this.demoData.map((demoDataEntry) => demoDataEntry),
          },
        ],
        labels: this.demoData.map((demoDataEntry) => demoDataEntry.x),
      },
    };
    this._chart = new Chart(this.canvasId, config);
  }`},C=(()=>{let t=class t{constructor(){this.template=f.template,this.codeSnippet=f.codeSnippet,this.canvasId="configStockBaseCanvas"+Math.random()*1e3,this.demoData=D.demoData}ngAfterViewInit(){n.registerPlugins(),this.createChart()}ngOnDestroy(){this._chart.destroy()}createChart(){let o=n.baseConfig;o=s(r({},o),{data:{datasets:[{data:this.demoData.map(a=>a)}],labels:this.demoData.map(a=>a.x)}}),this._chart=new y(this.canvasId,o)}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=d({type:t,selectors:[["cookbook-chart-example-config-base-stock"]],decls:2,vars:2,consts:[[2,"position","relative","height","300px"],[3,"id"]],template:function(a,i){a&1&&(m(0,"div",0),p(1,"canvas",1),h()),a&2&&(c(),g("id",l(i.canvasId)))},encapsulation:2});let e=t;return e})();export{D as a,C as b};
