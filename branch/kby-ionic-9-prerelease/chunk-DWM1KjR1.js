import"./chunk-CTWbt5oG.js";import"./chunk-jqRHYIPo.js";import"./chunk-BcyqqyV1.js";import"./chunk-Bl_RRZqB.js";import"./chunk-D-eJNmyh.js";import"./chunk-CW9QKZeG.js";import"./chunk-HpZc_IKx.js";import"./chunk-EB0A36lp.js";import"./chunk-CfGiXeoo.js";import{A as Ee,An as Wct,En as W,Fi as rf,Mt as Oe,Sr as da,Wn as Z,Wr as j,dt as K,fn as U,ot as JY,wn as Vp}from"./chunk-BopaLTeh.js";import{aa as i,ia as I}from"./main-PX4I2OPX.js";var y=(()=>{let a=class a{constructor(){this.guideChartHtml=`<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --></canvas>
</div>`,this.demoDataExample=`private ${i.demoDataString}`,this.chartProperties=`private _chart: Chart;`,this.createChartFunctionExample=`private _chart: Chart;
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
}`}};a.ɵfac=function(o){return new(o||a)},a.ɵcmp=Z({type:a,selectors:[[`cookbook-chart-config-guide`]],decls:132,vars:19,consts:[[`href`,`https://www.chartjs.org/`],[`routerLink`,`../../showcase/chart-stock-config`],[`href`,`https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-base-config.ts`],[`href`,`https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/src/lib/components/charts/chart-config/chart-stock-config/chart-stock-config.ts`],[`href`,``],[3,`hasPadding`],[`href`,`https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API`],[3,`html`,`language`,`inlineLabel`],[`href`,`https://www.chartjs.org/docs/latest/general/accessibility.html`],[`href`,`https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note`],[3,`inlineLabel`,`ts`,`language`],[`href`,`https://angular.io/api/core/OnInit`],[`href`,`https://angular.io/api/core/AfterViewInit`],[`href`,`https://angular.io/api/core/OnDestroy`]],template:function(o,s){o&1&&(W(0,`h1`),Ee(1,`Chart config`),U(),W(2,`p`),Ee(3,` The Kirby charts are based on a config strategy. The aim of this is to give the implementer full control of the chart. Kirby simply provides some configurations which must be passed to a `),W(4,`a`,0),Ee(5,`ChartJS`),U(),Ee(6,` chart. `),Oe(7,`br`)(8,`br`),Ee(9,` To see more showcases on how to implement charts, please click `),W(10,`a`,1),Ee(11,`here`),U(),Ee(12,` .
`),U(),W(13,`h3`),Ee(14,`Structure`),U(),W(15,`p`),Ee(16,` Each chart type (line, stock, bar, pie) is served through a Kirby chart config class which is inherited from a base class `),W(17,`code`)(18,`a`,2),Ee(19,` ChartBaseConfig `),U()(),Ee(20,` : `),Oe(21,`br`),W(22,`code`)(23,`a`,3),Ee(24,` StockChartConfig `),U()(),Oe(25,`br`),W(26,`code`)(27,`a`,4),Ee(28,`BarChartConfig`),U(),Ee(29,` // Not yet implemented `),U()(),W(30,`p`),Ee(31,`In this guide we'll implement the following chart:`),U(),W(32,`kirby-card`,5),Oe(33,`cookbook-chart-example-config-base-stock`),U(),Oe(34,`br`),W(35,`h3`),Ee(36,`Getting started`),U(),W(37,`p`),Ee(38,`To implement a Kirby chart, you'll need three things:`),U(),W(39,`ul`)(40,`li`)(41,`a`,0),Ee(42,`ChartJS`),U()(),W(43,`li`),Ee(44,` A HTML `),W(45,`a`,6),Ee(46,`canvas`),U(),Ee(47,` element `),U(),W(48,`li`),Ee(49,`Kirby chart config`),U()(),W(50,`p`),Ee(51,` In your component template, add a canvas to your HTML and give it an `),W(52,`code`),Ee(53,`id`),U(),Ee(54,` :
`),U(),Oe(55,`cookbook-code-viewer`,7),W(56,`p`),Ee(57,` It is up to the implementer to ensure the proper accessibility for the chart. Read more about ChartJS accessibility `),W(58,`a`,8),Ee(59,`here`),U(),Ee(60,` .
`),U(),W(61,`p`),Ee(62,` The canvas must be wrapped in an element with `),W(63,`code`),Ee(64,`position: relative`),U(),Ee(65,` in order to be responsive. A thorough explanation can be found `),W(66,`a`,9),Ee(67,` here `),U(),Ee(68,` .
`),U(),W(69,`p`),Ee(70,` Add a property of type `),W(71,`code`),Ee(72,`Chart`),U(),Ee(73,` (from ChartJS). This will be used later to destroy the object.
`),U(),Oe(74,`cookbook-code-viewer`,10),W(75,`h3`),Ee(76,`Test data`),U(),W(77,`p`),Ee(78,` Add some test data of type `),W(79,`code`),Ee(80,`ScatterPoint[]`),U(),Ee(81,` .
`),U(),Oe(82,`cookbook-code-viewer`,10),W(83,`h3`),Ee(84,`Configure the chart`),U(),Ee(85,`
In a function, perform the following steps
`),W(86,`ul`)(87,`li`),Ee(88,` Get the base config from the `),W(89,`code`),Ee(90,`StockChartConfig`),U()(),W(91,`li`),Ee(92,`Set the data`),U(),W(93,`li`),Ee(94,` Create the `),W(95,`code`),Ee(96,`Chart`),U(),Ee(97,` object with the same id as on your canvas element and pass the config `),U()(),Oe(98,`cookbook-code-viewer`,10),W(99,`h3`),Ee(100,`Instantiate the chart`),U(),W(101,`p`),Ee(102,` The StockChart utilizes some standard plugins from ChartJS. These are registered using `),W(103,`code`),Ee(104,`registerPlugins`),U()(),W(105,`p`),Ee(106,` The `),W(107,`code`),Ee(108,`createChart`),U(),Ee(109,` and `),W(110,`code`),Ee(111,`registerPlugins`),U(),Ee(112,` functions must be called in the `),W(113,`code`)(114,`a`,11),Ee(115,`ngOnInit`),U()(),Ee(116,` or `),W(117,`code`)(118,`a`,12),Ee(119,`ngAfterViewIinit`),U()(),Ee(120,` hook.
`),U(),Oe(121,`cookbook-code-viewer`,10)(122,`br`),W(123,`h3`),Ee(124,`Destruct the chart`),U(),W(125,`p`),Ee(126,` Make sure to destruct the chart object when the component is destroyed in the `),W(127,`code`)(128,`a`,13),Ee(129,`ngOnDestroy`),U()(),Ee(130,` hook:
`),U(),Oe(131,`cookbook-code-viewer`,10)),o&2&&(j(32),K(`hasPadding`,!0),j(23),K(`html`,s.guideChartHtml)(`language`,`html`)(`inlineLabel`,!0),j(19),K(`inlineLabel`,!0)(`ts`,s.chartProperties)(`language`,`ts`),j(8),K(`inlineLabel`,!0)(`ts`,s.demoDataExample)(`language`,`ts`),j(16),K(`inlineLabel`,!0)(`ts`,s.createChartFunctionExample)(`language`,`ts`),j(23),K(`inlineLabel`,!0)(`ts`,s.inintExample)(`language`,`ts`),j(10),K(`inlineLabel`,!0)(`ts`,s.destroyExample)(`language`,`ts`))},dependencies:[Vp,rf,da,I,Wct],encapsulation:2});return a})();var x=`<main>
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
`;var C=(()=>{let a=class a{constructor(){this.exampleHtml=x,this.exampleCss=S}};a.ɵfac=function(o){return new(o||a)},a.ɵcmp=Z({type:a,selectors:[[`cookbook-grid-layout-extended`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,s){o&1&&(W(0,`h1`),Ee(1,`Grid Layout - extended`),U(),Oe(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&(j(2),K(`html`,s.exampleHtml),j(),K(`scss`,s.exampleCss))},dependencies:[Wct],encapsulation:2});return a})();var w=`<main>
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
`;var P=(()=>{let a=class a{constructor(){this.exampleHtml=w,this.exampleCss=E}};a.ɵfac=function(o){return new(o||a)},a.ɵcmp=Z({type:a,selectors:[[`cookbook-grid-layout-multiple-containers`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,s){o&1&&(W(0,`h1`),Ee(1,`Grid Layout - multiple grid containers`),U(),Oe(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&(j(2),K(`html`,s.exampleHtml),j(),K(`scss`,s.exampleCss))},dependencies:[Wct],encapsulation:2});return a})();var D=`<main>
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
`;var L=(()=>{let a=class a{constructor(){this.exampleHtml=D,this.exampleCss=H}};a.ɵfac=function(o){return new(o||a)},a.ɵcmp=Z({type:a,selectors:[[`cookbook-grid-layout-single-container`]],decls:4,vars:2,consts:[[3,`html`],[3,`scss`]],template:function(o,s){o&1&&(W(0,`h1`),Ee(1,`Grid Layout - single grid container`),U(),Oe(2,`cookbook-code-viewer`,0)(3,`cookbook-code-viewer`,1)),o&2&&(j(2),K(`html`,s.exampleHtml),j(),K(`scss`,s.exampleCss))},dependencies:[Wct],encapsulation:2});return a})();var V=()=>[`../../showcase/chart-stock-config`];var M=(()=>{let a=class a{};a.ɵfac=function(o){return new(o||a)},a.ɵcmp=Z({type:a,selectors:[[`cookbook-guides`]],decls:85,vars:11,consts:[[`scope`,`col`],[3,`routerLink`],[`href`,`https://ionicframework.com/docs/angular/virtual-scroll`],[`href`,`https://material.angular.io/cdk/scrolling/overview`]],template:function(o,s){o&1&&(W(0,`article`)(1,`h1`),Ee(2,`Kirby Guides`),U(),W(3,`p`),Ee(4,` This section of the cookbook aims to bring together a few simple guides for common tasks. The guides are not complete solutions but working examples and code you can use as a starting point in your projects. `),U(),W(5,`h2`),Ee(6,`Virtual Scrolling`),U(),W(7,`table`)(8,`thead`)(9,`tr`)(10,`th`,0),Ee(11,`Example`),U(),W(12,`th`,0),Ee(13,`Description`),U()()(),W(14,`tbody`)(15,`tr`)(16,`td`)(17,`a`,1),Ee(18,`List with virtual scrolling`),U()(),W(19,`td`)(20,`p`),Ee(21,` Basic list with virtual scrolling based on the Angular CDK Virtual Scroller. At the moment, CDK Virtual Scroller only supports fixed sized elements. For further information see `),W(22,`a`,2),Ee(23,`Ionic Docs`),U(),Ee(24,` and `),W(25,`a`,3),Ee(26,` CDK Virtual Scrolling docs. `),U()(),W(27,`a`,1),Ee(28,`Show me the code`),U()()()()(),W(29,`h2`),Ee(30,`Grid Layout`),U(),W(31,`table`)(32,`thead`)(33,`tr`)(34,`th`,0),Ee(35,`Layout Recipe`),U(),W(36,`th`,0),Ee(37,`Description`),U()()(),W(38,`tbody`)(39,`tr`)(40,`td`)(41,`a`,1),Ee(42,`Single grid container`),U()(),W(43,`td`)(44,`p`),Ee(45,` Basic example. Everything is within a single grid container. Contains some decorational styles, but no additional layout styles. `),U(),W(46,`a`,1),Ee(47,`Show me the code`),U()()(),W(48,`tr`)(49,`td`)(50,`a`,1),Ee(51,`Multiple grid containers`),U()(),W(52,`td`)(53,`p`),Ee(54,` The same layout as the single grid container example. Created with multiple grid containers. Contains some decorational styles, but no additional layout styles. `),U(),W(55,`a`,1),Ee(56,`Show me the code`),U()()(),W(57,`tr`)(58,`td`)(59,`a`,1),Ee(60,`Extended example`),U()(),W(61,`td`)(62,`p`),Ee(63,` The same layout as the basic examples, but with additional layout styles applied, e.g., there are constructs for a max-width container and for gutter. `),U(),W(64,`a`,1),Ee(65,`Show me the code`),U()()()()(),W(66,`h2`),Ee(67,`Chart config`),U(),W(68,`table`)(69,`thead`)(70,`tr`)(71,`th`,0),Ee(72,`Guide`),U(),W(73,`th`,0),Ee(74,`Showcases`),U()()(),W(75,`tbody`)(76,`tr`)(77,`td`)(78,`a`,1),Ee(79,`Setting up a base chart`),U()(),W(80,`td`)(81,`p`),Ee(82,` Creating charts using Kirby's configurations. To see more ways to implement charts, see the `),W(83,`a`,1),Ee(84,`showcases`),U()()()()()()()),o&2&&(j(17),K(`routerLink`,`/examples/virtual-scroll-list`),j(10),K(`routerLink`,`virtual-scroll-list`),j(14),K(`routerLink`,`/examples/grid-layout-single-container`),j(5),K(`routerLink`,`grid-layout-single-container`),j(4),K(`routerLink`,`/examples/grid-layout-multiple-containers`),j(5),K(`routerLink`,`grid-layout-multiple-containers`),j(4),K(`routerLink`,`/examples/grid-layout-extended`),j(5),K(`routerLink`,`grid-layout-extended`),j(14),K(`routerLink`,`chart-config`),j(5),K(`routerLink`,JY(10,V)))},dependencies:[Vp],styles:[`table[_ngcontent-%COMP%]{border-spacing:0;border-collapse:collapse;width:100%;margin-bottom:var(--%NS%kirby-spacing-s)}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:var(--%NS%kirby-light-tint)}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:left}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{min-width:14rem}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid var(--%NS%kirby-medium);padding:1rem}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:3.5rem}`]});return a})();var $=`<kirby-page title="Items">
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
`;var F=(()=>{let a=class a{constructor(){this.exampleHtml=$}};a.ɵfac=function(o){return new(o||a)},a.ɵcmp=Z({type:a,selectors:[[`cookbook-list-virtual-scroll`]],decls:3,vars:1,consts:[[3,`html`]],template:function(o,s){o&1&&(W(0,`h1`),Ee(1,`Virtual Scroll - List`),U(),Oe(2,`cookbook-code-viewer`,0)),o&2&&(j(2),K(`html`,s.exampleHtml))},dependencies:[Wct],encapsulation:2});return a})();var we=[{path:``,component:M},{path:`chart-config`,component:y},{path:`virtual-scroll-list`,component:F},{path:`grid-layout-single-container`,component:L},{path:`grid-layout-multiple-containers`,component:P},{path:`grid-layout-extended`,component:C}];export{we as GUIDES_ROUTES};