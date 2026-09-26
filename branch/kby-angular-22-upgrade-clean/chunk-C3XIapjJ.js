import"./chunk-Dn40Sse5.js";import"./chunk-ptKobFY0.js";import"./chunk-BeP1KC6J.js";import"./chunk-CjRQA3mU.js";import"./chunk-DsdPqrMF.js";import"./chunk-BwO8wud6.js";import"./chunk-BBjhZojt.js";import"./chunk-CABSGZFi.js";import"./chunk-DJcGNse_.js";import{$i as sY,Di as mf,Fr as ga,Ht as Q,U as H$1,Un as Y,a as $ht,bi as m0,ct as K,dn as Te,en as Re,na as te}from"./chunk-DI6K5YWK.js";import"./chunk-DhLnBNUZ.js";import"./chunk-DKqF8VjK.js";import"./chunk-C4JJki5U.js";import{na as b,ra as o}from"./main-A2R63V22.js";var k=(()=>{class r{constructor(){this.guideChartHtml=`<div style="position: relative; height: 300px;">
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
}`}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=Q({type:r,selectors:[[`cookbook-chart-config-guide`]],decls:132,vars:19,consts:[[`href`,`https://www.chartjs.org/`],[`routerLink`,`../../showcase/chart-stock-config`],[`href`,`https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-base-config.ts`],[`href`,`https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-stock-config/chart-stock-config.ts`],[`href`,``],[3,`hasPadding`],[`href`,`https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API`],[3,`html`,`language`,`inlineLabel`],[`href`,`https://www.chartjs.org/docs/latest/general/accessibility.html`],[`href`,`https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note`],[3,`inlineLabel`,`ts`,`language`],[`href`,`https://angular.io/api/core/OnInit`],[`href`,`https://angular.io/api/core/AfterViewInit`],[`href`,`https://angular.io/api/core/OnDestroy`]],template:function(o,d){o&1&&(Y(0,`h1`),Te(1,`Chart config`),K(),Y(2,`p`),Te(3,` The Kirby charts are based on a config strategy. The aim of this is to give the implementer full control of the chart. Kirby simply provides some configurations which must be passed to a `),Y(4,`a`,0),Te(5,`ChartJS`),K(),Te(6,` chart. `),Re(7,`br`)(8,`br`),Te(9,` To see more showcases on how to implement charts, please click `),Y(10,`a`,1),Te(11,`here`),K(),Te(12,` .
`),K(),Y(13,`h3`),Te(14,`Structure`),K(),Y(15,`p`),Te(16,` Each chart type (line, stock, bar, pie) is served through a Kirby chart config class which is inherited from a base class `),Y(17,`code`)(18,`a`,2),Te(19,` ChartBaseConfig `),K()(),Te(20,` : `),Re(21,`br`),Y(22,`code`)(23,`a`,3),Te(24,` StockChartConfig `),K()(),Re(25,`br`),Y(26,`code`)(27,`a`,4),Te(28,`BarChartConfig`),K(),Te(29,` // Not yet implemented `),K()(),Y(30,`p`),Te(31,`In this guide we'll implement the following chart:`),K(),Y(32,`kirby-card`,5),Re(33,`cookbook-chart-example-config-base-stock`),K(),Re(34,`br`),Y(35,`h3`),Te(36,`Getting started`),K(),Y(37,`p`),Te(38,`To implement a Kirby chart, you'll need three things:`),K(),Y(39,`ul`)(40,`li`)(41,`a`,0),Te(42,`ChartJS`),K()(),Y(43,`li`),Te(44,` A HTML `),Y(45,`a`,6),Te(46,`canvas`),K(),Te(47,` element `),K(),Y(48,`li`),Te(49,`Kirby chart config`),K()(),Y(50,`p`),Te(51,` In your component template, add a canvas to your HTML and give it an `),Y(52,`code`),Te(53,`id`),K(),Te(54,` :
`),K(),Re(55,`cookbook-code-viewer`,7),Y(56,`p`),Te(57,` It is up to the implementer to ensure the proper accessibility for the chart. Read more about ChartJS accessibility `),Y(58,`a`,8),Te(59,`here`),K(),Te(60,` .
`),K(),Y(61,`p`),Te(62,` The canvas must be wrapped in an element with `),Y(63,`code`),Te(64,`position: relative`),K(),Te(65,` in order to be responsive. A thorough explanation can be found `),Y(66,`a`,9),Te(67,` here `),K(),Te(68,` .
`),K(),Y(69,`p`),Te(70,` Add a property of type `),Y(71,`code`),Te(72,`Chart`),K(),Te(73,` (from ChartJS). This will be used later to destroy the object.
`),K(),Re(74,`cookbook-code-viewer`,10),Y(75,`h3`),Te(76,`Test data`),K(),Y(77,`p`),Te(78,` Add some test data of type `),Y(79,`code`),Te(80,`ScatterPoint[]`),K(),Te(81,` .
`),K(),Re(82,`cookbook-code-viewer`,10),Y(83,`h3`),Te(84,`Configure the chart`),K(),Te(85,`
In a function, perform the following steps
`),Y(86,`ul`)(87,`li`),Te(88,` Get the base config from the `),Y(89,`code`),Te(90,`StockChartConfig`),K()(),Y(91,`li`),Te(92,`Set the data`),K(),Y(93,`li`),Te(94,` Create the `),Y(95,`code`),Te(96,`Chart`),K(),Te(97,` object with the same id as on your canvas element and pass the config `),K()(),Re(98,`cookbook-code-viewer`,10),Y(99,`h3`),Te(100,`Instantiate the chart`),K(),Y(101,`p`),Te(102,` The StockChart utilizes some standard plugins from ChartJS. These are registered using `),Y(103,`code`),Te(104,`registerPlugins`),K()(),Y(105,`p`),Te(106,` The `),Y(107,`code`),Te(108,`createChart`),K(),Te(109,` and `),Y(110,`code`),Te(111,`registerPlugins`),K(),Te(112,` functions must be called in the `),Y(113,`code`)(114,`a`,11),Te(115,`ngOnInit`),K()(),Te(116,` or `),Y(117,`code`)(118,`a`,12),Te(119,`ngAfterViewIinit`),K()(),Te(120,` hook.
`),K(),Re(121,`cookbook-code-viewer`,10)(122,`br`),Y(123,`h3`),Te(124,`Destruct the chart`),K(),Y(125,`p`),Te(126,` Make sure to destruct the chart object when the component is destroyed in the `),Y(127,`code`)(128,`a`,13),Te(129,`ngOnDestroy`),K()(),Te(130,` hook:
`),K(),Re(131,`cookbook-code-viewer`,10)),o&2&&(H$1(32),te(`hasPadding`,!0),H$1(23),te(`html`,d.guideChartHtml)(`language`,`html`)(`inlineLabel`,!0),H$1(19),te(`inlineLabel`,!0)(`ts`,d.chartProperties)(`language`,`ts`),H$1(8),te(`inlineLabel`,!0)(`ts`,d.demoDataExample)(`language`,`ts`),H$1(16),te(`inlineLabel`,!0)(`ts`,d.createChartFunctionExample)(`language`,`ts`),H$1(23),te(`inlineLabel`,!0)(`ts`,d.inintExample)(`language`,`ts`),H$1(10),te(`inlineLabel`,!0)(`ts`,d.destroyExample)(`language`,`ts`))},dependencies:[m0,mf,ga,b,$ht],encapsulation:2})}}return r})();var y=`<main>
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
`;var C=(()=>{class r{constructor(){this.exampleHtml=y,this.exampleCss=x}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=Q({type:r,selectors:[[`cookbook-grid-layout-extended`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,d){o&1&&(Y(0,`h1`),Te(1,`Grid Layout - extended`),K(),Re(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&(H$1(2),te(`html`,d.exampleHtml),H$1(),te(`scss`,d.exampleCss))},dependencies:[$ht],encapsulation:2})}}return r})();var S=`<main>
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
`;var E=(()=>{class r{constructor(){this.exampleHtml=S,this.exampleCss=w}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=Q({type:r,selectors:[[`cookbook-grid-layout-multiple-containers`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,d){o&1&&(Y(0,`h1`),Te(1,`Grid Layout - multiple grid containers`),K(),Re(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&(H$1(2),te(`html`,d.exampleHtml),H$1(),te(`scss`,d.exampleCss))},dependencies:[$ht],encapsulation:2})}}return r})();var P=`<main>
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
`;var D=(()=>{class r{constructor(){this.exampleHtml=P,this.exampleCss=L}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=Q({type:r,selectors:[[`cookbook-grid-layout-single-container`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,d){o&1&&(Y(0,`h1`),Te(1,`Grid Layout - single grid container`),K(),Re(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&(H$1(2),te(`html`,d.exampleHtml),H$1(),te(`scss`,d.exampleCss))},dependencies:[$ht],encapsulation:2})}}return r})();var _=()=>[`../../showcase/chart-stock-config`];var H=(()=>{class r{static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=Q({type:r,selectors:[[`cookbook-guides`]],decls:85,vars:11,consts:[[`scope`,`col`],[3,`routerLink`],[`href`,`https://ionicframework.com/docs/angular/virtual-scroll`],[`href`,`https://material.angular.io/cdk/scrolling/overview`]],template:function(o,d){o&1&&(Y(0,`article`)(1,`h1`),Te(2,`Kirby Guides`),K(),Y(3,`p`),Te(4,` This section of the cookbook aims to bring together a few simple guides for common tasks. The guides are not complete solutions but working examples and code you can use as a starting point in your projects. `),K(),Y(5,`h2`),Te(6,`Virtual Scrolling`),K(),Y(7,`table`)(8,`thead`)(9,`tr`)(10,`th`,0),Te(11,`Example`),K(),Y(12,`th`,0),Te(13,`Description`),K()()(),Y(14,`tbody`)(15,`tr`)(16,`td`)(17,`a`,1),Te(18,`List with virtual scrolling`),K()(),Y(19,`td`)(20,`p`),Te(21,` Basic list with virtual scrolling based on the Angular CDK Virtual Scroller. At the moment, CDK Virtual Scroller only supports fixed sized elements. For further information see `),Y(22,`a`,2),Te(23,`Ionic Docs`),K(),Te(24,` and `),Y(25,`a`,3),Te(26,` CDK Virtual Scrolling docs. `),K()(),Y(27,`a`,1),Te(28,`Show me the code`),K()()()()(),Y(29,`h2`),Te(30,`Grid Layout`),K(),Y(31,`table`)(32,`thead`)(33,`tr`)(34,`th`,0),Te(35,`Layout Recipe`),K(),Y(36,`th`,0),Te(37,`Description`),K()()(),Y(38,`tbody`)(39,`tr`)(40,`td`)(41,`a`,1),Te(42,`Single grid container`),K()(),Y(43,`td`)(44,`p`),Te(45,` Basic example. Everything is within a single grid container. Contains some decorational styles, but no additional layout styles. `),K(),Y(46,`a`,1),Te(47,`Show me the code`),K()()(),Y(48,`tr`)(49,`td`)(50,`a`,1),Te(51,`Multiple grid containers`),K()(),Y(52,`td`)(53,`p`),Te(54,` The same layout as the single grid container example. Created with multiple grid containers. Contains some decorational styles, but no additional layout styles. `),K(),Y(55,`a`,1),Te(56,`Show me the code`),K()()(),Y(57,`tr`)(58,`td`)(59,`a`,1),Te(60,`Extended example`),K()(),Y(61,`td`)(62,`p`),Te(63,` The same layout as the basic examples, but with additional layout styles applied, e.g., there are constructs for a max-width container and for gutter. `),K(),Y(64,`a`,1),Te(65,`Show me the code`),K()()()()(),Y(66,`h2`),Te(67,`Chart config`),K(),Y(68,`table`)(69,`thead`)(70,`tr`)(71,`th`,0),Te(72,`Guide`),K(),Y(73,`th`,0),Te(74,`Showcases`),K()()(),Y(75,`tbody`)(76,`tr`)(77,`td`)(78,`a`,1),Te(79,`Setting up a base chart`),K()(),Y(80,`td`)(81,`p`),Te(82,` Creating charts using Kirby's configurations. To see more ways to implement charts, see the `),Y(83,`a`,1),Te(84,`showcases`),K()()()()()()()),o&2&&(H$1(17),te(`routerLink`,`/examples/virtual-scroll-list`),H$1(10),te(`routerLink`,`virtual-scroll-list`),H$1(14),te(`routerLink`,`/examples/grid-layout-single-container`),H$1(5),te(`routerLink`,`grid-layout-single-container`),H$1(4),te(`routerLink`,`/examples/grid-layout-multiple-containers`),H$1(5),te(`routerLink`,`grid-layout-multiple-containers`),H$1(4),te(`routerLink`,`/examples/grid-layout-extended`),H$1(5),te(`routerLink`,`grid-layout-extended`),H$1(14),te(`routerLink`,`chart-config`),H$1(5),te(`routerLink`,sY(10,_)))},dependencies:[m0],styles:[`table[_ngcontent-%COMP%]{border-spacing:0;border-collapse:collapse;width:100%;margin-bottom:var(--%NS%kirby-spacing-s)}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:var(--%NS%kirby-light-tint)}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:left}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{min-width:14rem}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid var(--%NS%kirby-medium);padding:1rem}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:3.5rem}`]})}}return r})();var M=`<kirby-page title="Items">
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
`;var $=(()=>{class r{constructor(){this.exampleHtml=M}static{this.ɵfac=function(o){return new(o||r)}}static{this.ɵcmp=Q({type:r,selectors:[[`cookbook-list-virtual-scroll`]],decls:3,vars:1,consts:[[3,`html`]],template:function(o,d){o&1&&(Y(0,`h1`),Te(1,`Virtual Scroll - List`),K(),Re(2,`cookbook-code-viewer`,0)),o&2&&(H$1(2),te(`html`,d.exampleHtml))},dependencies:[$ht],encapsulation:2})}}return r})();var Se=[{path:``,component:H},{path:`chart-config`,component:k},{path:`virtual-scroll-list`,component:$},{path:`grid-layout-single-container`,component:D},{path:`grid-layout-multiple-containers`,component:E},{path:`grid-layout-extended`,component:C}];export{Se as GUIDES_ROUTES};