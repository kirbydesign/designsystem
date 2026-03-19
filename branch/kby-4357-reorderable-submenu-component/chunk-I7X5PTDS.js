import{a as f,b as k}from"./chunk-72P25R6Z.js";import{$a as g,Je as p,Lc as b,Mc as v,Oa as e,X as n,da as c,lc as u,ra as r,sa as t,ta as i,ua as d}from"./chunk-UYOMO24E.js";import"./chunk-WU3WKMXB.js";import"./chunk-QUJFQN2Y.js";import"./chunk-FJCVXXSM.js";import"./chunk-L3YSTCGG.js";import"./chunk-V5ZBYUTY.js";import"./chunk-A6UGDI54.js";import"./chunk-6AZIPES6.js";import"./chunk-B5L7DGQN.js";import"./chunk-N6HRVCSR.js";import"./chunk-PKG65ASR.js";import"./chunk-2IIHYPGS.js";import"./chunk-CDAY42EK.js";import"./chunk-MTHZ7MWU.js";import"./chunk-WI5MSH4N.js";import"./chunk-V4H54Y75.js";import"./chunk-CKP3SGE2.js";import"./chunk-4HHRXU54.js";import"./chunk-JUTDZOWG.js";import"./chunk-IFQZQTA4.js";import"./chunk-AI5AD5EM.js";import"./chunk-FTZSCEJ6.js";import"./chunk-VSDHJBUA.js";import"./chunk-4WFVMWDK.js";import"./chunk-M2X7KQLB.js";import"./chunk-DVVH2KKN.js";import"./chunk-NV3QH4JK.js";import"./chunk-27BBEQ2G.js";import"./chunk-OZYWYLNK.js";import"./chunk-42C7ZIID.js";import"./chunk-FIRXXYNY.js";var x=(()=>{let a=class a{constructor(){this.guideChartHtml=`<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --></canvas>
</div>`,this.demoDataExample=`private ${f.demoDataString}`,this.chartProperties="private _chart: Chart;",this.createChartFunctionExample=`private _chart: Chart;
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
 }`,this.inintExample=`public ngAfterViewInit(): void {
    StockChartConfig.registerPlugins();
    this.createChart();
}`,this.destroyExample=`public ngOnDestroy(): void {
  this._chart.destroy();
}`}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=c({type:a,selectors:[["cookbook-chart-config-guide"]],decls:132,vars:19,consts:[["href","https://www.chartjs.org/"],["routerLink","../../showcase/chart-stock-config"],["href","https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-base-config.ts"],["href","https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-stock-config/chart-stock-config.ts"],["href",""],[3,"hasPadding"],["href","https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"],[3,"html","language","inlineLabel"],["href","https://www.chartjs.org/docs/latest/general/accessibility.html"],["href","https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note"],[3,"inlineLabel","ts","language"],["href","https://angular.io/api/core/OnInit"],["href","https://angular.io/api/core/AfterViewInit"],["href","https://angular.io/api/core/OnDestroy"]],template:function(o,s){o&1&&(t(0,"h1"),e(1,"Chart config"),i(),t(2,"p"),e(3," The Kirby charts are based on a config strategy. The aim of this is to give the implementer full control of the chart. Kirby simply provides some configurations which must be passed to a "),t(4,"a",0),e(5,"ChartJS"),i(),e(6," chart. "),d(7,"br")(8,"br"),e(9," To see more showcases on how to implement charts, please click "),t(10,"a",1),e(11,"here"),i(),e(12,` .
`),i(),t(13,"h3"),e(14,"Structure"),i(),t(15,"p"),e(16," Each chart type (line, stock, bar, pie) is served through a Kirby chart config class which is inherited from a base class "),t(17,"code")(18,"a",2),e(19," ChartBaseConfig "),i()(),e(20," : "),d(21,"br"),t(22,"code")(23,"a",3),e(24," StockChartConfig "),i()(),d(25,"br"),t(26,"code")(27,"a",4),e(28,"BarChartConfig"),i(),e(29," // Not yet implemented "),i()(),t(30,"p"),e(31,"In this guide we'll implement the following chart:"),i(),t(32,"kirby-card",5),d(33,"cookbook-chart-example-config-base-stock"),i(),d(34,"br"),t(35,"h3"),e(36,"Getting started"),i(),t(37,"p"),e(38,"To implement a Kirby chart, you'll need three things:"),i(),t(39,"ul")(40,"li")(41,"a",0),e(42,"ChartJS"),i()(),t(43,"li"),e(44," A HTML "),t(45,"a",6),e(46,"canvas"),i(),e(47," element "),i(),t(48,"li"),e(49,"Kirby chart config"),i()(),t(50,"p"),e(51," In your component template, add a canvas to your HTML and give it an "),t(52,"code"),e(53,"id"),i(),e(54,` :
`),i(),d(55,"cookbook-code-viewer",7),t(56,"p"),e(57," It is up to the implementer to ensure the proper accessibility for the chart. Read more about ChartJS accessibility "),t(58,"a",8),e(59,"here"),i(),e(60,` .
`),i(),t(61,"p"),e(62," The canvas must be wrapped in an element with "),t(63,"code"),e(64,"position: relative"),i(),e(65," in order to be responsive. A thorough explanation can be found "),t(66,"a",9),e(67," here "),i(),e(68,` .
`),i(),t(69,"p"),e(70," Add a property of type "),t(71,"code"),e(72,"Chart"),i(),e(73,` (from ChartJS). This will be used later to destroy the object.
`),i(),d(74,"cookbook-code-viewer",10),t(75,"h3"),e(76,"Test data"),i(),t(77,"p"),e(78," Add some test data of type "),t(79,"code"),e(80,"ScatterPoint[]"),i(),e(81,` .
`),i(),d(82,"cookbook-code-viewer",10),t(83,"h3"),e(84,"Configure the chart"),i(),e(85,`
In a function, perform the following steps
`),t(86,"ul")(87,"li"),e(88," Get the base config from the "),t(89,"code"),e(90,"StockChartConfig"),i()(),t(91,"li"),e(92,"Set the data"),i(),t(93,"li"),e(94," Create the "),t(95,"code"),e(96,"Chart"),i(),e(97," object with the same id as on your canvas element and pass the config "),i()(),d(98,"cookbook-code-viewer",10),t(99,"h3"),e(100,"Instantiate the chart"),i(),t(101,"p"),e(102," The StockChart utilizes some standard plugins from ChartJS. These are registered using "),t(103,"code"),e(104,"registerPlugins"),i()(),t(105,"p"),e(106," The "),t(107,"code"),e(108,"createChart"),i(),e(109," and "),t(110,"code"),e(111,"registerPlugins"),i(),e(112," functions must be called in the "),t(113,"code")(114,"a",11),e(115,"ngOnInit"),i()(),e(116," or "),t(117,"code")(118,"a",12),e(119,"ngAfterViewIinit"),i()(),e(120,` hook.
`),i(),d(121,"cookbook-code-viewer",10)(122,"br"),t(123,"h3"),e(124,"Destruct the chart"),i(),t(125,"p"),e(126," Make sure to destruct the chart object when the component is destroyed in the "),t(127,"code")(128,"a",13),e(129,"ngOnDestroy"),i()(),e(130,` hook:
`),i(),d(131,"cookbook-code-viewer",10)),o&2&&(n(32),r("hasPadding",!0),n(23),r("html",s.guideChartHtml)("language","html")("inlineLabel",!0),n(19),r("inlineLabel",!0)("ts",s.chartProperties)("language","ts"),n(8),r("inlineLabel",!0)("ts",s.demoDataExample)("language","ts"),n(16),r("inlineLabel",!0)("ts",s.createChartFunctionExample)("language","ts"),n(23),r("inlineLabel",!0)("ts",s.inintExample)("language","ts"),n(10),r("inlineLabel",!0)("ts",s.destroyExample)("language","ts"))},dependencies:[u,v,b,k,p],encapsulation:2});let l=a;return l})();var y=`<main>
  <section>
    <div class="safe-area-inline">
      <div class="max-width-container gutter">
        <h1>Grid Layout - Extended Example</h1>
      </div>
      <div class="max-width-container">
        <div class="grid-container">
          <div class="grid-item half-at-tablet-up">
            <article>
              <div class="gutter">
                <h2>Heading level 2</h2>
              </div>
              <kirby-card hasPadding="true">
                <div class="box example-text align-center">1</div>
              </kirby-card>
            </article>
          </div>
          <div class="grid-item half-at-tablet-up">
            <article>
              <div class="gutter">
                <h2>Heading level 2</h2>
              </div>
              <kirby-card hasPadding="true">
                <div class="box example-text align-center">2</div>
              </kirby-card>
            </article>
          </div>
          <div class="grid-item half-at-tablet-up">
            <article>
              <div class="gutter">
                <h2>Heading level 2</h2>
              </div>
              <kirby-card hasPadding="true">
                <div class="box example-text align-center">3</div>
              </kirby-card>
            </article>
          </div>
          <div class="grid-item half-at-tablet-up">
            <article>
              <div class="gutter">
                <h2>Heading level 2</h2>
              </div>
              <kirby-card hasPadding="true">
                <div class="box example-text align-center">4</div>
              </kirby-card>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="safe-area-inline">
    <div class="max-width-container gutter">
      <div class="box">
        <button kirby-button size="lg">Add</button>
        <p class="align-center">
          Strategy bonds IRA lucrative Fitch rates bondholders securities fiat public managed 401k
          risk market index.
        </p>
      </div>
    </div>
  </div>

  <section>
    <div class="safe-area-inline">
      <div class="max-width-container gutter">
        <h1>Heading level 1</h1>
        <p>
          Strategy bonds IRA lucrative Fitch rates bondholders securities fiat public managed 401k
          risk market index.
        </p>
      </div>
      <div class="max-width-container">
        <div class="grid-container">
          <div class="grid-item half-at-tablet-up third-at-desktop-up">
            <article>
              <kirby-card hasPadding="true">
                <h2>Heading level 2</h2>
                <p>
                  Fluctuate interest rates Dow Jones receive rise government term municipal market
                  Nikkei passively return performance. Public finance holder fiat established bonds
                  hedge fund benchmark.
                </p>
              </kirby-card>
            </article>
          </div>
          <div class="grid-item half-at-tablet-up third-at-desktop-up">
            <article>
              <kirby-card hasPadding="true">
                <h2>Heading level 2</h2>
                <p>
                  Fluctuate interest rates Dow Jones receive rise government term municipal market
                  Nikkei passively return performance. Public finance holder fiat established bonds
                  hedge fund benchmark.
                </p>
              </kirby-card>
            </article>
          </div>
          <div class="grid-item half-at-tablet-up third-at-desktop-up">
            <article>
              <kirby-card hasPadding="true">
                <h2>Heading level 2</h2>
                <p>
                  Fluctuate interest rates Dow Jones receive rise government term municipal market
                  Nikkei passively return performance. Public finance holder fiat established bonds
                  hedge fund benchmark.
                </p>
              </kirby-card>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--
    Hidden area for demonstrating non-essential parts of the layout.
    Only visible when inside a containing element with class="debug".
    Apply class="debug" to <main> to make the not-grid area visible.
  -->
  <div class="not-grid">
    <div class="safe-area-inline">
      <div class="max-width-container gutter">
        <div id="example-1" class="box example-text align-center">
          <div class="h1">max-width + gutter + safe area</div>
          .safe-area-inline > .max-width-container.gutter
        </div>
      </div>
    </div>
    <div class="safe-area-inline">
      <div id="example-2" class="box example-text align-center">
        <div class="h1">Full width + safe area</div>
        .safe-area-inline
      </div>
    </div>
    <div id="example-3" class="box example-text align-center">
      <div class="h1">Full width</div>
    </div>
  </div>
</main>
`;var S=`@use 'sass:math';

@use '@kirbydesign/core/src/scss/utils';

/* Configure grid properties */
$columns: 12;
$gap: utils.size('m');

/* Declare the grid container */
.grid-container {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;
}

/* Let grid items span all columns by default */
.grid-item {
  grid-column: span $columns;
}

/* Tablet size and above */
@include utils.media('>=medium') {
  .half-at-tablet-up {
    grid-column: span ($columns * 0.5);
  }
}

/* Desktop size and above */
@include utils.media('>=large') {
  .half-at-desktop-up {
    grid-column: span ($columns * 0.5);
  }

  .third-at-desktop-up {
    grid-column: span math.div($columns, 3);
  }
}

/*********************************************************
  Additional styles that are not essential to the example
 *********************************************************/

$gutter: 16px;
$safe-area: 16px;
$max-width: 1196px;

main {
  background-color: var(--kirby-background-color);
  min-height: 100%;
}

.max-width-container {
  max-width: $max-width;
  margin-inline: auto;
}

.gutter {
  padding-inline: $gutter;
}

.safe-area-inline {
  padding-inline: $gutter;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.align-center {
  text-align: center;
}

/*
  Hidden area for demonstrating the non- parts of the layout.
  Only visible when containing <main> element has class="debug".
*/
.not-grid {
  display: none;
}

.example-text {
  &,
  & > p {
    font-size: clamp(1rem, 5vw, 2rem);
  }
}

/* Extra Color Bonanza */
.debug {
  kirby-card {
    --kirby-card-main-background-color: var(--kirby-white-contrast);
    --kirby-card-main-color: var(--kirby-white);
  }

  h1,
  h2 {
    background-color: #fff;
    color: #000;
  }

  .not-grid {
    display: block;
  }

  .gutter {
    background-color: chartreuse;
    color: #000;
  }

  .safe-area-inline {
    background-color: darkcyan;
    color: #000;
  }

  .box {
    background-color: hotpink;
    color: #000;
  }

  #example-1 {
    background-color: crimson;
    color: #fff;
  }

  #example-2 {
    background-color: rebeccapurple;
    color: #fff;
  }

  #example-3 {
    background-color: deepskyblue;
    color: #000;
  }
}
`;var C=(()=>{let a=class a{constructor(){this.exampleHtml=y,this.exampleCss=S}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=c({type:a,selectors:[["cookbook-grid-layout-extended"]],decls:4,vars:2,consts:[[3,"html"],[3,"scss"]],template:function(o,s){o&1&&(t(0,"h1"),e(1,"Grid Layout - extended"),i(),d(2,"cookbook-code-viewer",0)(3,"cookbook-code-viewer",1)),o&2&&(n(2),r("html",s.exampleHtml),n(),r("scss",s.exampleCss))},dependencies:[p],encapsulation:2});let l=a;return l})();var w=`<main>
  <h1>Grid Layout - Multiple Grid Containers</h1>
  <div class="grid-container">
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">1</kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">2</kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">3</kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">4</kirby-card>
    </div>
  </div>
  <p><button kirby-button size="lg">Add</button></p>
  <p>
    Strategy bonds IRA lucrative Fitch rates bondholders securities fiat public managed 401k risk
    market index.
  </p>
  <h1>Heading level 1</h1>
  <p>
    Government substantially taxpayer market exposure index funds. Fitch municipal bonds managed.
  </p>
  <div class="grid-container">
    <div class="grid-item half-at-tablet-up third-at-desktop-up">
      <kirby-card hasPadding="true">
        <h2>Heading level 2</h2>
        <p>
          Fluctuate interest rates Dow Jones receive rise government term municipal market Nikkei
          passively return performance. Public finance holder fiat established bonds hedge fund
          benchmark.
        </p>
      </kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up third-at-desktop-up">
      <kirby-card hasPadding="true">
        <h2>Heading level 2</h2>
        <p>
          Fluctuate interest rates Dow Jones receive rise government term municipal market Nikkei
          passively return performance. Public finance holder fiat established bonds hedge fund
          benchmark.
        </p>
      </kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up third-at-desktop-up">
      <kirby-card hasPadding="true">
        <h2>Heading level 2</h2>
        <p>
          Fluctuate interest rates Dow Jones receive rise government term municipal market Nikkei
          passively return performance. Public finance holder fiat established bonds hedge fund
          benchmark.
        </p>
      </kirby-card>
    </div>
  </div>
</main>
`;var E=`@use 'sass:math';

@use '@kirbydesign/core/src/scss/utils';

/* Configure grid properties */
$columns: 12;
$gap: utils.size('m');

/* Declare the grid container */
.grid-container {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;
}

/* Let grid items span all columns by default */
.grid-item {
  grid-column: span $columns;
}

/* Tablet size and above */
@include utils.media('>=medium') {
  .half-at-tablet-up {
    grid-column: span ($columns * 0.5);
  }
}

/* Desktop size and above */
@include utils.media('>=large') {
  .half-at-desktop-up {
    grid-column: span ($columns * 0.5);
  }

  .third-at-desktop-up {
    grid-column: span math.div($columns, 3);
  }
}

/* Additional styles that are not essential to the example */
main {
  background-color: var(--kirby-background-color);
  min-height: 100%;
  padding-block: 2rem 5rem;
}
`;var P=(()=>{let a=class a{constructor(){this.exampleHtml=w,this.exampleCss=E}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=c({type:a,selectors:[["cookbook-grid-layout-multiple-containers"]],decls:4,vars:2,consts:[[3,"html"],[3,"scss"]],template:function(o,s){o&1&&(t(0,"h1"),e(1,"Grid Layout - multiple grid containers"),i(),d(2,"cookbook-code-viewer",0)(3,"cookbook-code-viewer",1)),o&2&&(n(2),r("html",s.exampleHtml),n(),r("scss",s.exampleCss))},dependencies:[p],encapsulation:2});let l=a;return l})();var D=`<main>
  <div class="grid-container">
    <div class="grid-item">
      <h1>Grid Layout - Single Grid Container</h1>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">1</kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">2</kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">3</kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up">
      <h2>Heading level 2</h2>
      <kirby-card hasPadding="true">4</kirby-card>
    </div>
    <div class="grid-item">
      <button kirby-button size="lg">Add</button>
      <p class="align-center">
        Strategy bonds IRA lucrative Fitch rates bondholders securities fiat public managed 401k
        risk market index.
      </p>
    </div>
    <div class="grid-item">
      <h1>Heading level 1</h1>
      <p>
        Strategy bonds IRA lucrative Fitch rates bondholders securities fiat public managed 401k
        risk market index.
      </p>
    </div>
    <div class="grid-item half-at-tablet-up third-at-desktop-up">
      <kirby-card hasPadding="true">
        <h2>Heading level 2</h2>
        <p>
          Fluctuate interest rates Dow Jones receive rise government term municipal market Nikkei
          passively return performance. Public finance holder fiat established bonds hedge fund
          benchmark.
        </p>
      </kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up third-at-desktop-up">
      <kirby-card hasPadding="true">
        <h2>Heading level 2</h2>
        <p>
          Fluctuate interest rates Dow Jones receive rise government term municipal market Nikkei
          passively return performance. Public finance holder fiat established bonds hedge fund
          benchmark.
        </p>
      </kirby-card>
    </div>
    <div class="grid-item half-at-tablet-up third-at-desktop-up">
      <kirby-card hasPadding="true">
        <h2>Heading level 2</h2>
        <p>
          Fluctuate interest rates Dow Jones receive rise government term municipal market Nikkei
          passively return performance. Public finance holder fiat established bonds hedge fund
          benchmark.
        </p>
      </kirby-card>
    </div>
  </div>
</main>
`;var H=`@use 'sass:math';

@use '@kirbydesign/core/src/scss/utils';

/* Configure grid properties */
$columns: 12;
$gap: utils.size('m');

/* Declare the grid container */
.grid-container {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;
}

/* Let grid items span all columns by default */
.grid-item {
  grid-column: span $columns;
}

/* Tablet size and above */
@include utils.media('>=medium') {
  .half-at-tablet-up {
    grid-column: span ($columns * 0.5);
  }
}

/* Desktop size and above */
@include utils.media('>=large') {
  .half-at-desktop-up {
    grid-column: span ($columns * 0.5);
  }

  .third-at-desktop-up {
    grid-column: span math.div($columns, 3);
  }
}

/* Additional styles that are not essential to the example */
main {
  background-color: var(--kirby-background-color);
  min-height: 100%;
  padding-block: 2rem 5rem;
}
`;var L=(()=>{let a=class a{constructor(){this.exampleHtml=D,this.exampleCss=H}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=c({type:a,selectors:[["cookbook-grid-layout-single-container"]],decls:4,vars:2,consts:[[3,"html"],[3,"scss"]],template:function(o,s){o&1&&(t(0,"h1"),e(1,"Grid Layout - single grid container"),i(),d(2,"cookbook-code-viewer",0)(3,"cookbook-code-viewer",1)),o&2&&(n(2),r("html",s.exampleHtml),n(),r("scss",s.exampleCss))},dependencies:[p],encapsulation:2});let l=a;return l})();var V=()=>["../../showcase/chart-stock-config"],M=(()=>{let a=class a{};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=c({type:a,selectors:[["cookbook-guides"]],decls:85,vars:11,consts:[["scope","col"],[3,"routerLink"],["href","https://ionicframework.com/docs/angular/virtual-scroll"],["href","https://material.angular.io/cdk/scrolling/overview"]],template:function(o,s){o&1&&(t(0,"article")(1,"h1"),e(2,"Kirby Guides"),i(),t(3,"p"),e(4," This section of the cookbook aims to bring together a few simple guides for common tasks. The guides are not complete solutions but working examples and code you can use as a starting point in your projects. "),i(),t(5,"h2"),e(6,"Virtual Scrolling"),i(),t(7,"table")(8,"thead")(9,"tr")(10,"th",0),e(11,"Example"),i(),t(12,"th",0),e(13,"Description"),i()()(),t(14,"tbody")(15,"tr")(16,"td")(17,"a",1),e(18,"List with virtual scrolling"),i()(),t(19,"td")(20,"p"),e(21," Basic list with virtual scrolling based on the Angular CDK Virtual Scroller. At the moment, CDK Virtual Scroller only supports fixed sized elements. For further information see "),t(22,"a",2),e(23,"Ionic Docs"),i(),e(24," and "),t(25,"a",3),e(26," CDK Virtual Scrolling docs. "),i()(),t(27,"a",1),e(28,"Show me the code"),i()()()()(),t(29,"h2"),e(30,"Grid Layout"),i(),t(31,"table")(32,"thead")(33,"tr")(34,"th",0),e(35,"Layout Recipe"),i(),t(36,"th",0),e(37,"Description"),i()()(),t(38,"tbody")(39,"tr")(40,"td")(41,"a",1),e(42,"Single grid container"),i()(),t(43,"td")(44,"p"),e(45," Basic example. Everything is within a single grid container. Contains some decorational styles, but no additional layout styles. "),i(),t(46,"a",1),e(47,"Show me the code"),i()()(),t(48,"tr")(49,"td")(50,"a",1),e(51,"Multiple grid containers"),i()(),t(52,"td")(53,"p"),e(54," The same layout as the single grid container example. Created with multiple grid containers. Contains some decorational styles, but no additional layout styles. "),i(),t(55,"a",1),e(56,"Show me the code"),i()()(),t(57,"tr")(58,"td")(59,"a",1),e(60,"Extended example"),i()(),t(61,"td")(62,"p"),e(63," The same layout as the basic examples, but with additional layout styles applied, e.g., there are constructs for a max-width container and for gutter. "),i(),t(64,"a",1),e(65,"Show me the code"),i()()()()(),t(66,"h2"),e(67,"Chart config"),i(),t(68,"table")(69,"thead")(70,"tr")(71,"th",0),e(72,"Guide"),i(),t(73,"th",0),e(74,"Showcases"),i()()(),t(75,"tbody")(76,"tr")(77,"td")(78,"a",1),e(79,"Setting up a base chart"),i()(),t(80,"td")(81,"p"),e(82," Creating charts using Kirby's configurations. To see more ways to implement charts, see the "),t(83,"a",1),e(84,"showcases"),i()()()()()()()),o&2&&(n(17),r("routerLink","/examples/virtual-scroll-list"),n(10),r("routerLink","virtual-scroll-list"),n(14),r("routerLink","/examples/grid-layout-single-container"),n(5),r("routerLink","grid-layout-single-container"),n(4),r("routerLink","/examples/grid-layout-multiple-containers"),n(5),r("routerLink","grid-layout-multiple-containers"),n(4),r("routerLink","/examples/grid-layout-extended"),n(5),r("routerLink","grid-layout-extended"),n(14),r("routerLink","chart-config"),n(5),r("routerLink",g(10,V)))},dependencies:[u],styles:["table[_ngcontent-%COMP%]{border-spacing:0;border-collapse:collapse;width:100%;margin-bottom:16px}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:var(--kirby-light-tint)}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:left}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{min-width:14rem}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid var(--kirby-medium);padding:1rem}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:3.5rem}"]});let l=a;return l})();var $=`<kirby-page title="Items">
  <kirby-page-content>
    <cdk-virtual-scroll-viewport
      minBufferPx="840"
      maxBufferPx="1120"
      itemSize="56"
      style="height: 720px"
    >
      <kirby-list-experimental>
        <kirby-item *cdkVirtualFor="let item of itemsFullList">
          <h1>{{ item.id }}: {{ item.title }}</h1>
        </kirby-item>
      </kirby-list-experimental>
    </cdk-virtual-scroll-viewport>
  </kirby-page-content>
</kirby-page>
`;var F=(()=>{let a=class a{constructor(){this.exampleHtml=$}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=c({type:a,selectors:[["cookbook-list-virtual-scroll"]],decls:3,vars:1,consts:[[3,"html"]],template:function(o,s){o&1&&(t(0,"h1"),e(1,"Virtual Scroll - List"),i(),d(2,"cookbook-code-viewer",0)),o&2&&(n(2),r("html",s.exampleHtml))},dependencies:[p],encapsulation:2});let l=a;return l})();var we=[{path:"",component:M},{path:"chart-config",component:x},{path:"virtual-scroll-list",component:F},{path:"grid-layout-single-container",component:L},{path:"grid-layout-multiple-containers",component:P},{path:"grid-layout-extended",component:C}];export{we as GUIDES_ROUTES};
