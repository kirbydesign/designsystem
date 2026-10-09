import"./chunk-DI4jL9Xr.js";import"./chunk-TLvGs-ke.js";import"./chunk-C7iZX3YT.js";import"./chunk-C1M0T79D.js";import"./chunk-BZjXZ8xu.js";import"./chunk-CQr8eyQt.js";import"./chunk-BBjhZojt.js";import"./chunk-CABSGZFi.js";import"./chunk-DJcGNse_.js";import{Gt as Q,R as Fe,Vt as Pe,Wn as Ydt,Xi as te,Zt as R0,cn as Th,ji as qX,jn as X,st as K,t as $$1,va as xa}from"./chunk-pZ0d1V74.js";import"./chunk-DqO0k6yi.js";import"./chunk-DKqF8VjK.js";import"./chunk-DWhrZ1vZ.js";import{na as b,ra as o}from"./main-QOEZREKT.js";var k=(()=>{class r{constructor(){this.guideChartHtml=`<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --></canvas>
</div>`,this.demoDataExample=`private ${o.demoDataString}`,this.chartProperties=`private _chart: Chart;`,this.createChartFunctionExample=`private _chart: Chart;
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
}`}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=X({type:r,selectors:[[`cookbook-chart-config-guide`]],decls:132,vars:19,consts:[[`href`,`https://www.chartjs.org/`],[`routerLink`,`../../showcase/chart-stock-config`],[`href`,`https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-base-config.ts`],[`href`,`https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-stock-config/chart-stock-config.ts`],[`href`,``],[3,`hasPadding`],[`href`,`https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API`],[3,`html`,`language`,`inlineLabel`],[`href`,`https://www.chartjs.org/docs/latest/general/accessibility.html`],[`href`,`https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note`],[3,`inlineLabel`,`ts`,`language`],[`href`,`https://angular.io/api/core/OnInit`],[`href`,`https://angular.io/api/core/AfterViewInit`],[`href`,`https://angular.io/api/core/OnDestroy`]],template:function(o,d){o&1&&(K(0,`h1`),Pe(1,`Chart config`),Q(),K(2,`p`),Pe(3,` The Kirby charts are based on a config strategy. The aim of this is to give the implementer full control of the chart. Kirby simply provides some configurations which must be passed to a `),K(4,`a`,0),Pe(5,`ChartJS`),Q(),Pe(6,` chart. `),Fe(7,`br`)(8,`br`),Pe(9,` To see more showcases on how to implement charts, please click `),K(10,`a`,1),Pe(11,`here`),Q(),Pe(12,` .
`),Q(),K(13,`h3`),Pe(14,`Structure`),Q(),K(15,`p`),Pe(16,` Each chart type (line, stock, bar, pie) is served through a Kirby chart config class which is inherited from a base class `),K(17,`code`)(18,`a`,2),Pe(19,` ChartBaseConfig `),Q()(),Pe(20,` : `),Fe(21,`br`),K(22,`code`)(23,`a`,3),Pe(24,` StockChartConfig `),Q()(),Fe(25,`br`),K(26,`code`)(27,`a`,4),Pe(28,`BarChartConfig`),Q(),Pe(29,` // Not yet implemented `),Q()(),K(30,`p`),Pe(31,`In this guide we'll implement the following chart:`),Q(),K(32,`kirby-card`,5),Fe(33,`cookbook-chart-example-config-base-stock`),Q(),Fe(34,`br`),K(35,`h3`),Pe(36,`Getting started`),Q(),K(37,`p`),Pe(38,`To implement a Kirby chart, you'll need three things:`),Q(),K(39,`ul`)(40,`li`)(41,`a`,0),Pe(42,`ChartJS`),Q()(),K(43,`li`),Pe(44,` A HTML `),K(45,`a`,6),Pe(46,`canvas`),Q(),Pe(47,` element `),Q(),K(48,`li`),Pe(49,`Kirby chart config`),Q()(),K(50,`p`),Pe(51,` In your component template, add a canvas to your HTML and give it an `),K(52,`code`),Pe(53,`id`),Q(),Pe(54,` :
`),Q(),Fe(55,`cookbook-code-viewer`,7),K(56,`p`),Pe(57,` It is up to the implementer to ensure the proper accessibility for the chart. Read more about ChartJS accessibility `),K(58,`a`,8),Pe(59,`here`),Q(),Pe(60,` .
`),Q(),K(61,`p`),Pe(62,` The canvas must be wrapped in an element with `),K(63,`code`),Pe(64,`position: relative`),Q(),Pe(65,` in order to be responsive. A thorough explanation can be found `),K(66,`a`,9),Pe(67,` here `),Q(),Pe(68,` .
`),Q(),K(69,`p`),Pe(70,` Add a property of type `),K(71,`code`),Pe(72,`Chart`),Q(),Pe(73,` (from ChartJS). This will be used later to destroy the object.
`),Q(),Fe(74,`cookbook-code-viewer`,10),K(75,`h3`),Pe(76,`Test data`),Q(),K(77,`p`),Pe(78,` Add some test data of type `),K(79,`code`),Pe(80,`ScatterPoint[]`),Q(),Pe(81,` .
`),Q(),Fe(82,`cookbook-code-viewer`,10),K(83,`h3`),Pe(84,`Configure the chart`),Q(),Pe(85,`
In a function, perform the following steps
`),K(86,`ul`)(87,`li`),Pe(88,` Get the base config from the `),K(89,`code`),Pe(90,`StockChartConfig`),Q()(),K(91,`li`),Pe(92,`Set the data`),Q(),K(93,`li`),Pe(94,` Create the `),K(95,`code`),Pe(96,`Chart`),Q(),Pe(97,` object with the same id as on your canvas element and pass the config `),Q()(),Fe(98,`cookbook-code-viewer`,10),K(99,`h3`),Pe(100,`Instantiate the chart`),Q(),K(101,`p`),Pe(102,` The StockChart utilizes some standard plugins from ChartJS. These are registered using `),K(103,`code`),Pe(104,`registerPlugins`),Q()(),K(105,`p`),Pe(106,` The `),K(107,`code`),Pe(108,`createChart`),Q(),Pe(109,` and `),K(110,`code`),Pe(111,`registerPlugins`),Q(),Pe(112,` functions must be called in the `),K(113,`code`)(114,`a`,11),Pe(115,`ngOnInit`),Q()(),Pe(116,` or `),K(117,`code`)(118,`a`,12),Pe(119,`ngAfterViewIinit`),Q()(),Pe(120,` hook.
`),Q(),Fe(121,`cookbook-code-viewer`,10)(122,`br`),K(123,`h3`),Pe(124,`Destruct the chart`),Q(),K(125,`p`),Pe(126,` Make sure to destruct the chart object when the component is destroyed in the `),K(127,`code`)(128,`a`,13),Pe(129,`ngOnDestroy`),Q()(),Pe(130,` hook:
`),Q(),Fe(131,`cookbook-code-viewer`,10)),o&2&&($$1(32),te(`hasPadding`,!0),$$1(23),te(`html`,d.guideChartHtml)(`language`,`html`)(`inlineLabel`,!0),$$1(19),te(`inlineLabel`,!0)(`ts`,d.chartProperties)(`language`,`ts`),$$1(8),te(`inlineLabel`,!0)(`ts`,d.demoDataExample)(`language`,`ts`),$$1(16),te(`inlineLabel`,!0)(`ts`,d.createChartFunctionExample)(`language`,`ts`),$$1(23),te(`inlineLabel`,!0)(`ts`,d.inintExample)(`language`,`ts`),$$1(10),te(`inlineLabel`,!0)(`ts`,d.destroyExample)(`language`,`ts`))},dependencies:[R0,Th,xa,b,Ydt],encapsulation:2})}}return r})();var y=`<main>
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
`;var x=`@use 'sass:math';

@use '@kirbydesign/core/src/scss/utils';

/* Configure grid properties */
$columns: 12;
$gap: var(--kirby-spacing-m);

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
`;var C=(()=>{class r{constructor(){this.exampleHtml=y,this.exampleCss=x}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=X({type:r,selectors:[[`cookbook-grid-layout-extended`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,d){o&1&&(K(0,`h1`),Pe(1,`Grid Layout - extended`),Q(),Fe(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&($$1(2),te(`html`,d.exampleHtml),$$1(),te(`scss`,d.exampleCss))},dependencies:[Ydt],encapsulation:2})}}return r})();var S=`<main>
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
`;var w=`@use 'sass:math';

@use '@kirbydesign/core/src/scss/utils';

/* Configure grid properties */
$columns: 12;
$gap: var(--kirby-spacing-m);

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
`;var E=(()=>{class r{constructor(){this.exampleHtml=S,this.exampleCss=w}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=X({type:r,selectors:[[`cookbook-grid-layout-multiple-containers`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,d){o&1&&(K(0,`h1`),Pe(1,`Grid Layout - multiple grid containers`),Q(),Fe(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&($$1(2),te(`html`,d.exampleHtml),$$1(),te(`scss`,d.exampleCss))},dependencies:[Ydt],encapsulation:2})}}return r})();var P=`<main>
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
`;var L=`@use 'sass:math';

@use '@kirbydesign/core/src/scss/utils';

/* Configure grid properties */
$columns: 12;
$gap: var(--kirby-spacing-m);

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
`;var D=(()=>{class r{constructor(){this.exampleHtml=P,this.exampleCss=L}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=X({type:r,selectors:[[`cookbook-grid-layout-single-container`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,d){o&1&&(K(0,`h1`),Pe(1,`Grid Layout - single grid container`),Q(),Fe(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&($$1(2),te(`html`,d.exampleHtml),$$1(),te(`scss`,d.exampleCss))},dependencies:[Ydt],encapsulation:2})}}return r})();var _=()=>[`../../showcase/chart-stock-config`];var H=(()=>{class r{static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=X({type:r,selectors:[[`cookbook-guides`]],decls:85,vars:11,consts:[[`scope`,`col`],[3,`routerLink`],[`href`,`https://ionicframework.com/docs/angular/virtual-scroll`],[`href`,`https://material.angular.io/cdk/scrolling/overview`]],template:function(o,d){o&1&&(K(0,`article`)(1,`h1`),Pe(2,`Kirby Guides`),Q(),K(3,`p`),Pe(4,` This section of the cookbook aims to bring together a few simple guides for common tasks. The guides are not complete solutions but working examples and code you can use as a starting point in your projects. `),Q(),K(5,`h2`),Pe(6,`Virtual Scrolling`),Q(),K(7,`table`)(8,`thead`)(9,`tr`)(10,`th`,0),Pe(11,`Example`),Q(),K(12,`th`,0),Pe(13,`Description`),Q()()(),K(14,`tbody`)(15,`tr`)(16,`td`)(17,`a`,1),Pe(18,`List with virtual scrolling`),Q()(),K(19,`td`)(20,`p`),Pe(21,` Basic list with virtual scrolling based on the Angular CDK Virtual Scroller. At the moment, CDK Virtual Scroller only supports fixed sized elements. For further information see `),K(22,`a`,2),Pe(23,`Ionic Docs`),Q(),Pe(24,` and `),K(25,`a`,3),Pe(26,` CDK Virtual Scrolling docs. `),Q()(),K(27,`a`,1),Pe(28,`Show me the code`),Q()()()()(),K(29,`h2`),Pe(30,`Grid Layout`),Q(),K(31,`table`)(32,`thead`)(33,`tr`)(34,`th`,0),Pe(35,`Layout Recipe`),Q(),K(36,`th`,0),Pe(37,`Description`),Q()()(),K(38,`tbody`)(39,`tr`)(40,`td`)(41,`a`,1),Pe(42,`Single grid container`),Q()(),K(43,`td`)(44,`p`),Pe(45,` Basic example. Everything is within a single grid container. Contains some decorational styles, but no additional layout styles. `),Q(),K(46,`a`,1),Pe(47,`Show me the code`),Q()()(),K(48,`tr`)(49,`td`)(50,`a`,1),Pe(51,`Multiple grid containers`),Q()(),K(52,`td`)(53,`p`),Pe(54,` The same layout as the single grid container example. Created with multiple grid containers. Contains some decorational styles, but no additional layout styles. `),Q(),K(55,`a`,1),Pe(56,`Show me the code`),Q()()(),K(57,`tr`)(58,`td`)(59,`a`,1),Pe(60,`Extended example`),Q()(),K(61,`td`)(62,`p`),Pe(63,` The same layout as the basic examples, but with additional layout styles applied, e.g., there are constructs for a max-width container and for gutter. `),Q(),K(64,`a`,1),Pe(65,`Show me the code`),Q()()()()(),K(66,`h2`),Pe(67,`Chart config`),Q(),K(68,`table`)(69,`thead`)(70,`tr`)(71,`th`,0),Pe(72,`Guide`),Q(),K(73,`th`,0),Pe(74,`Showcases`),Q()()(),K(75,`tbody`)(76,`tr`)(77,`td`)(78,`a`,1),Pe(79,`Setting up a base chart`),Q()(),K(80,`td`)(81,`p`),Pe(82,` Creating charts using Kirby's configurations. To see more ways to implement charts, see the `),K(83,`a`,1),Pe(84,`showcases`),Q()()()()()()()),o&2&&($$1(17),te(`routerLink`,`/examples/virtual-scroll-list`),$$1(10),te(`routerLink`,`virtual-scroll-list`),$$1(14),te(`routerLink`,`/examples/grid-layout-single-container`),$$1(5),te(`routerLink`,`grid-layout-single-container`),$$1(4),te(`routerLink`,`/examples/grid-layout-multiple-containers`),$$1(5),te(`routerLink`,`grid-layout-multiple-containers`),$$1(4),te(`routerLink`,`/examples/grid-layout-extended`),$$1(5),te(`routerLink`,`grid-layout-extended`),$$1(14),te(`routerLink`,`chart-config`),$$1(5),te(`routerLink`,qX(10,_)))},dependencies:[R0],styles:[`table[_ngcontent-%COMP%]{border-spacing:0;border-collapse:collapse;width:100%;margin-bottom:var(--%NS%kirby-spacing-s)}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:var(--%NS%kirby-light-tint)}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:left}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{min-width:14rem}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid var(--%NS%kirby-medium);padding:1rem}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:3.5rem}`]})}}return r})();var M=`<kirby-page title="Items">
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
`;var $=(()=>{class r{constructor(){this.exampleHtml=M}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=X({type:r,selectors:[[`cookbook-list-virtual-scroll`]],decls:3,vars:1,consts:[[3,`html`]],template:function(o,d){o&1&&(K(0,`h1`),Pe(1,`Virtual Scroll - List`),Q(),Fe(2,`cookbook-code-viewer`,0)),o&2&&($$1(2),te(`html`,d.exampleHtml))},dependencies:[Ydt],encapsulation:2})}}return r})();var Se=[{path:``,component:H},{path:`chart-config`,component:k},{path:`virtual-scroll-list`,component:$},{path:`grid-layout-single-container`,component:D},{path:`grid-layout-multiple-containers`,component:E},{path:`grid-layout-extended`,component:C}];export{Se as GUIDES_ROUTES};