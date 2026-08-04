import{$b as fo,$c as Wt,$d as _i,Aa as We,Ac as _o,Ad as Le,Ae as $o,Ba as P,Bc as ci,Bd as ui,C as S,Cc as wo,Cd as Xe,D as M,Da as b,Dc as Nt,Dd as gi,De as jo,Ea as y,Ec as f,Ed as V,Ee as Uo,Fa as ro,Fc as He,Fd as et,Fe as ze,Ga as ao,Gc as ce,Gd as F,Ha as It,Hc as mi,Ia as Ft,Ic as T,J as pe,Ja as Lt,Jc as Fe,Jd as yi,Ka as X,Kc as Kt,Kd as ki,L as Xt,Lc as di,Ma as R,Mc as pi,N as Xi,Na as lo,Nc as oe,Nd as Ao,O as L,Oa as l,Ob as zt,Od as Ae,Pa as k,Pb as Bt,Pc as So,Pd as Gt,Qa as _,Qb as be,Qc as qt,Qd as ue,Ra as so,Rb as Ce,Rd as tt,S as U,Sb as ii,Sc as A,Sd as fi,Ta as Oe,Tb as Qt,Td as zo,Ua as W,Ub as oi,Ud as Bo,V as eo,Va as Ie,Vb as ni,Vd as J,Wa as De,Wb as ve,Wd as No,X as c,Xa as Bi,Xb as xe,Xc as Ze,Xd as hi,Yb as _e,Yc as Ht,Yd as Ci,Za as D,Zc as Mo,Zd as vi,_a as co,_d as xi,ab as Z,ac as ri,ad as N,ae as Ko,b as Zt,ba as v,bb as re,bc as qe,bd as To,be as qo,cb as mo,cc as ye,cd as Vt,ce as $t,da as d,db as po,dc as we,dd as Eo,de as ee,e as Ui,eb as ft,ed as H,ee as wi,fc as ai,fe as $,ga as E,gd as Se,ge as Ho,h as Yi,ha as x,hd as Me,he as Wo,ib as bo,ic as li,ie as jt,j as zi,jd as G,k as Qi,ka as Ne,kd as ht,la as O,ld as Po,ma as I,md as Do,me as Ee,na as ei,nb as uo,nd as Oo,ne as le,oa as to,ob as At,od as B,oe as Pe,pa as K,pc as Ke,pd as ke,pe as it,qa as q,qb as go,qc as ho,qd as ae,qe as ot,ra as m,rb as Qe,rc as si,rd as Io,re as Vo,s as Ji,sa as o,sb as ti,sc as Ni,sd as Te,se as Si,t as Zi,ta as n,tb as yo,tc as Y,td as h,te as Ro,ua as p,ub as Je,uc as Co,ud as z,ue as Go,va as se,vb as ko,vd as Fo,ve as nt,wa as ne,wc as vo,wd as Q,xa as io,xd as Rt,ya as oo,yc as xo,yd as Lo,ye as me,za as no,zc as w,zd as bi,ze as Mi}from"./chunk-LHID2QVG.js";var _r={selector:"cookbook-item-example-sizes",template:`<kirby-item>
  <p class="kirby-item-title">Medium (default)</p>
</kirby-item>
<kirby-item size="sm">
  <p class="kirby-item-title">Small</p>
</kirby-item>
  <kirby-item size="xs">
  <p class="kirby-item-title">Extra small</p>
</kirby-item>`},$d=(()=>{let e=class e{constructor(){this.template=_r.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-sizes"]],decls:9,vars:0,consts:[[1,"kirby-item-title"],["size","sm"],["size","xs"]],template:function(t,a){t&1&&(o(0,"kirby-item")(1,"p",0),l(2,"Medium (default)"),n()(),o(3,"kirby-item",1)(4,"p",0),l(5,"Small"),n()(),o(6,"kirby-item",2)(7,"p",0),l(8,"Extra small"),n()())},dependencies:[h],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();function Yo(i,e,s){return ht(i,-e,s)}var wr={selector:"cookbook-item-example-nested-controls",template:`<kirby-item>
  <kirby-checkbox slot="end">Item with Checkbox</kirby-checkbox>
</kirby-item>

<kirby-radio-group>
  <kirby-item>
    <kirby-radio slot="end">Item with Radio</kirby-radio>
  </kirby-item>
</kirby-radio-group>

<kirby-item>
  <kirby-toggle slot="end">Item with Toggle</kirby-toggle>
</kirby-item>

<kirby-item>
  Item with Button
  <button kirby-button attentionLevel="2" slot="end">Button</button>
</kirby-item>`},ep=(()=>{let e=class e{constructor(){this.template=wr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-nested-controls"]],decls:14,vars:0,consts:[["slot","end"],["kirby-button","","attentionLevel","2","slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-item")(1,"kirby-checkbox",0),l(2,"Item with Checkbox"),n()(),o(3,"kirby-radio-group")(4,"kirby-item")(5,"kirby-radio",0),l(6,"Item with Radio"),n()()(),o(7,"kirby-item")(8,"kirby-toggle",0),l(9,"Item with Toggle"),n()(),o(10,"kirby-item"),l(11," Item with Button "),o(12,"button",1),l(13,"Button"),n()())},dependencies:[h,B,Te,ke,f,ae],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Sr={selector:"cookbook-item-example-text",template:`<kirby-item>
  <p class="kirby-item-title">Title that will be truncated because it is one long paragraph that cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
</kirby-item>
  
<kirby-item>
  <kirby-label>
    <p class="kirby-item-wrap kirby-item-title">Title that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </kirby-label>
</kirby-item>`},op=(()=>{let e=class e{constructor(){this.template=Sr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-text"]],decls:7,vars:0,consts:[[1,"kirby-item-title"],[1,"kirby-item-wrap","kirby-item-title"]],template:function(t,a){t&1&&(o(0,"kirby-item")(1,"p",0),l(2,"Title that will be truncated because it is one long paragraph that cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "),n()(),o(3,"kirby-item")(4,"kirby-label")(5,"p",1),l(6,"Title that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit."),n()()())},dependencies:[h,z],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Qo={selector:"cookbook-item-example-slots",template:`<kirby-item>
  <kirby-badge slot="outside" themeColor="warning" size="sm"></kirby-badge>
  <kirby-avatar slot="start" themeColor="light">
    <kirby-icon name="person"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">60</kirby-flag>
</kirby-item>`,styles:[`div[slot="outside"] {
  display: flex;
  flex-direction: column;
}`]},cp=(()=>{let e=class e{constructor(){this.template=Qo.template,this.styles=Qo.styles[0]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-slots"]],decls:11,vars:0,consts:[["slot","outside","themeColor","warning","size","sm"],["slot","start","themeColor","light"],["name","person"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end","themeColor","success"]],template:function(t,a){t&1&&(o(0,"kirby-item"),p(1,"kirby-badge",0),o(2,"kirby-avatar",1),p(3,"kirby-icon",2),n(),o(4,"kirby-label")(5,"p",3),l(6,"Title"),n(),o(7,"p",4),l(8,"Detail"),n()(),o(9,"kirby-flag",5),l(10,"60"),n()())},dependencies:[h,le,Le,G,w,z],styles:["div[slot=outside][_ngcontent-%COMP%]{display:flex;flex-direction:column}"]});let i=e;return i})();var Mr={selector:"cookbook-item-example-selectable",template:`<kirby-item [selectable]="true">
  <p class="kirby-item-title">Selectable</p>
</kirby-item>

<kirby-item [selectable]="true" disclosure="arrow-more">
  <p class="kirby-item-title">Selectable with disclosure</p>
</kirby-item>

<kirby-item href="https://github.com/kirbydesign/designsystem" disclosure="link" target="_blank">
  <p class="kirby-item-title">Link with disclosure</p>
</kirby-item>`},pp=(()=>{let e=class e{constructor(){this.template=Mr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-selectable"]],decls:9,vars:2,consts:[[3,"selectable"],[1,"kirby-item-title"],["disclosure","arrow-more",3,"selectable"],["href","https://github.com/kirbydesign/designsystem","disclosure","link","target","_blank"]],template:function(t,a){t&1&&(o(0,"kirby-item",0)(1,"p",1),l(2,"Selectable"),n()(),o(3,"kirby-item",2)(4,"p",1),l(5,"Selectable with disclosure"),n()(),o(6,"kirby-item",3)(7,"p",1),l(8,"Link with disclosure"),n()()),t&2&&(m("selectable",!0),c(3),m("selectable",!0))},dependencies:[h],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Tr={selector:"cookbook-item-example-text-vertically-stacked",template:`<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-subtitle">Subtitle</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
</kirby-item>

<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-wrap kirby-item-subtitle">Subtitle that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nulla dapibus, faucibus nibh non, ultricies ligula.</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
</kirby-item>`},gp=(()=>{let e=class e{constructor(){this.template=Tr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-text-vertically-stacked"]],decls:16,vars:0,consts:[[1,"kirby-item-title"],[1,"kirby-item-subtitle"],[1,"kirby-item-detail"],[1,"kirby-item-wrap","kirby-item-subtitle"]],template:function(t,a){t&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",0),l(3,"Title"),n(),o(4,"p",1),l(5,"Subtitle"),n(),o(6,"p",2),l(7,"Detail"),n()()(),o(8,"kirby-item")(9,"kirby-label")(10,"p",0),l(11,"Title"),n(),o(12,"p",3),l(13,"Subtitle that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nulla dapibus, faucibus nibh non, ultricies ligula."),n(),o(14,"p",2),l(15,"Detail"),n()()())},dependencies:[h,z],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Er={selector:"cookbook-item-example-disabled",template:`<kirby-item [selectable]="true" [disabled]="true">
  <p class="kirby-item-title">Disabled Selectable</p>
</kirby-item>

<kirby-item [selectable]="true" [disclosure]="'arrow-more'" [disabled]="true">
  <p class="kirby-item-title">Disabled Selectable with Disclosure</p>
</kirby-item>`},fp=(()=>{let e=class e{constructor(){this.template=Er.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-disabled"]],decls:6,vars:5,consts:[[3,"selectable","disabled"],[1,"kirby-item-title"],[3,"selectable","disclosure","disabled"]],template:function(t,a){t&1&&(o(0,"kirby-item",0)(1,"p",1),l(2,"Disabled Selectable"),n()(),o(3,"kirby-item",2)(4,"p",1),l(5,"Disabled Selectable with Disclosure"),n()()),t&2&&(m("selectable",!0)("disabled",!0),c(3),m("selectable",!0)("disclosure","arrow-more")("disabled",!0))},dependencies:[h],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Pr={selector:"cookbook-item-example-disabled-controls",template:`<kirby-item>
  <kirby-checkbox [disabled]="true" slot="end">Item with Checkbox</kirby-checkbox>
</kirby-item>

<kirby-item>
  <kirby-radio [disabled]="true" slot="end">Item with Radio</kirby-radio>
</kirby-item>

<kirby-item>
  <kirby-toggle [disabled]="true" slot="end">Item with Toggle</kirby-toggle>
</kirby-item>

<kirby-item>
  Item with Button
  <button kirby-button [disabled]="true" attentionLevel="2" slot="end">Button</button>
</kirby-item>`},Sp=(()=>{let e=class e{constructor(){this.template=Pr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-disabled-controls"]],decls:13,vars:4,consts:[["slot","end",3,"disabled"],["kirby-button","","attentionLevel","2","slot","end",3,"disabled"]],template:function(t,a){t&1&&(o(0,"kirby-item")(1,"kirby-checkbox",0),l(2,"Item with Checkbox"),n()(),o(3,"kirby-item")(4,"kirby-radio",0),l(5,"Item with Radio"),n()(),o(6,"kirby-item")(7,"kirby-toggle",0),l(8,"Item with Toggle"),n()(),o(9,"kirby-item"),l(10," Item with Button "),o(11,"button",1),l(12,"Button"),n()()),t&2&&(c(),m("disabled",!0),c(3),m("disabled",!0),c(3),m("disabled",!0),c(4),m("disabled",!0))},dependencies:[h,B,ke,Te,f],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Dr={selector:"cookbook-item-example-complex-labels",template:`<kirby-item>
  <kirby-badge slot="outside" themeColor="danger" size="sm"></kirby-badge>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png"></kirby-avatar>
   <kirby-label>
     <kirby-label direction="horizontal">
      <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
      <p class="kirby-item-disclosure">
        <time>20.12.2017</time><kirby-icon name="arrow-more"></kirby-icon>
      </p>
    </kirby-label>
      <p class="kirby-item-subtitle">Subtitle will wrap if necessary in two lines and truncate with ellipsis if it overflows.</p>
      <p class="kirby-item-detail kirby-item-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
   </kirby-label>
</kirby-item>`},Dp=(()=>{let e=class e{constructor(){this.template=Dr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-complex-labels"]],decls:15,vars:0,consts:[["slot","outside","themeColor","danger","size","sm"],["slot","start","overlay","true","imageSrc","/assets/images/woman.png"],["direction","horizontal"],[1,"kirby-item-title"],[1,"kirby-item-disclosure"],["name","arrow-more"],[1,"kirby-item-subtitle"],[1,"kirby-item-detail","kirby-item-wrap"]],template:function(t,a){t&1&&(o(0,"kirby-item"),p(1,"kirby-badge",0)(2,"kirby-avatar",1),o(3,"kirby-label")(4,"kirby-label",2)(5,"p",3),l(6,"Fusce id neque suscipit, finibus urna convallis, auctor arcu."),n(),o(7,"p",4)(8,"time"),l(9,"20.12.2017"),n(),p(10,"kirby-icon",5),n()(),o(11,"p",6),l(12,"Subtitle will wrap if necessary in two lines and truncate with ellipsis if it overflows."),n(),o(13,"p",7),l(14,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Ut non neque vitae felis ultricies imperdiet in ut orci."),n()()())},dependencies:[h,w,le,G,z],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%] + kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Or={selector:"cookbook-accordion-default-example",template:`<kirby-accordion>
      <kirby-accordion-item title="Title for accordion item 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 3" isDisabled={true} disabledTitle="Title for disabled accordion item 3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
    </kirby-accordion>`},Fp=(()=>{let e=class e{constructor(){this.template=Or.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-default-example"]],decls:9,vars:0,consts:[["title","Title for accordion item 1"],["title","Title for accordion item 2"],["title","Title for accordion item 3","isDisabled","{true}","disabledTitle","Title for disabled accordion item 3"],["title","Title for accordion item 4"]],template:function(t,a){t&1&&(o(0,"kirby-accordion")(1,"kirby-accordion-item",0),l(2," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(3,"kirby-accordion-item",1),l(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(5,"kirby-accordion-item",2),l(6," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(7,"kirby-accordion-item",3),l(8," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n()())},dependencies:[Se,Me],encapsulation:2});let i=e;return i})();var Ir={selector:"cookbook-accordion-expanded-example",template:`<kirby-accordion>
      <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
    </kirby-accordion>`},zp=(()=>{let e=class e{constructor(){this.template=Ir.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-expanded-example"]],decls:5,vars:1,consts:[["title","Title for accordion item 1",3,"isExpanded"],["title","Title for accordion item 2"]],template:function(t,a){t&1&&(o(0,"kirby-accordion")(1,"kirby-accordion-item",0),l(2," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(3,"kirby-accordion-item",1),l(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n()()),t&2&&(c(),m("isExpanded",!0))},dependencies:[Se,Me],encapsulation:2});let i=e;return i})();var Fr={selector:"cookbook-accordion-card-example",template:`<kirby-card>
      <kirby-accordion>
        <kirby-accordion-item title="Title for accordion item 1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
        <kirby-accordion-item title="Title for accordion item 2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
        <kirby-accordion-item title="Title for accordion item 3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
        <kirby-accordion-item title="Title for accordion item 4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
      </kirby-accordion>
    </kirby-card>`},qp=(()=>{let e=class e{constructor(){this.template=Fr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-card-example"]],decls:10,vars:0,consts:[["title","Title for accordion item 1"],["title","Title for accordion item 2"],["title","Title for accordion item 3"],["title","Title for accordion item 4"]],template:function(t,a){t&1&&(o(0,"kirby-card")(1,"kirby-accordion")(2,"kirby-accordion-item",0),l(3," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(4,"kirby-accordion-item",1),l(5," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(6,"kirby-accordion-item",2),l(7," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(8,"kirby-accordion-item",3),l(9," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n()()())},dependencies:[T,Se,Me],encapsulation:2});let i=e;return i})();var te=class{constructor(){this.itemsFullList=[{id:0,title:"Vestas Wind Systems has a very long name",subTitle:"2000 pcs",amount:"5.587.218.309 DKK",detail:225,color:"default"},{id:1,title:"Cypress Semiconductor Corporation",subTitle:"1827 pcs",amount:"76.980 DKK",detail:-3,color:"light"},{id:2,title:"Ultragenyx Pharmaceutical Inc.",subTitle:"787 pcs",amount:"83.004 DKK",detail:-115,color:"white"},{id:3,title:"Trans World Entertainment Corp.",subTitle:"467 pcs",amount:"60.963 DKK",detail:6,color:"light"},{id:4,title:"Astronics Corporation",subTitle:"791 pcs",amount:"33.830 DKK",detail:-154,color:"white",isStandAlone:!0},{id:5,title:"Riverview Bancorp Inc",subTitle:"206 pcs",amount:"60.775 DKK",detail:98,color:"light",isStandAlone:!0},{id:6,title:"Haemonetics Corporation",subTitle:"988 pcs",amount:"61.196 DKK",detail:220,color:"white"},{id:7,title:"PJT Partners Inc.",subTitle:"1706 pcs",amount:"52.441 DKK",detail:129,color:"light"},{id:8,title:"Total S.A.",subTitle:"827 pcs",amount:"62.276 DKK",detail:53,color:"white"},{id:9,title:"Northrop Grumman Corporation",subTitle:"443 pcs",amount:"95.190 DKK",detail:-135,color:"white"},{id:10,title:"Rudolph Technologies, Inc.",subTitle:"1799 pcs",amount:"18.442 DKK",detail:86},{id:11,title:"Atlas Financial Holdings, Inc.",subTitle:"129 pcs",amount:"75.842 DKK",detail:-43},{id:12,title:"Five Star Senior Living Inc.",subTitle:"36 pcs",amount:"99.125 DKK",detail:-144},{id:13,title:"Microbot Medical Inc. ",subTitle:"1426 pcs",amount:"35.459 DKK",detail:-78},{id:14,title:"Nova Lifestyle, Inc",subTitle:"1840 pcs",amount:"26.466 DKK",detail:-84},{id:15,title:"Corning Incorporated",subTitle:"854 pcs",amount:"37.490 DKK",detail:-94},{id:16,title:"Chembio Diagnostics, Inc.",subTitle:"1964 pcs",amount:"41.765 DKK",detail:122},{id:17,title:"RLJ Lodging Trust",subTitle:"393 pcs",amount:"68.623 DKK",detail:14},{id:18,title:"Prudential Financial, Inc.",subTitle:"171 pcs",amount:"45.999 DKK",detail:-77},{id:19,title:"PDC Energy, Inc.",subTitle:"1837 pcs",amount:"52.101 DKK",detail:-152},{id:20,title:"Norbord Inc.",subTitle:"1271 pcs",amount:"36.160 DKK",detail:183},{id:21,title:"Origo Acquisition Corporation",subTitle:"929 pcs",amount:"49.608 DKK",detail:174},{id:22,title:"American Railcar Industries, Inc.",subTitle:"861 pcs",amount:"10.419 DKK",detail:-179},{id:23,title:"QAD Inc.",subTitle:"1195 pcs",amount:"53.019 DKK",detail:-156},{id:24,title:"ENDRA Life Sciences Inc.",subTitle:"1522 pcs",amount:"36.737 DKK",detail:-147},{id:25,title:"Pacific Mercantile Bancorp",subTitle:"958 pcs",amount:"95.228 DKK",detail:249},{id:26,title:"Aerojet Rocketdyne Holdings, Inc. ",subTitle:"27 pcs",amount:"92.171 DKK",detail:82},{id:27,title:"Simon Property Group, Inc.",subTitle:"281 pcs",amount:"5.875 DKK",detail:-121},{id:28,title:"Dr. Reddy's Laboratories Ltd",subTitle:"1882 pcs",amount:"5.498 DKK",detail:66},{id:29,title:"Everest Re Group, Ltd.",subTitle:"941 pcs",amount:"24.855 DKK",detail:-1},{id:30,title:"Gores Holdings II, Inc.",subTitle:"1689 pcs",amount:"86.716 DKK",detail:-150},{id:31,title:"Bank Mutual Corporation",subTitle:"1568 pcs",amount:"25.747 DKK",detail:-197},{id:32,title:"Two Harbors Investments Corp",subTitle:"936 pcs",amount:"64.032 DKK",detail:-103},{id:33,title:"Chesapeake Energy Corporation",subTitle:"287 pcs",amount:"51.267 DKK",detail:5},{id:34,title:"Royce Global Value Trust, Inc.",subTitle:"656 pcs",amount:"45.622 DKK",detail:-178},{id:35,title:"R.R. Donnelley & Sons Company",subTitle:"587 pcs",amount:"65.442 DKK",detail:-117},{id:36,title:"First Bank",subTitle:"492 pcs",amount:"19.560 DKK",detail:48},{id:37,title:"Digital Realty Trust, Inc.",subTitle:"185 pcs",amount:"60.367 DKK",detail:169},{id:38,title:"Kenon Holdings Ltd.",subTitle:"907 pcs",amount:"80.383 DKK",detail:-75},{id:39,title:"Pebblebrook Hotel Trust",subTitle:"672 pcs",amount:"93.421 DKK",detail:32},{id:40,title:"Cable One, Inc.",subTitle:"329 pcs",amount:"67.225 DKK",detail:249},{id:41,title:"Acacia Research Corporation",subTitle:"1060 pcs",amount:"4.490 DKK",detail:196},{id:42,title:"Ashford Hospitality Trust Inc",subTitle:"1926 pcs",amount:"31.059 DKK",detail:213},{id:43,title:"MakeMyTrip Limited",subTitle:"1177 pcs",amount:"59.227 DKK",detail:110},{id:44,title:"Icahn Enterprises L.P.",subTitle:"663 pcs",amount:"10.415 DKK",detail:99},{id:45,title:"China Unicom (Hong Kong) Ltd",subTitle:"517 pcs",amount:"30.143 DKK",detail:90},{id:46,title:"Intrexon Corporation",subTitle:"1739 pcs",amount:"4.334 DKK",detail:-70},{id:47,title:"Sequans Communications S.A.",subTitle:"109 pcs",amount:"46.363 DKK",detail:160},{id:48,title:"EMC Insurance Group Inc.",subTitle:"219 pcs",amount:"73.717 DKK",detail:-40},{id:49,title:"Corbus Pharmaceuticals Holdings, Inc.",subTitle:"1610 pcs",amount:"86.740 DKK",detail:74},{id:50,title:"China Ceramics Co., Ltd.",subTitle:"1656 pcs",amount:"68.075 DKK",detail:237},{id:51,title:"Chemung Financial Corp",subTitle:"1044 pcs",amount:"20.552 DKK",detail:31},{id:52,title:"Connecture, Inc.",subTitle:"62 pcs",amount:"40.611 DKK",detail:10},{id:53,title:"PROS Holdings, Inc.",subTitle:"377 pcs",amount:"92.387 DKK",detail:104},{id:54,title:"First Financial Bancorp.",subTitle:"681 pcs",amount:"81.602 DKK",detail:-22},{id:55,title:"iShares MSCI EM ESG Optimized ETF",subTitle:"1196 pcs",amount:"80.588 DKK",detail:-62},{id:56,title:"Western Asset Managed Municipals Fund, Inc.",subTitle:"1939 pcs",amount:"77.171 DKK",detail:-182},{id:57,title:"CTI Industries Corporation",subTitle:"1657 pcs",amount:"46.813 DKK",detail:-90},{id:58,title:"Paycom Software, Inc.",subTitle:"1609 pcs",amount:"58.124 DKK",detail:-141},{id:59,title:"Tower International, Inc.",subTitle:"1157 pcs",amount:"6.468 DKK",detail:224},{id:60,title:"Sarepta Therapeutics, Inc.",subTitle:"963 pcs",amount:"50.810 DKK",detail:103},{id:61,title:"Golar LNG Partners LP",subTitle:"13 pcs",amount:"47.434 DKK",detail:30},{id:62,title:"Applied Genetic Technologies Corporation",subTitle:"1022 pcs",amount:"10.281 DKK",detail:30},{id:63,title:"CHS Inc",subTitle:"1260 pcs",amount:"81.019 DKK",detail:212},{id:64,title:"Principal Real Estate Income Fund",subTitle:"408 pcs",amount:"99.185 DKK",detail:69},{id:65,title:"Nuveen Real Estate Fund",subTitle:"1107 pcs",amount:"29.376 DKK",detail:-74},{id:66,title:"Oaktree Capital Group, LLC",subTitle:"840 pcs",amount:"75.339 DKK",detail:248},{id:67,title:"Fresh Del Monte Produce, Inc.",subTitle:"957 pcs",amount:"27.564 DKK",detail:-150},{id:68,title:"MVC Capital, Inc.",subTitle:"281 pcs",amount:"69.197 DKK",detail:47},{id:69,title:"MercadoLibre, Inc.",subTitle:"1113 pcs",amount:"57.923 DKK",detail:203},{id:70,title:"SmartFinancial, Inc.",subTitle:"735 pcs",amount:"89.855 DKK",detail:146},{id:71,title:"ClubCorp Holdings, Inc.",subTitle:"313 pcs",amount:"99.364 DKK",detail:-86},{id:72,title:"Immunomedics, Inc.",subTitle:"71 pcs",amount:"69.832 DKK",detail:188},{id:73,title:"KapStone Paper and Packaging Corporation",subTitle:"473 pcs",amount:"12.219 DKK",detail:-64},{id:74,title:"Stifel Financial Corporation",subTitle:"564 pcs",amount:"58.651 DKK",detail:154},{id:75,title:"Xinyuan Real Estate Co Ltd",subTitle:"810 pcs",amount:"72.391 DKK",detail:198},{id:76,title:"Liberty Global plc",subTitle:"1473 pcs",amount:"1.976 DKK",detail:-135},{id:77,title:"Morgan Stanley",subTitle:"1079 pcs",amount:"58.112 DKK",detail:41},{id:78,title:"Evertec, Inc.",subTitle:"1851 pcs",amount:"59.546 DKK",detail:48},{id:79,title:"CVR Refining, LP",subTitle:"1134 pcs",amount:"99.919 DKK",detail:91},{id:80,title:"Marine Petroleum Trust",subTitle:"228 pcs",amount:"1.030 DKK",detail:240},{id:81,title:"Frontier Communications Corporation",subTitle:"1534 pcs",amount:"66.856 DKK",detail:-70},{id:82,title:"Middlesex Water Company",subTitle:"1584 pcs",amount:"27.582 DKK",detail:109},{id:83,title:"Syneron Medical Ltd.",subTitle:"157 pcs",amount:"76.750 DKK",detail:73},{id:84,title:"Allison Transmission Holdings, Inc.",subTitle:"857 pcs",amount:"98.364 DKK",detail:-20},{id:85,title:"Cirrus Logic, Inc.",subTitle:"95 pcs",amount:"79.359 DKK",detail:-102},{id:86,title:"MFS Multimarket Income Trust",subTitle:"687 pcs",amount:"17.861 DKK",detail:-95},{id:87,title:"Lincoln Electric Holdings, Inc.",subTitle:"441 pcs",amount:"71.454 DKK",detail:241},{id:88,title:"Navient Corporation",subTitle:"1034 pcs",amount:"77.255 DKK",detail:30},{id:89,title:"The Descartes Systems Group Inc.",subTitle:"1213 pcs",amount:"99.418 DKK",detail:12},{id:90,title:"Republic First Bancorp, Inc.",subTitle:"1366 pcs",amount:"24.934 DKK",detail:-46},{id:91,title:"PNM Resources, Inc. (Holding Co.)",subTitle:"79 pcs",amount:"9.423 DKK",detail:32},{id:92,title:"Arthur J. Gallagher & Co.",subTitle:"299 pcs",amount:"87.935 DKK",detail:-105},{id:93,title:"Rambus, Inc.",subTitle:"564 pcs",amount:"76.053 DKK",detail:-129},{id:94,title:"FARO Technologies, Inc.",subTitle:"1912 pcs",amount:"48.066 DKK",detail:-141},{id:95,title:"Dynex Capital, Inc.",subTitle:"557 pcs",amount:"81.093 DKK",detail:-76},{id:96,title:"Nuveen New York Municipal Value Fund, Inc.",subTitle:"106 pcs",amount:"88.488 DKK",detail:-16},{id:97,title:"Kirby Corporation",subTitle:"406 pcs",amount:"2.622 DKK",detail:217},{id:98,title:"Oconee Federal Financial Corp.",subTitle:"1649 pcs",amount:"58.086 DKK",detail:102},{id:99,title:"WSFS Financial Corporation",subTitle:"1959 pcs",amount:"28.587 DKK",detail:52},{id:100,title:"Nuveen Short Duration Credit Opportunities Fund",subTitle:"1835 pcs",amount:"88.272 DKK",detail:75}],this.items=this.itemsFullList.slice(0,8)}onItemSelect(e){alert(`You have clicked the row [${e.title} ${e.amount}]`)}};function Lr(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",4),l(3),n(),o(4,"p",5),l(5),n()(),o(6,"kirby-label",6)(7,"data",7),l(8),n(),o(9,"data",8),l(10),n()()()),i&2){let s=e.$implicit;c(3),k(s.title),c(2),k(s.subTitle),c(2),m("value",s.amount),c(),k(s.amount),c(),m("value",s.detail),c(),k(s.detail)}}function Ar(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",4),l(3),n(),o(4,"p",5),l(5),n()(),o(6,"kirby-label",6)(7,"data",7),l(8),n(),o(9,"data",8),l(10),n()()()),i&2){let s=e.$implicit;c(3),k(s.title),c(2),k(s.subTitle),c(2),m("value",s.amount),c(),k(s.amount),c(),m("value",s.detail),c(),k(s.detail)}}var zr={selector:"cookbook-accordion-with-list-example",template:`<kirby-accordion>
  <kirby-accordion-item title="Transactions" [isExpanded]="true">
    <kirby-list [items]="itemsFullList.slice(0,4)">
      <kirby-item *kirbyListItemTemplate="let item">
        <kirby-label>
          <p class="kirby-item-title">{{item.title}}</p>
          <p class="kirby-item-subtitle">{{item.subTitle}}</p>
        </kirby-label>
        <kirby-label slot="end">
          <data [value]="item.amount">{{item.amount}}</data>
          <data [value]="item.detail" class="kirby-item-detail">{{item.detail}}</data>
        </kirby-label>
      </kirby-item>
    </kirby-list>
  </kirby-accordion-item>
  <kirby-accordion-item title="More Transactions">
    <kirby-list [items]="itemsFullList.slice(4,7)">
      <kirby-item *kirbyListItemTemplate="let item">
        <kirby-label>
          <p class="kirby-item-title">{{item.title}}</p>
          <p class="kirby-item-subtitle">{{item.subTitle}}</p>
        </kirby-label>
        <kirby-label slot="end">
          <data [value]="item.amount">{{item.amount}}</data>
          <data [value]="item.detail" class="kirby-item-detail">{{item.detail}}</data>
        </kirby-label>
      </kirby-item>
    </kirby-list>
  </kirby-accordion-item>
</kirby-accordion>`},Up=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=zr.template}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-with-list-example"]],features:[E],decls:7,vars:3,consts:[["title","Transactions",3,"isExpanded"],[3,"items"],[4,"kirbyListItemTemplate"],["title","More Transactions"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-accordion")(1,"kirby-accordion-item",0)(2,"kirby-list",1),x(3,Lr,11,6,"kirby-item",2),n()(),o(4,"kirby-accordion-item",3)(5,"kirby-list",1),x(6,Ar,11,6,"kirby-item",2),n()()()),t&2&&(c(),m("isExpanded",!0),c(),m("items",a.itemsFullList.slice(0,4)),c(3),m("items",a.itemsFullList.slice(4,7)))},dependencies:[Se,H,h,z,N,Me],encapsulation:2});let i=e;return i})();function Br(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",4),l(3),n(),o(4,"p",5),l(5),n()(),o(6,"kirby-label",6)(7,"data",7),l(8),n(),o(9,"data",8),l(10),n()()()),i&2){let s=e.$implicit;c(3),k(s.title),c(2),k(s.subTitle),c(2),m("value",s.amount),c(),k(s.amount),c(),m("value",s.detail),c(),k(s.detail)}}function Nr(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",4),l(3),n(),o(4,"p",5),l(5),n()(),o(6,"kirby-label",6)(7,"data",7),l(8),n(),o(9,"data",8),l(10),n()()()),i&2){let s=e.$implicit;c(3),k(s.title),c(2),k(s.subTitle),c(2),m("value",s.amount),c(),k(s.amount),c(),m("value",s.detail),c(),k(s.detail)}}var Kr={selector:"cookbook-accordion-with-list-in-card-example",template:`<kirby-card>
  <kirby-accordion>
    <kirby-accordion-item title="Transactions" [isExpanded]="true">
      <kirby-list [items]="itemsFullList.slice(0,4)">
        <kirby-item *kirbyListItemTemplate="let item">
          <kirby-label>
            <p class="kirby-item-title">{{item.title}}</p>
            <p class="kirby-item-subtitle">{{item.subTitle}}</p>
          </kirby-label>
          <kirby-label slot="end">
            <data [value]="item.amount">{{item.amount}}</data>
            <data [value]="item.detail" class="kirby-item-detail">{{item.detail}}</data>
          </kirby-label>
        </kirby-item>
      </kirby-list>
    </kirby-accordion-item>
    <kirby-accordion-item title="More Transactions">
      <kirby-list [items]="itemsFullList.slice(4,7)">
        <kirby-item *kirbyListItemTemplate="let item">
          <kirby-label>
            <p class="kirby-item-title">{{item.title}}</p>
            <p class="kirby-item-subtitle">{{item.subTitle}}</p>
          </kirby-label>
          <kirby-label slot="end">
            <data [value]="item.amount">{{item.amount}}</data>
            <data [value]="item.detail" class="kirby-item-detail">{{item.detail}}</data>
          </kirby-label>
        </kirby-item>
      </kirby-list>
    </kirby-accordion-item>
  </kirby-accordion>
</kirby-card>`},tb=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Kr.template}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-with-list-in-card-example"]],features:[E],decls:8,vars:3,consts:[["title","Transactions",3,"isExpanded"],[3,"items"],[4,"kirbyListItemTemplate"],["title","More Transactions"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-card")(1,"kirby-accordion")(2,"kirby-accordion-item",0)(3,"kirby-list",1),x(4,Br,11,6,"kirby-item",2),n()(),o(5,"kirby-accordion-item",3)(6,"kirby-list",1),x(7,Nr,11,6,"kirby-item",2),n()()()()),t&2&&(c(2),m("isExpanded",!0),c(),m("items",a.itemsFullList.slice(0,4)),c(3),m("items",a.itemsFullList.slice(4,7)))},dependencies:[T,Se,H,h,Me,z,N],encapsulation:2});let i=e;return i})();var Jo={selector:"cookbook-accordion-events-example",template:`<kirby-accordion>
  <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true" (toggle)="onToggleChange($event, 'item 1')">
    Click item to see "toggle" event in action
  </kirby-accordion-item>
  <kirby-accordion-item title="Title for accordion item 2" (toggle)="onToggleChange($event, 'item 2')">
    Click item to see "toggle" event in action
  </kirby-accordion-item>
</kirby-accordion>`,codeSnippet:`onToggleChange(isOpen: boolean, item: string) {
  ...
}`},nb=(()=>{let e=class e{constructor(r){this.toastController=r,this.template=Jo.template,this.codeSnippet=Jo.codeSnippet}onToggleChange(r,t){let a={message:`Accordion ${t} toggled - is open: ${r}`,messageType:r?"success":"warning",durationInMs:1500};this.toastController.showToast(a)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-events-example"]],decls:5,vars:1,consts:[["title","Title for accordion item 1",3,"toggle","isExpanded"],["title","Title for accordion item 2",3,"toggle"]],template:function(t,a){t&1&&(o(0,"kirby-accordion")(1,"kirby-accordion-item",0),b("toggle",function(C){return a.onToggleChange(C,"item 1")}),l(2,' Click item to see "toggle" event in action '),n(),o(3,"kirby-accordion-item",1),b("toggle",function(C){return a.onToggleChange(C,"item 2")}),l(4,' Click item to see "toggle" event in action '),n()()),t&2&&(c(),m("isExpanded",!0))},dependencies:[Se,Me],encapsulation:2});let i=e;return i})();var qr={selector:"cookbook-accordion-heading-level-example",template:`<kirby-accordion [headingLevel]="3" >
      <kirby-accordion-item title="Title for accordion item 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 3" isDisabled={true} disabledTitle="Title for disabled accordion item 3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
    </kirby-accordion>`},lb=(()=>{let e=class e{constructor(){this.template=qr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-heading-level-example"]],decls:9,vars:1,consts:[[3,"headingLevel"],["title","Title for accordion item 1"],["title","Title for accordion item 2"],["title","Title for accordion item 3","isDisabled","{true}","disabledTitle","Title for disabled accordion item 3"],["title","Title for accordion item 4"]],template:function(t,a){t&1&&(o(0,"kirby-accordion",0)(1,"kirby-accordion-item",1),l(2," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(3,"kirby-accordion-item",2),l(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(5,"kirby-accordion-item",3),l(6," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n(),o(7,"kirby-accordion-item",4),l(8," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n()()),t&2&&m("headingLevel",3)},dependencies:[Se,Me],encapsulation:2});let i=e;return i})();var mb=(()=>{let e=class e{constructor(r){this.modalController=r}showActionSheet(){let r={header:"Your action sheet header",subheader:"Your action sheet subheader",items:[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}],cancelButtonText:"Custom cancel"};this.modalController.showActionSheet(r,this.onActionSelected)}onActionSelected(r){console.log(`Action sheet selection: ${JSON.stringify(r)}`)}};e.\u0275fac=function(t){return new(t||e)(v(oe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-action-sheet-example"]],decls:2,vars:0,consts:[["kirby-button","",3,"click"]],template:function(t,a){t&1&&(o(0,"button",0),b("click",function(){return a.showActionSheet()}),l(1,"Show action sheet"),n())},dependencies:[f],encapsulation:2});let i=e;return i})();var Zo={title:"Alert With Icon",message:"This message can have more than 1 line.",okBtn:"I agree",cancelBtn:"Take me back",icon:{name:"warning",themeColor:"warning"}},Ve=class Ve{static stringify(e){return JSON.stringify(e,null,"	").replace(/"(\w+)":/g,"$1:").replace(/"/g,"'")}constructor(e,s){this.modalController=e,this.toastController=s,this.alertClose$=new Ui}showAlert(){let e={title:"Default Alert",message:"The default alert is just a title, a message, an OK and (optional) cancel button",okBtn:"I agree",cancelBtn:"Take me back"};this.modalController.showAlert(e,this.onAlertClosed.bind(this))}showAlertWithIcon(){this.modalController.showAlert(Zo,this.onAlertClosed.bind(this))}showAlertWithoutCancel(){let e={title:"Alert Without Cancel",message:"This is an alert that can only be acknowledged (no cancel option)",okBtn:"I understand"};this.modalController.showAlert(e,this.onAlertClosed.bind(this))}showDestructiveAlert(){let e={title:"Desctructive Alert",message:"This is to indicate that something destructive will happen when clicking the OK button",cancelBtn:"Get me out of here",okBtn:{text:"Confirm",isDestructive:!0}};this.modalController.showAlert(e,this.onAlertDestructiveClosed.bind(this))}showAlertWithNewline(){let e={title:"Alert with newline",message:`This is message one.

This is message two.`,okBtn:"I agree",cancelBtn:"Take me back"};this.modalController.showAlert(e,this.onAlertClosed.bind(this))}showAlertWithDynamicValues(){let t=kt=>6e4-kt*1e3,a=kt=>Math.ceil(kt/1e3),g=Qi(0,1e3).pipe(zi(t),Ji(this.alertClose$),Zi(kt=>kt>=0)),C=Yi("Need more time?"),yt=g.pipe(zi(kt=>`Time remaining: ${a(kt)}`)),xr={title:C,icon:{name:"clock",themeColor:"warning"},message:yt,okBtn:"Logout",cancelBtn:"Take me back"};this.modalController.showAlert(xr,this.onAlertClosed.bind(this))}onAlertClosed(e){let s={message:`Alert selection: ${e}`,messageType:e?"success":"warning",durationInMs:1500};this.toastController.showToast(s),this.alertClose$.next()}onAlertDestructiveClosed(e){let s={message:e?"Message deleted":"Nothing happened",messageType:e?"warning":"success",durationInMs:1500};this.toastController.showToast(s)}};Ve.alertConfigWithIcon=`const config: AlertConfig = ${Ve.stringify(Zo)}

this.modalController.showAlert(config);`,Ve.alertConfigWithDynamicValues=`const title$ = of('Need more time?');
const message$ = remainingSeconds$.pipe(
  map((remainingSeconds) => \`Time remaining: \${remainingSeconds}\`)
);
const logoutText$ = this.myTranslationService.get('logout');
const takeMeBackText$ = this.myTranslationService.get('take_me_back');

const config: AlertConfig = {
  title: title$,
  icon: {
    name: 'clock',
    themeColor: 'warning',
  },
  message: message$,
  okBtn: logoutText$,
  cancelBtn: takeMeBackText$,
};

this.modalController.showAlert(config);`,Ve.\u0275fac=function(s){return new(s||Ve)(v(oe),v(A))},Ve.\u0275cmp=d({type:Ve,selectors:[["cookbook-alert-example"]],decls:12,vars:0,consts:[["kirby-button","",3,"click"],["kirby-button","",1,"destructive",3,"click"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showAlert()}),l(1,"Show alert"),n(),o(2,"button",0),b("click",function(){return r.showAlertWithIcon()}),l(3,"Show alert with icon"),n(),o(4,"button",0),b("click",function(){return r.showAlertWithoutCancel()}),l(5,"Show alert without cancel"),n(),o(6,"button",1),b("click",function(){return r.showDestructiveAlert()}),l(7,` Show destructive alert
`),n(),o(8,"button",0),b("click",function(){return r.showAlertWithNewline()}),l(9,"Show alert with newline"),n(),o(10,"button",0),b("click",function(){return r.showAlertWithDynamicValues()}),l(11,"Show alert with dynamic values"),n())},dependencies:[f],styles:["[_nghost-%COMP%]{display:block}"]});var Xo=Ve;var Hr={selector:"cookbook-avatar-example-default",template:`<kirby-avatar>
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>`},hb=(()=>{let e=class e{constructor(){this.template=Hr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-default"]],decls:2,vars:0,consts:[["name","kirby"]],template:function(t,a){t&1&&(o(0,"kirby-avatar"),p(1,"kirby-icon",0),n())},dependencies:[G,w],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var en={selector:"cookbook-avatar-example-colors",template:`<div class="avatar-item-container">
  <div class="avatar-item-inner-container-bg-none">
    <kirby-avatar themeColor="white">
      <kirby-icon name="kirby">
      </kirby-icon>
    </kirby-avatar>
  </div>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container-bg">
    <kirby-avatar themeColor="light">
      <kirby-icon name="kirby">
      </kirby-icon>
    </kirby-avatar>
  </div>
</div>`,htmlSnippet:`<kirby-avatar themeColor="white">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="light">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>`},wb=(()=>{let e=class e{constructor(){this.template=en.template,this.htmlSnippet=en.htmlSnippet,this.shouldWrap=!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-colors"]],hostVars:2,hostBindings:function(t,a){t&2&&R("wrap",a.shouldWrap)},decls:8,vars:0,consts:[[1,"avatar-item-container"],[1,"avatar-item-inner-container-bg-none"],["themeColor","white"],["name","kirby"],[1,"avatar-item-inner-container-bg"],["themeColor","light"]],template:function(t,a){t&1&&(o(0,"div",0)(1,"div",1)(2,"kirby-avatar",2),p(3,"kirby-icon",3),n()()(),o(4,"div",0)(5,"div",4)(6,"kirby-avatar",5),p(7,"kirby-icon",3),n()()())},dependencies:[G,Y,w],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var Wr={selector:"cookbook-avatar-example-text",template:`<kirby-avatar size="xs" text="T"></kirby-avatar>
<kirby-avatar size="sm" text="T"></kirby-avatar>
<kirby-avatar size="md" text="T"></kirby-avatar>
<kirby-avatar size="lg" text="T"></kirby-avatar>`},Tb=(()=>{let e=class e{constructor(){this.template=Wr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-text"]],decls:4,vars:0,consts:[["size","xs","text","T"],["size","sm","text","T"],["size","md","text","T"],["size","lg","text","T"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)(1,"kirby-avatar",1)(2,"kirby-avatar",2)(3,"kirby-avatar",3)},dependencies:[G],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var Vr={selector:"cookbook-avatar-example-badge",template:`<kirby-avatar size="xs">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>

<kirby-avatar size="sm">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>

<kirby-avatar size="md">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>

<kirby-avatar size="lg">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>`},Ib=(()=>{let e=class e{constructor(){this.template=Vr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-badge"]],decls:16,vars:0,consts:[["size","xs"],["name","kirby"],["name","attach"],["size","sm"],["size","md"],["size","lg"]],template:function(t,a){t&1&&(o(0,"kirby-avatar",0),p(1,"kirby-icon",1),o(2,"kirby-badge"),p(3,"kirby-icon",2),n()(),o(4,"kirby-avatar",3),p(5,"kirby-icon",1),o(6,"kirby-badge"),p(7,"kirby-icon",2),n()(),o(8,"kirby-avatar",4),p(9,"kirby-icon",1),o(10,"kirby-badge"),p(11,"kirby-icon",2),n()(),o(12,"kirby-avatar",5),p(13,"kirby-icon",1),o(14,"kirby-badge"),p(15,"kirby-icon",2),n()())},dependencies:[G,w,le],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var Rr={selector:"cookbook-avatar-example-image",template:`<kirby-avatar 
  imageSrc="/assets/images/woman.png" 
  altText="Example" 
  size="lg"
></kirby-avatar>

<kirby-avatar 
  imageSrc="/assets/images/woman.png" 
  altText="Example" 
  overlay="true" 
  size="lg"
></kirby-avatar>

<kirby-avatar 
  imageSrc="/assets/images/woman.png" 
  altText="Example" 
  stroke="true" 
  size="lg"
></kirby-avatar>`},Ab=(()=>{let e=class e{constructor(){this.template=Rr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image"]],hostVars:2,hostBindings:function(t,a){t&2&&R("align-top",!0)},decls:3,vars:0,consts:[["imageSrc","/assets/images/woman.png","altText","Example","size","lg"],["imageSrc","/assets/images/woman.png","altText","Example","overlay","true","size","lg"],["imageSrc","/assets/images/woman.png","altText","Example","stroke","true","size","lg"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)(1,"kirby-avatar",1)(2,"kirby-avatar",2)},dependencies:[G],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var Gr={selector:"cookbook-avatar-example-size",template:`<kirby-avatar size="xs">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar size="sm">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar size="md">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar size="lg">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>
`},Kb=(()=>{let e=class e{constructor(){this.template=Gr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-size"]],decls:8,vars:0,consts:[["size","xs"],["name","kirby"],["size","sm"],["size","md"],["size","lg"]],template:function(t,a){t&1&&(o(0,"kirby-avatar",0),p(1,"kirby-icon",1),n(),o(2,"kirby-avatar",2),p(3,"kirby-icon",1),n(),o(4,"kirby-avatar",3),p(5,"kirby-icon",1),n(),o(6,"kirby-avatar",4),p(7,"kirby-icon",1),n())},dependencies:[G,w],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}kirby-avatar[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}kirby-avatar[size=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[size=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[size=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[size=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var $r={selector:"cookbook-avatar-example-image-loazy-loading",template:'<kirby-avatar imageSrc="/assets/images/woman.png" imageLoading="lazy" size="lg"></kirby-avatar>'},Wb=(()=>{let e=class e{constructor(){this.template=$r.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image-loazy-loading"]],decls:1,vars:0,consts:[["imageSrc","/assets/images/woman.png","imageLoading","lazy","size","lg"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)},dependencies:[G],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var tn={selector:"cookbook-avatar-example-image-error",template:`<kirby-avatar
  [imageSrc]="avatarSrc"
  (imageError)="showFallbackImageOnError($event)"
  size="lg"
></kirby-avatar>`,ts:`avatarSrc: string = 'bad-image-url.png';

showFallbackImageOnError(event: ErrorEvent) {
  const fallbackImageSrc =
                'assets/images/avatar-not-found.png';
  this.avatarSrc = fallbackImageSrc;
  // Possibly do something with the ErrorEvent parameter...
}`},Gb=(()=>{let e=class e{constructor(){this.template=tn.template,this.ts=tn.ts,this.avatarSrc="bad-image-url.png"}showFallbackImageOnError(r){let t="assets/images/avatar-not-found.png";this.avatarSrc=t}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image-error"]],decls:1,vars:1,consts:[["size","lg",3,"imageError","imageSrc"]],template:function(t,a){t&1&&(o(0,"kirby-avatar",0),b("imageError",function(C){return a.showFallbackImageOnError(C)}),n()),t&2&&m("imageSrc",a.avatarSrc)},dependencies:[G],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-xs)}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center;display:inline-block;padding-top:var(--kirby-spacing-xxxs)}kirby-avatar[stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[themeColor][_ngcontent-%COMP%]{display:block}kirby-avatar[themeColor][_ngcontent-%COMP%]:before{padding-top:var(--kirby-spacing-s)}kirby-avatar[themeColor][themeColor=light][_ngcontent-%COMP%]:before{content:"Light"}kirby-avatar[themeColor][themeColor=white][_ngcontent-%COMP%]:before{content:"White"}.avatar-item-inner-container-bg[_ngcontent-%COMP%]{background-color:var(--kirby-white);padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}.avatar-item-inner-container-bg-none[_ngcontent-%COMP%]{padding:var(--kirby-spacing-xs);border-radius:var(--kirby-border-radius-n);margin-bottom:var(--kirby-spacing-s)}']});let i=e;return i})();var jr={selector:"cookbook-badge-example-number",template:`<kirby-badge>1</kirby-badge>
<kirby-badge themeColor="success">7</kirby-badge>
<kirby-badge themeColor="warning">99</kirby-badge>
<kirby-badge themeColor="danger">123</kirby-badge>`},Ub=(()=>{let e=class e{constructor(){this.template=jr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-number"]],decls:8,vars:0,consts:[["themeColor","success"],["themeColor","warning"],["themeColor","danger"]],template:function(t,a){t&1&&(o(0,"kirby-badge"),l(1,"1"),n(),o(2,"kirby-badge",0),l(3,"7"),n(),o(4,"kirby-badge",1),l(5,"99"),n(),o(6,"kirby-badge",2),l(7,"123"),n())},dependencies:[le],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-s)}"]});let i=e;return i})();var Ur={selector:"cookbook-badge-example-text",template:`<kirby-badge>Default</kirby-badge>
<kirby-badge themeColor="success">Success</kirby-badge>
<kirby-badge themeColor="warning">Warning</kirby-badge>
<kirby-badge themeColor="danger">Danger</kirby-badge>
`},Jb=(()=>{let e=class e{constructor(){this.template=Ur.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-text"]],decls:8,vars:0,consts:[["themeColor","success"],["themeColor","warning"],["themeColor","danger"]],template:function(t,a){t&1&&(o(0,"kirby-badge"),l(1,"Default"),n(),o(2,"kirby-badge",0),l(3,"Success"),n(),o(4,"kirby-badge",1),l(5,"Warning"),n(),o(6,"kirby-badge",2),l(7,"Danger"),n())},dependencies:[le],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-s)}"]});let i=e;return i})();var Yr={selector:"cookbook-badge-example-icon",template:`<kirby-badge>
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>

<kirby-badge themeColor="success">
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>

<kirby-badge themeColor="warning">
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>

<kirby-badge themeColor="danger">
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>`},tu=(()=>{let e=class e{constructor(){this.template=Yr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-icon"]],decls:8,vars:0,consts:[["name","attach"],["themeColor","success"],["themeColor","warning"],["themeColor","danger"]],template:function(t,a){t&1&&(o(0,"kirby-badge"),p(1,"kirby-icon",0),n(),o(2,"kirby-badge",1),p(3,"kirby-icon",0),n(),o(4,"kirby-badge",2),p(5,"kirby-icon",0),n(),o(6,"kirby-badge",3),p(7,"kirby-icon",0),n())},dependencies:[le,w],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-s)}"]});let i=e;return i})();var Qr={selector:"cookbook-badge-example-small",template:`<kirby-badge size="sm">
</kirby-badge>

<kirby-badge themeColor="success" size ="sm">
</kirby-badge>

<kirby-badge themeColor="warning" size="sm">
</kirby-badge>

<kirby-badge themeColor="danger" size="sm">
</kirby-badge>`},nu=(()=>{let e=class e{constructor(){this.template=Qr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-small"]],decls:4,vars:0,consts:[["size","sm"],["themeColor","success","size","sm"],["themeColor","warning","size","sm"],["themeColor","danger","size","sm"]],template:function(t,a){t&1&&p(0,"kirby-badge",0)(1,"kirby-badge",1)(2,"kirby-badge",2)(3,"kirby-badge",3)},dependencies:[le],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-s)}"]});let i=e;return i})();var Jr={selector:"cookbook-button-example-default",template:"<button kirby-button>Default Button</button>"},lu=(()=>{let e=class e{constructor(){this.template=Jr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-default"]],decls:2,vars:0,consts:[["kirby-button",""]],template:function(t,a){t&1&&(o(0,"button",0),l(1,"Default Button"),n())},dependencies:[f],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var Zr={selector:"cookbook-button-example-attention-level",template:`<kirby-card [hasPadding]="true" [themeColor]="cardThemeColor" [variant]="cardVariant">
  <button kirby-button attentionLevel="1" expand="block">
    Attention Level 1
  </button>
  <button kirby-button attentionLevel="2" expand="block">
    Attention Level 2
  </button>
  <button kirby-button attentionLevel="3" expand="block">
    Attention Level 3
  </button>
</kirby-card>
<fieldset>
  <legend>Configuration</legend>
  <kirby-dropdown
    [items]="themeColors"
    [selectedIndex]="0"
    size="sm"
    (change)="onThemeColorChange($event.value)">
  </kirby-dropdown>
</fieldset>`},bu=(()=>{let e=class e{constructor(){this.template=Zr.template.split("<fieldset")[0],this.themeColors=[{text:"Card color: light",value:"light"},{text:"Card color: white",value:"white"},{text:"Card color: dark",value:"dark"}],this.cardThemeColor=this.themeColors[0].value}get cardVariant(){return this.cardThemeColor==="light"?"outlined":"elevated"}onThemeColorChange(r){this.cardThemeColor=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-attention-level"]],inputs:{cardThemeColor:"cardThemeColor"},decls:11,vars:5,consts:[[3,"hasPadding","themeColor","variant"],["kirby-button","","attentionLevel","1","expand","block"],["kirby-button","","attentionLevel","2","expand","block"],["kirby-button","","attentionLevel","3","expand","block"],["size","sm",3,"change","items","selectedIndex"]],template:function(t,a){t&1&&(o(0,"kirby-card",0)(1,"button",1),l(2," Attention Level 1 "),n(),o(3,"button",2),l(4," Attention Level 2 "),n(),o(5,"button",3),l(6," Attention Level 3 "),n()(),o(7,"fieldset")(8,"legend"),l(9,"Configuration"),n(),o(10,"kirby-dropdown",4),b("change",function(C){return a.onThemeColorChange(C.value)}),n()()),t&2&&(m("hasPadding",!0)("themeColor",a.cardThemeColor)("variant",a.cardVariant),c(10),m("items",a.themeColors)("selectedIndex",0))},dependencies:[T,Y,f,Q],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]{display:flex;gap:var(--kirby-spacing-m)}kirby-card[_ngcontent-%COMP%]{max-width:var(--kirby-breakpoint-xsmall)}kirby-card[_ngcontent-%COMP%]:not(.outlined){border:1px solid transparent}fieldset[_ngcontent-%COMP%]{align-self:flex-start}"]});let i=e;return i})();var Xr={selector:"cookbook-button-example-sizes",template:`<button kirby-button size="xs">Extra Small Button</button>
<button kirby-button size="sm">Small Button</button>
<button kirby-button>Medium Button</button>
<button kirby-button size="lg">Large Button</button>`},yu=(()=>{let e=class e{constructor(){this.template=Xr.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-sizes"]],decls:8,vars:0,consts:[["kirby-button","","size","xs"],["kirby-button","","size","sm"],["kirby-button",""],["kirby-button","","size","lg"]],template:function(t,a){t&1&&(o(0,"button",0),l(1,"Extra Small Button"),n(),o(2,"button",1),l(3,"Small Button"),n(),o(4,"button",2),l(5,"Medium Button"),n(),o(6,"button",3),l(7,"Large Button"),n())},dependencies:[f],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:inline-flex;flex-direction:column;align-items:center;gap:var(--kirby-spacing-s)}@media(min-width:768px){[_nghost-%COMP%]{flex-direction:row}}"]});let i=e;return i})();var ea={selector:"cookbook-button-example-block",template:'<button kirby-button expand="block">Block Button</button>'},hu=(()=>{let e=class e{constructor(){this.template=ea.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-block"]],decls:2,vars:0,consts:[["kirby-button","","expand","block"]],template:function(t,a){t&1&&(o(0,"button",0),l(1,"Block Button"),n())},dependencies:[f],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var ta={selector:"cookbook-button-example-icons",template:`<button kirby-button size="xs">
  <kirby-icon name="edit"></kirby-icon>  
  Icon left
</button>
<button kirby-button size="sm">
  <kirby-icon name="edit"></kirby-icon>  
  Icon left
</button>
<button kirby-button>
  <kirby-icon name="edit"></kirby-icon>  
  Icon left
</button>
<button kirby-button size="lg">
  <kirby-icon name="edit"></kirby-icon>  
  Icon left
</button>

<button kirby-button size="xs">
  Icon right
  <kirby-icon name="arrow-down"></kirby-icon>  
</button>
<button kirby-button size="sm">
  Icon right
  <kirby-icon name="arrow-down"></kirby-icon>  
</button>
<button kirby-button>
  Icon right
  <kirby-icon name="arrow-down"></kirby-icon>  
</button>
<button kirby-button size="lg">
  Icon right
  <kirby-icon name="arrow-down"></kirby-icon>  
</button>`},_u=(()=>{let e=class e{constructor(){this.template=ta.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-icons"]],decls:24,vars:0,consts:[["kirby-button","","size","xs"],["name","edit"],["kirby-button","","size","sm"],["kirby-button",""],["kirby-button","","size","lg"],["name","arrow-down"]],template:function(t,a){t&1&&(o(0,"button",0),p(1,"kirby-icon",1),l(2,` Icon left
`),n(),o(3,"button",2),p(4,"kirby-icon",1),l(5,` Icon left
`),n(),o(6,"button",3),p(7,"kirby-icon",1),l(8,` Icon left
`),n(),o(9,"button",4),p(10,"kirby-icon",1),l(11,` Icon left
`),n(),o(12,"button",0),l(13," Icon right "),p(14,"kirby-icon",5),n(),o(15,"button",2),l(16," Icon right "),p(17,"kirby-icon",5),n(),o(18,"button",3),l(19," Icon right "),p(20,"kirby-icon",5),n(),o(21,"button",4),l(22," Icon right "),p(23,"kirby-icon",5),n())},dependencies:[f,w],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:inline-grid;grid-template-columns:repeat(4,auto);place-items:center center;gap:var(--kirby-spacing-s)}@media(max-width:767px){[_nghost-%COMP%]{display:inline-flex;flex-direction:column;align-items:center}}"]});let i=e;return i})();var ia={selector:"cookbook-button-example-icon-only",template:`<button kirby-button size="xs" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button size="sm" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button size="lg" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>

<button kirby-button size="xs" attentionLevel="2" [showIconOnly]="true">
  Search
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button size="sm" attentionLevel="2" [showIconOnly]="true">
  Search
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button attentionLevel="2" [showIconOnly]="true">
  <kirby-icon name="search"></kirby-icon>
  Search
</button>
<button kirby-button size="lg" attentionLevel="2" [showIconOnly]="true">
  <kirby-icon name="search"></kirby-icon>
  Search
</button>

<button kirby-button size="xs" attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button size="sm" attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button size="lg" attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>`},Tu=(()=>{let e=class e{constructor(){this.template=ia.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-icon-only"]],decls:28,vars:4,consts:[["kirby-button","","size","xs","aria-label","Close"],["name","close"],["kirby-button","","size","sm","aria-label","Close"],["kirby-button","","aria-label","Close"],["kirby-button","","size","lg","aria-label","Close"],["kirby-button","","size","xs","attentionLevel","2",3,"showIconOnly"],["name","search"],["kirby-button","","size","sm","attentionLevel","2",3,"showIconOnly"],["kirby-button","","attentionLevel","2",3,"showIconOnly"],["kirby-button","","size","lg","attentionLevel","2",3,"showIconOnly"],["kirby-button","","size","xs","attentionLevel","3","aria-label","More settings"],["name","more"],["kirby-button","","size","sm","attentionLevel","3","aria-label","More settings"],["kirby-button","","attentionLevel","3","aria-label","More settings"],["kirby-button","","size","lg","attentionLevel","3","aria-label","More settings"]],template:function(t,a){t&1&&(o(0,"button",0),p(1,"kirby-icon",1),n(),o(2,"button",2),p(3,"kirby-icon",1),n(),o(4,"button",3),p(5,"kirby-icon",1),n(),o(6,"button",4),p(7,"kirby-icon",1),n(),o(8,"button",5),l(9," Search "),p(10,"kirby-icon",6),n(),o(11,"button",7),l(12," Search "),p(13,"kirby-icon",6),n(),o(14,"button",8),p(15,"kirby-icon",6),l(16,` Search
`),n(),o(17,"button",9),p(18,"kirby-icon",6),l(19,` Search
`),n(),o(20,"button",10),p(21,"kirby-icon",11),n(),o(22,"button",12),p(23,"kirby-icon",11),n(),o(24,"button",13),p(25,"kirby-icon",11),n(),o(26,"button",14),p(27,"kirby-icon",11),n()),t&2&&(c(8),m("showIconOnly",!0),c(3),m("showIconOnly",!0),c(3),m("showIconOnly",!0),c(3),m("showIconOnly",!0))},dependencies:[f,w],styles:["[_nghost-%COMP%]{display:inline-grid;grid-template-columns:repeat(4,auto);place-items:center center;gap:var(--kirby-spacing-s)}"]});let i=e;return i})();var oa={selector:"cookbook-button-example-undecorated",template:`<button kirby-button [noDecoration]="true" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>`},Ou=(()=>{let e=class e{constructor(){this.template=oa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-undecorated"]],decls:2,vars:1,consts:[["kirby-button","","aria-label","Close",3,"noDecoration"],["name","close"]],template:function(t,a){t&1&&(o(0,"button",0),p(1,"kirby-icon",1),n()),t&2&&m("noDecoration",!0)},dependencies:[f,w],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var na={selector:"cookbook-button-example-disabled",template:`<button kirby-button disabled>
  Disabled
</button>
<button kirby-button disabled>
  <kirby-icon name="edit"></kirby-icon>  
  Disabled with icon
</button>
<button kirby-button disabled aria-label="Close">
  <kirby-icon name="close"></kirby-icon>  
</button>
<button kirby-button disabled [noDecoration]="true" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>`},Au=(()=>{let e=class e{constructor(){this.template=na.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-disabled"]],decls:9,vars:1,consts:[["kirby-button","","disabled",""],["name","edit"],["kirby-button","","disabled","","aria-label","Close"],["name","close"],["kirby-button","","disabled","","aria-label","Close",3,"noDecoration"]],template:function(t,a){t&1&&(o(0,"button",0),l(1,` Disabled
`),n(),o(2,"button",0),p(3,"kirby-icon",1),l(4,` Disabled with icon
`),n(),o(5,"button",2),p(6,"kirby-icon",3),n(),o(7,"button",4),p(8,"kirby-icon",3),n()),t&2&&(c(7),m("noDecoration",!0))},dependencies:[f,w],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var ra={selector:"cookbook-button-example-aria-disabled",template:`<button kirby-button aria-disabled="true">Aria Disabled</button>
<a kirby-button aria-disabled="true" href="/">Aria Disabled Link</a>`},Nu=(()=>{let e=class e{constructor(){this.template=ra.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-aria-disabled"]],decls:4,vars:0,consts:[["kirby-button","","aria-disabled","true"],["kirby-button","","aria-disabled","true","href","/"]],template:function(t,a){t&1&&(o(0,"button",0),l(1,"Aria Disabled"),n(),o(2,"a",1),l(3,"Aria Disabled Link"),n())},dependencies:[f],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var aa={selector:"cookbook-button-example-link",template:`<a kirby-button href="/">Link</a>
<a kirby-button href="/" target="_blank">Link (new tab/window)</a>`},Hu=(()=>{let e=class e{constructor(){this.template=aa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-link"]],decls:4,vars:0,consts:[["kirby-button","","href","/"],["kirby-button","","href","/","target","_blank"]],template:function(t,a){t&1&&(o(0,"a",0),l(1,"Link"),n(),o(2,"a",1),l(3,"Link (new tab/window)"),n())},dependencies:[f],styles:["[_nghost-%COMP%]{display:inline-grid;grid-template-columns:repeat(4,auto);place-items:center center;gap:var(--kirby-spacing-s)}"]});let i=e;return i})();var la={selector:"cookbook-button-example-button-link",template:'This is a <button class="kirby-button-link">button styled as a link</button>.'},Vu=(()=>{let e=class e{constructor(){this.template=la.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-button-link"]],decls:4,vars:0,consts:[[1,"kirby-button-link"]],template:function(t,a){t&1&&(l(0,"This is a "),se(1,"button",0),l(2,"button styled as a link"),ne(),l(3,"."))},encapsulation:2});let i=e;return i})();var on={template:`<kirby-card>
  <kirby-calendar
    [timezone]="useTimezoneUTC ? 'UTC' : 'local'"
    [disableWeekends]="disableWeekends"
    [disablePastDates]="disablePastDates"
    [disableFutureDates]="disableFutureDates"
    [disabledDates]="setDisabledDates ? disabledDates : null"
    [enabledDates]="setEnabledDates ? enabledDates : null"
    [minDate]="setMinDate ? minDate : null"
    [maxDate]="setMaxDate ? maxDate : null"
    [todayDate]="setTodayDate ? todayDate : null"
    [selectedDate]="selectedDate"
    (dateChange)="onDateChange($event)"
  ></kirby-calendar>
</kirby-card>

<kirby-card [hasPadding]="true" variant="outlined">
  <kirby-card-header [hasPadding]="false">
    <p>
      Selected Date: {{ selectedDate ? (selectedDate | date: 'MMM d, y z':(useTimezoneUTC ? 'UTC' : undefined)) : 'none' }}   
    </p>
  </kirby-card-header>
  <div class="buttons">
    <button kirby-button (click)="selectNextMonth()" attentionLevel="3" size="sm">
      Next month
    </button>
    <button kirby-button (click)="selectToday()" attentionLevel="3" size="sm">Now</button>
    <button kirby-button (click)="deselectDate()" attentionLevel="3" size="sm">Deselect</button>
  </div>
</kirby-card>
    `,codeSnippet:`this.minDate = subDays(today, 60);
this.maxDate = addDays(today, 60);
this.todayDate = addDays(today, 3);

this.disabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
  addDays(today, daysFromToday)
);

this.enabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
  addDays(today, daysFromToday)
);

selectNextMonth() {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  this.selectedDate = nextMonth;
}

selectToday() {
  this.selectedDate = new Date();
}

deselectDate() {
  this.selectedDate = null;
}
  `},Ju=(()=>{let e=class e{constructor(){this.template=on.template,this.codeSnippet=on.codeSnippet,this.disableWeekends=!1,this.disablePastDates=!1,this.disableFutureDates=!1,this.setDisabledDates=!1,this.setEnabledDates=!1,this.setMinDate=!1,this.setMaxDate=!1,this.setTodayDate=!1,this.useTimezoneUTC=!1,this.showYearNavigator=!1,this.yearNavigatorOptions={from:-6,to:3},this.timeZoneName=Intl.DateTimeFormat().resolvedOptions().timeZone,this.updateInputDates()}ngOnChanges(r){r.useTimezoneUTC&&(this.updateInputDates(),this.selectedDate&&(this.useTimezoneUTC?this.selectedDate=Oo(this.subtractTimezoneOffset(this.selectedDate),this.timeZoneName):this.selectedDate=Do(this.selectedDate,this.timeZoneName)))}onDateChange(r){this.selectedDate=r}selectNextMonth(){let r=new Date,t=new Date(r.getFullYear(),r.getMonth()+1,1);this.selectedDate=t}selectToday(){this.selectedDate=new Date}deselectDate(){this.selectedDate=null}updateInputDates(){let r=Po(new Date);this.minDate=Yo(r,60),this.maxDate=ht(r,60),this.todayDate=ht(r,3),this.disabledDates=[3,5,7,10,15,25,28,35].map(t=>ht(r,t)),this.enabledDates=[3,5,7,10,15,25,28,35].map(t=>ht(r,t))}subtractTimezoneOffset(r){return new Date(r.getTime()-r.getTimezoneOffset()*60*1e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-calendar-card-example"]],inputs:{disableWeekends:"disableWeekends",disablePastDates:"disablePastDates",disableFutureDates:"disableFutureDates",setDisabledDates:"setDisabledDates",setEnabledDates:"setEnabledDates",setMinDate:"setMinDate",setMaxDate:"setMaxDate",setTodayDate:"setTodayDate",useTimezoneUTC:"useTimezoneUTC",showYearNavigator:"showYearNavigator"},features:[Xi],decls:14,vars:17,consts:[[3,"dateChange","timezone","disableWeekends","disablePastDates","disableFutureDates","disabledDates","enabledDates","minDate","maxDate","todayDate","selectedDate"],["variant","outlined",3,"hasPadding"],[3,"hasPadding"],[1,"buttons"],["kirby-button","","attentionLevel","3","size","sm",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-card")(1,"kirby-calendar",0),b("dateChange",function(C){return a.onDateChange(C)}),n()(),o(2,"kirby-card",1)(3,"kirby-card-header",2)(4,"p"),l(5),Z(6,"date"),n()(),o(7,"div",3)(8,"button",4),b("click",function(){return a.selectNextMonth()}),l(9," Next month "),n(),o(10,"button",4),b("click",function(){return a.selectToday()}),l(11,"Now"),n(),o(12,"button",4),b("click",function(){return a.deselectDate()}),l(13,"Deselect"),n()()()),t&2&&(c(),m("timezone",a.useTimezoneUTC?"UTC":"local")("disableWeekends",a.disableWeekends)("disablePastDates",a.disablePastDates)("disableFutureDates",a.disableFutureDates)("disabledDates",a.setDisabledDates?a.disabledDates:null)("enabledDates",a.setEnabledDates?a.enabledDates:null)("minDate",a.setMinDate?a.minDate:null)("maxDate",a.setMaxDate?a.maxDate:null)("todayDate",a.setTodayDate?a.todayDate:null)("selectedDate",a.selectedDate),c(),m("hasPadding",!0),c(),m("hasPadding",!1),c(2),_(" Selected Date: ",a.selectedDate?po(6,13,a.selectedDate,"MMM d, y z",a.useTimezoneUTC?"UTC":void 0):"none"," "))},dependencies:[Fe,T,ce,Rt,f,go],styles:["[_nghost-%COMP%]{display:block;max-width:320px;margin:0 auto}kirby-card[_ngcontent-%COMP%]:has(.buttons){margin-top:var(--kirby-spacing-xxs)}kirby-card[_ngcontent-%COMP%]:has(.buttons)   .buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-around}kirby-card[_ngcontent-%COMP%]:has(.buttons)   p[_ngcontent-%COMP%]{margin:0;margin-top:var(--kirby-spacing-xs)}"]});let i=e;return i})();var sa=["*"];function ca(i,e){i&1&&p(0,"kirby-icon",3)}function ma(i,e){i&1&&p(0,"kirby-icon",4)}function da(i,e){if(i&1){let s=P();o(0,"button",2),b("click",function(){S(s);let t=y();return M(t.toggleConfig())}),l(1," Configure "),O(2,ca,1,0,"kirby-icon",3),O(3,ma,1,0,"kirby-icon",4),n()}if(i&2){let s=y();c(2),I(s.showConfig?-1:2),c(),I(s.showConfig?3:-1)}}function pa(i,e){i&1&&We(0)}function ba(i,e){if(i&1&&(o(0,"kirby-card"),x(1,pa,1,0,"ng-container",5),n()),i&2){y();let s=X(4);c(),m("ngTemplateOutlet",s)}}function ua(i,e){i&1&&We(0)}function ga(i,e){if(i&1&&x(0,ua,1,0,"ng-container",5),i&2){y();let s=X(4);m("ngTemplateOutlet",s)}}function ya(i,e){if(i&1&&(o(0,"fieldset")(1,"legend"),l(2),n(),ao(3),n()),i&2){let s=y();c(2),k(s.title)}}var ge=(()=>{let e=class e{constructor(){this.configAppearance="block",this.title="Configuration",this.showConfig=!1,this.align="end"}get _cssClass(){return["align-"+this.align,this.configAppearance].filter(Boolean)}toggleConfig(){this.showConfig=!this.showConfig}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-example-configuration-wrapper"]],hostVars:4,hostBindings:function(t,a){t&2&&(lo(a._cssClass),R("show-config",a.showConfig))},inputs:{configAppearance:"configAppearance",title:"title",align:"align"},ngContentSelectors:sa,decls:5,vars:2,consts:[["fieldset",""],["kirby-button","","attentionLevel","3"],["kirby-button","","attentionLevel","3",3,"click"],["name","menu-outline"],["name","menu"],[4,"ngTemplateOutlet"]],template:function(t,a){t&1&&(ro(),O(0,da,4,2,"button",1),O(1,ba,2,1,"kirby-card")(2,ga,1,1,"ng-container"),x(3,ya,4,1,"ng-template",null,0,ft)),t&2&&(I(a.configAppearance==="toggle"?0:-1),c(),I(a.configAppearance!=="block"?1:2))},dependencies:[ko,At,f,T,w],styles:['.kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:block}.toggle[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;position:absolute;right:var(--kirby-spacing-s);top:calc(var(--kirby-spacing-s) + var(--ion-safe-area-top))}.toggle.align-end[_nghost-%COMP%]{align-items:flex-end}.toggle.align-end[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{rotate:-45deg;transform-origin:top right}.toggle[_nghost-%COMP%]   button[_ngcontent-%COMP%]{z-index:calc(var(--kirby-z-index-default) + 2)}.toggle[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{opacity:0;visibility:hidden;rotate:45deg;transition-property:opacity,rotate,scale;transition-duration:var(--kirby-transition-duration-quick);transition-timing-function:var(--kirby-transition-easing-enter-exit);transform-origin:top left;scale:.5}.toggle.show-config[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{opacity:1;visibility:visible;rotate:0deg;scale:1}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{position:fixed;margin-top:var(--kirby-border-radius-n);opacity:.5;transform:rotate(-90deg) translateY(calc(-1 * (var(--kirby-border-radius-n) + var(--kirby-spacing-xs))));transform-origin:top right;overflow:initial}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:-20px}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:hover, .snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:active, .snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:focus-within{opacity:unset;transform:none;border-top-right-radius:0;border-bottom-right-radius:0;--kirby-border-color: initial}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:hover, .snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:active{transition-duration:var(--kirby-transition-duration-short);transition-property:transform,border-radius;transition-timing-function:var(--kirby-transition-easing-enter-exit)}.ion-page[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%], .ion-page   [_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{top:var(--header-height, 0)}.ion-page.drawer[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%], .ion-page.drawer   [_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{top:0}@media(min-width:768px){.ion-page.drawer[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%], .ion-page.drawer   [_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{top:var(--header-height, 0)}}fieldset[_ngcontent-%COMP%]{border:1px solid var(--kirby-border-color, var(--kirby-medium));padding:var(--kirby-spacing-xs)}fieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]{color:var(--kirby-text-color-semi-dark);text-align:var(--text-align, initial);font-size:var(--kirby-font-size-s)}kirby-card[_ngcontent-%COMP%]{z-index:calc(var(--kirby-z-index-default) + 1);font-size:var(--kirby-font-size-xs);padding:var(--kirby-spacing-xxs);top:0;right:0}']});let i=e;return i})();var ka={template:`<kirby-card>
  <kirby-calendar [yearNavigatorOptions]="yearNavigatorOptions"></kirby-calendar>
</kirby-card>`},lg=(()=>{let e=class e{constructor(){this.template=ka.template,this.yearNavigatorOptions={from:-6,to:3}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-calendar-year-navigator-example"]],decls:2,vars:1,consts:[[3,"yearNavigatorOptions"]],template:function(t,a){t&1&&(o(0,"kirby-card"),p(1,"kirby-calendar",0),n()),t&2&&(c(),m("yearNavigatorOptions",a.yearNavigatorOptions))},dependencies:[T,Rt],styles:["[_nghost-%COMP%]{display:block;max-width:320px;margin:0 auto}"]});let i=e;return i})();var fa={selector:"cookbook-calendar-no-background-example",template:"<kirby-calendar></kirby-calendar>"},mg=(()=>{let e=class e{constructor(){this.template=fa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-calendar-no-background-example"]],decls:1,vars:0,template:function(t,a){t&1&&p(0,"kirby-calendar")},dependencies:[Rt],styles:["[_nghost-%COMP%]{display:block;max-width:320px;margin:0 auto}"]});let i=e;return i})();var ha={selector:"cookbook-card-example-variant",template:`
  <div class="variant-card-container">
    <kirby-card hasPadding="true">
      <strong>Elevated (default)</strong>
      <p>The card is slightly elevated from the background with a drop shadow.</p>
    </kirby-card>
    <kirby-card hasPadding="true" variant="flat">
      <strong>Flat</strong>
      <p>Has no shadow and appears lower in the visual hierarchy.</p>
    </kirby-card>
    <kirby-card [hasPadding]="true" variant="outlined">
      <strong>Outlined card</strong>
      <p>Has a border and no background. Appear lowest in the visual hierarchy.</p>
    </kirby-card>
  </div>
  `},bg=(()=>{let e=class e{constructor(){this.template=ha.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-variant"]],decls:16,vars:1,consts:[[1,"variant-card-container"],["hasPadding","true"],["hasPadding","true","variant","flat"],["variant","outlined",3,"hasPadding"]],template:function(t,a){t&1&&(o(0,"div",0)(1,"kirby-card",1)(2,"strong"),l(3,"Elevated (default)"),n(),o(4,"p"),l(5,"The card is slightly elevated from the background with a drop shadow."),n()(),o(6,"kirby-card",2)(7,"strong"),l(8,"Flat"),n(),o(9,"p"),l(10,"Has no shadow and appears lower in the visual hierarchy."),n()(),o(11,"kirby-card",3)(12,"strong"),l(13,"Outlined card"),n(),o(14,"p"),l(15,"Has a border and no background. Appear lowest in the visual hierarchy."),n()()()),t&2&&(c(11),m("hasPadding",!0))},dependencies:[Fe,T],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}[_nghost-%COMP%]{container-type:inline-size;display:block}.variant-card-container[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-wrap:wrap;gap:16px}.variant-card-container[_ngcontent-%COMP%]   kirby-card[_ngcontent-%COMP%]{max-width:50%;min-width:250px;flex:1}@container (width < 516px){.variant-card-container[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.variant-card-container[_ngcontent-%COMP%]   kirby-card[_ngcontent-%COMP%]{max-width:initial}}"]});let i=e;return i})();var nn={selector:"cookbook-card-example-disclosure",template:`<kirby-card [hasPadding]="true" (click)="noop()">
  <kirby-card-header [hasPadding]="false">
    <kirby-item [disclosure]="'arrow-more'">
      <p class="kirby-text-normal-bold">Item disclosure in header</p>
    </kirby-item>
  </kirby-card-header>

  <p class="kirby-text-large">A card with state and disclosure</p>
  <p> 
    Note how this card can be focussed with tab keyboard navigation and enter or space triggers the click function.
  </p>
  <p>
    You are free to slot any content inside. 
    <kirby-flag themeColor="danger" style="float: right"> Danger </kirby-flag>
  </p>
  <p>
    Could be a couple of flags! 
    <kirby-flag themeColor="success" style="float: right"> Success </kirby-flag>
  </p>
</kirby-card>`,style:`kirby-card {
   --kirby-card-padding-top: 0px;   
}`},hg=(()=>{let e=class e{constructor(){this.template=nn.template,this.style=nn.style,this.noop=Zt}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-disclosure"]],decls:17,vars:3,consts:[[3,"click","hasPadding"],[3,"hasPadding"],[3,"disclosure"],[1,"kirby-text-normal-bold"],[1,"kirby-text-large"],["themeColor","danger",2,"float","right"],["themeColor","success",2,"float","right"]],template:function(t,a){t&1&&(o(0,"kirby-card",0),b("click",function(){return a.noop()}),o(1,"kirby-card-header",1)(2,"kirby-item",2)(3,"p",3),l(4,"Item disclosure in header"),n()()(),o(5,"p",4),l(6,"A card with state and disclosure"),n(),o(7,"p"),l(8," Note how this card can be focussed with tab keyboard navigation and enter or space triggers the click function. "),n(),o(9,"p"),l(10," You are free to slot any content inside. "),o(11,"kirby-flag",5),l(12," Danger "),n()(),o(13,"p"),l(14," Could be a couple of flags! "),o(15,"kirby-flag",6),l(16," Success "),n()()()),t&2&&(m("hasPadding",!0),c(),m("hasPadding",!1),c(),m("disclosure","arrow-more"))},dependencies:[Fe,T,ce,mi,h,Le],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}","kirby-card[_ngcontent-%COMP%]{--kirby-card-padding-top: 0px}"]});let i=e;return i})();var rn={selector:"cookbook-card-example-flag",codeSnippet:`<kirby-card hasPadding="true">
  <kirby-card-header
      [title]="'Flagged card header'"
      [flagged]="flagLevel"
  ></kirby-card-header>

  <strong>A flagged card</strong>
  <p>This is a card that uses a <em>kirby-card-header</em> with the <code>flagged</code> input set.</p>
  <p>Possible values for the flagged header are: <br> <code>'success' | 'warning' | 'danger' | 'info'</code></p>
  <p>Use the buttons below to see the different options \u{1F447}</p>

</kirby-card>`,template:`<kirby-card hasPadding="true">
    <kirby-card-header
        [title]="'Flagged card header'"
        [flagged]="flagLevel"
    ></kirby-card-header>

    <strong>A flagged card</strong>
    <p>This is a card that uses a <em>kirby-card-header</em> with the <code>flagged</code> input set.</p>
    <p>Possible values for the flagged header are: <br> <code>'success' | 'warning' | 'danger' | 'info'</code></p>
    <p>Use the buttons below to see the different options \u{1F447}</p>

</kirby-card>

<div class="card-option-button-group">
    <button (click)="setFlagLevel('success')" class="success"><kirby-icon name="flag"></kirby-icon></button>
    <button (click)="setFlagLevel('warning')" class="warning"><kirby-icon name="flag"></kirby-icon></button>
    <button (click)="setFlagLevel('danger')" class="danger"><kirby-icon name="flag"></kirby-icon></button>
    <button (click)="setFlagLevel('info')" class="info"><kirby-icon name="flag"></kirby-icon></button>
</div>`},_g=(()=>{let e=class e{constructor(){this.template=rn.template,this.codeSnippet=rn.codeSnippet,this.flagLevel="success"}setFlagLevel(r){this.flagLevel=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-flag"]],decls:28,vars:2,consts:[["hasPadding","true"],[3,"title","flagged"],[1,"card-option-button-group"],[1,"success",3,"click"],["name","flag"],[1,"warning",3,"click"],[1,"danger",3,"click"],[1,"info",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-card",0),p(1,"kirby-card-header",1),o(2,"strong"),l(3,"A flagged card"),n(),o(4,"p"),l(5,"This is a card that uses a "),o(6,"em"),l(7,"kirby-card-header"),n(),l(8," with the "),o(9,"code"),l(10,"flagged"),n(),l(11," input set."),n(),o(12,"p"),l(13,"Possible values for the flagged header are: "),p(14,"br"),o(15,"code"),l(16,"'success' | 'warning' | 'danger' | 'info'"),n()(),o(17,"p"),l(18,"Use the buttons below to see the different options \u{1F447}"),n()(),o(19,"div",2)(20,"button",3),b("click",function(){return a.setFlagLevel("success")}),p(21,"kirby-icon",4),n(),o(22,"button",5),b("click",function(){return a.setFlagLevel("warning")}),p(23,"kirby-icon",4),n(),o(24,"button",6),b("click",function(){return a.setFlagLevel("danger")}),p(25,"kirby-icon",4),n(),o(26,"button",7),b("click",function(){return a.setFlagLevel("info")}),p(27,"kirby-icon",4),n()()),t&2&&(c(),m("title","Flagged card header")("flagged",a.flagLevel))},dependencies:[Fe,T,ce,w],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var an={selector:"cookbook-card-example-color",codeSnippet:`<kirby-card hasPadding="true" [themeColor]="color">
  <strong>A themed card</strong>
  <p>This cards color is defined by the <code>themeColor</code> input property.</p>
  <p>Recommended values for themeColor are: <br> <code>'tertiary' | 'dark'</code></p>
  <p>Use the buttons below to see the different options \u{1F447}</p>
</kirby-card>`,template:`<kirby-card hasPadding="true" [themeColor]="color">
    <strong>A themed card</strong>
    <p>This cards color is defined by the <code>themeColor</code> input property.</p>
    <p>Recommended values for themeColor are: <br> <code>'tertiary' | 'dark'</code></p>
    <p>Use the buttons below to see the different options \u{1F447}</p>
</kirby-card>

<div class="card-option-button-group">
    <button (click)="setThemeColor('tertiary')" class="tertiary"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>`},Mg=(()=>{let e=class e{constructor(){this.template=an.template,this.codeSnippet=an.codeSnippet,this.color="tertiary"}setThemeColor(r){this.color=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-color"]],decls:18,vars:1,consts:[["hasPadding","true",3,"themeColor"],[1,"card-option-button-group"],[1,"tertiary",3,"click"],[1,"dark",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-card",0)(1,"strong"),l(2,"A themed card"),n(),o(3,"p"),l(4,"This cards color is defined by the "),o(5,"code"),l(6,"themeColor"),n(),l(7," input property."),n(),o(8,"p"),l(9,"Recommended values for themeColor are: "),p(10,"br"),o(11,"code"),l(12,"'tertiary' | 'dark'"),n()(),o(13,"p"),l(14,"Use the buttons below to see the different options \u{1F447}"),n()(),o(15,"div",1)(16,"button",2),b("click",function(){return a.setThemeColor("tertiary")}),n(),o(17,"button",3),b("click",function(){return a.setThemeColor("dark")}),n()()),t&2&&m("themeColor",a.color)},dependencies:[Fe,T,Y],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var ln={selector:"cookbook-card-example-background-image",template:`<kirby-card [hasPadding]="true" themeColor="dark" (click)="noop()">
  <strong>A card with background image</strong>
  <p>
    Try resizing the viewport to see the media queries in action!
  </p>
  <p>
    Using the CSS Custom Property, we can quite easily add a gradient on top of 
    any image to enhance readability. With the input property, a similar look 
    will have to be implemented by editing the image instead.
  </p>
</kirby-card>`,style:`@use '@kirbydesign/designsystem/scss/utils';

kirby-card {
  --kirby-card-background-image: linear-gradient(
      0deg,
      rgb(255 255 255 / 0%) 0%,
      rgb(0 0 0 / 50%) 100%
    ),
    url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750');

  @include utils.media('>=large') {
    --kirby-card-background-image: linear-gradient(
        0deg,
        rgb(255 255 255 / 0%) 0%,
        rgba(0, 0, 0, 50%) 100%
      ),
      url('https://images.unsplash.com/photo-1560840067-ddcaeb7831d2');
  }
}`},Dg=(()=>{let e=class e{constructor(){this.template=ln.template,this.style=ln.style,this.noop=Zt}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-background-image"]],decls:7,vars:1,consts:[["themeColor","dark",3,"click","hasPadding"]],template:function(t,a){t&1&&(o(0,"kirby-card",0),b("click",function(){return a.noop()}),o(1,"strong"),l(2,"A card with background image"),n(),o(3,"p"),l(4," Try resizing the viewport to see the media queries in action! "),n(),o(5,"p"),l(6," Using the CSS Custom Property, we can quite easily add a gradient on top of any image to enhance readability. With the input property, a similar look will have to be implemented by editing the image instead. "),n()()),t&2&&m("hasPadding",!0)},dependencies:[Fe,T,mi,Y],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}",".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}kirby-card[_ngcontent-%COMP%]{--kirby-card-background-image: linear-gradient( 0deg, rgb(255 255 255 / 0%) 0%, rgb(0 0 0 / 50%) 100% ), url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750)}@media(min-width:992px){kirby-card[_ngcontent-%COMP%]{--kirby-card-background-image: linear-gradient( 0deg, rgb(255 255 255 / 0%) 0%, rgb(0 0 0 / 50%) 100% ), url(https://images.unsplash.com/photo-1560840067-ddcaeb7831d2)}}"]});let i=e;return i})();var va=()=>[50,200,83,102],xa={selector:"cookbook-chart-example-simple-column",template:'<kirby-chart [data]="[50, 200, 83, 102]"></kirby-chart>'},Fg=(()=>{let e=class e{constructor(){this.template=xa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-simple-column"]],decls:1,vars:2,consts:[[3,"data"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(1,va))},dependencies:[me],encapsulation:2});let i=e;return i})();var sn={selector:"cookbook-chart-example-column",template:'<kirby-chart type="column" [data]="data" [labels]="labels"></kirby-chart>',codeSnippet:`data=[7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];

labels=['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  `},zg=(()=>{let e=class e{constructor(){this.template=sn.template,this.codeSnippet=sn.codeSnippet,this.data=[7,12,5,9,3,11,6,2,1,10,4,12],this.labels=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-column"]],decls:1,vars:2,consts:[["type","column",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a.data)("labels",a.labels)},dependencies:[me],encapsulation:2});let i=e;return i})();var _a=()=>[7,12,5,9,3],wa=()=>["2021","2020","2019","2018","2017"],Sa={selector:"cookbook-chart-example-bar",template:`<kirby-chart type="bar" [data]="[7, 12, 5, 9, 3]" [labels]="['2021', '2020', '2019', '2018', '2017']"></kirby-chart>`},Kg=(()=>{let e=class e{constructor(){this.template=Sa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-bar"]],decls:1,vars:4,consts:[["type","bar",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(2,_a))("labels",D(3,wa))},dependencies:[me],encapsulation:2});let i=e;return i})();var Ma=()=>[6,6.37,6.46,6.64,6.78,7.44,7.92,8.18,8.41,8.85,9.33],Ta=()=>["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960"],Ea={selector:"cookbook-chart-example-line",template:`
  <kirby-chart 
  type="line" 
  [data]="[6, 6.37, 6.46, 6.64, 6.78, 7.44, 7.92, 8.18, 8.41, 8.85, 9.33]" 
  [labels]='["1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960"]' 
  ></kirby-chart>`},Wg=(()=>{let e=class e{constructor(){this.template=Ea.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-line"]],decls:1,vars:4,consts:[["type","line",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(2,Ma))("labels",D(3,Ta))},dependencies:[me],encapsulation:2});let i=e;return i})();var Pa=()=>[7,12,5,9,3],cn={selector:"cookbook-chart-example-interaction",template:`<p>{{_text}}</p>
<kirby-chart 
  type="column" 
  [data]="[7, 12, 5, 9, 3]" 
  [labels]="_labels" 
  [customOptions]="_customOptions"
  [highlightedElements]="_highlighted"
></kirby-chart>`,codeSnippet:`_text = 'Nothing has been clicked';
_labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
_highlighted: ChartHighlightedElements;

_customOptions: ChartOptions = {
  onClick: (_event: ChartEvent, activeElements: ActiveElement[], _chart: Chart) => {
    const activeElement = activeElements[0];
    if (activeElement) {
      // Highlight clicked element
      this._highlighted = [[activeElement.datasetIndex, activeElement.index]];

      // Change text
      const activeElementLabel = this._labels[activeElement.index];
      this._text = \`\${activeElementLabel} was clicked\`;
    } else {
      this._text = 'The background was clicked';
      this._highlighted = [];
    }
  },
};
  `},Gg=(()=>{let e=class e{constructor(){this.template=cn.template,this.codeSnippet=cn.codeSnippet,this._text="Nothing has been clicked",this._labels=["Monday","Tuesday","Wednesday","Thursday","Friday"],this._customOptions={onClick:(r,t)=>{let a=t[0];if(a){this._highlighted=[[a.datasetIndex,a.index]];let g=this._labels[a.index];this._text=`${g} was clicked`}else this._text="The background was clicked",this._highlighted=[]}}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-interaction"]],decls:3,vars:6,consts:[["type","column",3,"data","labels","customOptions","highlightedElements"]],template:function(t,a){t&1&&(o(0,"p"),l(1),n(),p(2,"kirby-chart",0)),t&2&&(c(),k(a._text),c(),m("data",D(5,Pa))("labels",a._labels)("customOptions",a._customOptions)("highlightedElements",a._highlighted))},dependencies:[me],encapsulation:2});let i=e;return i})();var Da=()=>["Monday","Tuesday","Wednesday","Thursday","Friday"],mn={selector:"cookbook-chart-example-column-stacked",template:`<kirby-chart type="column" [data]="_datasets" [labels]="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" [customOptions]="_customOptions"></kirby-chart>`,codeSnippet:`
  import { ColorHelper } from '@kirbydesign/designsystem/helpers';

  const { getThemeColorHexString } = ColorHelper; 

  _datasets = [
    {
      data: [0.8, 2, 3, 3.5, 0.5],
    },
    {
      data: [0.6, 2, 1, 2.1, 0.2],
      backgroundColor: getThemeColorHexString('primary'),
    },
  ];

  _customOptions: ChartOptions = {
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };`},Yg=(()=>{let e=class e{constructor(){this.template=mn.template,this.codeSnippet=mn.codeSnippet,this._datasets=[{data:[.8,2,3,3.5,.5]},{data:[.6,2,1,2.1,.2],backgroundColor:Ke.getThemeColorHexString("primary")}],this._customOptions={scales:{y:{stacked:!0},x:{stacked:!0}}}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-column-stacked"]],decls:1,vars:4,consts:[["type","column",3,"data","labels","customOptions"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a._datasets)("labels",D(3,Da))("customOptions",a._customOptions)},dependencies:[me],encapsulation:2});let i=e;return i})();var Oa=()=>["Wednes-","day"],Ia=i=>["Monday","Tuesday",i,"Thursday","Friday"],{getThemeColorHexString:Fa}=Ke,dn={selector:"cookbook-chart-example-multiple-datasets",template:`<kirby-chart 
  type="column" 
  [data]="_datasets" 
  [labels]="['Monday', 'Tuesday', ['Wednes-','day'], 'Thursday', 'Friday']">
</kirby-chart>`,codeSnippet:`import { ColorHelper } from '@kirbydesign/designsystem/helpers';

const { getThemeColorHexString } = ColorHelper;

_datasets = [
  {
    type: 'line',
    data: [45, 65, 105, 37, 70],
  },
  {
    data: [30, 50, 89.5, 22, 48],
  },
  {
    data: [60, 32, 38, 44, 12],
    backgroundColor: getThemeColorHexString('primary'),
  },
];
`},Xg=(()=>{let e=class e{constructor(){this.template=dn.template,this.codeSnippet=dn.codeSnippet,this._datasets=[{data:[30,50,89.5,22,48]},{data:[60,32,38,44,12],backgroundColor:Fa("primary")},{type:"line",data:[45,65,105,37,70]}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-multiple-datasets"]],decls:1,vars:5,consts:[["type","column",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a._datasets)("labels",co(3,Ia,D(2,Oa)))},dependencies:[me],encapsulation:2});let i=e;return i})();var La=()=>[7,12,5,9,3],pn={selector:"cookbook-chart-example-annotations",template:`<kirby-chart 
    [data]="[7, 12, 5, 9, 3]" 
    [annotations]="annotations"
  ></kirby-chart>`,codeSnippet:`annotations: AnnotationOptions[] = [
  {
    type: 'line',
    yMin: 6.5,
    yMax: 6.5,
    drawTime: 'beforeDatasetsDraw',
  },
  {
    type: 'box',
    xMin: -0.3,
    xMax: 0.3,
    yMin: 6,
    yMax: 9,
  },
  {
    type: 'ellipse',
    xMin: 1.7,
    xMax: 1.8,
    yMin: 5.5,
    yMax: 4.5,
  },
  {
    type: 'line',
    yMin: 14.5,
    yMax: 14.5,
    borderDash: [0, 0],
  },
];
`},i0=(()=>{let e=class e{constructor(){this.template=pn.template,this.codeSnippet=pn.codeSnippet,this.annotations=[{type:"line",yMin:6.5,yMax:6.5,drawTime:"beforeDatasetsDraw"},{type:"box",xMin:-.3,xMax:.3,yMin:6,yMax:9},{type:"ellipse",xMin:1.7,xMax:1.8,yMin:5.5,yMax:4.5},{type:"line",yMin:14.5,yMax:14.5,borderDash:[0,0]}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-annotations"]],decls:1,vars:3,consts:[[3,"data","annotations"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(2,La))("annotations",a.annotations)},dependencies:[me],encapsulation:2});let i=e;return i})();var Aa=()=>["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960"],bn={selector:"cookbook-chart-example-area-line",template:`
    <kirby-chart
      type="line"
      [data]="data"
      [labels]="[
        '1950',
        '1951',
        '1952',
        '1953',
        '1954',
        '1955',
        '1956',
        '1957',
        '1958',
        '1959',
        '1960'
      ]"
      [customOptions]="_customOptions"
    ></kirby-chart>
  `,codeSnippet:`
  data = [
    {
      data: [7, 7.37, 7.46, 7.64, 7.78, 8.44, 8.92, 9.18, 9.41, 9.85, 10.33],
    },
    {
      data: [6, 6.37, 6.46, 6.64, 6.78, 7.44, 7.92, 8.18, 8.41, 8.85, 9.33],
      fill: '-1',
    },
  ];

  _customOptions = {
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
    },
  };
  `},r0=(()=>{let e=class e{constructor(){this.template=bn.template,this.codeSnippet=bn.codeSnippet,this._customOptions={scales:{x:{grid:{display:!0}}}},this.data=[{data:[7,7.37,7.46,7.64,7.78,8.44,8.92,9.18,9.41,9.85,10.33]},{data:[6,6.37,6.46,6.64,6.78,7.44,7.92,8.18,8.41,8.85,9.33],fill:"-1"}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-area-line"]],decls:1,vars:4,consts:[["type","line",3,"data","labels","customOptions"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a.data)("labels",D(3,Aa))("customOptions",a._customOptions)},dependencies:[me],encapsulation:2});let i=e;return i})();var za=()=>[739,1200,584,902,30],Ba=()=>["Monday","Tuesday","Wednesday","Thursday","Friday"],Na={selector:"cookbook-chart-example-accessibility",template:`<kirby-chart 
  type="column" 
  [data]="[739, 1200, 584, 902, 30]" 
  [labels]="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']"
>
  <table>
    <tr>
      <th>Day</th>
      <th>Number of visitors</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>739</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>1200</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>584</td>
    </tr>
    <tr>
      <td>Thursday</td>
      <td>902</td>
    </tr>
    <tr>
      <td>Friday</td>
      <td>30</td>
    </tr>
  </table>
</kirby-chart>`},c0=(()=>{let e=class e{constructor(){this.template=Na.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-accessibility"]],decls:32,vars:4,consts:[["type","column",3,"data","labels"]],template:function(t,a){t&1&&(o(0,"kirby-chart",0)(1,"table")(2,"tr")(3,"th"),l(4,"Day"),n(),o(5,"th"),l(6,"Number of visitors"),n()(),o(7,"tr")(8,"td"),l(9,"Monday"),n(),o(10,"td"),l(11,"739"),n()(),o(12,"tr")(13,"td"),l(14,"Tuesday"),n(),o(15,"td"),l(16,"1200"),n()(),o(17,"tr")(18,"td"),l(19,"Wednesday"),n(),o(20,"td"),l(21,"584"),n()(),o(22,"tr")(23,"td"),l(24,"Thursday"),n(),o(25,"td"),l(26,"902"),n()(),o(27,"tr")(28,"td"),l(29,"Friday"),n(),o(30,"td"),l(31,"30"),n()()()()),t&2&&m("data",D(2,za))("labels",D(3,Ba))},dependencies:[$o,me],encapsulation:2});let i=e;return i})();var Ka={selector:"cookbook-checkbox-confirm-example",template:'<kirby-checkbox attentionLevel="1" [checked]="true" text="Confirm terms"></kirby-checkbox>'},p0=(()=>{let e=class e{constructor(){this.template=Ka.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-confirm-example"]],decls:1,vars:1,consts:[["attentionLevel","1","text","Confirm terms",3,"checked"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0),t&2&&m("checked",!0)},dependencies:[B],encapsulation:2});let i=e;return i})();var qa={selector:"cookbook-checkbox-default-example",template:`<kirby-checkbox [checked]="true" text="Checkbox 1"></kirby-checkbox>
<kirby-checkbox [checked]="false" text="Checkbox 2"></kirby-checkbox>
<kirby-checkbox [checked]="false" text="Checkbox 3"></kirby-checkbox>`},g0=(()=>{let e=class e{constructor(){this.template=qa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-default-example"]],decls:3,vars:3,consts:[["text","Checkbox 1",3,"checked"],["text","Checkbox 2",3,"checked"],["text","Checkbox 3",3,"checked"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)(1,"kirby-checkbox",1)(2,"kirby-checkbox",2),t&2&&(m("checked",!0),c(),m("checked",!1),c(),m("checked",!1))},dependencies:[B],encapsulation:2});let i=e;return i})();function Ha(i,e){if(i&1&&(o(0,"kirby-item"),p(1,"kirby-checkbox",2),o(2,"kirby-label"),l(3),n()()),i&2){let s=e.$implicit;c(),m("checked",s.checked),c(2),k(s.label)}}var un={selector:"cookbook-checkbox-list-example",template:`<kirby-list [items]="checkboxItems" [showDivider]="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-checkbox
      slot="start"
      [checked]="item.checked"
    ></kirby-checkbox>
    <kirby-label>{{ item.label }}</kirby-label>
  </kirby-item>
</kirby-list>`,codeSnippet:`checkboxItems = [
  { label: 'Checkbox 1', checked: true },
  { label: 'Checkbox 2', checked: false },
  { label: 'Checkbox 3', checked: false },
];`},C0=(()=>{let e=class e{constructor(){this.template=un.template,this.codeSnippet=un.codeSnippet,this.checkboxItems=[{label:"Checkbox 1",checked:!0},{label:"Checkbox 2",checked:!1},{label:"Checkbox 3",checked:!1}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-list-example"]],decls:2,vars:2,consts:[[3,"items","showDivider"],[4,"kirbyListItemTemplate"],["slot","start",3,"checked"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),x(1,Ha,4,2,"kirby-item",1),n()),t&2&&m("items",a.checkboxItems)("showDivider",!0)},dependencies:[H,h,B,N],encapsulation:2});let i=e;return i})();var Wa={selector:"cookbook-checkbox-states-example",template:`<kirby-checkbox text="Default"></kirby-checkbox>
<kirby-checkbox disabled="true" text="Disabled"></kirby-checkbox>
<kirby-checkbox [checked]="true" text="Checked"></kirby-checkbox>
<kirby-checkbox disabled="true" [checked]="true" text="Disabled checked"></kirby-checkbox>
<kirby-checkbox [indeterminate]="true" text="Indeterminate"></kirby-checkbox>
<kirby-checkbox [indeterminate]="true" text="Disabled Indeterminate" [disabled]="true"></kirby-checkbox>
<kirby-checkbox hasError="true" text="Has error"></kirby-checkbox>`},_0=(()=>{let e=class e{constructor(){this.template=Wa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-states-example"]],decls:7,vars:5,consts:[["text","Default"],["disabled","true","text","Disabled"],["text","Checked",3,"checked"],["disabled","true","text","Disabled checked",3,"checked"],["text","Indeterminate",3,"indeterminate"],["text","Disabled Indeterminate",3,"indeterminate","disabled"],["hasError","true","text","Has error"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)(1,"kirby-checkbox",1)(2,"kirby-checkbox",2)(3,"kirby-checkbox",3)(4,"kirby-checkbox",4)(5,"kirby-checkbox",5)(6,"kirby-checkbox",6),t&2&&(c(2),m("checked",!0),c(),m("checked",!0),c(),m("indeterminate",!0),c(),m("indeterminate",!0)("disabled",!0))},dependencies:[B],styles:["[_nghost-%COMP%]{max-width:500px;display:grid;grid-template-columns:1fr 1fr;gap:0 var(--kirby-spacing-s)}"]});let i=e;return i})();var Va={selector:"cookbook-checkbox-sizes-example",template:`<kirby-checkbox size="xs" text="Extra Small"></kirby-checkbox>
<kirby-divider [hasMargin]="true"></kirby-divider>
<kirby-checkbox size="sm" text="Small"></kirby-checkbox>
<kirby-checkbox size="md" text="Medium (default)"></kirby-checkbox>`},T0=(()=>{let e=class e{constructor(){this.template=Va.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-sizes-example"]],decls:4,vars:1,consts:[["size","xs","text","Extra Small"],[3,"hasMargin"],["size","sm","text","Small"],["size","md","text","Medium (default)"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)(1,"kirby-divider",1)(2,"kirby-checkbox",2)(3,"kirby-checkbox",3),t&2&&(c(),m("hasMargin",!0))},dependencies:[B,Ze],styles:['.kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}kirby-checkbox[_ngcontent-%COMP%], kirby-radio[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-xxs);background-color:var(--kirby-semi-light);position:relative}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:after{height:100%;border:1px solid var(--kirby-danger);position:absolute;right:0}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:before{content:"";border-left:0;border-right:0;width:calc(var(--kirby-spacing-xxs) + 1px)}kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:after{content:"md: 56px";border-left:0;border-top:0;border-bottom:0;line-height:56px;font-size:var(--kirby-font-size-xs);color:var(--kirby-danger);padding-right:var(--kirby-spacing-xxs);margin-right:calc(var(--kirby-spacing-xxs) * .5);vertical-align:center}kirby-radio.xs[_ngcontent-%COMP%]:after{content:"xs: 32px";line-height:32px}kirby-radio.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-radio.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox.xs[_ngcontent-%COMP%]:after{content:"xs: 24px";line-height:24px}kirby-checkbox.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-checkbox.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox[_ngcontent-%COMP%]     ion-checkbox, kirby-radio[_ngcontent-%COMP%]     ion-radio{background-color:#f7e0f0;margin-right:80px}']});let i=e;return i})();var Ra={selector:"cookbook-checkbox-multiline-example",template:`<kirby-checkbox
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,&#10; sed do eiusmod tempor incididunt ut labore et dolore &#10; magna aliqua.">
</kirby-checkbox>`},D0=(()=>{let e=class e{constructor(){this.template=Ra.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-multiline-example"]],decls:1,vars:0,consts:[["text",`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 sed do eiusmod tempor incididunt ut labore et dolore 
 magna aliqua.`]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)},dependencies:[B],encapsulation:2});let i=e;return i})();var gn={selector:"cookbook-checkbox-events-example",template:`<kirby-checkbox
  (checkedChange)="onCheckedChange($event)"
  text="Toggle to see 'checkedChange' event in action">
</kirby-checkbox>`,codeSnippet:`onCheckedChange(checked: boolean) {
  ...
}`},F0=(()=>{let e=class e{constructor(r){this.toastController=r,this.template=gn.template,this.codeSnippet=gn.codeSnippet}onCheckedChange(r){let t={message:`Checkbox changed - checked: ${r}`,messageType:r?"success":"warning",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-events-example"]],decls:1,vars:0,consts:[["text","Toggle to see 'checkedChange' event in action",3,"checkedChange"]],template:function(t,a){t&1&&(o(0,"kirby-checkbox",0),b("checkedChange",function(C){return a.onCheckedChange(C)}),n())},dependencies:[B],encapsulation:2});let i=e;return i})();function Ga(i,e){if(i&1&&(o(0,"kirby-item"),p(1,"kirby-checkbox",3),o(2,"kirby-label"),l(3),n()()),i&2){let s=e.$implicit;c(),m("checked",s.checked),c(2),k(s.label)}}var yn={selector:"cookbook-indeterminate-checkbox-list-example",template:`<kirby-checkbox [checked]="allChecked" [indeterminate]="indeterminate" (click)="toggleAll()" [text]="'Select all'"></kirby-checkbox>
<kirby-list [items]="checkboxItems" [showDivider]="true" (itemSelect)="itemSelected($event)">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-checkbox
      slot="start"
      [checked]="item.checked"
    ></kirby-checkbox>
    <kirby-label>{{ item.label }}</kirby-label>
  </kirby-item>
</kirby-list>`,codeSnippet:`allChecked = false;
  indeterminate = true;

  checkboxItems = [
    { label: 'Checkbox 1', checked: true },
    { label: 'Checkbox 2', checked: false },
    { label: 'Checkbox 3', checked: false },
  ];

  toggleAll() {
    this.allChecked = !this.allChecked;
    this.indeterminate = false;

    this.checkboxItems.forEach((item) => {
      item.checked = this.allChecked;
    });
  }

  itemSelected(event) {
    // flip checked state
    const index = this.checkboxItems.findIndex((item) => item.label === event.label);
    this.checkboxItems[index].checked = !event.checked;

    // update allChecked and indeterminate states
    const checked = this.checkboxItems.filter((item) => item.checked).length;
    if (checked === 0) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (checked === this.checkboxItems.length) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.allChecked = false;
      this.indeterminate = true;
    }
  }`},N0=(()=>{let e=class e{constructor(){this.template=yn.template,this.codeSnippet=yn.codeSnippet,this.allChecked=!1,this.indeterminate=!0,this.checkboxItems=[{label:"Checkbox 1",checked:!0},{label:"Checkbox 2",checked:!1},{label:"Checkbox 3",checked:!1}]}toggleAll(){this.allChecked=!this.allChecked,this.indeterminate=!1,this.checkboxItems.forEach(r=>{r.checked=this.allChecked})}itemSelected(r){let t=this.checkboxItems.findIndex(g=>g.label===r.label);this.checkboxItems[t].checked=!r.checked;let a=this.checkboxItems.filter(g=>g.checked).length;a===0?(this.allChecked=!1,this.indeterminate=!1):a===this.checkboxItems.length?(this.allChecked=!0,this.indeterminate=!1):(this.allChecked=!1,this.indeterminate=!0)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-indeterminate-checkbox-list-example"]],decls:3,vars:5,consts:[[3,"click","checked","indeterminate","text"],[3,"itemSelect","items","showDivider"],[4,"kirbyListItemTemplate"],["slot","start",3,"checked"]],template:function(t,a){t&1&&(o(0,"kirby-checkbox",0),b("click",function(){return a.toggleAll()}),n(),o(1,"kirby-list",1),b("itemSelect",function(C){return a.itemSelected(C)}),x(2,Ga,4,2,"kirby-item",2),n()),t&2&&(m("checked",a.allChecked)("indeterminate",a.indeterminate)("text","Select all"),c(),m("items",a.checkboxItems)("showDivider",!0))},dependencies:[H,h,B,N],encapsulation:2});let i=e;return i})();var kn=[{title:"Name",sortable:!0,sortDirection:"asc",textAlignment:"start",iconAlignment:"end",active:!1},{title:"Eyes"},{title:"Gender"},{title:"Hair"},{title:"Skin"},{title:"Birth year"},{title:"Height (cm)",sortable:!0,sortDirection:"asc",textAlignment:"end",iconAlignment:"start",active:!1},{title:"Weight (kg)",sortable:!0,sortDirection:"desc",textAlignment:"end",iconAlignment:"start",active:!1}],Ut=[{name:"Luke Skywalker",height:172,mass:77,hair_color:"blond",skin_color:"fair",eye_color:"blue",birth_year:"19BBY",gender:"male"},{name:"C-3PO",height:167,mass:75,hair_color:"n/a",skin_color:"gold",eye_color:"yellow",birth_year:"112BBY",gender:"n/a"},{name:"R2-D2",height:96,mass:32,hair_color:"n/a",skin_color:"white, blue",eye_color:"red",birth_year:"33BBY",gender:"n/a"},{name:"Darth Vader",height:202,mass:136,hair_color:"none",skin_color:"white",eye_color:"yellow",birth_year:"41.9BBY",gender:"male"},{name:"Leia Organa",height:150,mass:49,hair_color:"brown",skin_color:"light",eye_color:"brown",birth_year:"19BBY",gender:"female"},{name:"Obi-Wan Kenobi",height:182,mass:77,hair_color:"auburn, white",skin_color:"fair",eye_color:"blue-gray",birth_year:"57BBY",gender:"male"}];var $a=(i,e)=>e.name;function ja(i,e){if(i&1&&(se(0,"tr")(1,"td"),l(2),ne(),se(3,"td",1),l(4),ne(),se(5,"td",1),l(6),ne()()),i&2){let s=e.$implicit;c(2),k(s.name),c(2),k(s.height),c(2),k(s.mass)}}var Ua={selector:"cookbook-data-table-default-example",template:`<table class="kirby-table layout-fixed">
    <thead>
      <tr>
        <th>Name</th>
        <th style="text-align:right;">Height (cm)</th>
        <th style="text-align:right;">Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      @for (rowData of tableData; track rowData.name) {
        <tr>
          <td>{{rowData.name}}</td>
          <td style="text-align:right;">{{rowData.height}}</td>
          <td style="text-align:right;">{{rowData.mass}}</td>
        </tr>
      }
    </tbody>
  </table>`},V0=(()=>{let e=class e{constructor(){this.template=Ua.template,this.tableData=Ut.slice(0,3),this.dataSnippet=`tableData = ${ze(this.tableData.map(r=>{let{name:t,height:a,mass:g}=r;return{name:t,height:a,mass:g}}))};`}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-data-table-default-example"]],decls:12,vars:0,consts:[[1,"kirby-table","layout-fixed"],[2,"text-align","right"]],template:function(t,a){t&1&&(se(0,"table",0)(1,"thead")(2,"tr")(3,"th"),l(4,"Name"),ne(),se(5,"th",1),l(6,"Height (cm)"),ne(),se(7,"th",1),l(8,"Weight (kg)"),ne()()(),se(9,"tbody"),K(10,ja,7,3,"tr",null,$a),ne()()),t&2&&(c(10),q(a.tableData))},encapsulation:2});let i=e;return i})();var Ya=(i,e)=>e.name;function Qa(i,e){if(i&1){let s=P();o(0,"tr",3),b("click",function(){let t=S(s).$index,a=y();return M(a.onClickRow(t))}),o(1,"td"),l(2),n(),o(3,"td"),l(4),n(),o(5,"td"),l(6),n(),o(7,"td"),l(8),n(),o(9,"td"),l(10),n(),o(11,"td"),l(12),n(),o(13,"td",1),l(14),n(),o(15,"td",1),l(16),n()()}if(i&2){let s=e.$implicit;c(2),k(s.name),c(2),k(s.eye_color),c(2),k(s.gender),c(2),k(s.hair_color),c(2),k(s.skin_color),c(2),k(s.birth_year),c(2),k(s.height),c(2),k(s.mass)}}var Ja={selector:"cookbook-data-table-card-example",template:`<kirby-card>
  <table class="kirby-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Eyes</th>
        <th>Gender</th>
        <th>Hair</th>
        <th>Skin</th>
        <th>Birth year</th>
        <th style="text-align:right;">Height (cm)</th>
        <th style="text-align:right;">Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      @for (rowData of tableData; track rowData.name; let i = $index) {
        <tr class="kirby-selectable-row" (click)="onClickRow(i)">
          <td>{{rowData.name}}</td>
          <td>{{rowData.eye_color}}</td>
          <td>{{rowData.gender}}</td>
          <td>{{rowData.hair_color}}</td>
          <td>{{rowData.skin_color}}</td>
          <td>{{rowData.birth_year}}</td>
          <td style="text-align:right;">{{rowData.height}}</td>
          <td style="text-align:right;">{{rowData.mass}}</td>
        </tr>
      }
    </tbody>
  </table>
</kirby-card>`},j0=(()=>{let e=class e{constructor(r){this.toastController=r,this.tableData=[...Ut],this.template=Ja.template}onClickRow(r){this.toastController.showToast({message:`You pressed row with index: ${r}`,messageType:"success",durationInMs:2e3})}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-data-table-card-example"]],decls:23,vars:0,consts:[[1,"kirby-table"],[2,"text-align","right"],[1,"kirby-selectable-row"],[1,"kirby-selectable-row",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-card")(1,"table",0)(2,"thead")(3,"tr")(4,"th"),l(5,"Name"),n(),o(6,"th"),l(7,"Eyes"),n(),o(8,"th"),l(9,"Gender"),n(),o(10,"th"),l(11,"Hair"),n(),o(12,"th"),l(13,"Skin"),n(),o(14,"th"),l(15,"Birth year"),n(),o(16,"th",1),l(17,"Height (cm)"),n(),o(18,"th",1),l(19,"Weight (kg)"),n()()(),o(20,"tbody"),K(21,Qa,17,8,"tr",2,Ya),n()()()),t&2&&(c(21),q(a.tableData))},dependencies:[T],encapsulation:2});let i=e;return i})();var Za=(i,e)=>e.title,Xa=(i,e)=>e.name;function el(i,e){if(i&1){let s=P();o(0,"th",2),b("click",function(){let t=S(s),a=t.$implicit,g=t.$index,C=y();return M(C.sortData(g,a.title))}),l(1),n()}if(i&2){let s=e.$implicit;m("sortable",s.sortable)("sortDirection",s.sortDirection)("iconAlignment",s.iconAlignment)("alignment",s.textAlignment)("active",s.active),c(),_(" ",s.title," ")}}function tl(i,e){if(i&1&&(o(0,"tr")(1,"td"),l(2),n(),o(3,"td"),l(4),n(),o(5,"td"),l(6),n(),o(7,"td"),l(8),n(),o(9,"td"),l(10),n(),o(11,"td"),l(12),n(),o(13,"td",3),l(14),n(),o(15,"td",3),l(16),n()()),i&2){let s=e.$implicit;c(2),k(s.name),c(2),k(s.eye_color),c(2),k(s.gender),c(2),k(s.hair_color),c(2),k(s.skin_color),c(2),k(s.birth_year),c(2),k(s.height),c(2),k(s.mass)}}var Ki={selector:"cookbook-data-table-sortable-example",template:`<kirby-card>
  <table class="kirby-table">
    <thead>
      <tr>
        @for (heading of headings; track heading.title; let i = $index) {
          <th
            [sortable]="heading.sortable"
            [sortDirection]="heading.sortDirection"
            [iconAlignment]="heading.iconAlignment"
            [alignment]="heading.textAlignment"
            [active]="heading.active"
            (click)="sortData(i, heading.title)"
          >
           {{heading.title}}
          </th>
        }

      </tr>
    </thead>
    <tbody>
      @for (rowData of tableData; track rowData.name; let i = $index) {
        <tr>
            <td>{{rowData.name}}</td>
            <td>{{rowData.eye_color}}</td>
            <td>{{rowData.gender}}</td>
            <td>{{rowData.hair_color}}</td>
            <td>{{rowData.skin_color}}</td>
            <td>{{rowData.birth_year}}</td>
            <td class="text-align-right">{{rowData.height}}</td>
            <td class="text-align-right">{{rowData.mass}}</td>
        </tr>
      }
    </tbody>
  </table>
</kirby-card>`,importSnippet:`import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';

@Component({
  selector: 'my-component'
  standalone: true
  imports: [TableSortableComponent],
})
export class MyComponent {}

// OR

@NgModule({
  imports: [TableSortableComponent],
})
export class MyModule {}`,sortingSnippet:`headings = [
  { title: 'Name', sortable: true, sortDirection: 'asc', active: true },
  { title: 'Eyes' },
  ...
]`},Z0=(()=>{let e=class e{constructor(){this.tableData=Ut,this.headings=kn,this.template=Ki.template,this.importSnippet=Ki.importSnippet,this.sortingSnippet=Ki.sortingSnippet}ngOnInit(){this.headings[0].sortDirection="desc",this.sortData(0,"Name")}sortData(r,t){this.headings[r].active=this._activeHelper(r),this.headings[r].sortDirection=this.headings[r].sortDirection=="asc"?"desc":"asc",this.tableData.sort((a,g)=>{switch(t){case"Name":return this._sortHelper(a.name,g.name,this.headings[r].sortDirection);case"Height (cm)":return this._sortHelper(a.height,g.height,this.headings[r].sortDirection);case"Weight (kg)":return this._sortHelper(a.mass,g.mass,this.headings[r].sortDirection)}})}_sortHelper(r,t,a){return a=="asc"?r>t?1:r<t?-1:0:r<t?1:r>t?-1:0}_activeHelper(r){return this.headings[r].active||this.headings.forEach(t=>{t.active=!1}),!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-data-table-sortable-example"]],decls:9,vars:0,consts:[[1,"kirby-table"],[3,"sortable","sortDirection","iconAlignment","alignment","active"],[3,"click","sortable","sortDirection","iconAlignment","alignment","active"],[1,"text-align-right"]],template:function(t,a){t&1&&(o(0,"kirby-card")(1,"table",0)(2,"thead")(3,"tr"),K(4,el,2,6,"th",1,Za),n()(),o(6,"tbody"),K(7,tl,17,8,"tr",null,Xa),n()()()),t&2&&(c(4),q(a.headings),c(3),q(a.tableData))},dependencies:[T,Lo],encapsulation:2});let i=e;return i})();var il=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],ol={selector:"cookbook-dropdown-example-default",template:`<kirby-dropdown
  aria-label="Choose your favorite fruit"
  placeholder="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>
`},ty=(()=>{let e=class e{constructor(){this.template=ol.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-default"]],decls:1,vars:2,consts:[["aria-label","Choose your favorite fruit","placeholder","Choose your favorite fruit",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,il))},dependencies:[Q],encapsulation:2});let i=e;return i})();var nl=()=>["Apple","Banana","Blackberry","Blueberry","Carrot","Cherry","Cucumber","Date","Eggplant","Fig","Grapes","Kiwi","Lemon","Mango","Orange","Peach"],rl={selector:"cookbook-dropdown-example-scroll",template:`<kirby-dropdown
  aria-label="Choose your favorite fruit"
  placeholder="Dropdown with scroll (> 8 items)"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Carrot',
    'Cherry',
    'Cucumber',
    'Date',
    'Eggplant',
    'Fig',
    'Grapes',
    'Kiwi',
    'Lemon',
    'Mango',
    'Orange',
    'Peach'
    ]"
></kirby-dropdown>`},ny=(()=>{let e=class e{constructor(){this.template=rl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-scroll"]],decls:1,vars:2,consts:[["aria-label","Choose your favorite fruit","placeholder","Dropdown with scroll (> 8 items)",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,nl))},dependencies:[Q],encapsulation:2});let i=e;return i})();var al=()=>["Apple","Banana","Blackberry","Blueberry","Grapes (preselected)"],ll={selector:"cookbook-dropdown-example-pre-selected",template:`<kirby-dropdown
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes (preselected)',
    ]"
  [selectedIndex]="4"
></kirby-dropdown>`},ly=(()=>{let e=class e{constructor(){this.template=ll.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-pre-selected"]],decls:1,vars:3,consts:[["aria-label","Choose your favorite fruit",3,"items","selectedIndex"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(2,al))("selectedIndex",4)},dependencies:[Q],encapsulation:2});let i=e;return i})();var sl=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],cl={selector:"cookbook-dropdown-example-expand",template:`<kirby-dropdown
  placeholder="Block level Dropdown"
  aria-label="Choose your favorite fruit"
  expand="block"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>`},my=(()=>{let e=class e{constructor(){this.template=cl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-expand"]],decls:1,vars:2,consts:[["placeholder","Block level Dropdown","aria-label","Choose your favorite fruit","expand","block",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,sl))},dependencies:[Q],encapsulation:2});let i=e;return i})();var ml=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],fn={selector:"cookbook-dropdown-example-right-aligned",template:`<kirby-dropdown
  placeholder="Right aligned (opens left)"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
  popout="left"
></kirby-dropdown>`,styles:[`:host(.right-align) {
  display: flex;
}`,`kirby-dropdown {
  margin-left: auto;
}`]},by=(()=>{let e=class e{constructor(){this.template=fn.template,this.styles=fn.styles.join(`
`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-right-aligned"]],hostVars:2,hostBindings:function(t,a){t&2&&R("right-align",!0)},decls:1,vars:2,consts:[["placeholder","Right aligned (opens left)","aria-label","Choose your favorite fruit","popout","left",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,ml))},dependencies:[Q],styles:[".right-align[_nghost-%COMP%]{display:flex}","kirby-dropdown[_ngcontent-%COMP%]{margin-left:auto}"]});let i=e;return i})();function dl(i,e){if(i&1&&(o(0,"option",4),l(1),n()),i&2){let s=e.$implicit,r=y();m("value",De(s)),Ne("selected",r.themeColor===s?!0:null),c(),_(" Card color: ",s," ")}}var pl={selector:"cookbook-dropdown-example-attention-level",template:`<kirby-card hasPadding="true" class="attention-levels" [themeColor]="themeColor">
  <kirby-dropdown
    placeholder="Dropdown with attention level 2"
    aria-label="Choose your favorite fruit"
    attentionLevel="2"
    expand="block"
    [items]="items">
  </kirby-dropdown>

  <kirby-dropdown
    placeholder="Dropdown with attention level 3"
    aria-label="Choose your favorite fruit"
    attentionLevel="3"
    expand="block"
    [items]="items">
  </kirby-dropdown>
</kirby-card>

<div>
  <select (change)="onChange($event.target.value)">
    @for (color of themeColors; track $index) {
      <option
        value="{{ color }}"
        [attr.selected]="themeColor === color ? true : null"
      >
        Card color: {{ color }}
      </option>
    }
  </select>
</div>
`},fy=(()=>{let e=class e{constructor(){this.template=pl.template,this.items=["Apple","Banana","Blackberry","Blueberry","Grapes"],this.themeColors=["light","white","dark"],this.themeColor="white"}onChange(r){this.themeColor=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-attention-level"]],decls:7,vars:3,consts:[["hasPadding","true",1,"attention-levels",3,"themeColor"],["placeholder","Dropdown with attention level 2","aria-label","Choose your favorite fruit","attentionLevel","2","expand","block",3,"items"],["placeholder","Dropdown with attention level 3","aria-label","Choose your favorite fruit","attentionLevel","3","expand","block",3,"items"],[3,"change"],[3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-card",0),p(1,"kirby-dropdown",1)(2,"kirby-dropdown",2),n(),o(3,"div")(4,"select",3),b("change",function(C){return a.onChange(C.target.value)}),K(5,dl,2,4,"option",4,ei),n()()),t&2&&(m("themeColor",a.themeColor),c(),m("items",a.items),c(),m("items",a.items),c(3),q(a.themeColors))},dependencies:[T,Y,Q],styles:["kirby-card[_ngcontent-%COMP%]{margin-block:var(--kirby-spacing-m);max-width:fit-content}kirby-card[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%] + kirby-dropdown[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}kirby-card.attention-levels[_ngcontent-%COMP%]{max-width:320px}p[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}.column-layout[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;gap:var(--kirby-spacing-m)}.constrain-width[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%]{max-width:fit-content}"]});let i=e;return i})();var bl={selector:"cookbook-dropdown-example-item-select",template:`<kirby-dropdown
  placeholder="Dropdown with event handler"
  aria-label="Choose your favorite fruit"
  [items]="items"
  (change)="onItemSelect($event)"
></kirby-dropdown>`},vy=(()=>{let e=class e{constructor(r){this.toastController=r,this.template=bl.template,this.items=[{id:11,text:"Apple"},{id:22,text:"Banana"},{id:33,text:"Blackberry"},{id:44,text:"Blueberry"},{id:55,text:"Grapes"}]}onItemSelect(r){let t={message:`Item '${r.text} (id=${r.id})' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-item-select"]],decls:1,vars:1,consts:[["placeholder","Dropdown with event handler","aria-label","Choose your favorite fruit",3,"change","items"]],template:function(t,a){t&1&&(o(0,"kirby-dropdown",0),b("change",function(C){return a.onItemSelect(C)}),n()),t&2&&m("items",a.items)},dependencies:[Q],encapsulation:2});let i=e;return i})();function ul(i,e){i&1&&p(0,"kirby-icon",5)}function gl(i,e){if(i&1&&(o(0,"kirby-item",4),O(1,ul,1,0,"kirby-icon",5),o(2,"kirby-label")(3,"p",6),l(4),n(),o(5,"p",7),l(6),n()(),o(7,"kirby-label",8)(8,"data"),l(9,"Value"),n(),o(10,"data",7),l(11),n()()()),i&2){let s=e.$implicit,r=e.selected,t=e.focused;R("focused",t),m("selected",r),c(),I(r?1:-1),c(3),k(s.title),c(2),k(s.subtitle),c(5),k(s.value)}}var yl={selector:"cookbook-dropdown-example-custom-item-template",template:`<kirby-dropdown #dropdown
  placeholder="Dropdown with custom item template"
  aria-label="Choose your custom item"
  [items]="items"
  itemTextProperty="title">
  <kirby-item
    *kirbyListItemTemplate="let item; let selected = selected; let focused = focused"
    selectable="true"
    [selected]="selected"
    [class.focused]="focused"
  >
    @if (selected) {
      <kirby-icon name="checkmark-selected" slot="start"></kirby-icon>
    }
    <kirby-label>
      <p class="kirby-item-title">{{ item.title }}</p>
      <p class="kirby-item-detail">{{ item.subtitle }}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
      <data class="kirby-item-detail">{{ item.value }}</data>
    </kirby-label>
  </kirby-item>
</kirby-dropdown>
<p class="selection">Selected item: {{ dropdown.value | json }}</p>`,styles:[`.selection {
    margin-left: 12px;
    font-size: 12px;
    font-style: italic;
  }`]},Ey=(()=>{let e=class e{constructor(){this.template=yl.template,this.items=[{title:"Item 1",subtitle:"Bacon ipsum dolor",value:1},{title:"Item 2",subtitle:"Tenderloin short loin frankfurter",value:2},{title:"Item 3",subtitle:"Salami andouille hamburger",value:3},{title:"Item 4",subtitle:"Tongue bresaola tail swine",value:4},{title:"Item 5",subtitle:"Drumstick pastrami sirloin ",value:5}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-custom-item-template"]],decls:6,vars:4,consts:[["dropdown",""],["placeholder","Dropdown with custom item template","aria-label","Choose your custom item","itemTextProperty","title",3,"items"],["selectable","true",3,"selected","focused",4,"kirbyListItemTemplate"],[1,"selection"],["selectable","true",3,"selected"],["name","checkmark-selected","slot","start"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){if(t&1&&(o(0,"kirby-dropdown",1,0),x(2,gl,12,7,"kirby-item",2),n(),o(3,"p",3),l(4),Z(5,"json"),n()),t&2){let g=X(1);m("items",a.items),c(4),_("Selected item: ",re(5,2,g.value))}},dependencies:[Q,w,h,z,N,Qe],styles:[".selection[_ngcontent-%COMP%]{margin-left:12px;font-size:12px;font-style:italic}"]});let i=e;return i})();var hn={selector:"cookbook-dropdown-example-ng-forms",template:`<form [formGroup]="form">
  <kirby-form-field [label]="'Label'" [message]="'Message'">
    <kirby-dropdown
      formControlName="favoriteFood"
      placeholder="Dropdown in form"
      [items]="items"
      [hasError]="favoriteRequired && !form.controls['favoriteFood']?.valid"
      itemTextProperty="title"
    ></kirby-dropdown>
  </kirby-form-field>
</form>
<fieldset>
  <legend>Configuration</legend>
  <kirby-checkbox
    [checked]="canSelectFavorite"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
    size="xs">
  </kirby-checkbox>
  <kirby-checkbox
    [checked]="favoriteRequired"
    (checkedChange)="toggleRequired($event)"
    text="Form field required"
    size="xs">
  </kirby-checkbox>
  <p class="selection">
    form.value: {{ form.value | json }}<br />
    form.favoriteFood:
      <span [class.state-true]="favoriteFoodControl.valid">valid: {{ favoriteFoodControl.valid }}</span>
      <span [class.state-true]="favoriteFoodControl.enabled">enabled: {{ favoriteFoodControl.enabled }}</span>
      <span [class.state-true]="favoriteFoodControl.touched">touched: {{ favoriteFoodControl.touched }}</span>
  </p>
</fieldset>`,codeSnippet:`form = new FormGroup({
  favoriteFood: new FormControl({ value: this.items[2], disabled: !this.canSelectFavorite }),
});

toggleEnabled(enabled: boolean) {
  const favoriteFoodControl = this.form.controls['favoriteFood'];
  enabled
    ? favoriteFoodControl.enable()
    : favoriteFoodControl.disable();
}

toggleRequired(required: boolean) {
  const favoriteFoodControl = this.form.controls['favoriteFood'];
  required
    ? favoriteFoodControl.setValidators(Validators.required)
    : favoriteFoodControl.setValidators(null);
  favoriteFoodControl.updateValueAndValidity();
}`,styles:[`.selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }`,`span {
      background-color: #ff595e;
      margin-right: 4px;
      padding: 0px 2px;
      border-radius: 4px;
    }`,`span.state-true {
      background-color: #2cf287;
    }`]},Ay=(()=>{let e=class e{constructor(){this.template=hn.template.split("<fieldset>")[0],this.codeSnippet=hn.codeSnippet,this.canSelectFavorite=!0,this.favoriteRequired=!1,this.items=[{title:"Bacon",subtitle:"Bacon ipsum dolor",value:1},{title:"Salami",subtitle:"Salami andouille hamburger",value:2},{title:"Tenderloin",subtitle:"Tenderloin short loin frankfurter",value:3},{title:"Tongue",subtitle:"Tongue bresaola tail swine",value:4},{title:"Drumstick",subtitle:"Drumstick pastrami sirloin ",value:5}]}ngOnInit(){this.buildForm()}toggleEnabled(r){this.canSelectFavorite=r,r?this.favoriteFoodControl.enable():this.favoriteFoodControl.disable()}toggleRequired(r){this.favoriteRequired=r,r?this.favoriteFoodControl.setValidators(Bt.required):this.favoriteFoodControl.setValidators(null),this.favoriteFoodControl.updateValueAndValidity()}buildForm(){this.favoriteFoodControl=new oi(null,this.favoriteRequired?Bt.required:null),this.canSelectFavorite||this.favoriteFoodControl.disable(),this.form=new ii({favoriteFood:this.favoriteFoodControl})}get favFoodControl(){return this.form.controls.favoriteFood}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-ng-forms"]],decls:19,vars:19,consts:[[3,"formGroup"],[3,"label","message"],["formControlName","favoriteFood","placeholder","Dropdown in form","itemTextProperty","title",3,"items","hasError"],["text","Form field enabled","size","xs",3,"checkedChange","checked"],["text","Form field required","size","xs",3,"checkedChange","checked"],[1,"selection"]],template:function(t,a){t&1&&(o(0,"form",0)(1,"kirby-form-field",1),p(2,"kirby-dropdown",2),n()(),o(3,"fieldset")(4,"legend"),l(5,"Configuration"),n(),o(6,"kirby-checkbox",3),b("checkedChange",function(C){return a.toggleEnabled(C)}),n(),o(7,"kirby-checkbox",4),b("checkedChange",function(C){return a.toggleRequired(C)}),n(),o(8,"p",5),l(9),Z(10,"json"),p(11,"br"),l(12," form.favoriteFood: "),o(13,"span"),l(14),n(),o(15,"span"),l(16),n(),o(17,"span"),l(18),n()()()),t&2&&(m("formGroup",a.form),c(),m("label","Label")("message","Message"),c(),m("items",a.items)("hasError",a.favoriteRequired&&!(a.form.controls.favoriteFood!=null&&a.form.controls.favoriteFood.valid)),c(4),m("checked",a.canSelectFavorite),c(),m("checked",a.favoriteRequired),c(2),_(" form.value: ",re(10,17,a.form.value)),c(4),R("state-true",a.favoriteFoodControl.valid),c(),_("valid: ",a.favoriteFoodControl.valid),c(),R("state-true",a.favoriteFoodControl.enabled),c(),_("enabled: ",a.favoriteFoodControl.enabled),c(),R("state-true",a.favoriteFoodControl.touched),c(),_("touched: ",a.favoriteFoodControl.touched))},dependencies:[ye,ve,be,Ce,we,_e,xe,Q,B,F,Qe],styles:[".selection[_ngcontent-%COMP%]{margin:0;font-size:12px;line-height:16px;font-style:italic}","span[_ngcontent-%COMP%]{background-color:#ff595e;margin-right:4px;padding:0 2px;border-radius:4px}","span.state-true[_ngcontent-%COMP%]{background-color:#2cf287}"]});let i=e;return i})();var qi=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],kl={selector:"cookbook-dropdown-example-states",template:`<kirby-dropdown
  [placeholder]="'Choose your favorite fruit'"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>

<kirby-dropdown
  [disabled]="true"
  [placeholder]="'Choose your favorite fruit'"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>

<kirby-dropdown
  [hasError]="true"
  [placeholder]="'Choose your favorite fruit'"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>
`},Ny=(()=>{let e=class e{constructor(){this.template=kl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-states"]],decls:4,vars:11,consts:[[1,"column-layout","constrain-width"],["aria-label","Choose your favorite fruit",3,"placeholder","items"],["aria-label","Choose your favorite fruit",3,"disabled","placeholder","items"],["aria-label","Choose your favorite fruit",3,"hasError","placeholder","items"]],template:function(t,a){t&1&&(o(0,"div",0),p(1,"kirby-dropdown",1)(2,"kirby-dropdown",2)(3,"kirby-dropdown",3),n()),t&2&&(c(),m("placeholder","Choose your favorite fruit")("items",D(8,qi)),c(),m("disabled",!0)("placeholder","Choose your favorite fruit")("items",D(9,qi)),c(),m("hasError",!0)("placeholder","Choose your favorite fruit")("items",D(10,qi)))},dependencies:[Q],styles:["kirby-card[_ngcontent-%COMP%]{margin-block:var(--kirby-spacing-m);max-width:fit-content}kirby-card[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%] + kirby-dropdown[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}kirby-card.attention-levels[_ngcontent-%COMP%]{max-width:320px}p[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}.column-layout[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;gap:var(--kirby-spacing-m)}.constrain-width[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%]{max-width:fit-content}"]});let i=e;return i})();var Cn=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],fl={selector:"cookbook-dropdown-example-form-field",template:`<kirby-form-field [label]="'Label for medium dropdown'" [message]="'Message'">
  <kirby-dropdown
    placeholder="Dropdown in form field"
    [items]="[
      'Apple',
      'Banana',
      'Blackberry',
      'Blueberry',
      'Grapes',
      ]"
  ></kirby-dropdown>
</kirby-form-field>

<kirby-form-field [label]="'Label for small dropdown'" [message]="'Message'">
  <kirby-dropdown
    placeholder="Dropdown in form field"
    [size]="'sm'"
    [items]="[
      'Apple',
      'Banana',
      'Blackberry',
      'Blueberry',
      'Grapes',
      ]"
  ></kirby-dropdown>
</kirby-form-field>
`},Wy=(()=>{let e=class e{constructor(){this.template=fl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-form-field"]],decls:5,vars:9,consts:[[1,"column-layout","constrain-width"],[3,"label","message"],["placeholder","Dropdown in form field",3,"items"],["placeholder","Dropdown in form field",3,"size","items"]],template:function(t,a){t&1&&(o(0,"div",0)(1,"kirby-form-field",1),p(2,"kirby-dropdown",2),n(),o(3,"kirby-form-field",1),p(4,"kirby-dropdown",3),n()()),t&2&&(c(),m("label","Label for medium dropdown")("message","Message"),c(),m("items",D(7,Cn)),c(),m("label","Label for small dropdown")("message","Message"),c(),m("size","sm")("items",D(8,Cn)))},dependencies:[Q,F],styles:["kirby-card[_ngcontent-%COMP%]{margin-block:var(--kirby-spacing-m);max-width:fit-content}kirby-card[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%] + kirby-dropdown[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}kirby-card.attention-levels[_ngcontent-%COMP%]{max-width:320px}p[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}.column-layout[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;gap:var(--kirby-spacing-m)}.constrain-width[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%]{max-width:fit-content}"]});let i=e;return i})();var hl={template:`<div class="message-type-container">
  <kirby-empty-state
    iconName="verify"
    themeColor="success"
    title="Success"
    subtitle="Additional messaging via subtitle"
  ></kirby-empty-state>
  <kirby-empty-state
    iconName="help"
    themeColor="warning"
    title="Warning"
    subtitle="Additional messaging via subtitle"
  ></kirby-empty-state>
  <kirby-empty-state
    iconName="overview-outline"
    title="Empty"
    subtitle="Additional messaging via subtitle"
  ></kirby-empty-state>
</div>`},$y=(()=>{let e=class e{constructor(){this.template=hl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-empty-state-message-types-example"]],decls:4,vars:0,consts:[[1,"message-type-container"],["iconName","verify","themeColor","success","title","Success","subtitle","Additional messaging via subtitle"],["iconName","help","themeColor","warning","title","Warning","subtitle","Additional messaging via subtitle"],["iconName","overview-outline","title","Empty","subtitle","Additional messaging via subtitle"]],template:function(t,a){t&1&&(o(0,"div",0),p(1,"kirby-empty-state",1)(2,"kirby-empty-state",2)(3,"kirby-empty-state",3),n())},dependencies:[He,Y],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:block;container-type:inline-size;padding:0 1rem}.message-type-container[_ngcontent-%COMP%]{display:flex;gap:1rem;justify-content:space-around}@container (width < 632px){.message-type-container[_ngcontent-%COMP%]{flex-direction:column}}"]});let i=e;return i})();var Cl={template:`<kirby-empty-state
  title="Simple"
  subtitle="A subtitle with a &#10; newline inserted in the template."
>
  <button kirby-button attentionLevel="1">Resolve state</button>
</kirby-empty-state>
`},Qy=(()=>{let e=class e{constructor(){this.template=Cl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-empty-state-simple-example"]],decls:3,vars:0,consts:[["title","Simple","subtitle",`A subtitle with a 
 newline inserted in the template.`],["kirby-button","","attentionLevel","1"]],template:function(t,a){t&1&&(o(0,"kirby-empty-state",0)(1,"button",1),l(2,"Resolve state"),n()())},dependencies:[He,f],encapsulation:2});let i=e;return i})();var vl={template:`<kirby-empty-state
  iconName="kirby"
  title="Button attention levels"
  subtitle="Additional messaging via subtitle"
>
  <button kirby-button attentionLevel="1">Primary action</button>
  <button kirby-button attentionLevel="2">Secondary action</button>
</kirby-empty-state>
`},ek=(()=>{let e=class e{constructor(){this.template=vl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-empty-state-buttons-example"]],decls:5,vars:0,consts:[["iconName","kirby","title","Button attention levels","subtitle","Additional messaging via subtitle"],["kirby-button","","attentionLevel","1"],["kirby-button","","attentionLevel","2"]],template:function(t,a){t&1&&(o(0,"kirby-empty-state",0)(1,"button",1),l(2,"Primary action"),n(),o(3,"button",2),l(4,"Secondary action"),n()())},dependencies:[He,f],encapsulation:2});let i=e;return i})();var ak=(()=>{let e=class e{constructor(r){this.toastController=r,this.disableFabSheet=!1,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(r){let t={message:`'${r.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-fab-sheet-example"]],inputs:{disableFabSheet:"disableFabSheet"},decls:3,vars:2,consts:[["horizontalAlignment","right",3,"disabled"],["name","write-message"],["header","Your action sheet header","subheader","Your action sheet subheader",3,"itemSelect","items"]],template:function(t,a){t&1&&(o(0,"kirby-fab-sheet",0),p(1,"kirby-icon",1),o(2,"kirby-action-sheet",2),b("itemSelect",function(C){return a.onItemSelect(C)}),n()()),t&2&&(m("disabled",a.disableFabSheet),c(2),m("items",a.items))},dependencies:[bi,_o,w,pi],encapsulation:2});let i=e;return i})();var xl={selector:"cookbook-flag-example-colors",template:`<kirby-flag themeColor="success">Success</kirby-flag>
<kirby-flag themeColor="warning">Warning</kirby-flag>
<kirby-flag themeColor="danger">Danger</kirby-flag>
<kirby-flag themeColor="semi-light">Semi-Light</kirby-flag>
<kirby-flag themeColor="transparent" title="(default)">Transparent</kirby-flag>`},ck=(()=>{let e=class e{constructor(){this.template=xl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-flag-example-colors"]],decls:10,vars:0,consts:[["themeColor","success"],["themeColor","warning"],["themeColor","danger"],["themeColor","semi-light"],["themeColor","transparent","title","(default)"]],template:function(t,a){t&1&&(o(0,"kirby-flag",0),l(1,"Success"),n(),o(2,"kirby-flag",1),l(3,"Warning"),n(),o(4,"kirby-flag",2),l(5,"Danger"),n(),o(6,"kirby-flag",3),l(7,"Semi-Light"),n(),o(8,"kirby-flag",4),l(9,"Transparent"),n())},dependencies:[Le],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-s);flex-wrap:wrap}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s);margin-bottom:var(--kirby-spacing-s)}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-flag[_ngcontent-%COMP%]{position:relative}kirby-flag[title][_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}kirby-flag[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center}kirby-flag[title][title="(default)"][_ngcontent-%COMP%]:before{content:"(default)"}']});let i=e;return i})();var _l={selector:"cookbook-flag-example-sizes",template:`<kirby-flag size="xs">Extra Small (xs)</kirby-flag>
<kirby-flag size="sm">Small (sm)</kirby-flag>
<kirby-flag size="md" title="(default)">Medium (md)</kirby-flag>`},pk=(()=>{let e=class e{constructor(){this.template=_l.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-flag-example-sizes"]],decls:6,vars:0,consts:[["size","xs"],["size","sm"],["size","md","title","(default)"]],template:function(t,a){t&1&&(o(0,"kirby-flag",0),l(1,"Extra Small (xs)"),n(),o(2,"kirby-flag",1),l(3,"Small (sm)"),n(),o(4,"kirby-flag",2),l(5,"Medium (md)"),n())},dependencies:[Le],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:var(--kirby-spacing-s);flex-wrap:wrap}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s);margin-bottom:var(--kirby-spacing-s)}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-flag[_ngcontent-%COMP%]{position:relative}kirby-flag[title][_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}kirby-flag[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:var(--kirby-font-size-xs);text-align:center}kirby-flag[title][title="(default)"][_ngcontent-%COMP%]:before{content:"(default)"}']});let i=e;return i})();var vk=(()=>{let e=class e{constructor(){this.items=[{title:"Medium (md)",value:gi.medium},{title:"Large (lg) - default",value:gi.large}],this.size=gi.large,this.sizeChange=new pe,this.onChange=r=>{this.size=r.value,this.sizeChange.emit(r.value)}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-example-configuration"]],inputs:{size:"size"},outputs:{sizeChange:"sizeChange"},decls:8,vars:2,consts:[["itemTextProperty","title",3,"valueChange","items","selectedIndex"]],template:function(t,a){t&1&&(o(0,"fieldset")(1,"legend"),l(2,"Input field size for examples below"),n(),o(3,"p")(4,"strong"),l(5,"Size:"),n(),p(6,"br"),o(7,"kirby-radio-group",0),b("valueChange",function(C){return a.onChange(C)}),n()()()),t&2&&(c(7),m("items",a.items)("selectedIndex",1))},dependencies:[Io,ae],styles:["fieldset[_ngcontent-%COMP%]{display:inline-block}"]});let i=e;return i})();var wl={selector:"cookbook-form-field-input-example",template:`<kirby-form-field>
  <input kirby-input [size]="size" placeholder="Default input with placeholder text" />
</kirby-form-field>`},Sk=(()=>{let e=class e{constructor(){this.template=wl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["kirby-input","","placeholder","Default input with placeholder text",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field"),p(1,"input",0),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var Sl={selector:"cookbook-form-field-input-color-example",template:`<kirby-card hasPadding="true" [themeColor]="color">
    <kirby-form-field>
    <input kirby-input placeholder="Default input with placeholder text inside card" />
  </kirby-form-field>
</kirby-card>
<div class="card-option-button-group">
    <button (click)="setThemeColor('white')" class="white"></button>
    <button (click)="setThemeColor('light')" class="light"></button>
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>
`},Ok=(()=>{let e=class e{constructor(){this.color="white"}get template(){return Sl.template.split('<div class="card-option-button-group">')[0]}setThemeColor(r){this.color=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-color-example"]],decls:8,vars:1,consts:[["hasPadding","true",3,"themeColor"],["kirby-input","","placeholder","Default input with placeholder text inside card"],[1,"card-option-button-group"],[1,"white",3,"click"],[1,"light",3,"click"],[1,"secondary",3,"click"],[1,"dark",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-card",0)(1,"kirby-form-field"),p(2,"input",1),n()(),o(3,"div",2)(4,"button",3),b("click",function(){return a.setThemeColor("white")}),n(),o(5,"button",4),b("click",function(){return a.setThemeColor("light")}),n(),o(6,"button",5),b("click",function(){return a.setThemeColor("secondary")}),n(),o(7,"button",6),b("click",function(){return a.setThemeColor("dark")}),n()()),t&2&&m("themeColor",a.color)},dependencies:[T,Y,F,V],styles:[".card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:#fff;cursor:pointer}button.white[_ngcontent-%COMP%]{background-color:var(--kirby-white)}button.white[_ngcontent-%COMP%]:hover{background-color:var(--kirby-white-shade)}button.light[_ngcontent-%COMP%]{background-color:var(--kirby-light);outline:#fff 2px solid;border:#fff 2px solid}button.light[_ngcontent-%COMP%]:hover{background-color:var(--kirby-light-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var Ml={selector:"cookbook-form-field-input-label-example",template:`<kirby-form-field label="Input with label">
  <input kirby-input [size]="size" />
</kirby-form-field>`},Ak=(()=>{let e=class e{constructor(){this.template=Ml.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-label-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input with label"],["kirby-input","",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var Tl={selector:"cookbook-form-field-input-label-message-example",template:`<kirby-form-field label="Input with label and message" message="This is additional info that will be shown below the input">
  <input kirby-input [size]="size" />
</kirby-form-field>`},Kk=(()=>{let e=class e{constructor(){this.template=Tl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-label-message-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input with label and message","message","This is additional info that will be shown below the input"],["kirby-input","",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var El={selector:"cookbook-form-field-input-affix-example",template:`<kirby-form-field label="With prefix">
  <kirby-icon name="payment-card" kirby-affix="prefix"></kirby-icon>
   <input kirby-input placeholder="Enter your card number" [size]="size" />
</kirby-form-field>

<kirby-form-field label="With suffix">
  <input kirby-input [size]="size" type="number" placeholder="Monthly payments" [size]="size" />
  <span kirby-affix="suffix">kr/md</span>
</kirby-form-field>

<kirby-form-field label="With prefix and suffix">
  <kirby-icon name="search" kirby-affix="prefix"></kirby-icon>
  <input kirby-input decimal-mask placeholder="Search..." [size]="size" />
  <kirby-spinner kirby-affix="suffix"></kirby-spinner>
</kirby-form-field>`},Gk=(()=>{let e=class e{constructor(){this.template=El.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-affix-example"]],inputs:{size:"size"},decls:11,vars:4,consts:[["label","With prefix"],["name","payment-card","kirby-affix","prefix"],["kirby-input","","placeholder","Enter your card number",3,"size"],["label","With suffix"],["kirby-input","","type","number","placeholder","Monthly payments",3,"size"],["kirby-affix","suffix"],["label","With prefix and suffix"],["name","search","kirby-affix","prefix"],["kirby-input","","decimal-mask","","placeholder","Search...",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"kirby-icon",1)(2,"input",2),n(),o(3,"kirby-form-field",3),p(4,"input",4),o(5,"span",5),l(6,"kr/md"),n()(),o(7,"kirby-form-field",6),p(8,"kirby-icon",7)(9,"input",8)(10,"kirby-spinner",5),n()),t&2&&(c(2),m("size",a.size),c(2),m("size",a.size)("size",a.size),c(5),m("size",a.size))},dependencies:[F,w,ui,V,ci],encapsulation:2});let i=e;return i})();var Pl={selector:"cookbook-form-field-input-counter-example",template:`<kirby-form-field>
  <input kirby-input [size]="size" placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140" />
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <input kirby-input [size]="size" value="Character counter with prefilled value" #prefilled maxlength="50" />
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>`},Yk=(()=>{let e=class e{constructor(){this.template=Pl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-counter-example"]],inputs:{size:"size"},decls:8,vars:4,consts:[["tweet",""],["prefilled",""],["kirby-input","","placeholder","Tweet your message (max 140 chars)","maxlength","140",3,"size"],[3,"listenTo"],["kirby-input","","value","Character counter with prefilled value","maxlength","50",3,"size"]],template:function(t,a){if(t&1&&(o(0,"kirby-form-field"),p(1,"input",2,0)(3,"kirby-input-counter",3),n(),o(4,"kirby-form-field"),p(5,"input",4,1)(7,"kirby-input-counter",3),n()),t&2){let g=X(2),C=X(6);c(),m("size",a.size),c(2),m("listenTo",g),c(2),m("size",a.size),c(2),m("listenTo",C)}},dependencies:[F,V,Xe],encapsulation:2});let i=e;return i})();var Dl=(i,e)=>e.key;function Ol(i,e){if(i&1&&(se(0,"p")(1,"strong"),l(2),ne(),se(3,"span"),l(4),Z(5,"json"),ne()()),i&2){let s=y().$implicit;c(2),_("form.",s.key,".errors: "),c(),R("state-true",!s.value.errors),c(),k(re(5,4,s.value.errors))}}function Il(i,e){if(i&1&&(se(0,"p")(1,"strong"),l(2),ne(),se(3,"span"),l(4),ne(),se(5,"span"),l(6),ne(),se(7,"span"),l(8),ne()(),O(9,Ol,6,6,"p")),i&2){let s=e.$implicit;c(2),_("form.",s.key,": "),c(),R("state-true",s.value.valid),c(),_("valid: ",s.value.valid),c(),R("state-true",s.value.enabled),c(),_("enabled: ",s.value.enabled),c(),R("state-true",s.value.touched),c(),_("touched: ",s.value.touched),c(),I(s.value.validator?9:-1)}}var Be=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-reactive-form-state"]],inputs:{form:"form"},decls:12,vars:5,consts:[[1,"form-state"]],template:function(t,a){t&1&&(se(0,"section",0)(1,"h4"),l(2,"Form state:"),ne(),se(3,"p")(4,"strong"),l(5,"form.value:"),ne(),l(6),Z(7,"json"),io(8,"br"),ne(),K(9,Il,10,11,null,null,Dl),Z(11,"keyvalue"),ne()),t&2&&(c(6),_(" ",re(7,1,a.form.value)," "),c(3),q(re(11,3,a.form.controls)))},dependencies:[Qe,ti],styles:["[_nghost-%COMP%]{display:flex}.form-state[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);border-top:1px solid var(--kirby-medium);padding:var(--kirby-spacing-xxs)}.form-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-xxxs);font-weight:var(--kirby-font-weight-normal)}.form-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:var(--kirby-font-size-xs);line-height:var(--kirby-line-height-xs)}.form-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:var(--kirby-danger);color:var(--kirby-white);margin-right:var(--kirby-spacing-xxxs);padding:0 var(--kirby-spacing-xxxxs);border-radius:var(--kirby-spacing-xxxs)}.form-state[_ngcontent-%COMP%]   span.state-true[_ngcontent-%COMP%]{background-color:var(--kirby-success);color:var(--kirby-success-contrast)}"]});let i=e;return i})();var Fl={selector:"cookbook-form-field-input-counter-form-example",template:`<form [formGroup]="form">
  <kirby-form-field>
    <input 
      kirby-input 
      [size]="size" 
      placeholder="Enter your message (max 140 chars)" 
      #message 
      maxlength="140"
      formControlName="message"
    />
    <kirby-input-counter [listenTo]="message"></kirby-input-counter>
  </kirby-form-field>
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="true"
    (checkedChange)="toggleEnabled()"
    text="Form field enabled"
  ></kirby-checkbox>
  <button 
    kirby-button 
    attentionLevel="3" 
    (click)="resetForm()"
    [disabled]="!form.get('message').value"
  >
    Reset
  </button>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`},af=(()=>{let e=class e{constructor(r){this.fb=r,this.template=Fl.template,this.isEnabled=!0,this.form=this.fb.group({message:[""]})}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}resetForm(){this.form.reset()}};e.\u0275fac=function(t){return new(t||e)(v(qe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-counter-form-example"]],inputs:{size:"size"},decls:10,vars:6,consts:[["message",""],[3,"formGroup"],["kirby-input","","placeholder","Enter your message (max 140 chars)","maxlength","140","formControlName","message",3,"size"],[3,"listenTo"],["text","Form field enabled",3,"checkedChange","checked"],["kirby-button","","attentionLevel","3",3,"click","disabled"],[3,"form"]],template:function(t,a){if(t&1&&(o(0,"form",1)(1,"kirby-form-field"),p(2,"input",2,0)(4,"kirby-input-counter",3),n()(),o(5,"cookbook-example-configuration-wrapper")(6,"kirby-checkbox",4),b("checkedChange",function(){return a.toggleEnabled()}),n(),o(7,"button",5),b("click",function(){return a.resetForm()}),l(8," Reset "),n(),p(9,"cookbook-reactive-form-state",6),n()),t&2){let g=X(3);m("formGroup",a.form),c(2),m("size",a.size),c(2),m("listenTo",g),c(2),m("checked",!0),c(),m("disabled",!a.form.get("message").value),c(2),m("form",a.form)}},dependencies:[F,V,we,ve,zt,be,Ce,ri,_e,xe,f,B,Be,ge,Xe],encapsulation:2});let i=e;return i})();var Ll={selector:"cookbook-form-field-input-numeric-example",template:`<kirby-form-field label="Numeric input">
  <input type="number" kirby-input [size]="size" />
</kirby-form-field>`},mf=(()=>{let e=class e{constructor(){this.template=Ll.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-numeric-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Numeric input"],["type","number","kirby-input","",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var Al={selector:"cookbook-form-field-input-date-example",template:`<kirby-form-field label="Input with date mask *">
  <input kirby-input type="date" [size]="size" />
</kirby-form-field>`},uf=(()=>{let e=class e{constructor(){this.template=Al.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-date-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input with date mask *"],["kirby-input","","type","date",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var zl={selector:"cookbook-form-field-input-date-native-example",template:`<kirby-form-field label="Native (platform) date input with default Kirby calendar icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
</kirby-form-field>

<kirby-form-field label="Native (platform) date input with custom icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
  <kirby-icon kirby-affix="suffix" name="overview-outline"/>
</kirby-form-field>`},hf=(()=>{let e=class e{constructor(){this.template=zl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-date-native-example"]],inputs:{size:"size"},decls:5,vars:4,consts:[["label","Native (platform) date input with default Kirby calendar icon"],["kirby-input","","type","date",3,"size","useNativeDatePicker"],["label","Native (platform) date input with custom icon"],["kirby-affix","suffix","name","overview-outline"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n(),o(2,"kirby-form-field",2),p(3,"input",1)(4,"kirby-icon",3),n()),t&2&&(c(),m("size",a.size)("useNativeDatePicker",!0),c(2),m("size",a.size)("useNativeDatePicker",!0))},dependencies:[F,V,w,ui],encapsulation:2});let i=e;return i})();var Bl={selector:"cookbook-form-field-input-disabled-example",template:`<kirby-form-field>
  <input kirby-input [size]="size" disabled value="Disabled input" />
</kirby-form-field>`},_f=(()=>{let e=class e{constructor(){this.template=Bl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-disabled-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["kirby-input","","disabled","","value","Disabled input",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field"),p(1,"input",0),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var Nl={selector:"cookbook-form-field-input-error-example",template:`<kirby-form-field label="Error" message="This is an error message">
  <input kirby-input [size]="size" hasError="true" />
</kirby-form-field>`},Tf=(()=>{let e=class e{constructor(){this.template=Nl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-error-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Error","message","This is an error message"],["kirby-input","","hasError","true",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var Kl={selector:"cookbook-form-field-input-borderless-example",template:`<kirby-form-field label="Input field with no borders and initial width">
  <input kirby-input [size]="size" borderless="true" />
</kirby-form-field>`},Of=(()=>{let e=class e{constructor(){this.template=Kl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-borderless-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input field with no borders and initial width"],["kirby-input","","borderless","true",3,"size"]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"input",1),n()),t&2&&(c(),m("size",a.size))},dependencies:[F,V],encapsulation:2});let i=e;return i})();var ql=["formfield"],vn={selector:"cookbook-form-field-focus-example",template:`<kirby-checkbox
  [checked]="inputEnabled"
  (checkedChange)="onToggleInput($event)"
  text="Enable input">
</kirby-checkbox>
<kirby-form-field #formfield>
  <input kirby-input [size]="size" [disabled]="!inputEnabled" placeholder="Enable to focus (+scroll into view on device)" />
</kirby-form-field>`,codeSnippet:`import { FormFieldComponent } from '@kirbydesign/designsystem';
  
export class MyComponent {
  @ViewChild('formfield') private formfield: FormFieldComponent;

  inputEnabled = false;

  onToggleInput(enable: boolean) {
    this.inputEnabled = enable;
    if (!enable) return;
    this.formfield.focus();
  }
`},Bf=(()=>{let e=class e{constructor(){this.template=vn.template,this.codeSnippet=vn.codeSnippet,this.inputEnabled=!1}onToggleInput(r){this.inputEnabled=r,r&&this.formfield.focus()}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-focus-example"]],viewQuery:function(t,a){if(t&1&&It(ql,7),t&2){let g;Ft(g=Lt())&&(a.formfield=g.first)}},inputs:{size:"size"},decls:4,vars:3,consts:[["formfield",""],["text","Enable input",3,"checkedChange","checked"],["kirby-input","","placeholder","Enable to focus (+scroll into view on device)",3,"size","disabled"]],template:function(t,a){t&1&&(o(0,"kirby-checkbox",1),b("checkedChange",function(C){return a.onToggleInput(C)}),n(),o(1,"kirby-form-field",null,0),p(3,"input",2),n()),t&2&&(m("checked",a.inputEnabled),c(3),m("size",a.size)("disabled",!a.inputEnabled))},dependencies:[B,F,V],styles:["kirby-checkbox[_ngcontent-%COMP%]{padding-left:16px;padding-right:4px}"]});let i=e;return i})();var Hl={selector:"cookbook-form-field-textarea-example",template:`<kirby-form-field>
  <textarea kirby-textarea placeholder="Default textarea with placeholder text"></textarea>
</kirby-form-field>`},qf=(()=>{let e=class e{constructor(){this.template=Hl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-example"]],decls:2,vars:0,consts:[["kirby-textarea","","placeholder","Default textarea with placeholder text"]],template:function(t,a){t&1&&(o(0,"kirby-form-field"),p(1,"textarea",0),n())},dependencies:[F,et],encapsulation:2});let i=e;return i})();var Wl={selector:"cookbook-form-field-textarea-label-example",template:`<kirby-form-field label="Textarea with label">
  <textarea kirby-textarea></textarea>
</kirby-form-field>`},Vf=(()=>{let e=class e{constructor(){this.template=Wl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-label-example"]],decls:2,vars:0,consts:[["label","Textarea with label"],["kirby-textarea",""]],template:function(t,a){t&1&&(o(0,"kirby-form-field",0),p(1,"textarea",1),n())},dependencies:[F,et],encapsulation:2});let i=e;return i})();var Vl={selector:"cookbook-form-field-textarea-counter-example",template:`<kirby-form-field>
  <textarea kirby-textarea placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140"></textarea>
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <textarea kirby-textarea value="Character counter with prefilled value" #prefilled maxlength="50"></textarea>
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>`},$f=(()=>{let e=class e{constructor(){this.template=Vl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-counter-example"]],decls:8,vars:2,consts:[["tweet",""],["prefilled",""],["kirby-textarea","","placeholder","Tweet your message (max 140 chars)","maxlength","140"],[3,"listenTo"],["kirby-textarea","","value","Character counter with prefilled value","maxlength","50"]],template:function(t,a){if(t&1&&(o(0,"kirby-form-field"),p(1,"textarea",2,0)(3,"kirby-input-counter",3),n(),o(4,"kirby-form-field"),p(5,"textarea",4,1)(7,"kirby-input-counter",3),n()),t&2){let g=X(2),C=X(6);c(3),m("listenTo",g),c(4),m("listenTo",C)}},dependencies:[F,et,Xe],encapsulation:2});let i=e;return i})();var Rl={selector:"cookbook-form-field-textarea-counter-form-example",template:`<form [formGroup]="form">
  <kirby-form-field>
    <textarea 
      kirby-textarea 
      placeholder="Enter your message (max 140 chars)" 
      #message 
      maxlength="140"
      formControlName="message"
    ></textarea>
    <kirby-input-counter [listenTo]="message"></kirby-input-counter>
  </kirby-form-field>
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="true"
    (checkedChange)="toggleEnabled()"
    text="Form field enabled"
  ></kirby-checkbox>
  <button 
    kirby-button 
    attentionLevel="3" 
    (click)="resetForm()"
    [disabled]="!form.get('message').value"
  >
    Reset
  </button>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`},eh=(()=>{let e=class e{constructor(r){this.fb=r,this.template=Rl.template,this.isEnabled=!0,this.form=this.fb.group({message:[""]})}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}resetForm(){this.form.reset()}};e.\u0275fac=function(t){return new(t||e)(v(qe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-counter-form-example"]],decls:10,vars:5,consts:[["message",""],[3,"formGroup"],["kirby-textarea","","placeholder","Enter your message (max 140 chars)","maxlength","140","formControlName","message"],[3,"listenTo"],["text","Form field enabled",3,"checkedChange","checked"],["kirby-button","","attentionLevel","3",3,"click","disabled"],[3,"form"]],template:function(t,a){if(t&1&&(o(0,"form",1)(1,"kirby-form-field"),p(2,"textarea",2,0)(4,"kirby-input-counter",3),n()(),o(5,"cookbook-example-configuration-wrapper")(6,"kirby-checkbox",4),b("checkedChange",function(){return a.toggleEnabled()}),n(),o(7,"button",5),b("click",function(){return a.resetForm()}),l(8," Reset "),n(),p(9,"cookbook-reactive-form-state",6),n()),t&2){let g=X(3);m("formGroup",a.form),c(4),m("listenTo",g),c(2),m("checked",!0),c(),m("disabled",!a.form.get("message").value),c(2),m("form",a.form)}},dependencies:[F,et,we,ve,zt,be,Ce,ri,_e,xe,f,B,Be,ge,Xe],encapsulation:2});let i=e;return i})();var Hi=(i,e)=>e.value;function Gl(i,e){if(i&1&&(o(0,"option",12),l(1),n()),i&2){let s=e.$implicit,r=y();m("value",De(s.value)),Ne("selected",r.spacingSizes===s.value?!0:null),c(),_(" ",s.text," ")}}function $l(i,e){if(i&1&&(o(0,"option",12),l(1),n()),i&2){let s=e.$implicit,r=y();m("value",De(s.value)),Ne("selected",r.spacingSizes===s.value?!0:null),c(),_(" ",s.text," ")}}function jl(i,e){if(i&1&&(o(0,"option",12),l(1),n()),i&2){let s=e.$implicit,r=y();m("value",De(s.value)),Ne("selected",r.spacingSizes===s.value?!0:null),c(),_(" ",s.text," ")}}var oh=(()=>{let e=class e{constructor(){this.spacing="",this.rowSpacing="",this.columnSpacing="",this.spacingSizes=[{text:"0",value:"0"},{text:"1",value:"1"},{text:"2",value:"2"},{text:"3",value:"3"},{text:"4",value:"4"},{text:"5",value:"5"}]}onSpacingSizeChange(r){this.spacing=r}onRowSpacingSizeChange(r){this.rowSpacing=r}onColumnSpacingSizeChange(r){this.columnSpacing=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-grid-example"]],decls:70,vars:3,consts:[[1,"grid-example-container"],[1,"kirby-grid"],["xs","8",1,"kirby-grid-item"],["title","xs='8'"],["xs","4",1,"kirby-grid-item"],["title","xs='4'"],["xs","12","sm","8",1,"kirby-grid-item"],["title","xs='12' sm='8'"],["xs","12","sm","4",1,"kirby-grid-item"],["title","xs='12' sm='4'"],[3,"change"],["value",""],[3,"value"]],template:function(t,a){t&1&&(o(0,"div",0)(1,"h2"),l(2,"Basic Grid"),n(),o(3,"div",1)(4,"div",2)(5,"kirby-card"),p(6,"kirby-card-header",3),n()(),o(7,"div",4)(8,"kirby-card"),p(9,"kirby-card-header",5),n()(),o(10,"div",4)(11,"kirby-card"),p(12,"kirby-card-header",5),n()(),o(13,"div",2)(14,"kirby-card"),p(15,"kirby-card-header",3),n()()()(),o(16,"div",0)(17,"h2"),l(18,"Multiple breakpoints"),n(),o(19,"div",1)(20,"div",6)(21,"kirby-card"),p(22,"kirby-card-header",7),n()(),o(23,"div",8)(24,"kirby-card"),p(25,"kirby-card-header",9),n()(),o(26,"div",8)(27,"kirby-card"),p(28,"kirby-card-header",9),n()(),o(29,"div",6)(30,"kirby-card"),p(31,"kirby-card-header",7),n()()()(),o(32,"div",0)(33,"h2"),l(34,"Spacing"),n(),o(35,"fieldset")(36,"legend"),l(37,"Grid Spacing"),n(),o(38,"select",10),b("change",function(C){return a.onSpacingSizeChange(C.target.value)}),o(39,"option",11),l(40,"-"),n(),K(41,Gl,2,4,"option",12,Hi),n(),o(43,"legend"),l(44,"Grid Row Spacing"),n(),o(45,"select",10),b("change",function(C){return a.onRowSpacingSizeChange(C.target.value)}),o(46,"option",11),l(47,"-"),n(),K(48,$l,2,4,"option",12,Hi),n(),o(50,"legend"),l(51,"Grid Column Spacing"),n(),o(52,"select",10),b("change",function(C){return a.onColumnSpacingSizeChange(C.target.value)}),o(53,"option",11),l(54,"-"),n(),K(55,jl,2,4,"option",12,Hi),n()(),o(57,"div",1)(58,"div",2)(59,"kirby-card"),p(60,"kirby-card-header",3),n()(),o(61,"div",4)(62,"kirby-card"),p(63,"kirby-card-header",5),n()(),o(64,"div",4)(65,"kirby-card"),p(66,"kirby-card-header",3),n()(),o(67,"div",2)(68,"kirby-card"),p(69,"kirby-card-header",3),n()()()()),t&2&&(c(41),q(a.spacingSizes),c(7),q(a.spacingSizes),c(7),q(a.spacingSizes),c(2),Ne("spacing",a.spacing)("row-spacing",a.rowSpacing)("column-spacing",a.columnSpacing))},dependencies:[T,ce],styles:[".grid-example-container[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-l)}fieldset[_ngcontent-%COMP%]{margin:var(--kirby-spacing-m) 0;width:300px}fieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]{display:flex}"]});let i=e;return i})();var Ul=(i,e)=>e.name;function Yl(i,e){if(i&1){let s=P();o(0,"div",0)(1,"div",3)(2,"kirby-icon",4),b("click",function(t){let a=S(s).$implicit,g=y();return M(g.onIconClick(t,a))}),n(),o(3,"span",5),l(4),n()()()}if(i&2){let s=e.$implicit,r=y();c(2),m("name",s)("title",s)("themeColor",r.color==null?null:r.color.name),c(2),k(s)}}function Ql(i,e){if(i&1){let s=P();o(0,"button",6),b("click",function(){let t=S(s).$implicit,a=y();return M(a.changeColor(t))}),n()}if(i&2){let s=e.$implicit;m("ngClass",s.name)}}var Jl={selector:"cookbook-icon-default-example",template:`<div>
  @for(icon of icons; track icon) {
    <div class="icon-item-container">
      <div class="icon-item-inner-container">
        <kirby-icon class="copy-to-clipboard" [name]="icon" [title]="icon" [themeColor]="color?.name" (click)="onIconClick($event, icon)"></kirby-icon>
        <span class="icon-item-title">{{ icon }}</span>
      </div>
    </div>
  }
<div>

  <p>Icons automatically inherit the value set via the <code>color</code> css property. You can experiment with various colors for the icons above here:</p>
  <div class="color-options">
    @for(color of colors; track color.name) {
      <button (click)="changeColor(color)" [ngClass]="color.name"></button>
    }
  </div>
</div>
  `,htmlSnippet:'<kirby-icon name="NAME"></kirby-icon>'},Ct=class Ct{constructor(){this.icons=vo,this.colors=[...Ke.brandColors,...Ke.notificationColors]}changeColor(e){this.color=e}async onIconClick(e,s){let r=`<kirby-icon name="${s}"></kirby-icon>`;await navigator.clipboard.writeText(r);let t=e.target.closest("kirby-icon");t.classList.add("copied"),window.setTimeout(()=>{t.classList.remove("copied")},1500)}};Ct.htmlSnippet=Jl.htmlSnippet,Ct.\u0275fac=function(s){return new(s||Ct)},Ct.\u0275cmp=d({type:Ct,selectors:[["cookbook-icon-default-example"]],decls:12,vars:0,consts:[[1,"icon-item-container"],[1,"color-options"],[3,"ngClass"],[1,"icon-item-inner-container"],[1,"copy-to-clipboard",3,"click","name","title","themeColor"],[1,"icon-item-title"],[3,"click","ngClass"]],template:function(s,r){s&1&&(o(0,"div"),K(1,Yl,5,4,"div",0,to),o(3,"div")(4,"p"),l(5,"Icons automatically inherit the value set via the "),o(6,"code"),l(7,"color"),n(),l(8," css property. You can experiment with various colors for the icons above here:"),n(),o(9,"div",1),K(10,Ql,1,1,"button",2,Ul),n()()()),s&2&&(c(),q(r.icons),c(9),q(r.colors))},dependencies:[w,Y,uo],styles:['@keyframes _ngcontent-%COMP%_slide-in-out{0%{opacity:0;transform:translateY(-50%)}10%{opacity:1;transform:translateY(-125%)}90%{opacity:1;transform:translateY(-125%)}to{opacity:0;transform:translateY(-200%)}}[_nghost-%COMP%]{display:block}p[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}.icon-item-container[_ngcontent-%COMP%]{width:112px;padding:8px;display:inline-block;text-align:center}.icon-item-inner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;flex-wrap:wrap}.icon-item-title[_ngcontent-%COMP%]{display:block;max-width:112px;font-size:12px;color:#0009;white-space:nowrap}kirby-icon[_ngcontent-%COMP%]{width:100%}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]{transition:transform var(--kirby-transition-duration-quick)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:hover{transform:scale(1.2)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:before{display:block;position:absolute;content:"Copied!";background-color:var(--kirby-semi-light);color:var(--kirby-semi-dark-contrast);font-size:var(--kirby-font-size-xxs);padding:var(--kirby-spacing-xxxxs) var(--kirby-spacing-xxxs);border-radius:var(--kirby-spacing-xxxs);opacity:0;transform:translateY(-50%)}kirby-icon.copy-to-clipboard.copied[_ngcontent-%COMP%]:before{opacity:1;animation-name:_ngcontent-%COMP%_slide-in-out;animation-duration:1.5s;animation-fill-mode:forwards}.color-options[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.primary[_ngcontent-%COMP%]{background-color:var(--kirby-primary)}button.primary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-primary-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-success)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-success-shade)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-warning)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-warning-shade)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-danger)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-danger-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}']});var xn=Ct;var Zl=(i,e)=>e.key;function Xl(i,e){if(i&1&&(o(0,"div",0)(1,"div",1),p(2,"kirby-icon",2),o(3,"span",3),l(4),n()()()),i&2){let s=e.$implicit;c(2),m("size",s.value)("title",s.value),c(2),k(s.value)}}var es={selector:"cookbook-icon-sizes-example",template:`@for (size of sizes | keyvalue; track size.key) {
  <div class="icon-item-container">
    <div class="icon-item-inner-container">
      <kirby-icon name="person" [size]="size.value" [title]="size.value"></kirby-icon>
      <span class="icon-item-title">{{ size.value }}</span>
    </div>
  </div>
}`,htmlSnippet:`<kirby-icon name="person" size="lg"></kirby-icon>
<kirby-icon name="person" size="md"></kirby-icon>
<kirby-icon name="person" size="sm"></kirby-icon>
<kirby-icon name="person" size="xs"></kirby-icon>`},vt=class vt{constructor(){this.sizes=xo}};vt.htmlSnippet=es.htmlSnippet,vt.\u0275fac=function(s){return new(s||vt)},vt.\u0275cmp=d({type:vt,selectors:[["cookbook-icon-sizes-example"]],decls:3,vars:2,consts:[[1,"icon-item-container"],[1,"icon-item-inner-container"],["name","person",3,"size","title"],[1,"icon-item-title"]],template:function(s,r){s&1&&(K(0,Xl,5,3,"div",0,Zl),Z(2,"keyvalue")),s&2&&q(re(2,0,r.sizes))},dependencies:[w,ti],styles:['@keyframes _ngcontent-%COMP%_slide-in-out{0%{opacity:0;transform:translateY(-50%)}10%{opacity:1;transform:translateY(-125%)}90%{opacity:1;transform:translateY(-125%)}to{opacity:0;transform:translateY(-200%)}}[_nghost-%COMP%]{display:block}p[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}.icon-item-container[_ngcontent-%COMP%]{width:112px;padding:8px;display:inline-block;text-align:center}.icon-item-inner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;flex-wrap:wrap}.icon-item-title[_ngcontent-%COMP%]{display:block;max-width:112px;font-size:12px;color:#0009;white-space:nowrap}kirby-icon[_ngcontent-%COMP%]{width:100%}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]{transition:transform var(--kirby-transition-duration-quick)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:hover{transform:scale(1.2)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:before{display:block;position:absolute;content:"Copied!";background-color:var(--kirby-semi-light);color:var(--kirby-semi-dark-contrast);font-size:var(--kirby-font-size-xxs);padding:var(--kirby-spacing-xxxxs) var(--kirby-spacing-xxxs);border-radius:var(--kirby-spacing-xxxs);opacity:0;transform:translateY(-50%)}kirby-icon.copy-to-clipboard.copied[_ngcontent-%COMP%]:before{opacity:1;animation-name:_ngcontent-%COMP%_slide-in-out;animation-duration:1.5s;animation-fill-mode:forwards}.color-options[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.primary[_ngcontent-%COMP%]{background-color:var(--kirby-primary)}button.primary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-primary-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-success)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-success-shade)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-warning)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-warning-shade)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-danger)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-danger-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}']});var _n=vt;var wn={selector:"cookbook-icon-custom-example",template:`<div class="icon-item-container">
  <div class="icon-item-inner-container">
    <kirby-icon name="football" title="football"></kirby-icon>
    <span class="icon-item-title">football</span>
  </div>
</div>
<div class="icon-item-container">
  <div class="icon-item-inner-container">
    <kirby-icon name="umbrella" title="umbrella"></kirby-icon>
    <span class="icon-item-title">umbrella</span>
  </div>
</div>`,htmlSnippet:`<kirby-icon name="football" title="football"></kirby-icon>
  <kirby-icon name="umbrella" title="umbrella"></kirby-icon>
  `,codeSnippet:`import { IconRegistryService } from '@kirbydesign/designsystem';

const customIcons = [
    { 
        name: 'custom-icon-name',
        svg: '[PATH_TO_SVG_FILE]',
    },
    ...
];

@NgModule({ ... })
export class MyModule { 
    constructor(iconRegistryService: IconRegistryService) { 
        iconRegistryService.addIcons(customIcons);
    } 
}`},at=class at{};at.codeSnippet=wn.codeSnippet,at.htmlSnippet=wn.htmlSnippet,at.\u0275fac=function(s){return new(s||at)},at.\u0275cmp=d({type:at,selectors:[["cookbook-icon-custom-example"]],decls:10,vars:0,consts:[[1,"icon-item-container"],[1,"icon-item-inner-container"],["name","football","title","football"],[1,"icon-item-title"],["name","umbrella","title","umbrella"]],template:function(s,r){s&1&&(o(0,"div",0)(1,"div",1),p(2,"kirby-icon",2),o(3,"span",3),l(4,"football"),n()()(),o(5,"div",0)(6,"div",1),p(7,"kirby-icon",4),o(8,"span",3),l(9,"umbrella"),n()()())},dependencies:[w],styles:['@keyframes _ngcontent-%COMP%_slide-in-out{0%{opacity:0;transform:translateY(-50%)}10%{opacity:1;transform:translateY(-125%)}90%{opacity:1;transform:translateY(-125%)}to{opacity:0;transform:translateY(-200%)}}[_nghost-%COMP%]{display:block}p[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-s)}.icon-item-container[_ngcontent-%COMP%]{width:112px;padding:8px;display:inline-block;text-align:center}.icon-item-inner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;flex-wrap:wrap}.icon-item-title[_ngcontent-%COMP%]{display:block;max-width:112px;font-size:12px;color:#0009;white-space:nowrap}kirby-icon[_ngcontent-%COMP%]{width:100%}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]{transition:transform var(--kirby-transition-duration-quick)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:hover{transform:scale(1.2)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:before{display:block;position:absolute;content:"Copied!";background-color:var(--kirby-semi-light);color:var(--kirby-semi-dark-contrast);font-size:var(--kirby-font-size-xxs);padding:var(--kirby-spacing-xxxxs) var(--kirby-spacing-xxxs);border-radius:var(--kirby-spacing-xxxs);opacity:0;transform:translateY(-50%)}kirby-icon.copy-to-clipboard.copied[_ngcontent-%COMP%]:before{opacity:1;animation-name:_ngcontent-%COMP%_slide-in-out;animation-duration:1.5s;animation-fill-mode:forwards}.color-options[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:var(--kirby-black);cursor:pointer}button.primary[_ngcontent-%COMP%]{background-color:var(--kirby-primary)}button.primary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-primary-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-success)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-success-shade)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-warning)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-warning-shade)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-danger)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-danger-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}']});var Sn=at;var ts={selector:"cookbook-simple-item-group-example",template:`<kirby-item-group>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
</kirby-item-group>
<kirby-item-group>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
</kirby-item-group>
`},hh=(()=>{let e=class e{constructor(){this.template=ts.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-simple-item-group-example"]],decls:38,vars:0,consts:[[1,"kirby-text-normal-bold"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-item-group")(1,"kirby-item")(2,"kirby-label")(3,"p",0),l(4,"Title"),n(),o(5,"p",1),l(6,"Detail"),n()(),o(7,"kirby-label",2)(8,"data"),l(9,"Value"),n()()(),o(10,"kirby-item")(11,"kirby-label")(12,"p",0),l(13,"Title"),n(),o(14,"p",1),l(15,"Detail"),n()(),o(16,"kirby-label",2)(17,"data"),l(18,"Value"),n()()()(),o(19,"kirby-item-group")(20,"kirby-item")(21,"kirby-label")(22,"p",0),l(23,"Title"),n(),o(24,"p",1),l(25,"Detail"),n()(),o(26,"kirby-label",2)(27,"data"),l(28,"Value"),n()()(),o(29,"kirby-item")(30,"kirby-label")(31,"p",0),l(32,"Title"),n(),o(33,"p",1),l(34,"Detail"),n()(),o(35,"kirby-label",2)(36,"data"),l(37,"Value"),n()()()())},dependencies:[yi,h,z],encapsulation:2});let i=e;return i})();var is={selector:"cookbook-item-group-with-section-header-example",template:`<kirby-item-group>
  <kirby-section-header>
    <h3 heading>Item Group</h3>
  </kirby-section-header>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
</kirby-item-group>
<kirby-item-group>
  <kirby-section-header>
    <h3 heading>Item Group</h3>
  </kirby-section-header>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
  <kirby-item>
    <kirby-label>
      <p class="kirby-text-normal-bold">Title</p>
      <p class="kirby-item-detail">Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
</kirby-item-group>`},wh=(()=>{let e=class e{constructor(){this.template=is.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-group-with-section-header-example"]],decls:44,vars:0,consts:[["heading",""],[1,"kirby-text-normal-bold"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-item-group")(1,"kirby-section-header")(2,"h3",0),l(3,"Item Group"),n()(),o(4,"kirby-item")(5,"kirby-label")(6,"p",1),l(7,"Title"),n(),o(8,"p",2),l(9,"Detail"),n()(),o(10,"kirby-label",3)(11,"data"),l(12,"Value"),n()()(),o(13,"kirby-item")(14,"kirby-label")(15,"p",1),l(16,"Title"),n(),o(17,"p",2),l(18,"Detail"),n()(),o(19,"kirby-label",3)(20,"data"),l(21,"Value"),n()()()(),o(22,"kirby-item-group")(23,"kirby-section-header")(24,"h3",0),l(25,"Item Group"),n()(),o(26,"kirby-item")(27,"kirby-label")(28,"p",1),l(29,"Title"),n(),o(30,"p",2),l(31,"Detail"),n()(),o(32,"kirby-label",3)(33,"data"),l(34,"Value"),n()()(),o(35,"kirby-item")(36,"kirby-label")(37,"p",1),l(38,"Title"),n(),o(39,"p",2),l(40,"Detail"),n()(),o(41,"kirby-label",3)(42,"data"),l(43,"Value"),n()()()())},dependencies:[yi,Ee,h,z],encapsulation:2});let i=e;return i})();var os=(i,e)=>e.value;function ns(i,e){if(i&1&&(o(0,"kirby-item-sliding",0)(1,"kirby-item"),l(2),n()()),i&2){let s=e.$implicit,r=e.$index,t=y();m("swipeActions",t.getSwipeActions(r)),c(2),k(s.value)}}var Mn={selector:"cookbook-item-sliding-conditional-example",template:`<p>{{text}}</p>
<kirby-list-experimental>
  @for (item of items; track item.value; let i = $index) {
    <kirby-item-sliding
      [swipeActions]="getSwipeActions(i)"
    >
      <kirby-item>{{ item.value }}</kirby-item>
    </kirby-item-sliding>
  }
</kirby-list-experimental>`,codeSnippet:`export class ItemSlidingConditionalExampleComponent {
  text = 'Nothing was selected';

  items = [
    {
      value: 'Vestas Wind Systems',
      isDeleteable: true,
    },
    {
      value: 'Cypress Semiconductor Corporation',
      isDeleteable: false,
    },
    {
      value: 'Ultragenyx Pharmaceutical Inc.',
      isDeleteable: false,
    },
    {
      value: 'Astronics Corporation',
      isDeleteable: true,
    },
  ];

  getSwipeActions(index: number): ItemSwipeAction[] {
    const { isDeleteable } = this.items[index];

    return [
      {
        title: 'edit',
        type: 'success',
        onSelected: () => {
          this.text = 'Edit was clicked';
        },
      },
      {
        title: 'archive',
        type: 'warning',
        onSelected: () => {
          this.text = 'Archive was clicked';
        },
      },
      {
        title: 'delete',
        icon: 'trash',
        onSelected: () => {
          this.text = 'Delete was clicked';
        },
        type: 'danger',
        isDisabled: !isDeleteable,
      },
    ];
  }
}`},Ph=(()=>{let e=class e{constructor(){this.template=Mn.template,this.codeSnippet=Mn.codeSnippet,this.text="Nothing was selected",this.items=[{value:"Vestas Wind Systems",isDeleteable:!0},{value:"Cypress Semiconductor Corporation",isDeleteable:!1},{value:"Ultragenyx Pharmaceutical Inc.",isDeleteable:!1},{value:"Astronics Corporation",isDeleteable:!0}]}getSwipeActions(r){let{isDeleteable:t}=this.items[r];return[{title:"edit",type:"success",onSelected:()=>{this.text="Edit was clicked"}},{title:"archive",type:"warning",onSelected:()=>{this.text="Archive was clicked"}},{title:"delete",icon:"trash",onSelected:()=>{this.text="Delete was clicked"},type:"danger",isDisabled:!t}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-sliding-conditional-example"]],decls:5,vars:1,consts:[[3,"swipeActions"]],template:function(t,a){t&1&&(o(0,"p"),l(1),n(),o(2,"kirby-list-experimental"),K(3,ns,3,2,"kirby-item-sliding",0,os),n()),t&2&&(c(),k(a.text),c(2),q(a.items))},dependencies:[Ht,ki,h],encapsulation:2});let i=e;return i})();var rs={selector:"cookbook-link-example-default",template:`<a class="kirby-text-xsmall" [routerLink]="'/home/changelog'">Extra small</a>
<a class="kirby-text-small" [routerLink]="'/home/changelog'">Small</a>
<a [routerLink]="'/home/changelog'">Normal (default)</a>`},Ih=(()=>{let e=class e{constructor(){this.template=rs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-link-example-default"]],decls:6,vars:3,consts:[[1,"kirby-text-xsmall",3,"routerLink"],[1,"kirby-text-small",3,"routerLink"],[3,"routerLink"]],template:function(t,a){t&1&&(o(0,"a",0),l(1,"Extra small"),n(),o(2,"a",1),l(3,"Small"),n(),o(4,"a",2),l(5,"Normal (default)"),n()),t&2&&(m("routerLink","/home/changelog"),c(2),m("routerLink","/home/changelog"),c(2),m("routerLink","/home/changelog"))},dependencies:[li],styles:['.kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:block;margin-bottom:var(--kirby-spacing-s)}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.trailing-icon-example[_ngcontent-%COMP%]{background-image:url(/assets/kirby/icons/svg/navigation.svg);background-image:image-set("assets/kirby/icons/svg/navigation.svg");background-repeat:no-repeat;background-position:right 50%;background-size:1.5em;padding-right:calc(1.5em + 4px)}']});let i=e;return i})();var as={selector:"cookbook-link-example-new-tab",template:'<a class="kirby-external-icon" target="_blank" href="https://github.com/kirbydesign/designsystem">Kirby on Github</a>'},Lh=(()=>{let e=class e{constructor(){this.template=as.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-link-example-new-tab"]],decls:2,vars:0,consts:[["target","_blank","href","https://github.com/kirbydesign/designsystem",1,"kirby-external-icon"]],template:function(t,a){t&1&&(se(0,"a",0),l(1,"Kirby on Github"),ne())},styles:['.kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:block;margin-bottom:var(--kirby-spacing-s)}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-s)}.trailing-icon-example[_ngcontent-%COMP%]{background-image:url(/assets/kirby/icons/svg/navigation.svg);background-image:image-set("assets/kirby/icons/svg/navigation.svg");background-repeat:no-repeat;background-position:right 50%;background-size:1.5em;padding-right:calc(1.5em + 4px)}']});let i=e;return i})();var ls=(i,e)=>e.id;function ss(i,e){if(i&1&&(o(0,"kirby-item")(1,"p"),l(2),n(),o(3,"data",2),l(4),n()()),i&2){let s=e.$implicit;c(2),k(s.title),c(2),k(s.amount)}}var cs=`<kirby-list-experimental>
  <kirby-section-header outside>
    <h2 heading>Stocks</h2>
  </kirby-section-header>
  @for (item of items; track item.id) {
    <kirby-item>
      <p>{{ item.title }}</p>
      <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
    </kirby-item>
  }
</kirby-list-experimental>`,qh=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=cs}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-experimental-items-example"]],features:[E],decls:6,vars:0,consts:[["outside",""],["heading",""],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(o(0,"kirby-list-experimental")(1,"kirby-section-header",0)(2,"h2",1),l(3,"Stocks"),n()(),K(4,ss,5,2,"kirby-item",null,ls),n()),t&2&&(c(4),q(a.items))},dependencies:[Ee,h,Ht],encapsulation:2});let i=e;return i})();var ms=(i,e)=>e.id;function ds(i,e){if(i&1&&(o(0,"kirby-item-sliding",0)(1,"kirby-item")(2,"p"),l(3),n(),o(4,"data",1),l(5),n()()()),i&2){let s=e.$implicit,r=y();m("swipeActions",r.swipeActions),c(3),k(s.title),c(2),k(s.amount)}}var ps=`<kirby-list-experimental>
  @for (item of items; track item.id) {
    <kirby-item-sliding [swipeActions]="swipeActions">
      <kirby-item>
        <p>{{ item.title }}</p>
        <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
      </kirby-item>
    </kirby-item-sliding>
  }
</kirby-list-experimental>`,$h=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=ps,this.swipeActions=[{title:"edit",type:"success",onSelected:()=>{}},{title:"archive",type:"warning",onSelected:()=>{}},{title:"delete",icon:"trash",onSelected:()=>{},type:"danger"}]}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-experimental-sliding-items-example"]],features:[E],decls:3,vars:0,consts:[[3,"swipeActions"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(o(0,"kirby-list-experimental"),K(1,ds,6,3,"kirby-item-sliding",0,ms),n()),t&2&&(c(),q(a.items))},dependencies:[ki,h,Ht],encapsulation:2});let i=e;return i})();function bs(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",3),l(3),n(),o(4,"p",4),l(5),n()(),o(6,"kirby-label",5)(7,"data",6),l(8),n(),o(9,"data",7),l(10),n()()()),i&2){let s=e.$implicit;c(3),_(" ",s.title),c(2),_(" ",s.subTitle),c(2),m("value",s.amount),c(),_(" ",s.amount),c(),m("value",s.detail),c(),_(" ",s.detail)}}var Zh=`<kirby-list 
  [items]="items" 
  (loadOnDemand)="onLoadDemand($event)" 
  noMoreItemsText="No more items">
    <kirby-item *kirbyListItemTemplate="let item">
      <kirby-label>
        <p class="kirby-item-title">
        {{ item.title }}</p>
        <p class="kirby-item-subtitle">
        {{ item.subTitle }}</p>
      </kirby-label>
      <kirby-label slot="end">
        <data [value]="item.amount">
        {{ item.amount }}</data>
        <data [value]="item.detail" 
        class="kirby-item-detail">
        {{ item.detail }}</data>
      </kirby-label>
    </kirby-item>
</kirby-list>`,Xh=(()=>{let e=class e extends te{constructor(){super(),this.itemCount=0,this.items.push(...this.generateItems())}onLoadDemand(r){this.itemCount<=20?setTimeout(()=>{this.items.push(...this.generateItems()),r.complete()},2e3):r.complete(!0)}generateItems(){let r=[];for(let a=0;a<10;a++){this.itemCount++;let g={title:`Item ${this.itemCount}`,subTitle:`${Math.round(Math.random()*100)} pcs`,amount:`${Math.round(Math.random()*1e3)} DKK`,detail:Math.round(Math.random()*100)};r.push(g)}return r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-list-load-on-demand-example"]],features:[E],decls:4,vars:1,consts:[["title","Load On Demand"],["noMoreItemsText","No more items",3,"loadOnDemand","items"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-page",0)(1,"kirby-page-content")(2,"kirby-list",1),b("loadOnDemand",function(C){return a.onLoadDemand(C)}),x(3,bs,11,6,"kirby-item",2),n()()()),t&2&&(c(2),m("items",a.items))},dependencies:[$,H,h,z,N,ee],encapsulation:2});let i=e;return i})();var lt=class{constructor(){this.items=[{title:"Holiday with friends",amount:-37445.02325},{title:"Savings",amount:923367.2356},{title:"Expenses",amount:65128.45,shadowAccounts:[{title:"Food",amount:376.12},{title:"Car",amount:62376.12},{title:"Misc",amount:2376.12}]}]}};function us(i,e){if(i&1&&(o(0,"kirby-item")(1,"p",2),l(2),n(),o(3,"data",3),l(4),Z(5,"currency"),n()()),i&2){let s=e.$implicit;c(2),k(s.title),c(),m("value",s.amount),c(),_(" ",re(5,3,s.amount)," ")}}var gs=`<kirby-list [items]="items" shape="none">
  <kirby-item *kirbyListItemTemplate="let item">
    <p class="kirby-text-normal-bold">{{ item.title }}</p>
    <data [value]="item.amount" slot="end">
      {{ item.amount | currency }}
    </data>
  </kirby-item>
</kirby-list>`,aC=(()=>{let e=class e extends lt{constructor(){super(...arguments),this.template=gs}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-simple-list-no-shape-example"]],features:[E],decls:2,vars:1,consts:[["shape","none",3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-text-normal-bold"],["slot","end",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),x(1,us,6,5,"kirby-item",1),n()),t&2&&m("items",a.items)},dependencies:[H,h,N,Je],encapsulation:2});let i=e;return i})();var ys=()=>["Much cool","Such items","Wow"];function ks(i,e){if(i&1&&(o(0,"kirby-item")(1,"p",3),l(2),n(),o(3,"data",4),l(4),Z(5,"currency"),n()()),i&2){let s=e.$implicit;c(2),k(s.title),c(),m("value",s.amount),c(),k(re(5,3,s.amount))}}var fs=`<kirby-card>
  <kirby-dropdown class="margin" placeholder="Options" 
  [items]="['Much cool','Such items','Wow']">
  </kirby-dropdown>
  <kirby-list [items]="items" shape="none">
    <kirby-item *kirbyListItemTemplate="let item">
      <p class="kirby-text-normal-bold">{{ item.title }}</p>
      <data [value]="item.amount" slot="end">{{ item.amount | currency }}</data>
    </kirby-item>
  </kirby-list>
</kirby-card>`,uC=(()=>{let e=class e extends lt{constructor(){super(...arguments),this.template=fs}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-detailed-card-with-list-no-shape-example"]],features:[E],decls:4,vars:3,consts:[["placeholder","Options",1,"margin",3,"items"],["shape","none",3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-text-normal-bold"],["slot","end",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-card"),p(1,"kirby-dropdown",0),o(2,"kirby-list",1),x(3,ks,6,5,"kirby-item",2),n()()),t&2&&(c(),m("items",D(2,ys)),c(),m("items",a.items))},dependencies:[T,Q,H,N,h,Je],styles:[".margin[_ngcontent-%COMP%]{margin-top:16px;margin-inline:16px}","kirby-card[_ngcontent-%COMP%]{min-height:224px}"]});let i=e;return i})();var hs=(i,e)=>e.title;function Cs(i,e){i&1&&p(0,"kirby-card-header",2),i&2&&m("flagged","warning")}function vs(i,e){if(i&1&&(o(0,"kirby-item")(1,"h4"),l(2),n(),o(3,"data",5),l(4),Z(5,"currency"),n()()),i&2){let s=e.$implicit;c(2),k(s.title),c(),m("value",s.amount),c(),_(" ",re(5,3,s.amount))}}function xs(i,e){if(i&1&&(o(0,"kirby-card"),O(1,Cs,1,1,"kirby-card-header",2),o(2,"kirby-item")(3,"h4",3),l(4),n(),o(5,"data",4),l(6),Z(7,"currency"),n()(),K(8,vs,6,5,"kirby-item",null,hs),n()),i&2){let s=e.$implicit;c(),I(s.amount<0?1:-1),c(3),k(s.title),c(),m("value",s.amount),c(),_(" ",re(7,4,s.amount)," "),c(2),q(s.shadowAccounts)}}var _s=`<kirby-list [items]="items" shape="none" hasItemSpacing="true" [showDivider]="false">
  <kirby-card *kirbyListItemTemplate="let item">
    @if (item.amount < 0) {
      <kirby-card-header title="Account is overdraft" [flagged]="'warning'">
      </kirby-card-header>
    }
    <kirby-item>
      <h4 class="kirby-text-bold">{{ item.title }}</h4>
      <data [value]="item.amount" class="kirby-text-bold" slot="end">
        {{ item.amount | currency }}
      </data>
    </kirby-item>
    @for (shadowAccount of item.shadowAccounts; track shadowAccount.title) {
      <kirby-item>
        <h4>{{ shadowAccount.title }}</h4>
        <data [value]="shadowAccount.amount" slot="end">
        {{ shadowAccount.amount | currency }}</data>
      </kirby-item>
    }
  </kirby-card>
</kirby-list>
`,vC=(()=>{let e=class e extends lt{constructor(){super(...arguments),this.template=_s}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-multi-card-list-no-shape-example"]],features:[E],decls:2,vars:2,consts:[["shape","none","hasItemSpacing","true",3,"items","showDivider"],[4,"kirbyListItemTemplate"],["title","Account is overdraft",3,"flagged"],[1,"kirby-text-bold"],["slot","end",1,"kirby-text-bold",3,"value"],["slot","end",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),x(1,xs,10,6,"kirby-card",1),n()),t&2&&m("items",a.items)("showDivider",!1)},dependencies:[H,N,T,h,Je],encapsulation:2});let i=e;return i})();function ws(i,e){if(i&1&&(o(0,"kirby-item")(1,"p",2),l(2),n(),o(3,"data",3),l(4),n()()),i&2){let s=e.$implicit;c(2),k(s.title),c(2),k(s.amount)}}var Ss=`<kirby-list [items]="items">
   <kirby-item *kirbyListItemTemplate="let item">
     <p class="kirby-item-title">{{item.title}}</p>
     <data slot="end">{{item.amount}}</data>
   </kirby-item>
</kirby-list>`,MC=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Ss}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-items-example"]],features:[E],decls:2,vars:1,consts:[[3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),x(1,ws,5,2,"kirby-item",1),n()),t&2&&m("items",a.items)},dependencies:[H,N,h],encapsulation:2});let i=e;return i})();function Ms(i,e){if(i&1&&(o(0,"kirby-item")(1,"p",2),l(2),n(),o(3,"data",3),l(4),n()()),i&2){let s=e.$implicit;c(2),k(s.title),c(2),k(s.amount)}}var Ts=`<kirby-list [items]="items" [showDivider]="false">
  <kirby-item *kirbyListItemTemplate="let item">
    <p class="kirby-item-title">{{item.title}}</p>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`,OC=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Ts}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-items-no-dividers-example"]],features:[E],decls:2,vars:2,consts:[[3,"items","showDivider"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),x(1,Ms,5,2,"kirby-item",1),n()),t&2&&m("items",a.items)("showDivider",!1)},dependencies:[H,N,h],encapsulation:2});let i=e;return i})();function Es(i,e){i&1&&(o(0,"kirby-list-header")(1,"p"),l(2,"Name"),n(),o(3,"p"),l(4,"Value"),n()())}function Ps(i,e){if(i&1&&(o(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),l(3),n(),o(4,"p",6),l(5),n()(),o(6,"kirby-label",7)(7,"data",8),l(8),n(),o(9,"data",9),l(10),n()()()),i&2){let s=e.$implicit;m("selectable",!0),c(3),_(" ",s.title),c(2),_(" ",s.subTitle),c(2),m("value",s.amount),c(),_(" ",s.amount),c(),m("value",s.detail),c(),_(" ",s.detail)}}function Ds(i,e){i&1&&(o(0,"div",10)(1,"p"),l(2,"An appropriate footer"),n(),o(3,"button",11),l(4,"Click me!"),n()())}var Os=`<kirby-list 
  [items]="items" 
  (itemSelect)="onItemSelect($event)">
    <!-- HEADER-->
    <kirby-list-header *kirbyListHeader>
      <p>Name</p>
      <p>Value</p>
    </kirby-list-header>

    <!-- BODY -->
    <kirby-item 
      *kirbyListItemTemplate="let item" 
      [selectable]="true">
        <kirby-label>
          <p class="kirby-item-title">
          {{item.title}}</p>
          <p class="kirby-item-subtitle">
          {{item.subTitle}}</p>
        </kirby-label>
        <kirby-label slot="end">
          <data [value]="item.amount">
          {{item.amount}}</data>
          <data [value]="item.detail" 
          class="kirby-item-detail">
          {{item.detail}}</data>
        </kirby-label>
    </kirby-item>

    <!-- Footer -->
    <div class="footer" *kirbyListFooter>
      <p>An appropriate footer</p>
      <button kirby-button>Click me!</button>
    </div>
</kirby-list>`,BC=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Os}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-header-and-footer-example"]],features:[E],decls:4,vars:1,consts:[[3,"itemSelect","items"],[4,"kirbyListHeader"],[3,"selectable",4,"kirbyListItemTemplate"],["class","footer",4,"kirbyListFooter"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"],[1,"footer"],["kirby-button",""]],template:function(t,a){t&1&&(o(0,"kirby-list",0),b("itemSelect",function(C){return a.onItemSelect(C)}),x(1,Es,5,0,"kirby-list-header",1)(2,Ps,11,7,"kirby-item",2)(3,Ds,5,0,"div",3),n()),t&2&&m("items",a.items)},dependencies:[H,h,f,z,Mo,N,Eo,To],styles:["p[_ngcontent-%COMP%]{margin:0}",".footer[_ngcontent-%COMP%]{text-align:center;width:100%}"]});let i=e;return i})();function Is(i,e){if(i&1&&p(0,"kirby-list-section-header",3),i&2){let s=e.$implicit;m("title",s)}}function Fs(i,e){if(i&1&&(o(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),l(3),n(),o(4,"data",6),l(5),n()(),o(6,"kirby-label",7)(7,"data",8),l(8),n()()()),i&2){let s=e.$implicit;m("selectable",!0),c(3),k(s.title),c(),m("value",s.detail),c(),_(" ",s.detail),c(2),m("value",s.amount),c(),_(" ",s.amount)}}var Ls=`<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName">
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section">
  </kirby-list-section-header>
  <kirby-item 
    *kirbyListItemTemplate="let item" 
    [selectable]="true">
    <kirby-label>
      <p class="kirby-item-title">{{ item.title }}</p>
      <data [value]="item.detail" 
      class="kirby-item-detail">
      {{ item.detail }}</data>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">
      {{ item.amount }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>`,WC=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Ls}getSectionName(r){return r.detail>0?"Positive":"Negative"}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-sections-example"]],features:[E],decls:3,vars:2,consts:[[3,"itemSelect","items","getSectionName"],[3,"title",4,"kirbyListSectionHeader"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"title"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-detail",3,"value"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),b("itemSelect",function(C){return a.onItemSelect(C)}),x(1,Is,1,1,"kirby-list-section-header",1)(2,Fs,9,6,"kirby-item",2),n()),t&2&&m("items",a.items)("getSectionName",a.getSectionName)},dependencies:[H,h,z,Wt,Vt,N],encapsulation:2});let i=e;return i})();function As(i,e){if(i&1&&p(0,"kirby-list-section-header",3),i&2){let s=e.$implicit;m("title",s)}}function zs(i,e){if(i&1&&(o(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),l(3),n(),o(4,"data",6),l(5),n()(),o(6,"kirby-label",7)(7,"data",8),l(8),n()()()),i&2){let s=e.$implicit;m("selectable",!0),c(3),_(" ",s.title),c(),m("value",s.detail),c(),_(" ",s.detail),c(2),m("value",s.amount),c(),_(" ",s.amount)}}var Bs=`<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getStandAloneByProperty]="'isStandAlone'"
  [getSectionName]="getSectionName"
  [standAloneSpacing]="'xxs'">
    <kirby-list-section-header
      *kirbyListSectionHeader="let section"
      [title]="section">
      </kirby-list-section-header>
    <kirby-item *kirbyListItemTemplate="let item" 
      [selectable]="true">
      <kirby-label>
        <p class="kirby-item-title">
        {{ item.title }}</p>
        <data [value]="item.detail" 
        class="kirby-item-detail">
        {{ item.detail }}</data>
      </kirby-label>
      <kirby-label slot="end">
        <data [value]="item.amount">
        {{ item.amount }}</data>
      </kirby-label>
    </kirby-item>
</kirby-list>`,jC=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Bs}getSectionName(r){return r.detail>0?"Positive":"Negative"}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-sections-and-stand-alone-example"]],features:[E],decls:3,vars:4,consts:[[3,"itemSelect","items","getStandAloneByProperty","getSectionName","standAloneSpacing"],[3,"title",4,"kirbyListSectionHeader"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"title"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-detail",3,"value"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),b("itemSelect",function(C){return a.onItemSelect(C)}),x(1,As,1,1,"kirby-list-section-header",1)(2,zs,9,6,"kirby-item",2),n()),t&2&&m("items",a.items)("getStandAloneByProperty","isStandAlone")("getSectionName",a.getSectionName)("standAloneSpacing","xxs")},dependencies:[H,z,h,Wt,Vt,N],encapsulation:2});let i=e;return i})();function Ns(i,e){if(i&1&&(o(0,"kirby-item",2)(1,"p",3),l(2),n(),o(3,"data",4),l(4),n()()),i&2){let s=e.$implicit;m("selectable",!0),c(2),k(s.title),c(2),_(" ",s.amount)}}var Ks=`<kirby-list 
  [items]="items" 
  (itemSelect)="onItemSelect($event)">
    <kirby-item 
      *kirbyListItemTemplate="let 
      item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
      <data slot="end" 
      class="kirby-text-bold">
      {{item.amount}}</data>
    </kirby-item>
</kirby-list>`,ZC=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Ks}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-selectable-items-example"]],features:[E],decls:2,vars:1,consts:[[3,"itemSelect","items"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"selectable"],[1,"kirby-item-title"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),b("itemSelect",function(C){return a.onItemSelect(C)}),x(1,Ns,5,3,"kirby-item",1),n()),t&2&&m("items",a.items)},dependencies:[H,h,N],encapsulation:2});let i=e;return i})();function qs(i,e){if(i&1&&(o(0,"kirby-item",2)(1,"kirby-label")(2,"p",3),l(3),n(),o(4,"data",4),l(5),n()(),o(6,"kirby-label",5)(7,"data",6),l(8),n()()()),i&2){let s=e.$implicit;m("selectable",!0),c(3),_(" ",s.title),c(),m("value",s.detail),c(),_(" ",s.detail),c(2),m("value",s.amount),c(),_(" ",s.amount)}}var Hs=`<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getStandAloneByProperty]="'isStandAlone'"
  [standAloneSpacing]="'xxs'">
    <kirby-item 
      *kirbyListItemTemplate="let item" 
      [selectable]="true">
        <kirby-label>
          <p class="kirby-item-title">
          {{ item.title }}</p>
          <data [value]="item.detail" 
          class="kirby-item-detail">
          {{ item.detail }}</data>
        </kirby-label>
        <kirby-label slot="end">
          <data [value]="item.amount">
          {{ item.amount }}</data>
        </kirby-label>
    </kirby-item>
</kirby-list>`,ov=(()=>{let e=class e extends te{constructor(){super(...arguments),this.template=Hs}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-stand-alone-example"]],features:[E],decls:2,vars:3,consts:[[3,"itemSelect","items","getStandAloneByProperty","standAloneSpacing"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-detail",3,"value"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),b("itemSelect",function(C){return a.onItemSelect(C)}),x(1,qs,9,6,"kirby-item",1),n()),t&2&&m("items",a.items)("getStandAloneByProperty","isStandAlone")("standAloneSpacing","xxs")},dependencies:[H,h,z,N],encapsulation:2});let i=e;return i})();function Ws(i,e){i&1&&p(0,"div",3)}function Vs(i,e){i&1&&p(0,"div",4)}function Rs(i,e){if(i&1&&(o(0,"kirby-item")(1,"div",2),O(2,Ws,1,0,"div",3),O(3,Vs,1,0,"div",4),n(),o(4,"h3"),l(5),n(),o(6,"data",5),l(7),n()()),i&2){let s=e.$implicit;c(2),I(s.flagged?2:-1),c(),I(s.archived?3:-1),c(2),k(s.title),c(2),k(s.amount)}}var lv=(()=>{let e=class e{constructor(r){this.toastController=r,this.items=[{id:0,title:"Vestas Wind Systems",subTitle:"2000 pcs",amount:"5.587.218.309 DKK",detail:225,archived:!0,flagged:!1,color:"default"},{id:1,title:"Cypress Semiconductor Corporation",subTitle:"1827 pcs",amount:"76.980 DKK",detail:-3,flagged:!0,deleted:!0,color:"light"},{id:2,title:"Ultragenyx Pharmaceutical Inc.",subTitle:"787 pcs",amount:"83.004 DKK",detail:-115,color:"white"},{id:3,title:"Trans World Entertainment Corp. [disabled]",subTitle:"467 pcs",amount:"60.963 DKK",detail:6,color:"light"},{id:4,title:"Astronics Corporation",subTitle:"791 pcs",amount:"33.830 DKK",detail:-154,color:"white"},{id:5,title:"Riverview Bancorp Inc",subTitle:"206 pcs",amount:"60.775 DKK",detail:98,color:"light"},{id:6,title:"Haemonetics Corporation",subTitle:"988 pcs",amount:"61.196 DKK",detail:220,color:"white"},{id:7,title:"PJT Partners Inc.",subTitle:"1706 pcs",amount:"52.441 DKK",detail:129,color:"light"}],this.swipeActions=[{position:"left",title:"Archive",type:"warning",onSelected:t=>this.onArchiveItem(t),isDisabled:t=>t.archived||t.id===3},{position:"left",title:t=>t.flagged?"Remove flag":"Flag",icon:t=>t.flagged?null:"flag",type:"success",onSelected:t=>this.onFlagItem(t),isDisabled:t=>t.id===3},{position:"right",title:t=>t.deleted?"Restore":"Delete",icon:t=>t.deleted?"swap":"trash",type:t=>t.deleted?"warning":"danger",onSelected:t=>t.deleted?this.onRestoreItem(t):this.onDeleteItem(t),isDisabled:t=>t.id===3}]}onArchiveItem(r){r.archived=!r.archived;let t={message:`Item '${r.title}' has been archived.`,messageType:"warning",durationInMs:1500};this.toastController.showToast(t)}onFlagItem(r){r.flagged=!r.flagged;let t=r.flagged?"flagged":"un-flagged",a={message:`Item '${r.title}' has been ${t}.`,messageType:"success",durationInMs:1500};this.toastController.showToast(a)}onDeleteItem(r){r.deleted=!r.deleted;let t={message:`Item '${r.title}' has been deleted.`,messageType:"warning",durationInMs:1500};this.toastController.showToast(t)}onRestoreItem(r){r.deleted=!r.deleted;let t={message:`Item '${r.title}' has been restored.`,messageType:"warning",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-list-swipe-example"]],decls:4,vars:2,consts:[["showDivider","true",3,"items","swipeActions"],[4,"kirbyListItemTemplate"],["slot","outside"],[1,"flag","success"],[1,"flag","warning"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(o(0,"h2"),l(1,"List with swipe actions:"),n(),o(2,"kirby-list",0),x(3,Rs,8,4,"kirby-item",1),n()),t&2&&(c(2),m("items",a.items)("swipeActions",a.swipeActions))},dependencies:[H,N,h],styles:["[_nghost-%COMP%]{display:block;height:100%;padding:var(--kirby-spacing-s);background-color:var(--kirby-background-color)}.flag[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:var(--kirby-border-radius-circle)}.flag.success[_ngcontent-%COMP%]{background:var(--kirby-success)}.flag.warning[_ngcontent-%COMP%]{background:var(--kirby-warning)}.flag[_ngcontent-%COMP%]:not(:last-child){margin-bottom:2px}"]});let i=e;return i})();function Ti(){let i=Xt(!1),e=Xt(!1),s=Xt(!1),r={isLoading:i.asReadonly(),showBackdrop:e.asReadonly(),hideContent:s.asReadonly(),show(t=!1,a=!1){e.set(t),s.set(a),i.set(!0),setTimeout(()=>r.hide(),3e3)},hide(){i.set(!1),e.set(!1),s.set(!1)}};return r}var Gs={selector:"cookbook-loading-overlay-example-card",template:`<kirby-loading-overlay [hideContent]="overlay.hideContent()" [isLoading]="overlay.isLoading()" [showBackdrop]="overlay.showBackdrop()">
  <kirby-card [hasPadding]="true">
      <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="overlay.show(true)"
    >
      Show wrapper loading overlay on card
    </button>
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="overlay.show(false, true)"
    >
      Show wrapper loading overlay that hides card
    </button>
  </kirby-card>
</kirby-loading-overlay>`},gv=(()=>{let e=class e{constructor(){this.overlay=Ti(),this.template=Gs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-loading-overlay-example-card"]],decls:6,vars:4,consts:[[3,"hideContent","isLoading","showBackdrop"],[3,"hasPadding"],["kirby-button","","attentionLevel","2","size","lg","expand","block",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-loading-overlay",0)(1,"kirby-card",1)(2,"button",2),b("click",function(){return a.overlay.show(!0)}),l(3," Show wrapper loading overlay on card "),n(),o(4,"button",2),b("click",function(){return a.overlay.show(!1,!0)}),l(5," Show wrapper loading overlay that hides card "),n()()()),t&2&&(m("hideContent",a.overlay.hideContent())("isLoading",a.overlay.isLoading())("showBackdrop",a.overlay.showBackdrop()),c(),m("hasPadding",!0))},dependencies:[Nt,f,T],styles:["button[kirby-button][_ngcontent-%COMP%]{margin-left:0;margin-right:0}"]});let i=e;return i})();var $s={selector:"cookbook-loading-overlay-example-default",template:`<kirby-loading-overlay
  [isLoading]="overlay.isLoading()"
  [showBackdrop]="overlay.showBackdrop()"
  [hideContent]="overlay.hideContent()"
>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="overlay.show(true)"
  >
    Show wrapper loading overlay
  </button>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="overlay.show(false, true)"
  >
    Show wrapper loading overlay that hides content
  </button>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="overlay.show(false)"
  >
    Show wrapper loading overlay without backdrop
  </button>
</kirby-loading-overlay>`},Cv=(()=>{let e=class e{constructor(){this.overlay=Ti(),this.template=$s.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-loading-overlay-example-default"]],decls:7,vars:3,consts:[[3,"isLoading","showBackdrop","hideContent"],["kirby-button","","attentionLevel","2","size","lg","expand","block",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-loading-overlay",0)(1,"button",1),b("click",function(){return a.overlay.show(!0)}),l(2," Show wrapper loading overlay "),n(),o(3,"button",1),b("click",function(){return a.overlay.show(!1,!0)}),l(4," Show wrapper loading overlay that hides content "),n(),o(5,"button",1),b("click",function(){return a.overlay.show(!1)}),l(6," Show wrapper loading overlay without backdrop "),n()()),t&2&&m("isLoading",a.overlay.isLoading())("showBackdrop",a.overlay.showBackdrop())("hideContent",a.overlay.hideContent())},dependencies:[Nt,f],styles:["button[kirby-button][_ngcontent-%COMP%]{margin-left:0;margin-right:0}"]});let i=e;return i})();var Tn=`import { LoadingOverlayService } from '@kirbydesign/designsystem';

@Component({
 ...
})
export class myComponent {
   constructor(private loadingOverlayService: LoadingOverlayService) {}
   
    public showFullscreenLoadingOverlay(showBackdrop: boolean, hideContent: boolean) {
        this.loadingOverlayService.showLoadingOverlay(showBackdrop, hideContent);
    }

    public hideFullscreenLoadingOverlay() {
        this.loadingOverlayService.hideLoadingOverlay()
    }
}
`;var js={selector:"cookbook-loading-overlay-example-service",template:`<button
  kirby-button
  attentionLevel="2"
  size="lg"
  expand="block"
  (click)="showFullscreenLoadingOverlay(true)"
>
  Show full page loading overlay
</button>
<button
  kirby-button
  attentionLevel="2"
  size="lg"
  expand="block"
  (click)="showFullscreenLoadingOverlay(false, true)"
>
  Show full page loading overlay that hides content
</button>
<button
  kirby-button
  attentionLevel="2"
  size="lg"
  expand="block"
  (click)="showFullscreenLoadingOverlay(false)"
>
  Show full page loading overlay without backdrop
</button>
`},Sv=(()=>{let e=class e{constructor(r){this.loadingOverlayService=r,this.template=js.template,this.codeSnippet=Tn}showFullscreenLoadingOverlay(r,t){this.loadingOverlayService.showLoadingOverlay(r,t),setTimeout(()=>{this.loadingOverlayService.hideLoadingOverlay()},3e3)}};e.\u0275fac=function(t){return new(t||e)(v(wo))},e.\u0275cmp=d({type:e,selectors:[["cookbook-loading-overlay-example-service"]],decls:6,vars:0,consts:[["kirby-button","","attentionLevel","2","size","lg","expand","block",3,"click"]],template:function(t,a){t&1&&(o(0,"button",0),b("click",function(){return a.showFullscreenLoadingOverlay(!0)}),l(1,` Show full page loading overlay
`),n(),o(2,"button",0),b("click",function(){return a.showFullscreenLoadingOverlay(!1,!0)}),l(3,` Show full page loading overlay that hides content
`),n(),o(4,"button",0),b("click",function(){return a.showFullscreenLoadingOverlay(!1)}),l(5,` Show full page loading overlay without backdrop
`),n())},dependencies:[f],encapsulation:2});let i=e;return i})();var En=(i,e)=>e.text;function Ys(i,e){if(i&1&&(o(0,"a",1),l(1),n()),i&2){let s=y().$implicit;m("routerLink",s.route)("target",s.target),c(),_(" ",s.text," ")}}function Qs(i,e){if(i&1&&l(0),i&2){let s=y().$implicit;_(" ",s.text," ")}}function Js(i,e){if(i&1&&(o(0,"li",2)(1,"a",3),l(2),n()()),i&2){let s=e.$implicit;c(),m("routerLink",s.route)("target",s.target),c(),_(" ",s.text," ")}}function Zs(i,e){if(i&1&&(o(0,"ul"),K(1,Js,3,3,"li",2,En),n()),i&2){let s=y().$implicit;c(),q(s.steps)}}function Xs(i,e){if(i&1&&(o(0,"li"),O(1,Ys,2,3,"a",1),O(2,Qs,1,1),O(3,Zs,3,0,"ul"),n()),i&2){let s=e.$implicit,r=e.$index,t=y();R("active",t.currentStep-1===r&&!s.steps),c(),I(r===t.currentStep-1&&s.route?1:-1),c(),I(r!==t.currentStep-1||r===t.currentStep-1&&!s.route?2:-1),c(),I(t.currentStep-1===r&&s.steps?3:-1)}}var Pn=(()=>{let e=class e{constructor(r){this.route=r,this.steps=[{text:"Open the example in a separate tab or window",steps:[{text:"Controller based example",route:"/examples/modal-with-guard",target:"_blank"},{text:"Route based example",route:["/examples/modal-route-with-guard"],target:"_blank"}]},{text:"Navigate to the guard protected route",route:void 0},{text:"Click the browser back button"}],this.currentStep=1}ngOnInit(){this.route.snapshot.data.step&&(this.currentStep=this.route.snapshot.data.step),this.route.snapshot.data.nextRoute&&(this.steps[this.currentStep-1].route=this.route.snapshot.data.nextRoute)}};e.\u0275fac=function(t){return new(t||e)(v(ai))},e.\u0275cmp=d({type:e,selectors:[["cookbook-modal-example-alert-with-guard-stepper"]],inputs:{currentStep:"currentStep"},decls:3,vars:0,consts:[[3,"active"],[3,"routerLink","target"],[1,"active"],[1,"kirby-external-icon",3,"routerLink","target"]],template:function(t,a){t&1&&(o(0,"ol"),K(1,Xs,4,5,"li",0,En),n()),t&2&&(c(),q(a.steps))},dependencies:[li,ye],styles:["[_nghost-%COMP%]{display:block}li.active[_ngcontent-%COMP%]{font-weight:700}"]});let i=e;return i})();var Ei=(()=>{let e=class e{constructor(r){this.modal=r}onHideModal(){this.modal.close()}};e.\u0275fac=function(t){return new(t||e)(v(Kt,12))},e.\u0275cmp=d({type:e,selectors:[["ng-component"]],decls:3,vars:0,consts:[["iconName","close","title","Out of service","subtitle","The system is currently down. Please contact customer support.","themeColor","danger"],["kirby-button","","attentionLevel","3",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-empty-state",0)(1,"button",1),b("click",function(){return a.onHideModal()}),l(2,"Hide modal"),n()())},dependencies:[He,Y,f],encapsulation:2});let i=e;return i})();function tc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",11),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleDummyKeyboard(t))}),n()}if(i&2){let s=y();m("checked",s.showDummyKeyboard&&!s.interactWithBackground)("disabled",s.interactWithBackground||s.disabled)}}function ic(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",12),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleShowPageProgress(t))}),n()}if(i&2){let s=y();m("checked",s.showPageProgress&&!s.interactWithBackground)("disabled",s.interactWithBackground||s.disabled)}}function oc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",13),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleShowFooter(t))}),n()}if(i&2){let s=y();m("checked",s.showFooter&&!s.interactWithBackground)("disabled",s.interactWithBackground||s.disabled)}}function nc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",14),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleDisplayFooterAsInline(t))}),n()}if(i&2){let s=y();m("checked",s.displayFooterAsInline)("disabled",s.disabled||!s.showFooter)}}function rc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",15),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleSnapFooterToKeyboard(t))}),n()}if(i&2){let s=y();m("checked",s.snapFooterToKeyboard)("disabled",s.disabled||!s.showFooter)}}function ac(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",16),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleDisableScroll(t))}),n()}if(i&2){let s=y();m("checked",s.disableScroll)("disabled",s.disabled)}}function lc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",17),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleShowDummyContent(t))}),n()}if(i&2){let s=y();m("checked",s.showDummyContent)("disabled",s.interactWithBackground||s.disabled)}}function sc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",18),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleDelayLoadDummyContent(t))}),n()}if(i&2){let s=y();m("checked",s.delayLoadDummyContent&&!s.interactWithBackground)("disabled",!s.showDummyContent||s.interactWithBackground||s.disabled)}}function cc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",19),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleLoadAdditionalContent(t))}),n()}if(i&2){let s=y();m("checked",s.loadAdditionalContent&&!s.interactWithBackground)("disabled",!s.showDummyContent||s.interactWithBackground||s.disabled)}}function mc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",20),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleCollapseTitle(t))}),n()}if(i&2){let s=y();m("checked",s.collapseTitle)("disabled",s.disabled)}}function dc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",21),b("checkedChange",function(t){S(s);let a=y();return M(a.toggleAlertBeforeClose(t))}),n()}if(i&2){let s=y();m("checked",s.alertBeforeClose)("disabled",s.disabled)}}function pc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",25),b("checkedChange",function(t){S(s);let a=y(2);return M(a.toggleInteractWithBackground(t))}),n()}if(i&2){let s=y(2);m("checked",s.interactWithBackground)("disabled",s.disabled)}}function bc(i,e){if(i&1){let s=P();o(0,"kirby-checkbox",26),b("checkedChange",function(t){S(s);let a=y(2);return M(a.toggleCustomCssClass(t))}),n()}if(i&2){let s=y(2);m("checked",s.customCssClass)("disabled",s.disabled)}}function uc(i,e){if(i&1&&(p(0,"kirby-divider",22),o(1,"p"),l(2,"Custom modal/drawer:"),n(),O(3,pc,1,2,"kirby-checkbox",23),O(4,bc,1,2,"kirby-checkbox",24)),i&2){let s=y();m("hasMargin",!0),c(3),I(s.interactWithBackground!==void 0?3:-1),c(),I(s.customCssClass!==void 0?4:-1)}}var Pi=(()=>{let e=class e{constructor(r){this.windowRef=r,this.showDummyKeyboardChange=new pe,this.showPageProgressChange=new pe,this.collapseTitleChange=new pe,this.alertBeforeCloseChange=new pe,this.showFooterChange=new pe,this.displayFooterAsInlineChange=new pe,this.showDummyContentChange=new pe,this.delayLoadDummyContentChange=new pe,this.loadAdditionalContentChange=new pe,this.disableScrollChange=new pe,this.interactWithBackgroundChange=new pe,this.customCssClassChange=new pe,this.snapFooterToKeyboardChange=new pe,this.preventChangeEvent=!1}toggleDummyKeyboard(r){let t="kirby-cookbook-show-dummy-keyboard";this.showDummyKeyboard=r,this.showDummyKeyboard?this.windowRef.nativeWindow.sessionStorage.setItem(t,"true"):this.windowRef.nativeWindow.sessionStorage.removeItem(t),setTimeout(()=>this.windowRef.nativeWindow.dispatchEvent(new CustomEvent("kirbyToggleDummyKeyboard",{detail:this.showDummyKeyboard})))}_onToggleDummyKeyboard(r){this.showDummyKeyboard!==void 0&&(this.showDummyKeyboard=r)}toggleShowPageProgress(r){this.preventChangeEvent||(this.showPageProgress=r,this.showPageProgressChange.emit(this.showPageProgress))}toggleShowFooter(r){this.preventChangeEvent||(this.showFooter=r,this.showFooterChange.emit(this.showFooter))}toggleDisplayFooterAsInline(r){this.preventChangeEvent||(this.displayFooterAsInline=r,this.displayFooterAsInlineChange.emit(this.displayFooterAsInline))}toggleCollapseTitle(r){this.preventChangeEvent||(this.collapseTitle=r,this.collapseTitleChange.emit(this.collapseTitle))}toggleAlertBeforeClose(r){this.preventChangeEvent||(this.alertBeforeClose=r,this.alertBeforeCloseChange.emit(this.alertBeforeClose))}toggleShowDummyContent(r){this.showDummyContent=r,this.showDummyContentChange.emit(this.showDummyContent)}toggleDelayLoadDummyContent(r){this.preventChangeEvent||(this.delayLoadDummyContent=r,this.delayLoadDummyContentChange.emit(this.delayLoadDummyContent))}toggleLoadAdditionalContent(r){this.preventChangeEvent||(this.loadAdditionalContent=r,this.loadAdditionalContentChange.emit(this.loadAdditionalContent))}toggleDisableScroll(r){this.preventChangeEvent||(this.disableScroll=r,this.disableScrollChange.emit(this.disableScroll))}toggleInteractWithBackground(r){this.preventChangeEvent=!0,this.interactWithBackground=r,this.toggleCustomCssClass(r),r&&this.toggleShowDummyContent(!0),this.interactWithBackgroundChange.emit(r),setTimeout(()=>this.preventChangeEvent=!1)}toggleCustomCssClass(r){this.customCssClass=r,this.customCssClassChange.emit(r)}toggleSnapFooterToKeyboard(r){this.snapFooterToKeyboard=r,this.snapFooterToKeyboardChange.emit(r)}};e.\u0275fac=function(t){return new(t||e)(v(si))},e.\u0275cmp=d({type:e,selectors:[["cookbook-modal-example-configuration"]],hostBindings:function(t,a){t&1&&b("kirbyToggleDummyKeyboard",function(C){return a._onToggleDummyKeyboard(C.detail)},eo)},inputs:{disabled:"disabled",flavor:"flavor",showDummyKeyboard:"showDummyKeyboard",showPageProgress:"showPageProgress",collapseTitle:"collapseTitle",alertBeforeClose:"alertBeforeClose",showFooter:"showFooter",displayFooterAsInline:"displayFooterAsInline",showDummyContent:"showDummyContent",delayLoadDummyContent:"delayLoadDummyContent",loadAdditionalContent:"loadAdditionalContent",disableScroll:"disableScroll",interactWithBackground:"interactWithBackground",customCssClass:"customCssClass",snapFooterToKeyboard:"snapFooterToKeyboard"},outputs:{showDummyKeyboardChange:"showDummyKeyboardChange",showPageProgressChange:"showPageProgressChange",collapseTitleChange:"collapseTitleChange",alertBeforeCloseChange:"alertBeforeCloseChange",showFooterChange:"showFooterChange",displayFooterAsInlineChange:"displayFooterAsInlineChange",showDummyContentChange:"showDummyContentChange",delayLoadDummyContentChange:"delayLoadDummyContentChange",loadAdditionalContentChange:"loadAdditionalContentChange",disableScrollChange:"disableScrollChange",interactWithBackgroundChange:"interactWithBackgroundChange",customCssClassChange:"customCssClassChange",snapFooterToKeyboardChange:"snapFooterToKeyboardChange"},decls:12,vars:12,consts:[["text","Show dummy keyboard","size","xs",3,"checked","disabled"],["text","Show page progress (modal only)","size","xs",3,"checked","disabled"],["text","Show footer","size","xs",3,"checked","disabled"],["text","Display footer as inline","size","xs",1,"indent",3,"checked","disabled"],["text","Snap footer to keyboard","size","xs",1,"indent",3,"checked","disabled"],["text","Disable scroll","size","xs",3,"checked","disabled"],["text","Show dummy content","size","xs",3,"checked","disabled"],["text","Delay load modal","size","xs",1,"indent",3,"checked","disabled"],["text","Delay load additional","size","xs",1,"indent",3,"checked","disabled"],["text","Collapse title","size","xs",3,"checked","disabled"],["text","Alert before closing","size","xs",3,"checked","disabled"],["text","Show dummy keyboard","size","xs",3,"checkedChange","checked","disabled"],["text","Show page progress (modal only)","size","xs",3,"checkedChange","checked","disabled"],["text","Show footer","size","xs",3,"checkedChange","checked","disabled"],["text","Display footer as inline","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Snap footer to keyboard","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Disable scroll","size","xs",3,"checkedChange","checked","disabled"],["text","Show dummy content","size","xs",3,"checkedChange","checked","disabled"],["text","Delay load modal","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Delay load additional","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Collapse title","size","xs",3,"checkedChange","checked","disabled"],["text","Alert before closing","size","xs",3,"checkedChange","checked","disabled"],[3,"hasMargin"],["text","Interact with background (drawer only)","size","xs",3,"checked","disabled"],["text","Add custom CSS class","size","xs",3,"checked","disabled"],["text","Interact with background (drawer only)","size","xs",3,"checkedChange","checked","disabled"],["text","Add custom CSS class","size","xs",3,"checkedChange","checked","disabled"]],template:function(t,a){t&1&&(O(0,tc,1,2,"kirby-checkbox",0),O(1,ic,1,2,"kirby-checkbox",1),O(2,oc,1,2,"kirby-checkbox",2),O(3,nc,1,2,"kirby-checkbox",3),O(4,rc,1,2,"kirby-checkbox",4),O(5,ac,1,2,"kirby-checkbox",5),O(6,lc,1,2,"kirby-checkbox",6),O(7,sc,1,2,"kirby-checkbox",7),O(8,cc,1,2,"kirby-checkbox",8),O(9,mc,1,2,"kirby-checkbox",9),O(10,dc,1,2,"kirby-checkbox",10),O(11,uc,5,3)),t&2&&(I(a.showDummyKeyboard!==void 0?0:-1),c(),I(a.showPageProgress!==void 0&&(a.flavor===void 0||a.flavor==="modal")?1:-1),c(),I(a.showFooter!==void 0?2:-1),c(),I(a.displayFooterAsInline!==void 0?3:-1),c(),I(a.snapFooterToKeyboard!==void 0?4:-1),c(),I(a.disableScroll!==void 0?5:-1),c(),I(a.showDummyContent!==void 0?6:-1),c(),I(a.delayLoadDummyContent!==void 0?7:-1),c(),I(a.loadAdditionalContent!==void 0?8:-1),c(),I(a.collapseTitle!==void 0?9:-1),c(),I(a.alertBeforeClose!==void 0?10:-1),c(),I(a.interactWithBackground!==void 0||a.customCssClass!==void 0?11:-1))},dependencies:[B,Ze],styles:["kirby-checkbox[_ngcontent-%COMP%]:not(:first-of-type){margin-top:var(--kirby-spacing-xxxs)}kirby-checkbox.indent[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-l);margin-top:var(--kirby-spacing-xxxs)}p[_ngcontent-%COMP%]{margin:0;font-size:var(--kirby-font-size-s)}"]});let i=e;return i})();var gc=(i,e)=>e.value||e.text;function yc(i,e){if(i&1&&(o(0,"kirby-item",1),p(1,"kirby-radio",2),o(2,"kirby-label"),l(3),n()()),i&2){let s=e.$implicit;c(),m("value",s),c(2),k(s.text)}}var xt=(()=>{let e=class e{constructor(){this.modalSizeOptions=[{text:"Small",value:"small"},{text:"Medium (default)",value:"medium"},{text:"Large",value:"large"},{text:"Full height (medium width only)",value:"full-height"}],this.size=this.modalSizeOptions[1],this.sizeChange=new pe}onValueChange(r){this.size=r,this.sizeChange.emit(this.size)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-modal-example-size-selector"]],outputs:{sizeChange:"sizeChange"},decls:3,vars:1,consts:[[3,"valueChange","value"],["size","xs"],["slot","start",3,"value"]],template:function(t,a){t&1&&(o(0,"kirby-radio-group",0),b("valueChange",function(C){return a.onValueChange(C)}),K(1,yc,4,2,"kirby-item",1,gc),n()),t&2&&(m("value",a.size),c(),q(a.modalSizeOptions))},dependencies:[ke,h,ae],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();function kc(i,e){i&1&&(o(0,"kirby-page-progress")(1,"kirby-progress-circle",4),l(2," 2/4 "),n()())}function fc(i,e){if(i&1){let s=P();p(0,"kirby-divider",8),o(1,"p",9),l(2," Size of nested modal/drawer "),p(3,"br"),o(4,"em"),l(5,"(on screens larger than 768px)"),n()(),o(6,"cookbook-modal-example-size-selector",10),b("sizeChange",function(t){S(s);let a=y(3);return M(a.setSelectedModalSize(t))}),n()}i&2&&m("hasMargin",!0)}function hc(i,e){if(i&1){let s=P();o(0,"kirby-card",5)(1,"h3"),l(2,"Open nested:"),n(),o(3,"button",6),b("click",function(){S(s);let t=y(2);return M(t.showNestedModal())}),l(4,"Modal"),n(),o(5,"button",6),b("click",function(){S(s);let t=y(2);return M(t.showNestedDrawer())}),l(6,"Drawer"),n(),o(7,"button",6),b("click",function(){S(s);let t=y(2);return M(t.showNestedAlert())}),l(8,"Alert"),n(),o(9,"button",6),b("click",function(){S(s);let t=y(2);return M(t.showNestedActionSheet())}),l(10," Action sheet "),n(),o(11,"details")(12,"summary"),l(13,"Configuration for nested modal"),n(),o(14,"cookbook-modal-example-configuration",7),Ie("showPageProgressChange",function(t){S(s);let a=y(2);return W(a.showNestedPageProgress,t)||(a.showNestedPageProgress=t),M(t)})("showFooterChange",function(t){S(s);let a=y(2);return W(a.showNestedFooter,t)||(a.showNestedFooter=t),M(t)})("snapFooterToKeyboardChange",function(t){S(s);let a=y(2);return W(a.snapNestedFooterToKeyboard,t)||(a.snapNestedFooterToKeyboard=t),M(t)})("displayFooterAsInlineChange",function(t){S(s);let a=y(2);return W(a.displayNestedFooterAsInline,t)||(a.displayNestedFooterAsInline=t),M(t)})("showDummyContentChange",function(t){S(s);let a=y(2);return W(a.showNestedDummyContent,t)||(a.showNestedDummyContent=t),M(t)})("collapseTitleChange",function(t){S(s);let a=y(2);return W(a.showNestedCollapseTitle,t)||(a.showNestedCollapseTitle=t),M(t)})("delayLoadDummyContentChange",function(t){S(s);let a=y(2);return W(a.delayLoadDummyContent,t)||(a.delayLoadDummyContent=t),M(t)})("loadAdditionalContentChange",function(t){S(s);let a=y(2);return W(a.loadAdditionalContent,t)||(a.loadAdditionalContent=t),M(t)}),n(),O(15,fc,7,1),n()()}if(i&2){let s=y(2);c(14),Oe("showPageProgress",s.showNestedPageProgress)("showFooter",s.showNestedFooter)("snapFooterToKeyboard",s.snapNestedFooterToKeyboard)("displayFooterAsInline",s.displayNestedFooterAsInline)("showDummyContent",s.showNestedDummyContent)("collapseTitle",s.showNestedCollapseTitle)("delayLoadDummyContent",s.delayLoadDummyContent)("loadAdditionalContent",s.loadAdditionalContent),c(),I(s.showModalSizeSelector!==void 0?15:-1)}}function Cc(i,e){i&1&&(o(0,"div")(1,"h4"),l(2,"The standard Lorem Ipsum passage, used since the 1500s"),n(),o(3,"p"),l(4,' "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." '),n()())}function vc(i,e){if(i&1&&(o(0,"div",11)(1,"h4"),l(2,"Component properties (injected from parent component):"),n(),o(3,"dl")(4,"dt")(5,"code"),l(6,"stringProperty:"),n()(),o(7,"dd"),l(8),n(),o(9,"dt")(10,"code"),l(11,"numberProperty:"),n()(),o(12,"dd"),l(13),n(),o(14,"dt")(15,"code"),l(16,"booleanProperty:"),n()(),o(17,"dd"),l(18),n()()()),i&2){let s=y(3);c(8),k(s.exampleProperties.stringProperty),c(5),k(s.exampleProperties.numberProperty),c(5),k(s.exampleProperties.booleanProperty)}}function xc(i,e){i&1&&(o(0,"div")(1,"h4"),l(2,' Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC '),n(),o(3,"p"),l(4,' "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" 1914 translation by H. Rackham " '),n()())}function _c(i,e){if(i&1){let s=P();o(0,"button",12),b("click",function(){S(s);let t=y(3);return M(t.scrollToTop())}),l(1," Scroll to top "),p(2,"kirby-icon",18),n()}}function wc(i,e){if(i&1){let s=P();O(0,vc,19,3,"div",11),o(1,"button",12),b("click",function(){S(s);let t=y(2);return M(t.scrollToBottom())}),l(2," Scroll to bottom "),p(3,"kirby-icon",13),n(),o(4,"button",14),b("click",function(){S(s);let t=y(2);return M(t.close())}),l(5,"Hide me"),n(),o(6,"kirby-form-field",15),p(7,"input",16),n(),o(8,"h4"),l(9,"The standard Lorem Ipsum passage, used since the 1500s"),n(),o(10,"p"),l(11,' "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." '),n(),o(12,"kirby-loading-overlay",2),O(13,xc,5,0,"div"),n(),O(14,_c,3,0,"button",17)}if(i&2){let s=y(2);I(s.exampleProperties?0:-1),c(12),m("isLoading",s.isLoadingAdditionalContent),c(),I(s.isLoadingAdditionalContent?-1:13),c(),I(s.showFooter?-1:14)}}function Sc(i,e){if(i&1&&(o(0,"div"),O(1,hc,16,9,"kirby-card",5),O(2,Cc,5,0,"div"),O(3,wc,15,4),n()),i&2){let s=y();c(),I(s.showNestedOptions?1:-1),c(),I(s.showStaticDummyContent?2:-1),c(),I(s.showDummyContent?3:-1)}}function Mc(i,e){if(i&1){let s=P();o(0,"kirby-modal-footer",3)(1,"div")(2,"button",12),b("click",function(){S(s);let t=y();return M(t.scrollToTop())}),l(3," To top "),p(4,"kirby-icon",18),n(),o(5,"button",14),b("click",function(){S(s);let t=y();return M(t.close())}),l(6,"Close"),n()()()}if(i&2){let s=y();m("type",s._footerType)("snapToKeyboard",s.snapFooterToKeyboard)}}var Di=(()=>{let e=class e{get _footerType(){return this.displayFooterAsInline?"inline":"fixed"}constructor(r,t,a,g){this.modalController=t,this.toastController=a,this.modal=g,this.showPageProgress=!1,this.showFooter=!1,this.snapFooterToKeyboard=!1,this.displayFooterAsInline=!1,this.showNestedPageProgress=!1,this.showNestedFooter=!1,this.snapNestedFooterToKeyboard=!1,this.showNestedDummyContent=!1,this.displayNestedFooterAsInline=!1,this.isLoading=!1,this.isLoadingAdditionalContent=!1,Object.assign(this,r)}ngOnInit(){this.showDummyContent&&(this.delayLoadDummyContent&&(this.isLoading=!0,setTimeout(()=>this.isLoading=!1,1e3)),this.loadAdditionalContent&&(this.isLoadingAdditionalContent=!0,setTimeout(()=>this.isLoadingAdditionalContent=!1,2e3))),this.modal.canDismiss=()=>this.canDismiss()}canDismiss(){return this.alertBeforeClose?{title:"Are you sure you want to close?",okBtn:"Yes",cancelBtn:"Take me back",icon:{name:"warning",themeColor:"warning"}}:!0}showNestedOverlay(r){let t=r==="modal"?"Nested Modal Title":"Nested Drawer Title",a={flavor:r,drawerSupplementaryAction:{iconName:"edit",action:this.onSupplementaryActionSelect.bind(this)},component:e,size:this.selectedModalSize,collapseTitle:this.showNestedCollapseTitle,componentProps:{title:t,subtitle:"Hello from second embedded example component!",flavor:r,delayLoadDummyContent:this.delayLoadDummyContent,loadAdditionalContent:this.loadAdditionalContent,showPageProgress:this.showNestedPageProgress,showFooter:this.showNestedFooter,snapFooterToKeyboard:this.snapNestedFooterToKeyboard,displayFooterAsInline:this.displayNestedFooterAsInline,showDummyContent:this.showNestedDummyContent}};this.modalController.showModal(a)}showNestedModal(){this.showNestedOverlay("modal")}showNestedDrawer(){this.showNestedOverlay("drawer")}showNestedAlert(){let r={title:"Embedded Alert",message:"The default alert is just a title, a message, an OK and (optional) cancel button",okBtn:"I agree",cancelBtn:"Take me back"};this.modalController.showAlert(r,this.onAlertClose)}showNestedActionSheet(){let r={header:"Nested action sheet",subheader:"Action sheet subheader",items:[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}],cancelButtonText:"Custom cancel"};this.modalController.showActionSheet(r)}scrollToBottom(){this.modal.scrollToBottom(Ni.Duration.EXTRA_LONG)}scrollToTop(){this.modal.scrollToTop(Ni.Duration.SHORT)}toggleDisableScroll(r){this.modal.scrollDisabled=r}togglePageProgress(){this.showPageProgress=!this.showPageProgress}toggleFooter(){this.showFooter=!this.showFooter}close(){let r=Math.PI;this.modal.close(r)}onSupplementaryActionSelect(){let r={message:"Supplementary action selected",messageType:"success",durationInMs:1500};this.toastController.showToast(r)}onSnapFooterToKeyboardCheckbox(r){this.snapFooterToKeyboard=r}onAlertClose(r){console.log(`Alert closed: ${r}`)}setSelectedModalSize(r){this.selectedModalSize=r.value}};e.\u0275fac=function(t){return new(t||e)(v(di),v(oe),v(A),v(Kt,12))},e.\u0275cmp=d({type:e,selectors:[["cookbook-embedded-modal-example"]],decls:10,vars:14,consts:[["configAppearance","snap-to-viewport",3,"title"],[3,"showDummyContentChange","showPageProgressChange","showFooterChange","snapFooterToKeyboardChange","displayFooterAsInlineChange","alertBeforeCloseChange","flavor","showDummyContent","showPageProgress","showFooter","snapFooterToKeyboard","displayFooterAsInline","alertBeforeClose"],[3,"isLoading"],["themeColor","white",3,"type","snapToKeyboard"],["themeColor","warning","value","50","size","sm",1,"kirby-text-xsmall"],["hasPadding","true",1,"nested-modal-configuration"],["kirby-button","","attentionLevel","2",3,"click"],[3,"showPageProgressChange","showFooterChange","snapFooterToKeyboardChange","displayFooterAsInlineChange","showDummyContentChange","collapseTitleChange","delayLoadDummyContentChange","loadAdditionalContentChange","showPageProgress","showFooter","snapFooterToKeyboard","displayFooterAsInline","showDummyContent","collapseTitle","delayLoadDummyContent","loadAdditionalContent"],[3,"hasMargin"],[1,"size-selector-heading"],[3,"sizeChange"],[1,"example-properties"],["kirby-button","","attentionLevel","3",3,"click"],["name","arrow-down"],["kirby-button","",3,"click"],["label","input with label"],["kirby-input","","placeholder","Focus me on device to scroll input into view"],["kirby-button","","attentionLevel","3"],["name","arrow-up"]],template:function(t,a){t&1&&(O(0,kc,3,0,"kirby-page-progress"),o(1,"kirby-page-title"),l(2),n(),o(3,"p"),l(4),n(),o(5,"cookbook-example-configuration-wrapper",0)(6,"cookbook-modal-example-configuration",1),Ie("showDummyContentChange",function(C){return W(a.showDummyContent,C)||(a.showDummyContent=C),C})("showPageProgressChange",function(C){return W(a.showPageProgress,C)||(a.showPageProgress=C),C})("showFooterChange",function(C){return W(a.showFooter,C)||(a.showFooter=C),C})("snapFooterToKeyboardChange",function(C){return W(a.snapFooterToKeyboard,C)||(a.snapFooterToKeyboard=C),C})("displayFooterAsInlineChange",function(C){return W(a.displayFooterAsInline,C)||(a.displayFooterAsInline=C),C})("alertBeforeCloseChange",function(C){return W(a.alertBeforeClose,C)||(a.alertBeforeClose=C),C}),n()(),o(7,"kirby-loading-overlay",2),O(8,Sc,4,3,"div"),n(),O(9,Mc,7,2,"kirby-modal-footer",3)),t&2&&(I(a.showPageProgress&&a.flavor==="modal"?0:-1),c(2),k(a.title),c(2),k(a.subtitle),c(),m("title","Current modal configuration"),c(),m("flavor",a.flavor),Oe("showDummyContent",a.showDummyContent)("showPageProgress",a.showPageProgress)("showFooter",a.showFooter)("snapFooterToKeyboard",a.snapFooterToKeyboard)("displayFooterAsInline",a.displayFooterAsInline)("alertBeforeClose",a.alertBeforeClose),c(),m("isLoading",a.isLoading),c(),I(a.isLoading?-1:8),c(),I(!a.isLoading&&a.showFooter?9:-1))},dependencies:[Wo,qo,$t,ue,ge,Pi,Nt,T,f,Ze,xt,w,F,V,qt,Y],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-properties[_ngcontent-%COMP%]{display:none}@media(min-width:768px){.example-properties[_ngcontent-%COMP%]{display:unset}}.example-properties[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]{display:grid;grid-template:auto/auto 1fr}.example-properties[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%]{padding-right:var(--kirby-spacing-xxxs)}.example-properties[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]{margin:0;font-style:italic}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-l);margin-bottom:var(--kirby-spacing-l)}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-m);border:1px solid var(--kirby-medium);border-radius:var(--kirby-spacing-xxxs);padding:var(--kirby-spacing-xxs) var(--kirby-spacing-xxs) 0}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;margin:calc(var(--kirby-spacing-xxs) * -1) calc(var(--kirby-spacing-xxs) * -1) 0;padding:var(--kirby-spacing-xxs)}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[open][_ngcontent-%COMP%]{padding:var(--kirby-spacing-xxs);border-bottom-left-radius:var(--kirby-spacing-s);border-bottom-right-radius:var(--kirby-spacing-s)}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[open][_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{border-bottom:1px dashed var(--kirby-medium);margin-bottom:var(--kirby-spacing-xs)}kirby-form-field[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-m)}.size-selector-heading[_ngcontent-%COMP%]{margin-bottom:0}.size-selector-heading[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}"]});let i=e;return i})();function Tc(i,e){i&1&&(o(0,"p"),l(1," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),n())}function Ec(i,e){if(i&1&&(o(0,"section",3),K(1,Tc,2,0,"p",null,ei),n()),i&2){let s=y();c(),q(s.dummyBackgroundTexts)}}var fe={selector:"cookbook-modal-example-advanced",template:`<button kirby-button size="lg" (click)="showModal()" [disabled]="interactWithBackground || preventInteraction">Show modal</button>
<button kirby-button size="lg" (click)="showDrawer()" [disabled]="preventInteraction">Show drawer</button>
<button kirby-button size="lg" (click)="showCompact()" [disabled]="interactWithBackground || preventInteraction">Show compact</button>
<cookbook-example-configuration-wrapper configAppearance="toggle">
  <cookbook-modal-example-configuration [disabled]="preventInteraction" [(showDummyKeyboard)]="showDummyKeyboard"
    [(showPageProgress)]="showPageProgress"
    [(showFooter)]="showFooter"
    [(snapFooterToKeyboard)]="snapFooterToKeyboard"
    [(displayFooterAsInline)]="displayFooterAsInline"
    [(collapseTitle)]="collapseTitle"
    [(alertBeforeClose)]="alertBeforeClose"
    [(showDummyContent)]="showDummyContent"
    [(delayLoadDummyContent)]="delayLoadDummyContent"
    [(loadAdditionalContent)]="loadAdditionalContent"
    [(interactWithBackground)]="interactWithBackground"
    [(customCssClass)]="customCssClass"
  >
  </cookbook-modal-example-configuration>
</cookbook-example-configuration-wrapper>

@if (interactWithBackground) {
  <section class="dummy-text-section">
    @for (dummyText of dummyBackgroundTexts; track $index) {
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </p>
    }
  </section>
}`,componentTemplate:`<kirby-page-progress
  <kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
  2/4
  </kirby-progress-circle>
</kirby-page-progress>

<kirby-page-title>
  My Modal Title
</kirby-page-title>

<p>Some content of the embedded component</p>

<kirby-modal-footer>
  <button kirby-button (click)="scrollToBottom()">Scroll to bottom</button>
</kirby-modal-footer>
`,showModalCodeSnippet:`constructor(private modalController: ModalController) {}

showModal() {
  const config: ModalConfig = {
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
    componentProps: {
      prop1: 'value1',
      prop2: 'value2'
    }
  };
  this.modalController.showModal(config);
}`,drawerCodeSnippet:`showDrawer() {
  const config: ModalConfig = {
    flavor: 'drawer',
    drawerSupplementaryAction: {
      iconName: 'qr',
      action: this.onSupplementaryActionSelect.bind(this),
    },
    component: YourEmbeddedDrawerComponent
  };
  this.modalController.showModal(config);
}

private onSupplementaryActionSelect() {
  console.log('Supplementary action selected');
}`,showCompactCodeSnippet:`showCompact() {
  const config: ModalConfig = {
    flavor: 'compact',
    component: YourEmbeddedModalComponent,
  };
  this.modalController.showModal(config);
}`,callbackCodeSnippet:`async showModal() {
  await this.modalController.showModal(config, this.onModalClose.bind(this));
}

onModalClose() {
  ...
}`,callbackWithDataCodeSnippet:`// Inside the parent (caller) component:
@Component()
export class ParentComponent() {
  async showModal() {
    await this.modalController.showModal(config, this.onModalClose.bind(this));
  }

  onModalClose(dataReturnedByModal: CustomDataType) {
    ...
  }
}

// Inside the embedded component:
// Pass the data, which will be available in the parent callback:
@Component()
export class EmbeddedComponent() {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  const returnData: CustomDataType = {...};
  this.modal?.close(returnData);
}`,scrollingCodeSnippet:`import { KirbyAnimation, Modal } from '@kirbydesign/designsystem';
...
constructor(@Optional() @SkipSelf() private modal: Modal) {}

// scrollToTop example - with long scroll animation:
this.modal?.scrollToTop(KirbyAnimation.Duration.LONG);

// scrollToBottom example:
this.modal?.scrollToBottom();`,disableScrollingCodeSnippet:`import { KirbyAnimation, Modal } from '@kirbydesign/designsystem';
...
constructor(@Optional() @SkipSelf() private modal: Modal) {}

// Disable scroll Y
this.modal?.scrollDisabled = true;`,didPresentCodeSnippet:`constructor(@Optional() @SkipSelf() private modal: Modal) {}

@ViewChild('nameInput', { static: false, read: ElementRef }) private nameInputElement: ElementRef<HTMLInputElement>;

ngOnInit() {
  this.modal?.didPresent.then(() => this.nameInputElement?.nativeElement.focus());
}`,willCloseCodeSnippet:`constructor(@Optional() @SkipSelf() private modal: Modal) {}

ngOnInit() {
  this.modal?.willClose.then(() => console.log('this modal is about to close'));
}`,embeddedCodeSnippet:`import { Component, Inject } from '@angular/core';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem';

@Component()
export class EmbeddedComponent() {
  constructor(@Inject(COMPONENT_PROPS) private componentProps) {
    this.props = componentProps;
  }
}`,closeModalCodeSnippet:`import { Component, Optional, SkipSelf } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';

@Component()
export class EmbeddedComponent() {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  onDismiss() {
    this.modal?.close();
  }

  // (Optional) If you need to wait for the modal to close:
  async onDismiss() {
    await this.modal?.close();
    // Do something...
  }

  // (Optional) You can additionally pass data, which will be available in the parent callback:
  onDismiss() {
    const returnData = {...};
    this.modal?.close(returnData);
  }
}`},de=class de{constructor(e,s){this.modalController=e,this.windowRef=s,this.showDummyKeyboard=!!this.windowRef.nativeWindow.sessionStorage.getItem("kirby-cookbook-show-dummy-keyboard"),this.showPageProgress=!1,this.showFooter=!1,this.snapFooterToKeyboard=!1,this.displayFooterAsInline=!1,this.collapseTitle=!1,this.alertBeforeClose=!1,this.showDummyContent=!0,this.delayLoadDummyContent=!0,this.loadAdditionalContent=!1,this.interactWithBackground=!1,this.customCssClass=!1,this.dummyBackgroundTexts=new Array(100).map(()=>""),this.preventInteraction=!1,this.disableScroll=!1,this.showNestedDummyContent=!0,this.showNestedPageProgress=!1,this.showNestedCollapseTitle=!1,this.showNestedFooter=!1,this.snapNestedFooterToKeyboard=!1,this.displayNestedFooterAsInline=!1}async showOverlay(e){let s=e==="modal"?"Modal Title":"Drawer Title";this.customCssClass&&(s=e==="modal"?"Modal with Custom CSS":"Drawer with Custom CSS"),this.preventInteraction=this.interactWithBackground;let r={flavor:e,collapseTitle:this.collapseTitle,component:Di,interactWithBackground:this.interactWithBackground,cssClass:this.customCssClass?["my-custom-modal-class"]:[],componentProps:{title:s,subtitle:"Hello from the first embedded example component!",flavor:e,exampleProperties:{stringProperty:"Value injected from parent component",numberProperty:123,booleanProperty:!0},showNestedOptions:!this.interactWithBackground,showDummyKeyboard:this.showDummyKeyboard,showPageProgress:this.showPageProgress,showFooter:this.showFooter,snapFooterToKeyboard:this.snapFooterToKeyboard,showDummyContent:this.showDummyContent&&!this.interactWithBackground,showStaticDummyContent:this.interactWithBackground,delayLoadDummyContent:this.delayLoadDummyContent,loadAdditionalContent:this.loadAdditionalContent,displayFooterAsInline:this.displayFooterAsInline,showModalSizeSelector:!0,disableScroll:this.disableScroll,showNestedCollapseTitle:this.showNestedCollapseTitle,alertBeforeClose:this.alertBeforeClose}};await this.modalController.showModal(r,this.onOverlayClose.bind(this))}async showModal(){await this.showOverlay("modal")}async showCompact(){let e={flavor:"compact",component:Ei};await this.modalController.showModal(e,this.onOverlayClose.bind(this))}async showDrawer(){await this.showOverlay("drawer")}onOverlayClose(e){this.preventInteraction=!1,console.log("Callback from Embedded Modal:"),console.log(`Data received: ${JSON.stringify(e)}`)}};de.template=fe.template.split("<cookbook-example-configuration-wrapper")[0],de.componentTemplate=fe.componentTemplate,de.defaultCodeSnippet=[fe.showModalCodeSnippet,fe.drawerCodeSnippet,fe.showCompactCodeSnippet].join(`

`),de.showModalCodeSnippet=fe.showModalCodeSnippet,de.drawerCodeSnippet=fe.drawerCodeSnippet,de.callbackCodeSnippet=fe.callbackCodeSnippet,de.callbackWithDataCodeSnippet=fe.callbackWithDataCodeSnippet,de.didPresentCodeSnippet=fe.didPresentCodeSnippet,de.willCloseCodeSnippet=fe.willCloseCodeSnippet,de.scrollingCodeSnippet=fe.scrollingCodeSnippet,de.disableScrollingCodeSnippet=fe.disableScrollingCodeSnippet,de.embeddedCodeSnippet=fe.embeddedCodeSnippet,de.closeModalCodeSnippet=fe.closeModalCodeSnippet,de.\u0275fac=function(s){return new(s||de)(v(oe),v(si))},de.\u0275cmp=d({type:de,selectors:[["cookbook-modal-example-advanced"]],decls:9,vars:17,consts:[["kirby-button","","size","lg",3,"click","disabled"],["configAppearance","toggle"],[3,"showDummyKeyboardChange","showPageProgressChange","showFooterChange","snapFooterToKeyboardChange","displayFooterAsInlineChange","collapseTitleChange","alertBeforeCloseChange","showDummyContentChange","delayLoadDummyContentChange","loadAdditionalContentChange","interactWithBackgroundChange","customCssClassChange","disabled","showDummyKeyboard","showPageProgress","showFooter","snapFooterToKeyboard","displayFooterAsInline","collapseTitle","alertBeforeClose","showDummyContent","delayLoadDummyContent","loadAdditionalContent","interactWithBackground","customCssClass"],[1,"dummy-text-section"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showModal()}),l(1,"Show modal"),n(),o(2,"button",0),b("click",function(){return r.showDrawer()}),l(3,"Show drawer"),n(),o(4,"button",0),b("click",function(){return r.showCompact()}),l(5,"Show compact"),n(),o(6,"cookbook-example-configuration-wrapper",1)(7,"cookbook-modal-example-configuration",2),Ie("showDummyKeyboardChange",function(a){return W(r.showDummyKeyboard,a)||(r.showDummyKeyboard=a),a})("showPageProgressChange",function(a){return W(r.showPageProgress,a)||(r.showPageProgress=a),a})("showFooterChange",function(a){return W(r.showFooter,a)||(r.showFooter=a),a})("snapFooterToKeyboardChange",function(a){return W(r.snapFooterToKeyboard,a)||(r.snapFooterToKeyboard=a),a})("displayFooterAsInlineChange",function(a){return W(r.displayFooterAsInline,a)||(r.displayFooterAsInline=a),a})("collapseTitleChange",function(a){return W(r.collapseTitle,a)||(r.collapseTitle=a),a})("alertBeforeCloseChange",function(a){return W(r.alertBeforeClose,a)||(r.alertBeforeClose=a),a})("showDummyContentChange",function(a){return W(r.showDummyContent,a)||(r.showDummyContent=a),a})("delayLoadDummyContentChange",function(a){return W(r.delayLoadDummyContent,a)||(r.delayLoadDummyContent=a),a})("loadAdditionalContentChange",function(a){return W(r.loadAdditionalContent,a)||(r.loadAdditionalContent=a),a})("interactWithBackgroundChange",function(a){return W(r.interactWithBackground,a)||(r.interactWithBackground=a),a})("customCssClassChange",function(a){return W(r.customCssClass,a)||(r.customCssClass=a),a}),n()(),O(8,Ec,3,0,"section",3)),s&2&&(m("disabled",r.interactWithBackground||r.preventInteraction),c(2),m("disabled",r.preventInteraction),c(2),m("disabled",r.interactWithBackground||r.preventInteraction),c(3),m("disabled",r.preventInteraction),Oe("showDummyKeyboard",r.showDummyKeyboard)("showPageProgress",r.showPageProgress)("showFooter",r.showFooter)("snapFooterToKeyboard",r.snapFooterToKeyboard)("displayFooterAsInline",r.displayFooterAsInline)("collapseTitle",r.collapseTitle)("alertBeforeClose",r.alertBeforeClose)("showDummyContent",r.showDummyContent)("delayLoadDummyContent",r.delayLoadDummyContent)("loadAdditionalContent",r.loadAdditionalContent)("interactWithBackground",r.interactWithBackground)("customCssClass",r.customCssClass),c(),I(r.interactWithBackground?8:-1))},dependencies:[f,ge,Pi],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{--kirby-card-width: fit-content}.dummy-text-section[_ngcontent-%COMP%]{position:absolute;top:90vh}"]});var Dn=de;var Pc=()=>({awesomeQueryParam:"awesome value"}),Re={selector:"cookbook-modal-example-outlet",template:`<button kirby-button (click)="navigateToModalRoute('page1', {awesomeQueryParam: 'awesome value'})">Open modal by route</button>
<button kirby-button kirbyModalRouterLink="page1" [kirbyModalQueryParams]="{awesomeQueryParam: 'awesome value'}">Open modal by router link</button>`,defaultCodeSnippet:`constructor(private modalController: ModalController) {}

navigateToModalRoute(path: string | string[], queryParams?: Params) {
  this.modalController.navigateToModal(path,  queryParams);
}`,modalRouteCodeSnippet:`import { ModalEnabledRoutes } from '@kirbydesign/designsystem/modal';

export const routes: ModalEnabledRoutes = [
  {
    path: 'main-route-presented-behind-the-modal',
    component: SomeComponent,
    children: [
      {
        path: 'child-route-presented-in-modal',
        outlet: 'modal',
        component: FirstChildComponent,
        
        // optional ModalConfig passed via Angular Router's built in data object
        data: {
          modalConfig: {
            size: 'large',
            flavor: 'drawer',
          },
        },  
      },
      {
        path: 'second-child-route-presented-in-modal',
        outlet: 'modal',
        component: SecondChildComponent,
      },
    ],
  }
];`,modalRouteWithGuardCodeSnippet:`import { CanDismissModalGuard } from '@kirbydesign/designsystem/modal';

// When using component or controller based modals,
// set a 'canDeactivate' guard on the route, that opens the modal:
export const routes = [
  {
    path: 'main-route-that-opens-a-modal',
    component: SomeComponent,
    canDeactivate: [CanDismissModalGuard],
  }
];
  
// When using route based modals, set the guard on the child route(s):
export const routes = [
  {
    path: 'main-route-presented-behind-the-modal',
    component: SomeComponent,
    children: [
      {
        path: 'child-route-presented-in-modal',
        outlet: 'modal',
        component: FirstChildComponent,
        canDeactivate: [CanDismissModalGuard]
      },
      {
        path: 'second-child-route-presented-in-modal',
        outlet: 'modal',
        component: SecondChildComponent,
        canDeactivate: [CanDismissModalGuard]
      },
    ],
  }
];

// Configure RouterModule:
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      canceledNavigationResolution: 'computed',
    }),
  ],
})
export class AppRoutingModule {}`,deeplinkedRouterLinkWithUrlParamCodeSnippet:`<a
  [kirbyModalRouterLink]="['/home', 'main-route-presented-behind-the-modal', 'urlParam', 'page1']"
  [kirbyModalQueryParams]="{ awesomeQueryParam: 'awesome value' }"
>
  Link text for your deeplinked modal
</a>`,routerLinkForModalOutletCodeSnippet:`<!-- Relative path when opened from parent route: -->
<a kirbyModalRouterLink="child-route-presented-in-modal">Open Modal</a>

<!-- Relative path to parent route + modal: -->
<a kirbyModalRouterLink="../main-route-presented-behind-the-modal/child-route-presented-in-modal">Navigate to Modal</a>
<!-- OR using string array: -->
<a [kirbyModalRouterLink]="['../', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']">Navigate to Modal</a>

<!-- Absolute path to parent route + modal: -->
<a [kirbyModalRouterLink]="['/home', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']">Navigate to Modal</a>

<!-- Passing query parameters (OPTIONAL) -->
<a kirbyModalRouterLink="../main-route-presented-behind-the-modal/child-route-presented-in-modal" [kirbyModalQueryParams]="{awesomeQueryParam: 'awesome value'}">Navigate to Modal</a>
`,modalControllerForModalOutletCodeSnippet:`import { ModalController } from '@kirbydesign/designsystem';

// Relative path when opened from parent component:
modalController.navigateToModal('child-route-presented-in-modal');

// Relative path when opened from another component:
modalController.navigateToModal(['../', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']);
// OR using plain string:
modalController.navigateToModal('../main-route-presented-behind-the-modal/child-route-presented-in-modal');

// Absolute path when opened from another component:
modalController.navigateToModal(['/home', 'main-route-presented-behind-the-modal', 'child-route-presented-in-modal']);

// Passing query parameters (OPTIONAL): 
modalController.navigateToModal('child-route-presented-in-modal', {awesomeQueryParam: 'awesome value'});
`,routerLinkWithinModalOutletCodeSnippet:`<!-- Relative path to sibling modal route: -->
<a routerLink="../second-child-route-presented-in-modal">Page 2</a>

<!-- Passing query parameters (OPTIONAL): -->
<a routerLink="../second-child-route-presented-in-modal" [queryParams]="{awesomeQueryParam: 'awesome value'}">Page 2</a>
`,modalControllerWithinModalOutletCodeSnippet:`// Using Kirby ModalController:
import { ModalController } from '@kirbydesign/designsystem';

constructor(private modalController: ModalController) {}

navigate() {
  // Relative path to sibling modal route:
  modalController.navigateWithinModal('../second-child-route-presented-in-modal');    

  // Relative path to sibling modal route with query parameters (OPTIONAL):
  modalController.navigateWithinModal('../second-child-route-presented-in-modal', {awesomeQueryParam: 'awesome value'});    
}

// OR using Angular Router:
constructor(private router: Router, private route: ActivatedRoute) {}

navigate() {
  this.router.navigate(['../second-child-route-presented-in-modal'], { relativeTo: this.route });

  // OR with query parameters (OPTIONAL)
  this.router.navigate(['../second-child-route-presented-in-modal'], { queryParams: {awesomeQueryParam: 'awesome value'}, relativeTo: this.route });
} `},he=class he{constructor(e){this.modalController=e}navigateToModalRoute(e,s){this.modalController.navigateToModal(e,s)}};he.template=Re.template,he.defaultCodeSnippet=Re.defaultCodeSnippet,he.modalRouteCodeSnippet=Re.modalRouteCodeSnippet,he.modalRouteWithGuardCodeSnippet=Re.modalRouteWithGuardCodeSnippet,he.deeplinkedRouterLinkWithUrlParamCodeSnippet=Re.deeplinkedRouterLinkWithUrlParamCodeSnippet,he.routerLinkForModalOutletCodeSnippet=Re.routerLinkForModalOutletCodeSnippet,he.modalControllerForModalOutletCodeSnippet=Re.modalControllerForModalOutletCodeSnippet,he.routerLinkWithinModalOutletCodeSnippet=Re.routerLinkWithinModalOutletCodeSnippet,he.modalControllerWithinModalOutletCodeSnippet=Re.modalControllerWithinModalOutletCodeSnippet,he.\u0275fac=function(s){return new(s||he)(v(oe))},he.\u0275cmp=d({type:he,selectors:[["cookbook-modal-example-outlet"]],decls:4,vars:2,consts:[["kirby-button","",3,"click"],["kirby-button","","kirbyModalRouterLink","page1",3,"kirbyModalQueryParams"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.navigateToModalRoute("page1",{awesomeQueryParam:"awesome value"})}),l(1,"Open modal by route"),n(),o(2,"button",1),l(3,"Open modal by router link"),n()),s&2&&(c(2),m("kirbyModalQueryParams",D(1,Pc)))},dependencies:[f,Uo,jo],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}"]});var On=he;var Wi={selector:"cookbook-modal-example-simple",template:`<button kirby-button size="lg" (click)="showModal('modal', size)">Show modal</button>
<button kirby-button size="lg"(click)="showModal('drawer', size)">Show drawer</button>
<button kirby-button size="lg" (click)="showModal('compact')">Show compact</button>
<kirby-card>
  <kirby-card-header>
    <strong>Size of modal/drawer</strong><br />
    <em>(on screens larger than 768px)</em>
  </kirby-card-header>
  <cookbook-modal-example-size-selector (sizeChange)="sizeChange($event)"></cookbook-modal-example-size-selector>
</kirby-card>`,showModalCodeSnippet:`constructor(private modalController: ModalController) {}

showModal(flavor: ModalFlavor, size?: ModalSize) {
  const config: ModalConfig = {
    component: YourEmbeddedModalComponent,
    flavor,
    size,
  };

  this.modalController.showModal(config);
}`},Ge=class Ge{constructor(e){this.modalController=e}ngOnInit(){this.size=this.sizeSelector.size}async showModal(e,s){let r;e==="compact"?r={component:Ei,flavor:e}:r={component:Di,flavor:e,size:s.value,componentProps:{title:`${e==="modal"?"Modal":"Drawer"} - ${s.text}`,subtitle:"Hello from the first embedded example component!",showNestedOptions:!0,showDummyContent:!1,showModalSizeSelector:!0}},await this.modalController.showModal(r)}sizeChange(e){this.size=e}};Ge.template=Wi.template.split("<kirby-card")[0],Ge.defaultCodeSnippet=[Wi.showModalCodeSnippet].join(`

`),Ge.showModalCodeSnippet=Wi.showModalCodeSnippet,Ge.\u0275fac=function(s){return new(s||Ge)(v(oe))},Ge.\u0275cmp=d({type:Ge,selectors:[["cookbook-modal-example-simple"]],viewQuery:function(s,r){if(s&1&&It(xt,7),s&2){let t;Ft(t=Lt())&&(r.sizeSelector=t.first)}},decls:14,vars:0,consts:[["kirby-button","","size","lg",3,"click"],[3,"sizeChange"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showModal("modal",r.size)}),l(1,"Show modal"),n(),o(2,"button",0),b("click",function(){return r.showModal("drawer",r.size)}),l(3,"Show drawer"),n(),o(4,"button",0),b("click",function(){return r.showModal("compact")}),l(5,"Show compact"),n(),o(6,"kirby-card")(7,"kirby-card-header")(8,"strong"),l(9,"Size of modal/drawer"),n(),p(10,"br"),o(11,"em"),l(12,"(on screens larger than 768px)"),n()(),o(13,"cookbook-modal-example-size-selector",1),b("sizeChange",function(a){return r.sizeChange(a)}),n()())},dependencies:[f,T,xt,ce],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-l)}kirby-card[_ngcontent-%COMP%]   kirby-card-header[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}cookbook-modal-example-size-selector[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-m)}"]});var In=Ge;function Dc(i,e){i&1&&p(0,"cookbook-modal-example-alert-with-guard-stepper",4)(1,"kirby-divider",5),i&2&&(m("currentStep",3),c(),m("hasMargin",!0))}var Oc={template:`<kirby-page-title>Modal with alert</kirby-page-title>

@if (showStepper) {
  <cookbook-modal-example-alert-with-guard-stepper
    [currentStep]="3"
  ></cookbook-modal-example-alert-with-guard-stepper>
  <kirby-divider [hasMargin]="true"></kirby-divider>
}

<div class="form-wrapper">
  <kirby-form-field>
    <input
      kirby-input
      placeholder="First name"
      [(ngModel)]="firstName"
    />
  </kirby-form-field>

  <kirby-form-field>
    <input
      kirby-input
      placeholder="Last name"
      [(ngModel)]="lastName"
    />
  </kirby-form-field>

  <button kirby-button (click)="clearForm()">Clear form</button>
</div>

<kirby-modal-footer>
  <em>
    <strong>Please note:</strong>
    If any data has been entered in the form fields, this modal will prompt the user to confirm before closing.
  </em>
</kirby-modal-footer>`,canDismissCodeSnippet:`// Inside the embedded component
constructor(@Optional() @SkipSelf() private modal: Modal) {}

firstName: string;
lastName: string;

ngOnInit() {
  // Use an arrow function to avoid 'this' being undefined in the function callback:
  this.modal.canDismiss = () => this.validate();
}

validate(): boolean | AlertConfig {
  if (!this.firstName && !this.lastName) return true;

  const config: AlertConfig = {
    title: 'Are you sure you want to close?',
    message: 'All unsaved data will be lost.',
    okBtn: 'Close',
    cancelBtn: 'Cancel',
    icon: {
      name: 'warning',
      themeColor: 'warning',
    },
  };

  return config;
}
  `},_t=class _t{constructor(e,s){this.modal=e,this.componentProps=s,this.showStepper=!0,this.firstName="Jane",this.lastName=""}ngOnInit(){this.componentProps?.showStepper!==void 0&&(this.showStepper=this.componentProps.showStepper),this.modal.canDismiss=()=>this.validate()}clearForm(){this.firstName="",this.lastName=""}validate(){return!this.firstName&&!this.lastName?!0:{title:"Are you sure you want to close?",message:"All unsaved data will be lost.",okBtn:"Close",cancelBtn:"Cancel",icon:{name:"warning",themeColor:"warning"}}}};_t.canDismissCodeSnippet=Oc.canDismissCodeSnippet,_t.\u0275fac=function(s){return new(s||_t)(v(Kt,12),v(di,8))},_t.\u0275cmp=d({type:_t,selectors:[["ng-component"]],inputs:{firstName:"firstName"},decls:15,vars:3,consts:[[1,"form-wrapper"],["kirby-input","","placeholder","First name",3,"ngModelChange","ngModel"],["kirby-input","","placeholder","Last name",3,"ngModelChange","ngModel"],["kirby-button","",3,"click"],[3,"currentStep"],[3,"hasMargin"]],template:function(s,r){s&1&&(o(0,"kirby-page-title"),l(1,"Modal with alert"),n(),O(2,Dc,2,2),o(3,"div",0)(4,"kirby-form-field")(5,"input",1),Ie("ngModelChange",function(a){return W(r.firstName,a)||(r.firstName=a),a}),n()(),o(6,"kirby-form-field")(7,"input",2),Ie("ngModelChange",function(a){return W(r.lastName,a)||(r.lastName=a),a}),n()(),o(8,"button",3),b("click",function(){return r.clearForm()}),l(9,"Clear form"),n()(),o(10,"kirby-modal-footer")(11,"em")(12,"strong"),l(13,"Please note:"),n(),l(14," If any data has been entered in the form fields, this modal will prompt the user to confirm before closing. "),n()()),s&2&&(c(2),I(r.showStepper?2:-1),c(3),Oe("ngModel",r.firstName),c(2),Oe("ngModel",r.lastName))},dependencies:[$t,Pn,Ze,F,V,f,qt,ye,zt,be,ni],styles:[".form-wrapper[_ngcontent-%COMP%]{margin-block-start:1em;display:flex;flex-direction:column}button[_ngcontent-%COMP%]{align-self:flex-end}"]});var Oi=_t;var Fn={selector:"cookbook-modal-example-alert",template:`<button kirby-button size="lg" (click)="showModal('modal')">Show modal (with alert)</button>`,codeSnippet:`constructor(private myService: MyService) {}

validate(): boolean | AlertConfig {
    if(this.myService.isDataValid()) return true;

    const config: AlertConfig = {
        title: 'Data is invalid',
        message: \`Check the following fields: \${this.myService.getInvalidFields()}\`,
        okBtn: 'Close',
        cancelBtn: 'Cancel',
        icon: {
          name: 'warning',
          themeColor: 'warning',
        },
      };
    
      return config;
  }

  openModal() {
    const config: ModalConfig = {
        component: EmbeddedComponent,
        // Use an arrow function to avoid 'this' being undefined in the function callback: 
        canDismiss: () => this.validate(),
    }

    this.modalController.showModal(config);
  }
`},st=class st{constructor(e){this.modalController=e}async showModal(e){let s={component:Oi,flavor:e,componentProps:{showStepper:!1}};await this.modalController.showModal(s)}};st.template=Fn.template,st.codeSnippet=Fn.codeSnippet,st.\u0275fac=function(s){return new(s||st)(v(oe))},st.\u0275cmp=d({type:st,selectors:[["cookbook-modal-example-alert"]],decls:2,vars:0,consts:[["kirby-button","","size","lg",3,"click"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showModal("modal")}),l(1,"Show modal (with alert)"),n())},dependencies:[f],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-l)}kirby-card[_ngcontent-%COMP%]   kirby-card-header[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}cookbook-modal-example-size-selector[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-m)}"]});var Ln=st;function Ic(i,e){i&1&&(o(0,"kirby-page-title"),l(1,"Modal Component"),n(),o(2,"p"),l(3," Lorem ipsum. "),n(),o(4,"kirby-modal-footer")(5,"button",7),l(6,"Button in footer"),n()())}function Fc(i,e){i&1&&(o(0,"kirby-page-title"),l(1,"Modal Component"),n(),o(2,"p"),l(3," Lorem ipsum. "),n(),o(4,"kirby-modal-footer")(5,"button",7),l(6,"Button in footer"),n()())}function Lc(i,e){i&1&&p(0,"kirby-empty-state",8)}var An=`<ng-template>
    <kirby-page-title>Modal Component</kirby-page-title>

    <p>
      Lorem ipsum. 
    </p>

    <kirby-modal-footer>
      <button kirby-button>Button in footer</button>
    </kirby-modal-footer>
  </ng-template>`,Ac=`<ng-template>
    <kirby-empty-state
      iconName="close"
      title="Out of service"
      subtitle="The system is currently down. Please contact customer support."
      themeColor="danger"
      ></kirby-empty-state>
  </ng-template>`,Vi={selector:"cookbook-modal-component-example",template:`<button kirby-button size="lg" id="open-modal">Show modal</button>
<button kirby-button size="lg" id="open-drawer">Show drawer</button>
<button kirby-button size="lg" id="open-compact">Show compact</button>

<kirby-modal [size]="size" flavor="modal" trigger="open-modal">
  ${An}
</kirby-modal>

<!-- Additional flavor examples omitted from example for brevity -->
<kirby-modal trigger="open-drawer" flavor="drawer" [size]="size">
  ${An}
</kirby-modal>

<kirby-modal trigger="open-compact" flavor="compact">
  ${Ac}
</kirby-modal>

<kirby-card>
  <kirby-card-header>
    <strong>Size of modal</strong><br />
    <em>(on screens larger than 768px)</em>
  </kirby-card-header>
  <cookbook-modal-example-size-selector (sizeChange)="sizeChange($event)"></cookbook-modal-example-size-selector>
</kirby-card>
`,isOpenExampleHtml:`<button kirby-button size="lg" (click)="openModal()">Show modal</button>

<kirby-modal [isOpen]="isOpen" (didDismiss)="didDismiss()">
  <ng-template>
    Modal content
  </ng-template>
</kirby-modal>
`,isOpenCodeSnippet:`openModal() {
  this.isOpen = true;
}

didDismiss() {
  this.isOpen = false;
}`},$e=class $e{constructor(){this.size="medium",this.isOpen=!1}sizeChange(e){this.size=e.value}};$e.template=Vi.template.split('<kirby-modal trigger="open-drawer"')[0],$e.isOpenExampleHtml=Vi.isOpenExampleHtml,$e.isOpenCodeSnippet=Vi.isOpenCodeSnippet,$e.\u0275fac=function(s){return new(s||$e)},$e.\u0275cmp=d({type:$e,selectors:[["cookbook-modal-component-example"]],decls:20,vars:2,consts:[["kirby-button","","size","lg","id","open-modal"],["kirby-button","","size","lg","id","open-drawer"],["kirby-button","","size","lg","id","open-compact"],["flavor","modal","trigger","open-modal",3,"size"],["trigger","open-drawer","flavor","drawer",3,"size"],["trigger","open-compact","flavor","compact"],[3,"sizeChange"],["kirby-button",""],["iconName","close","title","Out of service","subtitle","The system is currently down. Please contact customer support.","themeColor","danger"]],template:function(s,r){s&1&&(o(0,"button",0),l(1,"Show modal"),n(),o(2,"button",1),l(3,"Show drawer"),n(),o(4,"button",2),l(5,"Show compact"),n(),o(6,"kirby-modal",3),x(7,Ic,7,0,"ng-template"),n(),o(8,"kirby-modal",4),x(9,Fc,7,0,"ng-template"),n(),o(10,"kirby-modal",5),x(11,Lc,1,0,"ng-template"),n(),o(12,"kirby-card")(13,"kirby-card-header")(14,"strong"),l(15,"Size of modal"),n(),p(16,"br"),o(17,"em"),l(18,"(on screens larger than 768px)"),n()(),o(19,"cookbook-modal-example-size-selector",6),b("sizeChange",function(a){return r.sizeChange(a)}),n()()),s&2&&(c(6),m("size",r.size),c(2),m("size",r.size))},dependencies:[f,So,$t,qt,He,Y,T,xt,ce],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-l)}kirby-card[_ngcontent-%COMP%]   kirby-card-header[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}cookbook-modal-example-size-selector[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-m)}"],changeDetection:0});var zn=$e;var j=class{constructor(){this.content=`<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aperiam deserunt dolore error esse
            laborum magni natus nihil optio perferendis placeat, quae sed, sequi sunt totam voluptatem! Dicta,
            quaerat! Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut! Ad aliquid beatae cum esse et eveniet
            facere natus numquam obcaecati qui quia quisquam quo repellat repudiandae sit, soluta voluptatibus! Aspernatur dolore enim incidunt libero molestiae nostrum quasi? Accusamus aut culpa dolores doloribus laborum
            nesciunt voluptates! Consectetur cumque doloremque eius esse et excepturi hic, inventore mollitia nisi,
            reiciendis, tempora unde!</p>
        <p>Blanditiis, cupiditate distinctio earum illo impedit laborum velit veritatis. Accusamus adipisci alias
            aperiam, assumenda corporis culpa cum debitis exercitationem impedit laborum possimus quam qui repellat,
            saepe similique sint soluta. Unde.</p>
        <p>Aut eligendi excepturi magni nulla quo reprehenderit tempora tempore voluptates! Aliquid deserunt
            exercitationem nulla praesentium reiciendis, veniam voluptatem voluptatibus. Aut consectetur dignissimos
            dolor ex maiores nostrum numquam ratione sint voluptates.</p>
        <p>Amet, deleniti in ipsam molestias nihil porro rerum! Consectetur, culpa dolor dolore in maiores officiis
            reiciendis repellendus voluptates! Aliquam at debitis dolorum facilis harum libero optio pariatur placeat
            reiciendis soluta!Aperiam dicta distinctio dolor earum esse, est eveniet expedita inventore ipsum iusto nam nobis odio quaerat
            qui suscipit tenetur ut velit voluptas voluptatem voluptates. Dignissimos ea fuga nam odit quo?Ab accusamus cum fugit quos voluptatum. Adipisci, commodi delectus doloribus fugiat, ipsam laudantium
            necessitatibus nisi odio optio porro quaerat quis, repellat reprehenderit rerum sapiente ullam voluptates
            voluptatum. Et, neque, quod.Animi beatae eius, explicabo, harum itaque iusto minus necessitatibus nisi odio, placeat reprehenderit
            repudiandae vel velit! A at, cum deserunt doloribus ea harum molestias nihil optio placeat porro
            reprehenderit velit?</p>
        <p>Autem eum expedita modi omnis, perferendis porro saepe tenetur ullam. Ab accusantium alias atque corporis
            ducimus facere illum ipsam iste neque non nulla obcaecati quia reiciendis sed, sunt velit voluptate!</p>
        <p>Alias aspernatur consequuntur debitis delectus ducimus, enim eveniet inventore laudantium libero molestiae
            nesciunt quas recusandae saepe soluta tempore velit, vitae! Aperiam distinctio exercitationem id incidunt
            ipsa repellendus similique sunt vero.</p>
        <p>Alias aspernatur consequuntur debitis delectus ducimus, enim eveniet inventore laudantium libero molestiae
            nesciunt quas recusandae saepe soluta tempore velit, vitae! Aperiam distinctio exercitationem id incidunt
            ipsa repellendus similique sunt vero.</p>
        <p>Alias aspernatur consequuntur debitis delectus ducimus, enim eveniet inventore laudantium libero molestiae
            nesciunt quas recusandae saepe soluta tempore velit, vitae! Aperiam distinctio exercitationem id incidunt
            ipsa repellendus similique sunt vero. Alias aspernatur consequuntur debitis delectus ducimus, enim eveniet inventore laudantium libero molestiae
            nesciunt quas recusandae saepe soluta tempore velit, vitae! Aperiam distinctio exercitationem id incidunt
            ipsa repellendus similique sunt vero. Alias aspernatur consequuntur debitis delectus ducimus, enim eveniet inventore laudantium libero molestiae
            nesciunt quas recusandae saepe soluta tempore velit, vitae! Aperiam distinctio exercitationem id incidunt
            ipsa repellendus similique sunt vero.</p>
        <p class="kirby-text-medium">THE END</p>`}};var Bn=()=>({fixed:!0});function zc(i,e){i&1&&We(0)}function Bc(i,e){if(i&1&&(o(0,"div")(1,"span",9),x(2,zc,1,0,"ng-container",10),n()()),i&2){y();let s=X(5);c(2),m("ngTemplateOutlet",s)}}function Nc(i,e){i&1&&(o(0,"div"),l(1," Custom subtitle with a long long long long name "),n())}function Kc(i,e){i&1&&We(0)}function qc(i,e){if(i&1&&x(0,Kc,1,0,"ng-container",10),i&2){y();let s=X(5);m("ngTemplateOutlet",s)}}function Hc(i,e){i&1&&l(0," Custom Title with a very long name ")}function Wc(i,e){i&1&&l(0," Custom subtitle of custom title with a very long name ")}function Vc(i,e){if(i&1){let s=P();o(0,"kirby-page-actions")(1,"button",11),b("click",function(){S(s);let t=y();return M(t.onMoreSelect())}),p(2,"kirby-icon",12),n()()}}function Rc(i,e){if(i&1){let s=P();o(0,"kirby-page-actions")(1,"button",13),b("click",function(){S(s);let t=y();return M(t.onCogSelect())}),p(2,"kirby-icon",14),n()()}}function Gc(i,e){if(i&1&&p(0,"div",15),i&2){let s=y();m("innerHTML",s.content,U)}}function $c(i,e){if(i&1){let s=P();o(0,"kirby-fab-sheet",16),p(1,"kirby-icon",17),o(2,"kirby-action-sheet",18),b("itemSelect",function(t){S(s);let a=y();return M(a.onItemSelect(t))}),n()()}if(i&2){let s=y();c(2),m("items",s.items)}}var jc={template:`<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <div *kirbyPageTitle>
    <span class="kirby-text-xlarge">
      <ng-container *ngTemplateOutlet="customTitle"></ng-container>
    </span>
  </div>

  <!-- Custom Page Subtitle -->
  <div *kirbyPageSubtitle>
    Custom subtitle with a long long long long name
  </div>

  <ng-template kirbyPageToolbarTitle>
    <ng-container *ngTemplateOutlet="customTitle"></ng-container>
  </ng-template>

  <ng-template #customTitle>
    Custom Title with a very long name
  </ng-template>

  <ng-template #customSubtitle>
    Custom subtitle of custom title with a very long name
  </ng-template>

  <!-- Fixed Page Actions -->
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
    <button kirby-button (click)="onMoreSelect()" aria-label="More">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>

  <!-- Sticky Page Actions -->
  <kirby-page-actions *kirbyPageActions>
    <button kirby-button (click)="onCogSelect()" aria-label="Settings">
      <kirby-icon name="cog"></kirby-icon>
    </button>
  </kirby-page-actions>
  
  <!-- Custom Content Template (without wrapper) -->
  <div *kirbyPageContent [innerHTML]="content"></div>
  
  <!-- Fixed Content -->
  <kirby-fab-sheet *kirbyPageContent="{fixed: true}" horizontalAlignment="right">
    <kirby-icon name="write-message"></kirby-icon>
    <kirby-action-sheet
      header="Your action sheet header"
      subheader="Your action sheet subheader"
      [items]="items"
      (itemSelect)="onItemSelect($event)">
    </kirby-action-sheet>
  </kirby-fab-sheet>
</kirby-page>`},wt=class wt extends j{constructor(e,s){super(),this.toastController=e,this.modalController=s,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(e){if(!e)return;let s={message:`'${e.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(s)}onCogSelect(){let e={message:"Settings was selected.",messageType:"success",durationInMs:1500};this.toastController.showToast(e)}onMoreSelect(){let e={header:"Your action sheet header",items:this.items};this.modalController.showActionSheet(e,this.onItemSelect.bind(this))}};wt.template=jc.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),wt.\u0275fac=function(s){return new(s||wt)(v(A),v(oe))},wt.\u0275cmp=d({type:wt,selectors:[["ng-component"]],features:[E],decls:12,vars:4,consts:[["customTitle",""],["customSubtitle",""],["defaultBackHref","/"],[4,"kirbyPageTitle"],[4,"kirbyPageSubtitle"],["kirbyPageToolbarTitle",""],[4,"kirbyPageActions"],[3,"innerHTML",4,"kirbyPageContent"],["horizontalAlignment","right",4,"kirbyPageContent"],[1,"kirby-text-xlarge"],[4,"ngTemplateOutlet"],["kirby-button","","aria-label","More",3,"click"],["name","more"],["kirby-button","","aria-label","Settings",3,"click"],["name","cog"],[3,"innerHTML"],["horizontalAlignment","right"],["name","write-message"],["header","Your action sheet header","subheader","Your action sheet subheader",3,"itemSelect","items"]],template:function(s,r){s&1&&(o(0,"kirby-page",2),x(1,Bc,3,1,"div",3)(2,Nc,2,0,"div",4)(3,qc,1,1,"ng-template",5)(4,Hc,1,0,"ng-template",null,0,ft)(6,Wc,1,0,"ng-template",null,1,ft)(8,Vc,3,0,"kirby-page-actions",6)(9,Rc,3,0,"kirby-page-actions",6)(10,Gc,1,1,"div",7)(11,$c,3,1,"kirby-fab-sheet",8),n()),s&2&&(c(8),m("kirbyPageActions",D(2,Bn)),c(3),m("kirbyPageContent",D(3,Bn)))},dependencies:[wi,At,f,w,bi,pi,$,Ci,vi,hi,_i,xi],styles:[".custom-page-title[_ngcontent-%COMP%]{display:inline-flex}"]});var Nn=wt;var Uc=()=>({fixed:!0}),Yc=()=>({maxLines:2});function Qc(i,e){i&1&&(o(0,"div")(1,"div",6)(2,"span",7),l(3," Custom Titles with very long names that span multiple lines will be truncated "),n(),p(4,"kirby-icon",8),n()()),i&2&&(c(2),m("kirbyFitHeading",D(1,Yc)))}function Jc(i,e){i&1&&(o(0,"div"),l(1," Custom subtitles with very long names that span multiple lines will wrap. "),n())}function Zc(i,e){i&1&&(o(0,"div",9)(1,"div",10),l(2," Custom Titles with very long names that span multiple lines will be truncated "),n(),p(3,"kirby-icon",8),n())}function Xc(i,e){if(i&1){let s=P();o(0,"kirby-page-actions")(1,"button",11),b("click",function(){S(s);let t=y();return M(t.onMoreSelect())}),p(2,"kirby-icon",12),n()()}}function em(i,e){if(i&1){let s=P();o(0,"kirby-page-actions")(1,"button",13),b("click",function(){S(s);let t=y();return M(t.onCogSelect())}),p(2,"kirby-icon",14),n()()}}function tm(i,e){if(i&1&&p(0,"div",15),i&2){let s=y();m("innerHTML",s.content,U)}}var im={template:`<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <div *kirbyPageTitle>
    <div style="display: flex; gap: 0.5rem;">
      <span class="kirby-text-xlarge" [kirbyFitHeading]="{ maxLines: 2 }">
        Custom Titles with very long names that span multiple lines will be truncated
      </span>
      <kirby-icon name="arrow-down"></kirby-icon>
    </div>
  </div>

  <!-- Custom Page Subtitle -->
  <div *kirbyPageSubtitle>
    Custom subtitles with very long names that span multiple lines will wrap.
  </div>

  <div *kirbyPageToolbarTitle style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
      Custom Titles with very long names that span multiple lines will be truncated
    </div>
    <kirby-icon name="arrow-down"></kirby-icon>
  </div>

  <!-- Fixed Page Actions -->
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
    <button kirby-button (click)="onMoreSelect()" aria-label="More">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>

  <!-- Sticky Page Actions -->
  <kirby-page-actions *kirbyPageActions>
    <button kirby-button (click)="onCogSelect()" aria-label="Settings">
      <kirby-icon name="cog"></kirby-icon>
    </button>
  </kirby-page-actions>
 
  <!-- Custom Content Template (without wrapper) -->
  <div *kirbyPageContent [innerHTML]="content"></div>
  
</kirby-page>`},St=class St extends j{constructor(e,s){super(),this.toastController=e,this.modalController=s,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(e){if(!e)return;let s={message:`'${e.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(s)}onCogSelect(){let e={message:"Settings was selected.",messageType:"success",durationInMs:1500};this.toastController.showToast(e)}onMoreSelect(){let e={header:"Your action sheet header",items:this.items};this.modalController.showActionSheet(e,this.onItemSelect.bind(this))}};St.template=im.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),St.\u0275fac=function(s){return new(s||St)(v(A),v(oe))},St.\u0275cmp=d({type:St,selectors:[["ng-component"]],features:[E],decls:7,vars:2,consts:[["defaultBackHref","/"],[4,"kirbyPageTitle"],[4,"kirbyPageSubtitle"],["style","display: flex; justify-content: center; align-items: center; gap: 0.5rem;",4,"kirbyPageToolbarTitle"],[4,"kirbyPageActions"],[3,"innerHTML",4,"kirbyPageContent"],[2,"display","flex","gap","0.5rem"],[1,"kirby-text-xlarge",3,"kirbyFitHeading"],["name","arrow-down"],[2,"display","flex","justify-content","center","align-items","center","gap","0.5rem"],[2,"overflow","hidden","text-overflow","ellipsis","white-space","nowrap"],["kirby-button","","aria-label","More",3,"click"],["name","more"],["kirby-button","","aria-label","Settings",3,"click"],["name","cog"],[3,"innerHTML"]],template:function(s,r){s&1&&(o(0,"kirby-page",0),x(1,Qc,5,2,"div",1)(2,Jc,2,0,"div",2)(3,Zc,4,0,"div",3)(4,Xc,3,0,"kirby-page-actions",4)(5,em,3,0,"kirby-page-actions",4)(6,tm,1,1,"div",5),n()),s&2&&(c(4),m("kirbyPageActions",D(1,Uc)))},dependencies:[$,wi,Ci,Co,w,f,hi,vi,_i,xi],encapsulation:2});var Kn=St;var om={template:`<kirby-page
  titleAlignment="center"
  title="Centered Title"
  subtitle="Centered Subtitle"
  toolbarTitle="A Different Title" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},Mt=class Mt extends j{constructor(){super()}};Mt.template=om.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),Mt.\u0275fac=function(s){return new(s||Mt)},Mt.\u0275cmp=d({type:Mt,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["titleAlignment","center","title","Centered Title","subtitle","Centered Subtitle","toolbarTitle","A Different Title","defaultBackHref","/"],[3,"innerHTML"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-page-content"),p(2,"div",1),n()()),s&2&&(c(2),m("innerHTML",r.content,U))},dependencies:[$,ee],encapsulation:2});var qn=Mt;var nm={template:`<kirby-page
  title="Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization"
  titleMaxLines="2"
  subtitle="Report on the Municipal Securities Market"
  defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},ct=class ct extends j{};ct.template=nm.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),ct.\u0275fac=(()=>{let e;return function(r){return(e||(e=L(ct)))(r||ct)}})(),ct.\u0275cmp=d({type:ct,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["title","Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization","titleMaxLines","2","subtitle","Report on the Municipal Securities Market","defaultBackHref","/"],[3,"innerHTML"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-page-content"),p(2,"div",1),n()()),s&2&&(c(2),m("innerHTML",r.content,U))},dependencies:[$,ee],encapsulation:2});var Hn=ct;function rm(i,e){i&1&&We(0)}function am(i,e){i&1&&We(0)}function lm(i,e){if(i&1){let s=P();o(0,"kirby-page-footer")(1,"h3"),l(2,"0 selected"),n(),l(3," This is a fixed footer "),o(4,"button",4),b("click",function(){S(s);let t=y();return M(t.onCloseClick())}),p(5,"kirby-icon",5),n()()}}function sm(i,e){if(i&1){let s=P();o(0,"kirby-card")(1,"kirby-item")(2,"h3"),l(3,"Show tabs"),n(),o(4,"kirby-toggle",6),b("click",function(){S(s);let t=y();return M(t.toggleTabs())}),n()(),o(5,"kirby-item")(6,"h3"),l(7,"Show footer"),n(),o(8,"kirby-toggle",6),b("click",function(){S(s);let t=y();return M(t.toggleFooter())}),n()()()}if(i&2){let s=y();c(4),m("checked",s.showTabs),c(4),m("checked",s.showFooter)}}var Vn=`<kirby-page [title]="title" [tabBarBottomHidden]="!showTabs">
  <kirby-page-content>
    <ng-container *ngTemplateOutlet="controls"></ng-container>
    <div [innerHTML]="content"></div>
    <ng-container *ngTemplateOutlet="controls"></ng-container>
  </kirby-page-content>
  @if (showFooter) {
    <kirby-page-footer>
    <h3>0 selected</h3>
    This is a fixed footer
    <button kirby-button attentionLevel="2" class="close-footer-btn" (click)="onCloseClick()" aria-label="Close">
      <kirby-icon name="close"></kirby-icon>
    </button>
    </kirby-page-footer>
  }
</kirby-page>`,cm=`<ng-template #controls>
  <kirby-card>
    <kirby-item>
      <h3>Show tabs</h3>
      <kirby-toggle slot="end" (click)="toggleTabs()" [checked]="showTabs"></kirby-toggle>
    </kirby-item>
    <kirby-item>
      <h3>Show footer</h3>
      <kirby-toggle slot="end" (click)="toggleFooter()" [checked]="showFooter"></kirby-toggle>
    </kirby-item>
  </kirby-card>
</ng-template>`,w1={template:Vn+cm,styles:[`.close-footer-btn {
        position: absolute;
        top: 8px;
        right: 16px;
        margin: 0;
      }

      kirby-card:first-of-type {
        margin-bottom: 24px;
      }`]},Tt=class Tt extends j{constructor(e){super(),this.route=e,this.showTabs=!0,this.showFooter=!0}ngOnInit(){this.title=this.route.snapshot.data.title}toggleTabs(){this.showTabs=!this.showTabs}toggleFooter(){this.showFooter=!this.showFooter}onCloseClick(){this.pageFooter.close(),this.showFooter=!1,this.showTabs=!0}};Tt.template=Vn.replace(/<kirby-page-content[^>]*>(.|\s)*?<\/kirby-page-content>/,"<kirby-page-content>...</kirby-page-content>"),Tt.\u0275fac=function(s){return new(s||Tt)(v(ai))},Tt.\u0275cmp=d({type:Tt,selectors:[["ng-component"]],viewQuery:function(s,r){if(s&1&&It(Ho,5),s&2){let t;Ft(t=Lt())&&(r.pageFooter=t.first)}},features:[E],decls:8,vars:6,consts:[["controls",""],[3,"title","tabBarBottomHidden"],[4,"ngTemplateOutlet"],[3,"innerHTML"],["kirby-button","","attentionLevel","2","aria-label","Close",1,"close-footer-btn",3,"click"],["name","close"],["slot","end",3,"click","checked"]],template:function(s,r){if(s&1&&(o(0,"kirby-page",1)(1,"kirby-page-content"),x(2,rm,1,0,"ng-container",2),p(3,"div",3),x(4,am,1,0,"ng-container",2),n(),O(5,lm,6,0,"kirby-page-footer"),n(),x(6,sm,9,2,"ng-template",null,0,ft)),s&2){let t=X(7);m("title",r.title)("tabBarBottomHidden",!r.showTabs),c(2),m("ngTemplateOutlet",t),c(),m("innerHTML",r.content,U),c(),m("ngTemplateOutlet",t),c(),I(r.showFooter?5:-1)}},dependencies:[$,At,f,w,T,h,Te,ee],styles:[".close-footer-btn[_ngcontent-%COMP%]{position:absolute;top:8px;right:16px;margin:0}kirby-card[_ngcontent-%COMP%]:first-of-type{margin-bottom:24px}"]});var Wn=Tt;var mm=()=>({fixed:!0});function dm(i,e){if(i&1){let s=P();o(0,"kirby-page-actions")(1,"button",3),b("click",function(){S(s);let t=y();return M(t.onMoreSelect())}),p(2,"kirby-icon",4),n()()}}var pm={template:`<kirby-page>
  <div *kirbyPageToolbarTitle>A Fixed Title</div>
  ...
</kirby-page>`},bm={template:`<kirby-page title="Normal Page Title">
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
  ...
  </kirby-page-actions>
  ...
</kirby-page>`},um={template:`<kirby-page toolbarTitle="A Fixed Title" defaultBackHref="/">
  <!-- Fixed Page Actions -->
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
    <button kirby-button (click)="onMoreSelect()" aria-label="More">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>
  <!-- Page Content -->
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},je=class je extends j{constructor(e,s){super(),this.toastController=e,this.modalController=s,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(e){if(!e)return;let s={message:`'${e.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(s)}onCogSelect(){let e={message:"Settings was selected.",messageType:"success",durationInMs:1500};this.toastController.showToast(e)}onMoreSelect(){let e={header:"Your action sheet header",items:this.items};this.modalController.showActionSheet(e,this.onItemSelect.bind(this))}};je.template=um.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),je.customTitleTemplate=pm.template,je.fixedActionsTemplate=bm.template,je.\u0275fac=function(s){return new(s||je)(v(A),v(oe))},je.\u0275cmp=d({type:je,selectors:[["ng-component"]],features:[E],decls:4,vars:3,consts:[["toolbarTitle","A Fixed Title","defaultBackHref","/"],[4,"kirbyPageActions"],[3,"innerHTML"],["kirby-button","","aria-label","More",3,"click"],["name","more"]],template:function(s,r){s&1&&(o(0,"kirby-page",0),x(1,dm,3,0,"kirby-page-actions",1),o(2,"kirby-page-content"),p(3,"div",2),n()()),s&2&&(c(),m("kirbyPageActions",D(2,mm)),c(2),m("innerHTML",r.content,U))},dependencies:[$,f,w,ee],encapsulation:2});var Rn=je;var gm={template:`<kirby-page title="Pull-to-refresh" defaultBackHref="/" (refresh)="loadData($event)">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},Ue=class Ue extends j{loadData(e){console.log("Begin async operation"),setTimeout(()=>{console.log("Async operation has ended"),e.complete()},3e3)}};Ue.template=gm.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),Ue.handler=`loadData(event: PullToRefreshEvent) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.complete();
  }, 3000);
}`,Ue.\u0275fac=(()=>{let e;return function(r){return(e||(e=L(Ue)))(r||Ue)}})(),Ue.\u0275cmp=d({type:Ue,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["title","Pull-to-refresh","defaultBackHref","/",3,"refresh"],[3,"innerHTML"]],template:function(s,r){s&1&&(o(0,"kirby-page",0),b("refresh",function(a){return r.loadData(a)}),o(1,"kirby-page-content"),p(2,"div",1),n()()),s&2&&(c(2),m("innerHTML",r.content,U))},dependencies:[$,ee],encapsulation:2});var Gn=Ue;function ym(i,e){if(i&1&&(o(0,"code",6),l(1),n()),i&2){let s=y().$implicit;c(),_('maxWidth="',s.value,'"')}}function km(i,e){if(i&1&&(o(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),l(3),n(),O(4,ym,2,1,"code",6),n(),o(5,"kirby-label",7)(6,"data",6),l(7),n()()()),i&2){let s=e.$implicit,r=e.selected,t=e.focused;R("focused",t),m("selected",r),c(3),k(s.text),c(),I(s.value!=="default"?4:-1),c(3),k(s.width)}}var Ii=ho.pageContentMaxWidth,jn=`
  <fieldset>
    <legend>Max Width</legend>
    <kirby-dropdown
      [items]="maxWidthOptions"
      [selectedIndex]="0"
      size="sm"
      (change)="onMaxWidthChange($event.value)">
      <kirby-item
        *kirbyListItemTemplate="let item; let selected = selected; let focused = focused"
        selectable="true"
        [selected]="selected"
        [class.focused]="focused"
      >
        <kirby-label>
          <p class="kirby-item-title">{{ item.text }}</p>
          @if (item.value !== 'default') {
            <code class="kirby-item-detail">maxWidth="{{item.value}}"</code>
          }
        </kirby-label>
        <kirby-label slot="end">
          <data class="kirby-item-detail">{{ item.width }}</data>
        </kirby-label>
      </kirby-item>
    </kirby-dropdown>
  </fieldset>
`,fm={template:`<kirby-page title="Content Width" [maxWidth]="maxWidth">
  <kirby-page-content>${jn}
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},mt=class mt extends j{constructor(){super(...arguments),this.maxWidthOptions=[{text:"Default",value:"default",width:Ii("default")},{text:"Large",value:"lg",width:Ii("lg")},{text:"X-Large",value:"xl",width:Ii("xl")},{text:"Full",value:"full",width:Ii("full")}],this.maxWidth=this.maxWidthOptions[0].value}onMaxWidthChange(e){this.maxWidth=e}};mt.template=fm.template.replace(jn,"").replace('<div [innerHTML]="content"></div>',"..."),mt.\u0275fac=(()=>{let e;return function(r){return(e||(e=L(mt)))(r||mt)}})(),mt.\u0275cmp=d({type:mt,selectors:[["ng-component"]],features:[E],decls:8,vars:4,consts:[["title","Content Width",3,"maxWidth"],["size","sm",3,"change","items","selectedIndex"],["selectable","true",3,"selected","focused",4,"kirbyListItemTemplate"],[3,"innerHTML"],["selectable","true",3,"selected"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-page-content")(2,"fieldset")(3,"legend"),l(4,"Max Width"),n(),o(5,"kirby-dropdown",1),b("change",function(a){return r.onMaxWidthChange(a.value)}),x(6,km,8,6,"kirby-item",2),n()(),p(7,"div",3),n()()),s&2&&(m("maxWidth",r.maxWidth),c(5),m("items",r.maxWidthOptions)("selectedIndex",0),c(2),m("innerHTML",r.content,U))},dependencies:[$,Q,h,ee],styles:["fieldset[_ngcontent-%COMP%]{margin-bottom:16px}"]});var $n=mt;var hm={template:`<kirby-page title="Simple Page" subtitle="Subtitle of simple page" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},dt=class dt extends j{};dt.template=hm.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),dt.\u0275fac=(()=>{let e;return function(r){return(e||(e=L(dt)))(r||dt)}})(),dt.\u0275cmp=d({type:dt,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["title","Simple Page","subtitle","Subtitle of simple page","defaultBackHref","/"],[3,"innerHTML"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-page-content"),p(2,"div",1),n()()),s&2&&(c(2),m("innerHTML",r.content,U))},dependencies:[$,ee],encapsulation:2});var Un=dt;function Cm(i,e){if(i&1){let s=P();o(0,"kirby-tab-navigation",4),Ie("selectedIndexChange",function(t){S(s);let a=y();return W(a.selectedIndex,t)||(a.selectedIndex=t),M(t)}),p(1,"kirby-tab-navigation-item",5),o(2,"kirby-tab-navigation-item",6)(3,"kirby-badge",7),p(4,"kirby-icon",8),n()(),o(5,"kirby-tab-navigation-item",9)(6,"kirby-badge",10),l(7," 3 "),n()(),p(8,"kirby-tab-navigation-item",11),o(9,"kirby-tab-navigation-item",12)(10,"kirby-badge"),p(11,"kirby-icon",13),n()(),o(12,"kirby-tab-navigation-item",14)(13,"kirby-badge"),p(14,"kirby-icon",15),n()()()}if(i&2){let s=y();Oe("selectedIndex",s.selectedIndex),c(),m("label",De(s.labels[0])),c(),m("label",De(s.labels[1])),c(3),m("label",De(s.labels[2]))("truncate",!1),c(3),m("label",De(s.labels[3])),c(),m("label",De(s.labels[4])),c(3),m("label",De(s.labels[5]))}}function vm(i,e){i&1&&(o(0,"p"),l(1," Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut! "),n())}var xm={template:`<kirby-page
  title="Tab Navigation"
  subtitle="Page with Tab Navigation">
  <kirby-tab-navigation
    *kirbyPageStickyContent
    aria-label="A sample Tab Navigation"
    [(selectedIndex)]="selectedIndex">
    <kirby-tab-navigation-item
      label="{{labels[0]}}"
      id="tab-navigation-item-0"
      aria-controls="tab-panel-0">
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="{{labels[1]}}"
      id="tab-navigation-item-1"
      aria-controls="tab-panel-1">
      <kirby-badge themeColor="warning">
        <kirby-icon name="attach">
        </kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      [truncate]="false"
      label="{{labels[2]}}"
      id="tab-navigation-item-2"
      aria-controls="tab-panel-2">
      <kirby-badge themeColor="success">
        3
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="{{labels[3]}}"
      id="tab-navigation-item-3"
      aria-controls="tab-panel-3">
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="{{labels[4]}}"
      id="tab-navigation-item-4"
      aria-controls="tab-panel-4">
      <kirby-badge>
        <kirby-icon name="edit"></kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="{{labels[5]}}"
      id="tab-navigation-item-5"
      aria-controls="tab-panel-5">
      <kirby-badge>
        <kirby-icon name="dot"></kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
  </kirby-tab-navigation>

  <kirby-page-content>
    <div role="tabpanel" attr.id="tab-panel-{{selectedIndex}}" attr.aria-labelledby="tab-navigation-item-{{selectedIndex}}">
      <h2>About {{labels[selectedIndex]}}</h2>
      @if (selectedIndex % 2 === 0) {
        <p>
          Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut!
        </p>
      }
      <div [innerHTML]="content"></div>
    </div>
  </kirby-page-content>
</kirby-page>`},Ye=class Ye extends j{constructor(){super(...arguments),this.selectedIndex=0,this.labels=["Item 1","Item 2 truncated","Item 3 not truncated","Item 4","Item 5","Item 6"]}};Ye.template=xm.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),Ye.codeSnippet=`selectedIndex = 0;
labels = ['Item 1', 'Item 2 truncated', 'Item 3 not truncated', 'Item 4', 'Item 5', 'Item 6']];
`,Ye.\u0275fac=(()=>{let e;return function(r){return(e||(e=L(Ye)))(r||Ye)}})(),Ye.\u0275cmp=d({type:Ye,selectors:[["ng-component"]],features:[E],decls:8,vars:7,consts:[["title","Tab Navigation","subtitle","Page with Tab Navigation"],["aria-label","A sample Tab Navigation",3,"selectedIndex","selectedIndexChange",4,"kirbyPageStickyContent"],["role","tabpanel"],[3,"innerHTML"],["aria-label","A sample Tab Navigation",3,"selectedIndexChange","selectedIndex"],["id","tab-navigation-item-0","aria-controls","tab-panel-0",3,"label"],["id","tab-navigation-item-1","aria-controls","tab-panel-1",3,"label"],["themeColor","warning"],["name","attach"],["id","tab-navigation-item-2","aria-controls","tab-panel-2",3,"truncate","label"],["themeColor","success"],["id","tab-navigation-item-3","aria-controls","tab-panel-3",3,"label"],["id","tab-navigation-item-4","aria-controls","tab-panel-4",3,"label"],["name","edit"],["id","tab-navigation-item-5","aria-controls","tab-panel-5",3,"label"],["name","dot"]],template:function(s,r){s&1&&(o(0,"kirby-page",0),x(1,Cm,15,14,"kirby-tab-navigation",1),o(2,"kirby-page-content")(3,"div",2)(4,"h2"),l(5),n(),O(6,vm,2,0,"p"),p(7,"div",3),n()()()),s&2&&(c(3),Ne("id",Bi("tab-panel-",r.selectedIndex))("aria-labelledby",Bi("tab-navigation-item-",r.selectedIndex)),c(2),_("About ",r.labels[r.selectedIndex]),c(),I(r.selectedIndex%2===0?6:-1),c(),m("innerHTML",r.content,U))},dependencies:[$,Go,le,w,Ko,ee,Ro],encapsulation:2});var Yn=Ye;var _m={selector:"cookbook-progress-circle-example-default",template:'<kirby-progress-circle aria-label="Your investment savings" value="33"></kirby-progress-circle>'},Q1=(()=>{let e=class e{constructor(){this.template=_m.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-default"]],decls:1,vars:0,consts:[["aria-label","Your investment savings","value","33"]],template:function(t,a){t&1&&p(0,"kirby-progress-circle",0)},dependencies:[ue],encapsulation:2});let i=e;return i})();var wm={selector:"cookbook-progress-circle-example-sizes",template:`<kirby-progress-circle size="sm" aria-label="Your investment savings" value="25" themeColor="danger"><p>sm</p></kirby-progress-circle>
<kirby-progress-circle size="md" aria-label="Your investment savings" value="50" themeColor="warning"><p>md <em>(default)</em></p></kirby-progress-circle>
<kirby-progress-circle size="lg" aria-label="Your investment savings" value="75" themeColor="success"><p>lg</p></kirby-progress-circle>`},X1=(()=>{let e=class e{constructor(){this.template=wm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-sizes"]],decls:11,vars:0,consts:[["size","sm","aria-label","Your investment savings","value","25","themeColor","danger"],["size","md","aria-label","Your investment savings","value","50","themeColor","warning"],["size","lg","aria-label","Your investment savings","value","75","themeColor","success"]],template:function(t,a){t&1&&(o(0,"kirby-progress-circle",0)(1,"p"),l(2,"sm"),n()(),o(3,"kirby-progress-circle",1)(4,"p"),l(5,"md "),o(6,"em"),l(7,"(default)"),n()()(),o(8,"kirby-progress-circle",2)(9,"p"),l(10,"lg"),n()())},dependencies:[ue],styles:["[_nghost-%COMP%]{display:flex!important;align-items:center}kirby-progress-circle[_ngcontent-%COMP%]{margin-right:20px}kirby-progress-circle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;width:100%;height:100%;margin:0;text-align:center;font-size:12px;line-height:16px}kirby-progress-circle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:10px}"]});let i=e;return i})();var Sm={selector:"cookbook-progress-circle-example-content-steps",template:`<kirby-progress-circle aria-label="Your investment savings" themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
  2/4
</kirby-progress-circle>`},i_=(()=>{let e=class e{constructor(){this.template=Sm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-content-steps"]],decls:2,vars:0,consts:[["aria-label","Your investment savings","themeColor","warning","value","50","size","sm",1,"kirby-text-xsmall"]],template:function(t,a){t&1&&(o(0,"kirby-progress-circle",0),l(1,` 2/4
`),n())},dependencies:[ue],encapsulation:2});let i=e;return i})();var Mm={selector:"cookbook-progress-circle-example-content-avatar",template:`<kirby-progress-circle aria-label="Your investment savings" value="25" themeColor="danger" size="sm">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>

<kirby-progress-circle aria-label="Your investment savings" value="50" themeColor="warning">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>

<kirby-progress-circle aria-label="Your investment savings" value="75" themeColor="success" size="lg">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>`},s_=(()=>{let e=class e{constructor(){this.template=Mm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-content-avatar"]],decls:9,vars:0,consts:[["aria-label","Your investment savings","value","25","themeColor","danger","size","sm"],["themeColor","white"],["name","kirby"],["aria-label","Your investment savings","value","50","themeColor","warning"],["aria-label","Your investment savings","value","75","themeColor","success","size","lg"]],template:function(t,a){t&1&&(o(0,"kirby-progress-circle",0)(1,"kirby-avatar",1),p(2,"kirby-icon",2),n()(),o(3,"kirby-progress-circle",3)(4,"kirby-avatar",1),p(5,"kirby-icon",2),n()(),o(6,"kirby-progress-circle",4)(7,"kirby-avatar",1),p(8,"kirby-icon",2),n()())},dependencies:[ue,G,Y,w],styles:["[_nghost-%COMP%]{display:flex!important;align-items:center}kirby-progress-circle[_ngcontent-%COMP%]{margin-right:20px}"]});let i=e;return i})();var Tm={selector:"cookbook-progress-circle-example-content-percent",template:'<kirby-progress-circle aria-label="Your investment savings" value="33" size="lg">33%</kirby-progress-circle>'},d_=(()=>{let e=class e{constructor(){this.template=Tm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-content-percent"]],decls:2,vars:0,consts:[["aria-label","Your investment savings","value","33","size","lg"]],template:function(t,a){t&1&&(o(0,"kirby-progress-circle",0),l(1,"33%"),n())},dependencies:[ue],encapsulation:2});let i=e;return i})();var Qn={selector:"cookbook-progress-circle-example-animated",template:`<kirby-progress-circle [themeColor]="themeColor" aria-label="Your investment savings" [value]="progress" size="lg">
  {{ progress | number: '1.1-1' }}%
</kirby-progress-circle>`,codeSnippet:`
progress: number = 0;
themeColor: ThemeColor;

ngOnInit(): void {
  setInterval(this.updateProgress, 2000);
}

private updateProgress = () => {
  this.progress = Math.random() * 100;

  if (this.progress > 66.666) {
    this.themeColor = 'success';
  } else if (this.progress > 33.333) {
    this.themeColor = 'warning';
  } else {
    this.themeColor = 'danger';
  }
};
  `},g_=(()=>{let e=class e{constructor(){this.template=Qn.template,this.codeSnippet=Qn.codeSnippet,this.progress=0,this.updateProgress=()=>{this.progress=Math.random()*100,this.progress>66.666?this.themeColor="success":this.progress>33.333?this.themeColor="warning":this.themeColor="danger"}}ngOnInit(){setInterval(this.updateProgress,2e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-animated"]],decls:3,vars:6,consts:[["aria-label","Your investment savings","size","lg",3,"themeColor","value"]],template:function(t,a){t&1&&(o(0,"kirby-progress-circle",0),l(1),Z(2,"number"),n()),t&2&&(m("themeColor",a.themeColor)("value",a.progress),c(),_(" ",mo(2,3,a.progress,"1.1-1"),`%
`))},dependencies:[ue,yo],encapsulation:2});let i=e;return i})();var Em={selector:"cookbook-progress-circle-example-card",template:`<kirby-card hasPadding="true">
  <kirby-item>
    <kirby-label>
      <h2 id="first-card-header-label">Your investment savings</h2>
      <div>
        <data class="kirby-text-large">{{ 2435034 | currency }}</data>
      </div>
    </kirby-label>
    <kirby-progress-circle themeColor="success" aria-labelledby="first-card-header-label" value="37" slot="end">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
  </kirby-item>
</kirby-card>

<kirby-card hasPadding="true">
  <kirby-item>
    <kirby-progress-circle themeColor="success" aria-labelledby="second-card-header-label" value="37" slot="start">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
    <h2 id="second-card-header-label">Your investment savings</h2>
    <data slot="end" class="kirby-text-bold">{{ 2435034 | currency }}</data>
  </kirby-item>
</kirby-card>`},x_=(()=>{let e=class e{constructor(){this.template=Em.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-card"]],decls:20,vars:6,consts:[["hasPadding","true"],["id","first-card-header-label"],[1,"kirby-text-large"],["themeColor","success","aria-labelledby","first-card-header-label","value","37","slot","end"],["name","moneybag","size","md"],["themeColor","success","aria-labelledby","second-card-header-label","value","37","slot","start"],["id","second-card-header-label"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(o(0,"kirby-card",0)(1,"kirby-item")(2,"kirby-label")(3,"h2",1),l(4,"Your investment savings"),n(),o(5,"div")(6,"data",2),l(7),Z(8,"currency"),n()()(),o(9,"kirby-progress-circle",3),p(10,"kirby-icon",4),n()()(),o(11,"kirby-card",0)(12,"kirby-item")(13,"kirby-progress-circle",5),p(14,"kirby-icon",4),n(),o(15,"h2",6),l(16,"Your investment savings"),n(),o(17,"data",7),l(18),Z(19,"currency"),n()()()),t&2&&(c(7),k(re(8,2,2435034)),c(11),k(re(19,4,2435034)))},dependencies:[T,h,ue,w,z,Je],styles:["[_nghost-%COMP%]{width:100%;max-width:500px}kirby-card[_ngcontent-%COMP%]:not(:first-of-type){margin-top:12px}"]});let i=e;return i})();var Pm={selector:"cookbook-range-default-example",template:'<kirby-range minLabel="Min label" maxLabel="Max label" aria-label="Default range" max="100" min="1" value="25"></kirby-range>'},S_=(()=>{let e=class e{constructor(){this.template=Pm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-range-default-example"]],decls:1,vars:0,consts:[["minLabel","Min label","maxLabel","Max label","aria-label","Default range","max","100","min","1","value","25"]],template:function(t,a){t&1&&p(0,"kirby-range",0)},dependencies:[jt],encapsulation:2});let i=e;return i})();var Dm={selector:"cookbook-range-step-example",template:'<kirby-range minLabel="Min value" maxLabel="Max value" aria-label="Step range" ticks="true" max="15" min="1" value="5"></kirby-range>'},E_=(()=>{let e=class e{constructor(){this.template=Dm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-range-step-example"]],decls:1,vars:0,consts:[["minLabel","Min value","maxLabel","Max value","aria-label","Step range","ticks","true","max","15","min","1","value","5"]],template:function(t,a){t&1&&p(0,"kirby-range",0)},dependencies:[jt],encapsulation:2});let i=e;return i})();var Om={selector:"cookbook-range-disabled-form-example",template:'<kirby-range disabled minLabel="Min value" maxLabel="Max Value" aria-label="Disabled range" max="15" min="1"></kirby-range>'},O_=(()=>{let e=class e{constructor(){this.template=Om.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-range-disabled-form-example"]],decls:1,vars:0,consts:[["disabled","","minLabel","Min value","maxLabel","Max Value","aria-label","Disabled range","max","15","min","1"]],template:function(t,a){t&1&&p(0,"kirby-range",0)},dependencies:[jt],encapsulation:2});let i=e;return i})();var Im={selector:"cookbook-section-header-heading-with-label",template:`<kirby-section-header>
    <kirby-label>
      <h3 heading>Section Header</h3>
      <p label>Label</p>
    </kirby-label>
    <p detail slot="end">Detail in end-slot</p>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},z_=(()=>{let e=class e{constructor(){this.template=Im.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-heading-with-label"]],decls:19,vars:0,consts:[["heading",""],["label",""],["detail","","slot","end"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-section-header")(1,"kirby-label")(2,"h3",0),l(3,"Section Header"),n(),o(4,"p",1),l(5,"Label"),n()(),o(6,"p",2),l(7,"Detail in end-slot"),n()(),o(8,"kirby-card")(9,"kirby-item")(10,"p",3),l(11,"Title"),n(),o(12,"data",4),l(13,"Value"),n()(),o(14,"kirby-item")(15,"p",3),l(16,"Title"),n(),o(17,"data",4),l(18,"Value"),n()()())},dependencies:[Ee,h,T,z],encapsulation:2});let i=e;return i})();var Fm={selector:"cookbook-section-header-label-and-detail",template:`<kirby-section-header>
  <p label>Label</p>
  <p detail slot="end">Detail in end-slot</p>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},H_=(()=>{let e=class e{constructor(){this.template=Fm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-label-and-detail"]],decls:16,vars:0,consts:[["label",""],["detail","","slot","end"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-section-header")(1,"p",0),l(2,"Label"),n(),o(3,"p",1),l(4,"Detail in end-slot"),n()(),o(5,"kirby-card")(6,"kirby-item")(7,"p",2),l(8,"Title"),n(),o(9,"data",3),l(10,"Value"),n()(),o(11,"kirby-item")(12,"p",2),l(13,"Title"),n(),o(14,"data",3),l(15,"Value"),n()()())},dependencies:[Ee,T,h],encapsulation:2});let i=e;return i})();var Lm={selector:"cookbook-section-header-heading-with-multiline-label",template:`<kirby-section-header>
  <kirby-label>
    <h4 heading> Section Header with multiline label</h4>
    <p label wrap>Label that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},$_=(()=>{let e=class e{constructor(){this.template=Lm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-heading-with-multiline-label"]],decls:12,vars:0,consts:[["heading",""],["label","","wrap",""],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-section-header")(1,"kirby-label")(2,"h4",0),l(3," Section Header with multiline label"),n(),o(4,"p",1),l(5,"Label that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit."),n()()(),o(6,"kirby-card")(7,"kirby-item")(8,"p",2),l(9,"Title"),n(),o(10,"data",3),l(11,"Value"),n()()())},dependencies:[Ee,h,T,z],encapsulation:2});let i=e;return i})();var Am={selector:"cookbook-section-header-with-card",template:`<kirby-section-header>
  <h3 heading>Contact Info</h3>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <kirby-avatar slot="start" imageSrc="/assets/images/woman.png" altText="Example" size="sm" title="sm">
    </kirby-avatar>
    <kirby-label>
      <p class="kirby-text-normal-bold">Name</p>
      <p class="kirby-item-detail">Telephone</p>
    </kirby-label>
    <kirby-label slot="end">
      <p class="kirby-item-detail">contact&#64;mail.com</p>
    </kirby-label>
  </kirby-item>
</kirby-card>`},Z_=(()=>{let e=class e{constructor(){this.template=Am.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-with-card"]],decls:14,vars:0,consts:[["heading",""],["slot","start","imageSrc","/assets/images/woman.png","altText","Example","size","sm","title","sm"],[1,"kirby-text-normal-bold"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-section-header")(1,"h3",0),l(2,"Contact Info"),n()(),o(3,"kirby-card")(4,"kirby-item"),p(5,"kirby-avatar",1),o(6,"kirby-label")(7,"p",2),l(8,"Name"),n(),o(9,"p",3),l(10,"Telephone"),n()(),o(11,"kirby-label",4)(12,"p",3),l(13,"contact@mail.com"),n()()()())},dependencies:[Ee,T,h,G,z],encapsulation:2});let i=e;return i})();var zm={selector:"cookbook-section-header-heading-levels",template:`<kirby-section-header>
  <kirby-label>
    <h2 heading>Large heading</h2>
    <p label>Label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>

<kirby-section-header>
  <kirby-label>
    <h3 heading>Medium heading</h3>
    <p label>Label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>

<kirby-section-header>
  <kirby-label>
    <h4 heading>Normal heading</h4>
    <p label>Label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},ow=(()=>{let e=class e{constructor(){this.template=zm.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-heading-levels"]],decls:36,vars:0,consts:[["heading",""],["label",""],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-section-header")(1,"kirby-label")(2,"h2",0),l(3,"Large heading"),n(),o(4,"p",1),l(5,"Label"),n()()(),o(6,"kirby-card")(7,"kirby-item")(8,"p",2),l(9,"Title"),n(),o(10,"data",3),l(11,"Value"),n()()(),o(12,"kirby-section-header")(13,"kirby-label")(14,"h3",0),l(15,"Medium heading"),n(),o(16,"p",1),l(17,"Label"),n()()(),o(18,"kirby-card")(19,"kirby-item")(20,"p",2),l(21,"Title"),n(),o(22,"data",3),l(23,"Value"),n()()(),o(24,"kirby-section-header")(25,"kirby-label")(26,"h4",0),l(27,"Normal heading"),n(),o(28,"p",1),l(29,"Label"),n()()(),o(30,"kirby-card")(31,"kirby-item")(32,"p",2),l(33,"Title"),n(),o(34,"data",3),l(35,"Value"),n()()())},dependencies:[Ee,h,T,z],styles:["kirby-section-header[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}"]});let i=e;return i})();var Yt=(()=>{let e=class e{constructor(){this.items=[{text:"First item",id:"first"},{text:"Second item",id:"second"}],this.selectedSegment=this.items[0]}onSegmentSelect(r){this.selectedSegment=r}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["ng-component"]],decls:0,vars:0,template:function(t,a){},encapsulation:2});let i=e;return i})();var Jn={template:`<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  (segmentSelect)="onSegmentSelect($event)"
></kirby-segmented-control>

<kirby-card hasPadding="true">
  <h2>Content for {{ selectedSegment.text }} segment</h2>
  <p>The selected segment has text "{{ selectedSegment.text }}" and id "{{ selectedSegment.id }}"</p>
</kirby-card>
`,codeSnippet:`onSegmentSelect(segment: SegmentItem) {
  this.selectedSegment = segment;
}`},cw=(()=>{let e=class e extends Yt{constructor(){super(...arguments),this.template=Jn.template,this.codeSnippet=Jn.codeSnippet}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-default"]],features:[E],decls:6,vars:5,consts:[[3,"segmentSelect","items","value"],["hasPadding","true"]],template:function(t,a){t&1&&(o(0,"kirby-segmented-control",0),b("segmentSelect",function(C){return a.onSegmentSelect(C)}),n(),o(1,"kirby-card",1)(2,"h2"),l(3),n(),o(4,"p"),l(5),n()()),t&2&&(m("items",a.items)("value",a.selectedSegment),c(3),_("Content for ",a.selectedSegment.text," segment"),c(2),so('The selected segment has text "',a.selectedSegment.text,'" and id "',a.selectedSegment.id,'"'))},dependencies:[Pe,T],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}"]});let i=e;return i})();var Bm={template:`<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  size="sm"
></kirby-segmented-control>

<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  size="md"
></kirby-segmented-control>`},bw=(()=>{let e=class e extends Yt{constructor(){super(...arguments),this.template=Bm.template}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-sizes"]],features:[E],decls:2,vars:4,consts:[["size","sm",3,"items","value"],["size","md",3,"items","value"]],template:function(t,a){t&1&&p(0,"kirby-segmented-control",0)(1,"kirby-segmented-control",1),t&2&&(m("items",a.items)("value",a.selectedSegment),c(),m("items",a.items)("value",a.selectedSegment))},dependencies:[Pe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}"]});let i=e;return i})();var Ri={template:`<kirby-segmented-control
  [items]="chipItems"
  [selectedIndex]="0"
  mode="chip"
  size="sm"
></kirby-segmented-control>

<kirby-segmented-control
  [items]="compactChipItems"
  [selectedIndex]="0"
  mode="compactChip"
  size="sm"
></kirby-segmented-control>`,codeSnippetChipItems:"chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));",codeSnippetCompactChipItems:"compactChipItems = [...'12345678'].map((i) => ({ text: `c${i}`, id: i }));"},yw=(()=>{let e=class e{constructor(){this.template=Ri.template,this.codeSnippet=Ri.codeSnippetChipItems+`

`+Ri.codeSnippetCompactChipItems,this.chipItems=[..."123456"].map(r=>({text:`Chip-${r}`,id:r})),this.compactChipItems=[..."12345678"].map(r=>({text:`c${r}`,id:r}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-modes"]],decls:2,vars:4,consts:[["mode","chip","size","sm",3,"items","selectedIndex"],["mode","compactChip","size","sm",3,"items","selectedIndex"]],template:function(t,a){t&1&&p(0,"kirby-segmented-control",0)(1,"kirby-segmented-control",1),t&2&&(m("items",a.chipItems)("selectedIndex",0),c(),m("items",a.compactChipItems)("selectedIndex",0))},dependencies:[Pe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}"]});let i=e;return i})();function Nm(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",5),l(3),n(),o(4,"p",6),l(5),n()(),o(6,"kirby-label",7)(7,"data",8),l(8),n()()()),i&2){let s=e.$implicit;c(3),k(s.title),c(2),k(s.mix.join(", ")),c(2),m("value",s.count),c(),k(s.count)}}var Gi={template:`<div class="wrapper">
  <kirby-segmented-control
    [items]="segmentItems"
    [value]="selectedSegment"
    [size]="size"
    (segmentSelect)="onSegmentSelect($event)"
  ></kirby-segmented-control>
  <button
    kirby-button
    [size]="size"
    [attentionLevel]="selectedSegment === separateSegment ? '2' : '3'"
    (click)="onSegmentSelect(separateSegment)"
  >
    {{ separateSegment.text }}
  </button>
</div>
<kirby-list [items]="filteredListItems">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-label>
      <p class="kirby-item-title">{{ item.title }}</p>
      <p class="kirby-item-detail">{{ item.mix.join(', ') }}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.count">{{ item.count }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>
`,styles:[`.wrapper {
  display: flex;
  align-items: center;
  margin-bottom: var(--kirby-spacing-s);
}

kirby-segmented-control {
  margin-right: var(--kirby-spacing-xxs);
}
`,`:host {
  display: block;
  margin-bottom: var(--kirby-spacing-s);
}`],codeSnippet:`size = 'md';

segmentItems: SegmentItem[] = [
  { text: 'Stone', id: 'Stone' },
  { text: 'Rick', id: 'Rick' },
  { text: 'Gooey', id: 'Gooey' },
];

selectedSegment: this.segmentItems[0];

separateSegment: SegmentItem = { text: 'Show all', id: 'all' };

listItems = [...];

get filteredListItems() {
  const filter = this.selectedSegment.id;
  return filter === 'all'
    ? this.listItems
    : this.listItems.filter((item) => item.mix.indexOf(filter) > -1);
}

onSegmentSelect(segment: SegmentItem) {
  this.selectedSegment = segment;
}`},xw=(()=>{let e=class e{constructor(){this.template=Gi.template,this.styles=`@use '@kirbydesign/core/src/scss/utils';

`+Gi.styles[0],this.codeSnippet=Gi.codeSnippet,this.size="md",this.segmentItems=[{text:"Stone",id:"Stone"},{text:"Rick",id:"Rick"},{text:"Gooey",id:"Gooey"}],this.selectedSegment=this.segmentItems[0],this.separateSegment={text:"Show all",id:"all"},this.listItems=[{title:"Friend Throw",count:4,mix:["Fighter","Suplex","Beetle","Gooey"]},{title:"Ice Curling",count:3,mix:["Stone","Rick","Gooey"]},{title:"Magoloran Launch",count:3,mix:["Anyone (up to 3)"]},{title:"Thundersplash",count:1,mix:["Plasma"]},{title:"Rising Sizzler",count:2,mix:["Fire","Rick"]}]}onSegmentSelect(r){this.selectedSegment=r}get filteredListItems(){let r=this.selectedSegment.id;return r==="all"?this.listItems:this.listItems.filter(t=>t.mix.indexOf(r)>-1)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-grouped"]],decls:6,vars:7,consts:[[1,"wrapper"],[3,"segmentSelect","items","value","size"],["kirby-button","",3,"click","size","attentionLevel"],[3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(o(0,"div",0)(1,"kirby-segmented-control",1),b("segmentSelect",function(C){return a.onSegmentSelect(C)}),n(),o(2,"button",2),b("click",function(){return a.onSegmentSelect(a.separateSegment)}),l(3),n()(),o(4,"kirby-list",3),x(5,Nm,9,4,"kirby-item",4),n()),t&2&&(c(),m("items",a.segmentItems)("value",a.selectedSegment)("size",a.size),c(),m("size",a.size)("attentionLevel",a.selectedSegment===a.separateSegment?"2":"3"),c(),_(" ",a.separateSegment.text," "),c(),m("items",a.filteredListItems))},dependencies:[Pe,f,H,h,z,N],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:var(--kirby-spacing-s)}kirby-segmented-control[_ngcontent-%COMP%]{margin-right:var(--kirby-spacing-xxs)}","[_nghost-%COMP%]{display:block;margin-bottom:var(--kirby-spacing-s)}"]});let i=e;return i})();var Km={template:`<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
></kirby-segmented-control>
`,codeSnippet:`items: SegmentItem[] = [
  {
    text: 'First item',
    id: 'first',
    badge: {
      content: '4',
      description: '4 unread messages',
      themeColor: 'warning',
    },
  },
  {
    text: 'Second item',
    id: 'second',
    badge: {
      icon: 'attach',
      description: 'Item with attachment',
      themeColor: 'success',
    },
  },
];`},Sw=(()=>{let e=class e{constructor(){this.codeSnippet=Km.codeSnippet,this.items=[{text:"First item",id:"first",badge:{content:"4",description:"4 unread messages",themeColor:"warning"}},{text:"Second item",id:"second",badge:{icon:"attach",description:"Item with attachment",themeColor:"success"}}],this.selectedSegment=this.items[0]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-with-badge"]],decls:1,vars:2,consts:[[3,"items","value"]],template:function(t,a){t&1&&p(0,"kirby-segmented-control",0),t&2&&m("items",a.items)("value",a.selectedSegment)},dependencies:[Pe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}"]});let i=e;return i})();var qm={template:`<kirby-card hasPadding="true" [themeColor]="color">  
  <kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
></kirby-segmented-control>
</kirby-card>
<div class="card-option-button-group">
    <button (click)="setThemeColor('white')" class="white"></button>
    <button (click)="setThemeColor('light')" class="light"></button>
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>`},Ow=(()=>{let e=class e extends Yt{constructor(){super(...arguments),this.template=qm.template.split('<div class="card-option-button-group">')[0],this.color="secondary"}setThemeColor(r){this.color=r}};e.\u0275fac=(()=>{let r;return function(a){return(r||(r=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-color"]],features:[E],decls:7,vars:3,consts:[["hasPadding","true",3,"themeColor"],[3,"items","value"],[1,"card-option-button-group"],[1,"white",3,"click"],[1,"light",3,"click"],[1,"secondary",3,"click"],[1,"dark",3,"click"]],template:function(t,a){t&1&&(o(0,"kirby-card",0),p(1,"kirby-segmented-control",1),n(),o(2,"div",2)(3,"button",3),b("click",function(){return a.setThemeColor("white")}),n(),o(4,"button",4),b("click",function(){return a.setThemeColor("light")}),n(),o(5,"button",5),b("click",function(){return a.setThemeColor("secondary")}),n(),o(6,"button",6),b("click",function(){return a.setThemeColor("dark")}),n()()),t&2&&(m("themeColor",a.color),c(),m("items",a.items)("value",a.selectedSegment))},dependencies:[T,Y,Pe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-s)}kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:initial}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--kirby-spacing-xxs);padding:var(--kirby-spacing-xxs)}button[_ngcontent-%COMP%]{height:var(--kirby-size-fat-finger);width:var(--kirby-size-fat-finger);border:none;border-radius:var(--kirby-border-radius-circle);margin:0;color:#fff;cursor:pointer}button.white[_ngcontent-%COMP%]{background-color:var(--kirby-white)}button.white[_ngcontent-%COMP%]:hover{background-color:var(--kirby-white-shade)}button.light[_ngcontent-%COMP%]{background-color:var(--kirby-light);outline:#fff 2px solid;border:#fff 2px solid}button.light[_ngcontent-%COMP%]:hover{background-color:var(--kirby-light-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var Zn={selector:"cookbook-segmented-control-reactive-forms-example",template:`<form [formGroup]="form">
    <kirby-segmented-control
      formControlName="view"
      [items]="viewItems"
      [disabled]="!isEnabled"
    ></kirby-segmented-control>
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="isEnabled"
    (checkedChange)="toggleEnabled()"
    text="Form field enabled"
  ></kirby-checkbox>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`,styles:[`:host {
      display: flex;
      gap: 1rem;
    }
  `],codeSnippet:`isEnabled = true;

viewItems = [
  { text: 'Stone', id: '1' },
  { text: 'Rick', id: '2' },
  { text: 'Gooey', id: '3' },
];

form: FormGroup = this.formBuilder.group({
  view: new FormControl(this.viewItems[0]),
});

toggleEnabled() {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }`},Nw=(()=>{let e=class e{constructor(r){this.formBuilder=r,this.template=Zn.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=Zn.codeSnippet,this.viewItems=[{text:"Stone",id:"1"},{text:"Rick",id:"2"},{text:"Gooey",id:"3"}],this.form=this.formBuilder.group({view:new Qt(this.viewItems[0])}),this.isEnabled=!0}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}};e.\u0275fac=function(t){return new(t||e)(v(qe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-reactive-forms-example"]],decls:5,vars:5,consts:[[3,"formGroup"],["formControlName","view",3,"items","disabled"],["text","Form field enabled",3,"checkedChange","checked"],[3,"form"]],template:function(t,a){t&1&&(o(0,"form",0),p(1,"kirby-segmented-control",1),n(),o(2,"cookbook-example-configuration-wrapper")(3,"kirby-checkbox",2),b("checkedChange",function(){return a.toggleEnabled()}),n(),p(4,"cookbook-reactive-form-state",3),n()),t&2&&(m("formGroup",a.form),c(),m("items",a.viewItems)("disabled",!a.isEnabled),c(2),m("checked",a.isEnabled),c(),m("form",a.form))},dependencies:[ye,ve,be,Ce,we,_e,xe,Pe,B,ge,Be],styles:["[_nghost-%COMP%]{display:flex;gap:1rem}"]});let i=e;return i})();var Hm={selector:"cookbook-simple-slide-button-example",template:`<kirby-slide-button
  [text]="'Confirm'"
  aria-label="Confirm"
  (slideDone)="showAlert()"
></kirby-slide-button>`},Hw=(()=>{let e=class e{constructor(r){this.modalController=r,this.template=Hm.template}showAlert(){let r={title:"Confirmation",message:"Are you sure you want to proceed?",okBtn:"Ok",cancelBtn:"Cancel"};this.modalController.showAlert(r,this.onAlertClosed)}onAlertClosed(r){console.log(`Alert selection: ${r}`)}};e.\u0275fac=function(t){return new(t||e)(v(oe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-simple-slide-button-example"]],decls:1,vars:1,consts:[["aria-label","Confirm",3,"slideDone","text"]],template:function(t,a){t&1&&(o(0,"kirby-slide-button",0),b("slideDone",function(){return a.showAlert()}),n()),t&2&&m("text","Confirm")},dependencies:[Si],encapsulation:2});let i=e;return i})();var Wm={selector:"cookbook-expand-block-slide-button-example",template:`<kirby-slide-button
  [text]="'Confirm'"
  aria-label="Confirm"
  expand="block"
  (slideDone)="showAlert()"
></kirby-slide-button>
`},Rw=(()=>{let e=class e{constructor(r){this.modalController=r,this.template=Wm.template}showAlert(){let r={title:"Confirmation",message:"Are you sure you want to proceed?",okBtn:"Ok",cancelBtn:"Cancel"};this.modalController.showAlert(r,this.onAlertClosed)}onAlertClosed(r){console.log(`Alert selection: ${r}`)}};e.\u0275fac=function(t){return new(t||e)(v(oe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-expand-block-slide-button-example"]],decls:1,vars:1,consts:[["aria-label","Confirm","expand","block",3,"slideDone","text"]],template:function(t,a){t&1&&(o(0,"kirby-slide-button",0),b("slideDone",function(){return a.showAlert()}),n()),t&2&&m("text","Confirm")},dependencies:[Si],encapsulation:2});let i=e;return i})();function Vm(i,e){if(i&1&&(o(0,"kirby-card",2),p(1,"kirby-card-header",3),o(2,"div",4),l(3),n()()),i&2){let s=e.$implicit;m("hasPadding",!0),c(),m("title",s.title)("subtitle",s.subtitle),c(2),_(" ",s.cardContent," ")}}var Rm={selector:"cookbook-slides-custom-heading-example",template:`<kirby-slides [slides]="slides" [showNavigation]="true">    
  <h3>Custom heading</h3>
  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`},Uw=(()=>{let e=class e{constructor(){this.template=Rm.template,this.slides=[...Array(9).keys()].map(r=>({title:`Slide ${r+1}`,subtitle:`Subtitle ${r+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-slides-custom-heading-example"]],decls:4,vars:2,consts:[[3,"slides","showNavigation"],[3,"hasPadding",4,"kirbySlide"],[3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(t,a){t&1&&(o(0,"kirby-slides",0)(1,"h3"),l(2,"Custom heading"),n(),x(3,Vm,4,4,"kirby-card",1),n()),t&2&&m("slides",a.slides)("showNavigation",!0)},dependencies:[ot,it,T,ce],styles:["[_nghost-%COMP%]{--padding-start: var(--kirby-spacing-s);--padding-end: var(--kirby-spacing-s)}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]});let i=e;return i})();function Gm(i,e){if(i&1&&(o(0,"kirby-card",2),p(1,"kirby-card-header",3),o(2,"div",4),l(3),n()()),i&2){let s=e.$implicit;m("hasPadding",!0),c(),m("title",s.title)("subtitle",s.subtitle),c(2),_(" ",s.cardContent," ")}}var $m={selector:"cookbook-slides-height-example",template:`<kirby-slides [slides]="slides" [title]="'Title'" [showNavigation]="true">
  <kirby-card *kirbySlide="let slide; let i = index" slideStretchHeight [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`},Zw=(()=>{let e=class e{constructor(){this.template=$m.template,this.lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",this.additionalLorem="Fusce rhoncus leo quis libero posuere auctor.",this.slides=[...Array(9).keys()].map(r=>({title:`Slide ${r+1}`,subtitle:`Subtitle ${r+1}`,cardContent:(r+1)%2!==0?this.lorem:this.lorem+this.additionalLorem}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-slides-height-example"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],["slideStretchHeight","",3,"hasPadding",4,"kirbySlide"],["slideStretchHeight","",3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(t,a){t&1&&(o(0,"kirby-slides",0),x(1,Gm,4,4,"kirby-card",1),n()),t&2&&m("slides",a.slides)("title","Title")("showNavigation",!0)},dependencies:[ot,it,T,ce,Vo],styles:["[_nghost-%COMP%]{--padding-start: var(--kirby-spacing-s);--padding-end: var(--kirby-spacing-s)}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]});let i=e;return i})();function jm(i,e){if(i&1&&(o(0,"kirby-card",2),p(1,"kirby-card-header",3),o(2,"div",4),l(3),n()()),i&2){let s=e.$implicit;m("hasPadding",!0),c(),m("title",s.title)("subtitle",s.subtitle),c(2),_(" ",s.cardContent," ")}}var Um={selector:"cookbook-slides-simple-example",template:`<kirby-slides [slides]="slides" [title]="'Title'" [showNavigation]="true">
  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`},iS=(()=>{let e=class e{constructor(){this.template=Um.template,this.slides=[...Array(9).keys()].map(r=>({title:`Slide ${r+1}`,subtitle:`Subtitle ${r+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-slides-simple-example"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],[3,"hasPadding",4,"kirbySlide"],[3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(t,a){t&1&&(o(0,"kirby-slides",0),x(1,jm,4,4,"kirby-card",1),n()),t&2&&m("slides",a.slides)("title","Title")("showNavigation",!0)},dependencies:[ot,it,T,ce],styles:["[_nghost-%COMP%]{--padding-start: var(--kirby-spacing-s);--padding-end: var(--kirby-spacing-s)}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]});let i=e;return i})();function Ym(i,e){if(i&1&&(o(0,"kirby-card",5),p(1,"kirby-card-header",6),o(2,"div"),l(3),n()()),i&2){let s=e.$implicit;m("hasPadding",!0),c(),m("title",s.title)("subtitle",s.subtitle),c(2),k(s.cardContent)}}var Qm={selector:"cookbook-slides-advanced-example",template:`<kirby-slides
  [slidesOptions]="config"
  [slides]="slides"
  [title]="'Title'" 
  [showNavigation]="true"
  (slideChange)="getDataFromActiveSlide($event)"
  #slidesInstance
>

  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div>{{ slide.cardContent }}</div>
  </kirby-card>
  <button kirby-button attentionLevel="3" size="xs" (click)="showAll()">See all</button>
</kirby-slides>

<button
  kirby-button
  (click)="slidesInstance.slideTo(3)"
  style="display: block; margin: 24px auto 0"
>
  Activate slide no. 4
</button>`},Et=class Et{constructor(e){this.toastController=e,this.config={slidesPerView:1.1,breakpoints:{768:{centeredSlides:!1,slidesPerView:2,slidesPerGroup:1}}},this.slides=[...Array(9).keys()].map(s=>({title:`Slide ${s+1}`,subtitle:`Subtitle ${s+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}getDataFromActiveSlide(e){let s={message:`Changed to ${e.slide.title}`,messageType:"success",durationInMs:1e3};this.toastController.showToast(s)}showAll(){let e={message:"See all... (your handler here)",messageType:"success",durationInMs:2e3};this.toastController.showToast(e)}};Et.template=Qm.template,Et.\u0275fac=function(s){return new(s||Et)(v(A))},Et.\u0275cmp=d({type:Et,selectors:[["cookbook-slides-advanced-example"]],decls:7,vars:4,consts:[["slidesInstance",""],[3,"slideChange","slidesOptions","slides","title","showNavigation"],[3,"hasPadding",4,"kirbySlide"],["kirby-button","","attentionLevel","3","size","xs",3,"click"],["kirby-button","",2,"display","block","margin","24px auto 0",3,"click"],[3,"hasPadding"],[3,"title","subtitle"]],template:function(s,r){if(s&1){let t=P();o(0,"kirby-slides",1,0),b("slideChange",function(g){return r.getDataFromActiveSlide(g)}),x(2,Ym,4,4,"kirby-card",2),o(3,"button",3),b("click",function(){return r.showAll()}),l(4,"See all"),n()(),o(5,"button",4),b("click",function(){S(t);let g=X(1);return M(g.slideTo(3))}),l(6,` Activate slide no. 4
`),n()}s&2&&m("slidesOptions",r.config)("slides",r.slides)("title","Title")("showNavigation",!0)},dependencies:[ot,it,T,f,ce],styles:["[_nghost-%COMP%]{--padding-start: var(--kirby-spacing-s);--padding-end: var(--kirby-spacing-s)}kirby-card[_ngcontent-%COMP%]{justify-content:start}",".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}"]});var Xn=Et;var cS=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-spinner-example"]],decls:1,vars:0,template:function(t,a){t&1&&p(0,"kirby-spinner")},dependencies:[ci],encapsulation:2});let i=e;return i})();var{getThemeColorHexString:Jm}=Ke,er={selector:"cookbook-stock-chart-example-simple-dataset",template:`
  <kirby-stock-chart 
  [data]="_dataset"
  [dataLabelOptions]="_dataLabelOptions"
  ></kirby-stock-chart>
  `,codeSnippet:`
  _dataLabelOptions: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
  };
  
  _dataset = [
    {
      data: [
        { x: 1637049659000, y: 127.15 },
        { x: 1637049662000, y: 127.15 },
        { x: 1637049760000, y: 127.08 },
        { x: 1637049926000, y: 127.08 },
        { x: 1637050490000, y: 126.93 },
        { x: 1637050637000, y: 127.25 },
        { x: 1637050736000, y: 127.08 },
        { x: 1637050797000, y: 127.03 },
        { x: 1637050923000, y: 127.03 },
        { x: 1637051160000, y: 127.08 },
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
    `},bS=(()=>{let e=class e{constructor(){this.template=er.template,this.codeSnippet=er.codeSnippet,this._dataLabelOptions={showMin:!0,showMax:!0},this._dataset=[{data:[{x:1637049659e3,y:127.15},{x:1637049662e3,y:127.15},{x:163704976e4,y:127.08},{x:1637049926e3,y:127.08},{x:163705049e4,y:126.93},{x:1637050637e3,y:127.25},{x:1637050736e3,y:127.08},{x:1637050797e3,y:127.03},{x:1637050923e3,y:127.03},{x:163705116e4,y:127.08}],borderColor:Jm("secondary")}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-stock-chart-example-simple-dataset"]],decls:1,vars:2,consts:[[3,"data","dataLabelOptions"]],template:function(t,a){t&1&&p(0,"kirby-stock-chart",0),t&2&&m("data",a._dataset)("dataLabelOptions",a._dataLabelOptions)},dependencies:[Mi],encapsulation:2});let i=e;return i})();var{getThemeColorHexString:$i}=Ke,tr={selector:"cookbook-stock-chart-example-comparison",template:`
  <kirby-stock-chart 
  [data]="_datasets"
  [dataLabelOptions]="_dataLabelOptions"
  ></kirby-stock-chart>
  `,codeSnippet:`
  _dataLabelOptions: ChartDataLabelOptions = {
    locale: 'da-DK',
    valueSuffix: '%',
  };
  
  _datasets = [
    {
      data: [
        { x: 1628294399000, y: 49.8 },
        { x: 1628553599000, y: 49.6 },
        { x: 1628639999000, y: 49.6 },
        { x: 1628726399000, y: 49.6 },
        { x: 1628899199000, y: 50 },
        { x: 1629158399000, y: 50 },
        { x: 1629244799000, y: 50 },
        { x: 1629331199000, y: 49.8 },
        { x: 1629417599000, y: 51.5 },
        { x: 1629503999000, y: 51.5 },
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
    {
      data: [
        { x: 1628294399000, y: 49.8 },
        { x: 1628553599000, y: 69.6 },
        { x: 1628639999000, y: 39.6 },
        { x: 1628726399000, y: 69.6 },
        { x: 1628899199000, y: 30 },
        { x: 1629158399000, y: 60 },
        { x: 1629244799000, y: 30 },
        { x: 1629331199000, y: 59.8 },
        { x: 1629417599000, y: 81.5 },
        { x: 1629503999000, y: 81.5 },
      ],
      borderColor: getThemeColorHexString('primary'),
    },
    {
      data: [
        { x: 1628294399000, y: 49.8 },
        { x: 1628553599000, y: 59.6 },
        { x: 1628639999000, y: 69.6 },
        { x: 1628726399000, y: -49.6 },
        { x: 1628899199000, y: 50 },
        { x: 1629158399000, y: 150 },
        { x: 1629244799000, y: 150 },
        { x: 1629331199000, y: 149.8 },
        { x: 1629417599000, y: 151.5 },
        { x: 1629503999000, y: 151.5 },
      ],
      borderColor: getThemeColorHexString('semi-dark'),
    },
  ];
    `},kS=(()=>{let e=class e{constructor(){this.template=tr.template,this.codeSnippet=tr.codeSnippet,this._dataLabelOptions={locale:"da-DK",valueSuffix:"%"},this._datasets=[{data:[{x:1628294399e3,y:49.8},{x:1628553599e3,y:49.6},{x:1628639999e3,y:49.6},{x:1628726399e3,y:49.6},{x:1628899199e3,y:50},{x:1629158399e3,y:50},{x:1629244799e3,y:50},{x:1629331199e3,y:49.8},{x:1629417599e3,y:51.5},{x:1629503999e3,y:51.5}],borderColor:$i("secondary")},{data:[{x:1628294399e3,y:49.8},{x:1628553599e3,y:69.6},{x:1628639999e3,y:39.6},{x:1628726399e3,y:69.6},{x:1628899199e3,y:30},{x:1629158399e3,y:60},{x:1629244799e3,y:30},{x:1629331199e3,y:59.8},{x:1629417599e3,y:81.5},{x:1629503999e3,y:81.5}],borderColor:$i("primary")},{data:[{x:1628294399e3,y:49.8},{x:1628553599e3,y:59.6},{x:1628639999e3,y:69.6},{x:1628726399e3,y:-49.6},{x:1628899199e3,y:50},{x:1629158399e3,y:150},{x:1629244799e3,y:150},{x:1629331199e3,y:149.8},{x:1629417599e3,y:151.5},{x:1629503999e3,y:151.5}],borderColor:$i("semi-dark")}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-stock-chart-example-comparison"]],decls:1,vars:2,consts:[[3,"data","dataLabelOptions"]],template:function(t,a){t&1&&p(0,"kirby-stock-chart",0),t&2&&m("data",a._datasets)("dataLabelOptions",a._dataLabelOptions)},dependencies:[Mi],encapsulation:2});let i=e;return i})();var CS=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-styling-html-lists-example"]],decls:122,vars:0,template:function(t,a){t&1&&(o(0,"section")(1,"h2"),l(2,"Examples"),n(),o(3,"div")(4,"kirby-card")(5,"h3"),l(6,"Unordered list"),n(),o(7,"p"),l(8," Lorem ipsum dolor sit, amet consectetur adipisicing delectus perspiciatis illo corrupti ad, eius voluptas. "),n(),o(9,"ul")(10,"li"),l(11,"Aenean id odio turpis"),n(),o(12,"li"),l(13,"Lorem ipsum dolor sit amet"),n(),o(14,"li"),l(15,"Donec ullamcorper, risus id venenatis"),n()(),o(16,"p"),l(17," Voluptatum hic consectetur ea odit cupiditate corrupti, doloremque, nisi, cumque quisquam ipsa? "),n()(),o(18,"kirby-card")(19,"h3"),l(20,"Ordered list"),n(),o(21,"p"),l(22," Lorem ipsum dolor sit amet consectetur adipisicing pariatur accusantium optio debitis dolore beatae. "),n(),o(23,"ol")(24,"li"),l(25,"Nulla cursus sem nulla"),n(),o(26,"li"),l(27,"Sed egestas lorem pharetra"),n(),o(28,"li"),l(29,"Pellentesque habitant morbi"),n()(),o(30,"p"),l(31,"Ipsum, vero est? Iusto ipsum cumque nemo aut exercitationem!"),n()(),o(32,"kirby-card")(33,"h3"),l(34,"Nested list (unordered)"),n(),o(35,"p"),l(36," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure unde eos enim omnis, nulla veniam laudantium. "),n(),o(37,"ul")(38,"li"),l(39," Dignissim et lorem mollis "),o(40,"ul")(41,"li"),l(42,"Duis eget tincidunt sapien"),n(),o(43,"li"),l(44," Donec pulvinar aliquet turpis "),o(45,"ul")(46,"li"),l(47,"Praesent vitae augue sed"),n(),o(48,"li"),l(49,"Vitae convallis enim lobortis"),n()()(),o(50,"li"),l(51,"Phasellus viverra ipsum sed"),n()()(),o(52,"li"),l(53,"Maecenas purus sapien"),n(),o(54,"li"),l(55,"Pellentesque ultricies mi"),n()(),o(56,"p"),l(57," Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsum quas modi temporibus iusto, error commodi minima architecto nam iste nulla perferendis. "),n()(),o(58,"kirby-card")(59,"h3"),l(60,"Nested list (ordered)"),n(),o(61,"p"),l(62," Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deserunt libero rerum excepturi. "),n(),o(63,"ol")(64,"li"),l(65," Vestibulum in tortor vulputate "),o(66,"ol")(67,"li"),l(68,"Fusce iaculis ante ac diam"),n(),o(69,"li"),l(70," Maecenas nec convallis orci "),o(71,"ol")(72,"li"),l(73,"Praesent ut felis quis"),n(),o(74,"li"),l(75,"Etiam quis placerat neque"),n()()(),o(76,"li"),l(77,"Ac elementum nisi eleifend"),n()()(),o(78,"li"),l(79,"Proin consectetur pharetra"),n(),o(80,"li"),l(81,"Aeneanlobortis porta dictum"),n()(),o(82,"p"),l(83," Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa autem ratione iure vero laboriosam velit rerum nesciunt quia amet ad vitae totam, tempore magni harum at. "),n()(),o(84,"kirby-card")(85,"h3"),l(86,"Nested list (mixed unordered and ordered)"),n(),o(87,"p"),l(88," Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus molestiae aliquam veniam accusamus dolor optio dignissimos, et iure! Repellat quod veniam obcaecati aliquid expedita velit autem deleniti? Dolorum, vitae exercitationem. "),n(),o(89,"ol")(90,"li"),l(91,"Proin at pharetra ligula"),n(),o(92,"li"),l(93," Sit amet blandit tortor dignissim "),o(94,"ul")(95,"li"),l(96," In pulvinar massa ac porttitor "),o(97,"ul")(98,"li"),l(99,"Proin at pharetra ligula"),n()()(),o(100,"li"),l(101,"Consectetur adipiscing elit"),n(),o(102,"li"),l(103,"Mauris fringilla sodales nulla"),n()()(),o(104,"li"),l(105,"Integer id diam eleifend ac"),n()(),o(106,"p"),l(107," Optio culpa, consequatur necessitatibus repellat, laborum eum sunt reprehenderit tempora aperiam facilis? "),n()(),o(108,"kirby-card")(109,"h3"),l(110,"Text overflow (normal wrap)"),n(),o(111,"p"),l(112," Lorem ipsum dolor sit amet consectetur adipisicing elit recusandae eum officiis cupiditate quos, quod non ad veniam ex voluptatibus tempore enim modi. "),n(),o(113,"ul")(114,"li"),l(115," Proin at pharetra ligula, donec ullamcorper, risus id venenatis. Integer id diam eleifend ac, consectetur adipiscing elit. Fusce iaculis ante ac diam. "),n(),o(116,"li"),l(117," Proin at pharetra ligula, donec ullamcorper, risus id venenatis. Integer id diam eleifend ac, consectetur adipiscing elit. Fusce iaculis ante ac diam. "),n(),o(118,"li"),l(119," Proin at pharetra ligula, donec ullamcorper, risus id venenatis. Integer id diam eleifend ac, consectetur adipiscing elit. Fusce iaculis ante ac diam. "),n()(),o(120,"p"),l(121,"Quidem magnam ad architecto quod modi explicabo reiciendis omnis perferendis."),n()()()())},dependencies:[T],styles:["div[_ngcontent-%COMP%]{display:grid;gap:2rem;grid-template-columns:repeat(auto-fill,minmax(40ch,1fr))}h2[_ngcontent-%COMP%]{grid-column:1/-1}kirby-card[_ngcontent-%COMP%]{padding:2rem}kirby-card[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{margin-block-end:0}"]});let i=e;return i})();var Zm={selector:"cookbook-toast-example-default",template:`<button kirby-button (click)="showSuccessToast()">Show success toast</button>
<button kirby-button (click)="showWarningToast()">Show warning toast</button>`},Xm=`const config: ToastConfig = {
  message: 'Your toast message',
  messageType: 'success',
};
this.toastController.showToast(config);`,pt=class pt{constructor(e){this.toastController=e}showSuccessToast(){let e={message:"Your successful toast message",messageType:"success"};this.toastController.showToast(e)}showWarningToast(){let e={message:"Your warning toast message",messageType:"warning"};this.toastController.showToast(e)}};pt.template=Zm.template,pt.codeSnippet=Xm,pt.\u0275fac=function(s){return new(s||pt)(v(A))},pt.\u0275cmp=d({type:pt,selectors:[["cookbook-toast-example-default"]],decls:4,vars:0,consts:[["kirby-button","",3,"click"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showSuccessToast()}),l(1,"Show success toast"),n(),o(2,"button",0),b("click",function(){return r.showWarningToast()}),l(3,"Show warning toast"),n())},dependencies:[f],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}","[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}"]});var ir=pt;var ed={selector:"cookbook-toast-example-duration",template:'<button kirby-button (click)="showToast()">Show toast (2 seconds)</button>'},td=`// Custom duration (2 seconds)
const config: ToastConfig = {
  message: 'This toast lasts 2 seconds',
  messageType: 'success',
  durationInMs: 2000,
};

this.toastController.showToast(config);`,bt=class bt{constructor(e){this.toastController=e}showToast(){let e={message:"This toast lasts 2 seconds",messageType:"success",durationInMs:2e3};this.toastController.showToast(e)}};bt.template=ed.template,bt.codeSnippet=td,bt.\u0275fac=function(s){return new(s||bt)(v(A))},bt.\u0275cmp=d({type:bt,selectors:[["cookbook-toast-example-duration"]],decls:2,vars:0,consts:[["kirby-button","",3,"click"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showToast()}),l(1,"Show toast (2 seconds)"),n())},dependencies:[f],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}","[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}"]});var or=bt;var id={selector:"cookbook-toast-example-dismiss",template:`<button kirby-button (click)="showPersistentToast()">Show persistent toast</button>
<button kirby-button attentionLevel="2" (click)="dismissToast()">Dismiss toast</button>`},od=`// Show a persistent toast (durationInMs: 0)
const toast = await this.toastController.showToast({
  message: 'This toast will stay until dismissed',
  messageType: 'warning',
  durationInMs: 0,
});

// Later, dismiss programmatically
await toast.dismiss();`,ut=class ut{constructor(e){this.toastController=e,this.currentToast=null}async showPersistentToast(){this.currentToast&&await this.currentToast.dismiss(),this.currentToast=await this.toastController.showToast({message:"This toast will stay until dismissed",messageType:"warning",durationInMs:0}),this.currentToast.onDidDismiss.then(()=>{this.currentToast=null})}async dismissToast(){this.currentToast&&(await this.currentToast.dismiss(),this.currentToast=null)}};ut.template=id.template,ut.codeSnippet=od,ut.\u0275fac=function(s){return new(s||ut)(v(A))},ut.\u0275cmp=d({type:ut,selectors:[["cookbook-toast-example-dismiss"]],decls:4,vars:0,consts:[["kirby-button","",3,"click"],["kirby-button","","attentionLevel","2",3,"click"]],template:function(s,r){s&1&&(o(0,"button",0),b("click",function(){return r.showPersistentToast()}),l(1,"Show persistent toast"),n(),o(2,"button",1),b("click",function(){return r.dismissToast()}),l(3,"Dismiss toast"),n())},dependencies:[f],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}.example-container[_ngcontent-%COMP%]{margin:var(--kirby-spacing-l) auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:var(--kirby-spacing-l)}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:calc(-1 * var(--kirby-spacing-s));padding-inline:var(--kirby-spacing-s)}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:var(--kirby-spacing-m);padding-block:var(--kirby-spacing-s);box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:var(--kirby-spacing-l)}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:var(--kirby-spacing-l)}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);margin-bottom:var(--kirby-spacing-xxxs)}","[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}"]});var nr=ut;var nd={selector:"cookbook-toggle-button-default",template:`<kirby-toggle-button>
    <button kirby-button unchecked attentionLevel="3" aria-label="Notifications disabled">
        <kirby-icon name="notification"></kirby-icon>
    </button>
    <button kirby-button checked attentionLevel="3" aria-label="Notifications enabled">
        <kirby-icon name="notification-fill"></kirby-icon>
    </button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="true">
    <button kirby-button unchecked attentionLevel="3">Deactivated</button>
    <button kirby-button checked attentionLevel="2">Activated</button>
</kirby-toggle-button>`},PS=(()=>{let e=class e{constructor(){this.template=nd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-default"]],decls:10,vars:1,consts:[["kirby-button","","unchecked","","attentionLevel","3","aria-label","Notifications disabled"],["name","notification"],["kirby-button","","checked","","attentionLevel","3","aria-label","Notifications enabled"],["name","notification-fill"],[3,"checked"],["kirby-button","","unchecked","","attentionLevel","3"],["kirby-button","","checked","","attentionLevel","2"]],template:function(t,a){t&1&&(o(0,"kirby-toggle-button")(1,"button",0),p(2,"kirby-icon",1),n(),o(3,"button",2),p(4,"kirby-icon",3),n()(),o(5,"kirby-toggle-button",4)(6,"button",5),l(7,"Deactivated"),n(),o(8,"button",6),l(9,"Activated"),n()()),t&2&&(c(5),m("checked",!0))},dependencies:[nt,f,w],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var rd={selector:"cookbook-toggle-button-theme-color",template:`<kirby-toggle-button [checked]="true">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="success">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="true">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="warning">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="true">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="danger">Activated</button>
</kirby-toggle-button>`},IS=(()=>{let e=class e{constructor(){this.template=rd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-theme-color"]],decls:15,vars:3,consts:[[3,"checked"],["kirby-button","","unchecked","","attentionLevel","3"],["kirby-button","","checked","","themeColor","success"],["kirby-button","","checked","","themeColor","warning"],["kirby-button","","checked","","themeColor","danger"]],template:function(t,a){t&1&&(o(0,"kirby-toggle-button",0)(1,"button",1),l(2,"Deactivated"),n(),o(3,"button",2),l(4,"Activated"),n()(),o(5,"kirby-toggle-button",0)(6,"button",1),l(7,"Deactivated"),n(),o(8,"button",3),l(9,"Activated"),n()(),o(10,"kirby-toggle-button",0)(11,"button",1),l(12,"Deactivated"),n(),o(13,"button",4),l(14,"Activated"),n()()),t&2&&(m("checked",!0),c(5),m("checked",!0),c(5),m("checked",!0))},dependencies:[nt,f],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var ad={selector:"cookbook-toggle-button-disabled",template:`<kirby-toggle-button>
    <button kirby-button unchecked aria-disabled="true" attentionLevel="3" aria-label="Notifications disabled">
        <kirby-icon name="notification"></kirby-icon>
    </button>
    <button kirby-button checked attentionLevel="3" aria-label="Notifications enabled">
        <kirby-icon name="notification-fill"></kirby-icon>
    </button>
</kirby-toggle-button>

<kirby-toggle-button>
  <button kirby-button unchecked aria-disabled="true" attentionLevel="3">Disabled</button>
  <button kirby-button checked >Activated</button>
</kirby-toggle-button>`},AS=(()=>{let e=class e{constructor(){this.template=ad.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-disabled"]],decls:10,vars:0,consts:[["kirby-button","","unchecked","","aria-disabled","true","attentionLevel","3","aria-label","Notifications disabled"],["name","notification"],["kirby-button","","checked","","attentionLevel","3","aria-label","Notifications enabled"],["name","notification-fill"],["kirby-button","","unchecked","","aria-disabled","true","attentionLevel","3"],["kirby-button","","checked",""]],template:function(t,a){t&1&&(o(0,"kirby-toggle-button")(1,"button",0),p(2,"kirby-icon",1),n(),o(3,"button",2),p(4,"kirby-icon",3),n()(),o(5,"kirby-toggle-button")(6,"button",4),l(7,"Disabled"),n(),o(8,"button",5),l(9,"Activated"),n()())},dependencies:[nt,f,w],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var rr={selector:"cookbook-toggle-button-reactive-forms-example",template:`<form [formGroup]="form">
    <div class="toggle-buttons">
      <kirby-toggle-button formControlName="notifications" [disabled]="!isEnabled">
        <button kirby-button unchecked attentionLevel="3" aria-label="Notifications disabled">
          <kirby-icon name="notification"></kirby-icon>
        </button>
        <button kirby-button checked attentionLevel="3" aria-label="Notifications enabled">
          <kirby-icon name="notification-fill"></kirby-icon>
        </button>
      </kirby-toggle-button>

      <kirby-toggle-button formControlName="status" [disabled]="!isEnabled">
        <button kirby-button unchecked attentionLevel="3">Deactivated</button>
        <button kirby-button checked attentionLevel="2">Activated</button>
      </kirby-toggle-button>
    </div>
  </form>

  <cookbook-example-configuration-wrapper>
    <kirby-checkbox [checked]="isEnabled" (checkedChange)="toggleEnabled()">
      Form field enabled
    </kirby-checkbox>
    <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
  </cookbook-example-configuration-wrapper>`,styles:[`
    :host {
      display: flex;
      gap: 1rem;
    }

    .toggle-buttons {
      display: flex;
      flex-direction: column;
    }

    cookbook-example-configuration-wrapper {
      flex: 1;
    }
  `],codeSnippet:`form: FormGroup = this.formBuilder.group({
  notifications: new FormControl(false),
  status: new FormControl(false),
});

toggleEnabled() {
  this.isEnabled = !this.isEnabled;
  if (this.isEnabled) {
    this.form.enable();
  } else {
    this.form.disable();
  }
}`},HS=(()=>{let e=class e{constructor(r){this.formBuilder=r,this.template=rr.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=rr.codeSnippet,this.form=this.formBuilder.group({notifications:new Qt(!1),status:new Qt(!1)}),this.isEnabled=!0}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}};e.\u0275fac=function(t){return new(t||e)(v(qe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-reactive-forms-example"]],decls:16,vars:5,consts:[[3,"formGroup"],[1,"toggle-buttons"],["formControlName","notifications",3,"disabled"],["kirby-button","","unchecked","","attentionLevel","3","aria-label","Notifications disabled"],["name","notification"],["kirby-button","","checked","","attentionLevel","3","aria-label","Notifications enabled"],["name","notification-fill"],["formControlName","status",3,"disabled"],["kirby-button","","unchecked","","attentionLevel","3"],["kirby-button","","checked","","attentionLevel","2"],[3,"checkedChange","checked"],[3,"form"]],template:function(t,a){t&1&&(o(0,"form",0)(1,"div",1)(2,"kirby-toggle-button",2)(3,"button",3),p(4,"kirby-icon",4),n(),o(5,"button",5),p(6,"kirby-icon",6),n()(),o(7,"kirby-toggle-button",7)(8,"button",8),l(9,"Deactivated"),n(),o(10,"button",9),l(11,"Activated"),n()()()(),o(12,"cookbook-example-configuration-wrapper")(13,"kirby-checkbox",10),b("checkedChange",function(){return a.toggleEnabled()}),l(14," Form field enabled "),n(),p(15,"cookbook-reactive-form-state",11),n()),t&2&&(m("formGroup",a.form),c(2),m("disabled",!a.isEnabled),c(5),m("disabled",!a.isEnabled),c(6),m("checked",a.isEnabled),c(2),m("form",a.form))},dependencies:[nt,f,w,B,ye,ve,be,Ce,ge,Be,we,_e,xe],styles:["[_nghost-%COMP%]{display:flex;gap:1rem}.toggle-buttons[_ngcontent-%COMP%]{display:flex;flex-direction:column}cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{flex:1}"]});let i=e;return i})();var ar={selector:"cookbook-toggle-reactive-forms-example",template:`<form [formGroup]="form">
  <kirby-item>
    <kirby-toggle
      slot="end"
      formControlName="myToggle"
      (checkedChange)="onCheckedChange()"
    >Toggle in form</kirby-toggle>
  </kirby-item>
      
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="true"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
  ></kirby-checkbox>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`,codeSnippet:`constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.form = this.fb.group({ myToggle: [false] });
}

toggleEnabled(checked: boolean) {
  if (checked) {
     this.form.get('myToggle')?.enable();
  } else {
    this.form.get('myToggle')?.disable();
}
`},QS=(()=>{let e=class e{constructor(r){this.fb=r,this.template=ar.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=ar.codeSnippet}ngOnInit(){this.form=this.fb.group({myToggle:[!1]})}onCheckedChange(){console.log("Value:",this.form.get("myToggle")?.value)}toggleEnabled(r){r?this.form.get("myToggle")?.enable():this.form.get("myToggle")?.disable()}};e.\u0275fac=function(t){return new(t||e)(v(qe))},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-reactive-forms-example"]],decls:7,vars:3,consts:[[3,"formGroup"],["slot","end","formControlName","myToggle",3,"checkedChange"],["text","Form field enabled",3,"checkedChange","checked"],[3,"form"]],template:function(t,a){t&1&&(o(0,"form",0)(1,"kirby-item")(2,"kirby-toggle",1),b("checkedChange",function(){return a.onCheckedChange()}),l(3,"Toggle in form"),n()()(),o(4,"cookbook-example-configuration-wrapper")(5,"kirby-checkbox",2),b("checkedChange",function(C){return a.toggleEnabled(C)}),n(),p(6,"cookbook-reactive-form-state",3),n()),t&2&&(m("formGroup",a.form),c(5),m("checked",!0),c(),m("form",a.form))},dependencies:[ye,ve,be,Ce,we,_e,xe,Fo,h,Te,ge,B,Be],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:flex;flex-direction:column;gap:var(--kirby-spacing-s)}"]});let i=e;return i})();function ld(i,e){if(i&1&&p(0,"kirby-list-section-header",3),i&2){let s=e.$implicit;m("title",s)}}function sd(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-toggle",4),l(2),n()()),i&2){let s=e.$implicit;c(2),k(s.title)}}var cd={selector:"cookbook-toggle-item-example",template:`<kirby-list [items]="items" [getSectionName]="getSectionName">
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section">
  </kirby-list-section-header>
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-toggle slot="end">{{item.title}}</kirby-toggle>
  </kirby-item>
</kirby-list>
`},t2=(()=>{let e=class e{constructor(){this.template=cd.template,this.items=[{id:0,title:"Use option"},{id:1,title:"Show option"},{id:3,title:"Use option"}],this.getSectionName=()=>"Label for the group below"}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-item-example"]],decls:3,vars:2,consts:[[3,"items","getSectionName"],[3,"title",4,"kirbyListSectionHeader"],[4,"kirbyListItemTemplate"],[3,"title"],["slot","end"]],template:function(t,a){t&1&&(o(0,"kirby-list",0),x(1,ld,1,1,"kirby-list-section-header",1)(2,sd,3,1,"kirby-item",2),n()),t&2&&m("items",a.items)("getSectionName",a.getSectionName)},dependencies:[h,Te,Wt,N,H,Vt],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:flex;flex-direction:column;gap:var(--kirby-spacing-s)}"]});let i=e;return i})();var md={selector:"cookbook-toggle-state-example",template:`<kirby-toggle aria-label="Default toggle"></kirby-toggle>
<kirby-toggle checked="true" aria-label="Checked toggle"></kirby-toggle>
<kirby-toggle disabled="true" aria-label="Disabled toggle"></kirby-toggle>
`},n2=(()=>{let e=class e{constructor(){this.template=md.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-state-example"]],decls:3,vars:0,consts:[["aria-label","Default toggle"],["checked","true","aria-label","Checked toggle"],["disabled","true","aria-label","Disabled toggle"]],template:function(t,a){t&1&&p(0,"kirby-toggle",0)(1,"kirby-toggle",1)(2,"kirby-toggle",2)},dependencies:[Te],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:flex;flex-direction:column;gap:var(--kirby-spacing-s)}"]});let i=e;return i})();var dd={selector:"cookbook-radio-states-example",template:`<kirby-radio-group aria-label="Radio state example">
  <kirby-radio text="Default"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group value="bacon">
  <kirby-radio value="bacon" text="Checked"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group>
  <kirby-radio [disabled]="true" text="Disabled"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group value="bacon">
  <kirby-radio disabled="true" value="bacon" text="Disabled checked"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group [hasError]="true">
  <kirby-radio text="Has error"></kirby-radio>
</kirby-radio-group>`},l2=(()=>{let e=class e{constructor(){this.template=dd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-states-example"]],decls:10,vars:2,consts:[["aria-label","Radio state example"],["text","Default"],["value","bacon"],["value","bacon","text","Checked"],["text","Disabled",3,"disabled"],["disabled","true","value","bacon","text","Disabled checked"],[3,"hasError"],["text","Has error"]],template:function(t,a){t&1&&(o(0,"kirby-radio-group",0),p(1,"kirby-radio",1),n(),o(2,"kirby-radio-group",2),p(3,"kirby-radio",3),n(),o(4,"kirby-radio-group"),p(5,"kirby-radio",4),n(),o(6,"kirby-radio-group",2),p(7,"kirby-radio",5),n(),o(8,"kirby-radio-group",6),p(9,"kirby-radio",7),n()),t&2&&(c(5),m("disabled",!0),c(3),m("hasError",!0))},dependencies:[ae,ke],styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap}kirby-radio[_ngcontent-%COMP%]{margin-right:16px}"]});let i=e;return i})();var pd={selector:"cookbook-radio-sizes-example",template:`<kirby-radio-group aria-label="Radio size example">
  <kirby-radio size="xs" text="Extra Small"></kirby-radio>
  <kirby-radio size="sm" text="Small"></kirby-radio>
  <kirby-radio size="md" text="Medium (default)"></kirby-radio>
<kirby-radio-group>`},m2=(()=>{let e=class e{constructor(){this.template=pd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-sizes-example"]],decls:5,vars:0,consts:[["aria-label","Radio size example"],["size","xs","text","Extra Small"],["size","sm","text","Small"],["size","md","text","Medium (default)"]],template:function(t,a){t&1&&(o(0,"kirby-radio-group",0),p(1,"kirby-radio",1)(2,"kirby-radio",2)(3,"kirby-radio",3)(4,"kirby-radio-group"),n())},dependencies:[ae,ke],styles:['.kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}kirby-checkbox[_ngcontent-%COMP%], kirby-radio[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-xxs);background-color:var(--kirby-semi-light);position:relative}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:after{height:100%;border:1px solid var(--kirby-danger);position:absolute;right:0}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:before{content:"";border-left:0;border-right:0;width:calc(var(--kirby-spacing-xxs) + 1px)}kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:after{content:"md: 56px";border-left:0;border-top:0;border-bottom:0;line-height:56px;font-size:var(--kirby-font-size-xs);color:var(--kirby-danger);padding-right:var(--kirby-spacing-xxs);margin-right:calc(var(--kirby-spacing-xxs) * .5);vertical-align:center}kirby-radio.xs[_ngcontent-%COMP%]:after{content:"xs: 32px";line-height:32px}kirby-radio.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-radio.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox.xs[_ngcontent-%COMP%]:after{content:"xs: 24px";line-height:24px}kirby-checkbox.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-checkbox.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox[_ngcontent-%COMP%]     ion-checkbox, kirby-radio[_ngcontent-%COMP%]     ion-radio{background-color:#f7e0f0;margin-right:80px}']});let i=e;return i})();var bd={selector:"cookbook-radio-multiline-example",template:`<kirby-radio
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,&#10; sed do eiusmod tempor incididunt ut labore et dolore &#10; magna aliqua.">
</kirby-radio>`},b2=(()=>{let e=class e{constructor(){this.template=bd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-multiline-example"]],decls:1,vars:0,consts:[["text",`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 sed do eiusmod tempor incididunt ut labore et dolore 
 magna aliqua.`]],template:function(t,a){t&1&&p(0,"kirby-radio",0)},dependencies:[ke],encapsulation:2});let i=e;return i})();var lr=[{title:"Bacon",value:1},{title:"Salami",value:2},{title:"Tenderloin",value:3},{title:"Veggie (not an option)",value:4,disabled:!0}],ji={selector:"cookbook-radio-example-binding",template:`<kirby-radio-group
  aria-label="Select main course"
  [items]="items"
  itemTextProperty="title"
  [value]="selected"
  (valueChange)="onChange($event)">
</kirby-radio-group>`,twoWayBindingTemplate:'<kirby-radio-group [items]="items" [(value)]="selected"></kirby-radio-group>',codeSnippet:`items = ${ze(lr)};

selected = this.items[0];

onChange(value: string | YourDataType) {
  ...
}`},k2=(()=>{let e=class e{constructor(r){this.toastController=r,this.template=ji.template,this.twoWayBindingTemplate=ji.twoWayBindingTemplate,this.codeSnippet=ji.codeSnippet,this.items=lr,this.selected=this.items[0]}onChange(r){let t={message:`Item '${r.title} (value: ${r.value})' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-example-binding"]],decls:1,vars:2,consts:[["aria-label","Select main course","itemTextProperty","title",3,"valueChange","items","value"]],template:function(t,a){t&1&&(o(0,"kirby-radio-group",0),b("valueChange",function(C){return a.onChange(C)}),n()),t&2&&m("items",a.items)("value",a.selected)},dependencies:[ae],encapsulation:2});let i=e;return i})();function ud(i,e){if(i&1&&(o(0,"div",2),p(1,"kirby-radio",3),o(2,"span",4),l(3),n()()),i&2){let s=e.$implicit,r=e.selected;R("is-selected",r),c(),m("value",s)("text",s.label),Ne("title",s.description),c(2),_("Rating: ",s.rating)}}var sr=[{label:"Bacon",description:"Meat\u2019s own spice",rating:100},{label:"Bologna",description:"The heart of the bologna sandwich",rating:75},{label:"Tenderloin",description:"Love me tender \u2764\uFE0F",rating:50}],Li={selector:"cookbook-radio-custom-content-example",template:`<kirby-radio-group [value]="selected" [items]="items" aria-label="Select main course">
  <div
    *kirbyListItemTemplate="let item; let selected = selected"
    [class.is-selected]="selected"
    class="wrapper">
    <kirby-radio
      [value]="item"
      [text]="item.label"
      [attr.title]="item.description">
    </kirby-radio>
    <span class="rating">Rating: {{item.rating}}</span>
  </div>
</kirby-radio-group>`,slottedTemplate:`<kirby-radio-group value="Bacon">
  <kirby-radio value="Bacon" text="Bacon"></kirby-radio>
  <kirby-radio value="Bologna" text="Bologna"></kirby-radio>
  <kirby-radio value="Tenderloin" text="Tenderloin"></kirby-radio>
</kirby-radio-group>`,codeSnippet:`items = ${ze(sr)};

selected = this.items[1];`,styles:[`.wrapper {
  display: flex;
  align-items: center;
}

.rating {
  font-size: 14px;
  padding: 2px 8px;
  background-color: var(--kirby-semi-light);
  border-radius: 4px;
  transition: background-color 200ms;
}

.is-selected .rating {
  background-color: var(--kirby-success);
}`]},x2=(()=>{let e=class e{constructor(){this.template=`<!-- 1. Using slotted <kirby-radio> -->
${Li.slottedTemplate}

<!-- 2. Using *kirbyListItemTemplate -->
${Li.template}`,this.codeSnippet=Li.codeSnippet,this.styles=Li.styles.join(`
`),this.items=sr,this.selected=this.items[1]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-custom-content-example"]],decls:2,vars:2,consts:[["aria-label","Select main course",3,"value","items"],["class","wrapper",3,"is-selected",4,"kirbyListItemTemplate"],[1,"wrapper"],[3,"value","text"],[1,"rating"]],template:function(t,a){t&1&&(o(0,"kirby-radio-group",0),x(1,ud,4,6,"div",1),n()),t&2&&m("value",a.selected)("items",a.items)},dependencies:[ae,N,ke],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}.rating[_ngcontent-%COMP%]{font-size:14px;padding:2px 8px;background-color:var(--kirby-semi-light);border-radius:4px;transition:background-color .2s}.is-selected[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]{background-color:var(--kirby-success)}"]});let i=e;return i})();var cr=()=>["Bacon","Salami","Tenderloin"],gd={selector:"cookbook-radio-in-form-field-example",template:`<kirby-form-field label="Label for radio group in form field" message="This is a message">
  <kirby-radio-group [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>

<kirby-form-field label="Label for radio group with error" message="This is an error message">
  <kirby-radio-group #meat [hasError]="true" (valueChange)="meat.hasError = false" [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>`},M2=(()=>{let e=class e{constructor(){this.template=gd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-in-form-field-example"]],decls:5,vars:5,consts:[["meat",""],["label","Label for radio group in form field","message","This is a message"],[3,"items"],["label","Label for radio group with error","message","This is an error message"],[3,"valueChange","hasError","items"]],template:function(t,a){if(t&1){let g=P();o(0,"kirby-form-field",1),p(1,"kirby-radio-group",2),n(),o(2,"kirby-form-field",3)(3,"kirby-radio-group",4,0),b("valueChange",function(){S(g);let yt=X(4);return M(yt.hasError=!1)}),n()()}t&2&&(c(),m("items",D(3,cr)),c(2),m("hasError",!0)("items",D(4,cr)))},dependencies:[F,ae],styles:["[_nghost-%COMP%]{display:flex}kirby-form-field[_ngcontent-%COMP%]:not(:last-of-type){margin-right:40px}"]});let i=e;return i})();var yd=(i,e)=>e.value;function kd(i,e){if(i&1&&(o(0,"kirby-item")(1,"kirby-radio",1),l(2),n()()),i&2){let s=e.$implicit;c(),m("value",s)("disabled",s.disabled),c(),_(" ",s.title," ")}}var dr=[{title:"Bacon",value:1},{title:"Salami (disabled)",value:2,disabled:!0},{title:"Tenderloin",value:3}],mr={selector:"cookbook-radio-in-item-example",template:`<kirby-card>
  <kirby-radio-group [value]="selected" aria-label="Select main course">
    @for (item of items; track item.value) {
      <kirby-item>
        <kirby-radio [value]="item" slot="start" [disabled]="item.disabled">
          {{item.title}}
        </kirby-radio>
      </kirby-item>
    }
  </kirby-radio-group>
</kirby-card>`,codeSnippet:`items = ${ze(dr)};
selected = this.items[2];`},I2=(()=>{let e=class e{constructor(){this.template=mr.template,this.codeSnippet=mr.codeSnippet,this.items=dr,this.selected=this.items[2]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-in-item-example"]],decls:4,vars:1,consts:[["aria-label","Select main course",3,"value"],["slot","start",3,"value","disabled"]],template:function(t,a){t&1&&(o(0,"kirby-card")(1,"kirby-radio-group",0),K(2,kd,3,3,"kirby-item",null,yd),n()()),t&2&&(c(),m("value",a.selected),c(),q(a.items))},dependencies:[T,ae,h,ke],encapsulation:2});let i=e;return i})();var br=["Bacon","Salami","Tenderloin","Tongue","Drumstick"],pr={selector:"cookbook-radio-reactive-forms-example",template:`<form [formGroup]="form">
  <kirby-radio-group formControlName="favoriteFood" [items]="items"></kirby-radio-group>
</form>
<cookbook-example-configuration-wrapper>

  <kirby-checkbox
    [checked]="canSelectFavorite"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
    size="xs"
  >
  </kirby-checkbox>

  <kirby-checkbox
    [checked]="favoriteRequired"
    (checkedChange)="toggleRequired($event)"
    text="Form field required"
    size="xs"
  >
  </kirby-checkbox>

  <button
    kirby-button
    size="sm"
    attentionLevel="2"
    [disabled]="favoriteFoodControl.value === null"
    (click)="clearForm()"
  >
    Clear form
  </button>

  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>
    `,codeSnippet:`items = ${ze(br)};

  const form = new FormGroup({
  favoriteFood: new FormControl({ value: this.items[1], disabled: !this.canSelectFavorite }),
});

const favoriteFoodControl = this.form.controls.get('favoriteFood'); 

toggleEnabled(enabled: boolean) {
  enabled
    ? favoriteFoodControl.enable()
    : favoriteFoodControl.disable();
}

toggleRequired(required: boolean) {
  required
    ? favoriteFoodControl.setValidators(Validators.required)
    : favoriteFoodControl.setValidators(null);
  favoriteFoodControl.updateValueAndValidity();
}`},H2=(()=>{let e=class e{constructor(){this.template=pr.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=pr.codeSnippet,this.items=br,this.canSelectFavorite=!0,this.favoriteRequired=!0}ngOnInit(){this.buildForm()}toggleEnabled(r){this.canSelectFavorite=r,r?this.favoriteFoodControl.enable():this.favoriteFoodControl.disable()}toggleRequired(r){this.favoriteRequired=r,r?this.favoriteFoodControl.setValidators(Bt.required):this.favoriteFoodControl.setValidators(null),this.favoriteFoodControl.updateValueAndValidity()}clearForm(){this.favoriteFoodControl.setValue(null)}buildForm(){this.favoriteFoodControl=new oi(null,this.favoriteRequired?Bt.required:null),this.canSelectFavorite||this.favoriteFoodControl.disable(),this.form=new ii({favoriteFood:this.favoriteFoodControl})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-reactive-forms-example"]],decls:8,vars:6,consts:[[3,"formGroup"],["formControlName","favoriteFood",3,"items"],["text","Form field enabled","size","xs",3,"checkedChange","checked"],["text","Form field required","size","xs",3,"checkedChange","checked"],["kirby-button","","size","sm","attentionLevel","2",3,"click","disabled"],[3,"form"]],template:function(t,a){t&1&&(o(0,"form",0),p(1,"kirby-radio-group",1),n(),o(2,"cookbook-example-configuration-wrapper")(3,"kirby-checkbox",2),b("checkedChange",function(C){return a.toggleEnabled(C)}),n(),o(4,"kirby-checkbox",3),b("checkedChange",function(C){return a.toggleRequired(C)}),n(),o(5,"button",4),b("click",function(){return a.clearForm()}),l(6," Clear form "),n(),p(7,"cookbook-reactive-form-state",5),n()),t&2&&(m("formGroup",a.form),c(),m("items",a.items),c(2),m("checked",a.canSelectFavorite),c(),m("checked",a.favoriteRequired),c(),m("disabled",a.favoriteFoodControl.value===null),c(2),m("form",a.form))},dependencies:[ye,ve,be,Ce,we,_e,xe,ae,ge,B,f,Be],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:flex}cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-xxs)}@media(min-width:768px){cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-xl)}}.form-state[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);border-top:1px solid var(--kirby-medium);padding:var(--kirby-spacing-xxs)}.form-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-xxxs);font-weight:var(--kirby-font-weight-normal)}.form-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:var(--kirby-font-size-xs);line-height:var(--kirby-line-height-xs)}.form-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:var(--kirby-danger);color:var(--kirby-white);margin-right:var(--kirby-spacing-xxxs);padding:0 var(--kirby-spacing-xxxxs);border-radius:var(--kirby-spacing-xxxs)}.form-state[_ngcontent-%COMP%]   span.state-true[_ngcontent-%COMP%]{background-color:var(--kirby-success);color:var(--kirby-success-contrast)}"]});let i=e;return i})();var gr=["Bacon","Salami","Tenderloin","Tongue","Drumstick"],ur={selector:"cookbook-radio-template-driven-forms-example",template:`<kirby-radio-group #group="ngModel" [items]="items" [(ngModel)]="selected" [required]="favoriteRequired" [disabled]="canSelectFavorite ? null : true">
</kirby-radio-group>
<cookbook-example-configuration-wrapper>

  <kirby-checkbox
    [checked]="canSelectFavorite"
    (checkedChange)="canSelectFavorite = !canSelectFavorite"
    text="Form field enabled"
    size="xs"
  >
  </kirby-checkbox>

  <kirby-checkbox
    [checked]="favoriteRequired"
    (checkedChange)="favoriteRequired = !favoriteRequired"
    text="Form field required"
    size="xs"
  >
  </kirby-checkbox>

  <button kirby-button size="sm" attentionLevel="2" [disabled]="selected === null" (click)="selected = null">
    Clear selection
  </button>

  <section class="form-state">
    <h4>Form state:</h4>
    <p>
      <strong>Selected:</strong> {{ selected | json }}
    </p>
    <p>
      <strong>ngModel: </strong>
      <span [class.state-true]="group.valid">valid: {{ group.valid }}</span>
      <span [class.state-true]="group.enabled">enabled: {{ group.enabled }}</span>
      <span [class.state-true]="group.touched">touched: {{ group.touched }}</span>
    </p>
    <p>
      <strong>ngModel.errors: </strong>
      <span [class.state-true]="!group.errors">{{ group.errors | json }}</span>
    </p>
  </section>
</cookbook-example-configuration-wrapper>
    `,codeSnippet:`items = ${ze(gr)};

selected = null;
canSelectFavorite = true;
favoriteRequired = true;`},Q2=(()=>{let e=class e{constructor(){this.template=ur.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=ur.codeSnippet,this.items=gr,this.selected=null,this.canSelectFavorite=!0,this.favoriteRequired=!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-template-driven-forms-example"]],decls:30,vars:24,consts:[["group","ngModel"],[3,"ngModelChange","items","ngModel","required","disabled"],["text","Form field enabled","size","xs",3,"checkedChange","checked"],["text","Form field required","size","xs",3,"checkedChange","checked"],["kirby-button","","size","sm","attentionLevel","2",3,"click","disabled"],[1,"form-state"]],template:function(t,a){if(t&1){let g=P();o(0,"kirby-radio-group",1,0),Ie("ngModelChange",function(yt){return S(g),W(a.selected,yt)||(a.selected=yt),M(yt)}),n(),o(2,"cookbook-example-configuration-wrapper")(3,"kirby-checkbox",2),b("checkedChange",function(){return a.canSelectFavorite=!a.canSelectFavorite}),n(),o(4,"kirby-checkbox",3),b("checkedChange",function(){return a.favoriteRequired=!a.favoriteRequired}),n(),o(5,"button",4),b("click",function(){return a.selected=null}),l(6," Clear selection "),n(),o(7,"section",5)(8,"h4"),l(9,"Form state:"),n(),o(10,"p")(11,"strong"),l(12,"Selected:"),n(),l(13),Z(14,"json"),n(),o(15,"p")(16,"strong"),l(17,"ngModel: "),n(),o(18,"span"),l(19),n(),o(20,"span"),l(21),n(),o(22,"span"),l(23),n()(),o(24,"p")(25,"strong"),l(26,"ngModel.errors: "),n(),o(27,"span"),l(28),Z(29,"json"),n()()()()}if(t&2){let g=X(1);m("items",a.items),Oe("ngModel",a.selected),m("required",a.favoriteRequired)("disabled",a.canSelectFavorite?null:!0),c(3),m("checked",a.canSelectFavorite),c(),m("checked",a.favoriteRequired),c(),m("disabled",a.selected===null),c(8),_(" ",re(14,20,a.selected)," "),c(5),R("state-true",g.valid),c(),_("valid: ",g.valid),c(),R("state-true",g.enabled),c(),_("enabled: ",g.enabled),c(),R("state-true",g.touched),c(),_("touched: ",g.touched),c(4),R("state-true",!g.errors),c(),k(re(29,22,g.errors))}},dependencies:[ae,ye,be,fo,ni,ge,B,f,Qe],styles:[".kirby-line-clamp[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:var(--line-clamp, none);-webkit-box-orient:vertical;overflow:hidden}[_nghost-%COMP%]{display:flex}cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-xxs)}@media(min-width:768px){cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:var(--kirby-spacing-xl)}}.form-state[_ngcontent-%COMP%]{margin-top:var(--kirby-spacing-xs);border-top:1px solid var(--kirby-medium);padding:var(--kirby-spacing-xxs)}.form-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:var(--kirby-spacing-xxxs);font-weight:var(--kirby-font-weight-normal)}.form-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:var(--kirby-font-size-xs);line-height:var(--kirby-line-height-xs)}.form-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:var(--kirby-danger);color:var(--kirby-white);margin-right:var(--kirby-spacing-xxxs);padding:0 var(--kirby-spacing-xxxxs);border-radius:var(--kirby-spacing-xxxs)}.form-state[_ngcontent-%COMP%]   span.state-true[_ngcontent-%COMP%]{background-color:var(--kirby-success);color:var(--kirby-success-contrast)}"]});let i=e;return i})();var fd={selector:"cookbook-header-example-default",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`},X2=(()=>{let e=class e{constructor(){this.template=fd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-default"]],decls:1,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Title")},dependencies:[J],encapsulation:2});let i=e;return i})();var hd=()=>["Mrs. Lady Like Tiff Tuff Escargoon Tokkori","&","Mr. Chef Kawasaki Tokkori"],Cd={selector:"cookbook-header-example-subtitle-list",template:`<kirby-header [title]="'Title'" [subtitle1]="['Mrs. Lady Like Tiff Tuff Escargoon Tokkori', '&', 'Mr. Chef Kawasaki Tokkori']">
</kirby-header>`},iM=(()=>{let e=class e{constructor(){this.template=Cd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-subtitle-list"]],decls:1,vars:3,consts:[[3,"title","subtitle1"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Title")("subtitle1",D(2,hd))},dependencies:[J],styles:["[_nghost-%COMP%]{border:1px dashed var(--kirby-medium);margin:12px;background:linear-gradient(135deg,transparent 0,transparent 95%,#fff 96%);display:block;overflow:hidden;width:620px;max-width:100%;resize:horizontal}"]});let i=e;return i})();var vd={selector:"cookbook-header-example-flag",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-flag themeColor="warning">Warning</kirby-flag>
</kirby-header>`},aM=(()=>{let e=class e{constructor(){this.template=vd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-flag"]],decls:3,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["themeColor","warning"]],template:function(t,a){t&1&&(o(0,"kirby-header",0)(1,"kirby-flag",1),l(2,"Warning"),n()()),t&2&&m("title","Title")},dependencies:[J,Le],encapsulation:2});let i=e;return i})();function xd(i,e){i&1&&(o(0,"div",2),p(1,"kirby-badge",3),l(2," Custom content in flag section "),n())}var yr={selector:"cookbook-header-example-custom-flag",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-flag" *kirbyHeaderCustomFlag>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom content in flag section
  </div>
</kirby-header>`,styles:[`.custom-flag {
    display: flex;
    align-items: center;
    gap: 6px;
}`]},mM=(()=>{let e=class e{constructor(){this.template=yr.template,this.styles=yr.styles.join(`

`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-custom-flag"]],decls:2,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["class","custom-flag",4,"kirbyHeaderCustomFlag"],[1,"custom-flag"],["size","sm","themeColor","success"]],template:function(t,a){t&1&&(o(0,"kirby-header",0),x(1,xd,3,0,"div",1),n()),t&2&&m("title","Title")},dependencies:[J,le,Bo],styles:[".custom-flag[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}"]});let i=e;return i})();var _d={selector:"cookbook-header-example-value",template:`<kirby-header [title]="'Title'" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`},bM=(()=>{let e=class e{constructor(){this.template=_d.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-value"]],decls:1,vars:1,consts:[["value","12.345,67","valueUnit","USD","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Title")},dependencies:[J],encapsulation:2});let i=e;return i})();var wd={selector:"cookbook-header-example-avatar",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-avatar size="lg">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-header>`},fM=(()=>{let e=class e{constructor(){this.template=wd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-avatar"]],decls:3,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["size","lg"],["name","kirby"]],template:function(t,a){t&1&&(o(0,"kirby-header",0)(1,"kirby-avatar",1),p(2,"kirby-icon",2),n()()),t&2&&m("title","Title")},dependencies:[J,G,w],encapsulation:2});let i=e;return i})();var Sd={selector:"cookbook-header-example-progress-circle-with-avatar",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-progress-circle value="75" themeColor="success" size="lg">
    <kirby-avatar themeColor="white">
      <kirby-icon name="kirby"></kirby-icon>
    </kirby-avatar>
  </kirby-progress-circle>
</kirby-header>`},SM=(()=>{let e=class e{constructor(){this.template=Sd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-progress-circle-with-avatar"]],decls:4,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["value","75","themeColor","success","size","lg"],["themeColor","white"],["name","kirby"]],template:function(t,a){t&1&&(o(0,"kirby-header",0)(1,"kirby-progress-circle",1)(2,"kirby-avatar",2),p(3,"kirby-icon",3),n()()()),t&2&&m("title","Title")},dependencies:[J,ue,G,Y,w],encapsulation:2});let i=e;return i})();var Md={selector:"cookbook-header-example-title-scaling",template:`<kirby-header titleMaxLines="2" [title]="'Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization'" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`},PM=(()=>{let e=class e{constructor(){this.template=Md.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-title-scaling"]],decls:1,vars:1,consts:[["titleMaxLines","2","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization")},dependencies:[No,J],encapsulation:2});let i=e;return i})();function Td(i,e){i&1&&(o(0,"div",2),p(1,"kirby-badge",3),l(2," Custom section "),n())}var Ai={selector:"cookbook-header-example-custom-section",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-section" *kirbyHeaderCustomSection>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom section
  </div>
</kirby-header>`,styles:[`.custom-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--kirby-text-color-semi-dark);
}`]},FM=(()=>{let e=class e{constructor(){this.template=Ai.template,this.styles=Ai.styles.join(`

`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-custom-section"]],decls:2,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["class","custom-section",4,"kirbyHeaderCustomSection"],[1,"custom-section"],["size","sm","themeColor","success"]],template:function(t,a){t&1&&(o(0,"kirby-header",0),x(1,Td,3,0,"div",1),n()),t&2&&m("title","Title")},dependencies:[J,le,fi],styles:[".custom-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--kirby-text-color-semi-dark)}"]});let i=e;return i})();function Ed(i,e){i&1&&p(0,"kirby-icon",7)}function Pd(i,e){i&1&&(o(0,"kirby-action-group")(1,"button",8),p(2,"kirby-icon",4),l(3," Action 1 "),n(),o(4,"button",8),l(5," Action 2 "),n(),o(6,"button",8),l(7," Action 3 "),n()())}function Dd(i,e){i&1&&(o(0,"div",9),p(1,"kirby-badge",10),l(2," Custom section "),n())}var kr={selector:"cookbook-header-example-combined",template:`<kirby-header [title]="'Title'" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two" (titleClick)="onTitleClick($event)">
  <kirby-icon name="arrow-down" *kirbyHeaderTitleActionIcon></kirby-icon>
  
  <kirby-action-group *kirbyHeaderActions>
    <button kirby-button attentionLevel="3">
      <kirby-icon name="kirby"></kirby-icon>
      Action 1
    </button>
    <button kirby-button attentionLevel="3">
      Action 2
    </button>
    <button kirby-button attentionLevel="3">
      Action 3
    </button>
  </kirby-action-group>
  
  <kirby-avatar size="lg">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>

  <kirby-flag themeColor="warning">Warning</kirby-flag>

  <div class="custom-section" *kirbyHeaderCustomSection>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom section
  </div>
</kirby-header>`,styles:Ai.styles},VM=(()=>{let e=class e{constructor(r){this.toastController=r,this.template=kr.template,this.styles=kr.styles.join(`

`)}onTitleClick(r){let t={message:"Title clicked...",messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-combined"]],decls:8,vars:1,consts:[["value","12.345,67","valueUnit","USD","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"titleClick","title"],["name","arrow-down",4,"kirbyHeaderTitleActionIcon"],[4,"kirbyHeaderActions"],["size","lg"],["name","kirby"],["themeColor","warning"],["class","custom-section",4,"kirbyHeaderCustomSection"],["name","arrow-down"],["kirby-button","","attentionLevel","3"],[1,"custom-section"],["size","sm","themeColor","success"]],template:function(t,a){t&1&&(o(0,"kirby-header",0),b("titleClick",function(C){return a.onTitleClick(C)}),x(1,Ed,1,0,"kirby-icon",1)(2,Pd,8,0,"kirby-action-group",2),o(3,"kirby-avatar",3),p(4,"kirby-icon",4),n(),o(5,"kirby-flag",5),l(6,"Warning"),n(),x(7,Dd,3,0,"div",6),n()),t&2&&m("title","Title")},dependencies:[J,w,Gt,f,G,Le,le,fi,tt,zo],styles:[".custom-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--kirby-text-color-semi-dark)}"]});let i=e;return i})();function Od(i,e){i&1&&p(0,"kirby-icon",4)}var Id={template:`<kirby-page defaultBackHref="/">
  <kirby-header (titleClick)="onTitleClick($event)" [title]="'Interactive Title'" value="12345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-icon name="arrow-down" *kirbyHeaderTitleActionIcon></kirby-icon>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},gt=class gt extends j{constructor(e){super(),this.toastController=e}onTitleClick(e){let t={message:`Title ${e.currentTarget.closest("kirby-header")?"in header":"in toolbar"} clicked...`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};gt.template=Id.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),gt.codeSnippet=`onTitleClick(event: PointerEvent) {
  // Maybe do something based on the event target:
  const eventTarget = event.currentTarget as HTMLElement;
  const targetLocation = eventTarget.closest('kirby-header') ? 'Title in header clicked' : 'Title in toolbar clicked';
  // Do something...
}`,gt.\u0275fac=function(s){return new(s||gt)(v(A))},gt.\u0275cmp=d({type:gt,selectors:[["ng-component"]],features:[E],decls:5,vars:2,consts:[["defaultBackHref","/"],["value","12345,67","valueUnit","USD","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"titleClick","title"],["name","arrow-down",4,"kirbyHeaderTitleActionIcon"],[3,"innerHTML"],["name","arrow-down"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-header",1),b("titleClick",function(a){return r.onTitleClick(a)}),x(2,Od,1,0,"kirby-icon",2),n(),o(3,"kirby-page-content"),p(4,"div",3),n()()),s&2&&(c(),m("title","Interactive Title"),c(3),m("innerHTML",r.content,U))},dependencies:[$,J,w,ee],encapsulation:2});var fr=gt;function Fd(i,e){if(i&1){let s=P();oo(0),o(1,"kirby-menu")(2,"button",4),p(3,"kirby-icon",5),o(4,"span"),l(5,"Action"),n()(),o(6,"kirby-item",6),b("click",function(){S(s);let t=y();return M(t.actionClicked("Primary Action 1"))}),l(7," Primary Action 1 "),n(),o(8,"kirby-item",6),b("click",function(){S(s);let t=y();return M(t.actionClicked("Primary Action 2"))}),l(9," Primary Action 2 "),n()(),o(10,"kirby-menu")(11,"kirby-item",6),b("click",function(){S(s);let t=y();return M(t.actionClicked("Secondary Action 1"))}),l(12," Secondary Action 1 "),n(),o(13,"kirby-item",6),b("click",function(){S(s);let t=y();return M(t.actionClicked("Secondary Action 2"))}),l(14," Secondary Action 2 "),n()(),no()}i&2&&(c(6),m("selectable",!0),c(2),m("selectable",!0),c(3),m("selectable",!0),c(2),m("selectable",!0))}var Ld={template:`<kirby-page defaultBackHref="/">
  <kirby-header [title]="'Custom actions'" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <ng-container *kirbyHeaderActions>
      <kirby-menu>
        <button kirby-button>
          <kirby-icon name="kirby"></kirby-icon>
          <span>Action</span>
        </button>
        <kirby-item [selectable]="true" (click)="actionClicked('Primary Action 1')">
          Primary Action 1
        </kirby-item>
        <kirby-item [selectable]="true" (click)="actionClicked('Primary Action 2')">
          Primary Action 2
        </kirby-item>
      </kirby-menu>

      <kirby-menu>
        <kirby-item [selectable]="true" (click)="actionClicked('Secondary Action 1')">
          Secondary Action 1
        </kirby-item>
        <kirby-item [selectable]="true" (click)="actionClicked('Secondary Action 2')">
          Secondary Action 2
        </kirby-item>
      </kirby-menu>
    </ng-container>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},Pt=class Pt extends j{constructor(e){super(),this.toastController=e,this.document=window.document.body}actionClicked(e){let s={message:`${e} was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(s)}};Pt.template=Ld.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),Pt.\u0275fac=function(s){return new(s||Pt)(v(A))},Pt.\u0275cmp=d({type:Pt,selectors:[["ng-component"]],features:[E],decls:5,vars:2,consts:[["defaultBackHref","/"],["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],[4,"kirbyHeaderActions"],[3,"innerHTML"],["kirby-button",""],["name","kirby"],[3,"click","selectable"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-header",1),x(2,Fd,15,4,"ng-container",2),n(),o(3,"kirby-page-content"),p(4,"div",3),n()()),s&2&&(c(),m("title","Custom actions"),c(3),m("innerHTML",r.content,U))},dependencies:[$,J,Ae,f,w,h,ee,tt],encapsulation:2});var hr=Pt;function Ad(i,e){if(i&1){let s=P();o(0,"kirby-action-group")(1,"button",4),b("click",function(){S(s);let t=y();return M(t.actionClicked("Action 1"))}),p(2,"kirby-icon",5),o(3,"span",6),l(4,"Action 1"),n()(),o(5,"button",7),b("click",function(){S(s);let t=y();return M(t.actionClicked("Action 2"))}),p(6,"kirby-icon",8),o(7,"span",6),l(8,"Action 2"),n()()()}}var zd={template:`<kirby-page defaultBackHref="/">
  <kirby-header [emphasizeActions]="true" [title]="'Emphasize Actions'" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-action-group *kirbyHeaderActions>
      <button kirby-button attentionLevel="1" (click)="actionClicked('Action 1')">
        <kirby-icon name="edit"></kirby-icon>
        <span class="text">Action 1</span>
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 2')">
        <kirby-icon name="kirby"></kirby-icon>
        <span class="text">Action 2</span>
      </button>
    </kirby-action-group>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},Dt=class Dt extends j{constructor(e){super(),this.toastController=e}actionClicked(e){let s={message:`${e} was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(s)}};Dt.template=zd.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),Dt.\u0275fac=function(s){return new(s||Dt)(v(A))},Dt.\u0275cmp=d({type:Dt,selectors:[["ng-component"]],features:[E],decls:5,vars:3,consts:[["defaultBackHref","/"],["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"emphasizeActions","title"],[4,"kirbyHeaderActions"],[3,"innerHTML"],["kirby-button","","attentionLevel","1",3,"click"],["name","edit"],[1,"text"],["kirby-button","","attentionLevel","3",3,"click"],["name","kirby"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-header",1),x(2,Ad,9,0,"kirby-action-group",2),n(),o(3,"kirby-page-content"),p(4,"div",3),n()()),s&2&&(c(),m("emphasizeActions",!0)("title","Emphasize Actions"),c(3),m("innerHTML",r.content,U))},dependencies:[$,J,Gt,f,w,ee,tt],encapsulation:2});var Cr=Dt;function Bd(i,e){if(i&1){let s=P();o(0,"kirby-action-group")(1,"button",4),b("click",function(){S(s);let t=y();return M(t.actionClicked("Action 1"))}),p(2,"kirby-icon",5),o(3,"span",6),l(4,"Action 1"),n()(),o(5,"button",4),b("click",function(){S(s);let t=y();return M(t.actionClicked("Action 2"))}),l(6," Action 2 "),n(),o(7,"button",4),b("click",function(){S(s);let t=y();return M(t.actionClicked("Action 3"))}),l(8," Action 3 "),n()()}}var Nd={template:`<kirby-page defaultBackHref="/">
  <kirby-header [title]="'Action Group'" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-action-group *kirbyHeaderActions>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 1')">
        <kirby-icon name="edit"></kirby-icon>
        <span class="text">Action 1</span>
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 2')">
        Action 2
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 3')">
        Action 3
      </button>
    </kirby-action-group>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},Ot=class Ot extends j{constructor(e){super(),this.toastController=e}actionClicked(e){let s={message:`${e} was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(s)}};Ot.template=Nd.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),Ot.\u0275fac=function(s){return new(s||Ot)(v(A))},Ot.\u0275cmp=d({type:Ot,selectors:[["ng-component"]],features:[E],decls:5,vars:2,consts:[["defaultBackHref","/"],["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],[4,"kirbyHeaderActions"],[3,"innerHTML"],["kirby-button","","attentionLevel","3",3,"click"],["name","edit"],[1,"text"]],template:function(s,r){s&1&&(o(0,"kirby-page",0)(1,"kirby-header",1),x(2,Bd,9,0,"kirby-action-group",2),n(),o(3,"kirby-page-content"),p(4,"div",3),n()()),s&2&&(c(),m("title","Action Group"),c(3),m("innerHTML",r.content,U))},dependencies:[$,J,Gt,f,w,ee,tt],encapsulation:2});var vr=Ot;var Kd={selector:"cookbook-menu-selectable-example",template:`<kirby-menu>
  <kirby-item (click)="actionClicked('Stone')">
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Rick')">
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Gooey')">
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`},CT=(()=>{let e=class e{constructor(r){this.toastController=r,this.template=Kd.template}actionClicked(r){let t={message:`${r} was selected as your Hero.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(v(A))},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-selectable-example"]],decls:10,vars:0,consts:[[3,"click"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(o(0,"kirby-menu")(1,"kirby-item",0),b("click",function(){return a.actionClicked("Stone")}),o(2,"p",1),l(3,"Stone"),n()(),o(4,"kirby-item",0),b("click",function(){return a.actionClicked("Rick")}),o(5,"p",1),l(6,"Rick"),n()(),o(7,"kirby-item",0),b("click",function(){return a.actionClicked("Gooey")}),o(8,"p",1),l(9,"Gooey"),n()()())},dependencies:[Ae,h],encapsulation:2});let i=e;return i})();var qd={selector:"cookbook-menu-advanced-example",template:`<kirby-menu [closeOnSelect]="false" aria-label="Advanced items">
  <kirby-item>
    <kirby-icon name="person" slot="start"></kirby-icon>
    <kirby-checkbox slot="end">
      <kirby-label>      
        Friend Throw
      </kirby-label>
    </kirby-checkbox>
  </kirby-item>
  <kirby-item>
    <kirby-icon name="notification" slot="start"></kirby-icon>
    <kirby-checkbox slot="end">
      <kirby-label>      
        Ice Curling
      </kirby-label>
    </kirby-checkbox>
  </kirby-item>
  <kirby-item>
    <kirby-icon name="default" slot="start"></kirby-icon>
    <kirby-toggle slot="end">
      <kirby-label>      
        Allow Cheats
      </kirby-label>
    </kirby-toggle>
  </kirby-item>
</kirby-menu>`},TT=(()=>{let e=class e{constructor(){this.template=qd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-advanced-example"]],decls:16,vars:1,consts:[["aria-label","Advanced items",3,"closeOnSelect"],["name","person","slot","start"],["slot","end"],["name","notification","slot","start"],["name","default","slot","start"]],template:function(t,a){t&1&&(o(0,"kirby-menu",0)(1,"kirby-item"),p(2,"kirby-icon",1),o(3,"kirby-checkbox",2)(4,"kirby-label"),l(5," Friend Throw "),n()()(),o(6,"kirby-item"),p(7,"kirby-icon",3),o(8,"kirby-checkbox",2)(9,"kirby-label"),l(10," Ice Curling "),n()()(),o(11,"kirby-item"),p(12,"kirby-icon",4),o(13,"kirby-toggle",2)(14,"kirby-label"),l(15," Allow Cheats "),n()()()()),t&2&&m("closeOnSelect",!1)},dependencies:[Ae,h,w,B,Te,z],encapsulation:2});let i=e;return i})();var Hd={selector:"cookbook-menu-custom-button-example",template:`<kirby-menu aria-label="Custom button">
  <button
    kirby-button
    type="button"
    [attentionLevel]="'3'"
  >
    <kirby-icon [name]="'menu-outline'"></kirby-icon>
  </button>
  <kirby-item>
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`},FT=(()=>{let e=class e{constructor(){this.template=Hd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-custom-button-example"]],decls:12,vars:2,consts:[["aria-label","Custom button"],["kirby-button","","type","button",3,"attentionLevel"],[3,"name"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(o(0,"kirby-menu",0)(1,"button",1),p(2,"kirby-icon",2),n(),o(3,"kirby-item")(4,"p",3),l(5,"Stone"),n()(),o(6,"kirby-item")(7,"p",3),l(8,"Rick"),n()(),o(9,"kirby-item")(10,"p",3),l(11,"Gooey"),n()()()),t&2&&(c(),m("attentionLevel","3"),c(),m("name","menu-outline"))},dependencies:[Ae,f,w,h],encapsulation:2});let i=e;return i})();var Wd={selector:"cookbook-menu-portal-example",template:`<kirby-menu 
  [DOMPortalOutlet]="_outlet"
  >
  <kirby-item>
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>
`},BT=(()=>{let e=class e{constructor(r){this.cd=r,this.template=Wd.template,this.outletTag="cookbook-root",this.outletElement=this.getOutletElement()}set isOutletElementSet(r){this._outlet=r?this.outletElement:null}getOutletElement(){let r=document.getElementsByTagName(this.outletTag);if(!r||r.length===0)throw Error(`Could not locate HTMLElement for ${this.outletTag}. Did you misspell it?`);if(r.length>1)throw Error(`Multiple HTMLElements found for ${this.outletTag}.
      This can lead to unintended behaviours. Provide an unique outlet`);return r[0]}};e.\u0275fac=function(t){return new(t||e)(v(bo))},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-portal-example"]],inputs:{isOutletElementSet:"isOutletElementSet"},decls:10,vars:1,consts:[[3,"DOMPortalOutlet"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(o(0,"kirby-menu",0)(1,"kirby-item")(2,"p",1),l(3,"Stone"),n()(),o(4,"kirby-item")(5,"p",1),l(6,"Rick"),n()(),o(7,"kirby-item")(8,"p",1),l(9,"Gooey"),n()()()),t&2&&m("DOMPortalOutlet",a._outlet)},dependencies:[Ae,h],encapsulation:2});let i=e;return i})();var Vd={selector:"cookbook-menu-portal-config-example",template:`<kirby-menu [portalOutletConfig]="outletConfig">
  <kirby-item>
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`,codeSnippet:`public outletConfig: PortalOutletConfig = {
    selector: OutletSelector.tag,
    value: 'cookbook-root',
  };`},WT=(()=>{let e=class e{constructor(){this.template=Vd.template,this.outletConfig={selector:Ao.tag,value:"cookbook-root"}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-portal-config-example"]],decls:10,vars:1,consts:[[3,"portalOutletConfig"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(o(0,"kirby-menu",0)(1,"kirby-item")(2,"p",1),l(3,"Stone"),n()(),o(4,"kirby-item")(5,"p",1),l(6,"Rick"),n()(),o(7,"kirby-item")(8,"p",1),l(9,"Gooey"),n()()()),t&2&&m("portalOutletConfig",a.outletConfig)},dependencies:[Ae,h],encapsulation:2});let i=e;return i})();var Rd={selector:"cookbook-label-example-direction",template:`<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
</kirby-item>

<kirby-item>
  <kirby-label>
    <kirby-label direction="horizontal">
      <p class="kirby-item-title">Title</p>
      <p class="kirby-item-detail">Detail</p> 
    </kirby-label>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
  </kirby-label>
</kirby-item>`},GT=(()=>{let e=class e{constructor(){this.template=Rd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-label-example-direction"]],decls:15,vars:0,consts:[[1,"kirby-item-title"],[1,"kirby-item-detail"],["direction","horizontal"]],template:function(t,a){t&1&&(o(0,"kirby-item")(1,"kirby-label")(2,"p",0),l(3,"Title"),n(),o(4,"p",1),l(5,"Detail"),n()()(),o(6,"kirby-item")(7,"kirby-label")(8,"kirby-label",2)(9,"p",0),l(10,"Title"),n(),o(11,"p",1),l(12,"Detail"),n()(),o(13,"p"),l(14,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci."),n()()())},dependencies:[h,z],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();export{$d as a,ep as b,op as c,cp as d,pp as e,gp as f,fp as g,Sp as h,Dp as i,Fp as j,zp as k,qp as l,te as m,Up as n,tb as o,nb as p,lb as q,mb as r,Xo as s,hb as t,wb as u,Tb as v,Ib as w,Ab as x,Kb as y,Wb as z,Gb as A,Ub as B,Jb as C,tu as D,nu as E,lu as F,bu as G,yu as H,hu as I,_u as J,Tu as K,Ou as L,Au as M,Nu as N,Hu as O,Vu as P,Ju as Q,ge as R,lg as S,mg as T,bg as U,hg as V,_g as W,Mg as X,Dg as Y,Fg as Z,zg as _,Kg as $,Wg as aa,Gg as ba,Yg as ca,Xg as da,i0 as ea,r0 as fa,c0 as ga,p0 as ha,g0 as ia,C0 as ja,_0 as ka,T0 as la,D0 as ma,F0 as na,Be as oa,N0 as pa,V0 as qa,j0 as ra,Z0 as sa,ty as ta,ny as ua,ly as va,my as wa,by as xa,fy as ya,vy as za,Ey as Aa,Ay as Ba,Ny as Ca,Wy as Da,$y as Ea,Qy as Fa,ek as Ga,ak as Ha,ck as Ia,pk as Ja,vk as Ka,Sk as La,Ok as Ma,Ak as Na,Kk as Oa,Gk as Pa,Yk as Qa,af as Ra,mf as Sa,uf as Ta,hf as Ua,_f as Va,Tf as Wa,Of as Xa,Bf as Ya,qf as Za,Vf as _a,$f as $a,eh as ab,oh as bb,xn as cb,_n as db,Sn as eb,hh as fb,wh as gb,Ph as hb,Ih as ib,Lh as jb,qh as kb,$h as lb,Zh as mb,Xh as nb,aC as ob,uC as pb,vC as qb,MC as rb,OC as sb,BC as tb,WC as ub,jC as vb,ZC as wb,ov as xb,lv as yb,gv as zb,Cv as Ab,Sv as Bb,Pn as Cb,Dn as Db,On as Eb,In as Fb,Oi as Gb,Ln as Hb,zn as Ib,Nn as Jb,Kn as Kb,qn as Lb,Hn as Mb,Wn as Nb,Rn as Ob,Gn as Pb,$n as Qb,Un as Rb,Yn as Sb,Q1 as Tb,X1 as Ub,i_ as Vb,s_ as Wb,d_ as Xb,g_ as Yb,x_ as Zb,S_ as _b,E_ as $b,O_ as ac,z_ as bc,H_ as cc,$_ as dc,Z_ as ec,ow as fc,cw as gc,bw as hc,yw as ic,xw as jc,Sw as kc,Ow as lc,Nw as mc,Hw as nc,Rw as oc,Uw as pc,Zw as qc,iS as rc,Xn as sc,cS as tc,bS as uc,kS as vc,CS as wc,ir as xc,or as yc,nr as zc,PS as Ac,IS as Bc,AS as Cc,HS as Dc,QS as Ec,t2 as Fc,n2 as Gc,l2 as Hc,m2 as Ic,b2 as Jc,k2 as Kc,x2 as Lc,M2 as Mc,I2 as Nc,H2 as Oc,Q2 as Pc,X2 as Qc,iM as Rc,aM as Sc,mM as Tc,bM as Uc,fM as Vc,SM as Wc,PM as Xc,FM as Yc,VM as Zc,fr as _c,hr as $c,Cr as ad,vr as bd,CT as cd,TT as dd,FT as ed,BT as fd,WT as gd,GT as hd};
