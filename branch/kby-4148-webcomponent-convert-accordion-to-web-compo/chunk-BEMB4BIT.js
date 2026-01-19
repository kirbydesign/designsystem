import{$ as c,$b as ke,$c as Qt,$d as Xt,Aa as n,Ab as at,Ac as Re,Ad as z,Ae as ut,Ba as r,Bb as _i,Bc as cn,Bd as ve,Be as In,Ca as p,Cb as an,Cc as Di,Cd as de,Ce as Ji,Da as pe,Db as lt,Dc as ho,Dd as xn,De as Fn,E as v,Ea as le,Ec as Q,Ed as ze,Ee as An,F as _,Fa as Yo,Fb as ln,Fc as mn,Fd as f,Fe as bt,Ga as Qo,Gd as B,Ha as Jo,Hc as dn,Hd as vn,Ia as je,Id as J,Ie as ye,Ja as P,Jc as pn,Jd as Zt,Je as Zi,Kc as M,Kd as _n,Ke as Ln,L as ge,La as b,Lc as un,Ld as Ni,M as Vo,Ma as h,Mc as Oi,Md as Be,Na as Ci,Nd as Hi,Ne as Oe,Oa as xi,Oc as Ii,Od as ct,Oe as zn,Pa as Rt,Pc as C,Pd as qi,Pe as Bn,Qa as Vt,Qc as We,Qd as W,Qe as He,R as Wo,Ra as Wt,Rc as ce,Rd as mt,S as L,Sa as ee,Sc as Fi,Sd as A,T as Go,Tc as T,Ua as G,Uc as Le,Va as Zo,Vc as Yt,Vd as Ki,W as Y,Wa as s,Wc as Ai,Wd as Ri,Xa as k,Xc as Li,Ya as S,Yc as ae,Z as Uo,Za as Xo,Zb as Ut,Zd as wn,_b as jt,_c as bn,_d as $e,ab as Fe,ac as Se,ae as fe,b as ki,bb as K,bc as wi,bd as $,be as dt,cb as Ae,cc as ai,ce as Vi,db as Ie,dc as Si,de as Sn,e as No,eb as yo,ec as Mi,ee as Mn,fc as Me,fe as Z,gc as Te,gd as st,ge as Tn,hb as D,hc as Ee,hd as me,he as Wi,i as Ho,ia as x,ib as en,id as Jt,ie as Gi,jd as gn,je as Ui,k as go,ka as d,kb as X,kc as sn,ke as ji,l as qo,lb as se,lc as Ti,ld as zi,le as Yi,mb as tn,mc as Ve,md as N,me as En,na as E,nb as on,nc as xe,nd as yn,ne as Pn,oa as w,ob as St,oc as Pe,od as Bi,oe as ei,pd as hn,pe as te,qc as Ei,qd as R,qe as Qi,rb as vi,re as U,sa as Ke,sd as $i,se as Dn,ta as O,tc as Pi,td as De,te as On,u as Ko,ua as I,ue as ti,v as Ro,va as fi,vd as V,wa as jo,wb as nn,wd as Mt,xa as H,xb as Gt,xd as kn,ya as q,yd as fn,ye as Ne,za as m,zb as rn,zd as Cn,ze as pt}from"./chunk-4BAANJWY.js";var Oa={selector:"cookbook-item-example-sizes",template:`<kirby-item>
  <p class="kirby-item-title">Medium (default)</p>
</kirby-item>
<kirby-item size="sm">
  <p class="kirby-item-title">Small</p>
</kirby-item>
  <kirby-item size="xs">
  <p class="kirby-item-title">Extra small</p>
</kirby-item>`},au=(()=>{let e=class e{constructor(){this.template=Oa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-sizes"]],decls:9,vars:0,consts:[[1,"kirby-item-title"],["size","sm"],["size","xs"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"p",0),s(2,"Medium (default)"),r()(),n(3,"kirby-item",1)(4,"p",0),s(5,"Small"),r()(),n(6,"kirby-item",2)(7,"p",0),s(8,"Extra small"),r()())},dependencies:[f],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();function $n(i,e,l){return Mt(i,-e,l)}var Ia={selector:"cookbook-item-example-nested-controls",template:`<kirby-item>
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
</kirby-item>`},bu=(()=>{let e=class e{constructor(){this.template=Ia.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-nested-controls"]],decls:14,vars:0,consts:[["slot","end"],["kirby-button","","attentionLevel","2","slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"kirby-checkbox",0),s(2,"Item with Checkbox"),r()(),n(3,"kirby-radio-group")(4,"kirby-item")(5,"kirby-radio",0),s(6,"Item with Radio"),r()()(),n(7,"kirby-item")(8,"kirby-toggle",0),s(9,"Item with Toggle"),r()(),n(10,"kirby-item"),s(11," Item with Button "),n(12,"button",1),s(13,"Button"),r()())},dependencies:[f,z,ze,ve,C,de],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Fa={selector:"cookbook-item-example-text",template:`<kirby-item>
  <p class="kirby-item-title">Title that will be truncated because it is one long paragraph that cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
</kirby-item>
  
<kirby-item>
  <kirby-label>
    <p class="kirby-item-wrap kirby-item-title">Title that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </kirby-label>
</kirby-item>`},hu=(()=>{let e=class e{constructor(){this.template=Fa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-text"]],decls:7,vars:0,consts:[[1,"kirby-item-title"],[1,"kirby-item-wrap","kirby-item-title"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"p",0),s(2,"Title that will be truncated because it is one long paragraph that cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "),r()(),n(3,"kirby-item")(4,"kirby-label")(5,"p",1),s(6,"Title that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit."),r()()())},dependencies:[f,B],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Nn={selector:"cookbook-item-example-slots",template:`<kirby-item>
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
}`]},_u=(()=>{let e=class e{constructor(){this.template=Nn.template,this.styles=Nn.styles[0]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-slots"]],decls:11,vars:0,consts:[["slot","outside","themeColor","warning","size","sm"],["slot","start","themeColor","light"],["name","person"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end","themeColor","success"]],template:function(t,a){t&1&&(n(0,"kirby-item"),p(1,"kirby-badge",0),n(2,"kirby-avatar",1),p(3,"kirby-icon",2),r(),n(4,"kirby-label")(5,"p",3),s(6,"Title"),r(),n(7,"p",4),s(8,"Detail"),r()(),n(9,"kirby-flag",5),s(10,"60"),r()())},dependencies:[f,me,Be,V,M,B],styles:["div[slot=outside][_ngcontent-%COMP%]{display:flex;flex-direction:column}"]});let i=e;return i})();var Aa={selector:"cookbook-item-example-selectable",template:`<kirby-item [selectable]="true">
  <p class="kirby-item-title">Selectable</p>
</kirby-item>

<kirby-item [selectable]="true" disclosure="arrow-more">
  <p class="kirby-item-title">Selectable with disclosure</p>
</kirby-item>

<kirby-item href="https://github.com/kirbydesign/designsystem" disclosure="link" target="_blank">
  <p class="kirby-item-title">Link with disclosure</p>
</kirby-item>`},Mu=(()=>{let e=class e{constructor(){this.template=Aa.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-selectable"]],decls:9,vars:2,consts:[[3,"selectable"],[1,"kirby-item-title"],["disclosure","arrow-more",3,"selectable"],["href","https://github.com/kirbydesign/designsystem","disclosure","link","target","_blank"]],template:function(t,a){t&1&&(n(0,"kirby-item",0)(1,"p",1),s(2,"Selectable"),r()(),n(3,"kirby-item",2)(4,"p",1),s(5,"Selectable with disclosure"),r()(),n(6,"kirby-item",3)(7,"p",1),s(8,"Link with disclosure"),r()()),t&2&&(m("selectable",!0),c(3),m("selectable",!0))},dependencies:[f],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var La={selector:"cookbook-item-example-text-vertically-stacked",template:`<kirby-item>
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
</kirby-item>`},Pu=(()=>{let e=class e{constructor(){this.template=La.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-text-vertically-stacked"]],decls:16,vars:0,consts:[[1,"kirby-item-title"],[1,"kirby-item-subtitle"],[1,"kirby-item-detail"],[1,"kirby-item-wrap","kirby-item-subtitle"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",0),s(3,"Title"),r(),n(4,"p",1),s(5,"Subtitle"),r(),n(6,"p",2),s(7,"Detail"),r()()(),n(8,"kirby-item")(9,"kirby-label")(10,"p",0),s(11,"Title"),r(),n(12,"p",3),s(13,"Subtitle that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nulla dapibus, faucibus nibh non, ultricies ligula."),r(),n(14,"p",2),s(15,"Detail"),r()()())},dependencies:[f,B],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var za={selector:"cookbook-item-example-disabled",template:`<kirby-item [selectable]="true" [disabled]="true">
  <p class="kirby-item-title">Disabled Selectable</p>
</kirby-item>

<kirby-item [selectable]="true" [disclosure]="'arrow-more'" [disabled]="true">
  <p class="kirby-item-title">Disabled Selectable with Disclosure</p>
</kirby-item>`},Iu=(()=>{let e=class e{constructor(){this.template=za.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-disabled"]],decls:6,vars:5,consts:[[3,"selectable","disabled"],[1,"kirby-item-title"],[3,"selectable","disclosure","disabled"]],template:function(t,a){t&1&&(n(0,"kirby-item",0)(1,"p",1),s(2,"Disabled Selectable"),r()(),n(3,"kirby-item",2)(4,"p",1),s(5,"Disabled Selectable with Disclosure"),r()()),t&2&&(m("selectable",!0)("disabled",!0),c(3),m("selectable",!0)("disclosure","arrow-more")("disabled",!0))},dependencies:[f],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Ba={selector:"cookbook-item-example-disabled-controls",template:`<kirby-item>
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
</kirby-item>`},Nu=(()=>{let e=class e{constructor(){this.template=Ba.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-disabled-controls"]],decls:13,vars:4,consts:[["slot","end",3,"disabled"],["kirby-button","","attentionLevel","2","slot","end",3,"disabled"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"kirby-checkbox",0),s(2,"Item with Checkbox"),r()(),n(3,"kirby-item")(4,"kirby-radio",0),s(5,"Item with Radio"),r()(),n(6,"kirby-item")(7,"kirby-toggle",0),s(8,"Item with Toggle"),r()(),n(9,"kirby-item"),s(10," Item with Button "),n(11,"button",1),s(12,"Button"),r()()),t&2&&(c(),m("disabled",!0),c(3),m("disabled",!0),c(3),m("disabled",!0),c(4),m("disabled",!0))},dependencies:[f,z,ve,ze,C],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var $a={selector:"cookbook-item-example-complex-labels",template:`<kirby-item>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png">
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <kirby-label direction="horizontal">
      <p class="kirby-item-title">Fusce id neque suscipit, finibus urna convallis, auctor arcu.</p>
      <time class="kirby-item-detail">20.12.2017</time>
    </kirby-label>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
  </kirby-label>
</kirby-item>`},Vu=(()=>{let e=class e{constructor(){this.template=$a.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-example-complex-labels"]],decls:12,vars:0,consts:[["slot","start","overlay","true","imageSrc","/assets/images/woman.png"],["name","attach"],["direction","horizontal"],[1,"kirby-item-title"],[1,"kirby-item-detail"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"kirby-avatar",0)(2,"kirby-badge"),p(3,"kirby-icon",1),r()(),n(4,"kirby-label")(5,"kirby-label",2)(6,"p",3),s(7,"Fusce id neque suscipit, finibus urna convallis, auctor arcu."),r(),n(8,"time",4),s(9,"20.12.2017"),r()(),n(10,"p"),s(11,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci."),r()()())},dependencies:[f,M,me,V,B],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();var Xi=globalThis,eo=Xi.ShadowRoot&&(Xi.ShadyCSS===void 0||Xi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ko=Symbol(),Hn=new WeakMap,li=class{constructor(e,l,o){if(this._$cssResult$=!0,o!==ko)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=l}get styleSheet(){let e=this.o,l=this.t;if(eo&&e===void 0){let o=l!==void 0&&l.length===1;o&&(e=Hn.get(l)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Hn.set(l,e))}return e}toString(){return this.cssText}},qn=i=>new li(typeof i=="string"?i:i+"",void 0,ko),si=(i,...e)=>{let l=i.length===1?i[0]:e.reduce((o,t,a)=>o+(g=>{if(g._$cssResult$===!0)return g.cssText;if(typeof g=="number")return g;throw Error("Value passed to 'css' function must be a 'css' function result: "+g+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(t)+i[a+1],i[0]);return new li(l,i,ko)},Kn=(i,e)=>{if(eo)i.adoptedStyleSheets=e.map(l=>l instanceof CSSStyleSheet?l:l.styleSheet);else for(let l of e){let o=document.createElement("style"),t=Xi.litNonce;t!==void 0&&o.setAttribute("nonce",t),o.textContent=l.cssText,i.appendChild(o)}},fo=eo?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let l="";for(let o of e.cssRules)l+=o.cssText;return qn(l)})(i):i;var{is:Na,defineProperty:Ha,getOwnPropertyDescriptor:qa,getOwnPropertyNames:Ka,getOwnPropertySymbols:Ra,getPrototypeOf:Va}=Object,to=globalThis,Rn=to.trustedTypes,Wa=Rn?Rn.emptyScript:"",Ga=to.reactiveElementPolyfillSupport,ci=(i,e)=>i,mi={toAttribute(i,e){switch(e){case Boolean:i=i?Wa:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let l=i;switch(e){case Boolean:l=i!==null;break;case Number:l=i===null?null:Number(i);break;case Object:case Array:try{l=JSON.parse(i)}catch{l=null}}return l}},io=(i,e)=>!Na(i,e),Vn={attribute:!0,type:String,converter:mi,reflect:!1,useDefault:!1,hasChanged:io};Symbol.metadata??=Symbol("metadata"),to.litPropertyMetadata??=new WeakMap;var Ye=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,l=Vn){if(l.state&&(l.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((l=Object.create(l)).wrapped=!0),this.elementProperties.set(e,l),!l.noAccessor){let o=Symbol(),t=this.getPropertyDescriptor(e,o,l);t!==void 0&&Ha(this.prototype,e,t)}}static getPropertyDescriptor(e,l,o){let{get:t,set:a}=qa(this.prototype,e)??{get(){return this[l]},set(g){this[l]=g}};return{get:t,set(g){let y=t?.call(this);a?.call(this,g),this.requestUpdate(e,y,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Vn}static _$Ei(){if(this.hasOwnProperty(ci("elementProperties")))return;let e=Va(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ci("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ci("properties"))){let l=this.properties,o=[...Ka(l),...Ra(l)];for(let t of o)this.createProperty(t,l[t])}let e=this[Symbol.metadata];if(e!==null){let l=litPropertyMetadata.get(e);if(l!==void 0)for(let[o,t]of l)this.elementProperties.set(o,t)}this._$Eh=new Map;for(let[l,o]of this.elementProperties){let t=this._$Eu(l,o);t!==void 0&&this._$Eh.set(t,l)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let l=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let t of o)l.unshift(fo(t))}else e!==void 0&&l.push(fo(e));return l}static _$Eu(e,l){let o=l.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,l=this.constructor.elementProperties;for(let o of l.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Kn(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,l,o){this._$AK(e,o)}_$ET(e,l){let o=this.constructor.elementProperties.get(e),t=this.constructor._$Eu(e,o);if(t!==void 0&&o.reflect===!0){let a=(o.converter?.toAttribute!==void 0?o.converter:mi).toAttribute(l,o.type);this._$Em=e,a==null?this.removeAttribute(t):this.setAttribute(t,a),this._$Em=null}}_$AK(e,l){let o=this.constructor,t=o._$Eh.get(e);if(t!==void 0&&this._$Em!==t){let a=o.getPropertyOptions(t),g=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:mi;this._$Em=t;let y=g.fromAttribute(l,a.type);this[t]=y??this._$Ej?.get(t)??y,this._$Em=null}}requestUpdate(e,l,o,t=!1,a){if(e!==void 0){let g=this.constructor;if(t===!1&&(a=this[e]),o??=g.getPropertyOptions(e),!((o.hasChanged??io)(a,l)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(g._$Eu(e,o))))return;this.C(e,l,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,l,{useDefault:o,reflect:t,wrapped:a},g){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,g??l??this[e]),a!==!0||g!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(l=void 0),this._$AL.set(e,l)),t===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(l){Promise.reject(l)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,a]of this._$Ep)this[t]=a;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[t,a]of o){let{wrapped:g}=a,y=this[t];g!==!0||this._$AL.has(t)||y===void 0||this.C(t,void 0,a,y)}}let e=!1,l=this._$AL;try{e=this.shouldUpdate(l),e?(this.willUpdate(l),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(l)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(l)}willUpdate(e){}_$AE(e){this._$EO?.forEach(l=>l.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(l=>this._$ET(l,this[l])),this._$EM()}updated(e){}firstUpdated(e){}};Ye.elementStyles=[],Ye.shadowRootOptions={mode:"open"},Ye[ci("elementProperties")]=new Map,Ye[ci("finalized")]=new Map,Ga?.({ReactiveElement:Ye}),(to.reactiveElementVersions??=[]).push("2.1.2");var Mo=globalThis,Wn=i=>i,oo=Mo.trustedTypes,Gn=oo?oo.createPolicy("lit-html",{createHTML:i=>i}):void 0,Zn="$lit$",gt=`lit$${Math.random().toFixed(9).slice(2)}$`,Xn="?"+gt,Ua=`<${Xn}>`,Pt=document,pi=()=>Pt.createComment(""),ui=i=>i===null||typeof i!="object"&&typeof i!="function",To=Array.isArray,ja=i=>To(i)||typeof i?.[Symbol.iterator]=="function",Co=`[ 	
\f\r]`,di=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Un=/-->/g,jn=/>/g,Tt=RegExp(`>|${Co}(?:([^\\s"'>=/]+)(${Co}*=${Co}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yn=/'/g,Qn=/"/g,er=/^(?:script|style|textarea|title)$/i,Eo=i=>(e,...l)=>({_$litType$:i,strings:e,values:l}),tr=Eo(1),Qu=Eo(2),Ju=Eo(3),Qe=Symbol.for("lit-noChange"),ue=Symbol.for("lit-nothing"),Jn=new WeakMap,Et=Pt.createTreeWalker(Pt,129);function ir(i,e){if(!To(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gn!==void 0?Gn.createHTML(e):e}var Ya=(i,e)=>{let l=i.length-1,o=[],t,a=e===2?"<svg>":e===3?"<math>":"",g=di;for(let y=0;y<l;y++){let F=i[y],be,ne,re=-1,Ue=0;for(;Ue<F.length&&(g.lastIndex=Ue,ne=g.exec(F),ne!==null);)Ue=g.lastIndex,g===di?ne[1]==="!--"?g=Un:ne[1]!==void 0?g=jn:ne[2]!==void 0?(er.test(ne[2])&&(t=RegExp("</"+ne[2],"g")),g=Tt):ne[3]!==void 0&&(g=Tt):g===Tt?ne[0]===">"?(g=t??di,re=-1):ne[1]===void 0?re=-2:(re=g.lastIndex-ne[2].length,be=ne[1],g=ne[3]===void 0?Tt:ne[3]==='"'?Qn:Yn):g===Qn||g===Yn?g=Tt:g===Un||g===jn?g=di:(g=Tt,t=void 0);let rt=g===Tt&&i[y+1].startsWith("/>")?" ":"";a+=g===di?F+Ua:re>=0?(o.push(be),F.slice(0,re)+Zn+F.slice(re)+gt+rt):F+gt+(re===-2?y:rt)}return[ir(i,a+(i[l]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},bi=class i{constructor({strings:e,_$litType$:l},o){let t;this.parts=[];let a=0,g=0,y=e.length-1,F=this.parts,[be,ne]=Ya(e,l);if(this.el=i.createElement(be,o),Et.currentNode=this.el.content,l===2||l===3){let re=this.el.content.firstChild;re.replaceWith(...re.childNodes)}for(;(t=Et.nextNode())!==null&&F.length<y;){if(t.nodeType===1){if(t.hasAttributes())for(let re of t.getAttributeNames())if(re.endsWith(Zn)){let Ue=ne[g++],rt=t.getAttribute(re).split(gt),hi=/([.?@])?(.*)/.exec(Ue);F.push({type:1,index:a,name:hi[2],strings:rt,ctor:hi[1]==="."?vo:hi[1]==="?"?_o:hi[1]==="@"?wo:oi}),t.removeAttribute(re)}else re.startsWith(gt)&&(F.push({type:6,index:a}),t.removeAttribute(re));if(er.test(t.tagName)){let re=t.textContent.split(gt),Ue=re.length-1;if(Ue>0){t.textContent=oo?oo.emptyScript:"";for(let rt=0;rt<Ue;rt++)t.append(re[rt],pi()),Et.nextNode(),F.push({type:2,index:++a});t.append(re[Ue],pi())}}}else if(t.nodeType===8)if(t.data===Xn)F.push({type:2,index:a});else{let re=-1;for(;(re=t.data.indexOf(gt,re+1))!==-1;)F.push({type:7,index:a}),re+=gt.length-1}a++}}static createElement(e,l){let o=Pt.createElement("template");return o.innerHTML=e,o}};function ii(i,e,l=i,o){if(e===Qe)return e;let t=o!==void 0?l._$Co?.[o]:l._$Cl,a=ui(e)?void 0:e._$litDirective$;return t?.constructor!==a&&(t?._$AO?.(!1),a===void 0?t=void 0:(t=new a(i),t._$AT(i,l,o)),o!==void 0?(l._$Co??=[])[o]=t:l._$Cl=t),t!==void 0&&(e=ii(i,t._$AS(i,e.values),t,o)),e}var xo=class{constructor(e,l){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=l}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:l},parts:o}=this._$AD,t=(e?.creationScope??Pt).importNode(l,!0);Et.currentNode=t;let a=Et.nextNode(),g=0,y=0,F=o[0];for(;F!==void 0;){if(g===F.index){let be;F.type===2?be=new gi(a,a.nextSibling,this,e):F.type===1?be=new F.ctor(a,F.name,F.strings,this,e):F.type===6&&(be=new So(a,this,e)),this._$AV.push(be),F=o[++y]}g!==F?.index&&(a=Et.nextNode(),g++)}return Et.currentNode=Pt,t}p(e){let l=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,l),l+=o.strings.length-2):o._$AI(e[l])),l++}},gi=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,l,o,t){this.type=2,this._$AH=ue,this._$AN=void 0,this._$AA=e,this._$AB=l,this._$AM=o,this.options=t,this._$Cv=t?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,l=this._$AM;return l!==void 0&&e?.nodeType===11&&(e=l.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,l=this){e=ii(this,e,l),ui(e)?e===ue||e==null||e===""?(this._$AH!==ue&&this._$AR(),this._$AH=ue):e!==this._$AH&&e!==Qe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ja(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ue&&ui(this._$AH)?this._$AA.nextSibling.data=e:this.T(Pt.createTextNode(e)),this._$AH=e}$(e){let{values:l,_$litType$:o}=e,t=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=bi.createElement(ir(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===t)this._$AH.p(l);else{let a=new xo(t,this),g=a.u(this.options);a.p(l),this.T(g),this._$AH=a}}_$AC(e){let l=Jn.get(e.strings);return l===void 0&&Jn.set(e.strings,l=new bi(e)),l}k(e){To(this._$AH)||(this._$AH=[],this._$AR());let l=this._$AH,o,t=0;for(let a of e)t===l.length?l.push(o=new i(this.O(pi()),this.O(pi()),this,this.options)):o=l[t],o._$AI(a),t++;t<l.length&&(this._$AR(o&&o._$AB.nextSibling,t),l.length=t)}_$AR(e=this._$AA.nextSibling,l){for(this._$AP?.(!1,!0,l);e!==this._$AB;){let o=Wn(e).nextSibling;Wn(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},oi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,l,o,t,a){this.type=1,this._$AH=ue,this._$AN=void 0,this.element=e,this.name=l,this._$AM=t,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=ue}_$AI(e,l=this,o,t){let a=this.strings,g=!1;if(a===void 0)e=ii(this,e,l,0),g=!ui(e)||e!==this._$AH&&e!==Qe,g&&(this._$AH=e);else{let y=e,F,be;for(e=a[0],F=0;F<a.length-1;F++)be=ii(this,y[o+F],l,F),be===Qe&&(be=this._$AH[F]),g||=!ui(be)||be!==this._$AH[F],be===ue?e=ue:e!==ue&&(e+=(be??"")+a[F+1]),this._$AH[F]=be}g&&!t&&this.j(e)}j(e){e===ue?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},vo=class extends oi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ue?void 0:e}},_o=class extends oi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ue)}},wo=class extends oi{constructor(e,l,o,t,a){super(e,l,o,t,a),this.type=5}_$AI(e,l=this){if((e=ii(this,e,l,0)??ue)===Qe)return;let o=this._$AH,t=e===ue&&o!==ue||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==ue&&(o===ue||t);t&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},So=class{constructor(e,l,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=l,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){ii(this,e)}};var Qa=Mo.litHtmlPolyfillSupport;Qa?.(bi,gi),(Mo.litHtmlVersions??=[]).push("3.3.2");var or=(i,e,l)=>{let o=l?.renderBefore??e,t=o._$litPart$;if(t===void 0){let a=l?.renderBefore??null;o._$litPart$=t=new gi(e.insertBefore(pi(),a),a,void 0,l??{})}return t._$AI(i),t};var Po=globalThis,yt=class extends Ye{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let l=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=or(l,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qe}};yt._$litElement$=!0,yt.finalized=!0,Po.litElementHydrateSupport?.({LitElement:yt});var Ja=Po.litElementPolyfillSupport;Ja?.({LitElement:yt});(Po.litElementVersions??=[]).push("4.2.2");var Za={attribute:!0,type:String,converter:mi,reflect:!1,hasChanged:io},Xa=(i=Za,e,l)=>{let{kind:o,metadata:t}=l,a=globalThis.litPropertyMetadata.get(t);if(a===void 0&&globalThis.litPropertyMetadata.set(t,a=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(l.name,i),o==="accessor"){let{name:g}=l;return{set(y){let F=e.get.call(this);e.set.call(this,y),this.requestUpdate(g,F,i,!0,y)},init(y){return y!==void 0&&this.C(g,void 0,i,y),y}}}if(o==="setter"){let{name:g}=l;return function(y){let F=this[g];e.call(this,y),this.requestUpdate(g,F,i,!0,y)}}throw Error("Unsupported decorator location: "+o)};function Je(i){return(e,l)=>typeof l=="object"?Xa(i,e,l):((o,t,a)=>{let g=t.hasOwnProperty(a);return t.constructor.createProperty(a,o),g?Object.getOwnPropertyDescriptor(t,a):void 0})(i,e,l)}var nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rr=i=>(...e)=>({_$litDirective$:i,values:e}),ro=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,l,o){this._$Ct=e,this._$AM=l,this._$Ci=o}_$AS(e,l){return this.update(e,l)}update(e,l){return this.render(...l)}};var ar=rr(class extends ro{constructor(i){if(super(i),i.type!==nr.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let l=i.element.classList;for(let o of this.st)o in e||(l.remove(o),this.st.delete(o));for(let o in e){let t=!!e[o];t===this.st.has(o)||this.nt?.has(o)||(t?(l.add(o),this.st.add(o)):(l.remove(o),this.st.delete(o)))}return Qe}});var ao=class extends yt{static define(e=this.tagName,l=this){if(!e)throw new Error("[Kirby] Custom element name is missing. Please ensure class inheriting from `KirbyElement` has the static `tagName` property set to a valid custom element name.");customElements.get(e)||window.customElements.define(e,l)}};var lr=si`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var sr=si`
  :host {
    display: block;
    border-bottom: 1px solid var(--kirby-divider-color);
    box-sizing: border-box;
  }

  :host(:first-child) {
    border-top: 1px solid var(--kirby-divider-color);
  }

  :host(.has-list) {
    --kirby-item-background: transparent;
  }

  .header {
    display: flex;
    align-items: center;
    height: var(--kirby-spacing-xxxl);
    padding-left: var(--kirby-spacing-s);
    padding-right: var(--kirby-spacing-s);
    user-select: none;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    font-family: var(--kirby-font-family);
    text-align: start;
    transition: background var(--kirby-transition-quick);
  }

  .title {
    flex-grow: 2;
    display: flex;
    font-size: var(--kirby-font-size-n);
  }

  kirby-icon {
    transition: transform var(--kirby-transition-quick);
    font-size: var(--kirby-icon-font-size, 24px);
    width: 24px;
    height: 24px;
    display: block;
  }

  .kirby-icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    max-width: 24px;
    max-height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 1;
    vertical-align: middle;
    overflow: hidden;
  }

  .content {
    overflow: hidden;
    transition:
      height 0.2s,
      visibility 0.2s;
    height: 0;
    visibility: hidden;
    cursor: default;
  }

  .content[expanded] {
    height: auto;
    visibility: visible;
  }

  .content-body.padding {
    padding: 0 var(--kirby-spacing-s) var(--kirby-spacing-s);
  }

  button[disabled] {
    pointer-events: none;
  }

  button[disabled] .kirby-icon {
    color: var(--kirby-color-semi-dark, #8e8e8e);
  }

  button[disabled] .title {
    color: var(--kirby-text-color-semi-dark);
  }

  button {
    color: var(--kirby-color-black);
  }

  button[aria-expanded='true'] .title {
    font-weight: var(--kirby-font-weight-bold);
  }

  button[aria-expanded='true'] kirby-icon {
    transform: rotate(180deg);
  }

  button[disabled],
  .header[disabled],
  .content-layer[aria-disabled='true'] {
    cursor: default;
  }

  @media (hover: hover) {
    .header:hover,
    .content-layer:hover {
      background: var(--kirby-background-color-hover, #f0f0f0);
      cursor: pointer;
    }
    .header[disabled]:hover,
    .content-layer[aria-disabled='true']:hover {
      background: none;
      cursor: default;
    }
  }

  .header:focus-visible {
    background: var(--kirby-background-color-hover, #f0f0f0);
    outline: 0;
  }

  .header:active,
  .content-layer:active {
    background: var(--kirby-background-color-active, #e0e0e0);
  }

  /* Contextual styling for card/accordion parents */
  :host-context(kirby-accordion):not(:first-child) {
    border-top: none;
  }
  :host-context(kirby-card) {
    border-color: var(--kirby-background-color);
  }
  :host-context(kirby-card):first-child {
    border-top: none;
  }
  :host-context(kirby-card):last-child {
    border-bottom: none;
  }

  /* Only reset padding/margin for content.has-list */
  .content.has-list {
    padding: 0 !important;
    margin: 0 !important;
    min-height: 0 !important;
  }
  .content.has-list > * {
    margin: 0 !important;
    padding: 0 !important;
  }
`;var Dt=function(i,e,l,o){var t=arguments.length,a=t<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,l):o,g;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,l,o);else for(var y=i.length-1;y>=0;y--)(g=i[y])&&(a=(t<3?g(a):t>3?g(e,l,a):g(e,l))||a);return t>3&&a&&Object.defineProperty(e,l,a),a},cr=0,mr=(()=>{let e=class e extends ao{constructor(){super(...arguments),this.title="",this.isExpanded=!1,this.isDisabled=!1,this.disabledTitle="",this.hasPadding=!0,this.shape="none",this._titleId=`kirby-accordion-item-title-${++cr}`,this._contentId=`kirby-accordion-item-content-${cr}`}getTitle(){return this.isDisabled&&this.disabledTitle?this.disabledTitle:this.title}_onToggleExpanded(o){o.preventDefault(),!this.isDisabled&&(this.isExpanded=!this.isExpanded,this.dispatchEvent(new CustomEvent("toggle",{detail:this.isExpanded,bubbles:!0,composed:!0})))}firstUpdated(){let o=this.renderRoot.querySelector("slot");o&&o.addEventListener("slotchange",()=>{o.assignedElements({flatten:!0}).forEach(a=>{a.tagName==="KIRBY-LIST"&&a.setAttribute("shape","none")})})}render(){return tr`
      <div class="content-layer" aria-disabled=${this.isDisabled?"true":"false"}>
        <div
          aria-level=${this.headingLevel??ue}
          role=${this.headingLevel?"heading":ue}
        >
          <button
            type="button"
            class="header"
            aria-expanded=${String(this.isExpanded)}
            aria-controls=${this._contentId}
            id=${this._titleId}
            ?disabled=${this.isDisabled}
            @click=${this._onToggleExpanded}
          >
            <span class="state-layer" aria-hidden="true"></span>
            <div class="title" ?bold=${this.isExpanded}>${this.getTitle()}</div>

            <span class="kirby-icon">
              <kirby-icon name="arrow-down"></kirby-icon>
            </span>
          </button>
        </div>
        <div
          class="content"
          role="region"
          aria-labelledby=${this._titleId}
          id=${this._contentId}
          ?expanded=${this.isExpanded}
        >
          <div class=${ar({"content-body":!0,padding:this.hasPadding})}>
            <slot></slot>
          </div>
        </div>
      </div>
    `}};e.tagName="kirby-accordion-item",e.styles=[lr,sr];let i=e;return Dt([Je({type:String})],i.prototype,"title",void 0),Dt([Je({type:Boolean,reflect:!0})],i.prototype,"isExpanded",void 0),Dt([Je({type:Boolean,reflect:!0})],i.prototype,"isDisabled",void 0),Dt([Je({type:String})],i.prototype,"disabledTitle",void 0),Dt([Je({type:Boolean,reflect:!0})],i.prototype,"hasPadding",void 0),Dt([Je({type:Number})],i.prototype,"headingLevel",void 0),Dt([Je({type:String})],i.prototype,"shape",void 0),i})();var el=["*"],Ge=(()=>{let e=class e{constructor(o,t,a){this.e=o,this.ngZone=t,this.cdr=a,this.toggle=new ge,this.el=this.e.nativeElement,this.cdr.detach(),this.el.addEventListener("toggle",g=>{this.toggle.emit(g)})}set shape(o){this.ngZone.runOutsideAngular(()=>this.el.shape=o)}get shape(){return this.el.shape}set title(o){this.ngZone.runOutsideAngular(()=>this.el.title=o)}get title(){return this.el.title}set isExpanded(o){this.ngZone.runOutsideAngular(()=>this.el.isExpanded=o)}get isExpanded(){return this.el.isExpanded}set isDisabled(o){this.ngZone.runOutsideAngular(()=>this.el.isDisabled=o)}get isDisabled(){return this.el.isDisabled}set disabledTitle(o){this.ngZone.runOutsideAngular(()=>this.el.disabledTitle=o)}get disabledTitle(){return this.el.disabledTitle}set hasPadding(o){this.ngZone.runOutsideAngular(()=>this.el.hasPadding=o)}get hasPadding(){return this.el.hasPadding}set headingLevel(o){this.ngZone.runOutsideAngular(()=>this.el.headingLevel=o)}get headingLevel(){return this.el.headingLevel}};e.\u0275fac=function(t){return new(t||e)(x(Go),x(Vo),x(vi))},e.\u0275cmp=d({type:e,selectors:[["kirby-accordion-item"]],inputs:{shape:"shape",title:"title",isExpanded:"isExpanded",isDisabled:"isDisabled",disabledTitle:"disabledTitle",hasPadding:"hasPadding",headingLevel:"headingLevel"},outputs:{toggle:"toggle"},ngContentSelectors:el,decls:1,vars:0,template:function(t,a){t&1&&(Ci(),xi(0))},encapsulation:2,changeDetection:0});let i=e;return i})();mr.define();var tl={selector:"cookbook-accordion-default-example",template:`<kirby-accordion>
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
    </kirby-accordion>`},g0=(()=>{let e=class e{constructor(){this.template=tl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-default-example"]],decls:9,vars:0,consts:[["title","Title for accordion item 1"],["title","Title for accordion item 2"],["title","Title for accordion item 3","isDisabled","{true}","disabledTitle","Title for disabled accordion item 3"],["title","Title for accordion item 4"]],template:function(t,a){t&1&&(n(0,"kirby-accordion")(1,"kirby-accordion-item",0),s(2," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(3,"kirby-accordion-item",1),s(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(5,"kirby-accordion-item",2),s(6," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(7,"kirby-accordion-item",3),s(8," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r()())},dependencies:[Ge,De],encapsulation:2});let i=e;return i})();var il={selector:"cookbook-accordion-expanded-example",template:`<kirby-accordion>
      <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
    </kirby-accordion>`},k0=(()=>{let e=class e{constructor(){this.template=il.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-expanded-example"]],decls:5,vars:1,consts:[["title","Title for accordion item 1",3,"isExpanded"],["title","Title for accordion item 2"]],template:function(t,a){t&1&&(n(0,"kirby-accordion")(1,"kirby-accordion-item",0),s(2," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(3,"kirby-accordion-item",1),s(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r()()),t&2&&(c(),m("isExpanded",!0))},dependencies:[$i,De],encapsulation:2});let i=e;return i})();var ol={selector:"cookbook-accordion-card-example",template:`<kirby-card>
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
    </kirby-card>`},_0=(()=>{let e=class e{constructor(){this.template=ol.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-card-example"]],decls:10,vars:0,consts:[["title","Title for accordion item 1"],["title","Title for accordion item 2"],["title","Title for accordion item 3"],["title","Title for accordion item 4"]],template:function(t,a){t&1&&(n(0,"kirby-card")(1,"kirby-accordion")(2,"kirby-accordion-item",0),s(3," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(4,"kirby-accordion-item",1),s(5," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(6,"kirby-accordion-item",2),s(7," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(8,"kirby-accordion-item",3),s(9," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r()()())},dependencies:[T,Ge,De],encapsulation:2});let i=e;return i})();var ie=class{constructor(){this.itemsFullList=[{id:0,title:"Vestas Wind Systems has a very long name",subTitle:"2000 pcs",amount:"5.587.218.309 DKK",detail:225,color:"default"},{id:1,title:"Cypress Semiconductor Corporation",subTitle:"1827 pcs",amount:"76.980 DKK",detail:-3,color:"light"},{id:2,title:"Ultragenyx Pharmaceutical Inc.",subTitle:"787 pcs",amount:"83.004 DKK",detail:-115,color:"white"},{id:3,title:"Trans World Entertainment Corp.",subTitle:"467 pcs",amount:"60.963 DKK",detail:6,color:"light"},{id:4,title:"Astronics Corporation",subTitle:"791 pcs",amount:"33.830 DKK",detail:-154,color:"white",isStandAlone:!0},{id:5,title:"Riverview Bancorp Inc",subTitle:"206 pcs",amount:"60.775 DKK",detail:98,color:"light",isStandAlone:!0},{id:6,title:"Haemonetics Corporation",subTitle:"988 pcs",amount:"61.196 DKK",detail:220,color:"white"},{id:7,title:"PJT Partners Inc.",subTitle:"1706 pcs",amount:"52.441 DKK",detail:129,color:"light"},{id:8,title:"Total S.A.",subTitle:"827 pcs",amount:"62.276 DKK",detail:53,color:"white"},{id:9,title:"Northrop Grumman Corporation",subTitle:"443 pcs",amount:"95.190 DKK",detail:-135,color:"white"},{id:10,title:"Rudolph Technologies, Inc.",subTitle:"1799 pcs",amount:"18.442 DKK",detail:86},{id:11,title:"Atlas Financial Holdings, Inc.",subTitle:"129 pcs",amount:"75.842 DKK",detail:-43},{id:12,title:"Five Star Senior Living Inc.",subTitle:"36 pcs",amount:"99.125 DKK",detail:-144},{id:13,title:"Microbot Medical Inc. ",subTitle:"1426 pcs",amount:"35.459 DKK",detail:-78},{id:14,title:"Nova Lifestyle, Inc",subTitle:"1840 pcs",amount:"26.466 DKK",detail:-84},{id:15,title:"Corning Incorporated",subTitle:"854 pcs",amount:"37.490 DKK",detail:-94},{id:16,title:"Chembio Diagnostics, Inc.",subTitle:"1964 pcs",amount:"41.765 DKK",detail:122},{id:17,title:"RLJ Lodging Trust",subTitle:"393 pcs",amount:"68.623 DKK",detail:14},{id:18,title:"Prudential Financial, Inc.",subTitle:"171 pcs",amount:"45.999 DKK",detail:-77},{id:19,title:"PDC Energy, Inc.",subTitle:"1837 pcs",amount:"52.101 DKK",detail:-152},{id:20,title:"Norbord Inc.",subTitle:"1271 pcs",amount:"36.160 DKK",detail:183},{id:21,title:"Origo Acquisition Corporation",subTitle:"929 pcs",amount:"49.608 DKK",detail:174},{id:22,title:"American Railcar Industries, Inc.",subTitle:"861 pcs",amount:"10.419 DKK",detail:-179},{id:23,title:"QAD Inc.",subTitle:"1195 pcs",amount:"53.019 DKK",detail:-156},{id:24,title:"ENDRA Life Sciences Inc.",subTitle:"1522 pcs",amount:"36.737 DKK",detail:-147},{id:25,title:"Pacific Mercantile Bancorp",subTitle:"958 pcs",amount:"95.228 DKK",detail:249},{id:26,title:"Aerojet Rocketdyne Holdings, Inc. ",subTitle:"27 pcs",amount:"92.171 DKK",detail:82},{id:27,title:"Simon Property Group, Inc.",subTitle:"281 pcs",amount:"5.875 DKK",detail:-121},{id:28,title:"Dr. Reddy's Laboratories Ltd",subTitle:"1882 pcs",amount:"5.498 DKK",detail:66},{id:29,title:"Everest Re Group, Ltd.",subTitle:"941 pcs",amount:"24.855 DKK",detail:-1},{id:30,title:"Gores Holdings II, Inc.",subTitle:"1689 pcs",amount:"86.716 DKK",detail:-150},{id:31,title:"Bank Mutual Corporation",subTitle:"1568 pcs",amount:"25.747 DKK",detail:-197},{id:32,title:"Two Harbors Investments Corp",subTitle:"936 pcs",amount:"64.032 DKK",detail:-103},{id:33,title:"Chesapeake Energy Corporation",subTitle:"287 pcs",amount:"51.267 DKK",detail:5},{id:34,title:"Royce Global Value Trust, Inc.",subTitle:"656 pcs",amount:"45.622 DKK",detail:-178},{id:35,title:"R.R. Donnelley & Sons Company",subTitle:"587 pcs",amount:"65.442 DKK",detail:-117},{id:36,title:"First Bank",subTitle:"492 pcs",amount:"19.560 DKK",detail:48},{id:37,title:"Digital Realty Trust, Inc.",subTitle:"185 pcs",amount:"60.367 DKK",detail:169},{id:38,title:"Kenon Holdings Ltd.",subTitle:"907 pcs",amount:"80.383 DKK",detail:-75},{id:39,title:"Pebblebrook Hotel Trust",subTitle:"672 pcs",amount:"93.421 DKK",detail:32},{id:40,title:"Cable One, Inc.",subTitle:"329 pcs",amount:"67.225 DKK",detail:249},{id:41,title:"Acacia Research Corporation",subTitle:"1060 pcs",amount:"4.490 DKK",detail:196},{id:42,title:"Ashford Hospitality Trust Inc",subTitle:"1926 pcs",amount:"31.059 DKK",detail:213},{id:43,title:"MakeMyTrip Limited",subTitle:"1177 pcs",amount:"59.227 DKK",detail:110},{id:44,title:"Icahn Enterprises L.P.",subTitle:"663 pcs",amount:"10.415 DKK",detail:99},{id:45,title:"China Unicom (Hong Kong) Ltd",subTitle:"517 pcs",amount:"30.143 DKK",detail:90},{id:46,title:"Intrexon Corporation",subTitle:"1739 pcs",amount:"4.334 DKK",detail:-70},{id:47,title:"Sequans Communications S.A.",subTitle:"109 pcs",amount:"46.363 DKK",detail:160},{id:48,title:"EMC Insurance Group Inc.",subTitle:"219 pcs",amount:"73.717 DKK",detail:-40},{id:49,title:"Corbus Pharmaceuticals Holdings, Inc.",subTitle:"1610 pcs",amount:"86.740 DKK",detail:74},{id:50,title:"China Ceramics Co., Ltd.",subTitle:"1656 pcs",amount:"68.075 DKK",detail:237},{id:51,title:"Chemung Financial Corp",subTitle:"1044 pcs",amount:"20.552 DKK",detail:31},{id:52,title:"Connecture, Inc.",subTitle:"62 pcs",amount:"40.611 DKK",detail:10},{id:53,title:"PROS Holdings, Inc.",subTitle:"377 pcs",amount:"92.387 DKK",detail:104},{id:54,title:"First Financial Bancorp.",subTitle:"681 pcs",amount:"81.602 DKK",detail:-22},{id:55,title:"iShares MSCI EM ESG Optimized ETF",subTitle:"1196 pcs",amount:"80.588 DKK",detail:-62},{id:56,title:"Western Asset Managed Municipals Fund, Inc.",subTitle:"1939 pcs",amount:"77.171 DKK",detail:-182},{id:57,title:"CTI Industries Corporation",subTitle:"1657 pcs",amount:"46.813 DKK",detail:-90},{id:58,title:"Paycom Software, Inc.",subTitle:"1609 pcs",amount:"58.124 DKK",detail:-141},{id:59,title:"Tower International, Inc.",subTitle:"1157 pcs",amount:"6.468 DKK",detail:224},{id:60,title:"Sarepta Therapeutics, Inc.",subTitle:"963 pcs",amount:"50.810 DKK",detail:103},{id:61,title:"Golar LNG Partners LP",subTitle:"13 pcs",amount:"47.434 DKK",detail:30},{id:62,title:"Applied Genetic Technologies Corporation",subTitle:"1022 pcs",amount:"10.281 DKK",detail:30},{id:63,title:"CHS Inc",subTitle:"1260 pcs",amount:"81.019 DKK",detail:212},{id:64,title:"Principal Real Estate Income Fund",subTitle:"408 pcs",amount:"99.185 DKK",detail:69},{id:65,title:"Nuveen Real Estate Fund",subTitle:"1107 pcs",amount:"29.376 DKK",detail:-74},{id:66,title:"Oaktree Capital Group, LLC",subTitle:"840 pcs",amount:"75.339 DKK",detail:248},{id:67,title:"Fresh Del Monte Produce, Inc.",subTitle:"957 pcs",amount:"27.564 DKK",detail:-150},{id:68,title:"MVC Capital, Inc.",subTitle:"281 pcs",amount:"69.197 DKK",detail:47},{id:69,title:"MercadoLibre, Inc.",subTitle:"1113 pcs",amount:"57.923 DKK",detail:203},{id:70,title:"SmartFinancial, Inc.",subTitle:"735 pcs",amount:"89.855 DKK",detail:146},{id:71,title:"ClubCorp Holdings, Inc.",subTitle:"313 pcs",amount:"99.364 DKK",detail:-86},{id:72,title:"Immunomedics, Inc.",subTitle:"71 pcs",amount:"69.832 DKK",detail:188},{id:73,title:"KapStone Paper and Packaging Corporation",subTitle:"473 pcs",amount:"12.219 DKK",detail:-64},{id:74,title:"Stifel Financial Corporation",subTitle:"564 pcs",amount:"58.651 DKK",detail:154},{id:75,title:"Xinyuan Real Estate Co Ltd",subTitle:"810 pcs",amount:"72.391 DKK",detail:198},{id:76,title:"Liberty Global plc",subTitle:"1473 pcs",amount:"1.976 DKK",detail:-135},{id:77,title:"Morgan Stanley",subTitle:"1079 pcs",amount:"58.112 DKK",detail:41},{id:78,title:"Evertec, Inc.",subTitle:"1851 pcs",amount:"59.546 DKK",detail:48},{id:79,title:"CVR Refining, LP",subTitle:"1134 pcs",amount:"99.919 DKK",detail:91},{id:80,title:"Marine Petroleum Trust",subTitle:"228 pcs",amount:"1.030 DKK",detail:240},{id:81,title:"Frontier Communications Corporation",subTitle:"1534 pcs",amount:"66.856 DKK",detail:-70},{id:82,title:"Middlesex Water Company",subTitle:"1584 pcs",amount:"27.582 DKK",detail:109},{id:83,title:"Syneron Medical Ltd.",subTitle:"157 pcs",amount:"76.750 DKK",detail:73},{id:84,title:"Allison Transmission Holdings, Inc.",subTitle:"857 pcs",amount:"98.364 DKK",detail:-20},{id:85,title:"Cirrus Logic, Inc.",subTitle:"95 pcs",amount:"79.359 DKK",detail:-102},{id:86,title:"MFS Multimarket Income Trust",subTitle:"687 pcs",amount:"17.861 DKK",detail:-95},{id:87,title:"Lincoln Electric Holdings, Inc.",subTitle:"441 pcs",amount:"71.454 DKK",detail:241},{id:88,title:"Navient Corporation",subTitle:"1034 pcs",amount:"77.255 DKK",detail:30},{id:89,title:"The Descartes Systems Group Inc.",subTitle:"1213 pcs",amount:"99.418 DKK",detail:12},{id:90,title:"Republic First Bancorp, Inc.",subTitle:"1366 pcs",amount:"24.934 DKK",detail:-46},{id:91,title:"PNM Resources, Inc. (Holding Co.)",subTitle:"79 pcs",amount:"9.423 DKK",detail:32},{id:92,title:"Arthur J. Gallagher & Co.",subTitle:"299 pcs",amount:"87.935 DKK",detail:-105},{id:93,title:"Rambus, Inc.",subTitle:"564 pcs",amount:"76.053 DKK",detail:-129},{id:94,title:"FARO Technologies, Inc.",subTitle:"1912 pcs",amount:"48.066 DKK",detail:-141},{id:95,title:"Dynex Capital, Inc.",subTitle:"557 pcs",amount:"81.093 DKK",detail:-76},{id:96,title:"Nuveen New York Municipal Value Fund, Inc.",subTitle:"106 pcs",amount:"88.488 DKK",detail:-16},{id:97,title:"Kirby Corporation",subTitle:"406 pcs",amount:"2.622 DKK",detail:217},{id:98,title:"Oconee Federal Financial Corp.",subTitle:"1649 pcs",amount:"58.086 DKK",detail:102},{id:99,title:"WSFS Financial Corporation",subTitle:"1959 pcs",amount:"28.587 DKK",detail:52},{id:100,title:"Nuveen Short Duration Credit Opportunities Fund",subTitle:"1835 pcs",amount:"88.272 DKK",detail:75}],this.items=this.itemsFullList.slice(0,8)}onItemSelect(e){alert(`You have clicked the row [${e.title} ${e.amount}]`)}};function nl(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",4),s(3),r(),n(4,"p",5),s(5),r()(),n(6,"kirby-label",6)(7,"data",7),s(8),r(),n(9,"data",8),s(10),r()()()),i&2){let l=e.$implicit;c(3),k(l.title),c(2),k(l.subTitle),c(2),m("value",l.amount),c(),k(l.amount),c(),m("value",l.detail),c(),k(l.detail)}}function rl(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",4),s(3),r(),n(4,"p",5),s(5),r()(),n(6,"kirby-label",6)(7,"data",7),s(8),r(),n(9,"data",8),s(10),r()()()),i&2){let l=e.$implicit;c(3),k(l.title),c(2),k(l.subTitle),c(2),m("value",l.amount),c(),k(l.amount),c(),m("value",l.detail),c(),k(l.detail)}}var al={selector:"cookbook-accordion-with-list-example",template:`<kirby-accordion>
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
</kirby-accordion>`},I0=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=al.template}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-with-list-example"]],features:[E],decls:7,vars:3,consts:[["title","Transactions",3,"isExpanded"],[3,"items"],[4,"kirbyListItemTemplate"],["title","More Transactions"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-accordion")(1,"kirby-accordion-item",0)(2,"kirby-list",1),w(3,nl,11,6,"kirby-item",2),r()(),n(4,"kirby-accordion-item",3)(5,"kirby-list",1),w(6,rl,11,6,"kirby-item",2),r()()()),t&2&&(c(),m("isExpanded",!0),c(),m("items",a.itemsFullList.slice(0,4)),c(3),m("items",a.itemsFullList.slice(4,7)))},dependencies:[Ge,R,f,B,N,De],encapsulation:2});let i=e;return i})();function ll(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",4),s(3),r(),n(4,"p",5),s(5),r()(),n(6,"kirby-label",6)(7,"data",7),s(8),r(),n(9,"data",8),s(10),r()()()),i&2){let l=e.$implicit;c(3),k(l.title),c(2),k(l.subTitle),c(2),m("value",l.amount),c(),k(l.amount),c(),m("value",l.detail),c(),k(l.detail)}}function sl(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",4),s(3),r(),n(4,"p",5),s(5),r()(),n(6,"kirby-label",6)(7,"data",7),s(8),r(),n(9,"data",8),s(10),r()()()),i&2){let l=e.$implicit;c(3),k(l.title),c(2),k(l.subTitle),c(2),m("value",l.amount),c(),k(l.amount),c(),m("value",l.detail),c(),k(l.detail)}}var cl={selector:"cookbook-accordion-with-list-in-card-example",template:`<kirby-card>
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
</kirby-card>`},N0=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=cl.template}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-with-list-in-card-example"]],features:[E],decls:8,vars:3,consts:[["title","Transactions",3,"isExpanded"],[3,"items"],[4,"kirbyListItemTemplate"],["title","More Transactions"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-card")(1,"kirby-accordion")(2,"kirby-accordion-item",0)(3,"kirby-list",1),w(4,ll,11,6,"kirby-item",2),r()(),n(5,"kirby-accordion-item",3)(6,"kirby-list",1),w(7,sl,11,6,"kirby-item",2),r()()()()),t&2&&(c(2),m("isExpanded",!0),c(),m("items",a.itemsFullList.slice(0,4)),c(3),m("items",a.itemsFullList.slice(4,7)))},dependencies:[T,$i,R,f,De,B,N],encapsulation:2});let i=e;return i})();var dr={selector:"cookbook-accordion-events-example",template:`<kirby-accordion>
  <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true" (toggle)="onToggleChange($event, 'item 1')">
    Click item to see "toggle" event in action
  </kirby-accordion-item>
  <kirby-accordion-item title="Title for accordion item 2" (toggle)="onToggleChange($event, 'item 2')">
    Click item to see "toggle" event in action
  </kirby-accordion-item>
</kirby-accordion>`,codeSnippet:`onToggleChange(isOpen: boolean, item: string) {
  ...
}`},R0=(()=>{let e=class e{constructor(o){this.toastController=o,this.template=dr.template,this.codeSnippet=dr.codeSnippet}onToggleChange(o,t){let a={message:`Accordion ${t} toggled - is open: ${o}`,messageType:o?"success":"warning",durationInMs:1500};this.toastController.showToast(a)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-events-example"]],decls:5,vars:1,consts:[["title","Title for accordion item 1",3,"toggle","isExpanded"],["title","Title for accordion item 2",3,"toggle"]],template:function(t,a){t&1&&(n(0,"kirby-accordion")(1,"kirby-accordion-item",0),b("toggle",function(y){return a.onToggleChange(y,"item 1")}),s(2,' Click item to see "toggle" event in action '),r(),n(3,"kirby-accordion-item",1),b("toggle",function(y){return a.onToggleChange(y,"item 2")}),s(4,' Click item to see "toggle" event in action '),r()()),t&2&&(c(),m("isExpanded",!0))},dependencies:[Ge,De],encapsulation:2});let i=e;return i})();var ml={selector:"cookbook-accordion-heading-level-example",template:`<kirby-accordion [headingLevel]="3" >
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
    </kirby-accordion>`},U0=(()=>{let e=class e{constructor(){this.template=ml.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-accordion-heading-level-example"]],decls:9,vars:1,consts:[[3,"headingLevel"],["title","Title for accordion item 1"],["title","Title for accordion item 2"],["title","Title for accordion item 3","isDisabled","{true}","disabledTitle","Title for disabled accordion item 3"],["title","Title for accordion item 4"]],template:function(t,a){t&1&&(n(0,"kirby-accordion",0)(1,"kirby-accordion-item",1),s(2," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(3,"kirby-accordion-item",2),s(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(5,"kirby-accordion-item",3),s(6," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r(),n(7,"kirby-accordion-item",4),s(8," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r()()),t&2&&m("headingLevel",3)},dependencies:[Ge,De],encapsulation:2});let i=e;return i})();var Q0=(()=>{let e=class e{constructor(o){this.modalController=o}showActionSheet(){let o={header:"Your action sheet header",subheader:"Your action sheet subheader",items:[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}],cancelButtonText:"Custom cancel"};this.modalController.showActionSheet(o,this.onActionSelected)}onActionSelected(o){console.log(`Action sheet selection: ${JSON.stringify(o)}`)}};e.\u0275fac=function(t){return new(t||e)(x(ae))},e.\u0275cmp=d({type:e,selectors:[["cookbook-action-sheet-example"]],decls:2,vars:0,consts:[["kirby-button","",3,"click"]],template:function(t,a){t&1&&(n(0,"button",0),b("click",function(){return a.showActionSheet()}),s(1,"Show action sheet"),r())},dependencies:[C],encapsulation:2});let i=e;return i})();var pr={title:"Alert With Icon",message:"This message can have more than 1 line.",okBtn:"I agree",cancelBtn:"Take me back",icon:{name:"warning",themeColor:"warning"}},Ze=class Ze{static stringify(e){return JSON.stringify(e,null,"	").replace(/"(\w+)":/g,"$1:").replace(/"/g,"'")}constructor(e,l){this.modalController=e,this.toastController=l,this.alertClose$=new No}showAlert(){let e={title:"Default Alert",message:"The default alert is just a title, a message, an OK and (optional) cancel button",okBtn:"I agree",cancelBtn:"Take me back"};this.modalController.showAlert(e,this.onAlertClosed.bind(this))}showAlertWithIcon(){this.modalController.showAlert(pr,this.onAlertClosed.bind(this))}showAlertWithoutCancel(){let e={title:"Alert Without Cancel",message:"This is an alert that can only be acknowledged (no cancel option)",okBtn:"I understand"};this.modalController.showAlert(e,this.onAlertClosed.bind(this))}showDestructiveAlert(){let e={title:"Desctructive Alert",message:"This is to indicate that something destructive will happen when clicking the OK button",cancelBtn:"Get me out of here",okBtn:{text:"Confirm",isDestructive:!0}};this.modalController.showAlert(e,this.onAlertDestructiveClosed.bind(this))}showAlertWithNewline(){let e={title:"Alert with newline",message:`This is message one.

This is message two.`,okBtn:"I agree",cancelBtn:"Take me back"};this.modalController.showAlert(e,this.onAlertClosed.bind(this))}showAlertWithDynamicValues(){let t=ne=>6e4-ne*1e3,a=ne=>Math.ceil(ne/1e3),g=qo(0,1e3).pipe(go(t),Ko(this.alertClose$),Ro(ne=>ne>=0)),y=Ho("Need more time?"),F=g.pipe(go(ne=>`Time remaining: ${a(ne)}`)),be={title:y,icon:{name:"clock",themeColor:"warning"},message:F,okBtn:"Logout",cancelBtn:"Take me back"};this.modalController.showAlert(be,this.onAlertClosed.bind(this))}onAlertClosed(e){let l={message:`Alert selection: ${e}`,messageType:e?"success":"warning",durationInMs:1500};this.toastController.showToast(l),this.alertClose$.next()}onAlertDestructiveClosed(e){let l={message:e?"Message deleted":"Nothing happened",messageType:e?"warning":"success",durationInMs:1500};this.toastController.showToast(l)}};Ze.alertConfigWithIcon=`const config: AlertConfig = ${Ze.stringify(pr)}

this.modalController.showAlert(config);`,Ze.alertConfigWithDynamicValues=`const title$ = of('Need more time?');
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

this.modalController.showAlert(config);`,Ze.\u0275fac=function(l){return new(l||Ze)(x(ae),x($))},Ze.\u0275cmp=d({type:Ze,selectors:[["cookbook-alert-example"]],decls:12,vars:0,consts:[["kirby-button","",3,"click"],["kirby-button","",1,"destructive",3,"click"]],template:function(l,o){l&1&&(n(0,"button",0),b("click",function(){return o.showAlert()}),s(1,"Show alert"),r(),n(2,"button",0),b("click",function(){return o.showAlertWithIcon()}),s(3,"Show alert with icon"),r(),n(4,"button",0),b("click",function(){return o.showAlertWithoutCancel()}),s(5,"Show alert without cancel"),r(),n(6,"button",1),b("click",function(){return o.showDestructiveAlert()}),s(7,` Show destructive alert
`),r(),n(8,"button",0),b("click",function(){return o.showAlertWithNewline()}),s(9,"Show alert with newline"),r(),n(10,"button",0),b("click",function(){return o.showAlertWithDynamicValues()}),s(11,"Show alert with dynamic values"),r())},dependencies:[C],styles:["[_nghost-%COMP%]{display:block}"]});var ur=Ze;var dl={selector:"cookbook-avatar-example-default",template:`<kirby-avatar size="xs" text="A" title="xs"></kirby-avatar>
<kirby-avatar size="sm" text="A" title="sm"></kirby-avatar>
<kirby-avatar size="md" text="A" title="md"></kirby-avatar>
<kirby-avatar size="lg" text="A" title="lg"></kirby-avatar>`},ng=(()=>{let e=class e{constructor(){this.template=dl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-default"]],decls:4,vars:0,consts:[["size","xs","text","A","title","xs"],["size","sm","text","A","title","sm"],["size","md","text","A","title","md"],["size","lg","text","A","title","lg"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)(1,"kirby-avatar",1)(2,"kirby-avatar",2)(3,"kirby-avatar",3)},dependencies:[V],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var pl={selector:"cookbook-avatar-example-colors",template:`<kirby-avatar themeColor="light" title="light (default)">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="semi-light" title="semi-light">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="medium" title="medium">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="white" title="white">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="dark" title="dark">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="primary" title="primary">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="secondary" title="secondary">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="tertiary" title="tertiary">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="success" title="success">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="warning" title="warning">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="danger" title="danger">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>`},cg=(()=>{let e=class e{constructor(){this.template=pl.template,this.shouldWrap=!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-colors"]],hostVars:2,hostBindings:function(t,a){t&2&&G("wrap",a.shouldWrap)},decls:22,vars:0,consts:[["themeColor","light","title","light (default)"],["name","kirby"],["themeColor","semi-light","title","semi-light"],["themeColor","medium","title","medium"],["themeColor","white","title","white"],["themeColor","dark","title","dark"],["themeColor","primary","title","primary"],["themeColor","secondary","title","secondary"],["themeColor","tertiary","title","tertiary"],["themeColor","success","title","success"],["themeColor","warning","title","warning"],["themeColor","danger","title","danger"]],template:function(t,a){t&1&&(n(0,"kirby-avatar",0),p(1,"kirby-icon",1),r(),n(2,"kirby-avatar",2),p(3,"kirby-icon",1),r(),n(4,"kirby-avatar",3),p(5,"kirby-icon",1),r(),n(6,"kirby-avatar",4),p(7,"kirby-icon",1),r(),n(8,"kirby-avatar",5),p(9,"kirby-icon",1),r(),n(10,"kirby-avatar",6),p(11,"kirby-icon",1),r(),n(12,"kirby-avatar",7),p(13,"kirby-icon",1),r(),n(14,"kirby-avatar",8),p(15,"kirby-icon",1),r(),n(16,"kirby-avatar",9),p(17,"kirby-icon",1),r(),n(18,"kirby-avatar",10),p(19,"kirby-icon",1),r(),n(20,"kirby-avatar",11),p(21,"kirby-icon",1),r())},dependencies:[V,Q,M],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var ul={selector:"cookbook-avatar-example-text",template:`<kirby-avatar size="xs" text="T"></kirby-avatar>
<kirby-avatar size="sm" text="T"></kirby-avatar>
<kirby-avatar size="md" text="T"></kirby-avatar>
<kirby-avatar size="lg" text="T"></kirby-avatar>`},pg=(()=>{let e=class e{constructor(){this.template=ul.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-text"]],decls:4,vars:0,consts:[["size","xs","text","T"],["size","sm","text","T"],["size","md","text","T"],["size","lg","text","T"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)(1,"kirby-avatar",1)(2,"kirby-avatar",2)(3,"kirby-avatar",3)},dependencies:[V],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var bl={selector:"cookbook-avatar-example-icon",template:`<kirby-avatar size="xs">
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
</kirby-avatar>`},yg=(()=>{let e=class e{constructor(){this.template=bl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-icon"]],decls:8,vars:0,consts:[["size","xs"],["name","kirby"],["size","sm"],["size","md"],["size","lg"]],template:function(t,a){t&1&&(n(0,"kirby-avatar",0),p(1,"kirby-icon",1),r(),n(2,"kirby-avatar",2),p(3,"kirby-icon",1),r(),n(4,"kirby-avatar",3),p(5,"kirby-icon",1),r(),n(6,"kirby-avatar",4),p(7,"kirby-icon",1),r())},dependencies:[V,M],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var gl={selector:"cookbook-avatar-example-badge",template:`<kirby-avatar size="xs">
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
</kirby-avatar>`},xg=(()=>{let e=class e{constructor(){this.template=gl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-badge"]],decls:16,vars:0,consts:[["size","xs"],["name","kirby"],["name","attach"],["size","sm"],["size","md"],["size","lg"]],template:function(t,a){t&1&&(n(0,"kirby-avatar",0),p(1,"kirby-icon",1),n(2,"kirby-badge"),p(3,"kirby-icon",2),r()(),n(4,"kirby-avatar",3),p(5,"kirby-icon",1),n(6,"kirby-badge"),p(7,"kirby-icon",2),r()(),n(8,"kirby-avatar",4),p(9,"kirby-icon",1),n(10,"kirby-badge"),p(11,"kirby-icon",2),r()(),n(12,"kirby-avatar",5),p(13,"kirby-icon",1),n(14,"kirby-badge"),p(15,"kirby-icon",2),r()())},dependencies:[V,M,me],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}[_nghost-%COMP%]{padding:32px}']});let i=e;return i})();var yl={selector:"cookbook-avatar-example-image",template:`<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg"></kirby-avatar>

<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg" overlay="true" title="Overlay"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg" stroke="true" title="Stroke"></kirby-avatar>`},wg=(()=>{let e=class e{constructor(){this.template=yl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image"]],hostVars:2,hostBindings:function(t,a){t&2&&G("align-top",!0)},decls:3,vars:0,consts:[["imageSrc","/assets/images/woman.png","altText","Example","size","lg"],["imageSrc","/assets/images/woman.png","altText","Example","size","lg","overlay","true","title","Overlay"],["imageSrc","/assets/images/woman.png","altText","Example","size","lg","stroke","true","title","Stroke"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)(1,"kirby-avatar",1)(2,"kirby-avatar",2)},dependencies:[V],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var hl={selector:"cookbook-avatar-example-image-size",template:`<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="xs" title="xs"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="sm" title="sm"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="md" title="md"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg" title="lg"></kirby-avatar>`},Tg=(()=>{let e=class e{constructor(){this.template=hl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image-size"]],decls:4,vars:0,consts:[["imageSrc","/assets/images/woman.png","altText","Example","size","xs","title","xs"],["imageSrc","/assets/images/woman.png","altText","Example","size","sm","title","sm"],["imageSrc","/assets/images/woman.png","altText","Example","size","md","title","md"],["imageSrc","/assets/images/woman.png","altText","Example","size","lg","title","lg"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)(1,"kirby-avatar",1)(2,"kirby-avatar",2)(3,"kirby-avatar",3)},dependencies:[V],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var kl={selector:"cookbook-avatar-example-image-loazy-loading",template:'<kirby-avatar imageSrc="/assets/images/woman.png" imageLoading="lazy" size="lg"></kirby-avatar>'},Dg=(()=>{let e=class e{constructor(){this.template=kl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image-loazy-loading"]],decls:1,vars:0,consts:[["imageSrc","/assets/images/woman.png","imageLoading","lazy","size","lg"]],template:function(t,a){t&1&&p(0,"kirby-avatar",0)},dependencies:[V],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var br={selector:"cookbook-avatar-example-image-error",template:`<kirby-avatar
  [imageSrc]="avatarSrc"
  (imageError)="showFallbackImageOnError($event)"
  size="lg"
></kirby-avatar>`,ts:`avatarSrc: string = 'bad-image-url.png';

showFallbackImageOnError(event: ErrorEvent) {
  const fallbackImageSrc =
                'assets/images/avatar-not-found.png';
  this.avatarSrc = fallbackImageSrc;
  // Possibly do something with the ErrorEvent parameter...
}`},Fg=(()=>{let e=class e{constructor(){this.template=br.template,this.ts=br.ts,this.avatarSrc="bad-image-url.png"}showFallbackImageOnError(o){let t="assets/images/avatar-not-found.png";this.avatarSrc=t}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-avatar-example-image-error"]],decls:1,vars:1,consts:[["size","lg",3,"imageError","imageSrc"]],template:function(t,a){t&1&&(n(0,"kirby-avatar",0),b("imageError",function(y){return a.showFallbackImageOnError(y)}),r()),t&2&&m("imageSrc",a.avatarSrc)},dependencies:[V],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px}.wrap[_nghost-%COMP%]{flex-wrap:wrap}.wrap[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-avatar[_ngcontent-%COMP%]{position:relative}kirby-avatar[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-avatar[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-avatar[title][title=Overlay][_ngcontent-%COMP%]:before{content:"Overlay"}kirby-avatar[title][title=Shadow][_ngcontent-%COMP%]:before{content:"Shadow"}kirby-avatar[title][title=Stroke][_ngcontent-%COMP%]:before{content:"Stroke"}kirby-avatar[title][title="light (default)"][_ngcontent-%COMP%]:before{content:"(default)"}kirby-avatar[title][title=xs][_ngcontent-%COMP%]:before{content:"xs"}kirby-avatar[title][title=sm][_ngcontent-%COMP%]:before{content:"sm"}kirby-avatar[title][title=md][_ngcontent-%COMP%]:before{content:"md"}kirby-avatar[title][title=lg][_ngcontent-%COMP%]:before{content:"lg"}']});let i=e;return i})();var fl={selector:"cookbook-badge-example-number",template:`<kirby-badge>1</kirby-badge>
<kirby-badge themeColor="success">7</kirby-badge>
<kirby-badge themeColor="warning">99</kirby-badge>
<kirby-badge themeColor="danger">123</kirby-badge>`},zg=(()=>{let e=class e{constructor(){this.template=fl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-number"]],decls:8,vars:0,consts:[["themeColor","success"],["themeColor","warning"],["themeColor","danger"]],template:function(t,a){t&1&&(n(0,"kirby-badge"),s(1,"1"),r(),n(2,"kirby-badge",0),s(3,"7"),r(),n(4,"kirby-badge",1),s(5,"99"),r(),n(6,"kirby-badge",2),s(7,"123"),r())},dependencies:[me],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:16px}"]});let i=e;return i})();var Cl={selector:"cookbook-badge-example-text",template:`<kirby-badge>Default</kirby-badge>
<kirby-badge themeColor="success">Success</kirby-badge>
<kirby-badge themeColor="warning">Warning</kirby-badge>
<kirby-badge themeColor="danger">Danger</kirby-badge>
`},Ng=(()=>{let e=class e{constructor(){this.template=Cl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-text"]],decls:8,vars:0,consts:[["themeColor","success"],["themeColor","warning"],["themeColor","danger"]],template:function(t,a){t&1&&(n(0,"kirby-badge"),s(1,"Default"),r(),n(2,"kirby-badge",0),s(3,"Success"),r(),n(4,"kirby-badge",1),s(5,"Warning"),r(),n(6,"kirby-badge",2),s(7,"Danger"),r())},dependencies:[me],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:16px}"]});let i=e;return i})();var xl={selector:"cookbook-badge-example-icon",template:`<kirby-badge>
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
</kirby-badge>`},Rg=(()=>{let e=class e{constructor(){this.template=xl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-icon"]],decls:8,vars:0,consts:[["name","attach"],["themeColor","success"],["themeColor","warning"],["themeColor","danger"]],template:function(t,a){t&1&&(n(0,"kirby-badge"),p(1,"kirby-icon",0),r(),n(2,"kirby-badge",1),p(3,"kirby-icon",0),r(),n(4,"kirby-badge",2),p(5,"kirby-icon",0),r(),n(6,"kirby-badge",3),p(7,"kirby-icon",0),r())},dependencies:[me,M],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:16px}"]});let i=e;return i})();var vl={selector:"cookbook-badge-example-small",template:`<kirby-badge size="sm">
</kirby-badge>

<kirby-badge themeColor="success" size ="sm">
</kirby-badge>

<kirby-badge themeColor="warning" size="sm">
</kirby-badge>

<kirby-badge themeColor="danger" size="sm">
</kirby-badge>`},Gg=(()=>{let e=class e{constructor(){this.template=vl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-badge-example-small"]],decls:4,vars:0,consts:[["size","sm"],["themeColor","success","size","sm"],["themeColor","warning","size","sm"],["themeColor","danger","size","sm"]],template:function(t,a){t&1&&p(0,"kirby-badge",0)(1,"kirby-badge",1)(2,"kirby-badge",2)(3,"kirby-badge",3)},dependencies:[me],styles:["[_nghost-%COMP%]   kirby-badge[_ngcontent-%COMP%] + kirby-badge[_ngcontent-%COMP%]{margin-left:16px}"]});let i=e;return i})();var _l={selector:"cookbook-button-example-default",template:"<button kirby-button>Default Button</button>"},Yg=(()=>{let e=class e{constructor(){this.template=_l.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-default"]],decls:2,vars:0,consts:[["kirby-button",""]],template:function(t,a){t&1&&(n(0,"button",0),s(1,"Default Button"),r())},dependencies:[C],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var wl={selector:"cookbook-button-example-attention-level",template:`<kirby-card [hasPadding]="true" [themeColor]="cardThemeColor" [variant]="cardVariant">
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
</fieldset>`},ty=(()=>{let e=class e{constructor(){this.template=wl.template.split("<fieldset")[0],this.themeColors=[{text:"Card color: light",value:"light"},{text:"Card color: white",value:"white"},{text:"Card color: dark",value:"dark"}],this.cardThemeColor=this.themeColors[0].value}get cardVariant(){return this.cardThemeColor==="light"?"outlined":"elevated"}onThemeColorChange(o){this.cardThemeColor=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-attention-level"]],inputs:{cardThemeColor:"cardThemeColor"},decls:11,vars:5,consts:[[3,"hasPadding","themeColor","variant"],["kirby-button","","attentionLevel","1","expand","block"],["kirby-button","","attentionLevel","2","expand","block"],["kirby-button","","attentionLevel","3","expand","block"],["size","sm",3,"change","items","selectedIndex"]],template:function(t,a){t&1&&(n(0,"kirby-card",0)(1,"button",1),s(2," Attention Level 1 "),r(),n(3,"button",2),s(4," Attention Level 2 "),r(),n(5,"button",3),s(6," Attention Level 3 "),r()(),n(7,"fieldset")(8,"legend"),s(9,"Configuration"),r(),n(10,"kirby-dropdown",4),b("change",function(y){return a.onThemeColorChange(y.value)}),r()()),t&2&&(m("hasPadding",!0)("themeColor",a.cardThemeColor)("variant",a.cardVariant),c(10),m("items",a.themeColors)("selectedIndex",0))},dependencies:[T,Q,C,J],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]{display:flex;gap:24px}kirby-card[_ngcontent-%COMP%]{max-width:320px}kirby-card[_ngcontent-%COMP%]:not(.outlined){border:1px solid transparent}fieldset[_ngcontent-%COMP%]{align-self:flex-start}"]});let i=e;return i})();var Sl={selector:"cookbook-button-example-sizes",template:`<button kirby-button size="xs">Extra Small Button</button>
<button kirby-button size="sm">Small Button</button>
<button kirby-button>Medium Button</button>
<button kirby-button size="lg">Large Button</button>`},ny=(()=>{let e=class e{constructor(){this.template=Sl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-sizes"]],decls:8,vars:0,consts:[["kirby-button","","size","xs"],["kirby-button","","size","sm"],["kirby-button",""],["kirby-button","","size","lg"]],template:function(t,a){t&1&&(n(0,"button",0),s(1,"Extra Small Button"),r(),n(2,"button",1),s(3,"Small Button"),r(),n(4,"button",2),s(5,"Medium Button"),r(),n(6,"button",3),s(7,"Large Button"),r())},dependencies:[C],styles:["[_nghost-%COMP%]{display:inline-flex;flex-direction:column;align-items:center;gap:16px}@media(min-width:768px){[_nghost-%COMP%]{flex-direction:row}}"]});let i=e;return i})();var Ml={selector:"cookbook-button-example-block",template:'<button kirby-button expand="block">Block Button</button>'},ly=(()=>{let e=class e{constructor(){this.template=Ml.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-block"]],decls:2,vars:0,consts:[["kirby-button","","expand","block"]],template:function(t,a){t&1&&(n(0,"button",0),s(1,"Block Button"),r())},dependencies:[C],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var Tl={selector:"cookbook-button-example-icons",template:`<button kirby-button size="xs">
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
</button>`},dy=(()=>{let e=class e{constructor(){this.template=Tl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-icons"]],decls:24,vars:0,consts:[["kirby-button","","size","xs"],["name","edit"],["kirby-button","","size","sm"],["kirby-button",""],["kirby-button","","size","lg"],["name","arrow-down"]],template:function(t,a){t&1&&(n(0,"button",0),p(1,"kirby-icon",1),s(2,` Icon left
`),r(),n(3,"button",2),p(4,"kirby-icon",1),s(5,` Icon left
`),r(),n(6,"button",3),p(7,"kirby-icon",1),s(8,` Icon left
`),r(),n(9,"button",4),p(10,"kirby-icon",1),s(11,` Icon left
`),r(),n(12,"button",0),s(13," Icon right "),p(14,"kirby-icon",5),r(),n(15,"button",2),s(16," Icon right "),p(17,"kirby-icon",5),r(),n(18,"button",3),s(19," Icon right "),p(20,"kirby-icon",5),r(),n(21,"button",4),s(22," Icon right "),p(23,"kirby-icon",5),r())},dependencies:[C,M],styles:["[_nghost-%COMP%]{display:inline-grid;grid-template-columns:repeat(4,auto);place-items:center center;gap:16px}@media(max-width:767px){[_nghost-%COMP%]{display:inline-flex;flex-direction:column;align-items:center}}"]});let i=e;return i})();var El={selector:"cookbook-button-example-icon-only",template:`<button kirby-button size="xs" aria-label="Close">
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
</button>`},gy=(()=>{let e=class e{constructor(){this.template=El.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-icon-only"]],decls:28,vars:4,consts:[["kirby-button","","size","xs","aria-label","Close"],["name","close"],["kirby-button","","size","sm","aria-label","Close"],["kirby-button","","aria-label","Close"],["kirby-button","","size","lg","aria-label","Close"],["kirby-button","","size","xs","attentionLevel","2",3,"showIconOnly"],["name","search"],["kirby-button","","size","sm","attentionLevel","2",3,"showIconOnly"],["kirby-button","","attentionLevel","2",3,"showIconOnly"],["kirby-button","","size","lg","attentionLevel","2",3,"showIconOnly"],["kirby-button","","size","xs","attentionLevel","3","aria-label","More settings"],["name","more"],["kirby-button","","size","sm","attentionLevel","3","aria-label","More settings"],["kirby-button","","attentionLevel","3","aria-label","More settings"],["kirby-button","","size","lg","attentionLevel","3","aria-label","More settings"]],template:function(t,a){t&1&&(n(0,"button",0),p(1,"kirby-icon",1),r(),n(2,"button",2),p(3,"kirby-icon",1),r(),n(4,"button",3),p(5,"kirby-icon",1),r(),n(6,"button",4),p(7,"kirby-icon",1),r(),n(8,"button",5),s(9," Search "),p(10,"kirby-icon",6),r(),n(11,"button",7),s(12," Search "),p(13,"kirby-icon",6),r(),n(14,"button",8),p(15,"kirby-icon",6),s(16,` Search
`),r(),n(17,"button",9),p(18,"kirby-icon",6),s(19,` Search
`),r(),n(20,"button",10),p(21,"kirby-icon",11),r(),n(22,"button",12),p(23,"kirby-icon",11),r(),n(24,"button",13),p(25,"kirby-icon",11),r(),n(26,"button",14),p(27,"kirby-icon",11),r()),t&2&&(c(8),m("showIconOnly",!0),c(3),m("showIconOnly",!0),c(3),m("showIconOnly",!0),c(3),m("showIconOnly",!0))},dependencies:[C,M],styles:["[_nghost-%COMP%]{display:inline-grid;grid-template-columns:repeat(4,auto);place-items:center center;gap:16px}"]});let i=e;return i})();var Pl={selector:"cookbook-button-example-undecorated",template:`<button kirby-button [noDecoration]="true" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>`},fy=(()=>{let e=class e{constructor(){this.template=Pl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-undecorated"]],decls:2,vars:1,consts:[["kirby-button","","aria-label","Close",3,"noDecoration"],["name","close"]],template:function(t,a){t&1&&(n(0,"button",0),p(1,"kirby-icon",1),r()),t&2&&m("noDecoration",!0)},dependencies:[C,M],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var Dl={selector:"cookbook-button-example-disabled",template:`<button kirby-button disabled>
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
</button>`},_y=(()=>{let e=class e{constructor(){this.template=Dl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-disabled"]],decls:9,vars:1,consts:[["kirby-button","","disabled",""],["name","edit"],["kirby-button","","disabled","","aria-label","Close"],["name","close"],["kirby-button","","disabled","","aria-label","Close",3,"noDecoration"]],template:function(t,a){t&1&&(n(0,"button",0),s(1,` Disabled
`),r(),n(2,"button",0),p(3,"kirby-icon",1),s(4,` Disabled with icon
`),r(),n(5,"button",2),p(6,"kirby-icon",3),r(),n(7,"button",4),p(8,"kirby-icon",3),r()),t&2&&(c(7),m("noDecoration",!0))},dependencies:[C,M],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var Ol={selector:"cookbook-button-example-aria-disabled",template:`<button kirby-button aria-disabled="true">Aria Disabled</button>
<a kirby-button aria-disabled="true" href="/">Aria Disabled Link</a>`},My=(()=>{let e=class e{constructor(){this.template=Ol.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-aria-disabled"]],decls:4,vars:0,consts:[["kirby-button","","aria-disabled","true"],["kirby-button","","aria-disabled","true","href","/"]],template:function(t,a){t&1&&(n(0,"button",0),s(1,"Aria Disabled"),r(),n(2,"a",1),s(3,"Aria Disabled Link"),r())},dependencies:[C],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var Il={selector:"cookbook-button-example-link",template:`<a kirby-button href="/">Link</a>
<a kirby-button href="/" target="_blank">Link (new tab/window)</a>`},Py=(()=>{let e=class e{constructor(){this.template=Il.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-link"]],decls:4,vars:0,consts:[["kirby-button","","href","/"],["kirby-button","","href","/","target","_blank"]],template:function(t,a){t&1&&(n(0,"a",0),s(1,"Link"),r(),n(2,"a",1),s(3,"Link (new tab/window)"),r())},dependencies:[C],styles:["[_nghost-%COMP%]{display:inline-grid;grid-template-columns:repeat(4,auto);place-items:center center;gap:16px}"]});let i=e;return i})();var Fl={selector:"cookbook-button-example-button-link",template:'This is a <button class="kirby-button-link">button styled as a link</button>.'},Oy=(()=>{let e=class e{constructor(){this.template=Fl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-button-example-button-link"]],decls:4,vars:0,consts:[[1,"kirby-button-link"]],template:function(t,a){t&1&&(s(0,"This is a "),pe(1,"button",0),s(2,"button styled as a link"),le(),s(3,"."))},encapsulation:2});let i=e;return i})();var gr={template:`<kirby-card>
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
  `},Ny=(()=>{let e=class e{constructor(){this.template=gr.template,this.codeSnippet=gr.codeSnippet,this.disableWeekends=!1,this.disablePastDates=!1,this.disableFutureDates=!1,this.setDisabledDates=!1,this.setEnabledDates=!1,this.setMinDate=!1,this.setMaxDate=!1,this.setTodayDate=!1,this.useTimezoneUTC=!1,this.showYearNavigator=!1,this.yearNavigatorOptions={from:-6,to:3},this.timeZoneName=Intl.DateTimeFormat().resolvedOptions().timeZone,this.updateInputDates()}ngOnChanges(o){o.useTimezoneUTC&&(this.updateInputDates(),this.selectedDate&&(this.useTimezoneUTC?this.selectedDate=Cn(this.subtractTimezoneOffset(this.selectedDate),this.timeZoneName):this.selectedDate=fn(this.selectedDate,this.timeZoneName)))}onDateChange(o){this.selectedDate=o}selectNextMonth(){let o=new Date,t=new Date(o.getFullYear(),o.getMonth()+1,1);this.selectedDate=t}selectToday(){this.selectedDate=new Date}deselectDate(){this.selectedDate=null}updateInputDates(){let o=kn(new Date);this.minDate=$n(o,60),this.maxDate=Mt(o,60),this.todayDate=Mt(o,3),this.disabledDates=[3,5,7,10,15,25,28,35].map(t=>Mt(o,t)),this.enabledDates=[3,5,7,10,15,25,28,35].map(t=>Mt(o,t))}subtractTimezoneOffset(o){return new Date(o.getTime()-o.getTimezoneOffset()*60*1e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-calendar-card-example"]],inputs:{disableWeekends:"disableWeekends",disablePastDates:"disablePastDates",disableFutureDates:"disableFutureDates",setDisabledDates:"setDisabledDates",setEnabledDates:"setEnabledDates",setMinDate:"setMinDate",setMaxDate:"setMaxDate",setTodayDate:"setTodayDate",useTimezoneUTC:"useTimezoneUTC",showYearNavigator:"showYearNavigator"},features:[Wo],decls:14,vars:17,consts:[[3,"dateChange","timezone","disableWeekends","disablePastDates","disableFutureDates","disabledDates","enabledDates","minDate","maxDate","todayDate","selectedDate"],["variant","outlined",3,"hasPadding"],[3,"hasPadding"],[1,"buttons"],["kirby-button","","attentionLevel","3","size","sm",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-card")(1,"kirby-calendar",0),b("dateChange",function(y){return a.onDateChange(y)}),r()(),n(2,"kirby-card",1)(3,"kirby-card-header",2)(4,"p"),s(5),X(6,"date"),r()(),n(7,"div",3)(8,"button",4),b("click",function(){return a.selectNextMonth()}),s(9," Next month "),r(),n(10,"button",4),b("click",function(){return a.selectToday()}),s(11,"Now"),r(),n(12,"button",4),b("click",function(){return a.deselectDate()}),s(13,"Deselect"),r()()()),t&2&&(c(),m("timezone",a.useTimezoneUTC?"UTC":"local")("disableWeekends",a.disableWeekends)("disablePastDates",a.disablePastDates)("disableFutureDates",a.disableFutureDates)("disabledDates",a.setDisabledDates?a.disabledDates:null)("enabledDates",a.setEnabledDates?a.enabledDates:null)("minDate",a.setMinDate?a.minDate:null)("maxDate",a.setMaxDate?a.maxDate:null)("todayDate",a.setTodayDate?a.todayDate:null)("selectedDate",a.selectedDate),c(),m("hasPadding",!0),c(),m("hasPadding",!1),c(2),S(" Selected Date: ",a.selectedDate?on(6,13,a.selectedDate,"MMM d, y z",a.useTimezoneUTC?"UTC":void 0):"none"," "))},dependencies:[Le,T,ce,Zt,C,rn],styles:["[_nghost-%COMP%]{display:block;max-width:320px;margin:0 auto}kirby-card[_ngcontent-%COMP%]:has(.buttons){margin-top:8px}kirby-card[_ngcontent-%COMP%]:has(.buttons)   .buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-around}kirby-card[_ngcontent-%COMP%]:has(.buttons)   p[_ngcontent-%COMP%]{margin:12px 0 0}"]});let i=e;return i})();var Al=["*"];function Ll(i,e){i&1&&p(0,"kirby-icon",3)}function zl(i,e){i&1&&p(0,"kirby-icon",4)}function Bl(i,e){if(i&1){let l=P();n(0,"button",2),b("click",function(){v(l);let t=h();return _(t.toggleConfig())}),s(1," Configure "),O(2,Ll,1,0,"kirby-icon",3),O(3,zl,1,0,"kirby-icon",4),r()}if(i&2){let l=h();c(2),I(l.showConfig?-1:2),c(),I(l.showConfig?3:-1)}}function $l(i,e){i&1&&je(0)}function Nl(i,e){if(i&1&&(n(0,"kirby-card"),w(1,$l,1,0,"ng-container",5),r()),i&2){h();let l=ee(4);c(),m("ngTemplateOutlet",l)}}function Hl(i,e){i&1&&je(0)}function ql(i,e){if(i&1&&w(0,Hl,1,0,"ng-container",5),i&2){h();let l=ee(4);m("ngTemplateOutlet",l)}}function Kl(i,e){if(i&1&&(n(0,"fieldset")(1,"legend"),s(2),r(),xi(3),r()),i&2){let l=h();c(2),k(l.title)}}var Ce=(()=>{let e=class e{constructor(){this.configAppearance="block",this.title="Configuration",this.showConfig=!1,this.align="end"}get _cssClass(){return["align-"+this.align,this.configAppearance].filter(Boolean)}toggleConfig(){this.showConfig=!this.showConfig}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-example-configuration-wrapper"]],hostVars:4,hostBindings:function(t,a){t&2&&(Zo(a._cssClass),G("show-config",a.showConfig))},inputs:{configAppearance:"configAppearance",title:"title",align:"align"},ngContentSelectors:Al,decls:5,vars:2,consts:[["fieldset",""],["kirby-button","","attentionLevel","3"],["kirby-button","","attentionLevel","3",3,"click"],["name","menu-outline"],["name","menu"],[4,"ngTemplateOutlet"]],template:function(t,a){t&1&&(Ci(),O(0,Bl,4,2,"button",1),O(1,Nl,2,1,"kirby-card")(2,ql,1,1,"ng-container"),w(3,Kl,4,1,"ng-template",null,0,St)),t&2&&(I(a.configAppearance==="toggle"?0:-1),c(),I(a.configAppearance!=="block"?1:2))},dependencies:[ln,Gt,C,T,M],styles:['[_nghost-%COMP%]{display:block}.toggle[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;position:absolute;right:16px;top:calc(16px + var(--ion-safe-area-top))}.toggle.align-end[_nghost-%COMP%]{align-items:flex-end}.toggle.align-end[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{rotate:-45deg;transform-origin:top right}.toggle[_nghost-%COMP%]   button[_ngcontent-%COMP%]{z-index:3}.toggle[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{opacity:0;visibility:hidden;rotate:45deg;transition-property:opacity,rotate,scale;transition-duration:.2s;transition-timing-function:ease;transform-origin:top left;scale:.5}.toggle.show-config[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{opacity:1;visibility:visible;rotate:0deg;scale:1}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{position:fixed;margin-top:16px;opacity:.5;transform:rotate(-90deg) translateY(-28px);transform-origin:top right;overflow:initial}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:-20px}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:hover, .snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:active, .snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:focus-within{opacity:unset;transform:none;border-top-right-radius:0;border-bottom-right-radius:0;--kirby-border-color: initial}.snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:hover, .snap-to-viewport[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]:active{transition-duration:.3s;transition-property:transform,border-radius;transition-timing-function:ease}.ion-page[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%], .ion-page   [_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{top:var(--header-height, 0)}.ion-page.drawer[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%], .ion-page.drawer   [_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{top:0}@media(min-width:768px){.ion-page.drawer[_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%], .ion-page.drawer   [_nghost-%COMP%]   kirby-card[_ngcontent-%COMP%]{top:var(--header-height, 0)}}fieldset[_ngcontent-%COMP%]{border:1px solid var(--kirby-border-color, var(--kirby-medium));padding:12px}fieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]{color:var(--kirby-text-color-semi-dark);text-align:var(--text-align, initial);font-size:14px}kirby-card[_ngcontent-%COMP%]{z-index:2;font-size:12px;padding:8px;top:0;right:0}']});let i=e;return i})();var Rl={template:`<kirby-card>
  <kirby-calendar [yearNavigatorOptions]="yearNavigatorOptions" [usePopover]="true"></kirby-calendar>
</kirby-card>`},Yy=(()=>{let e=class e{constructor(){this.template=Rl.template,this.yearNavigatorOptions={from:-6,to:3}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-calendar-year-navigator-example"]],decls:2,vars:2,consts:[[3,"yearNavigatorOptions","usePopover"]],template:function(t,a){t&1&&(n(0,"kirby-card"),p(1,"kirby-calendar",0),r()),t&2&&(c(),m("yearNavigatorOptions",a.yearNavigatorOptions)("usePopover",!0))},dependencies:[T,Zt],styles:["[_nghost-%COMP%]{display:block;max-width:320px;margin:0 auto}"]});let i=e;return i})();var Vl={selector:"cookbook-calendar-no-background-example",template:"<kirby-calendar></kirby-calendar>"},Zy=(()=>{let e=class e{constructor(){this.template=Vl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-calendar-no-background-example"]],decls:1,vars:0,template:function(t,a){t&1&&p(0,"kirby-calendar")},dependencies:[Zt],styles:["[_nghost-%COMP%]{display:block;max-width:320px;margin:0 auto}"]});let i=e;return i})();var Wl={selector:"cookbook-card-example-variant",template:`
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
  `},th=(()=>{let e=class e{constructor(){this.template=Wl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-variant"]],decls:16,vars:1,consts:[[1,"variant-card-container"],["hasPadding","true"],["hasPadding","true","variant","flat"],["variant","outlined",3,"hasPadding"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"kirby-card",1)(2,"strong"),s(3,"Elevated (default)"),r(),n(4,"p"),s(5,"The card is slightly elevated from the background with a drop shadow."),r()(),n(6,"kirby-card",2)(7,"strong"),s(8,"Flat"),r(),n(9,"p"),s(10,"Has no shadow and appears lower in the visual hierarchy."),r()(),n(11,"kirby-card",3)(12,"strong"),s(13,"Outlined card"),r(),n(14,"p"),s(15,"Has a border and no background. Appear lowest in the visual hierarchy."),r()()()),t&2&&(c(11),m("hasPadding",!0))},dependencies:[Le,T],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.medium[_ngcontent-%COMP%]{background-color:var(--kirby-medium)}button.medium[_ngcontent-%COMP%]:hover{background-color:var(--kirby-medium-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}[_nghost-%COMP%]{container-type:inline-size;display:block}.variant-card-container[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-wrap:wrap;gap:16px}.variant-card-container[_ngcontent-%COMP%]   kirby-card[_ngcontent-%COMP%]{max-width:50%;min-width:250px;flex:1}@container (width < 516px){.variant-card-container[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.variant-card-container[_ngcontent-%COMP%]   kirby-card[_ngcontent-%COMP%]{max-width:initial}}"]});let i=e;return i})();var yr={selector:"cookbook-card-example-disclosure",template:`<kirby-card [hasPadding]="true" (click)="noop()">
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
}`},lh=(()=>{let e=class e{constructor(){this.template=yr.template,this.style=yr.style,this.noop=ki}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-disclosure"]],decls:17,vars:3,consts:[[3,"click","hasPadding"],[3,"hasPadding"],[3,"disclosure"],[1,"kirby-text-normal-bold"],[1,"kirby-text-large"],["themeColor","danger",2,"float","right"],["themeColor","success",2,"float","right"]],template:function(t,a){t&1&&(n(0,"kirby-card",0),b("click",function(){return a.noop()}),n(1,"kirby-card-header",1)(2,"kirby-item",2)(3,"p",3),s(4,"Item disclosure in header"),r()()(),n(5,"p",4),s(6,"A card with state and disclosure"),r(),n(7,"p"),s(8," Note how this card can be focussed with tab keyboard navigation and enter or space triggers the click function. "),r(),n(9,"p"),s(10," You are free to slot any content inside. "),n(11,"kirby-flag",5),s(12," Danger "),r()(),n(13,"p"),s(14," Could be a couple of flags! "),n(15,"kirby-flag",6),s(16," Success "),r()()()),t&2&&(m("hasPadding",!0),c(),m("hasPadding",!1),c(),m("disclosure","arrow-more"))},dependencies:[Le,T,ce,Fi,f,Be],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.medium[_ngcontent-%COMP%]{background-color:var(--kirby-medium)}button.medium[_ngcontent-%COMP%]:hover{background-color:var(--kirby-medium-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}","kirby-card[_ngcontent-%COMP%]{--kirby-card-padding-top: 0px}"]});let i=e;return i})();var hr={selector:"cookbook-card-example-flag",codeSnippet:`<kirby-card hasPadding="true">
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
</div>`},dh=(()=>{let e=class e{constructor(){this.template=hr.template,this.codeSnippet=hr.codeSnippet,this.flagLevel="success"}setFlagLevel(o){this.flagLevel=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-flag"]],decls:28,vars:2,consts:[["hasPadding","true"],[3,"title","flagged"],[1,"card-option-button-group"],[1,"success",3,"click"],["name","flag"],[1,"warning",3,"click"],[1,"danger",3,"click"],[1,"info",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-card",0),p(1,"kirby-card-header",1),n(2,"strong"),s(3,"A flagged card"),r(),n(4,"p"),s(5,"This is a card that uses a "),n(6,"em"),s(7,"kirby-card-header"),r(),s(8," with the "),n(9,"code"),s(10,"flagged"),r(),s(11," input set."),r(),n(12,"p"),s(13,"Possible values for the flagged header are: "),p(14,"br"),n(15,"code"),s(16,"'success' | 'warning' | 'danger' | 'info'"),r()(),n(17,"p"),s(18,"Use the buttons below to see the different options \u{1F447}"),r()(),n(19,"div",2)(20,"button",3),b("click",function(){return a.setFlagLevel("success")}),p(21,"kirby-icon",4),r(),n(22,"button",5),b("click",function(){return a.setFlagLevel("warning")}),p(23,"kirby-icon",4),r(),n(24,"button",6),b("click",function(){return a.setFlagLevel("danger")}),p(25,"kirby-icon",4),r(),n(26,"button",7),b("click",function(){return a.setFlagLevel("info")}),p(27,"kirby-icon",4),r()()),t&2&&(c(),m("title","Flagged card header")("flagged",a.flagLevel))},dependencies:[Le,T,ce,M],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.medium[_ngcontent-%COMP%]{background-color:var(--kirby-medium)}button.medium[_ngcontent-%COMP%]:hover{background-color:var(--kirby-medium-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var kr={selector:"cookbook-card-example-color",codeSnippet:`<kirby-card hasPadding="true" [themeColor]="color">
  <strong>A themed card</strong>
  <p>This cards color is defined by the <code>themeColor</code> input property.</p>
  <p>Recommended values for themeColor are: <br> <code>'secondary' | 'tertiary' | 'medium' | 'dark'</code></p>
  <p>Use the buttons below to see the different options \u{1F447}</p>
</kirby-card>`,template:`<kirby-card hasPadding="true" [themeColor]="color">
    <strong>A themed card</strong>
    <p>This cards color is defined by the <code>themeColor</code> input property.</p>
    <p>Recommended values for themeColor are: <br> <code>'secondary' | 'tertiary' | 'medium' | 'dark'</code></p>
    <p>Use the buttons below to see the different options \u{1F447}</p>
</kirby-card>

<div class="card-option-button-group">
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('tertiary')" class="tertiary"></button>
    <button (click)="setThemeColor('medium')" class="medium"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>`},bh=(()=>{let e=class e{constructor(){this.template=kr.template,this.codeSnippet=kr.codeSnippet,this.color="secondary"}setThemeColor(o){this.color=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-color"]],decls:20,vars:1,consts:[["hasPadding","true",3,"themeColor"],[1,"card-option-button-group"],[1,"secondary",3,"click"],[1,"tertiary",3,"click"],[1,"medium",3,"click"],[1,"dark",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-card",0)(1,"strong"),s(2,"A themed card"),r(),n(3,"p"),s(4,"This cards color is defined by the "),n(5,"code"),s(6,"themeColor"),r(),s(7," input property."),r(),n(8,"p"),s(9,"Recommended values for themeColor are: "),p(10,"br"),n(11,"code"),s(12,"'secondary' | 'tertiary' | 'medium' | 'dark'"),r()(),n(13,"p"),s(14,"Use the buttons below to see the different options \u{1F447}"),r()(),n(15,"div",1)(16,"button",2),b("click",function(){return a.setThemeColor("secondary")}),r(),n(17,"button",3),b("click",function(){return a.setThemeColor("tertiary")}),r(),n(18,"button",4),b("click",function(){return a.setThemeColor("medium")}),r(),n(19,"button",5),b("click",function(){return a.setThemeColor("dark")}),r()()),t&2&&m("themeColor",a.color)},dependencies:[Le,T,Q],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.medium[_ngcontent-%COMP%]{background-color:var(--kirby-medium)}button.medium[_ngcontent-%COMP%]:hover{background-color:var(--kirby-medium-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var fr={selector:"cookbook-card-example-background-image",template:`<kirby-card [hasPadding]="true" themeColor="dark" (click)="noop()">
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
}`},kh=(()=>{let e=class e{constructor(){this.template=fr.template,this.style=fr.style,this.noop=ki}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-card-example-background-image"]],decls:7,vars:1,consts:[["themeColor","dark",3,"click","hasPadding"]],template:function(t,a){t&1&&(n(0,"kirby-card",0),b("click",function(){return a.noop()}),n(1,"strong"),s(2,"A card with background image"),r(),n(3,"p"),s(4," Try resizing the viewport to see the media queries in action! "),r(),n(5,"p"),s(6," Using the CSS Custom Property, we can quite easily add a gradient on top of any image to enhance readability. With the input property, a similar look will have to be implemented by editing the image instead. "),r()()),t&2&&m("hasPadding",!0)},dependencies:[Le,T,Fi,Q],styles:["[_nghost-%COMP%]{display:grid;place-content:center}kirby-card[_ngcontent-%COMP%]{max-width:500px}kirby-flag[_ngcontent-%COMP%]{float:inline-end}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}.kirby-color-brightness-dark[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:var(--kirby-dark);color:var(--kirby-dark-contrast)}p[_ngcontent-%COMP%]:last-child{margin-bottom:0}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-green-30)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-green-50)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-orange-30)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-orange-50)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-decoration-color-red-30)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-decoration-color-red-50)}button.info[_ngcontent-%COMP%]{background-color:var(--kirby-semi-light)}button.info[_ngcontent-%COMP%]:hover{background-color:var(--kirby-semi-light-shade)}button.medium[_ngcontent-%COMP%]{background-color:var(--kirby-medium)}button.medium[_ngcontent-%COMP%]:hover{background-color:var(--kirby-medium-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}","kirby-card[_ngcontent-%COMP%]{--kirby-card-background-image: linear-gradient( 0deg, rgb(255 255 255 / 0%) 0%, rgb(0 0 0 / 50%) 100% ), url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750)}@media(min-width:992px){kirby-card[_ngcontent-%COMP%]{--kirby-card-background-image: linear-gradient( 0deg, rgb(255 255 255 / 0%) 0%, rgb(0 0 0 / 50%) 100% ), url(https://images.unsplash.com/photo-1560840067-ddcaeb7831d2)}}"]});let i=e;return i})();var Ul=()=>[50,200,83,102],jl={selector:"cookbook-chart-example-simple-column",template:'<kirby-chart [data]="[50, 200, 83, 102]"></kirby-chart>'},xh=(()=>{let e=class e{constructor(){this.template=jl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-simple-column"]],decls:1,vars:2,consts:[[3,"data"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(1,Ul))},dependencies:[ye],encapsulation:2});let i=e;return i})();var Cr={selector:"cookbook-chart-example-column",template:'<kirby-chart type="column" [data]="data" [labels]="labels"></kirby-chart>',codeSnippet:`data=[7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];

labels=['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  `},wh=(()=>{let e=class e{constructor(){this.template=Cr.template,this.codeSnippet=Cr.codeSnippet,this.data=[7,12,5,9,3,11,6,2,1,10,4,12],this.labels=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-column"]],decls:1,vars:2,consts:[["type","column",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a.data)("labels",a.labels)},dependencies:[ye],encapsulation:2});let i=e;return i})();var Yl=()=>[7,12,5,9,3],Ql=()=>["2021","2020","2019","2018","2017"],Jl={selector:"cookbook-chart-example-bar",template:`<kirby-chart type="bar" [data]="[7, 12, 5, 9, 3]" [labels]="['2021', '2020', '2019', '2018', '2017']"></kirby-chart>`},Th=(()=>{let e=class e{constructor(){this.template=Jl.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-bar"]],decls:1,vars:4,consts:[["type","bar",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(2,Yl))("labels",D(3,Ql))},dependencies:[ye],encapsulation:2});let i=e;return i})();var Zl=()=>[6,6.37,6.46,6.64,6.78,7.44,7.92,8.18,8.41,8.85,9.33],Xl=()=>["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960"],es={selector:"cookbook-chart-example-line",template:`
  <kirby-chart 
  type="line" 
  [data]="[6, 6.37, 6.46, 6.64, 6.78, 7.44, 7.92, 8.18, 8.41, 8.85, 9.33]" 
  [labels]='["1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960"]' 
  ></kirby-chart>`},Dh=(()=>{let e=class e{constructor(){this.template=es.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-line"]],decls:1,vars:4,consts:[["type","line",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(2,Zl))("labels",D(3,Xl))},dependencies:[ye],encapsulation:2});let i=e;return i})();var ts=()=>[7,12,5,9,3],xr={selector:"cookbook-chart-example-interaction",template:`<p>{{_text}}</p>
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
  `},Fh=(()=>{let e=class e{constructor(){this.template=xr.template,this.codeSnippet=xr.codeSnippet,this._text="Nothing has been clicked",this._labels=["Monday","Tuesday","Wednesday","Thursday","Friday"],this._customOptions={onClick:(o,t)=>{let a=t[0];if(a){this._highlighted=[[a.datasetIndex,a.index]];let g=this._labels[a.index];this._text=`${g} was clicked`}else this._text="The background was clicked",this._highlighted=[]}}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-interaction"]],decls:3,vars:6,consts:[["type","column",3,"data","labels","customOptions","highlightedElements"]],template:function(t,a){t&1&&(n(0,"p"),s(1),r(),p(2,"kirby-chart",0)),t&2&&(c(),k(a._text),c(),m("data",D(5,ts))("labels",a._labels)("customOptions",a._customOptions)("highlightedElements",a._highlighted))},dependencies:[ye],encapsulation:2});let i=e;return i})();var is=()=>["Monday","Tuesday","Wednesday","Thursday","Friday"],vr={selector:"cookbook-chart-example-column-stacked",template:`<kirby-chart type="column" [data]="_datasets" [labels]="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" [customOptions]="_customOptions"></kirby-chart>`,codeSnippet:`
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
  };`},Bh=(()=>{let e=class e{constructor(){this.template=vr.template,this.codeSnippet=vr.codeSnippet,this._datasets=[{data:[.8,2,3,3.5,.5]},{data:[.6,2,1,2.1,.2],backgroundColor:Re.getThemeColorHexString("primary")}],this._customOptions={scales:{y:{stacked:!0},x:{stacked:!0}}}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-column-stacked"]],decls:1,vars:4,consts:[["type","column",3,"data","labels","customOptions"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a._datasets)("labels",D(3,is))("customOptions",a._customOptions)},dependencies:[ye],encapsulation:2});let i=e;return i})();var os=()=>["Wednes-","day"],ns=i=>["Monday","Tuesday",i,"Thursday","Friday"],{getThemeColorHexString:rs}=Re,_r={selector:"cookbook-chart-example-multiple-datasets",template:`<kirby-chart 
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
`},qh=(()=>{let e=class e{constructor(){this.template=_r.template,this.codeSnippet=_r.codeSnippet,this._datasets=[{data:[30,50,89.5,22,48]},{data:[60,32,38,44,12],backgroundColor:rs("primary")},{type:"line",data:[45,65,105,37,70]}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-multiple-datasets"]],decls:1,vars:5,consts:[["type","column",3,"data","labels"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a._datasets)("labels",en(3,ns,D(2,os)))},dependencies:[ye],encapsulation:2});let i=e;return i})();var as=()=>[7,12,5,9,3],wr={selector:"cookbook-chart-example-annotations",template:`<kirby-chart 
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
`},Vh=(()=>{let e=class e{constructor(){this.template=wr.template,this.codeSnippet=wr.codeSnippet,this.annotations=[{type:"line",yMin:6.5,yMax:6.5,drawTime:"beforeDatasetsDraw"},{type:"box",xMin:-.3,xMax:.3,yMin:6,yMax:9},{type:"ellipse",xMin:1.7,xMax:1.8,yMin:5.5,yMax:4.5},{type:"line",yMin:14.5,yMax:14.5,borderDash:[0,0]}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-annotations"]],decls:1,vars:3,consts:[[3,"data","annotations"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",D(2,as))("annotations",a.annotations)},dependencies:[ye],encapsulation:2});let i=e;return i})();var ls=()=>["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960"],Sr={selector:"cookbook-chart-example-area-line",template:`
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
  `},Uh=(()=>{let e=class e{constructor(){this.template=Sr.template,this.codeSnippet=Sr.codeSnippet,this._customOptions={scales:{x:{grid:{display:!0}}}},this.data=[{data:[7,7.37,7.46,7.64,7.78,8.44,8.92,9.18,9.41,9.85,10.33]},{data:[6,6.37,6.46,6.64,6.78,7.44,7.92,8.18,8.41,8.85,9.33],fill:"-1"}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-area-line"]],decls:1,vars:4,consts:[["type","line",3,"data","labels","customOptions"]],template:function(t,a){t&1&&p(0,"kirby-chart",0),t&2&&m("data",a.data)("labels",D(3,ls))("customOptions",a._customOptions)},dependencies:[ye],encapsulation:2});let i=e;return i})();var ss=()=>[739,1200,584,902,30],cs=()=>["Monday","Tuesday","Wednesday","Thursday","Friday"],ms={selector:"cookbook-chart-example-accessibility",template:`<kirby-chart 
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
</kirby-chart>`},Jh=(()=>{let e=class e{constructor(){this.template=ms.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-chart-example-accessibility"]],decls:32,vars:4,consts:[["type","column",3,"data","labels"]],template:function(t,a){t&1&&(n(0,"kirby-chart",0)(1,"table")(2,"tr")(3,"th"),s(4,"Day"),r(),n(5,"th"),s(6,"Number of visitors"),r()(),n(7,"tr")(8,"td"),s(9,"Monday"),r(),n(10,"td"),s(11,"739"),r()(),n(12,"tr")(13,"td"),s(14,"Tuesday"),r(),n(15,"td"),s(16,"1200"),r()(),n(17,"tr")(18,"td"),s(19,"Wednesday"),r(),n(20,"td"),s(21,"584"),r()(),n(22,"tr")(23,"td"),s(24,"Thursday"),r(),n(25,"td"),s(26,"902"),r()(),n(27,"tr")(28,"td"),s(29,"Friday"),r(),n(30,"td"),s(31,"30"),r()()()()),t&2&&m("data",D(2,ss))("labels",D(3,cs))},dependencies:[Ln,ye],encapsulation:2});let i=e;return i})();var ds={selector:"cookbook-checkbox-confirm-example",template:'<kirby-checkbox attentionLevel="1" [checked]="true" text="Confirm terms"></kirby-checkbox>'},ek=(()=>{let e=class e{constructor(){this.template=ds.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-confirm-example"]],decls:1,vars:1,consts:[["attentionLevel","1","text","Confirm terms",3,"checked"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0),t&2&&m("checked",!0)},dependencies:[z],encapsulation:2});let i=e;return i})();var ps={selector:"cookbook-checkbox-default-example",template:`<kirby-checkbox [checked]="true" text="Checkbox 1"></kirby-checkbox>
<kirby-checkbox [checked]="false" text="Checkbox 2"></kirby-checkbox>
<kirby-checkbox [checked]="false" text="Checkbox 3"></kirby-checkbox>`},ok=(()=>{let e=class e{constructor(){this.template=ps.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-default-example"]],decls:3,vars:3,consts:[["text","Checkbox 1",3,"checked"],["text","Checkbox 2",3,"checked"],["text","Checkbox 3",3,"checked"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)(1,"kirby-checkbox",1)(2,"kirby-checkbox",2),t&2&&(m("checked",!0),c(),m("checked",!1),c(),m("checked",!1))},dependencies:[z],encapsulation:2});let i=e;return i})();function us(i,e){if(i&1&&(n(0,"kirby-item"),p(1,"kirby-checkbox",2),n(2,"kirby-label"),s(3),r()()),i&2){let l=e.$implicit;c(),m("checked",l.checked),c(2),k(l.label)}}var Mr={selector:"cookbook-checkbox-list-example",template:`<kirby-list [items]="checkboxItems" [showDivider]="true">
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
];`},sk=(()=>{let e=class e{constructor(){this.template=Mr.template,this.codeSnippet=Mr.codeSnippet,this.checkboxItems=[{label:"Checkbox 1",checked:!0},{label:"Checkbox 2",checked:!1},{label:"Checkbox 3",checked:!1}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-list-example"]],decls:2,vars:2,consts:[[3,"items","showDivider"],[4,"kirbyListItemTemplate"],["slot","start",3,"checked"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),w(1,us,4,2,"kirby-item",1),r()),t&2&&m("items",a.checkboxItems)("showDivider",!0)},dependencies:[R,f,z,N],encapsulation:2});let i=e;return i})();var bs={selector:"cookbook-checkbox-states-example",template:`<kirby-checkbox text="Default"></kirby-checkbox>
<kirby-checkbox disabled="true" text="Disabled"></kirby-checkbox>
<kirby-checkbox [checked]="true" text="Checked"></kirby-checkbox>
<kirby-checkbox disabled="true" [checked]="true" text="Disabled checked"></kirby-checkbox>
<kirby-checkbox [indeterminate]="true" text="Indeterminate"></kirby-checkbox>
<kirby-checkbox [indeterminate]="true" text="Disabled Indeterminate" [disabled]="true"></kirby-checkbox>
<kirby-checkbox hasError="true" text="Has error"></kirby-checkbox>`},dk=(()=>{let e=class e{constructor(){this.template=bs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-states-example"]],decls:7,vars:5,consts:[["text","Default"],["disabled","true","text","Disabled"],["text","Checked",3,"checked"],["disabled","true","text","Disabled checked",3,"checked"],["text","Indeterminate",3,"indeterminate"],["text","Disabled Indeterminate",3,"indeterminate","disabled"],["hasError","true","text","Has error"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)(1,"kirby-checkbox",1)(2,"kirby-checkbox",2)(3,"kirby-checkbox",3)(4,"kirby-checkbox",4)(5,"kirby-checkbox",5)(6,"kirby-checkbox",6),t&2&&(c(2),m("checked",!0),c(),m("checked",!0),c(),m("indeterminate",!0),c(),m("indeterminate",!0)("disabled",!0))},dependencies:[z],styles:["[_nghost-%COMP%]{max-width:480px;display:grid;grid-template-columns:1fr 1fr;gap:0 var(--kirby-spacing-s)}"]});let i=e;return i})();var gs={selector:"cookbook-checkbox-sizes-example",template:`<kirby-checkbox size="xs" text="Extra Small"></kirby-checkbox>
<kirby-divider [hasMargin]="true"></kirby-divider>
<kirby-checkbox size="sm" text="Small"></kirby-checkbox>
<kirby-checkbox size="md" text="Medium (default)"></kirby-checkbox>`},gk=(()=>{let e=class e{constructor(){this.template=gs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-sizes-example"]],decls:4,vars:1,consts:[["size","xs","text","Extra Small"],[3,"hasMargin"],["size","sm","text","Small"],["size","md","text","Medium (default)"]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)(1,"kirby-divider",1)(2,"kirby-checkbox",2)(3,"kirby-checkbox",3),t&2&&(c(),m("hasMargin",!0))},dependencies:[z,st],styles:['kirby-checkbox[_ngcontent-%COMP%], kirby-radio[_ngcontent-%COMP%]{margin-bottom:8px;background-color:var(--kirby-semi-light);position:relative}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:after{height:100%;border:1px solid var(--kirby-danger);position:absolute;right:0}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:before{content:"";border-left:0;border-right:0;width:9px}kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:after{content:"md: 56px";border-left:0;border-top:0;border-bottom:0;line-height:56px;font-size:12px;color:var(--kirby-danger);padding-right:8px;margin-right:4px;vertical-align:center}kirby-radio.xs[_ngcontent-%COMP%]:after{content:"xs: 32px";line-height:32px}kirby-radio.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-radio.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox.xs[_ngcontent-%COMP%]:after{content:"xs: 24px";line-height:24px}kirby-checkbox.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-checkbox.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox[_ngcontent-%COMP%]     ion-checkbox, kirby-radio[_ngcontent-%COMP%]     ion-radio{background-color:#f7e0f0;margin-right:80px}']});let i=e;return i})();var ys={selector:"cookbook-checkbox-multiline-example",template:`<kirby-checkbox
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,&#10; sed do eiusmod tempor incididunt ut labore et dolore &#10; magna aliqua.">
</kirby-checkbox>`},kk=(()=>{let e=class e{constructor(){this.template=ys.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-multiline-example"]],decls:1,vars:0,consts:[["text",`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 sed do eiusmod tempor incididunt ut labore et dolore 
 magna aliqua.`]],template:function(t,a){t&1&&p(0,"kirby-checkbox",0)},dependencies:[z],encapsulation:2});let i=e;return i})();var Tr={selector:"cookbook-checkbox-events-example",template:`<kirby-checkbox
  (checkedChange)="onCheckedChange($event)"
  text="Toggle to see 'checkedChange' event in action">
</kirby-checkbox>`,codeSnippet:`onCheckedChange(checked: boolean) {
  ...
}`},xk=(()=>{let e=class e{constructor(o){this.toastController=o,this.template=Tr.template,this.codeSnippet=Tr.codeSnippet}onCheckedChange(o){let t={message:`Checkbox changed - checked: ${o}`,messageType:o?"success":"warning",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-checkbox-events-example"]],decls:1,vars:0,consts:[["text","Toggle to see 'checkedChange' event in action",3,"checkedChange"]],template:function(t,a){t&1&&(n(0,"kirby-checkbox",0),b("checkedChange",function(y){return a.onCheckedChange(y)}),r())},dependencies:[z],encapsulation:2});let i=e;return i})();function hs(i,e){if(i&1&&(n(0,"kirby-item"),p(1,"kirby-checkbox",3),n(2,"kirby-label"),s(3),r()()),i&2){let l=e.$implicit;c(),m("checked",l.checked),c(2),k(l.label)}}var Er={selector:"cookbook-indeterminate-checkbox-list-example",template:`<kirby-checkbox [checked]="allChecked" [indeterminate]="indeterminate" (click)="toggleAll()" [text]="'Select all'"></kirby-checkbox>
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
  }`},Mk=(()=>{let e=class e{constructor(){this.template=Er.template,this.codeSnippet=Er.codeSnippet,this.allChecked=!1,this.indeterminate=!0,this.checkboxItems=[{label:"Checkbox 1",checked:!0},{label:"Checkbox 2",checked:!1},{label:"Checkbox 3",checked:!1}]}toggleAll(){this.allChecked=!this.allChecked,this.indeterminate=!1,this.checkboxItems.forEach(o=>{o.checked=this.allChecked})}itemSelected(o){let t=this.checkboxItems.findIndex(g=>g.label===o.label);this.checkboxItems[t].checked=!o.checked;let a=this.checkboxItems.filter(g=>g.checked).length;a===0?(this.allChecked=!1,this.indeterminate=!1):a===this.checkboxItems.length?(this.allChecked=!0,this.indeterminate=!1):(this.allChecked=!1,this.indeterminate=!0)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-indeterminate-checkbox-list-example"]],decls:3,vars:5,consts:[[3,"click","checked","indeterminate","text"],[3,"itemSelect","items","showDivider"],[4,"kirbyListItemTemplate"],["slot","start",3,"checked"]],template:function(t,a){t&1&&(n(0,"kirby-checkbox",0),b("click",function(){return a.toggleAll()}),r(),n(1,"kirby-list",1),b("itemSelect",function(y){return a.itemSelected(y)}),w(2,hs,4,2,"kirby-item",2),r()),t&2&&(m("checked",a.allChecked)("indeterminate",a.indeterminate)("text","Select all"),c(),m("items",a.checkboxItems)("showDivider",!0))},dependencies:[R,f,z,N],encapsulation:2});let i=e;return i})();var Pr=[{title:"Name",sortable:!0,sortDirection:"asc",textAlignment:"start",iconAlignment:"end",active:!1},{title:"Eyes"},{title:"Gender"},{title:"Hair"},{title:"Skin"},{title:"Birth year"},{title:"Height (cm)",sortable:!0,sortDirection:"asc",textAlignment:"end",iconAlignment:"start",active:!1},{title:"Weight (kg)",sortable:!0,sortDirection:"desc",textAlignment:"end",iconAlignment:"start",active:!1}],ni=[{name:"Luke Skywalker",height:172,mass:77,hair_color:"blond",skin_color:"fair",eye_color:"blue",birth_year:"19BBY",gender:"male"},{name:"C-3PO",height:167,mass:75,hair_color:"n/a",skin_color:"gold",eye_color:"yellow",birth_year:"112BBY",gender:"n/a"},{name:"R2-D2",height:96,mass:32,hair_color:"n/a",skin_color:"white, blue",eye_color:"red",birth_year:"33BBY",gender:"n/a"},{name:"Darth Vader",height:202,mass:136,hair_color:"none",skin_color:"white",eye_color:"yellow",birth_year:"41.9BBY",gender:"male"},{name:"Leia Organa",height:150,mass:49,hair_color:"brown",skin_color:"light",eye_color:"brown",birth_year:"19BBY",gender:"female"},{name:"Obi-Wan Kenobi",height:182,mass:77,hair_color:"auburn, white",skin_color:"fair",eye_color:"blue-gray",birth_year:"57BBY",gender:"male"}];var ks=(i,e)=>e.name;function fs(i,e){if(i&1&&(pe(0,"tr")(1,"td"),s(2),le(),pe(3,"td",1),s(4),le(),pe(5,"td",1),s(6),le()()),i&2){let l=e.$implicit;c(2),k(l.name),c(2),k(l.height),c(2),k(l.mass)}}var Cs={selector:"cookbook-data-table-default-example",template:`<table class="kirby-table layout-fixed">
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
  </table>`},Ok=(()=>{let e=class e{constructor(){this.template=Cs.template,this.tableData=ni.slice(0,3),this.dataSnippet=`tableData = ${He(this.tableData.map(o=>{let{name:t,height:a,mass:g}=o;return{name:t,height:a,mass:g}}))};`}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-data-table-default-example"]],decls:12,vars:0,consts:[[1,"kirby-table","layout-fixed"],[2,"text-align","right"]],template:function(t,a){t&1&&(pe(0,"table",0)(1,"thead")(2,"tr")(3,"th"),s(4,"Name"),le(),pe(5,"th",1),s(6,"Height (cm)"),le(),pe(7,"th",1),s(8,"Weight (kg)"),le()()(),pe(9,"tbody"),H(10,fs,7,3,"tr",null,ks),le()()),t&2&&(c(10),q(a.tableData))},encapsulation:2});let i=e;return i})();var xs=(i,e)=>e.name;function vs(i,e){if(i&1){let l=P();n(0,"tr",3),b("click",function(){let t=v(l).$index,a=h();return _(a.onClickRow(t))}),n(1,"td"),s(2),r(),n(3,"td"),s(4),r(),n(5,"td"),s(6),r(),n(7,"td"),s(8),r(),n(9,"td"),s(10),r(),n(11,"td"),s(12),r(),n(13,"td",1),s(14),r(),n(15,"td",1),s(16),r()()}if(i&2){let l=e.$implicit;c(2),k(l.name),c(2),k(l.eye_color),c(2),k(l.gender),c(2),k(l.hair_color),c(2),k(l.skin_color),c(2),k(l.birth_year),c(2),k(l.height),c(2),k(l.mass)}}var _s={selector:"cookbook-data-table-card-example",template:`<kirby-card>
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
</kirby-card>`},Lk=(()=>{let e=class e{constructor(o){this.toastController=o,this.tableData=[...ni],this.template=_s.template}onClickRow(o){this.toastController.showToast({message:`You pressed row with index: ${o}`,messageType:"success",durationInMs:2e3})}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-data-table-card-example"]],decls:23,vars:0,consts:[[1,"kirby-table"],[2,"text-align","right"],[1,"kirby-selectable-row"],[1,"kirby-selectable-row",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-card")(1,"table",0)(2,"thead")(3,"tr")(4,"th"),s(5,"Name"),r(),n(6,"th"),s(7,"Eyes"),r(),n(8,"th"),s(9,"Gender"),r(),n(10,"th"),s(11,"Hair"),r(),n(12,"th"),s(13,"Skin"),r(),n(14,"th"),s(15,"Birth year"),r(),n(16,"th",1),s(17,"Height (cm)"),r(),n(18,"th",1),s(19,"Weight (kg)"),r()()(),n(20,"tbody"),H(21,vs,17,8,"tr",2,xs),r()()()),t&2&&(c(21),q(a.tableData))},dependencies:[T],encapsulation:2});let i=e;return i})();var ws=(i,e)=>e.title,Ss=(i,e)=>e.name;function Ms(i,e){if(i&1){let l=P();n(0,"th",2),b("click",function(){let t=v(l),a=t.$implicit,g=t.$index,y=h();return _(y.sortData(g,a.title))}),s(1),r()}if(i&2){let l=e.$implicit;m("sortable",l.sortable)("sortDirection",l.sortDirection)("iconAlignment",l.iconAlignment)("alignment",l.textAlignment)("active",l.active),c(),S(" ",l.title," ")}}function Ts(i,e){if(i&1&&(n(0,"tr")(1,"td"),s(2),r(),n(3,"td"),s(4),r(),n(5,"td"),s(6),r(),n(7,"td"),s(8),r(),n(9,"td"),s(10),r(),n(11,"td"),s(12),r(),n(13,"td",3),s(14),r(),n(15,"td",3),s(16),r()()),i&2){let l=e.$implicit;c(2),k(l.name),c(2),k(l.eye_color),c(2),k(l.gender),c(2),k(l.hair_color),c(2),k(l.skin_color),c(2),k(l.birth_year),c(2),k(l.height),c(2),k(l.mass)}}var Do={selector:"cookbook-data-table-sortable-example",template:`<kirby-card>
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
]`},Hk=(()=>{let e=class e{constructor(){this.tableData=ni,this.headings=Pr,this.template=Do.template,this.importSnippet=Do.importSnippet,this.sortingSnippet=Do.sortingSnippet}ngOnInit(){this.headings[0].sortDirection="desc",this.sortData(0,"Name")}sortData(o,t){this.headings[o].active=this._activeHelper(o),this.headings[o].sortDirection=this.headings[o].sortDirection=="asc"?"desc":"asc",this.tableData.sort((a,g)=>{switch(t){case"Name":return this._sortHelper(a.name,g.name,this.headings[o].sortDirection);case"Height (cm)":return this._sortHelper(a.height,g.height,this.headings[o].sortDirection);case"Weight (kg)":return this._sortHelper(a.mass,g.mass,this.headings[o].sortDirection)}})}_sortHelper(o,t,a){return a=="asc"?o>t?1:o<t?-1:0:o<t?1:o>t?-1:0}_activeHelper(o){return this.headings[o].active||this.headings.forEach(t=>{t.active=!1}),!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-data-table-sortable-example"]],decls:9,vars:0,consts:[[1,"kirby-table"],[3,"sortable","sortDirection","iconAlignment","alignment","active"],[3,"click","sortable","sortDirection","iconAlignment","alignment","active"],[1,"text-align-right"]],template:function(t,a){t&1&&(n(0,"kirby-card")(1,"table",0)(2,"thead")(3,"tr"),H(4,Ms,2,6,"th",1,ws),r()(),n(6,"tbody"),H(7,Ts,17,8,"tr",null,Ss),r()()()),t&2&&(c(4),q(a.headings),c(3),q(a.tableData))},dependencies:[T,_n],encapsulation:2});let i=e;return i})();var Es=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],Ps={selector:"cookbook-dropdown-example-default",template:`<kirby-dropdown
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
`},Rk=(()=>{let e=class e{constructor(){this.template=Ps.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-default"]],decls:1,vars:2,consts:[["aria-label","Choose your favorite fruit","placeholder","Choose your favorite fruit",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,Es))},dependencies:[J],encapsulation:2});let i=e;return i})();var Ds=()=>["Apple","Banana","Blackberry","Blueberry","Carrot","Cherry","Cucumber","Date","Eggplant","Fig","Grapes","Kiwi","Lemon","Mango","Orange","Peach"],Os={selector:"cookbook-dropdown-example-scroll",template:`<kirby-dropdown
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
></kirby-dropdown>`},Gk=(()=>{let e=class e{constructor(){this.template=Os.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-scroll"]],decls:1,vars:2,consts:[["aria-label","Choose your favorite fruit","placeholder","Dropdown with scroll (> 8 items)",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,Ds))},dependencies:[J],encapsulation:2});let i=e;return i})();var Is=()=>["Apple","Banana","Blackberry","Blueberry","Grapes (preselected)"],Fs={selector:"cookbook-dropdown-example-pre-selected",template:`<kirby-dropdown
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes (preselected)',
    ]"
  [selectedIndex]="4"
></kirby-dropdown>`},Yk=(()=>{let e=class e{constructor(){this.template=Fs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-pre-selected"]],decls:1,vars:3,consts:[["aria-label","Choose your favorite fruit",3,"items","selectedIndex"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(2,Is))("selectedIndex",4)},dependencies:[J],encapsulation:2});let i=e;return i})();var As=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],Ls={selector:"cookbook-dropdown-example-expand",template:`<kirby-dropdown
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
></kirby-dropdown>`},Zk=(()=>{let e=class e{constructor(){this.template=Ls.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-expand"]],decls:1,vars:2,consts:[["placeholder","Block level Dropdown","aria-label","Choose your favorite fruit","expand","block",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,As))},dependencies:[J],encapsulation:2});let i=e;return i})();var zs=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],Dr={selector:"cookbook-dropdown-example-right-aligned",template:`<kirby-dropdown
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
}`]},tf=(()=>{let e=class e{constructor(){this.template=Dr.template,this.styles=Dr.styles.join(`
`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-right-aligned"]],hostVars:2,hostBindings:function(t,a){t&2&&G("right-align",!0)},decls:1,vars:2,consts:[["placeholder","Right aligned (opens left)","aria-label","Choose your favorite fruit","popout","left",3,"items"]],template:function(t,a){t&1&&p(0,"kirby-dropdown",0),t&2&&m("items",D(1,zs))},dependencies:[J],styles:[".right-align[_nghost-%COMP%]{display:flex}","kirby-dropdown[_ngcontent-%COMP%]{margin-left:auto}"]});let i=e;return i})();function Bs(i,e){if(i&1&&(n(0,"option",4),s(1),r()),i&2){let l=e.$implicit,o=h();m("value",Ie(l)),Ke("selected",o.themeColor===l?!0:null),c(),S(" Card color: ",l," ")}}var $s={selector:"cookbook-dropdown-example-attention-level",template:`<kirby-card hasPadding="true" class="attention-levels" [themeColor]="themeColor">
  <kirby-dropdown
    placeholder="Dropdown with attention level 2"
    aria-label="Choose your favorite fruit"
    attentionLevel="2"
    expand="block"
    usePopover="true"
    [items]="items">
  </kirby-dropdown>

  <kirby-dropdown
    placeholder="Dropdown with attention level 3"
    aria-label="Choose your favorite fruit"
    attentionLevel="3"
    expand="block"
    usePopover="true"
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

<p class="comment small">
  <em
    ><strong>Please note</strong>, these examples have <code>usePopover</code> enabled to not be cut off by the card.
  </em>
</p>
`},lf=(()=>{let e=class e{constructor(){this.template=$s.template,this.items=["Apple","Banana","Blackberry","Blueberry","Grapes"],this.themeColors=["light","white","dark"],this.themeColor="white"}onChange(o){this.themeColor=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-attention-level"]],decls:15,vars:3,consts:[["hasPadding","true",1,"attention-levels",3,"themeColor"],["placeholder","Dropdown with attention level 2","aria-label","Choose your favorite fruit","attentionLevel","2","expand","block","usePopover","true",3,"items"],["placeholder","Dropdown with attention level 3","aria-label","Choose your favorite fruit","attentionLevel","3","expand","block","usePopover","true",3,"items"],[3,"change"],[3,"value"],[1,"comment","small"]],template:function(t,a){t&1&&(n(0,"kirby-card",0),p(1,"kirby-dropdown",1)(2,"kirby-dropdown",2),r(),n(3,"div")(4,"select",3),b("change",function(y){return a.onChange(y.target.value)}),H(5,Bs,2,4,"option",4,fi),r()(),n(7,"p",5)(8,"em")(9,"strong"),s(10,"Please note"),r(),s(11,", these examples have "),n(12,"code"),s(13,"usePopover"),r(),s(14," enabled to not be cut off by the card. "),r()()),t&2&&(m("themeColor",a.themeColor),c(),m("items",a.items),c(),m("items",a.items),c(3),q(a.themeColors))},dependencies:[T,Q,J],styles:["kirby-card[_ngcontent-%COMP%]{margin-block:24px;max-width:fit-content}kirby-card[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%] + kirby-dropdown[_ngcontent-%COMP%]{margin-top:16px}kirby-card.attention-levels[_ngcontent-%COMP%]{max-width:320px}p[_ngcontent-%COMP%]{margin-top:16px}.column-layout[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;gap:var(--kirby-spacing-m)}.constrain-width[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%]{max-width:fit-content}"]});let i=e;return i})();var Ns={selector:"cookbook-dropdown-example-item-select",template:`<kirby-dropdown
  placeholder="Dropdown with event handler"
  aria-label="Choose your favorite fruit"
  [items]="items"
  (change)="onItemSelect($event)"
></kirby-dropdown>`},mf=(()=>{let e=class e{constructor(o){this.toastController=o,this.template=Ns.template,this.items=[{id:11,text:"Apple"},{id:22,text:"Banana"},{id:33,text:"Blackberry"},{id:44,text:"Blueberry"},{id:55,text:"Grapes"}]}onItemSelect(o){let t={message:`Item '${o.text} (id=${o.id})' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-item-select"]],decls:1,vars:1,consts:[["placeholder","Dropdown with event handler","aria-label","Choose your favorite fruit",3,"change","items"]],template:function(t,a){t&1&&(n(0,"kirby-dropdown",0),b("change",function(y){return a.onItemSelect(y)}),r()),t&2&&m("items",a.items)},dependencies:[J],encapsulation:2});let i=e;return i})();function Hs(i,e){i&1&&p(0,"kirby-icon",5)}function qs(i,e){if(i&1&&(n(0,"kirby-item",4),O(1,Hs,1,0,"kirby-icon",5),n(2,"kirby-label")(3,"p",6),s(4),r(),n(5,"p",7),s(6),r()(),n(7,"kirby-label",8)(8,"data"),s(9,"Value"),r(),n(10,"data",7),s(11),r()()()),i&2){let l=e.$implicit,o=e.selected,t=e.focused;G("focused",t),m("selected",o),c(),I(o?1:-1),c(3),k(l.title),c(2),k(l.subtitle),c(5),k(l.value)}}var Ks={selector:"cookbook-dropdown-example-custom-item-template",template:`<kirby-dropdown #dropdown
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
  }`]},hf=(()=>{let e=class e{constructor(){this.template=Ks.template,this.items=[{title:"Item 1",subtitle:"Bacon ipsum dolor",value:1},{title:"Item 2",subtitle:"Tenderloin short loin frankfurter",value:2},{title:"Item 3",subtitle:"Salami andouille hamburger",value:3},{title:"Item 4",subtitle:"Tongue bresaola tail swine",value:4},{title:"Item 5",subtitle:"Drumstick pastrami sirloin ",value:5}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-custom-item-template"]],decls:6,vars:4,consts:[["dropdown",""],["placeholder","Dropdown with custom item template","aria-label","Choose your custom item","itemTextProperty","title",3,"items"],["selectable","true",3,"selected","focused",4,"kirbyListItemTemplate"],[1,"selection"],["selectable","true",3,"selected"],["name","checkmark-selected","slot","start"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){if(t&1&&(n(0,"kirby-dropdown",1,0),w(2,qs,12,7,"kirby-item",2),r(),n(3,"p",3),s(4),X(5,"json"),r()),t&2){let g=ee(1);m("items",a.items),c(4),S("Selected item: ",se(5,2,g.value))}},dependencies:[J,M,f,B,N,at],styles:[".selection[_ngcontent-%COMP%]{margin-left:12px;font-size:12px;font-style:italic}"]});let i=e;return i})();var Or={selector:"cookbook-dropdown-example-ng-forms",template:`<form [formGroup]="form">
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
    }`]},wf=(()=>{let e=class e{constructor(){this.template=Or.template.split("<fieldset>")[0],this.codeSnippet=Or.codeSnippet,this.canSelectFavorite=!0,this.favoriteRequired=!1,this.items=[{title:"Bacon",subtitle:"Bacon ipsum dolor",value:1},{title:"Salami",subtitle:"Salami andouille hamburger",value:2},{title:"Tenderloin",subtitle:"Tenderloin short loin frankfurter",value:3},{title:"Tongue",subtitle:"Tongue bresaola tail swine",value:4},{title:"Drumstick",subtitle:"Drumstick pastrami sirloin ",value:5}]}ngOnInit(){this.buildForm()}toggleEnabled(o){this.canSelectFavorite=o,o?this.favoriteFoodControl.enable():this.favoriteFoodControl.disable()}toggleRequired(o){this.favoriteRequired=o,o?this.favoriteFoodControl.setValidators(jt.required):this.favoriteFoodControl.setValidators(null),this.favoriteFoodControl.updateValueAndValidity()}buildForm(){this.favoriteFoodControl=new Si(null,this.favoriteRequired?jt.required:null),this.canSelectFavorite||this.favoriteFoodControl.disable(),this.form=new wi({favoriteFood:this.favoriteFoodControl})}get favFoodControl(){return this.form.controls.favoriteFood}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-ng-forms"]],decls:19,vars:19,consts:[[3,"formGroup"],[3,"label","message"],["formControlName","favoriteFood","placeholder","Dropdown in form","itemTextProperty","title",3,"items","hasError"],["text","Form field enabled","size","xs",3,"checkedChange","checked"],["text","Form field required","size","xs",3,"checkedChange","checked"],[1,"selection"]],template:function(t,a){t&1&&(n(0,"form",0)(1,"kirby-form-field",1),p(2,"kirby-dropdown",2),r()(),n(3,"fieldset")(4,"legend"),s(5,"Configuration"),r(),n(6,"kirby-checkbox",3),b("checkedChange",function(y){return a.toggleEnabled(y)}),r(),n(7,"kirby-checkbox",4),b("checkedChange",function(y){return a.toggleRequired(y)}),r(),n(8,"p",5),s(9),X(10,"json"),p(11,"br"),s(12," form.favoriteFood: "),n(13,"span"),s(14),r(),n(15,"span"),s(16),r(),n(17,"span"),s(18),r()()()),t&2&&(m("formGroup",a.form),c(),m("label","Label")("message","Message"),c(),m("items",a.items)("hasError",a.favoriteRequired&&!(a.form.controls.favoriteFood!=null&&a.form.controls.favoriteFood.valid)),c(4),m("checked",a.canSelectFavorite),c(),m("checked",a.favoriteRequired),c(2),S(" form.value: ",se(10,17,a.form.value)),c(4),G("state-true",a.favoriteFoodControl.valid),c(),S("valid: ",a.favoriteFoodControl.valid),c(),G("state-true",a.favoriteFoodControl.enabled),c(),S("enabled: ",a.favoriteFoodControl.enabled),c(),G("state-true",a.favoriteFoodControl.touched),c(),S("touched: ",a.favoriteFoodControl.touched))},dependencies:[xe,Me,ke,Se,Pe,Ee,Te,J,z,A,at],styles:[".selection[_ngcontent-%COMP%]{margin:0;font-size:12px;line-height:16px;font-style:italic}","span[_ngcontent-%COMP%]{background-color:#ff595e;margin-right:4px;padding:0 2px;border-radius:4px}","span.state-true[_ngcontent-%COMP%]{background-color:#2cf287}"]});let i=e;return i})();var Oo=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],Rs={selector:"cookbook-dropdown-example-states",template:`<kirby-dropdown
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
`},Tf=(()=>{let e=class e{constructor(){this.template=Rs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-states"]],decls:4,vars:11,consts:[[1,"column-layout","constrain-width"],["aria-label","Choose your favorite fruit",3,"placeholder","items"],["aria-label","Choose your favorite fruit",3,"disabled","placeholder","items"],["aria-label","Choose your favorite fruit",3,"hasError","placeholder","items"]],template:function(t,a){t&1&&(n(0,"div",0),p(1,"kirby-dropdown",1)(2,"kirby-dropdown",2)(3,"kirby-dropdown",3),r()),t&2&&(c(),m("placeholder","Choose your favorite fruit")("items",D(8,Oo)),c(),m("disabled",!0)("placeholder","Choose your favorite fruit")("items",D(9,Oo)),c(),m("hasError",!0)("placeholder","Choose your favorite fruit")("items",D(10,Oo)))},dependencies:[J],styles:["kirby-card[_ngcontent-%COMP%]{margin-block:24px;max-width:fit-content}kirby-card[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%] + kirby-dropdown[_ngcontent-%COMP%]{margin-top:16px}kirby-card.attention-levels[_ngcontent-%COMP%]{max-width:320px}p[_ngcontent-%COMP%]{margin-top:16px}.column-layout[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;gap:var(--kirby-spacing-m)}.constrain-width[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%]{max-width:fit-content}"]});let i=e;return i})();var Ir=()=>["Apple","Banana","Blackberry","Blueberry","Grapes"],Vs={selector:"cookbook-dropdown-example-form-field",template:`<kirby-form-field [label]="'Label for medium dropdown'" [message]="'Message'">
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
`},Of=(()=>{let e=class e{constructor(){this.template=Vs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-dropdown-example-form-field"]],decls:5,vars:9,consts:[[1,"column-layout","constrain-width"],[3,"label","message"],["placeholder","Dropdown in form field",3,"items"],["placeholder","Dropdown in form field",3,"size","items"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"kirby-form-field",1),p(2,"kirby-dropdown",2),r(),n(3,"kirby-form-field",1),p(4,"kirby-dropdown",3),r()()),t&2&&(c(),m("label","Label for medium dropdown")("message","Message"),c(),m("items",D(7,Ir)),c(),m("label","Label for small dropdown")("message","Message"),c(),m("size","sm")("items",D(8,Ir)))},dependencies:[J,A],styles:["kirby-card[_ngcontent-%COMP%]{margin-block:24px;max-width:fit-content}kirby-card[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%] + kirby-dropdown[_ngcontent-%COMP%]{margin-top:16px}kirby-card.attention-levels[_ngcontent-%COMP%]{max-width:320px}p[_ngcontent-%COMP%]{margin-top:16px}.column-layout[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;gap:var(--kirby-spacing-m)}.constrain-width[_ngcontent-%COMP%]   kirby-dropdown[_ngcontent-%COMP%]{max-width:fit-content}"]});let i=e;return i})();var Ws={template:`<div class="message-type-container">
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
</div>`},Lf=(()=>{let e=class e{constructor(){this.template=Ws.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-empty-state-message-types-example"]],decls:4,vars:0,consts:[[1,"message-type-container"],["iconName","verify","themeColor","success","title","Success","subtitle","Additional messaging via subtitle"],["iconName","help","themeColor","warning","title","Warning","subtitle","Additional messaging via subtitle"],["iconName","overview-outline","title","Empty","subtitle","Additional messaging via subtitle"]],template:function(t,a){t&1&&(n(0,"div",0),p(1,"kirby-empty-state",1)(2,"kirby-empty-state",2)(3,"kirby-empty-state",3),r())},dependencies:[We,Q],styles:["[_nghost-%COMP%]{display:block;container-type:inline-size;padding:0 1rem}.message-type-container[_ngcontent-%COMP%]{display:flex;gap:1rem;justify-content:space-around}@container (width < 632px){.message-type-container[_ngcontent-%COMP%]{flex-direction:column}}"]});let i=e;return i})();var Gs={template:`<kirby-empty-state
  title="Simple"
  subtitle="A subtitle with a &#10; newline inserted in the template."
>
  <button kirby-button attentionLevel="1">Resolve state</button>
</kirby-empty-state>
`},Nf=(()=>{let e=class e{constructor(){this.template=Gs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-empty-state-simple-example"]],decls:3,vars:0,consts:[["title","Simple","subtitle",`A subtitle with a 
 newline inserted in the template.`],["kirby-button","","attentionLevel","1"]],template:function(t,a){t&1&&(n(0,"kirby-empty-state",0)(1,"button",1),s(2,"Resolve state"),r()())},dependencies:[We,C],encapsulation:2});let i=e;return i})();var Us={template:`<kirby-empty-state
  iconName="kirby"
  title="Button attention levels"
  subtitle="Additional messaging via subtitle"
>
  <button kirby-button attentionLevel="1">Primary action</button>
  <button kirby-button attentionLevel="2">Secondary action</button>
</kirby-empty-state>
`},Rf=(()=>{let e=class e{constructor(){this.template=Us.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-empty-state-buttons-example"]],decls:5,vars:0,consts:[["iconName","kirby","title","Button attention levels","subtitle","Additional messaging via subtitle"],["kirby-button","","attentionLevel","1"],["kirby-button","","attentionLevel","2"]],template:function(t,a){t&1&&(n(0,"kirby-empty-state",0)(1,"button",1),s(2,"Primary action"),r(),n(3,"button",2),s(4,"Secondary action"),r()())},dependencies:[We,C],encapsulation:2});let i=e;return i})();var Yf=(()=>{let e=class e{constructor(o){this.toastController=o,this.disableFabSheet=!1,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(o){let t={message:`'${o.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-fab-sheet-example"]],inputs:{disableFabSheet:"disableFabSheet"},decls:3,vars:2,consts:[["horizontalAlignment","right",3,"disabled"],["name","write-message"],["header","Your action sheet header","subheader","Your action sheet subheader",3,"itemSelect","items"]],template:function(t,a){t&1&&(n(0,"kirby-fab-sheet",0),p(1,"kirby-icon",1),n(2,"kirby-action-sheet",2),b("itemSelect",function(y){return a.onItemSelect(y)}),r()()),t&2&&(m("disabled",a.disableFabSheet),c(2),m("items",a.items))},dependencies:[Ni,un,M,Li],encapsulation:2});let i=e;return i})();var js={selector:"cookbook-flag-example-colors",template:`<kirby-flag themeColor="success">Success</kirby-flag>
<kirby-flag themeColor="warning">Warning</kirby-flag>
<kirby-flag themeColor="danger">Danger</kirby-flag>
<kirby-flag themeColor="semi-light">Semi-Light</kirby-flag>
<kirby-flag themeColor="transparent" title="(default)">Transparent</kirby-flag>`},Zf=(()=>{let e=class e{constructor(){this.template=js.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-flag-example-colors"]],decls:10,vars:0,consts:[["themeColor","success"],["themeColor","warning"],["themeColor","danger"],["themeColor","semi-light"],["themeColor","transparent","title","(default)"]],template:function(t,a){t&1&&(n(0,"kirby-flag",0),s(1,"Success"),r(),n(2,"kirby-flag",1),s(3,"Warning"),r(),n(4,"kirby-flag",2),s(5,"Danger"),r(),n(6,"kirby-flag",3),s(7,"Semi-Light"),r(),n(8,"kirby-flag",4),s(9,"Transparent"),r())},dependencies:[Be],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px;flex-wrap:wrap}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px;margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-flag[_ngcontent-%COMP%]{position:relative}kirby-flag[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-flag[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-flag[title][title="(default)"][_ngcontent-%COMP%]:before{content:"(default)"}']});let i=e;return i})();var Ys={selector:"cookbook-flag-example-sizes",template:`<kirby-flag size="xs">Extra Small (xs)</kirby-flag>
<kirby-flag size="sm">Small (sm)</kirby-flag>
<kirby-flag size="md" title="(default)">Medium (md)</kirby-flag>`},tC=(()=>{let e=class e{constructor(){this.template=Ys.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-flag-example-sizes"]],decls:6,vars:0,consts:[["size","xs"],["size","sm"],["size","md","title","(default)"]],template:function(t,a){t&1&&(n(0,"kirby-flag",0),s(1,"Extra Small (xs)"),r(),n(2,"kirby-flag",1),s(3,"Small (sm)"),r(),n(4,"kirby-flag",2),s(5,"Medium (md)"),r())},dependencies:[Be],styles:['[_nghost-%COMP%]{display:flex;align-items:flex-end;margin-bottom:16px;flex-wrap:wrap}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{margin-right:16px;margin-bottom:16px}.align-top[_nghost-%COMP%]{align-items:flex-start}kirby-flag[_ngcontent-%COMP%]{position:relative}kirby-flag[title][_ngcontent-%COMP%]{margin-bottom:16px}kirby-flag[title][_ngcontent-%COMP%]:before{content:"";width:100%;position:absolute;bottom:0;transform:translateY(100%);font-size:12px;text-align:center}kirby-flag[title][title="(default)"][_ngcontent-%COMP%]:before{content:"(default)"}']});let i=e;return i})();var mC=(()=>{let e=class e{constructor(){this.items=[{title:"Medium (md)",value:qi.medium},{title:"Large (lg) - default",value:qi.large}],this.size=qi.large,this.sizeChange=new ge,this.onChange=o=>{this.size=o.value,this.sizeChange.emit(o.value)}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-example-configuration"]],inputs:{size:"size"},outputs:{sizeChange:"sizeChange"},decls:8,vars:2,consts:[["itemTextProperty","title",3,"valueChange","items","selectedIndex"]],template:function(t,a){t&1&&(n(0,"fieldset")(1,"legend"),s(2,"Input field size for examples below"),r(),n(3,"p")(4,"strong"),s(5,"Size:"),r(),p(6,"br"),n(7,"kirby-radio-group",0),b("valueChange",function(y){return a.onChange(y)}),r()()()),t&2&&(c(7),m("items",a.items)("selectedIndex",1))},dependencies:[xn,de],styles:["fieldset[_ngcontent-%COMP%]{display:inline-block}"]});let i=e;return i})();var Qs={selector:"cookbook-form-field-input-example",template:`<kirby-form-field>
  <input kirby-input [size]="size" placeholder="Default input with placeholder text" />
</kirby-form-field>`},bC=(()=>{let e=class e{constructor(){this.template=Qs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["kirby-input","","placeholder","Default input with placeholder text",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field"),p(1,"input",0),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var Js={selector:"cookbook-form-field-input-color-example",template:`<kirby-card hasPadding="true" [themeColor]="color">
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
`},CC=(()=>{let e=class e{constructor(){this.color="white"}get template(){return Js.template.split('<div class="card-option-button-group">')[0]}setThemeColor(o){this.color=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-color-example"]],decls:8,vars:1,consts:[["hasPadding","true",3,"themeColor"],["kirby-input","","placeholder","Default input with placeholder text inside card"],[1,"card-option-button-group"],[1,"white",3,"click"],[1,"light",3,"click"],[1,"secondary",3,"click"],[1,"dark",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-card",0)(1,"kirby-form-field"),p(2,"input",1),r()(),n(3,"div",2)(4,"button",3),b("click",function(){return a.setThemeColor("white")}),r(),n(5,"button",4),b("click",function(){return a.setThemeColor("light")}),r(),n(6,"button",5),b("click",function(){return a.setThemeColor("secondary")}),r(),n(7,"button",6),b("click",function(){return a.setThemeColor("dark")}),r()()),t&2&&m("themeColor",a.color)},dependencies:[T,Q,A,W],styles:[".card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:#fff;cursor:pointer}button.white[_ngcontent-%COMP%]{background-color:var(--kirby-white)}button.white[_ngcontent-%COMP%]:hover{background-color:var(--kirby-white-shade)}button.light[_ngcontent-%COMP%]{background-color:var(--kirby-light);outline:#fff 2px solid;border:#fff 2px solid}button.light[_ngcontent-%COMP%]:hover{background-color:var(--kirby-light-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var Zs={selector:"cookbook-form-field-input-label-example",template:`<kirby-form-field label="Input with label">
  <input kirby-input [size]="size" />
</kirby-form-field>`},wC=(()=>{let e=class e{constructor(){this.template=Zs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-label-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input with label"],["kirby-input","",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var Xs={selector:"cookbook-form-field-input-label-message-example",template:`<kirby-form-field label="Input with label and message" message="This is additional info that will be shown below the input">
  <input kirby-input [size]="size" />
</kirby-form-field>`},EC=(()=>{let e=class e{constructor(){this.template=Xs.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-label-message-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input with label and message","message","This is additional info that will be shown below the input"],["kirby-input","",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var ec={selector:"cookbook-form-field-input-affix-example",template:`<kirby-form-field label="With prefix">
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
</kirby-form-field>`},AC=(()=>{let e=class e{constructor(){this.template=ec.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-affix-example"]],inputs:{size:"size"},decls:11,vars:4,consts:[["label","With prefix"],["name","payment-card","kirby-affix","prefix"],["kirby-input","","placeholder","Enter your card number",3,"size"],["label","With suffix"],["kirby-input","","type","number","placeholder","Monthly payments",3,"size"],["kirby-affix","suffix"],["label","With prefix and suffix"],["name","search","kirby-affix","prefix"],["kirby-input","","decimal-mask","","placeholder","Search...",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"kirby-icon",1)(2,"input",2),r(),n(3,"kirby-form-field",3),p(4,"input",4),n(5,"span",5),s(6,"kr/md"),r()(),n(7,"kirby-form-field",6),p(8,"kirby-icon",7)(9,"input",8)(10,"kirby-spinner",5),r()),t&2&&(c(2),m("size",a.size),c(2),m("size",a.size)("size",a.size),c(5),m("size",a.size))},dependencies:[A,M,Hi,W,Oi],encapsulation:2});let i=e;return i})();var tc={selector:"cookbook-form-field-input-counter-example",template:`<kirby-form-field>
  <input kirby-input [size]="size" placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140" />
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <input kirby-input [size]="size" value="Character counter with prefilled value" #prefilled maxlength="50" />
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>`},$C=(()=>{let e=class e{constructor(){this.template=tc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-counter-example"]],inputs:{size:"size"},decls:8,vars:4,consts:[["tweet",""],["prefilled",""],["kirby-input","","placeholder","Tweet your message (max 140 chars)","maxlength","140",3,"size"],[3,"listenTo"],["kirby-input","","value","Character counter with prefilled value","maxlength","50",3,"size"]],template:function(t,a){if(t&1&&(n(0,"kirby-form-field"),p(1,"input",2,0)(3,"kirby-input-counter",3),r(),n(4,"kirby-form-field"),p(5,"input",4,1)(7,"kirby-input-counter",3),r()),t&2){let g=ee(2),y=ee(6);c(),m("size",a.size),c(2),m("listenTo",g),c(2),m("size",a.size),c(2),m("listenTo",y)}},dependencies:[A,W,ct],encapsulation:2});let i=e;return i})();var ic=(i,e)=>e.key;function oc(i,e){if(i&1&&(pe(0,"p")(1,"strong"),s(2),le(),pe(3,"span"),s(4),X(5,"json"),le()()),i&2){let l=h().$implicit;c(2),S("form.",l.key,".errors: "),c(),G("state-true",!l.value.errors),c(),k(se(5,4,l.value.errors))}}function nc(i,e){if(i&1&&(pe(0,"p")(1,"strong"),s(2),le(),pe(3,"span"),s(4),le(),pe(5,"span"),s(6),le(),pe(7,"span"),s(8),le()(),O(9,oc,6,6,"p")),i&2){let l=e.$implicit;c(2),S("form.",l.key,": "),c(),G("state-true",l.value.valid),c(),S("valid: ",l.value.valid),c(),G("state-true",l.value.enabled),c(),S("enabled: ",l.value.enabled),c(),G("state-true",l.value.touched),c(),S("touched: ",l.value.touched),c(),I(l.value.validator?9:-1)}}var qe=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-reactive-form-state"]],inputs:{form:"form"},decls:12,vars:5,consts:[[1,"form-state"]],template:function(t,a){t&1&&(pe(0,"section",0)(1,"h4"),s(2,"Form state:"),le(),pe(3,"p")(4,"strong"),s(5,"form.value:"),le(),s(6),X(7,"json"),Yo(8,"br"),le(),H(9,nc,10,11,null,null,ic),X(11,"keyvalue"),le()),t&2&&(c(6),S(" ",se(7,1,a.form.value)," "),c(3),q(se(11,3,a.form.controls)))},dependencies:[at,_i],styles:["[_nghost-%COMP%]{display:flex}.form-state[_ngcontent-%COMP%]{margin-top:12px;border-top:1px solid var(--kirby-medium);padding:8px}.form-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:4px;font-weight:400}.form-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:12px;line-height:16px}.form-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:var(--kirby-danger);color:var(--kirby-white);margin-right:4px;padding:0 2px;border-radius:4px}.form-state[_ngcontent-%COMP%]   span.state-true[_ngcontent-%COMP%]{background-color:var(--kirby-success);color:var(--kirby-success-contrast)}"]});let i=e;return i})();var rc={selector:"cookbook-form-field-input-counter-form-example",template:`<form [formGroup]="form">
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
</cookbook-example-configuration-wrapper>`},jC=(()=>{let e=class e{constructor(o){this.fb=o,this.template=rc.template,this.isEnabled=!0,this.form=this.fb.group({message:[""]})}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}resetForm(){this.form.reset()}};e.\u0275fac=function(t){return new(t||e)(x(Ve))},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-counter-form-example"]],inputs:{size:"size"},decls:10,vars:6,consts:[["message",""],[3,"formGroup"],["kirby-input","","placeholder","Enter your message (max 140 chars)","maxlength","140","formControlName","message",3,"size"],[3,"listenTo"],["text","Form field enabled",3,"checkedChange","checked"],["kirby-button","","attentionLevel","3",3,"click","disabled"],[3,"form"]],template:function(t,a){if(t&1){let g=P();n(0,"form",1)(1,"kirby-form-field"),p(2,"input",2,0)(4,"kirby-input-counter",3),r()(),n(5,"cookbook-example-configuration-wrapper")(6,"kirby-checkbox",4),b("checkedChange",function(){return v(g),_(a.toggleEnabled())}),r(),n(7,"button",5),b("click",function(){return v(g),_(a.resetForm())}),s(8," Reset "),r(),p(9,"cookbook-reactive-form-state",6),r()}if(t&2){let g=ee(3);m("formGroup",a.form),c(2),m("size",a.size),c(2),m("listenTo",g),c(2),m("checked",!0),c(),m("disabled",!a.form.get("message").value),c(2),m("form",a.form)}},dependencies:[A,W,Pe,Me,Ut,ke,Se,Ti,Ee,Te,C,z,qe,Ce,ct],encapsulation:2});let i=e;return i})();var ac={selector:"cookbook-form-field-input-numeric-example",template:`<kirby-form-field label="Numeric input">
  <input type="number" kirby-input [size]="size" />
</kirby-form-field>`},ZC=(()=>{let e=class e{constructor(){this.template=ac.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-numeric-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Numeric input"],["type","number","kirby-input","",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var lc={selector:"cookbook-form-field-input-date-example",template:`<kirby-form-field label="Input with date mask *">
  <input kirby-input type="date" [size]="size" />
</kirby-form-field>`},ix=(()=>{let e=class e{constructor(){this.template=lc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-date-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input with date mask *"],["kirby-input","","type","date",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var sc={selector:"cookbook-form-field-input-date-native-example",template:`<kirby-form-field label="Native (platform) date input with default Kirby calendar icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
</kirby-form-field>

<kirby-form-field label="Native (platform) date input with custom icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
  <kirby-icon kirby-affix="suffix" name="overview-outline"/>
</kirby-form-field>`},lx=(()=>{let e=class e{constructor(){this.template=sc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-date-native-example"]],inputs:{size:"size"},decls:5,vars:4,consts:[["label","Native (platform) date input with default Kirby calendar icon"],["kirby-input","","type","date",3,"size","useNativeDatePicker"],["label","Native (platform) date input with custom icon"],["kirby-affix","suffix","name","overview-outline"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r(),n(2,"kirby-form-field",2),p(3,"input",1)(4,"kirby-icon",3),r()),t&2&&(c(),m("size",a.size)("useNativeDatePicker",!0),c(2),m("size",a.size)("useNativeDatePicker",!0))},dependencies:[A,W,M,Hi],encapsulation:2});let i=e;return i})();var cc={selector:"cookbook-form-field-input-disabled-example",template:`<kirby-form-field>
  <input kirby-input [size]="size" disabled value="Disabled input" />
</kirby-form-field>`},dx=(()=>{let e=class e{constructor(){this.template=cc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-disabled-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["kirby-input","","disabled","","value","Disabled input",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field"),p(1,"input",0),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var mc={selector:"cookbook-form-field-input-error-example",template:`<kirby-form-field label="Error" message="This is an error message">
  <input kirby-input [size]="size" hasError="true" />
</kirby-form-field>`},gx=(()=>{let e=class e{constructor(){this.template=mc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-error-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Error","message","This is an error message"],["kirby-input","","hasError","true",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var dc={selector:"cookbook-form-field-input-borderless-example",template:`<kirby-form-field label="Input field with no borders and initial width">
  <input kirby-input [size]="size" borderless="true" />
</kirby-form-field>`},fx=(()=>{let e=class e{constructor(){this.template=dc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-input-borderless-example"]],inputs:{size:"size"},decls:2,vars:1,consts:[["label","Input field with no borders and initial width"],["kirby-input","","borderless","true",3,"size"]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"input",1),r()),t&2&&(c(),m("size",a.size))},dependencies:[A,W],encapsulation:2});let i=e;return i})();var pc=["formfield"],Fr={selector:"cookbook-form-field-focus-example",template:`<kirby-checkbox
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
`},Sx=(()=>{let e=class e{constructor(){this.template=Fr.template,this.codeSnippet=Fr.codeSnippet,this.inputEnabled=!1}onToggleInput(o){this.inputEnabled=o,o&&this.formfield.focus()}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-focus-example"]],viewQuery:function(t,a){if(t&1&&Rt(pc,7),t&2){let g;Vt(g=Wt())&&(a.formfield=g.first)}},inputs:{size:"size"},decls:4,vars:3,consts:[["formfield",""],["text","Enable input",3,"checkedChange","checked"],["kirby-input","","placeholder","Enable to focus (+scroll into view on device)",3,"size","disabled"]],template:function(t,a){if(t&1){let g=P();n(0,"kirby-checkbox",1),b("checkedChange",function(F){return v(g),_(a.onToggleInput(F))}),r(),n(1,"kirby-form-field",null,0),p(3,"input",2),r()}t&2&&(m("checked",a.inputEnabled),c(3),m("size",a.size)("disabled",!a.inputEnabled))},dependencies:[z,A,W],styles:["kirby-checkbox[_ngcontent-%COMP%]{padding-left:16px;padding-right:4px}"]});let i=e;return i})();var uc={selector:"cookbook-form-field-textarea-example",template:`<kirby-form-field>
  <textarea kirby-textarea placeholder="Default textarea with placeholder text"></textarea>
</kirby-form-field>`},Ex=(()=>{let e=class e{constructor(){this.template=uc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-example"]],decls:2,vars:0,consts:[["kirby-textarea","","placeholder","Default textarea with placeholder text"]],template:function(t,a){t&1&&(n(0,"kirby-form-field"),p(1,"textarea",0),r())},dependencies:[A,mt],encapsulation:2});let i=e;return i})();var bc={selector:"cookbook-form-field-textarea-label-example",template:`<kirby-form-field label="Textarea with label">
  <textarea kirby-textarea></textarea>
</kirby-form-field>`},Ox=(()=>{let e=class e{constructor(){this.template=bc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-label-example"]],decls:2,vars:0,consts:[["label","Textarea with label"],["kirby-textarea",""]],template:function(t,a){t&1&&(n(0,"kirby-form-field",0),p(1,"textarea",1),r())},dependencies:[A,mt],encapsulation:2});let i=e;return i})();var gc={selector:"cookbook-form-field-textarea-counter-example",template:`<kirby-form-field>
  <textarea kirby-textarea placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140"></textarea>
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <textarea kirby-textarea value="Character counter with prefilled value" #prefilled maxlength="50"></textarea>
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>`},Ax=(()=>{let e=class e{constructor(){this.template=gc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-counter-example"]],decls:8,vars:2,consts:[["tweet",""],["prefilled",""],["kirby-textarea","","placeholder","Tweet your message (max 140 chars)","maxlength","140"],[3,"listenTo"],["kirby-textarea","","value","Character counter with prefilled value","maxlength","50"]],template:function(t,a){if(t&1&&(n(0,"kirby-form-field"),p(1,"textarea",2,0)(3,"kirby-input-counter",3),r(),n(4,"kirby-form-field"),p(5,"textarea",4,1)(7,"kirby-input-counter",3),r()),t&2){let g=ee(2),y=ee(6);c(3),m("listenTo",g),c(4),m("listenTo",y)}},dependencies:[A,mt,ct],encapsulation:2});let i=e;return i})();var yc={selector:"cookbook-form-field-textarea-counter-form-example",template:`<form [formGroup]="form">
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
</cookbook-example-configuration-wrapper>`},Kx=(()=>{let e=class e{constructor(o){this.fb=o,this.template=yc.template,this.isEnabled=!0,this.form=this.fb.group({message:[""]})}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}resetForm(){this.form.reset()}};e.\u0275fac=function(t){return new(t||e)(x(Ve))},e.\u0275cmp=d({type:e,selectors:[["cookbook-form-field-textarea-counter-form-example"]],decls:10,vars:5,consts:[["message",""],[3,"formGroup"],["kirby-textarea","","placeholder","Enter your message (max 140 chars)","maxlength","140","formControlName","message"],[3,"listenTo"],["text","Form field enabled",3,"checkedChange","checked"],["kirby-button","","attentionLevel","3",3,"click","disabled"],[3,"form"]],template:function(t,a){if(t&1){let g=P();n(0,"form",1)(1,"kirby-form-field"),p(2,"textarea",2,0)(4,"kirby-input-counter",3),r()(),n(5,"cookbook-example-configuration-wrapper")(6,"kirby-checkbox",4),b("checkedChange",function(){return v(g),_(a.toggleEnabled())}),r(),n(7,"button",5),b("click",function(){return v(g),_(a.resetForm())}),s(8," Reset "),r(),p(9,"cookbook-reactive-form-state",6),r()}if(t&2){let g=ee(3);m("formGroup",a.form),c(4),m("listenTo",g),c(2),m("checked",!0),c(),m("disabled",!a.form.get("message").value),c(2),m("form",a.form)}},dependencies:[A,mt,Pe,Me,Ut,ke,Se,Ti,Ee,Te,C,z,qe,Ce,ct],encapsulation:2});let i=e;return i})();var Io=(i,e)=>e.value;function hc(i,e){if(i&1&&(n(0,"option",12),s(1),r()),i&2){let l=e.$implicit,o=h();m("value",Ie(l.value)),Ke("selected",o.spacingSizes===l.value?!0:null),c(),S(" ",l.text," ")}}function kc(i,e){if(i&1&&(n(0,"option",12),s(1),r()),i&2){let l=e.$implicit,o=h();m("value",Ie(l.value)),Ke("selected",o.spacingSizes===l.value?!0:null),c(),S(" ",l.text," ")}}function fc(i,e){if(i&1&&(n(0,"option",12),s(1),r()),i&2){let l=e.$implicit,o=h();m("value",Ie(l.value)),Ke("selected",o.spacingSizes===l.value?!0:null),c(),S(" ",l.text," ")}}var Wx=(()=>{let e=class e{constructor(){this.spacing="",this.rowSpacing="",this.columnSpacing="",this.spacingSizes=[{text:"0",value:"0"},{text:"1",value:"1"},{text:"2",value:"2"},{text:"3",value:"3"},{text:"4",value:"4"},{text:"5",value:"5"}]}onSpacingSizeChange(o){this.spacing=o}onRowSpacingSizeChange(o){this.rowSpacing=o}onColumnSpacingSizeChange(o){this.columnSpacing=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-grid-example"]],decls:70,vars:3,consts:[[1,"grid-example-container"],[1,"kirby-grid"],["xs","8",1,"kirby-grid-item"],["title","xs='8'"],["xs","4",1,"kirby-grid-item"],["title","xs='4'"],["xs","12","sm","8",1,"kirby-grid-item"],["title","xs='12' sm='8'"],["xs","12","sm","4",1,"kirby-grid-item"],["title","xs='12' sm='4'"],[3,"change"],["value",""],[3,"value"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"h2"),s(2,"Basic Grid"),r(),n(3,"div",1)(4,"div",2)(5,"kirby-card"),p(6,"kirby-card-header",3),r()(),n(7,"div",4)(8,"kirby-card"),p(9,"kirby-card-header",5),r()(),n(10,"div",4)(11,"kirby-card"),p(12,"kirby-card-header",5),r()(),n(13,"div",2)(14,"kirby-card"),p(15,"kirby-card-header",3),r()()()(),n(16,"div",0)(17,"h2"),s(18,"Multiple breakpoints"),r(),n(19,"div",1)(20,"div",6)(21,"kirby-card"),p(22,"kirby-card-header",7),r()(),n(23,"div",8)(24,"kirby-card"),p(25,"kirby-card-header",9),r()(),n(26,"div",8)(27,"kirby-card"),p(28,"kirby-card-header",9),r()(),n(29,"div",6)(30,"kirby-card"),p(31,"kirby-card-header",7),r()()()(),n(32,"div",0)(33,"h2"),s(34,"Spacing"),r(),n(35,"fieldset")(36,"legend"),s(37,"Grid Spacing"),r(),n(38,"select",10),b("change",function(y){return a.onSpacingSizeChange(y.target.value)}),n(39,"option",11),s(40,"-"),r(),H(41,hc,2,4,"option",12,Io),r(),n(43,"legend"),s(44,"Grid Row Spacing"),r(),n(45,"select",10),b("change",function(y){return a.onRowSpacingSizeChange(y.target.value)}),n(46,"option",11),s(47,"-"),r(),H(48,kc,2,4,"option",12,Io),r(),n(50,"legend"),s(51,"Grid Column Spacing"),r(),n(52,"select",10),b("change",function(y){return a.onColumnSpacingSizeChange(y.target.value)}),n(53,"option",11),s(54,"-"),r(),H(55,fc,2,4,"option",12,Io),r()(),n(57,"div",1)(58,"div",2)(59,"kirby-card"),p(60,"kirby-card-header",3),r()(),n(61,"div",4)(62,"kirby-card"),p(63,"kirby-card-header",5),r()(),n(64,"div",4)(65,"kirby-card"),p(66,"kirby-card-header",3),r()(),n(67,"div",2)(68,"kirby-card"),p(69,"kirby-card-header",3),r()()()()),t&2&&(c(41),q(a.spacingSizes),c(7),q(a.spacingSizes),c(7),q(a.spacingSizes),c(2),Ke("spacing",a.spacing)("row-spacing",a.rowSpacing)("column-spacing",a.columnSpacing))},dependencies:[T,ce],styles:[".grid-example-container[_ngcontent-%COMP%]{margin-bottom:32px}fieldset[_ngcontent-%COMP%]{margin:24px 0;width:300px}fieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]{display:flex}"]});let i=e;return i})();var Cc=(i,e)=>e.name;function xc(i,e){if(i&1){let l=P();n(0,"div",0)(1,"div",3)(2,"kirby-icon",4),b("click",function(t){let a=v(l).$implicit,g=h();return _(g.onIconClick(t,a))}),r(),n(3,"span",5),s(4),r()()()}if(i&2){let l=e.$implicit,o=h();c(2),m("name",l)("title",l)("themeColor",o.color==null?null:o.color.name),c(2),k(l)}}function vc(i,e){if(i&1){let l=P();n(0,"button",6),b("click",function(){let t=v(l).$implicit,a=h();return _(a.changeColor(t))}),r()}if(i&2){let l=e.$implicit;m("ngClass",l.name)}}var _c={selector:"cookbook-icon-default-example",template:`<div>
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
  `,htmlSnippet:'<kirby-icon name="NAME"></kirby-icon>'},Ot=class Ot{constructor(){this.icons=dn,this.colors=[...Re.brandColors,...Re.notificationColors]}changeColor(e){this.color=e}async onIconClick(e,l){let o=`<kirby-icon name="${l}"></kirby-icon>`;await navigator.clipboard.writeText(o);let t=e.target.closest("kirby-icon");t.classList.add("copied"),window.setTimeout(()=>{t.classList.remove("copied")},1500)}};Ot.htmlSnippet=_c.htmlSnippet,Ot.\u0275fac=function(l){return new(l||Ot)},Ot.\u0275cmp=d({type:Ot,selectors:[["cookbook-icon-default-example"]],decls:12,vars:0,consts:[[1,"icon-item-container"],[1,"color-options"],[3,"ngClass"],[1,"icon-item-inner-container"],[1,"copy-to-clipboard",3,"click","name","title","themeColor"],[1,"icon-item-title"],[3,"click","ngClass"]],template:function(l,o){l&1&&(n(0,"div"),H(1,xc,5,4,"div",0,jo),n(3,"div")(4,"p"),s(5,"Icons automatically inherit the value set via the "),n(6,"code"),s(7,"color"),r(),s(8," css property. You can experiment with various colors for the icons above here:"),r(),n(9,"div",1),H(10,vc,1,1,"button",2,Cc),r()()()),l&2&&(c(),q(o.icons),c(9),q(o.colors))},dependencies:[M,Q,nn],styles:['@keyframes _ngcontent-%COMP%_slide-in-out{0%{opacity:0;transform:translateY(-50%)}10%{opacity:1;transform:translateY(-125%)}90%{opacity:1;transform:translateY(-125%)}to{opacity:0;transform:translateY(-200%)}}[_nghost-%COMP%]{display:block}p[_ngcontent-%COMP%]{margin-top:16px}.icon-item-container[_ngcontent-%COMP%]{width:112px;padding:8px;display:inline-block;text-align:center}.icon-item-inner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;flex-wrap:wrap}.icon-item-title[_ngcontent-%COMP%]{display:block;max-width:112px;font-size:12px;color:#0009;white-space:nowrap}kirby-icon[_ngcontent-%COMP%]{width:100%}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]{transition:transform .2s;cursor:pointer}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:hover{transform:scale(1.2)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:before{display:block;position:absolute;content:"Copied!";background-color:var(--kirby-semi-light);color:var(--kirby-semi-dark-contrast);font-size:10px;padding:2px 4px;border-radius:4px;opacity:0;transform:translateY(-50%)}kirby-icon.copy-to-clipboard.copied[_ngcontent-%COMP%]:before{opacity:1;animation-name:_ngcontent-%COMP%_slide-in-out;animation-duration:1.5s;animation-fill-mode:forwards}.color-options[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.primary[_ngcontent-%COMP%]{background-color:var(--kirby-primary)}button.primary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-primary-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-success)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-success-shade)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-warning)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-warning-shade)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-danger)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-danger-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}']});var Ar=Ot;var wc=(i,e)=>e.key;function Sc(i,e){if(i&1&&(n(0,"div",0)(1,"div",1),p(2,"kirby-icon",2),n(3,"span",3),s(4),r()()()),i&2){let l=e.$implicit;c(2),m("size",l.value)("title",l.value),c(2),k(l.value)}}var Mc={selector:"cookbook-icon-sizes-example",template:`@for (size of sizes | keyvalue; track size.key) {
  <div class="icon-item-container">
    <div class="icon-item-inner-container">
      <kirby-icon name="person" [size]="size.value" [title]="size.value"></kirby-icon>
      <span class="icon-item-title">{{ size.value }}</span>
    </div>
  </div>
}`,htmlSnippet:`<kirby-icon name="person" size="lg"></kirby-icon>
<kirby-icon name="person" size="md"></kirby-icon>
<kirby-icon name="person" size="sm"></kirby-icon>
<kirby-icon name="person" size="xs"></kirby-icon>`},It=class It{constructor(){this.sizes=pn}};It.htmlSnippet=Mc.htmlSnippet,It.\u0275fac=function(l){return new(l||It)},It.\u0275cmp=d({type:It,selectors:[["cookbook-icon-sizes-example"]],decls:3,vars:2,consts:[[1,"icon-item-container"],[1,"icon-item-inner-container"],["name","person",3,"size","title"],[1,"icon-item-title"]],template:function(l,o){l&1&&(H(0,Sc,5,3,"div",0,wc),X(2,"keyvalue")),l&2&&q(se(2,0,o.sizes))},dependencies:[M,_i],styles:['@keyframes _ngcontent-%COMP%_slide-in-out{0%{opacity:0;transform:translateY(-50%)}10%{opacity:1;transform:translateY(-125%)}90%{opacity:1;transform:translateY(-125%)}to{opacity:0;transform:translateY(-200%)}}[_nghost-%COMP%]{display:block}p[_ngcontent-%COMP%]{margin-top:16px}.icon-item-container[_ngcontent-%COMP%]{width:112px;padding:8px;display:inline-block;text-align:center}.icon-item-inner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;flex-wrap:wrap}.icon-item-title[_ngcontent-%COMP%]{display:block;max-width:112px;font-size:12px;color:#0009;white-space:nowrap}kirby-icon[_ngcontent-%COMP%]{width:100%}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]{transition:transform .2s;cursor:pointer}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:hover{transform:scale(1.2)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:before{display:block;position:absolute;content:"Copied!";background-color:var(--kirby-semi-light);color:var(--kirby-semi-dark-contrast);font-size:10px;padding:2px 4px;border-radius:4px;opacity:0;transform:translateY(-50%)}kirby-icon.copy-to-clipboard.copied[_ngcontent-%COMP%]:before{opacity:1;animation-name:_ngcontent-%COMP%_slide-in-out;animation-duration:1.5s;animation-fill-mode:forwards}.color-options[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.primary[_ngcontent-%COMP%]{background-color:var(--kirby-primary)}button.primary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-primary-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-success)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-success-shade)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-warning)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-warning-shade)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-danger)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-danger-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}']});var Lr=It;var zr={selector:"cookbook-icon-custom-example",template:`<div class="icon-item-container">
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
}`},kt=class kt{};kt.codeSnippet=zr.codeSnippet,kt.htmlSnippet=zr.htmlSnippet,kt.\u0275fac=function(l){return new(l||kt)},kt.\u0275cmp=d({type:kt,selectors:[["cookbook-icon-custom-example"]],decls:10,vars:0,consts:[[1,"icon-item-container"],[1,"icon-item-inner-container"],["name","football","title","football"],[1,"icon-item-title"],["name","umbrella","title","umbrella"]],template:function(l,o){l&1&&(n(0,"div",0)(1,"div",1),p(2,"kirby-icon",2),n(3,"span",3),s(4,"football"),r()()(),n(5,"div",0)(6,"div",1),p(7,"kirby-icon",4),n(8,"span",3),s(9,"umbrella"),r()()())},dependencies:[M],styles:['@keyframes _ngcontent-%COMP%_slide-in-out{0%{opacity:0;transform:translateY(-50%)}10%{opacity:1;transform:translateY(-125%)}90%{opacity:1;transform:translateY(-125%)}to{opacity:0;transform:translateY(-200%)}}[_nghost-%COMP%]{display:block}p[_ngcontent-%COMP%]{margin-top:16px}.icon-item-container[_ngcontent-%COMP%]{width:112px;padding:8px;display:inline-block;text-align:center}.icon-item-inner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;flex-wrap:wrap}.icon-item-title[_ngcontent-%COMP%]{display:block;max-width:112px;font-size:12px;color:#0009;white-space:nowrap}kirby-icon[_ngcontent-%COMP%]{width:100%}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]{transition:transform .2s;cursor:pointer}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:hover{transform:scale(1.2)}kirby-icon.copy-to-clipboard[_ngcontent-%COMP%]:before{display:block;position:absolute;content:"Copied!";background-color:var(--kirby-semi-light);color:var(--kirby-semi-dark-contrast);font-size:10px;padding:2px 4px;border-radius:4px;opacity:0;transform:translateY(-50%)}kirby-icon.copy-to-clipboard.copied[_ngcontent-%COMP%]:before{opacity:1;animation-name:_ngcontent-%COMP%_slide-in-out;animation-duration:1.5s;animation-fill-mode:forwards}.color-options[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:var(--kirby-black);cursor:pointer}button.primary[_ngcontent-%COMP%]{background-color:var(--kirby-primary)}button.primary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-primary-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.tertiary[_ngcontent-%COMP%]{background-color:var(--kirby-tertiary)}button.tertiary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-tertiary-shade)}button.success[_ngcontent-%COMP%]{background-color:var(--kirby-success)}button.success[_ngcontent-%COMP%]:hover{background-color:var(--kirby-success-shade)}button.warning[_ngcontent-%COMP%]{background-color:var(--kirby-warning)}button.warning[_ngcontent-%COMP%]:hover{background-color:var(--kirby-warning-shade)}button.danger[_ngcontent-%COMP%]{background-color:var(--kirby-danger)}button.danger[_ngcontent-%COMP%]:hover{background-color:var(--kirby-danger-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}']});var Br=kt;var Tc={selector:"cookbook-simple-item-group-example",template:`<kirby-item-group>
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
`},lv=(()=>{let e=class e{constructor(){this.template=Tc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-simple-item-group-example"]],decls:38,vars:0,consts:[[1,"kirby-text-normal-bold"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-item-group")(1,"kirby-item")(2,"kirby-label")(3,"p",0),s(4,"Title"),r(),n(5,"p",1),s(6,"Detail"),r()(),n(7,"kirby-label",2)(8,"data"),s(9,"Value"),r()()(),n(10,"kirby-item")(11,"kirby-label")(12,"p",0),s(13,"Title"),r(),n(14,"p",1),s(15,"Detail"),r()(),n(16,"kirby-label",2)(17,"data"),s(18,"Value"),r()()()(),n(19,"kirby-item-group")(20,"kirby-item")(21,"kirby-label")(22,"p",0),s(23,"Title"),r(),n(24,"p",1),s(25,"Detail"),r()(),n(26,"kirby-label",2)(27,"data"),s(28,"Value"),r()()(),n(29,"kirby-item")(30,"kirby-label")(31,"p",0),s(32,"Title"),r(),n(33,"p",1),s(34,"Detail"),r()(),n(35,"kirby-label",2)(36,"data"),s(37,"Value"),r()()()())},dependencies:[Ki,f,B],encapsulation:2});let i=e;return i})();var Ec={selector:"cookbook-item-group-with-section-header-example",template:`<kirby-item-group>
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
</kirby-item-group>`},pv=(()=>{let e=class e{constructor(){this.template=Ec.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-group-with-section-header-example"]],decls:44,vars:0,consts:[["heading",""],[1,"kirby-text-normal-bold"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-item-group")(1,"kirby-section-header")(2,"h3",0),s(3,"Item Group"),r()(),n(4,"kirby-item")(5,"kirby-label")(6,"p",1),s(7,"Title"),r(),n(8,"p",2),s(9,"Detail"),r()(),n(10,"kirby-label",3)(11,"data"),s(12,"Value"),r()()(),n(13,"kirby-item")(14,"kirby-label")(15,"p",1),s(16,"Title"),r(),n(17,"p",2),s(18,"Detail"),r()(),n(19,"kirby-label",3)(20,"data"),s(21,"Value"),r()()()(),n(22,"kirby-item-group")(23,"kirby-section-header")(24,"h3",0),s(25,"Item Group"),r()(),n(26,"kirby-item")(27,"kirby-label")(28,"p",1),s(29,"Title"),r(),n(30,"p",2),s(31,"Detail"),r()(),n(32,"kirby-label",3)(33,"data"),s(34,"Value"),r()()(),n(35,"kirby-item")(36,"kirby-label")(37,"p",1),s(38,"Title"),r(),n(39,"p",2),s(40,"Detail"),r()(),n(41,"kirby-label",3)(42,"data"),s(43,"Value"),r()()()())},dependencies:[Ki,Ne,f,B],encapsulation:2});let i=e;return i})();var Pc=(i,e)=>e.value;function Dc(i,e){if(i&1&&(n(0,"kirby-item-sliding",0)(1,"kirby-item"),s(2),r()()),i&2){let l=e.$implicit,o=e.$index,t=h();m("swipeActions",t.getSwipeActions(o)),c(2),k(l.value)}}var $r={selector:"cookbook-item-sliding-conditional-example",template:`<p>{{text}}</p>
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
}`},hv=(()=>{let e=class e{constructor(){this.template=$r.template,this.codeSnippet=$r.codeSnippet,this.text="Nothing was selected",this.items=[{value:"Vestas Wind Systems",isDeleteable:!0},{value:"Cypress Semiconductor Corporation",isDeleteable:!1},{value:"Ultragenyx Pharmaceutical Inc.",isDeleteable:!1},{value:"Astronics Corporation",isDeleteable:!0}]}getSwipeActions(o){let{isDeleteable:t}=this.items[o];return[{title:"edit",type:"success",onSelected:()=>{this.text="Edit was clicked"}},{title:"archive",type:"warning",onSelected:()=>{this.text="Archive was clicked"}},{title:"delete",icon:"trash",onSelected:()=>{this.text="Delete was clicked"},type:"danger",isDisabled:!t}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-item-sliding-conditional-example"]],decls:5,vars:1,consts:[[3,"swipeActions"]],template:function(t,a){t&1&&(n(0,"p"),s(1),r(),n(2,"kirby-list-experimental"),H(3,Dc,3,2,"kirby-item-sliding",0,Pc),r()),t&2&&(c(),k(a.text),c(2),q(a.items))},dependencies:[Jt,Ri,f],encapsulation:2});let i=e;return i})();var Oc={selector:"cookbook-link-example-default",template:`<a class="kirby-text-xsmall" [routerLink]="'/home/changelog'">Extra small</a>
<a class="kirby-text-small" [routerLink]="'/home/changelog'">Small</a>
<a [routerLink]="'/home/changelog'">Normal (default)</a>`},Cv=(()=>{let e=class e{constructor(){this.template=Oc.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-link-example-default"]],decls:6,vars:3,consts:[[1,"kirby-text-xsmall",3,"routerLink"],[1,"kirby-text-small",3,"routerLink"],[3,"routerLink"]],template:function(t,a){t&1&&(n(0,"a",0),s(1,"Extra small"),r(),n(2,"a",1),s(3,"Small"),r(),n(4,"a",2),s(5,"Normal (default)"),r()),t&2&&(m("routerLink","/home/changelog"),c(2),m("routerLink","/home/changelog"),c(2),m("routerLink","/home/changelog"))},dependencies:[Pi],styles:['[_nghost-%COMP%]{display:block;margin-bottom:16px}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{margin-right:16px}.trailing-icon-example[_ngcontent-%COMP%]{background-image:url(/assets/kirby/icons/svg/navigation.svg);background-image:image-set("assets/kirby/icons/svg/navigation.svg");background-repeat:no-repeat;background-position:right 50%;background-size:1.5em;padding-right:calc(1.5em + 4px)}']});let i=e;return i})();var Ic={selector:"cookbook-link-example-new-tab",template:'<a class="kirby-external-icon" target="_blank" href="https://github.com/kirbydesign/designsystem">Kirby on Github</a>'},vv=(()=>{let e=class e{constructor(){this.template=Ic.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-link-example-new-tab"]],decls:2,vars:0,consts:[["target","_blank","href","https://github.com/kirbydesign/designsystem",1,"kirby-external-icon"]],template:function(t,a){t&1&&(pe(0,"a",0),s(1,"Kirby on Github"),le())},styles:['[_nghost-%COMP%]{display:block;margin-bottom:16px}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{margin-right:16px}.trailing-icon-example[_ngcontent-%COMP%]{background-image:url(/assets/kirby/icons/svg/navigation.svg);background-image:image-set("assets/kirby/icons/svg/navigation.svg");background-repeat:no-repeat;background-position:right 50%;background-size:1.5em;padding-right:calc(1.5em + 4px)}']});let i=e;return i})();var Fc=(i,e)=>e.id;function Ac(i,e){if(i&1&&(n(0,"kirby-item")(1,"p"),s(2),r(),n(3,"data",2),s(4),r()()),i&2){let l=e.$implicit;c(2),k(l.title),c(2),k(l.amount)}}var Lc=`<kirby-list-experimental>
  <kirby-section-header outside>
    <h2 heading>Stocks</h2>
  </kirby-section-header>
  @for (item of items; track item.id) {
    <kirby-item>
      <p>{{ item.title }}</p>
      <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
    </kirby-item>
  }
</kirby-list-experimental>`,Ev=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=Lc}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-experimental-items-example"]],features:[E],decls:6,vars:0,consts:[["outside",""],["heading",""],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(n(0,"kirby-list-experimental")(1,"kirby-section-header",0)(2,"h2",1),s(3,"Stocks"),r()(),H(4,Ac,5,2,"kirby-item",null,Fc),r()),t&2&&(c(4),q(a.items))},dependencies:[Ne,f,Jt],encapsulation:2});let i=e;return i})();var zc=(i,e)=>e.id;function Bc(i,e){if(i&1&&(n(0,"kirby-item-sliding",0)(1,"kirby-item")(2,"p"),s(3),r(),n(4,"data",1),s(5),r()()()),i&2){let l=e.$implicit,o=h();m("swipeActions",o.swipeActions),c(3),k(l.title),c(2),k(l.amount)}}var $c=`<kirby-list-experimental>
  @for (item of items; track item.id) {
    <kirby-item-sliding [swipeActions]="swipeActions">
      <kirby-item>
        <p>{{ item.title }}</p>
        <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
      </kirby-item>
    </kirby-item-sliding>
  }
</kirby-list-experimental>`,Av=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=$c,this.swipeActions=[{title:"edit",type:"success",onSelected:()=>{}},{title:"archive",type:"warning",onSelected:()=>{}},{title:"delete",icon:"trash",onSelected:()=>{},type:"danger"}]}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-experimental-sliding-items-example"]],features:[E],decls:3,vars:0,consts:[[3,"swipeActions"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(n(0,"kirby-list-experimental"),H(1,Bc,6,3,"kirby-item-sliding",0,zc),r()),t&2&&(c(),q(a.items))},dependencies:[Ri,f,Jt],encapsulation:2});let i=e;return i})();function Nc(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",3),s(3),r(),n(4,"p",4),s(5),r()(),n(6,"kirby-label",5)(7,"data",6),s(8),r(),n(9,"data",7),s(10),r()()()),i&2){let l=e.$implicit;c(3),S(" ",l.title),c(2),S(" ",l.subTitle),c(2),m("value",l.amount),c(),S(" ",l.amount),c(),m("value",l.detail),c(),S(" ",l.detail)}}var Hv=`<kirby-list 
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
</kirby-list>`,qv=(()=>{let e=class e extends ie{constructor(){super(),this.itemCount=0,this.items.push(...this.generateItems())}onLoadDemand(o){this.itemCount<=20?setTimeout(()=>{this.items.push(...this.generateItems()),o.complete()},2e3):o.complete(!0)}generateItems(){let o=[];for(let a=0;a<10;a++){this.itemCount++;let g={title:`Item ${this.itemCount}`,subTitle:`${Math.round(Math.random()*100)} pcs`,amount:`${Math.round(Math.random()*1e3)} DKK`,detail:Math.round(Math.random()*100)};o.push(g)}return o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-list-load-on-demand-example"]],features:[E],decls:4,vars:1,consts:[["title","Load On Demand"],["noMoreItemsText","No more items",3,"loadOnDemand","items"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-page",0)(1,"kirby-page-content")(2,"kirby-list",1),b("loadOnDemand",function(y){return a.onLoadDemand(y)}),w(3,Nc,11,6,"kirby-item",2),r()()()),t&2&&(c(2),m("items",a.items))},dependencies:[U,R,f,B,N,te],encapsulation:2});let i=e;return i})();var ft=class{constructor(){this.items=[{title:"Holiday with friends",amount:-37445.02325},{title:"Savings",amount:923367.2356},{title:"Expenses",amount:65128.45,shadowAccounts:[{title:"Food",amount:376.12},{title:"Car",amount:62376.12},{title:"Misc",amount:2376.12}]}]}};function Hc(i,e){if(i&1&&(n(0,"kirby-item")(1,"p",2),s(2),r(),n(3,"data",3),s(4),X(5,"currency"),r()()),i&2){let l=e.$implicit;c(2),k(l.title),c(),m("value",l.amount),c(),S(" ",se(5,3,l.amount)," ")}}var qc=`<kirby-list [items]="items" shape="none">
  <kirby-item *kirbyListItemTemplate="let item">
    <p class="kirby-text-normal-bold">{{ item.title }}</p>
    <data [value]="item.amount" slot="end">
      {{ item.amount | currency }}
    </data>
  </kirby-item>
</kirby-list>`,jv=(()=>{let e=class e extends ft{constructor(){super(...arguments),this.template=qc}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-simple-list-no-shape-example"]],features:[E],decls:2,vars:1,consts:[["shape","none",3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-text-normal-bold"],["slot","end",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),w(1,Hc,6,5,"kirby-item",1),r()),t&2&&m("items",a.items)},dependencies:[R,f,N,lt],encapsulation:2});let i=e;return i})();var Kc=()=>["Much cool","Such items","Wow"];function Rc(i,e){if(i&1&&(n(0,"kirby-item")(1,"p",3),s(2),r(),n(3,"data",4),s(4),X(5,"currency"),r()()),i&2){let l=e.$implicit;c(2),k(l.title),c(),m("value",l.amount),c(),k(se(5,3,l.amount))}}var Vc=`<kirby-card>
  <kirby-dropdown class="margin" placeholder="Options" 
  [items]="['Much cool','Such items','Wow']">
  </kirby-dropdown>
  <kirby-list [items]="items" shape="none">
    <kirby-item *kirbyListItemTemplate="let item">
      <p class="kirby-text-normal-bold">{{ item.title }}</p>
      <data [value]="item.amount" slot="end">{{ item.amount | currency }}</data>
    </kirby-item>
  </kirby-list>
</kirby-card>`,i1=(()=>{let e=class e extends ft{constructor(){super(...arguments),this.template=Vc}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-detailed-card-with-list-no-shape-example"]],features:[E],decls:4,vars:3,consts:[["placeholder","Options",1,"margin",3,"items"],["shape","none",3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-text-normal-bold"],["slot","end",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-card"),p(1,"kirby-dropdown",0),n(2,"kirby-list",1),w(3,Rc,6,5,"kirby-item",2),r()()),t&2&&(c(),m("items",D(2,Kc)),c(),m("items",a.items))},dependencies:[T,J,R,f,N,lt],styles:[".margin[_ngcontent-%COMP%]{margin-top:16px;margin-inline:16px}","kirby-card[_ngcontent-%COMP%]{min-height:224px}"]});let i=e;return i})();var Wc=(i,e)=>e.title;function Gc(i,e){i&1&&p(0,"kirby-card-header",2),i&2&&m("flagged","warning")}function Uc(i,e){if(i&1&&(n(0,"kirby-item")(1,"h4"),s(2),r(),n(3,"data",5),s(4),X(5,"currency"),r()()),i&2){let l=e.$implicit;c(2),k(l.title),c(),m("value",l.amount),c(),S(" ",se(5,3,l.amount))}}function jc(i,e){if(i&1&&(n(0,"kirby-card"),O(1,Gc,1,1,"kirby-card-header",2),n(2,"kirby-item")(3,"h4",3),s(4),r(),n(5,"data",4),s(6),X(7,"currency"),r()(),H(8,Uc,6,5,"kirby-item",null,Wc),r()),i&2){let l=e.$implicit;c(),I(l.amount<0?1:-1),c(3),k(l.title),c(),m("value",l.amount),c(),S(" ",se(7,4,l.amount)," "),c(2),q(l.shadowAccounts)}}var Yc=`<kirby-list [items]="items" shape="none" hasItemSpacing="true" [showDivider]="false">
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
`,c1=(()=>{let e=class e extends ft{constructor(){super(...arguments),this.template=Yc}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-multi-card-list-no-shape-example"]],features:[E],decls:2,vars:2,consts:[["shape","none","hasItemSpacing","true",3,"items","showDivider"],[4,"kirbyListItemTemplate"],["title","Account is overdraft",3,"flagged"],[1,"kirby-text-bold"],["slot","end",1,"kirby-text-bold",3,"value"],["slot","end",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),w(1,jc,10,6,"kirby-card",1),r()),t&2&&m("items",a.items)("showDivider",!1)},dependencies:[R,T,f,N,ce,lt],encapsulation:2});let i=e;return i})();function Qc(i,e){if(i&1&&(n(0,"kirby-item")(1,"p",2),s(2),r(),n(3,"data",3),s(4),r()()),i&2){let l=e.$implicit;c(2),k(l.title),c(2),k(l.amount)}}var Jc=`<kirby-list [items]="items" [showDivider]="false">
  <kirby-item *kirbyListItemTemplate="let item">
    <p class="kirby-item-title">{{item.title}}</p>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`,b1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=Jc}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-items-no-dividers-example"]],features:[E],decls:2,vars:2,consts:[[3,"items","showDivider"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),w(1,Qc,5,2,"kirby-item",1),r()),t&2&&m("items",a.items)("showDivider",!1)},dependencies:[R,N,f],encapsulation:2});let i=e;return i})();function Zc(i,e){if(i&1&&(n(0,"kirby-item")(1,"p",2),s(2),r(),n(3,"data",3),s(4),r()()),i&2){let l=e.$implicit;c(2),k(l.title),c(2),k(l.amount)}}var Xc=`<kirby-list [items]="items">
   <kirby-item *kirbyListItemTemplate="let item">
     <p class="kirby-item-title">{{item.title}}</p>
     <data slot="end">{{item.amount}}</data>
   </kirby-item>
</kirby-list>`,f1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=Xc}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-items-example"]],features:[E],decls:2,vars:1,consts:[[3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),w(1,Zc,5,2,"kirby-item",1),r()),t&2&&m("items",a.items)},dependencies:[R,N,f],encapsulation:2});let i=e;return i})();function em(i,e){i&1&&(n(0,"kirby-list-header")(1,"p"),s(2,"Name"),r(),n(3,"p"),s(4,"Value"),r()())}function tm(i,e){if(i&1&&(n(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),s(3),r(),n(4,"p",6),s(5),r()(),n(6,"kirby-label",7)(7,"data",8),s(8),r(),n(9,"data",9),s(10),r()()()),i&2){let l=e.$implicit;m("selectable",!0),c(3),S(" ",l.title),c(2),S(" ",l.subTitle),c(2),m("value",l.amount),c(),S(" ",l.amount),c(),m("value",l.detail),c(),S(" ",l.detail)}}function im(i,e){i&1&&(n(0,"div",10)(1,"p"),s(2,"An appropriate footer"),r(),n(3,"button",11),s(4,"Click me!"),r()())}var om=`<kirby-list 
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
</kirby-list>`,S1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=om}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-header-and-footer-example"]],features:[E],decls:4,vars:1,consts:[[3,"itemSelect","items"],[4,"kirbyListHeader"],[3,"selectable",4,"kirbyListItemTemplate"],["class","footer",4,"kirbyListFooter"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-subtitle"],["slot","end"],[3,"value"],[1,"kirby-item-detail",3,"value"],[1,"footer"],["kirby-button",""]],template:function(t,a){t&1&&(n(0,"kirby-list",0),b("itemSelect",function(y){return a.onItemSelect(y)}),w(1,em,5,0,"kirby-list-header",1)(2,tm,11,7,"kirby-item",2)(3,im,5,0,"div",3),r()),t&2&&m("items",a.items)},dependencies:[R,f,C,B,gn,N,hn,yn],styles:["p[_ngcontent-%COMP%]{margin:0}",".footer[_ngcontent-%COMP%]{text-align:center;width:100%}"]});let i=e;return i})();function nm(i,e){if(i&1&&p(0,"kirby-list-section-header",3),i&2){let l=e.$implicit;m("title",l)}}function rm(i,e){if(i&1&&(n(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),s(3),r(),n(4,"data",6),s(5),r()(),n(6,"kirby-label",7)(7,"data",8),s(8),r()()()),i&2){let l=e.$implicit;m("selectable",!0),c(3),k(l.title),c(),m("value",l.detail),c(),S(" ",l.detail),c(2),m("value",l.amount),c(),S(" ",l.amount)}}var am=`<kirby-list
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
</kirby-list>`,D1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=am}getSectionName(o){return o.detail>0?"Positive":"Negative"}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-sections-example"]],features:[E],decls:3,vars:2,consts:[[3,"itemSelect","items","getSectionName"],[3,"title",4,"kirbyListSectionHeader"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"title"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-detail",3,"value"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),b("itemSelect",function(y){return a.onItemSelect(y)}),w(1,nm,1,1,"kirby-list-section-header",1)(2,rm,9,6,"kirby-item",2),r()),t&2&&m("items",a.items)("getSectionName",a.getSectionName)},dependencies:[R,f,B,zi,Bi,N],encapsulation:2});let i=e;return i})();function lm(i,e){if(i&1&&p(0,"kirby-list-section-header",3),i&2){let l=e.$implicit;m("title",l)}}function sm(i,e){if(i&1&&(n(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),s(3),r(),n(4,"data",6),s(5),r()(),n(6,"kirby-label",7)(7,"data",8),s(8),r()()()),i&2){let l=e.$implicit;m("selectable",!0),c(3),S(" ",l.title),c(),m("value",l.detail),c(),S(" ",l.detail),c(2),m("value",l.amount),c(),S(" ",l.amount)}}var cm=`<kirby-list
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
</kirby-list>`,L1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=cm}getSectionName(o){return o.detail>0?"Positive":"Negative"}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-sections-and-stand-alone-example"]],features:[E],decls:3,vars:4,consts:[[3,"itemSelect","items","getStandAloneByProperty","getSectionName","standAloneSpacing"],[3,"title",4,"kirbyListSectionHeader"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"title"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-detail",3,"value"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),b("itemSelect",function(y){return a.onItemSelect(y)}),w(1,lm,1,1,"kirby-list-section-header",1)(2,sm,9,6,"kirby-item",2),r()),t&2&&m("items",a.items)("getStandAloneByProperty","isStandAlone")("getSectionName",a.getSectionName)("standAloneSpacing","xxs")},dependencies:[R,B,f,zi,Bi,N],encapsulation:2});let i=e;return i})();function mm(i,e){if(i&1&&(n(0,"kirby-item",2)(1,"p",3),s(2),r(),n(3,"data",4),s(4),r()()),i&2){let l=e.$implicit;m("selectable",!0),c(2),k(l.title),c(2),S(" ",l.amount)}}var dm=`<kirby-list 
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
</kirby-list>`,H1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=dm}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-selectable-items-example"]],features:[E],decls:2,vars:1,consts:[[3,"itemSelect","items"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"selectable"],[1,"kirby-item-title"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),b("itemSelect",function(y){return a.onItemSelect(y)}),w(1,mm,5,3,"kirby-item",1),r()),t&2&&m("items",a.items)},dependencies:[R,f,N],encapsulation:2});let i=e;return i})();function pm(i,e){if(i&1&&(n(0,"kirby-item",2)(1,"kirby-label")(2,"p",3),s(3),r(),n(4,"data",4),s(5),r()(),n(6,"kirby-label",5)(7,"data",6),s(8),r()()()),i&2){let l=e.$implicit;m("selectable",!0),c(3),S(" ",l.title),c(),m("value",l.detail),c(),S(" ",l.detail),c(2),m("value",l.amount),c(),S(" ",l.amount)}}var um=`<kirby-list
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
</kirby-list>`,W1=(()=>{let e=class e extends ie{constructor(){super(...arguments),this.template=um}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-list-with-stand-alone-example"]],features:[E],decls:2,vars:3,consts:[[3,"itemSelect","items","getStandAloneByProperty","standAloneSpacing"],[3,"selectable",4,"kirbyListItemTemplate"],[3,"selectable"],[1,"kirby-item-title"],[1,"kirby-item-detail",3,"value"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-list",0),b("itemSelect",function(y){return a.onItemSelect(y)}),w(1,pm,9,6,"kirby-item",1),r()),t&2&&m("items",a.items)("getStandAloneByProperty","isStandAlone")("standAloneSpacing","xxs")},dependencies:[R,f,B,N],encapsulation:2});let i=e;return i})();function bm(i,e){i&1&&p(0,"div",3)}function gm(i,e){i&1&&p(0,"div",4)}function ym(i,e){if(i&1&&(n(0,"kirby-item")(1,"div",2),O(2,bm,1,0,"div",3),O(3,gm,1,0,"div",4),r(),n(4,"h3"),s(5),r(),n(6,"data",5),s(7),r()()),i&2){let l=e.$implicit;c(2),I(l.flagged?2:-1),c(),I(l.archived?3:-1),c(2),k(l.title),c(2),k(l.amount)}}var Y1=(()=>{let e=class e{constructor(o){this.toastController=o,this.items=[{id:0,title:"Vestas Wind Systems",subTitle:"2000 pcs",amount:"5.587.218.309 DKK",detail:225,archived:!0,flagged:!1,color:"default"},{id:1,title:"Cypress Semiconductor Corporation",subTitle:"1827 pcs",amount:"76.980 DKK",detail:-3,flagged:!0,deleted:!0,color:"light"},{id:2,title:"Ultragenyx Pharmaceutical Inc.",subTitle:"787 pcs",amount:"83.004 DKK",detail:-115,color:"white"},{id:3,title:"Trans World Entertainment Corp. [disabled]",subTitle:"467 pcs",amount:"60.963 DKK",detail:6,color:"light"},{id:4,title:"Astronics Corporation",subTitle:"791 pcs",amount:"33.830 DKK",detail:-154,color:"white"},{id:5,title:"Riverview Bancorp Inc",subTitle:"206 pcs",amount:"60.775 DKK",detail:98,color:"light"},{id:6,title:"Haemonetics Corporation",subTitle:"988 pcs",amount:"61.196 DKK",detail:220,color:"white"},{id:7,title:"PJT Partners Inc.",subTitle:"1706 pcs",amount:"52.441 DKK",detail:129,color:"light"}],this.swipeActions=[{position:"left",title:"Archive",type:"warning",onSelected:t=>this.onArchiveItem(t),isDisabled:t=>t.archived||t.id===3},{position:"left",title:t=>t.flagged?"Remove flag":"Flag",icon:t=>t.flagged?null:"flag",type:"success",onSelected:t=>this.onFlagItem(t),isDisabled:t=>t.id===3},{position:"right",title:t=>t.deleted?"Restore":"Delete",icon:t=>t.deleted?"swap":"trash",type:t=>t.deleted?"warning":"danger",onSelected:t=>t.deleted?this.onRestoreItem(t):this.onDeleteItem(t),isDisabled:t=>t.id===3}]}onArchiveItem(o){o.archived=!o.archived;let t={message:`Item '${o.title}' has been archived.`,messageType:"warning",durationInMs:1500};this.toastController.showToast(t)}onFlagItem(o){o.flagged=!o.flagged;let t=o.flagged?"flagged":"un-flagged",a={message:`Item '${o.title}' has been ${t}.`,messageType:"success",durationInMs:1500};this.toastController.showToast(a)}onDeleteItem(o){o.deleted=!o.deleted;let t={message:`Item '${o.title}' has been deleted.`,messageType:"warning",durationInMs:1500};this.toastController.showToast(t)}onRestoreItem(o){o.deleted=!o.deleted;let t={message:`Item '${o.title}' has been restored.`,messageType:"warning",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-list-swipe-example"]],decls:4,vars:2,consts:[["showDivider","true",3,"items","swipeActions"],[4,"kirbyListItemTemplate"],["slot","outside"],[1,"flag","success"],[1,"flag","warning"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(n(0,"h2"),s(1,"List with swipe actions:"),r(),n(2,"kirby-list",0),w(3,ym,8,4,"kirby-item",1),r()),t&2&&(c(2),m("items",a.items)("swipeActions",a.swipeActions))},dependencies:[R,f,N],styles:["[_nghost-%COMP%]{display:block;height:100%;padding:16px;background-color:var(--kirby-background-color)}.flag[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%}.flag.success[_ngcontent-%COMP%]{background:var(--kirby-success)}.flag.warning[_ngcontent-%COMP%]{background:var(--kirby-warning)}.flag[_ngcontent-%COMP%]:not(:last-child){margin-bottom:2px}"]});let i=e;return i})();var X1=(()=>{let e=class e{constructor(){this.isLoading=!1,this.showBackdrop=!1,this.hideContent=!1}showWrapperLoadingOverlay(o,t){this.showBackdrop=o,this.hideContent=t,this.isLoading=!0,setTimeout(()=>{this.isLoading=!1},5e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-loading-overlay-example"]],decls:7,vars:3,consts:[[3,"isLoading","showBackdrop","hideContent"],["kirby-button","","attentionLevel","2","size","lg","expand","block",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-loading-overlay",0)(1,"button",1),b("click",function(){return a.showWrapperLoadingOverlay(!0)}),s(2," Show wrapper loading overlay "),r(),n(3,"button",1),b("click",function(){return a.showWrapperLoadingOverlay(!1,!0)}),s(4," Show wrapper loading overlay that hides content "),r(),n(5,"button",1),b("click",function(){return a.showWrapperLoadingOverlay(!1)}),s(6," Show wrapper loading overlay without backdrop "),r()()),t&2&&m("isLoading",a.isLoading)("showBackdrop",a.showBackdrop)("hideContent",a.hideContent)},dependencies:[Ii,C],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}button[kirby-button][_ngcontent-%COMP%]{margin-left:0;margin-right:0}"]});let i=e;return i})();var Nr=(i,e)=>e.text;function km(i,e){if(i&1&&(n(0,"a",1),s(1),r()),i&2){let l=h().$implicit;m("routerLink",l.route)("target",l.target),c(),S(" ",l.text," ")}}function fm(i,e){if(i&1&&s(0),i&2){let l=h().$implicit;S(" ",l.text," ")}}function Cm(i,e){if(i&1&&(n(0,"li",2)(1,"a",3),s(2),r()()),i&2){let l=e.$implicit;c(),m("routerLink",l.route)("target",l.target),c(),S(" ",l.text," ")}}function xm(i,e){if(i&1&&(n(0,"ul"),H(1,Cm,3,3,"li",2,Nr),r()),i&2){let l=h().$implicit;c(),q(l.steps)}}function vm(i,e){if(i&1&&(n(0,"li"),O(1,km,2,3,"a",1),O(2,fm,1,1),O(3,xm,3,0,"ul"),r()),i&2){let l=e.$implicit,o=e.$index,t=h();G("active",t.currentStep-1===o&&!l.steps),c(),I(o===t.currentStep-1&&l.route?1:-1),c(),I(o!==t.currentStep-1||o===t.currentStep-1&&!l.route?2:-1),c(),I(t.currentStep-1===o&&l.steps?3:-1)}}var Hr=(()=>{let e=class e{constructor(o){this.route=o,this.steps=[{text:"Open the example in a separate tab or window",steps:[{text:"Controller based example",route:"/examples/modal-with-guard",target:"_blank"},{text:"Route based example",route:["/examples/modal-route-with-guard"],target:"_blank"}]},{text:"Navigate to the guard protected route",route:void 0},{text:"Click the browser back button"}],this.currentStep=1}ngOnInit(){this.route.snapshot.data.step&&(this.currentStep=this.route.snapshot.data.step),this.route.snapshot.data.nextRoute&&(this.steps[this.currentStep-1].route=this.route.snapshot.data.nextRoute)}};e.\u0275fac=function(t){return new(t||e)(x(Ei))},e.\u0275cmp=d({type:e,selectors:[["cookbook-modal-example-alert-with-guard-stepper"]],inputs:{currentStep:"currentStep"},decls:3,vars:0,consts:[[3,"active"],[3,"routerLink","target"],[1,"active"],[1,"kirby-external-icon",3,"routerLink","target"]],template:function(t,a){t&1&&(n(0,"ol"),H(1,vm,4,5,"li",0,Nr),r()),t&2&&(c(),q(a.steps))},dependencies:[Pi,xe],styles:["[_nghost-%COMP%]{display:block}li.active[_ngcontent-%COMP%]{font-weight:700}"]});let i=e;return i})();var lo=(()=>{let e=class e{constructor(o){this.modal=o}onHideModal(){this.modal.close()}};e.\u0275fac=function(t){return new(t||e)(x(Yt,12))},e.\u0275cmp=d({type:e,selectors:[["ng-component"]],decls:3,vars:0,consts:[["iconName","close","title","Out of service","subtitle","The system is currently down. Please contact customer support.","themeColor","danger"],["kirby-button","","attentionLevel","3",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-empty-state",0)(1,"button",1),b("click",function(){return a.onHideModal()}),s(2,"Hide modal"),r()())},dependencies:[We,Q,C],encapsulation:2});let i=e;return i})();function wm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",11),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleDummyKeyboard(t))}),r()}if(i&2){let l=h();m("checked",l.showDummyKeyboard&&!l.interactWithBackground)("disabled",l.interactWithBackground||l.disabled)}}function Sm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",12),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleShowPageProgress(t))}),r()}if(i&2){let l=h();m("checked",l.showPageProgress&&!l.interactWithBackground)("disabled",l.interactWithBackground||l.disabled)}}function Mm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",13),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleShowFooter(t))}),r()}if(i&2){let l=h();m("checked",l.showFooter&&!l.interactWithBackground)("disabled",l.interactWithBackground||l.disabled)}}function Tm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",14),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleDisplayFooterAsInline(t))}),r()}if(i&2){let l=h();m("checked",l.displayFooterAsInline)("disabled",l.disabled||!l.showFooter)}}function Em(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",15),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleSnapFooterToKeyboard(t))}),r()}if(i&2){let l=h();m("checked",l.snapFooterToKeyboard)("disabled",l.disabled||!l.showFooter)}}function Pm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",16),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleDisableScroll(t))}),r()}if(i&2){let l=h();m("checked",l.disableScroll)("disabled",l.disabled)}}function Dm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",17),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleShowDummyContent(t))}),r()}if(i&2){let l=h();m("checked",l.showDummyContent)("disabled",l.interactWithBackground||l.disabled)}}function Om(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",18),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleDelayLoadDummyContent(t))}),r()}if(i&2){let l=h();m("checked",l.delayLoadDummyContent&&!l.interactWithBackground)("disabled",!l.showDummyContent||l.interactWithBackground||l.disabled)}}function Im(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",19),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleLoadAdditionalContent(t))}),r()}if(i&2){let l=h();m("checked",l.loadAdditionalContent&&!l.interactWithBackground)("disabled",!l.showDummyContent||l.interactWithBackground||l.disabled)}}function Fm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",20),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleCollapseTitle(t))}),r()}if(i&2){let l=h();m("checked",l.collapseTitle)("disabled",l.disabled)}}function Am(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",21),b("checkedChange",function(t){v(l);let a=h();return _(a.toggleAlertBeforeClose(t))}),r()}if(i&2){let l=h();m("checked",l.alertBeforeClose)("disabled",l.disabled)}}function Lm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",25),b("checkedChange",function(t){v(l);let a=h(2);return _(a.toggleInteractWithBackground(t))}),r()}if(i&2){let l=h(2);m("checked",l.interactWithBackground)("disabled",l.disabled)}}function zm(i,e){if(i&1){let l=P();n(0,"kirby-checkbox",26),b("checkedChange",function(t){v(l);let a=h(2);return _(a.toggleCustomCssClass(t))}),r()}if(i&2){let l=h(2);m("checked",l.customCssClass)("disabled",l.disabled)}}function Bm(i,e){if(i&1&&(p(0,"kirby-divider",22),n(1,"p"),s(2,"Custom modal/drawer:"),r(),O(3,Lm,1,2,"kirby-checkbox",23),O(4,zm,1,2,"kirby-checkbox",24)),i&2){let l=h();m("hasMargin",!0),c(3),I(l.interactWithBackground!==void 0?3:-1),c(),I(l.customCssClass!==void 0?4:-1)}}var so=(()=>{let e=class e{constructor(o){this.windowRef=o,this.showDummyKeyboardChange=new ge,this.showPageProgressChange=new ge,this.collapseTitleChange=new ge,this.alertBeforeCloseChange=new ge,this.showFooterChange=new ge,this.displayFooterAsInlineChange=new ge,this.showDummyContentChange=new ge,this.delayLoadDummyContentChange=new ge,this.loadAdditionalContentChange=new ge,this.disableScrollChange=new ge,this.interactWithBackgroundChange=new ge,this.customCssClassChange=new ge,this.snapFooterToKeyboardChange=new ge,this.preventChangeEvent=!1}toggleDummyKeyboard(o){let t="kirby-cookbook-show-dummy-keyboard";this.showDummyKeyboard=o,this.showDummyKeyboard?this.windowRef.nativeWindow.sessionStorage.setItem(t,"true"):this.windowRef.nativeWindow.sessionStorage.removeItem(t),setTimeout(()=>this.windowRef.nativeWindow.dispatchEvent(new CustomEvent("kirbyToggleDummyKeyboard",{detail:this.showDummyKeyboard})))}_onToggleDummyKeyboard(o){this.showDummyKeyboard!==void 0&&(this.showDummyKeyboard=o)}toggleShowPageProgress(o){this.preventChangeEvent||(this.showPageProgress=o,this.showPageProgressChange.emit(this.showPageProgress))}toggleShowFooter(o){this.preventChangeEvent||(this.showFooter=o,this.showFooterChange.emit(this.showFooter))}toggleDisplayFooterAsInline(o){this.preventChangeEvent||(this.displayFooterAsInline=o,this.displayFooterAsInlineChange.emit(this.displayFooterAsInline))}toggleCollapseTitle(o){this.preventChangeEvent||(this.collapseTitle=o,this.collapseTitleChange.emit(this.collapseTitle))}toggleAlertBeforeClose(o){this.preventChangeEvent||(this.alertBeforeClose=o,this.alertBeforeCloseChange.emit(this.alertBeforeClose))}toggleShowDummyContent(o){this.showDummyContent=o,this.showDummyContentChange.emit(this.showDummyContent)}toggleDelayLoadDummyContent(o){this.preventChangeEvent||(this.delayLoadDummyContent=o,this.delayLoadDummyContentChange.emit(this.delayLoadDummyContent))}toggleLoadAdditionalContent(o){this.preventChangeEvent||(this.loadAdditionalContent=o,this.loadAdditionalContentChange.emit(this.loadAdditionalContent))}toggleDisableScroll(o){this.preventChangeEvent||(this.disableScroll=o,this.disableScrollChange.emit(this.disableScroll))}toggleInteractWithBackground(o){this.preventChangeEvent=!0,this.interactWithBackground=o,this.toggleCustomCssClass(o),o&&this.toggleShowDummyContent(!0),this.interactWithBackgroundChange.emit(o),setTimeout(()=>this.preventChangeEvent=!1)}toggleCustomCssClass(o){this.customCssClass=o,this.customCssClassChange.emit(o)}toggleSnapFooterToKeyboard(o){this.snapFooterToKeyboard=o,this.snapFooterToKeyboardChange.emit(o)}};e.\u0275fac=function(t){return new(t||e)(x(Di))},e.\u0275cmp=d({type:e,selectors:[["cookbook-modal-example-configuration"]],hostBindings:function(t,a){t&1&&b("kirbyToggleDummyKeyboard",function(y){return a._onToggleDummyKeyboard(y.detail)},Uo)},inputs:{disabled:"disabled",flavor:"flavor",showDummyKeyboard:"showDummyKeyboard",showPageProgress:"showPageProgress",collapseTitle:"collapseTitle",alertBeforeClose:"alertBeforeClose",showFooter:"showFooter",displayFooterAsInline:"displayFooterAsInline",showDummyContent:"showDummyContent",delayLoadDummyContent:"delayLoadDummyContent",loadAdditionalContent:"loadAdditionalContent",disableScroll:"disableScroll",interactWithBackground:"interactWithBackground",customCssClass:"customCssClass",snapFooterToKeyboard:"snapFooterToKeyboard"},outputs:{showDummyKeyboardChange:"showDummyKeyboardChange",showPageProgressChange:"showPageProgressChange",collapseTitleChange:"collapseTitleChange",alertBeforeCloseChange:"alertBeforeCloseChange",showFooterChange:"showFooterChange",displayFooterAsInlineChange:"displayFooterAsInlineChange",showDummyContentChange:"showDummyContentChange",delayLoadDummyContentChange:"delayLoadDummyContentChange",loadAdditionalContentChange:"loadAdditionalContentChange",disableScrollChange:"disableScrollChange",interactWithBackgroundChange:"interactWithBackgroundChange",customCssClassChange:"customCssClassChange",snapFooterToKeyboardChange:"snapFooterToKeyboardChange"},decls:12,vars:12,consts:[["text","Show dummy keyboard","size","xs",3,"checked","disabled"],["text","Show page progress (modal only)","size","xs",3,"checked","disabled"],["text","Show footer","size","xs",3,"checked","disabled"],["text","Display footer as inline","size","xs",1,"indent",3,"checked","disabled"],["text","Snap footer to keyboard","size","xs",1,"indent",3,"checked","disabled"],["text","Disable scroll","size","xs",3,"checked","disabled"],["text","Show dummy content","size","xs",3,"checked","disabled"],["text","Delay load modal","size","xs",1,"indent",3,"checked","disabled"],["text","Delay load additional","size","xs",1,"indent",3,"checked","disabled"],["text","Collapse title","size","xs",3,"checked","disabled"],["text","Alert before closing","size","xs",3,"checked","disabled"],["text","Show dummy keyboard","size","xs",3,"checkedChange","checked","disabled"],["text","Show page progress (modal only)","size","xs",3,"checkedChange","checked","disabled"],["text","Show footer","size","xs",3,"checkedChange","checked","disabled"],["text","Display footer as inline","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Snap footer to keyboard","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Disable scroll","size","xs",3,"checkedChange","checked","disabled"],["text","Show dummy content","size","xs",3,"checkedChange","checked","disabled"],["text","Delay load modal","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Delay load additional","size","xs",1,"indent",3,"checkedChange","checked","disabled"],["text","Collapse title","size","xs",3,"checkedChange","checked","disabled"],["text","Alert before closing","size","xs",3,"checkedChange","checked","disabled"],[3,"hasMargin"],["text","Interact with background (drawer only)","size","xs",3,"checked","disabled"],["text","Add custom CSS class","size","xs",3,"checked","disabled"],["text","Interact with background (drawer only)","size","xs",3,"checkedChange","checked","disabled"],["text","Add custom CSS class","size","xs",3,"checkedChange","checked","disabled"]],template:function(t,a){t&1&&(O(0,wm,1,2,"kirby-checkbox",0),O(1,Sm,1,2,"kirby-checkbox",1),O(2,Mm,1,2,"kirby-checkbox",2),O(3,Tm,1,2,"kirby-checkbox",3),O(4,Em,1,2,"kirby-checkbox",4),O(5,Pm,1,2,"kirby-checkbox",5),O(6,Dm,1,2,"kirby-checkbox",6),O(7,Om,1,2,"kirby-checkbox",7),O(8,Im,1,2,"kirby-checkbox",8),O(9,Fm,1,2,"kirby-checkbox",9),O(10,Am,1,2,"kirby-checkbox",10),O(11,Bm,5,3)),t&2&&(I(a.showDummyKeyboard!==void 0?0:-1),c(),I(a.showPageProgress!==void 0&&(a.flavor===void 0||a.flavor==="modal")?1:-1),c(),I(a.showFooter!==void 0?2:-1),c(),I(a.displayFooterAsInline!==void 0?3:-1),c(),I(a.snapFooterToKeyboard!==void 0?4:-1),c(),I(a.disableScroll!==void 0?5:-1),c(),I(a.showDummyContent!==void 0?6:-1),c(),I(a.delayLoadDummyContent!==void 0?7:-1),c(),I(a.loadAdditionalContent!==void 0?8:-1),c(),I(a.collapseTitle!==void 0?9:-1),c(),I(a.alertBeforeClose!==void 0?10:-1),c(),I(a.interactWithBackground!==void 0||a.customCssClass!==void 0?11:-1))},dependencies:[z,st],styles:["kirby-checkbox[_ngcontent-%COMP%]:not(:first-of-type){margin-top:4px}kirby-checkbox.indent[_ngcontent-%COMP%]{margin-left:32px;margin-top:4px}p[_ngcontent-%COMP%]{margin:0;font-size:14px}"]});let i=e;return i})();var $m=(i,e)=>e.value||e.text;function Nm(i,e){if(i&1&&(n(0,"kirby-item",1),p(1,"kirby-radio",2),n(2,"kirby-label"),s(3),r()()),i&2){let l=e.$implicit;c(),m("value",l),c(2),k(l.text)}}var Ft=(()=>{let e=class e{constructor(){this.modalSizeOptions=[{text:"Small",value:"small"},{text:"Medium (default)",value:"medium"},{text:"Large",value:"large"},{text:"Full height (medium width only)",value:"full-height"}],this.size=this.modalSizeOptions[1],this.sizeChange=new ge}onValueChange(o){this.size=o,this.sizeChange.emit(this.size)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-modal-example-size-selector"]],outputs:{sizeChange:"sizeChange"},decls:3,vars:1,consts:[[3,"valueChange","value"],["size","xs"],["slot","start",3,"value"]],template:function(t,a){t&1&&(n(0,"kirby-radio-group",0),b("valueChange",function(y){return a.onValueChange(y)}),H(1,Nm,4,2,"kirby-item",1,$m),r()),t&2&&(m("value",a.size),c(),q(a.modalSizeOptions))},dependencies:[ve,f,de],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();function Hm(i,e){i&1&&(n(0,"kirby-page-progress")(1,"kirby-progress-circle",4),s(2," 2/4 "),r()())}function qm(i,e){if(i&1){let l=P();p(0,"kirby-divider",8),n(1,"p",9),s(2," Size of nested modal/drawer "),p(3,"br"),n(4,"em"),s(5,"(on screens larger than 768px)"),r()(),n(6,"cookbook-modal-example-size-selector",10),b("sizeChange",function(t){v(l);let a=h(3);return _(a.setSelectedModalSize(t))}),r()}i&2&&m("hasMargin",!0)}function Km(i,e){if(i&1){let l=P();n(0,"kirby-card",5)(1,"h3"),s(2,"Open nested:"),r(),n(3,"button",6),b("click",function(){v(l);let t=h(2);return _(t.showNestedModal())}),s(4,"Modal"),r(),n(5,"button",6),b("click",function(){v(l);let t=h(2);return _(t.showNestedDrawer())}),s(6,"Drawer"),r(),n(7,"button",6),b("click",function(){v(l);let t=h(2);return _(t.showNestedAlert())}),s(8,"Alert"),r(),n(9,"button",6),b("click",function(){v(l);let t=h(2);return _(t.showNestedActionSheet())}),s(10," Action sheet "),r(),n(11,"details")(12,"summary"),s(13,"Configuration for nested modal"),r(),n(14,"cookbook-modal-example-configuration",7),Ae("showPageProgressChange",function(t){v(l);let a=h(2);return K(a.showNestedPageProgress,t)||(a.showNestedPageProgress=t),_(t)})("showFooterChange",function(t){v(l);let a=h(2);return K(a.showNestedFooter,t)||(a.showNestedFooter=t),_(t)})("snapFooterToKeyboardChange",function(t){v(l);let a=h(2);return K(a.snapNestedFooterToKeyboard,t)||(a.snapNestedFooterToKeyboard=t),_(t)})("displayFooterAsInlineChange",function(t){v(l);let a=h(2);return K(a.displayNestedFooterAsInline,t)||(a.displayNestedFooterAsInline=t),_(t)})("showDummyContentChange",function(t){v(l);let a=h(2);return K(a.showNestedDummyContent,t)||(a.showNestedDummyContent=t),_(t)})("collapseTitleChange",function(t){v(l);let a=h(2);return K(a.showNestedCollapseTitle,t)||(a.showNestedCollapseTitle=t),_(t)})("delayLoadDummyContentChange",function(t){v(l);let a=h(2);return K(a.delayLoadDummyContent,t)||(a.delayLoadDummyContent=t),_(t)})("loadAdditionalContentChange",function(t){v(l);let a=h(2);return K(a.loadAdditionalContent,t)||(a.loadAdditionalContent=t),_(t)}),r(),O(15,qm,7,1),r()()}if(i&2){let l=h(2);c(14),Fe("showPageProgress",l.showNestedPageProgress)("showFooter",l.showNestedFooter)("snapFooterToKeyboard",l.snapNestedFooterToKeyboard)("displayFooterAsInline",l.displayNestedFooterAsInline)("showDummyContent",l.showNestedDummyContent)("collapseTitle",l.showNestedCollapseTitle)("delayLoadDummyContent",l.delayLoadDummyContent)("loadAdditionalContent",l.loadAdditionalContent),c(),I(l.showModalSizeSelector!==void 0?15:-1)}}function Rm(i,e){i&1&&(n(0,"div")(1,"h4"),s(2,"The standard Lorem Ipsum passage, used since the 1500s"),r(),n(3,"p"),s(4,' "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." '),r()())}function Vm(i,e){if(i&1&&(n(0,"div",11)(1,"h4"),s(2,"Component properties (injected from parent component):"),r(),n(3,"dl")(4,"dt")(5,"code"),s(6,"stringProperty:"),r()(),n(7,"dd"),s(8),r(),n(9,"dt")(10,"code"),s(11,"numberProperty:"),r()(),n(12,"dd"),s(13),r(),n(14,"dt")(15,"code"),s(16,"booleanProperty:"),r()(),n(17,"dd"),s(18),r()()()),i&2){let l=h(3);c(8),k(l.exampleProperties.stringProperty),c(5),k(l.exampleProperties.numberProperty),c(5),k(l.exampleProperties.booleanProperty)}}function Wm(i,e){i&1&&(n(0,"div")(1,"h4"),s(2,' Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC '),r(),n(3,"p"),s(4,' "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" 1914 translation by H. Rackham " '),r()())}function Gm(i,e){if(i&1){let l=P();n(0,"button",12),b("click",function(){v(l);let t=h(3);return _(t.scrollToTop())}),s(1," Scroll to top "),p(2,"kirby-icon",17),r()}}function Um(i,e){if(i&1){let l=P();O(0,Vm,19,3,"div",11),n(1,"button",12),b("click",function(){v(l);let t=h(2);return _(t.scrollToBottom())}),s(2," Scroll to bottom "),p(3,"kirby-icon",13),r(),n(4,"button",14),b("click",function(){v(l);let t=h(2);return _(t.close())}),s(5,"Hide me"),r(),n(6,"kirby-form-field"),p(7,"input",15),r(),n(8,"h4"),s(9,"The standard Lorem Ipsum passage, used since the 1500s"),r(),n(10,"p"),s(11,' "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." '),r(),n(12,"kirby-loading-overlay",2),O(13,Wm,5,0,"div"),r(),O(14,Gm,3,0,"button",16)}if(i&2){let l=h(2);I(l.exampleProperties?0:-1),c(12),m("isLoading",l.isLoadingAdditionalContent),c(),I(l.isLoadingAdditionalContent?-1:13),c(),I(l.showFooter?-1:14)}}function jm(i,e){if(i&1&&(n(0,"div"),O(1,Km,16,9,"kirby-card",5),O(2,Rm,5,0,"div"),O(3,Um,15,4),r()),i&2){let l=h();c(),I(l.showNestedOptions?1:-1),c(),I(l.showStaticDummyContent?2:-1),c(),I(l.showDummyContent?3:-1)}}function Ym(i,e){if(i&1){let l=P();n(0,"kirby-modal-footer",3)(1,"div")(2,"button",12),b("click",function(){v(l);let t=h();return _(t.scrollToTop())}),s(3," To top "),p(4,"kirby-icon",17),r(),n(5,"button",14),b("click",function(){v(l);let t=h();return _(t.close())}),s(6,"Close"),r()()()}if(i&2){let l=h();m("type",l._footerType)("snapToKeyboard",l.snapFooterToKeyboard)}}var co=(()=>{let e=class e{get _footerType(){return this.displayFooterAsInline?"inline":"fixed"}constructor(o,t,a,g){this.modalController=t,this.toastController=a,this.modal=g,this.showPageProgress=!1,this.showFooter=!1,this.snapFooterToKeyboard=!1,this.displayFooterAsInline=!1,this.showNestedPageProgress=!1,this.showNestedFooter=!1,this.snapNestedFooterToKeyboard=!1,this.showNestedDummyContent=!1,this.displayNestedFooterAsInline=!1,this.isLoading=!1,this.isLoadingAdditionalContent=!1,Object.assign(this,o)}ngOnInit(){this.showDummyContent&&(this.delayLoadDummyContent&&(this.isLoading=!0,setTimeout(()=>this.isLoading=!1,1e3)),this.loadAdditionalContent&&(this.isLoadingAdditionalContent=!0,setTimeout(()=>this.isLoadingAdditionalContent=!1,2e3))),this.modal.canDismiss=()=>this.canDismiss()}canDismiss(){return this.alertBeforeClose?{title:"Are you sure you want to close?",okBtn:"Yes",cancelBtn:"Take me back",icon:{name:"warning",themeColor:"warning"}}:!0}showNestedOverlay(o){let t=o==="modal"?"Nested Modal Title":"Nested Drawer Title",a={flavor:o,drawerSupplementaryAction:{iconName:"edit",action:this.onSupplementaryActionSelect.bind(this)},component:e,size:this.selectedModalSize,collapseTitle:this.showNestedCollapseTitle,componentProps:{title:t,subtitle:"Hello from second embedded example component!",flavor:o,delayLoadDummyContent:this.delayLoadDummyContent,loadAdditionalContent:this.loadAdditionalContent,showPageProgress:this.showNestedPageProgress,showFooter:this.showNestedFooter,snapFooterToKeyboard:this.snapNestedFooterToKeyboard,displayFooterAsInline:this.displayNestedFooterAsInline,showDummyContent:this.showNestedDummyContent}};this.modalController.showModal(a)}showNestedModal(){this.showNestedOverlay("modal")}showNestedDrawer(){this.showNestedOverlay("drawer")}showNestedAlert(){let o={title:"Embedded Alert",message:"The default alert is just a title, a message, an OK and (optional) cancel button",okBtn:"I agree",cancelBtn:"Take me back"};this.modalController.showAlert(o,this.onAlertClose)}showNestedActionSheet(){let o={header:"Nested action sheet",subheader:"Action sheet subheader",items:[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}],cancelButtonText:"Custom cancel"};this.modalController.showActionSheet(o)}scrollToBottom(){this.modal.scrollToBottom(ho.Duration.EXTRA_LONG)}scrollToTop(){this.modal.scrollToTop(ho.Duration.SHORT)}toggleDisableScroll(o){this.modal.scrollDisabled=o}togglePageProgress(){this.showPageProgress=!this.showPageProgress}toggleFooter(){this.showFooter=!this.showFooter}close(){let o=Math.PI;this.modal.close(o)}onSupplementaryActionSelect(){let o={message:"Supplementary action selected",messageType:"success",durationInMs:1500};this.toastController.showToast(o)}onSnapFooterToKeyboardCheckbox(o){this.snapFooterToKeyboard=o}onAlertClose(o){console.log(`Alert closed: ${o}`)}setSelectedModalSize(o){this.selectedModalSize=o.value}};e.\u0275fac=function(t){return new(t||e)(x(Ai),x(ae),x($),x(Yt,12))},e.\u0275cmp=d({type:e,selectors:[["cookbook-embedded-modal-example"]],decls:10,vars:14,consts:[["configAppearance","snap-to-viewport",3,"title"],[3,"showDummyContentChange","showPageProgressChange","showFooterChange","snapFooterToKeyboardChange","displayFooterAsInlineChange","alertBeforeCloseChange","flavor","showDummyContent","showPageProgress","showFooter","snapFooterToKeyboard","displayFooterAsInline","alertBeforeClose"],[3,"isLoading"],["themeColor","white",3,"type","snapToKeyboard"],["themeColor","warning","value","50","size","sm",1,"kirby-text-xsmall"],["hasPadding","true",1,"nested-modal-configuration"],["kirby-button","","attentionLevel","2",3,"click"],[3,"showPageProgressChange","showFooterChange","snapFooterToKeyboardChange","displayFooterAsInlineChange","showDummyContentChange","collapseTitleChange","delayLoadDummyContentChange","loadAdditionalContentChange","showPageProgress","showFooter","snapFooterToKeyboard","displayFooterAsInline","showDummyContent","collapseTitle","delayLoadDummyContent","loadAdditionalContent"],[3,"hasMargin"],[1,"size-selector-heading"],[3,"sizeChange"],[1,"example-properties"],["kirby-button","","attentionLevel","3",3,"click"],["name","arrow-down"],["kirby-button","",3,"click"],["kirby-input","","placeholder","Focus me on device to scroll input into view"],["kirby-button","","attentionLevel","3"],["name","arrow-up"]],template:function(t,a){t&1&&(O(0,Hm,3,0,"kirby-page-progress"),n(1,"kirby-page-title"),s(2),r(),n(3,"p"),s(4),r(),n(5,"cookbook-example-configuration-wrapper",0)(6,"cookbook-modal-example-configuration",1),Ae("showDummyContentChange",function(y){return K(a.showDummyContent,y)||(a.showDummyContent=y),y})("showPageProgressChange",function(y){return K(a.showPageProgress,y)||(a.showPageProgress=y),y})("showFooterChange",function(y){return K(a.showFooter,y)||(a.showFooter=y),y})("snapFooterToKeyboardChange",function(y){return K(a.snapFooterToKeyboard,y)||(a.snapFooterToKeyboard=y),y})("displayFooterAsInlineChange",function(y){return K(a.displayFooterAsInline,y)||(a.displayFooterAsInline=y),y})("alertBeforeCloseChange",function(y){return K(a.alertBeforeClose,y)||(a.alertBeforeClose=y),y}),r()(),n(7,"kirby-loading-overlay",2),O(8,jm,4,3,"div"),r(),O(9,Ym,7,2,"kirby-modal-footer",3)),t&2&&(I(a.showPageProgress&&a.flavor==="modal"?0:-1),c(2),k(a.title),c(2),k(a.subtitle),c(),m("title","Current modal configuration"),c(),m("flavor",a.flavor),Fe("showDummyContent",a.showDummyContent)("showPageProgress",a.showPageProgress)("showFooter",a.showFooter)("snapFooterToKeyboard",a.snapFooterToKeyboard)("displayFooterAsInline",a.displayFooterAsInline)("alertBeforeClose",a.alertBeforeClose),c(),m("isLoading",a.isLoading),c(),I(a.isLoading?-1:8),c(),I(!a.isLoading&&a.showFooter?9:-1))},dependencies:[On,Pn,ei,fe,Ce,so,Ii,T,C,st,Ft,M,A,W,Qt,Q],styles:[".example-properties[_ngcontent-%COMP%]{display:none}@media(min-width:768px){.example-properties[_ngcontent-%COMP%]{display:unset}}.example-properties[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]{display:grid;grid-template:auto/auto 1fr}.example-properties[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%]{padding-right:4px}.example-properties[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]{margin:0;font-style:italic}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]{margin-top:32px;margin-bottom:32px}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]{margin-top:24px;border:1px solid var(--kirby-medium);border-radius:4px;padding:8px 8px 0}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;margin:-8px -8px 0;padding:8px}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[open][_ngcontent-%COMP%]{padding:8px;border-bottom-left-radius:16px;border-bottom-right-radius:16px}kirby-card.nested-modal-configuration[_ngcontent-%COMP%]   details[open][_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{border-bottom:1px dashed var(--kirby-medium);margin-bottom:12px}kirby-form-field[_ngcontent-%COMP%]{margin-top:24px}.size-selector-heading[_ngcontent-%COMP%]{margin-bottom:0}.size-selector-heading[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}"]});let i=e;return i})();function Qm(i,e){i&1&&(n(0,"p"),s(1," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta. "),r())}function Jm(i,e){if(i&1&&(n(0,"section",3),H(1,Qm,2,0,"p",null,fi),r()),i&2){let l=h();c(),q(l.dummyBackgroundTexts)}}var _e={selector:"cookbook-modal-example-advanced",template:`<button kirby-button size="lg" (click)="showModal()" [disabled]="interactWithBackground || preventInteraction">Show modal</button>
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
}`},he=class he{constructor(e,l){this.modalController=e,this.windowRef=l,this.showDummyKeyboard=!!this.windowRef.nativeWindow.sessionStorage.getItem("kirby-cookbook-show-dummy-keyboard"),this.showPageProgress=!1,this.showFooter=!1,this.snapFooterToKeyboard=!1,this.displayFooterAsInline=!1,this.collapseTitle=!1,this.alertBeforeClose=!1,this.showDummyContent=!0,this.delayLoadDummyContent=!0,this.loadAdditionalContent=!1,this.interactWithBackground=!1,this.customCssClass=!1,this.dummyBackgroundTexts=new Array(100).map(()=>""),this.preventInteraction=!1,this.disableScroll=!1,this.showNestedDummyContent=!0,this.showNestedPageProgress=!1,this.showNestedCollapseTitle=!1,this.showNestedFooter=!1,this.snapNestedFooterToKeyboard=!1,this.displayNestedFooterAsInline=!1}async showOverlay(e){let l=e==="modal"?"Modal Title":"Drawer Title";this.customCssClass&&(l=e==="modal"?"Modal with Custom CSS":"Drawer with Custom CSS"),this.preventInteraction=this.interactWithBackground;let o={flavor:e,collapseTitle:this.collapseTitle,component:co,interactWithBackground:this.interactWithBackground,cssClass:this.customCssClass?["my-custom-modal-class"]:[],componentProps:{title:l,subtitle:"Hello from the first embedded example component!",flavor:e,exampleProperties:{stringProperty:"Value injected from parent component",numberProperty:123,booleanProperty:!0},showNestedOptions:!this.interactWithBackground,showDummyKeyboard:this.showDummyKeyboard,showPageProgress:this.showPageProgress,showFooter:this.showFooter,snapFooterToKeyboard:this.snapFooterToKeyboard,showDummyContent:this.showDummyContent&&!this.interactWithBackground,showStaticDummyContent:this.interactWithBackground,delayLoadDummyContent:this.delayLoadDummyContent,loadAdditionalContent:this.loadAdditionalContent,displayFooterAsInline:this.displayFooterAsInline,showModalSizeSelector:!0,disableScroll:this.disableScroll,showNestedCollapseTitle:this.showNestedCollapseTitle,alertBeforeClose:this.alertBeforeClose}};await this.modalController.showModal(o,this.onOverlayClose.bind(this))}async showModal(){await this.showOverlay("modal")}async showCompact(){let e={flavor:"compact",component:lo};await this.modalController.showModal(e,this.onOverlayClose.bind(this))}async showDrawer(){await this.showOverlay("drawer")}onOverlayClose(e){this.preventInteraction=!1,console.log("Callback from Embedded Modal:"),console.log(`Data received: ${JSON.stringify(e)}`)}};he.template=_e.template.split("<cookbook-example-configuration-wrapper")[0],he.componentTemplate=_e.componentTemplate,he.defaultCodeSnippet=[_e.showModalCodeSnippet,_e.drawerCodeSnippet,_e.showCompactCodeSnippet].join(`

`),he.showModalCodeSnippet=_e.showModalCodeSnippet,he.drawerCodeSnippet=_e.drawerCodeSnippet,he.callbackCodeSnippet=_e.callbackCodeSnippet,he.callbackWithDataCodeSnippet=_e.callbackWithDataCodeSnippet,he.didPresentCodeSnippet=_e.didPresentCodeSnippet,he.willCloseCodeSnippet=_e.willCloseCodeSnippet,he.scrollingCodeSnippet=_e.scrollingCodeSnippet,he.disableScrollingCodeSnippet=_e.disableScrollingCodeSnippet,he.embeddedCodeSnippet=_e.embeddedCodeSnippet,he.closeModalCodeSnippet=_e.closeModalCodeSnippet,he.\u0275fac=function(l){return new(l||he)(x(ae),x(Di))},he.\u0275cmp=d({type:he,selectors:[["cookbook-modal-example-advanced"]],decls:9,vars:17,consts:[["kirby-button","","size","lg",3,"click","disabled"],["configAppearance","toggle"],[3,"showDummyKeyboardChange","showPageProgressChange","showFooterChange","snapFooterToKeyboardChange","displayFooterAsInlineChange","collapseTitleChange","alertBeforeCloseChange","showDummyContentChange","delayLoadDummyContentChange","loadAdditionalContentChange","interactWithBackgroundChange","customCssClassChange","disabled","showDummyKeyboard","showPageProgress","showFooter","snapFooterToKeyboard","displayFooterAsInline","collapseTitle","alertBeforeClose","showDummyContent","delayLoadDummyContent","loadAdditionalContent","interactWithBackground","customCssClass"],[1,"dummy-text-section"]],template:function(l,o){l&1&&(n(0,"button",0),b("click",function(){return o.showModal()}),s(1,"Show modal"),r(),n(2,"button",0),b("click",function(){return o.showDrawer()}),s(3,"Show drawer"),r(),n(4,"button",0),b("click",function(){return o.showCompact()}),s(5,"Show compact"),r(),n(6,"cookbook-example-configuration-wrapper",1)(7,"cookbook-modal-example-configuration",2),Ae("showDummyKeyboardChange",function(a){return K(o.showDummyKeyboard,a)||(o.showDummyKeyboard=a),a})("showPageProgressChange",function(a){return K(o.showPageProgress,a)||(o.showPageProgress=a),a})("showFooterChange",function(a){return K(o.showFooter,a)||(o.showFooter=a),a})("snapFooterToKeyboardChange",function(a){return K(o.snapFooterToKeyboard,a)||(o.snapFooterToKeyboard=a),a})("displayFooterAsInlineChange",function(a){return K(o.displayFooterAsInline,a)||(o.displayFooterAsInline=a),a})("collapseTitleChange",function(a){return K(o.collapseTitle,a)||(o.collapseTitle=a),a})("alertBeforeCloseChange",function(a){return K(o.alertBeforeClose,a)||(o.alertBeforeClose=a),a})("showDummyContentChange",function(a){return K(o.showDummyContent,a)||(o.showDummyContent=a),a})("delayLoadDummyContentChange",function(a){return K(o.delayLoadDummyContent,a)||(o.delayLoadDummyContent=a),a})("loadAdditionalContentChange",function(a){return K(o.loadAdditionalContent,a)||(o.loadAdditionalContent=a),a})("interactWithBackgroundChange",function(a){return K(o.interactWithBackground,a)||(o.interactWithBackground=a),a})("customCssClassChange",function(a){return K(o.customCssClass,a)||(o.customCssClass=a),a}),r()(),O(8,Jm,3,0,"section",3)),l&2&&(m("disabled",o.interactWithBackground||o.preventInteraction),c(2),m("disabled",o.preventInteraction),c(2),m("disabled",o.interactWithBackground||o.preventInteraction),c(3),m("disabled",o.preventInteraction),Fe("showDummyKeyboard",o.showDummyKeyboard)("showPageProgress",o.showPageProgress)("showFooter",o.showFooter)("snapFooterToKeyboard",o.snapFooterToKeyboard)("displayFooterAsInline",o.displayFooterAsInline)("collapseTitle",o.collapseTitle)("alertBeforeClose",o.alertBeforeClose)("showDummyContent",o.showDummyContent)("delayLoadDummyContent",o.delayLoadDummyContent)("loadAdditionalContent",o.loadAdditionalContent)("interactWithBackground",o.interactWithBackground)("customCssClass",o.customCssClass),c(),I(o.interactWithBackground?8:-1))},dependencies:[C,Ce,so],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{--kirby-card-width: fit-content}.dummy-text-section[_ngcontent-%COMP%]{position:absolute;top:90vh}"]});var qr=he;var Zm=()=>({awesomeQueryParam:"awesome value"}),Xe={selector:"cookbook-modal-example-outlet",template:`<button kirby-button (click)="navigateToModalRoute('page1', {awesomeQueryParam: 'awesome value'})">Open modal by route</button>
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
} `},we=class we{constructor(e){this.modalController=e}navigateToModalRoute(e,l){this.modalController.navigateToModal(e,l)}};we.template=Xe.template,we.defaultCodeSnippet=Xe.defaultCodeSnippet,we.modalRouteCodeSnippet=Xe.modalRouteCodeSnippet,we.modalRouteWithGuardCodeSnippet=Xe.modalRouteWithGuardCodeSnippet,we.deeplinkedRouterLinkWithUrlParamCodeSnippet=Xe.deeplinkedRouterLinkWithUrlParamCodeSnippet,we.routerLinkForModalOutletCodeSnippet=Xe.routerLinkForModalOutletCodeSnippet,we.modalControllerForModalOutletCodeSnippet=Xe.modalControllerForModalOutletCodeSnippet,we.routerLinkWithinModalOutletCodeSnippet=Xe.routerLinkWithinModalOutletCodeSnippet,we.modalControllerWithinModalOutletCodeSnippet=Xe.modalControllerWithinModalOutletCodeSnippet,we.\u0275fac=function(l){return new(l||we)(x(ae))},we.\u0275cmp=d({type:we,selectors:[["cookbook-modal-example-outlet"]],decls:4,vars:2,consts:[["kirby-button","",3,"click"],["kirby-button","","kirbyModalRouterLink","page1",3,"kirbyModalQueryParams"]],template:function(l,o){l&1&&(n(0,"button",0),b("click",function(){return o.navigateToModalRoute("page1",{awesomeQueryParam:"awesome value"})}),s(1,"Open modal by route"),r(),n(2,"button",1),s(3,"Open modal by router link"),r()),l&2&&(c(2),m("kirbyModalQueryParams",D(1,Zm)))},dependencies:[C,Bn,zn],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}"]});var Kr=we;var Fo={selector:"cookbook-modal-example-simple",template:`<button kirby-button size="lg" (click)="showModal('modal', size)">Show modal</button>
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
}`},et=class et{constructor(e){this.modalController=e}ngOnInit(){this.size=this.sizeSelector.size}async showModal(e,l){let o;e==="compact"?o={component:lo,flavor:e}:o={component:co,flavor:e,size:l.value,componentProps:{title:`${e==="modal"?"Modal":"Drawer"} - ${l.text}`,subtitle:"Hello from the first embedded example component!",showNestedOptions:!0,showDummyContent:!1,showModalSizeSelector:!0}},await this.modalController.showModal(o)}sizeChange(e){this.size=e}};et.template=Fo.template.split("<kirby-card")[0],et.defaultCodeSnippet=[Fo.showModalCodeSnippet].join(`

`),et.showModalCodeSnippet=Fo.showModalCodeSnippet,et.\u0275fac=function(l){return new(l||et)(x(ae))},et.\u0275cmp=d({type:et,selectors:[["cookbook-modal-example-simple"]],viewQuery:function(l,o){if(l&1&&Rt(Ft,7),l&2){let t;Vt(t=Wt())&&(o.sizeSelector=t.first)}},decls:14,vars:0,consts:[["kirby-button","","size","lg",3,"click"],[3,"sizeChange"]],template:function(l,o){l&1&&(n(0,"button",0),b("click",function(){return o.showModal("modal",o.size)}),s(1,"Show modal"),r(),n(2,"button",0),b("click",function(){return o.showModal("drawer",o.size)}),s(3,"Show drawer"),r(),n(4,"button",0),b("click",function(){return o.showModal("compact")}),s(5,"Show compact"),r(),n(6,"kirby-card")(7,"kirby-card-header")(8,"strong"),s(9,"Size of modal/drawer"),r(),p(10,"br"),n(11,"em"),s(12,"(on screens larger than 768px)"),r()(),n(13,"cookbook-modal-example-size-selector",1),b("sizeChange",function(a){return o.sizeChange(a)}),r()())},dependencies:[C,T,Ft,ce],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{margin-top:32px}kirby-card[_ngcontent-%COMP%]   kirby-card-header[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}cookbook-modal-example-size-selector[_ngcontent-%COMP%]{margin-bottom:24px}"]});var Rr=et;function Xm(i,e){i&1&&p(0,"cookbook-modal-example-alert-with-guard-stepper",4)(1,"kirby-divider",5),i&2&&(m("currentStep",3),c(),m("hasMargin",!0))}var ed={template:`<kirby-page-title>Modal with alert</kirby-page-title>

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
  `},At=class At{constructor(e,l){this.modal=e,this.componentProps=l,this.showStepper=!0,this.firstName="Jane",this.lastName=""}ngOnInit(){this.componentProps?.showStepper!==void 0&&(this.showStepper=this.componentProps.showStepper),this.modal.canDismiss=()=>this.validate()}clearForm(){this.firstName="",this.lastName=""}validate(){return!this.firstName&&!this.lastName?!0:{title:"Are you sure you want to close?",message:"All unsaved data will be lost.",okBtn:"Close",cancelBtn:"Cancel",icon:{name:"warning",themeColor:"warning"}}}};At.canDismissCodeSnippet=ed.canDismissCodeSnippet,At.\u0275fac=function(l){return new(l||At)(x(Yt,12),x(Ai,8))},At.\u0275cmp=d({type:At,selectors:[["ng-component"]],inputs:{firstName:"firstName"},decls:15,vars:3,consts:[[1,"form-wrapper"],["kirby-input","","placeholder","First name",3,"ngModelChange","ngModel"],["kirby-input","","placeholder","Last name",3,"ngModelChange","ngModel"],["kirby-button","",3,"click"],[3,"currentStep"],[3,"hasMargin"]],template:function(l,o){l&1&&(n(0,"kirby-page-title"),s(1,"Modal with alert"),r(),O(2,Xm,2,2),n(3,"div",0)(4,"kirby-form-field")(5,"input",1),Ae("ngModelChange",function(a){return K(o.firstName,a)||(o.firstName=a),a}),r()(),n(6,"kirby-form-field")(7,"input",2),Ae("ngModelChange",function(a){return K(o.lastName,a)||(o.lastName=a),a}),r()(),n(8,"button",3),b("click",function(){return o.clearForm()}),s(9,"Clear form"),r()(),n(10,"kirby-modal-footer")(11,"em")(12,"strong"),s(13,"Please note:"),r(),s(14," If any data has been entered in the form fields, this modal will prompt the user to confirm before closing. "),r()()),l&2&&(c(2),I(o.showStepper?2:-1),c(3),Fe("ngModel",o.firstName),c(2),Fe("ngModel",o.lastName))},dependencies:[ei,Hr,st,A,W,C,Qt,xe,Ut,ke,Mi],styles:[".form-wrapper[_ngcontent-%COMP%]{margin-block-start:1em;display:flex;flex-direction:column}button[_ngcontent-%COMP%]{align-self:flex-end}"]});var mo=At;var Vr={selector:"cookbook-modal-example-alert",template:`<button kirby-button size="lg" (click)="showModal('modal')">Show modal (with alert)</button>`,codeSnippet:`constructor(private myService: MyService) {}

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
`},Ct=class Ct{constructor(e){this.modalController=e}async showModal(e){let l={component:mo,flavor:e,componentProps:{showStepper:!1}};await this.modalController.showModal(l)}};Ct.template=Vr.template,Ct.codeSnippet=Vr.codeSnippet,Ct.\u0275fac=function(l){return new(l||Ct)(x(ae))},Ct.\u0275cmp=d({type:Ct,selectors:[["cookbook-modal-example-alert"]],decls:2,vars:0,consts:[["kirby-button","","size","lg",3,"click"]],template:function(l,o){l&1&&(n(0,"button",0),b("click",function(){return o.showModal("modal")}),s(1,"Show modal (with alert)"),r())},dependencies:[C],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{margin-top:32px}kirby-card[_ngcontent-%COMP%]   kirby-card-header[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}cookbook-modal-example-size-selector[_ngcontent-%COMP%]{margin-bottom:24px}"]});var Wr=Ct;function td(i,e){i&1&&(n(0,"kirby-page-title"),s(1,"Modal Component"),r(),n(2,"p"),s(3," Lorem ipsum. "),r(),n(4,"kirby-modal-footer")(5,"button",7),s(6,"Button in footer"),r()())}function id(i,e){i&1&&(n(0,"kirby-page-title"),s(1,"Modal Component"),r(),n(2,"p"),s(3," Lorem ipsum. "),r(),n(4,"kirby-modal-footer")(5,"button",7),s(6,"Button in footer"),r()())}function od(i,e){i&1&&p(0,"kirby-empty-state",8)}var Gr=`<ng-template>
    <kirby-page-title>Modal Component</kirby-page-title>

    <p>
      Lorem ipsum. 
    </p>

    <kirby-modal-footer>
      <button kirby-button>Button in footer</button>
    </kirby-modal-footer>
  </ng-template>`,nd=`<ng-template>
    <kirby-empty-state
      iconName="close"
      title="Out of service"
      subtitle="The system is currently down. Please contact customer support."
      themeColor="danger"
      ></kirby-empty-state>
  </ng-template>`,Ao={selector:"cookbook-modal-component-example",template:`<button kirby-button size="lg" id="open-modal">Show modal</button>
<button kirby-button size="lg" id="open-drawer">Show drawer</button>
<button kirby-button size="lg" id="open-compact">Show compact</button>

<kirby-modal [size]="size" flavor="modal" trigger="open-modal">
  ${Gr}
</kirby-modal>

<!-- Additional flavor examples omitted from example for brevity -->
<kirby-modal trigger="open-drawer" flavor="drawer" [size]="size">
  ${Gr}
</kirby-modal>

<kirby-modal trigger="open-compact" flavor="compact">
  ${nd}
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
}`},tt=class tt{constructor(){this.size="medium",this.isOpen=!1}sizeChange(e){this.size=e.value}};tt.template=Ao.template.split('<kirby-modal trigger="open-drawer"')[0],tt.isOpenExampleHtml=Ao.isOpenExampleHtml,tt.isOpenCodeSnippet=Ao.isOpenCodeSnippet,tt.\u0275fac=function(l){return new(l||tt)},tt.\u0275cmp=d({type:tt,selectors:[["cookbook-modal-component-example"]],decls:20,vars:2,consts:[["kirby-button","","size","lg","id","open-modal"],["kirby-button","","size","lg","id","open-drawer"],["kirby-button","","size","lg","id","open-compact"],["flavor","modal","trigger","open-modal",3,"size"],["trigger","open-drawer","flavor","drawer",3,"size"],["trigger","open-compact","flavor","compact"],[3,"sizeChange"],["kirby-button",""],["iconName","close","title","Out of service","subtitle","The system is currently down. Please contact customer support.","themeColor","danger"]],template:function(l,o){l&1&&(n(0,"button",0),s(1,"Show modal"),r(),n(2,"button",1),s(3,"Show drawer"),r(),n(4,"button",2),s(5,"Show compact"),r(),n(6,"kirby-modal",3),w(7,td,7,0,"ng-template"),r(),n(8,"kirby-modal",4),w(9,id,7,0,"ng-template"),r(),n(10,"kirby-modal",5),w(11,od,1,0,"ng-template"),r(),n(12,"kirby-card")(13,"kirby-card-header")(14,"strong"),s(15,"Size of modal"),r(),p(16,"br"),n(17,"em"),s(18,"(on screens larger than 768px)"),r()(),n(19,"cookbook-modal-example-size-selector",6),b("sizeChange",function(a){return o.sizeChange(a)}),r()()),l&2&&(c(6),m("size",o.size),c(2),m("size",o.size))},dependencies:[C,bn,ei,Qt,We,Q,T,Ft,ce],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}kirby-card[_ngcontent-%COMP%]{margin-top:32px}kirby-card[_ngcontent-%COMP%]   kirby-card-header[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:smaller}cookbook-modal-example-size-selector[_ngcontent-%COMP%]{margin-bottom:24px}"],changeDetection:0});var Ur=tt;var j=class{constructor(){this.content=`<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aperiam deserunt dolore error esse
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
        <p class="kirby-text-medium">THE END</p>`}};var jr=()=>({fixed:!0});function rd(i,e){i&1&&je(0)}function ad(i,e){if(i&1&&(n(0,"div")(1,"span",9),w(2,rd,1,0,"ng-container",10),r()()),i&2){h();let l=ee(5);c(2),m("ngTemplateOutlet",l)}}function ld(i,e){i&1&&(n(0,"div"),s(1," Custom subtitle with a long long long long name "),r())}function sd(i,e){i&1&&je(0)}function cd(i,e){if(i&1&&w(0,sd,1,0,"ng-container",10),i&2){h();let l=ee(5);m("ngTemplateOutlet",l)}}function md(i,e){i&1&&s(0," Custom Title with a very long name ")}function dd(i,e){i&1&&s(0," Custom subtitle of custom title with a very long name ")}function pd(i,e){if(i&1){let l=P();n(0,"kirby-page-actions")(1,"button",11),b("click",function(){v(l);let t=h();return _(t.onMoreSelect())}),p(2,"kirby-icon",12),r()()}}function ud(i,e){if(i&1){let l=P();n(0,"kirby-page-actions")(1,"button",13),b("click",function(){v(l);let t=h();return _(t.onCogSelect())}),p(2,"kirby-icon",14),r()()}}function bd(i,e){if(i&1&&p(0,"div",15),i&2){let l=h();m("innerHTML",l.content,Y)}}function gd(i,e){if(i&1){let l=P();n(0,"kirby-fab-sheet",16),p(1,"kirby-icon",17),n(2,"kirby-action-sheet",18),b("itemSelect",function(t){v(l);let a=h();return _(a.onItemSelect(t))}),r()()}if(i&2){let l=h();c(2),m("items",l.items)}}var yd={template:`<kirby-page defaultBackHref="/">

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
</kirby-page>`},Lt=class Lt extends j{constructor(e,l){super(),this.toastController=e,this.modalController=l,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(e){if(!e)return;let l={message:`'${e.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(l)}onCogSelect(){let e={message:"Settings was selected.",messageType:"success",durationInMs:1500};this.toastController.showToast(e)}onMoreSelect(){let e={header:"Your action sheet header",items:this.items};this.modalController.showActionSheet(e,this.onItemSelect.bind(this))}};Lt.template=yd.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),Lt.\u0275fac=function(l){return new(l||Lt)(x($),x(ae))},Lt.\u0275cmp=d({type:Lt,selectors:[["ng-component"]],features:[E],decls:12,vars:4,consts:[["customTitle",""],["customSubtitle",""],["defaultBackHref","/"],[4,"kirbyPageTitle"],[4,"kirbyPageSubtitle"],["kirbyPageToolbarTitle",""],[4,"kirbyPageActions"],[3,"innerHTML",4,"kirbyPageContent"],["horizontalAlignment","right",4,"kirbyPageContent"],[1,"kirby-text-xlarge"],[4,"ngTemplateOutlet"],["kirby-button","","aria-label","More",3,"click"],["name","more"],["kirby-button","","aria-label","Settings",3,"click"],["name","cog"],[3,"innerHTML"],["horizontalAlignment","right"],["name","write-message"],["header","Your action sheet header","subheader","Your action sheet subheader",3,"itemSelect","items"]],template:function(l,o){l&1&&(n(0,"kirby-page",2),w(1,ad,3,1,"div",3)(2,ld,2,0,"div",4)(3,cd,1,1,"ng-template",5)(4,md,1,0,"ng-template",null,0,St)(6,dd,1,0,"ng-template",null,1,St)(8,pd,3,0,"kirby-page-actions",6)(9,ud,3,0,"kirby-page-actions",6)(10,bd,1,1,"div",7)(11,gd,3,1,"kirby-fab-sheet",8),r()),l&2&&(c(8),m("kirbyPageActions",D(2,jr)),c(3),m("kirbyPageContent",D(3,jr)))},dependencies:[Qi,Gt,C,M,Ni,Li,U,Gi,Ui,Wi,Yi,ji],styles:[".custom-page-title[_ngcontent-%COMP%]{display:inline-flex}"]});var Yr=Lt;var hd=()=>({fixed:!0}),kd=()=>({maxLines:2});function fd(i,e){i&1&&(n(0,"div")(1,"div",6)(2,"span",7),s(3," Custom Titles with very long names that span multiple lines will be truncated "),r(),p(4,"kirby-icon",8),r()()),i&2&&(c(2),m("kirbyFitHeading",D(1,kd)))}function Cd(i,e){i&1&&(n(0,"div"),s(1," Custom subtitles with very long names that span multiple lines will wrap. "),r())}function xd(i,e){i&1&&(n(0,"div",9)(1,"div",10),s(2," Custom Titles with very long names that span multiple lines will be truncated "),r(),p(3,"kirby-icon",8),r())}function vd(i,e){if(i&1){let l=P();n(0,"kirby-page-actions")(1,"button",11),b("click",function(){v(l);let t=h();return _(t.onMoreSelect())}),p(2,"kirby-icon",12),r()()}}function _d(i,e){if(i&1){let l=P();n(0,"kirby-page-actions")(1,"button",13),b("click",function(){v(l);let t=h();return _(t.onCogSelect())}),p(2,"kirby-icon",14),r()()}}function wd(i,e){if(i&1&&p(0,"div",15),i&2){let l=h();m("innerHTML",l.content,Y)}}var Sd={template:`<kirby-page defaultBackHref="/">

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
  
</kirby-page>`},zt=class zt extends j{constructor(e,l){super(),this.toastController=e,this.modalController=l,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(e){if(!e)return;let l={message:`'${e.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(l)}onCogSelect(){let e={message:"Settings was selected.",messageType:"success",durationInMs:1500};this.toastController.showToast(e)}onMoreSelect(){let e={header:"Your action sheet header",items:this.items};this.modalController.showActionSheet(e,this.onItemSelect.bind(this))}};zt.template=Sd.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),zt.\u0275fac=function(l){return new(l||zt)(x($),x(ae))},zt.\u0275cmp=d({type:zt,selectors:[["ng-component"]],features:[E],decls:7,vars:2,consts:[["defaultBackHref","/"],[4,"kirbyPageTitle"],[4,"kirbyPageSubtitle"],["style","display: flex; justify-content: center; align-items: center; gap: 0.5rem;",4,"kirbyPageToolbarTitle"],[4,"kirbyPageActions"],[3,"innerHTML",4,"kirbyPageContent"],[2,"display","flex","gap","0.5rem"],[1,"kirby-text-xlarge",3,"kirbyFitHeading"],["name","arrow-down"],[2,"display","flex","justify-content","center","align-items","center","gap","0.5rem"],[2,"overflow","hidden","text-overflow","ellipsis","white-space","nowrap"],["kirby-button","","aria-label","More",3,"click"],["name","more"],["kirby-button","","aria-label","Settings",3,"click"],["name","cog"],[3,"innerHTML"]],template:function(l,o){l&1&&(n(0,"kirby-page",0),w(1,fd,5,2,"div",1)(2,Cd,2,0,"div",2)(3,xd,4,0,"div",3)(4,vd,3,0,"kirby-page-actions",4)(5,_d,3,0,"kirby-page-actions",4)(6,wd,1,1,"div",5),r()),l&2&&(c(4),m("kirbyPageActions",D(1,hd)))},dependencies:[U,Qi,Gi,mn,M,C,Wi,Ui,Yi,ji],encapsulation:2});var Qr=zt;var Md={template:`<kirby-page
  titleAlignment="center"
  title="Centered Title"
  subtitle="Centered Subtitle"
  toolbarTitle="A Different Title" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},Bt=class Bt extends j{constructor(){super()}};Bt.template=Md.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),Bt.\u0275fac=function(l){return new(l||Bt)},Bt.\u0275cmp=d({type:Bt,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["titleAlignment","center","title","Centered Title","subtitle","Centered Subtitle","toolbarTitle","A Different Title","defaultBackHref","/"],[3,"innerHTML"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-page-content"),p(2,"div",1),r()()),l&2&&(c(2),m("innerHTML",o.content,Y))},dependencies:[U,te],encapsulation:2});var Jr=Bt;var Td={template:`<kirby-page
  title="Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization"
  titleMaxLines="2"
  subtitle="Report on the Municipal Securities Market"
  defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},xt=class xt extends j{};xt.template=Td.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),xt.\u0275fac=(()=>{let e;return function(o){return(e||(e=L(xt)))(o||xt)}})(),xt.\u0275cmp=d({type:xt,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["title","Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization","titleMaxLines","2","subtitle","Report on the Municipal Securities Market","defaultBackHref","/"],[3,"innerHTML"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-page-content"),p(2,"div",1),r()()),l&2&&(c(2),m("innerHTML",o.content,Y))},dependencies:[U,te],encapsulation:2});var Zr=xt;function Ed(i,e){i&1&&je(0)}function Pd(i,e){i&1&&je(0)}function Dd(i,e){if(i&1){let l=P();n(0,"kirby-page-footer")(1,"h3"),s(2,"0 selected"),r(),s(3," This is a fixed footer "),n(4,"button",4),b("click",function(){v(l);let t=h();return _(t.onCloseClick())}),p(5,"kirby-icon",5),r()()}}function Od(i,e){if(i&1){let l=P();n(0,"kirby-card")(1,"kirby-item")(2,"h3"),s(3,"Show tabs"),r(),n(4,"kirby-toggle",6),b("click",function(){v(l);let t=h();return _(t.toggleTabs())}),r()(),n(5,"kirby-item")(6,"h3"),s(7,"Show footer"),r(),n(8,"kirby-toggle",6),b("click",function(){v(l);let t=h();return _(t.toggleFooter())}),r()()()}if(i&2){let l=h();c(4),m("checked",l.showTabs),c(4),m("checked",l.showFooter)}}var ea=`<kirby-page [title]="title" [tabBarBottomHidden]="!showTabs">
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
</kirby-page>`,Id=`<ng-template #controls>
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
</ng-template>`,Zw={template:ea+Id,styles:[`.close-footer-btn {
        position: absolute;
        top: 8px;
        right: 16px;
        margin: 0;
      }

      kirby-card:first-of-type {
        margin-bottom: 24px;
      }`]},$t=class $t extends j{constructor(e){super(),this.route=e,this.showTabs=!0,this.showFooter=!0}ngOnInit(){this.title=this.route.snapshot.data.title}toggleTabs(){this.showTabs=!this.showTabs}toggleFooter(){this.showFooter=!this.showFooter}onCloseClick(){this.pageFooter.close(),this.showFooter=!1,this.showTabs=!0}};$t.template=ea.replace(/<kirby-page-content[^>]*>(.|\s)*?<\/kirby-page-content>/,"<kirby-page-content>...</kirby-page-content>"),$t.\u0275fac=function(l){return new(l||$t)(x(Ei))},$t.\u0275cmp=d({type:$t,selectors:[["ng-component"]],viewQuery:function(l,o){if(l&1&&Rt(Dn,5),l&2){let t;Vt(t=Wt())&&(o.pageFooter=t.first)}},features:[E],decls:8,vars:6,consts:[["controls",""],[3,"title","tabBarBottomHidden"],[4,"ngTemplateOutlet"],[3,"innerHTML"],["kirby-button","","attentionLevel","2","aria-label","Close",1,"close-footer-btn",3,"click"],["name","close"],["slot","end",3,"click","checked"]],template:function(l,o){if(l&1&&(n(0,"kirby-page",1)(1,"kirby-page-content"),w(2,Ed,1,0,"ng-container",2),p(3,"div",3),w(4,Pd,1,0,"ng-container",2),r(),O(5,Dd,6,0,"kirby-page-footer"),r(),w(6,Od,9,2,"ng-template",null,0,St)),l&2){let t=ee(7);m("title",o.title)("tabBarBottomHidden",!o.showTabs),c(2),m("ngTemplateOutlet",t),c(),m("innerHTML",o.content,Y),c(),m("ngTemplateOutlet",t),c(),I(o.showFooter?5:-1)}},dependencies:[U,Gt,C,M,T,f,ze,te],styles:[".close-footer-btn[_ngcontent-%COMP%]{position:absolute;top:8px;right:16px;margin:0}kirby-card[_ngcontent-%COMP%]:first-of-type{margin-bottom:24px}"]});var Xr=$t;var Fd=()=>({fixed:!0});function Ad(i,e){if(i&1){let l=P();n(0,"kirby-page-actions")(1,"button",3),b("click",function(){v(l);let t=h();return _(t.onMoreSelect())}),p(2,"kirby-icon",4),r()()}}var Ld={template:`<kirby-page>
  <div *kirbyPageToolbarTitle>A Fixed Title</div>
  ...
</kirby-page>`},zd={template:`<kirby-page title="Normal Page Title">
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
  ...
  </kirby-page-actions>
  ...
</kirby-page>`},Bd={template:`<kirby-page toolbarTitle="A Fixed Title" defaultBackHref="/">
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
</kirby-page>`},it=class it extends j{constructor(e,l){super(),this.toastController=e,this.modalController=l,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}]}onItemSelect(e){if(!e)return;let l={message:`'${e.text}' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(l)}onCogSelect(){let e={message:"Settings was selected.",messageType:"success",durationInMs:1500};this.toastController.showToast(e)}onMoreSelect(){let e={header:"Your action sheet header",items:this.items};this.modalController.showActionSheet(e,this.onItemSelect.bind(this))}};it.template=Bd.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),it.customTitleTemplate=Ld.template,it.fixedActionsTemplate=zd.template,it.\u0275fac=function(l){return new(l||it)(x($),x(ae))},it.\u0275cmp=d({type:it,selectors:[["ng-component"]],features:[E],decls:4,vars:3,consts:[["toolbarTitle","A Fixed Title","defaultBackHref","/"],[4,"kirbyPageActions"],[3,"innerHTML"],["kirby-button","","aria-label","More",3,"click"],["name","more"]],template:function(l,o){l&1&&(n(0,"kirby-page",0),w(1,Ad,3,0,"kirby-page-actions",1),n(2,"kirby-page-content"),p(3,"div",2),r()()),l&2&&(c(),m("kirbyPageActions",D(2,Fd)),c(2),m("innerHTML",o.content,Y))},dependencies:[U,C,M,te],encapsulation:2});var ta=it;var $d={template:`<kirby-page title="Pull-to-refresh" defaultBackHref="/" (refresh)="loadData($event)">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},ot=class ot extends j{loadData(e){console.log("Begin async operation"),setTimeout(()=>{console.log("Async operation has ended"),e.complete()},3e3)}};ot.template=$d.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),ot.handler=`loadData(event: PullToRefreshEvent) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.complete();
  }, 3000);
}`,ot.\u0275fac=(()=>{let e;return function(o){return(e||(e=L(ot)))(o||ot)}})(),ot.\u0275cmp=d({type:ot,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["title","Pull-to-refresh","defaultBackHref","/",3,"refresh"],[3,"innerHTML"]],template:function(l,o){l&1&&(n(0,"kirby-page",0),b("refresh",function(a){return o.loadData(a)}),n(1,"kirby-page-content"),p(2,"div",1),r()()),l&2&&(c(2),m("innerHTML",o.content,Y))},dependencies:[U,te],encapsulation:2});var ia=ot;function Nd(i,e){if(i&1&&(n(0,"code",6),s(1),r()),i&2){let l=h().$implicit;c(),S('maxWidth="',l.value,'"')}}function Hd(i,e){if(i&1&&(n(0,"kirby-item",4)(1,"kirby-label")(2,"p",5),s(3),r(),O(4,Nd,2,1,"code",6),r(),n(5,"kirby-label",7)(6,"data",6),s(7),r()()()),i&2){let l=e.$implicit,o=e.selected,t=e.focused;G("focused",t),m("selected",o),c(3),k(l.text),c(),I(l.value!=="default"?4:-1),c(3),k(l.width)}}var po=cn.pageContentMaxWidth,na=`
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
`,qd={template:`<kirby-page title="Content Width" [maxWidth]="maxWidth">
  <kirby-page-content>${na}
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},vt=class vt extends j{constructor(){super(...arguments),this.maxWidthOptions=[{text:"Default",value:"default",width:po("default")},{text:"Large",value:"lg",width:po("lg")},{text:"X-Large",value:"xl",width:po("xl")},{text:"Full",value:"full",width:po("full")}],this.maxWidth=this.maxWidthOptions[0].value}onMaxWidthChange(e){this.maxWidth=e}};vt.template=qd.template.replace(na,"").replace('<div [innerHTML]="content"></div>',"..."),vt.\u0275fac=(()=>{let e;return function(o){return(e||(e=L(vt)))(o||vt)}})(),vt.\u0275cmp=d({type:vt,selectors:[["ng-component"]],features:[E],decls:8,vars:4,consts:[["title","Content Width",3,"maxWidth"],["size","sm",3,"change","items","selectedIndex"],["selectable","true",3,"selected","focused",4,"kirbyListItemTemplate"],[3,"innerHTML"],["selectable","true",3,"selected"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-page-content")(2,"fieldset")(3,"legend"),s(4,"Max Width"),r(),n(5,"kirby-dropdown",1),b("change",function(a){return o.onMaxWidthChange(a.value)}),w(6,Hd,8,6,"kirby-item",2),r()(),p(7,"div",3),r()()),l&2&&(m("maxWidth",o.maxWidth),c(5),m("items",o.maxWidthOptions)("selectedIndex",0),c(2),m("innerHTML",o.content,Y))},dependencies:[U,J,f,te],styles:["fieldset[_ngcontent-%COMP%]{margin-bottom:16px}"]});var oa=vt;var Kd={template:`<kirby-page title="Simple Page" subtitle="Subtitle of simple page" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},_t=class _t extends j{};_t.template=Kd.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),_t.\u0275fac=(()=>{let e;return function(o){return(e||(e=L(_t)))(o||_t)}})(),_t.\u0275cmp=d({type:_t,selectors:[["ng-component"]],features:[E],decls:3,vars:1,consts:[["title","Simple Page","subtitle","Subtitle of simple page","defaultBackHref","/"],[3,"innerHTML"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-page-content"),p(2,"div",1),r()()),l&2&&(c(2),m("innerHTML",o.content,Y))},dependencies:[U,te],encapsulation:2});var ra=_t;function Rd(i,e){if(i&1){let l=P();n(0,"kirby-tab-navigation",4),Ae("selectedIndexChange",function(t){v(l);let a=h();return K(a.selectedIndex,t)||(a.selectedIndex=t),_(t)}),p(1,"kirby-tab-navigation-item",5),n(2,"kirby-tab-navigation-item",6)(3,"kirby-badge",7),p(4,"kirby-icon",8),r()(),n(5,"kirby-tab-navigation-item",9)(6,"kirby-badge",10),s(7," 3 "),r()(),p(8,"kirby-tab-navigation-item",11),n(9,"kirby-tab-navigation-item",12)(10,"kirby-badge"),p(11,"kirby-icon",13),r()(),n(12,"kirby-tab-navigation-item",14)(13,"kirby-badge"),p(14,"kirby-icon",15),r()()()}if(i&2){let l=h();Fe("selectedIndex",l.selectedIndex),c(),m("label",Ie(l.labels[0])),c(),m("label",Ie(l.labels[1])),c(3),m("label",Ie(l.labels[2]))("truncate",!1),c(3),m("label",Ie(l.labels[3])),c(),m("label",Ie(l.labels[4])),c(3),m("label",Ie(l.labels[5]))}}function Vd(i,e){i&1&&(n(0,"p"),s(1," Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut! "),r())}var Wd={template:`<kirby-page
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
</kirby-page>`},nt=class nt extends j{constructor(){super(...arguments),this.selectedIndex=0,this.labels=["Item 1","Item 2 truncated","Item 3 not truncated","Item 4","Item 5","Item 6"]}};nt.template=Wd.template.replace(' defaultBackHref="/"',"").replace('<div [innerHTML]="content"></div>',"..."),nt.codeSnippet=`selectedIndex = 0;
labels = ['Item 1', 'Item 2 truncated', 'Item 3 not truncated', 'Item 4', 'Item 5', 'Item 6']];
`,nt.\u0275fac=(()=>{let e;return function(o){return(e||(e=L(nt)))(o||nt)}})(),nt.\u0275cmp=d({type:nt,selectors:[["ng-component"]],features:[E],decls:8,vars:7,consts:[["title","Tab Navigation","subtitle","Page with Tab Navigation"],["aria-label","A sample Tab Navigation",3,"selectedIndex","selectedIndexChange",4,"kirbyPageStickyContent"],["role","tabpanel"],[3,"innerHTML"],["aria-label","A sample Tab Navigation",3,"selectedIndexChange","selectedIndex"],["id","tab-navigation-item-0","aria-controls","tab-panel-0",3,"label"],["id","tab-navigation-item-1","aria-controls","tab-panel-1",3,"label"],["themeColor","warning"],["name","attach"],["id","tab-navigation-item-2","aria-controls","tab-panel-2",3,"truncate","label"],["themeColor","success"],["id","tab-navigation-item-3","aria-controls","tab-panel-3",3,"label"],["id","tab-navigation-item-4","aria-controls","tab-panel-4",3,"label"],["name","edit"],["id","tab-navigation-item-5","aria-controls","tab-panel-5",3,"label"],["name","dot"]],template:function(l,o){l&1&&(n(0,"kirby-page",0),w(1,Rd,15,14,"kirby-tab-navigation",1),n(2,"kirby-page-content")(3,"div",2)(4,"h2"),s(5),r(),O(6,Vd,2,0,"p"),p(7,"div",3),r()()()),l&2&&(c(3),Ke("id",yo("tab-panel-",o.selectedIndex))("aria-labelledby",yo("tab-navigation-item-",o.selectedIndex)),c(2),S("About ",o.labels[o.selectedIndex]),c(),I(o.selectedIndex%2===0?6:-1),c(),m("innerHTML",o.content,Y))},dependencies:[U,An,me,M,En,te,Fn],encapsulation:2});var aa=nt;var Gd={selector:"cookbook-progress-circle-example-default",template:'<kirby-progress-circle value="33"></kirby-progress-circle>'},wS=(()=>{let e=class e{constructor(){this.template=Gd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-default"]],decls:1,vars:0,consts:[["value","33"]],template:function(t,a){t&1&&p(0,"kirby-progress-circle",0)},dependencies:[fe],encapsulation:2});let i=e;return i})();var Ud={selector:"cookbook-progress-circle-example-sizes",template:`<kirby-progress-circle size="sm" value="25" themeColor="danger"><p>sm</p></kirby-progress-circle>
<kirby-progress-circle size="md" value="50" themeColor="warning"><p>md <em>(default)</em></p></kirby-progress-circle>
<kirby-progress-circle size="lg" value="75" themeColor="success"><p>lg</p></kirby-progress-circle>`},TS=(()=>{let e=class e{constructor(){this.template=Ud.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-sizes"]],decls:11,vars:0,consts:[["size","sm","value","25","themeColor","danger"],["size","md","value","50","themeColor","warning"],["size","lg","value","75","themeColor","success"]],template:function(t,a){t&1&&(n(0,"kirby-progress-circle",0)(1,"p"),s(2,"sm"),r()(),n(3,"kirby-progress-circle",1)(4,"p"),s(5,"md "),n(6,"em"),s(7,"(default)"),r()()(),n(8,"kirby-progress-circle",2)(9,"p"),s(10,"lg"),r()())},dependencies:[fe],styles:["[_nghost-%COMP%]{display:flex!important;align-items:center}kirby-progress-circle[_ngcontent-%COMP%]{margin-right:20px}kirby-progress-circle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;width:100%;height:100%;margin:0;text-align:center;font-size:12px;line-height:16px}kirby-progress-circle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:10px}"]});let i=e;return i})();var jd={selector:"cookbook-progress-circle-example-content-steps",template:`<kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
  2/4
</kirby-progress-circle>`},DS=(()=>{let e=class e{constructor(){this.template=jd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-content-steps"]],decls:2,vars:0,consts:[["themeColor","warning","value","50","size","sm",1,"kirby-text-xsmall"]],template:function(t,a){t&1&&(n(0,"kirby-progress-circle",0),s(1,` 2/4
`),r())},dependencies:[fe],encapsulation:2});let i=e;return i})();var Yd={selector:"cookbook-progress-circle-example-content-avatar",template:`<kirby-progress-circle value="25" themeColor="danger" size="sm">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>

<kirby-progress-circle value="50" themeColor="warning">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>

<kirby-progress-circle value="75" themeColor="success" size="lg">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>`},zS=(()=>{let e=class e{constructor(){this.template=Yd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-content-avatar"]],decls:9,vars:0,consts:[["value","25","themeColor","danger","size","sm"],["themeColor","white"],["name","kirby"],["value","50","themeColor","warning"],["value","75","themeColor","success","size","lg"]],template:function(t,a){t&1&&(n(0,"kirby-progress-circle",0)(1,"kirby-avatar",1),p(2,"kirby-icon",2),r()(),n(3,"kirby-progress-circle",3)(4,"kirby-avatar",1),p(5,"kirby-icon",2),r()(),n(6,"kirby-progress-circle",4)(7,"kirby-avatar",1),p(8,"kirby-icon",2),r()())},dependencies:[fe,V,Q,M],styles:["[_nghost-%COMP%]{display:flex!important;align-items:center}kirby-progress-circle[_ngcontent-%COMP%]{margin-right:20px}"]});let i=e;return i})();var Qd={selector:"cookbook-progress-circle-example-content-percent",template:'<kirby-progress-circle value="33" size="lg">33%</kirby-progress-circle>'},NS=(()=>{let e=class e{constructor(){this.template=Qd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-content-percent"]],decls:2,vars:0,consts:[["value","33","size","lg"]],template:function(t,a){t&1&&(n(0,"kirby-progress-circle",0),s(1,"33%"),r())},dependencies:[fe],encapsulation:2});let i=e;return i})();var la={selector:"cookbook-progress-circle-example-animated",template:`<kirby-progress-circle [themeColor]="themeColor" [value]="progress" size="lg">
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
  `},RS=(()=>{let e=class e{constructor(){this.template=la.template,this.codeSnippet=la.codeSnippet,this.progress=0,this.updateProgress=()=>{this.progress=Math.random()*100,this.progress>66.666?this.themeColor="success":this.progress>33.333?this.themeColor="warning":this.themeColor="danger"}}ngOnInit(){setInterval(this.updateProgress,2e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-animated"]],decls:3,vars:6,consts:[["size","lg",3,"themeColor","value"]],template:function(t,a){t&1&&(n(0,"kirby-progress-circle",0),s(1),X(2,"number"),r()),t&2&&(m("themeColor",a.themeColor)("value",a.progress),c(),S(" ",tn(2,3,a.progress,"1.1-1"),`%
`))},dependencies:[fe,an],encapsulation:2});let i=e;return i})();var Jd={selector:"cookbook-progress-circle-example-card",template:`<kirby-card hasPadding="true">
  <kirby-item>
    <kirby-label>
      <h2>Your investment savings</h2>
      <div>
        <data class="kirby-text-large">{{ 2435034 | currency }}</data>
      </div>
    </kirby-label>
    <kirby-progress-circle themeColor="success" value="37" slot="end">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
  </kirby-item>
</kirby-card>

<kirby-card hasPadding="true">
  <kirby-item>
    <kirby-progress-circle themeColor="success" value="37" slot="start">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
    <h2>Your investment savings</h2>
    <data slot="end" class="kirby-text-bold">{{ 2435034 | currency }}</data>
  </kirby-item>
</kirby-card>`},QS=(()=>{let e=class e{constructor(){this.template=Jd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-progress-circle-example-card"]],decls:20,vars:6,consts:[["hasPadding","true"],[1,"kirby-text-large"],["themeColor","success","value","37","slot","end"],["name","moneybag","size","md"],["themeColor","success","value","37","slot","start"],["slot","end",1,"kirby-text-bold"]],template:function(t,a){t&1&&(n(0,"kirby-card",0)(1,"kirby-item")(2,"kirby-label")(3,"h2"),s(4,"Your investment savings"),r(),n(5,"div")(6,"data",1),s(7),X(8,"currency"),r()()(),n(9,"kirby-progress-circle",2),p(10,"kirby-icon",3),r()()(),n(11,"kirby-card",0)(12,"kirby-item")(13,"kirby-progress-circle",4),p(14,"kirby-icon",3),r(),n(15,"h2"),s(16,"Your investment savings"),r(),n(17,"data",5),s(18),X(19,"currency"),r()()()),t&2&&(c(7),k(se(8,2,2435034)),c(11),k(se(19,4,2435034)))},dependencies:[T,f,fe,M,B,lt],styles:["[_nghost-%COMP%]{width:100%;max-width:500px}kirby-card[_ngcontent-%COMP%]:not(:first-of-type){margin-top:12px}"]});let i=e;return i})();var Zd={selector:"cookbook-range-default-example",template:'<kirby-range minLabel="Min label" maxLabel="Max label" aria-label="Default range" max="100" min="1" value="25"></kirby-range>'},XS=(()=>{let e=class e{constructor(){this.template=Zd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-range-default-example"]],decls:1,vars:0,consts:[["minLabel","Min label","maxLabel","Max label","aria-label","Default range","max","100","min","1","value","25"]],template:function(t,a){t&1&&p(0,"kirby-range",0)},dependencies:[ti],encapsulation:2});let i=e;return i})();var Xd={selector:"cookbook-range-step-example",template:'<kirby-range minLabel="Min value" maxLabel="Max value" aria-label="Step range" ticks="true" max="15" min="1" value="5"></kirby-range>'},i2=(()=>{let e=class e{constructor(){this.template=Xd.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-range-step-example"]],decls:1,vars:0,consts:[["minLabel","Min value","maxLabel","Max value","aria-label","Step range","ticks","true","max","15","min","1","value","5"]],template:function(t,a){t&1&&p(0,"kirby-range",0)},dependencies:[ti],encapsulation:2});let i=e;return i})();var ep={selector:"cookbook-range-disabled-form-example",template:'<kirby-range disabled minLabel="Min value" maxLabel="Max Value" aria-label="Disabled range" max="15" min="1"></kirby-range>'},r2=(()=>{let e=class e{constructor(){this.template=ep.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-range-disabled-form-example"]],decls:1,vars:0,consts:[["disabled","","minLabel","Min value","maxLabel","Max Value","aria-label","Disabled range","max","15","min","1"]],template:function(t,a){t&1&&p(0,"kirby-range",0)},dependencies:[ti],encapsulation:2});let i=e;return i})();var tp={selector:"cookbook-section-header-heading-with-label",template:`<kirby-section-header>
  <kirby-label>
    <h3 heading>Section Header</h3>
    <p label>With a label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card [hasPadding]="true">
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},m2=(()=>{let e=class e{constructor(){this.template=tp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-heading-with-label"]],decls:17,vars:1,consts:[["heading",""],["label",""],[3,"hasPadding"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-section-header")(1,"kirby-label")(2,"h3",0),s(3,"Section Header"),r(),n(4,"p",1),s(5,"With a label"),r()()(),n(6,"kirby-card",2)(7,"kirby-item")(8,"p",3),s(9,"Title"),r(),n(10,"data",4),s(11,"Value"),r()(),n(12,"kirby-item")(13,"p",3),s(14,"Title"),r(),n(15,"data",4),s(16,"Value"),r()()()),t&2&&(c(6),m("hasPadding",!0))},dependencies:[Ne,f,T,B],encapsulation:2});let i=e;return i})();var ip={selector:"cookbook-section-header-label-and-detail",template:`<kirby-section-header>
  <p label>Label</p>
  <p detail slot="end">Detail in end-slot</p>
</kirby-section-header>
<kirby-card [hasPadding]="true">
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},g2=(()=>{let e=class e{constructor(){this.template=ip.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-label-and-detail"]],decls:16,vars:1,consts:[["label",""],["detail","","slot","end"],[3,"hasPadding"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-section-header")(1,"p",0),s(2,"Label"),r(),n(3,"p",1),s(4,"Detail in end-slot"),r()(),n(5,"kirby-card",2)(6,"kirby-item")(7,"p",3),s(8,"Title"),r(),n(9,"data",4),s(10,"Value"),r()(),n(11,"kirby-item")(12,"p",3),s(13,"Title"),r(),n(14,"data",4),s(15,"Value"),r()()()),t&2&&(c(5),m("hasPadding",!0))},dependencies:[Ne,T,f],encapsulation:2});let i=e;return i})();var op={selector:"cookbook-section-header-heading-with-multiline-label",template:`<kirby-section-header>
  <kirby-label>
    <h3 heading> Section Header with multiline label</h3>
    <p label wrap>This label is quite lengthy, typically prone to truncation within a section header. However, with the <code>'wrap'</code> attribute applied, behold the magic of multiline functionality! Don't take my word for it; witness it yourself. It truly works. Can you believe that?</p>
  </kirby-label>
</kirby-section-header>
<kirby-card [hasPadding]="true">
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`},C2=(()=>{let e=class e{constructor(){this.template=op.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-heading-with-multiline-label"]],decls:15,vars:1,consts:[["heading",""],["label","","wrap",""],[3,"hasPadding"],[1,"kirby-item-title"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-section-header")(1,"kirby-label")(2,"h3",0),s(3," Section Header with multiline label"),r(),n(4,"p",1),s(5,"This label is quite lengthy, typically prone to truncation within a section header. However, with the "),n(6,"code"),s(7,"'wrap'"),r(),s(8," attribute applied, behold the magic of multiline functionality! Don't take my word for it; witness it yourself. It truly works. Can you believe that?"),r()()(),n(9,"kirby-card",2)(10,"kirby-item")(11,"p",3),s(12,"Title"),r(),n(13,"data",4),s(14,"Value"),r()()()),t&2&&(c(9),m("hasPadding",!0))},dependencies:[Ne,f,T,B],encapsulation:2});let i=e;return i})();var np={selector:"cookbook-section-header-with-card",template:`<kirby-section-header>
  <h3 heading>Contact Info</h3>
</kirby-section-header>
<kirby-card [hasPadding]="true">
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
</kirby-card>`},M2=(()=>{let e=class e{constructor(){this.template=np.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-section-header-with-card"]],decls:14,vars:1,consts:[["heading",""],[3,"hasPadding"],["slot","start","imageSrc","/assets/images/woman.png","altText","Example","size","sm","title","sm"],[1,"kirby-text-normal-bold"],[1,"kirby-item-detail"],["slot","end"]],template:function(t,a){t&1&&(n(0,"kirby-section-header")(1,"h3",0),s(2,"Contact Info"),r()(),n(3,"kirby-card",1)(4,"kirby-item"),p(5,"kirby-avatar",2),n(6,"kirby-label")(7,"p",3),s(8,"Name"),r(),n(9,"p",4),s(10,"Telephone"),r()(),n(11,"kirby-label",5)(12,"p",4),s(13,"contact@mail.com"),r()()()()),t&2&&(c(3),m("hasPadding",!0))},dependencies:[Ne,T,f,V,B],encapsulation:2});let i=e;return i})();var ri=(()=>{let e=class e{constructor(){this.items=[{text:"First item",id:"first"},{text:"Second item",id:"second"}],this.selectedSegment=this.items[0]}onSegmentSelect(o){this.selectedSegment=o}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["ng-component"]],decls:0,vars:0,template:function(t,a){},encapsulation:2});let i=e;return i})();var sa={template:`<kirby-segmented-control
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
}`},I2=(()=>{let e=class e extends ri{constructor(){super(...arguments),this.template=sa.template,this.codeSnippet=sa.codeSnippet}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-default"]],features:[E],decls:6,vars:5,consts:[[3,"segmentSelect","items","value"],["hasPadding","true"]],template:function(t,a){t&1&&(n(0,"kirby-segmented-control",0),b("segmentSelect",function(y){return a.onSegmentSelect(y)}),r(),n(1,"kirby-card",1)(2,"h2"),s(3),r(),n(4,"p"),s(5),r()()),t&2&&(m("items",a.items)("value",a.selectedSegment),c(3),S("Content for ",a.selectedSegment.text," segment"),c(2),Xo('The selected segment has text "',a.selectedSegment.text,'" and id "',a.selectedSegment.id,'"'))},dependencies:[Oe,T],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:16px}"]});let i=e;return i})();var rp={template:`<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  size="sm"
></kirby-segmented-control>

<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  size="md"
></kirby-segmented-control>`},z2=(()=>{let e=class e extends ri{constructor(){super(...arguments),this.template=rp.template}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-sizes"]],features:[E],decls:2,vars:4,consts:[["size","sm",3,"items","value"],["size","md",3,"items","value"]],template:function(t,a){t&1&&p(0,"kirby-segmented-control",0)(1,"kirby-segmented-control",1),t&2&&(m("items",a.items)("value",a.selectedSegment),c(),m("items",a.items)("value",a.selectedSegment))},dependencies:[Oe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:16px}"]});let i=e;return i})();var Lo={template:`<kirby-segmented-control
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
></kirby-segmented-control>`,codeSnippetChipItems:"chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));",codeSnippetCompactChipItems:"compactChipItems = [...'12345678'].map((i) => ({ text: `c${i}`, id: i }));"},N2=(()=>{let e=class e{constructor(){this.template=Lo.template,this.codeSnippet=Lo.codeSnippetChipItems+`

`+Lo.codeSnippetCompactChipItems,this.chipItems=[..."123456"].map(o=>({text:`Chip-${o}`,id:o})),this.compactChipItems=[..."12345678"].map(o=>({text:`c${o}`,id:o}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-modes"]],decls:2,vars:4,consts:[["mode","chip","size","sm",3,"items","selectedIndex"],["mode","compactChip","size","sm",3,"items","selectedIndex"]],template:function(t,a){t&1&&p(0,"kirby-segmented-control",0)(1,"kirby-segmented-control",1),t&2&&(m("items",a.chipItems)("selectedIndex",0),c(),m("items",a.compactChipItems)("selectedIndex",0))},dependencies:[Oe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:16px}"]});let i=e;return i})();function ap(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",5),s(3),r(),n(4,"p",6),s(5),r()(),n(6,"kirby-label",7)(7,"data",8),s(8),r()()()),i&2){let l=e.$implicit;c(3),k(l.title),c(2),k(l.mix.join(", ")),c(2),m("value",l.count),c(),k(l.count)}}var zo={template:`<div class="wrapper">
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
  margin-bottom: 16px;
}

kirby-segmented-control {
  margin-right: 8px;
}
`,`:host {
  display: block;
  margin-bottom: 16px;
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
}`},W2=(()=>{let e=class e{constructor(){this.template=zo.template,this.styles=`@use '@kirbydesign/core/src/scss/utils';

`+zo.styles[0].replace("8px;","utils.size('xxs');").replace("16px;","utils.size('s');"),this.codeSnippet=zo.codeSnippet,this.size="md",this.segmentItems=[{text:"Stone",id:"Stone"},{text:"Rick",id:"Rick"},{text:"Gooey",id:"Gooey"}],this.selectedSegment=this.segmentItems[0],this.separateSegment={text:"Show all",id:"all"},this.listItems=[{title:"Friend Throw",count:4,mix:["Fighter","Suplex","Beetle","Gooey"]},{title:"Ice Curling",count:3,mix:["Stone","Rick","Gooey"]},{title:"Magoloran Launch",count:3,mix:["Anyone (up to 3)"]},{title:"Thundersplash",count:1,mix:["Plasma"]},{title:"Rising Sizzler",count:2,mix:["Fire","Rick"]}]}onSegmentSelect(o){this.selectedSegment=o}get filteredListItems(){let o=this.selectedSegment.id;return o==="all"?this.listItems:this.listItems.filter(t=>t.mix.indexOf(o)>-1)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-grouped"]],decls:6,vars:7,consts:[[1,"wrapper"],[3,"segmentSelect","items","value","size"],["kirby-button","",3,"click","size","attentionLevel"],[3,"items"],[4,"kirbyListItemTemplate"],[1,"kirby-item-title"],[1,"kirby-item-detail"],["slot","end"],[3,"value"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"kirby-segmented-control",1),b("segmentSelect",function(y){return a.onSegmentSelect(y)}),r(),n(2,"button",2),b("click",function(){return a.onSegmentSelect(a.separateSegment)}),s(3),r()(),n(4,"kirby-list",3),w(5,ap,9,4,"kirby-item",4),r()),t&2&&(c(),m("items",a.segmentItems)("value",a.selectedSegment)("size",a.size),c(),m("size",a.size)("attentionLevel",a.selectedSegment===a.separateSegment?"2":"3"),c(),S(" ",a.separateSegment.text," "),c(),m("items",a.filteredListItems))},dependencies:[Oe,C,R,f,B,N],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:16px}kirby-segmented-control[_ngcontent-%COMP%]{margin-right:8px}","[_nghost-%COMP%]{display:block;margin-bottom:16px}"]});let i=e;return i})();var lp={template:`<kirby-segmented-control
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
];`},j2=(()=>{let e=class e{constructor(){this.codeSnippet=lp.codeSnippet,this.items=[{text:"First item",id:"first",badge:{content:"4",description:"4 unread messages",themeColor:"warning"}},{text:"Second item",id:"second",badge:{icon:"attach",description:"Item with attachment",themeColor:"success"}}],this.selectedSegment=this.items[0]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-with-badge"]],decls:1,vars:2,consts:[[3,"items","value"]],template:function(t,a){t&1&&p(0,"kirby-segmented-control",0),t&2&&m("items",a.items)("value",a.selectedSegment)},dependencies:[Oe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:16px}"]});let i=e;return i})();var sp={template:`<kirby-card hasPadding="true" [themeColor]="color">  
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
</div>`},eM=(()=>{let e=class e extends ri{constructor(){super(...arguments),this.template=sp.template.split('<div class="card-option-button-group">')[0],this.color="secondary"}setThemeColor(o){this.color=o}};e.\u0275fac=(()=>{let o;return function(a){return(o||(o=L(e)))(a||e)}})(),e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-example-color"]],features:[E],decls:7,vars:3,consts:[["hasPadding","true",3,"themeColor"],[3,"items","value"],[1,"card-option-button-group"],[1,"white",3,"click"],[1,"light",3,"click"],[1,"secondary",3,"click"],[1,"dark",3,"click"]],template:function(t,a){t&1&&(n(0,"kirby-card",0),p(1,"kirby-segmented-control",1),r(),n(2,"div",2)(3,"button",3),b("click",function(){return a.setThemeColor("white")}),r(),n(4,"button",4),b("click",function(){return a.setThemeColor("light")}),r(),n(5,"button",5),b("click",function(){return a.setThemeColor("secondary")}),r(),n(6,"button",6),b("click",function(){return a.setThemeColor("dark")}),r()()),t&2&&(m("themeColor",a.color),c(),m("items",a.items)("value",a.selectedSegment))},dependencies:[T,Q,Oe],styles:["[_nghost-%COMP%]{display:block}kirby-card[_ngcontent-%COMP%], kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:16px}kirby-segmented-control[_ngcontent-%COMP%]{margin-bottom:initial}.card-option-button-group[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:8px;padding:8px}button[_ngcontent-%COMP%]{height:44px;width:44px;border:none;border-radius:50%;margin:0;color:#fff;cursor:pointer}button.white[_ngcontent-%COMP%]{background-color:var(--kirby-white)}button.white[_ngcontent-%COMP%]:hover{background-color:var(--kirby-white-shade)}button.light[_ngcontent-%COMP%]{background-color:var(--kirby-light);outline:#fff 2px solid;border:#fff 2px solid}button.light[_ngcontent-%COMP%]:hover{background-color:var(--kirby-light-shade)}button.secondary[_ngcontent-%COMP%]{background-color:var(--kirby-secondary)}button.secondary[_ngcontent-%COMP%]:hover{background-color:var(--kirby-secondary-shade)}button.dark[_ngcontent-%COMP%]{background-color:var(--kirby-dark)}button.dark[_ngcontent-%COMP%]:hover{background-color:var(--kirby-dark-shade)}button[_ngcontent-%COMP%]:active{transform:scale(.95)}"]});let i=e;return i})();var ca={selector:"cookbook-segmented-control-reactive-forms-example",template:`<form [formGroup]="form">
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
  }`},aM=(()=>{let e=class e{constructor(o){this.formBuilder=o,this.template=ca.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=ca.codeSnippet,this.viewItems=[{text:"Stone",id:"1"},{text:"Rick",id:"2"},{text:"Gooey",id:"3"}],this.form=this.formBuilder.group({view:new ai(this.viewItems[0])}),this.isEnabled=!0}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}};e.\u0275fac=function(t){return new(t||e)(x(Ve))},e.\u0275cmp=d({type:e,selectors:[["cookbook-segmented-control-reactive-forms-example"]],decls:5,vars:5,consts:[[3,"formGroup"],["formControlName","view",3,"items","disabled"],["text","Form field enabled",3,"checkedChange","checked"],[3,"form"]],template:function(t,a){t&1&&(n(0,"form",0),p(1,"kirby-segmented-control",1),r(),n(2,"cookbook-example-configuration-wrapper")(3,"kirby-checkbox",2),b("checkedChange",function(){return a.toggleEnabled()}),r(),p(4,"cookbook-reactive-form-state",3),r()),t&2&&(m("formGroup",a.form),c(),m("items",a.viewItems)("disabled",!a.isEnabled),c(2),m("checked",a.isEnabled),c(),m("form",a.form))},dependencies:[xe,Me,ke,Se,Pe,Ee,Te,Oe,z,Ce,qe],styles:["[_nghost-%COMP%]{display:flex;gap:1rem}"]});let i=e;return i})();var cp={selector:"cookbook-simple-slide-button-example",template:`<kirby-slide-button
  [text]="'Slide to confirm'"
  aria-label="Confirm"
  (slideDone)="showAlert()"
></kirby-slide-button>`},cM=(()=>{let e=class e{constructor(o){this.modalController=o,this.template=cp.template}showAlert(){let o={title:"Confirmation",message:"Are you sure you want to proceed?",okBtn:"Ok",cancelBtn:"Cancel"};this.modalController.showAlert(o,this.onAlertClosed)}onAlertClosed(o){console.log(`Alert selection: ${o}`)}};e.\u0275fac=function(t){return new(t||e)(x(ae))},e.\u0275cmp=d({type:e,selectors:[["cookbook-simple-slide-button-example"]],decls:1,vars:1,consts:[["aria-label","Confirm",3,"slideDone","text"]],template:function(t,a){t&1&&(n(0,"kirby-slide-button",0),b("slideDone",function(){return a.showAlert()}),r()),t&2&&m("text","Slide to confirm")},dependencies:[Ji],encapsulation:2});let i=e;return i})();var mp={selector:"cookbook-expand-block-slide-button-example",template:`<kirby-slide-button
  [text]="'Slide to confirm'"
  aria-label="Confirm"
  expand="block"
  (slideDone)="showAlert()"
></kirby-slide-button>
`},pM=(()=>{let e=class e{constructor(o){this.modalController=o,this.template=mp.template}showAlert(){let o={title:"Confirmation",message:"Are you sure you want to proceed?",okBtn:"Ok",cancelBtn:"Cancel"};this.modalController.showAlert(o,this.onAlertClosed)}onAlertClosed(o){console.log(`Alert selection: ${o}`)}};e.\u0275fac=function(t){return new(t||e)(x(ae))},e.\u0275cmp=d({type:e,selectors:[["cookbook-expand-block-slide-button-example"]],decls:1,vars:1,consts:[["aria-label","Confirm","expand","block",3,"slideDone","text"]],template:function(t,a){t&1&&(n(0,"kirby-slide-button",0),b("slideDone",function(){return a.showAlert()}),r()),t&2&&m("text","Slide to confirm")},dependencies:[Ji],encapsulation:2});let i=e;return i})();function dp(i,e){if(i&1&&(n(0,"kirby-card",2),p(1,"kirby-card-header",3),n(2,"div",4),s(3),r()()),i&2){let l=e.$implicit;m("hasPadding",!0),c(),m("title",l.title)("subtitle",l.subtitle),c(2),S(" ",l.cardContent," ")}}var pp={selector:"cookbook-slides-custom-heading-example",template:`<kirby-slides [slides]="slides" [showNavigation]="true">    
  <h3>Custom heading</h3>
  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`},yM=(()=>{let e=class e{constructor(){this.template=pp.template,this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-slides-custom-heading-example"]],decls:4,vars:2,consts:[[3,"slides","showNavigation"],[3,"hasPadding",4,"kirbySlide"],[3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(t,a){t&1&&(n(0,"kirby-slides",0)(1,"h3"),s(2,"Custom heading"),r(),w(3,dp,4,4,"kirby-card",1),r()),t&2&&m("slides",a.slides)("showNavigation",!0)},dependencies:[ut,pt,T,ce],styles:["[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]});let i=e;return i})();function up(i,e){if(i&1&&(n(0,"kirby-card",2),p(1,"kirby-card-header",3),n(2,"div",4),s(3),r()()),i&2){let l=e.$implicit;m("hasPadding",!0),c(),m("title",l.title)("subtitle",l.subtitle),c(2),S(" ",l.cardContent," ")}}var bp={selector:"cookbook-slides-height-example",template:`<kirby-slides [slides]="slides" [title]="'Title'" [showNavigation]="true">
  <kirby-card *kirbySlide="let slide; let i = index" slideStretchHeight [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`},CM=(()=>{let e=class e{constructor(){this.template=bp.template,this.lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",this.additionalLorem="Fusce rhoncus leo quis libero posuere auctor.",this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:(o+1)%2!==0?this.lorem:this.lorem+this.additionalLorem}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-slides-height-example"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],["slideStretchHeight","",3,"hasPadding",4,"kirbySlide"],["slideStretchHeight","",3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(t,a){t&1&&(n(0,"kirby-slides",0),w(1,up,4,4,"kirby-card",1),r()),t&2&&m("slides",a.slides)("title","Title")("showNavigation",!0)},dependencies:[ut,pt,T,ce,In],styles:["[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]});let i=e;return i})();function gp(i,e){if(i&1&&(n(0,"kirby-card",2),p(1,"kirby-card-header",3),n(2,"div",4),s(3),r()()),i&2){let l=e.$implicit;m("hasPadding",!0),c(),m("title",l.title)("subtitle",l.subtitle),c(2),S(" ",l.cardContent," ")}}var yp={selector:"cookbook-slides-simple-example",template:`<kirby-slides [slides]="slides" [title]="'Title'" [showNavigation]="true">
  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`},wM=(()=>{let e=class e{constructor(){this.template=yp.template,this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-slides-simple-example"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],[3,"hasPadding",4,"kirbySlide"],[3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(t,a){t&1&&(n(0,"kirby-slides",0),w(1,gp,4,4,"kirby-card",1),r()),t&2&&m("slides",a.slides)("title","Title")("showNavigation",!0)},dependencies:[ut,pt,T,ce],styles:["[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]});let i=e;return i})();function hp(i,e){if(i&1&&(n(0,"kirby-card",5),p(1,"kirby-card-header",6),n(2,"div"),s(3),r()()),i&2){let l=e.$implicit;m("hasPadding",!0),c(),m("title",l.title)("subtitle",l.subtitle),c(2),k(l.cardContent)}}var kp={selector:"cookbook-slides-advanced-example",template:`<kirby-slides
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
</button>`},Nt=class Nt{constructor(e){this.toastController=e,this.config={slidesPerView:1.1,breakpoints:{768:{centeredSlides:!1,slidesPerView:2,slidesPerGroup:1}}},this.slides=[...Array(9).keys()].map(l=>({title:`Slide ${l+1}`,subtitle:`Subtitle ${l+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}getDataFromActiveSlide(e){let l={message:`Changed to ${e.slide.title}`,messageType:"success",durationInMs:1e3};this.toastController.showToast(l)}showAll(){let e={message:"See all... (your handler here)",messageType:"success",durationInMs:2e3};this.toastController.showToast(e)}};Nt.template=kp.template,Nt.\u0275fac=function(l){return new(l||Nt)(x($))},Nt.\u0275cmp=d({type:Nt,selectors:[["cookbook-slides-advanced-example"]],decls:7,vars:4,consts:[["slidesInstance",""],[3,"slideChange","slidesOptions","slides","title","showNavigation"],[3,"hasPadding",4,"kirbySlide"],["kirby-button","","attentionLevel","3","size","xs",3,"click"],["kirby-button","",2,"display","block","margin","24px auto 0",3,"click"],[3,"hasPadding"],[3,"title","subtitle"]],template:function(l,o){if(l&1){let t=P();n(0,"kirby-slides",1,0),b("slideChange",function(g){return v(t),_(o.getDataFromActiveSlide(g))}),w(2,hp,4,4,"kirby-card",2),n(3,"button",3),b("click",function(){return v(t),_(o.showAll())}),s(4,"See all"),r()(),n(5,"button",4),b("click",function(){v(t);let g=ee(1);return _(g.slideTo(3))}),s(6,` Activate slide no. 4
`),r()}l&2&&m("slidesOptions",o.config)("slides",o.slides)("title","Title")("showNavigation",!0)},dependencies:[ut,pt,T,C,ce],styles:["[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}",".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}"]});var ma=Nt;var OM=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-spinner-example"]],decls:1,vars:0,template:function(t,a){t&1&&p(0,"kirby-spinner")},dependencies:[Oi],encapsulation:2});let i=e;return i})();var{getThemeColorHexString:fp}=Re,pa={selector:"cookbook-stock-chart-example-simple-dataset",template:`
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
    `},LM=(()=>{let e=class e{constructor(){this.template=pa.template,this.codeSnippet=pa.codeSnippet,this._dataLabelOptions={showMin:!0,showMax:!0},this._dataset=[{data:[{x:1637049659e3,y:127.15},{x:1637049662e3,y:127.15},{x:163704976e4,y:127.08},{x:1637049926e3,y:127.08},{x:163705049e4,y:126.93},{x:1637050637e3,y:127.25},{x:1637050736e3,y:127.08},{x:1637050797e3,y:127.03},{x:1637050923e3,y:127.03},{x:163705116e4,y:127.08}],borderColor:fp("secondary")}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-stock-chart-example-simple-dataset"]],decls:1,vars:2,consts:[[3,"data","dataLabelOptions"]],template:function(t,a){t&1&&p(0,"kirby-stock-chart",0),t&2&&m("data",a._dataset)("dataLabelOptions",a._dataLabelOptions)},dependencies:[Zi],encapsulation:2});let i=e;return i})();var{getThemeColorHexString:Bo}=Re,ua={selector:"cookbook-stock-chart-example-comparison",template:`
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
    `},NM=(()=>{let e=class e{constructor(){this.template=ua.template,this.codeSnippet=ua.codeSnippet,this._dataLabelOptions={locale:"da-DK",valueSuffix:"%"},this._datasets=[{data:[{x:1628294399e3,y:49.8},{x:1628553599e3,y:49.6},{x:1628639999e3,y:49.6},{x:1628726399e3,y:49.6},{x:1628899199e3,y:50},{x:1629158399e3,y:50},{x:1629244799e3,y:50},{x:1629331199e3,y:49.8},{x:1629417599e3,y:51.5},{x:1629503999e3,y:51.5}],borderColor:Bo("secondary")},{data:[{x:1628294399e3,y:49.8},{x:1628553599e3,y:69.6},{x:1628639999e3,y:39.6},{x:1628726399e3,y:69.6},{x:1628899199e3,y:30},{x:1629158399e3,y:60},{x:1629244799e3,y:30},{x:1629331199e3,y:59.8},{x:1629417599e3,y:81.5},{x:1629503999e3,y:81.5}],borderColor:Bo("primary")},{data:[{x:1628294399e3,y:49.8},{x:1628553599e3,y:59.6},{x:1628639999e3,y:69.6},{x:1628726399e3,y:-49.6},{x:1628899199e3,y:50},{x:1629158399e3,y:150},{x:1629244799e3,y:150},{x:1629331199e3,y:149.8},{x:1629417599e3,y:151.5},{x:1629503999e3,y:151.5}],borderColor:Bo("semi-dark")}]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-stock-chart-example-comparison"]],decls:1,vars:2,consts:[[3,"data","dataLabelOptions"]],template:function(t,a){t&1&&p(0,"kirby-stock-chart",0),t&2&&m("data",a._datasets)("dataLabelOptions",a._dataLabelOptions)},dependencies:[Zi],encapsulation:2});let i=e;return i})();var KM=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-styling-html-lists-example"]],decls:122,vars:0,template:function(t,a){t&1&&(n(0,"section")(1,"h2"),s(2,"Examples"),r(),n(3,"div")(4,"kirby-card")(5,"h3"),s(6,"Unordered list"),r(),n(7,"p"),s(8," Lorem ipsum dolor sit, amet consectetur adipisicing delectus perspiciatis illo corrupti ad, eius voluptas. "),r(),n(9,"ul")(10,"li"),s(11,"Aenean id odio turpis"),r(),n(12,"li"),s(13,"Lorem ipsum dolor sit amet"),r(),n(14,"li"),s(15,"Donec ullamcorper, risus id venenatis"),r()(),n(16,"p"),s(17," Voluptatum hic consectetur ea odit cupiditate corrupti, doloremque, nisi, cumque quisquam ipsa? "),r()(),n(18,"kirby-card")(19,"h3"),s(20,"Ordered list"),r(),n(21,"p"),s(22," Lorem ipsum dolor sit amet consectetur adipisicing pariatur accusantium optio debitis dolore beatae. "),r(),n(23,"ol")(24,"li"),s(25,"Nulla cursus sem nulla"),r(),n(26,"li"),s(27,"Sed egestas lorem pharetra"),r(),n(28,"li"),s(29,"Pellentesque habitant morbi"),r()(),n(30,"p"),s(31,"Ipsum, vero est? Iusto ipsum cumque nemo aut exercitationem!"),r()(),n(32,"kirby-card")(33,"h3"),s(34,"Nested list (unordered)"),r(),n(35,"p"),s(36," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure unde eos enim omnis, nulla veniam laudantium. "),r(),n(37,"ul")(38,"li"),s(39," Dignissim et lorem mollis "),n(40,"ul")(41,"li"),s(42,"Duis eget tincidunt sapien"),r(),n(43,"li"),s(44," Donec pulvinar aliquet turpis "),n(45,"ul")(46,"li"),s(47,"Praesent vitae augue sed"),r(),n(48,"li"),s(49,"Vitae convallis enim lobortis"),r()()(),n(50,"li"),s(51,"Phasellus viverra ipsum sed"),r()()(),n(52,"li"),s(53,"Maecenas purus sapien"),r(),n(54,"li"),s(55,"Pellentesque ultricies mi"),r()(),n(56,"p"),s(57," Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsum quas modi temporibus iusto, error commodi minima architecto nam iste nulla perferendis. "),r()(),n(58,"kirby-card")(59,"h3"),s(60,"Nested list (ordered)"),r(),n(61,"p"),s(62," Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deserunt libero rerum excepturi. "),r(),n(63,"ol")(64,"li"),s(65," Vestibulum in tortor vulputate "),n(66,"ol")(67,"li"),s(68,"Fusce iaculis ante ac diam"),r(),n(69,"li"),s(70," Maecenas nec convallis orci "),n(71,"ol")(72,"li"),s(73,"Praesent ut felis quis"),r(),n(74,"li"),s(75,"Etiam quis placerat neque"),r()()(),n(76,"li"),s(77,"Ac elementum nisi eleifend"),r()()(),n(78,"li"),s(79,"Proin consectetur pharetra"),r(),n(80,"li"),s(81,"Aeneanlobortis porta dictum"),r()(),n(82,"p"),s(83," Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa autem ratione iure vero laboriosam velit rerum nesciunt quia amet ad vitae totam, tempore magni harum at. "),r()(),n(84,"kirby-card")(85,"h3"),s(86,"Nested list (mixed unordered and ordered)"),r(),n(87,"p"),s(88," Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus molestiae aliquam veniam accusamus dolor optio dignissimos, et iure! Repellat quod veniam obcaecati aliquid expedita velit autem deleniti? Dolorum, vitae exercitationem. "),r(),n(89,"ol")(90,"li"),s(91,"Proin at pharetra ligula"),r(),n(92,"li"),s(93," Sit amet blandit tortor dignissim "),n(94,"ul")(95,"li"),s(96," In pulvinar massa ac porttitor "),n(97,"ul")(98,"li"),s(99,"Proin at pharetra ligula"),r()()(),n(100,"li"),s(101,"Consectetur adipiscing elit"),r(),n(102,"li"),s(103,"Mauris fringilla sodales nulla"),r()()(),n(104,"li"),s(105,"Integer id diam eleifend ac"),r()(),n(106,"p"),s(107," Optio culpa, consequatur necessitatibus repellat, laborum eum sunt reprehenderit tempora aperiam facilis? "),r()(),n(108,"kirby-card")(109,"h3"),s(110,"Text overflow (normal wrap)"),r(),n(111,"p"),s(112," Lorem ipsum dolor sit amet consectetur adipisicing elit recusandae eum officiis cupiditate quos, quod non ad veniam ex voluptatibus tempore enim modi. "),r(),n(113,"ul")(114,"li"),s(115," Proin at pharetra ligula, donec ullamcorper, risus id venenatis. Integer id diam eleifend ac, consectetur adipiscing elit. Fusce iaculis ante ac diam. "),r(),n(116,"li"),s(117," Proin at pharetra ligula, donec ullamcorper, risus id venenatis. Integer id diam eleifend ac, consectetur adipiscing elit. Fusce iaculis ante ac diam. "),r(),n(118,"li"),s(119," Proin at pharetra ligula, donec ullamcorper, risus id venenatis. Integer id diam eleifend ac, consectetur adipiscing elit. Fusce iaculis ante ac diam. "),r()(),n(120,"p"),s(121,"Quidem magnam ad architecto quod modi explicabo reiciendis omnis perferendis."),r()()()())},dependencies:[T],styles:["div[_ngcontent-%COMP%]{display:grid;gap:2rem;grid-template-columns:repeat(auto-fill,minmax(40ch,1fr))}h2[_ngcontent-%COMP%]{grid-column:1/-1}kirby-card[_ngcontent-%COMP%]{padding:2rem}kirby-card[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{margin-block-end:0}"]});let i=e;return i})();var Cp=`showToast(messageType?: MessageType) {
  const message =
    messageType === 'warning' ? 'Your warning toast message' : 'Your successful toast message';
  
  const config: ToastConfig = {
    message,
    messageType,
    durationInMs: 5000,
  };
  this.toastController.showToast(config, this.onToastClosed);
}

private onToastClosed() {
  console.log(\`Toast closed\`);
}`,WM=(()=>{let e=class e{constructor(o){this.toastController=o}showToast(o){let a={message:o==="warning"?"Your warning toast message":"Your successful toast message",messageType:o,durationInMs:5e3};this.toastController.showToast(a,this.onToastClosed)}onToastClosed(){console.log("Toast closed")}};e.ts=Cp,e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-toast-example"]],decls:4,vars:0,consts:[["kirby-button","",3,"click"]],template:function(t,a){t&1&&(n(0,"button",0),b("click",function(){return a.showToast()}),s(1,"Show success toast (default)"),r(),n(2,"button",0),b("click",function(){return a.showToast("warning")}),s(3,"Show warning toast"),r())},dependencies:[C],styles:[".example-container[_ngcontent-%COMP%]{margin:32px auto;max-width:768px}.example-frame[_ngcontent-%COMP%]{position:relative;border:1px solid var(--kirby-medium);border-radius:12px;padding:32px}.example-frame.no-padding[_ngcontent-%COMP%]{padding:0}@media(max-width:767px){.example-frame[_ngcontent-%COMP%]{margin-inline:-16px;padding-inline:16px}}[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding-inline:24px;padding-block:16px;box-sizing:border-box}@media(min-width:768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:4px}","[_nghost-%COMP%]{display:grid;place-content:center;overflow-y:auto}[_nghost-%COMP%] > button[_ngcontent-%COMP%]{min-width:15rem}"]});let i=e;return i})();var xp={selector:"cookbook-toggle-button-default",template:`<kirby-toggle-button>
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
</kirby-toggle-button>`},jM=(()=>{let e=class e{constructor(){this.template=xp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-default"]],decls:10,vars:1,consts:[["kirby-button","","unchecked","","attentionLevel","3","aria-label","Notifications disabled"],["name","notification"],["kirby-button","","checked","","attentionLevel","3","aria-label","Notifications enabled"],["name","notification-fill"],[3,"checked"],["kirby-button","","unchecked","","attentionLevel","3"],["kirby-button","","checked","","attentionLevel","2"]],template:function(t,a){t&1&&(n(0,"kirby-toggle-button")(1,"button",0),p(2,"kirby-icon",1),r(),n(3,"button",2),p(4,"kirby-icon",3),r()(),n(5,"kirby-toggle-button",4)(6,"button",5),s(7,"Deactivated"),r(),n(8,"button",6),s(9,"Activated"),r()()),t&2&&(c(5),m("checked",!0))},dependencies:[bt,C,M],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var vp={selector:"cookbook-toggle-button-theme-color",template:`<kirby-toggle-button [checked]="true">
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
</kirby-toggle-button>`},JM=(()=>{let e=class e{constructor(){this.template=vp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-theme-color"]],decls:15,vars:3,consts:[[3,"checked"],["kirby-button","","unchecked","","attentionLevel","3"],["kirby-button","","checked","","themeColor","success"],["kirby-button","","checked","","themeColor","warning"],["kirby-button","","checked","","themeColor","danger"]],template:function(t,a){t&1&&(n(0,"kirby-toggle-button",0)(1,"button",1),s(2,"Deactivated"),r(),n(3,"button",2),s(4,"Activated"),r()(),n(5,"kirby-toggle-button",0)(6,"button",1),s(7,"Deactivated"),r(),n(8,"button",3),s(9,"Activated"),r()(),n(10,"kirby-toggle-button",0)(11,"button",1),s(12,"Deactivated"),r(),n(13,"button",4),s(14,"Activated"),r()()),t&2&&(m("checked",!0),c(5),m("checked",!0),c(5),m("checked",!0))},dependencies:[bt,C],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var _p={selector:"cookbook-toggle-button-disabled",template:`<kirby-toggle-button>
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
</kirby-toggle-button>`},eT=(()=>{let e=class e{constructor(){this.template=_p.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-disabled"]],decls:10,vars:0,consts:[["kirby-button","","unchecked","","aria-disabled","true","attentionLevel","3","aria-label","Notifications disabled"],["name","notification"],["kirby-button","","checked","","attentionLevel","3","aria-label","Notifications enabled"],["name","notification-fill"],["kirby-button","","unchecked","","aria-disabled","true","attentionLevel","3"],["kirby-button","","checked",""]],template:function(t,a){t&1&&(n(0,"kirby-toggle-button")(1,"button",0),p(2,"kirby-icon",1),r(),n(3,"button",2),p(4,"kirby-icon",3),r()(),n(5,"kirby-toggle-button")(6,"button",4),s(7,"Disabled"),r(),n(8,"button",5),s(9,"Activated"),r()())},dependencies:[bt,C,M],styles:["[_nghost-%COMP%]{display:block}"]});let i=e;return i})();var ba={selector:"cookbook-toggle-button-reactive-forms-example",template:`<form [formGroup]="form">
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
}`},aT=(()=>{let e=class e{constructor(o){this.formBuilder=o,this.template=ba.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=ba.codeSnippet,this.form=this.formBuilder.group({notifications:new ai(!1),status:new ai(!1)}),this.isEnabled=!0}toggleEnabled(){this.isEnabled=!this.isEnabled,this.isEnabled?this.form.enable():this.form.disable()}};e.\u0275fac=function(t){return new(t||e)(x(Ve))},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-button-reactive-forms-example"]],decls:16,vars:5,consts:[[3,"formGroup"],[1,"toggle-buttons"],["formControlName","notifications",3,"disabled"],["kirby-button","","unchecked","","attentionLevel","3","aria-label","Notifications disabled"],["name","notification"],["kirby-button","","checked","","attentionLevel","3","aria-label","Notifications enabled"],["name","notification-fill"],["formControlName","status",3,"disabled"],["kirby-button","","unchecked","","attentionLevel","3"],["kirby-button","","checked","","attentionLevel","2"],[3,"checkedChange","checked"],[3,"form"]],template:function(t,a){t&1&&(n(0,"form",0)(1,"div",1)(2,"kirby-toggle-button",2)(3,"button",3),p(4,"kirby-icon",4),r(),n(5,"button",5),p(6,"kirby-icon",6),r()(),n(7,"kirby-toggle-button",7)(8,"button",8),s(9,"Deactivated"),r(),n(10,"button",9),s(11,"Activated"),r()()()(),n(12,"cookbook-example-configuration-wrapper")(13,"kirby-checkbox",10),b("checkedChange",function(){return a.toggleEnabled()}),s(14," Form field enabled "),r(),p(15,"cookbook-reactive-form-state",11),r()),t&2&&(m("formGroup",a.form),c(2),m("disabled",!a.isEnabled),c(5),m("disabled",!a.isEnabled),c(6),m("checked",a.isEnabled),c(2),m("form",a.form))},dependencies:[bt,C,M,z,xe,Me,ke,Se,Ce,qe,Pe,Ee,Te],styles:["[_nghost-%COMP%]{display:flex;gap:1rem}.toggle-buttons[_ngcontent-%COMP%]{display:flex;flex-direction:column}cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{flex:1}"]});let i=e;return i})();var wp={selector:"cookbook-toggle-default-example",template:`<kirby-toggle>Default</kirby-toggle>
<kirby-toggle checked="true" (checkedChange)="onCheckedChange($event)">Checked</kirby-toggle>
<kirby-toggle disabled="true">Disabled</kirby-toggle>`},cT=(()=>{let e=class e{constructor(){this.template=wp.template}onCheckedChange(o){console.log(`Toggle onCheckedChange: ${o}`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-default-example"]],decls:6,vars:0,consts:[["checked","true",3,"checkedChange"],["disabled","true"]],template:function(t,a){t&1&&(n(0,"kirby-toggle"),s(1,"Default"),r(),n(2,"kirby-toggle",0),b("checkedChange",function(y){return a.onCheckedChange(y)}),s(3,"Checked"),r(),n(4,"kirby-toggle",1),s(5,"Disabled"),r())},dependencies:[ze],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;gap:16px}@media(min-width:768px){[_nghost-%COMP%]{flex-direction:row;gap:40px}}"]});let i=e;return i})();var ga={selector:"cookbook-toggle-reactive-forms-example",template:`<form [formGroup]="form">
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
`},kT=(()=>{let e=class e{constructor(o){this.fb=o,this.template=ga.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=ga.codeSnippet}ngOnInit(){this.form=this.fb.group({myToggle:[!1]})}onCheckedChange(){console.log("Value:",this.form.get("myToggle")?.value)}toggleEnabled(o){o?this.form.get("myToggle")?.enable():this.form.get("myToggle")?.disable()}};e.\u0275fac=function(t){return new(t||e)(x(Ve))},e.\u0275cmp=d({type:e,selectors:[["cookbook-toggle-reactive-forms-example"]],decls:7,vars:3,consts:[[3,"formGroup"],["slot","end","formControlName","myToggle",3,"checkedChange"],["text","Form field enabled",3,"checkedChange","checked"],[3,"form"]],template:function(t,a){t&1&&(n(0,"form",0)(1,"kirby-item")(2,"kirby-toggle",1),b("checkedChange",function(){return a.onCheckedChange()}),s(3,"Toggle in form"),r()()(),n(4,"cookbook-example-configuration-wrapper")(5,"kirby-checkbox",2),b("checkedChange",function(y){return a.toggleEnabled(y)}),r(),p(6,"cookbook-reactive-form-state",3),r()),t&2&&(m("formGroup",a.form),c(5),m("checked",!0),c(),m("form",a.form))},dependencies:[xe,Me,ke,Se,Pe,Ee,Te,vn,f,ze,Ce,z,qe],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;gap:16px}@media(min-width:768px){[_nghost-%COMP%]{flex-direction:row;gap:40px}}"]});let i=e;return i})();var Sp={selector:"cookbook-radio-states-example",template:`<kirby-radio-group aria-label="Radio state example">
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
</kirby-radio-group>`},xT=(()=>{let e=class e{constructor(){this.template=Sp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-states-example"]],decls:10,vars:2,consts:[["aria-label","Radio state example"],["text","Default"],["value","bacon"],["value","bacon","text","Checked"],["text","Disabled",3,"disabled"],["disabled","true","value","bacon","text","Disabled checked"],[3,"hasError"],["text","Has error"]],template:function(t,a){t&1&&(n(0,"kirby-radio-group",0),p(1,"kirby-radio",1),r(),n(2,"kirby-radio-group",2),p(3,"kirby-radio",3),r(),n(4,"kirby-radio-group"),p(5,"kirby-radio",4),r(),n(6,"kirby-radio-group",2),p(7,"kirby-radio",5),r(),n(8,"kirby-radio-group",6),p(9,"kirby-radio",7),r()),t&2&&(c(5),m("disabled",!0),c(3),m("hasError",!0))},dependencies:[de,ve],styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap}kirby-radio[_ngcontent-%COMP%]{margin-right:16px}"]});let i=e;return i})();var Mp={selector:"cookbook-radio-sizes-example",template:`<kirby-radio-group aria-label="Radio size example">
  <kirby-radio size="xs" text="Extra Small"></kirby-radio>
  <kirby-radio size="sm" text="Small"></kirby-radio>
  <kirby-radio size="md" text="Medium (default)"></kirby-radio>
<kirby-radio-group>`},wT=(()=>{let e=class e{constructor(){this.template=Mp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-sizes-example"]],decls:5,vars:0,consts:[["aria-label","Radio size example"],["size","xs","text","Extra Small"],["size","sm","text","Small"],["size","md","text","Medium (default)"]],template:function(t,a){t&1&&(n(0,"kirby-radio-group",0),p(1,"kirby-radio",1)(2,"kirby-radio",2)(3,"kirby-radio",3)(4,"kirby-radio-group"),r())},dependencies:[de,ve],styles:['kirby-checkbox[_ngcontent-%COMP%], kirby-radio[_ngcontent-%COMP%]{margin-bottom:8px;background-color:var(--kirby-semi-light);position:relative}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:after{height:100%;border:1px solid var(--kirby-danger);position:absolute;right:0}kirby-checkbox[_ngcontent-%COMP%]:before, kirby-radio[_ngcontent-%COMP%]:before{content:"";border-left:0;border-right:0;width:9px}kirby-checkbox[_ngcontent-%COMP%]:after, kirby-radio[_ngcontent-%COMP%]:after{content:"md: 56px";border-left:0;border-top:0;border-bottom:0;line-height:56px;font-size:12px;color:var(--kirby-danger);padding-right:8px;margin-right:4px;vertical-align:center}kirby-radio.xs[_ngcontent-%COMP%]:after{content:"xs: 32px";line-height:32px}kirby-radio.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-radio.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox.xs[_ngcontent-%COMP%]:after{content:"xs: 24px";line-height:24px}kirby-checkbox.sm[_ngcontent-%COMP%]:after{content:"sm: 44px";line-height:44px}kirby-checkbox.md[_ngcontent-%COMP%]:after{content:"md: 56px";line-height:56px}kirby-checkbox[_ngcontent-%COMP%]     ion-checkbox, kirby-radio[_ngcontent-%COMP%]     ion-radio{background-color:#f7e0f0;margin-right:80px}']});let i=e;return i})();var Tp={selector:"cookbook-radio-multiline-example",template:`<kirby-radio
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,&#10; sed do eiusmod tempor incididunt ut labore et dolore &#10; magna aliqua.">
</kirby-radio>`},TT=(()=>{let e=class e{constructor(){this.template=Tp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-multiline-example"]],decls:1,vars:0,consts:[["text",`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 sed do eiusmod tempor incididunt ut labore et dolore 
 magna aliqua.`]],template:function(t,a){t&1&&p(0,"kirby-radio",0)},dependencies:[ve],encapsulation:2});let i=e;return i})();var ya=[{title:"Bacon",value:1},{title:"Salami",value:2},{title:"Tenderloin",value:3},{title:"Veggie (not an option)",value:4,disabled:!0}],$o={selector:"cookbook-radio-example-binding",template:`<kirby-radio-group
  aria-label="Select main course"
  [items]="items"
  itemTextProperty="title"
  [value]="selected"
  (valueChange)="onChange($event)">
</kirby-radio-group>`,twoWayBindingTemplate:'<kirby-radio-group [items]="items" [(value)]="selected"></kirby-radio-group>',codeSnippet:`items = ${He(ya)};

selected = this.items[0];

onChange(value: string | YourDataType) {
  ...
}`},OT=(()=>{let e=class e{constructor(o){this.toastController=o,this.template=$o.template,this.twoWayBindingTemplate=$o.twoWayBindingTemplate,this.codeSnippet=$o.codeSnippet,this.items=ya,this.selected=this.items[0]}onChange(o){let t={message:`Item '${o.title} (value: ${o.value})' was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-example-binding"]],decls:1,vars:2,consts:[["aria-label","Select main course","itemTextProperty","title",3,"valueChange","items","value"]],template:function(t,a){t&1&&(n(0,"kirby-radio-group",0),b("valueChange",function(y){return a.onChange(y)}),r()),t&2&&m("items",a.items)("value",a.selected)},dependencies:[de],encapsulation:2});let i=e;return i})();function Ep(i,e){if(i&1&&(n(0,"div",2),p(1,"kirby-radio",3),n(2,"span",4),s(3),r()()),i&2){let l=e.$implicit,o=e.selected;G("is-selected",o),c(),m("value",l)("text",l.label),Ke("title",l.description),c(2),S("Rating: ",l.rating)}}var ha=[{label:"Bacon",description:"Meat\u2019s own spice",rating:100},{label:"Bologna",description:"The heart of the bologna sandwich",rating:75},{label:"Tenderloin",description:"Love me tender \u2764\uFE0F",rating:50}],uo={selector:"cookbook-radio-custom-content-example",template:`<kirby-radio-group [value]="selected" [items]="items" aria-label="Select main course">
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
</kirby-radio-group>`,codeSnippet:`items = ${He(ha)};

selected = this.items[1];`,styles:[`.wrapper {
  display: flex;
  align-items: center;
}

.rating {
  font-size: 14px;
  padding: 2px 8px;
  margin-left: 8px;
  background-color: var(--kirby-semi-light);
  border-radius: 4px;
  transition: background-color 200ms;
}

.is-selected .rating {
  background-color: var(--kirby-success);
}`]},zT=(()=>{let e=class e{constructor(){this.template=`<!-- 1. Using slotted <kirby-radio> -->
${uo.slottedTemplate}

<!-- 2. Using *kirbyListItemTemplate -->
${uo.template}`,this.codeSnippet=uo.codeSnippet,this.styles=uo.styles.join(`
`),this.items=ha,this.selected=this.items[1]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-custom-content-example"]],decls:2,vars:2,consts:[["aria-label","Select main course",3,"value","items"],["class","wrapper",3,"is-selected",4,"kirbyListItemTemplate"],[1,"wrapper"],[3,"value","text"],[1,"rating"]],template:function(t,a){t&1&&(n(0,"kirby-radio-group",0),w(1,Ep,4,6,"div",1),r()),t&2&&m("value",a.selected)("items",a.items)},dependencies:[de,N,ve],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}.rating[_ngcontent-%COMP%]{font-size:14px;padding:2px 8px;margin-left:8px;background-color:var(--kirby-semi-light);border-radius:4px;transition:background-color .2s}.is-selected[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]{background-color:var(--kirby-success)}"]});let i=e;return i})();var ka=()=>["Bacon","Salami","Tenderloin"],Pp={selector:"cookbook-radio-in-form-field-example",template:`<kirby-form-field label="Label for radio group in form field" message="This is a message">
  <kirby-radio-group [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>

<kirby-form-field label="Label for radio group with error" message="This is an error message">
  <kirby-radio-group #meat [hasError]="true" (valueChange)="meat.hasError = false" [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>`},HT=(()=>{let e=class e{constructor(){this.template=Pp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-in-form-field-example"]],decls:5,vars:5,consts:[["meat",""],["label","Label for radio group in form field","message","This is a message"],[3,"items"],["label","Label for radio group with error","message","This is an error message"],[3,"valueChange","hasError","items"]],template:function(t,a){if(t&1){let g=P();n(0,"kirby-form-field",1),p(1,"kirby-radio-group",2),r(),n(2,"kirby-form-field",3)(3,"kirby-radio-group",4,0),b("valueChange",function(){v(g);let F=ee(4);return _(F.hasError=!1)}),r()()}t&2&&(c(),m("items",D(3,ka)),c(2),m("hasError",!0)("items",D(4,ka)))},dependencies:[A,de],styles:["[_nghost-%COMP%]{display:flex}kirby-form-field[_ngcontent-%COMP%]:not(:last-of-type){margin-right:40px}"]});let i=e;return i})();var Dp=(i,e)=>e.value;function Op(i,e){if(i&1&&(n(0,"kirby-item")(1,"kirby-radio",1),s(2),r()()),i&2){let l=e.$implicit;c(),m("value",l)("disabled",l.disabled),c(),S(" ",l.title," ")}}var Ca=[{title:"Bacon",value:1},{title:"Salami (disabled)",value:2,disabled:!0},{title:"Tenderloin",value:3}],fa={selector:"cookbook-radio-in-item-example",template:`<kirby-card>
  <kirby-radio-group [value]="selected" aria-label="Select main course">
    @for (item of items; track item.value) {
      <kirby-item>
        <kirby-radio [value]="item" slot="start" [disabled]="item.disabled">
          {{item.title}}
        </kirby-radio>
      </kirby-item>
    }
  </kirby-radio-group>
</kirby-card>`,codeSnippet:`items = ${He(Ca)};
selected = this.items[2];`},GT=(()=>{let e=class e{constructor(){this.template=fa.template,this.codeSnippet=fa.codeSnippet,this.items=Ca,this.selected=this.items[2]}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-in-item-example"]],decls:4,vars:1,consts:[["aria-label","Select main course",3,"value"],["slot","start",3,"value","disabled"]],template:function(t,a){t&1&&(n(0,"kirby-card")(1,"kirby-radio-group",0),H(2,Op,3,3,"kirby-item",null,Dp),r()()),t&2&&(c(),m("value",a.selected),c(),q(a.items))},dependencies:[T,de,f,ve],encapsulation:2});let i=e;return i})();var va=["Bacon","Salami","Tenderloin","Tongue","Drumstick"],xa={selector:"cookbook-radio-reactive-forms-example",template:`<form [formGroup]="form">
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
    `,codeSnippet:`items = ${He(va)};

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
}`},t3=(()=>{let e=class e{constructor(){this.template=xa.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=xa.codeSnippet,this.items=va,this.canSelectFavorite=!0,this.favoriteRequired=!0}ngOnInit(){this.buildForm()}toggleEnabled(o){this.canSelectFavorite=o,o?this.favoriteFoodControl.enable():this.favoriteFoodControl.disable()}toggleRequired(o){this.favoriteRequired=o,o?this.favoriteFoodControl.setValidators(jt.required):this.favoriteFoodControl.setValidators(null),this.favoriteFoodControl.updateValueAndValidity()}clearForm(){this.favoriteFoodControl.setValue(null)}buildForm(){this.favoriteFoodControl=new Si(null,this.favoriteRequired?jt.required:null),this.canSelectFavorite||this.favoriteFoodControl.disable(),this.form=new wi({favoriteFood:this.favoriteFoodControl})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-reactive-forms-example"]],decls:8,vars:6,consts:[[3,"formGroup"],["formControlName","favoriteFood",3,"items"],["text","Form field enabled","size","xs",3,"checkedChange","checked"],["text","Form field required","size","xs",3,"checkedChange","checked"],["kirby-button","","size","sm","attentionLevel","2",3,"click","disabled"],[3,"form"]],template:function(t,a){t&1&&(n(0,"form",0),p(1,"kirby-radio-group",1),r(),n(2,"cookbook-example-configuration-wrapper")(3,"kirby-checkbox",2),b("checkedChange",function(y){return a.toggleEnabled(y)}),r(),n(4,"kirby-checkbox",3),b("checkedChange",function(y){return a.toggleRequired(y)}),r(),n(5,"button",4),b("click",function(){return a.clearForm()}),s(6," Clear form "),r(),p(7,"cookbook-reactive-form-state",5),r()),t&2&&(m("formGroup",a.form),c(),m("items",a.items),c(2),m("checked",a.canSelectFavorite),c(),m("checked",a.favoriteRequired),c(),m("disabled",a.favoriteFoodControl.value===null),c(2),m("form",a.form))},dependencies:[xe,Me,ke,Se,Pe,Ee,Te,de,Ce,z,C,qe],styles:["[_nghost-%COMP%]{display:flex}cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:8px}@media(min-width:768px){cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:40px}}.form-state[_ngcontent-%COMP%]{margin-top:12px;border-top:1px solid var(--kirby-medium);padding:8px}.form-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:4px;font-weight:400}.form-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:12px;line-height:16px}.form-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:var(--kirby-danger);color:var(--kirby-white);margin-right:4px;padding:0 2px;border-radius:4px}.form-state[_ngcontent-%COMP%]   span.state-true[_ngcontent-%COMP%]{background-color:var(--kirby-success);color:var(--kirby-success-contrast)}"]});let i=e;return i})();var wa=["Bacon","Salami","Tenderloin","Tongue","Drumstick"],_a={selector:"cookbook-radio-template-driven-forms-example",template:`<kirby-radio-group #group="ngModel" [items]="items" [(ngModel)]="selected" [required]="favoriteRequired" [disabled]="canSelectFavorite ? null : true">
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
    `,codeSnippet:`items = ${He(wa)};

selected = null;
canSelectFavorite = true;
favoriteRequired = true;`},m3=(()=>{let e=class e{constructor(){this.template=_a.template.split("<cookbook-example-configuration-wrapper>")[0],this.codeSnippet=_a.codeSnippet,this.items=wa,this.selected=null,this.canSelectFavorite=!0,this.favoriteRequired=!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-radio-template-driven-forms-example"]],decls:30,vars:24,consts:[["group","ngModel"],[3,"ngModelChange","items","ngModel","required","disabled"],["text","Form field enabled","size","xs",3,"checkedChange","checked"],["text","Form field required","size","xs",3,"checkedChange","checked"],["kirby-button","","size","sm","attentionLevel","2",3,"click","disabled"],[1,"form-state"]],template:function(t,a){if(t&1){let g=P();n(0,"kirby-radio-group",1,0),Ae("ngModelChange",function(F){return v(g),K(a.selected,F)||(a.selected=F),_(F)}),r(),n(2,"cookbook-example-configuration-wrapper")(3,"kirby-checkbox",2),b("checkedChange",function(){return v(g),_(a.canSelectFavorite=!a.canSelectFavorite)}),r(),n(4,"kirby-checkbox",3),b("checkedChange",function(){return v(g),_(a.favoriteRequired=!a.favoriteRequired)}),r(),n(5,"button",4),b("click",function(){return v(g),_(a.selected=null)}),s(6," Clear selection "),r(),n(7,"section",5)(8,"h4"),s(9,"Form state:"),r(),n(10,"p")(11,"strong"),s(12,"Selected:"),r(),s(13),X(14,"json"),r(),n(15,"p")(16,"strong"),s(17,"ngModel: "),r(),n(18,"span"),s(19),r(),n(20,"span"),s(21),r(),n(22,"span"),s(23),r()(),n(24,"p")(25,"strong"),s(26,"ngModel.errors: "),r(),n(27,"span"),s(28),X(29,"json"),r()()()()}if(t&2){let g=ee(1);m("items",a.items),Fe("ngModel",a.selected),m("required",a.favoriteRequired)("disabled",a.canSelectFavorite?null:!0),c(3),m("checked",a.canSelectFavorite),c(),m("checked",a.favoriteRequired),c(),m("disabled",a.selected===null),c(8),S(" ",se(14,20,a.selected)," "),c(5),G("state-true",g.valid),c(),S("valid: ",g.valid),c(),G("state-true",g.enabled),c(),S("enabled: ",g.enabled),c(),G("state-true",g.touched),c(),S("touched: ",g.touched),c(4),G("state-true",!g.errors),c(),k(se(29,22,g.errors))}},dependencies:[de,xe,ke,sn,Mi,Ce,z,C,at],styles:["[_nghost-%COMP%]{display:flex}cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:8px}@media(min-width:768px){cookbook-example-configuration-wrapper[_ngcontent-%COMP%]{margin-left:40px}}.form-state[_ngcontent-%COMP%]{margin-top:12px;border-top:1px solid var(--kirby-medium);padding:8px}.form-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:4px;font-weight:400}.form-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:12px;line-height:16px}.form-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:var(--kirby-danger);color:var(--kirby-white);margin-right:4px;padding:0 2px;border-radius:4px}.form-state[_ngcontent-%COMP%]   span.state-true[_ngcontent-%COMP%]{background-color:var(--kirby-success);color:var(--kirby-success-contrast)}"]});let i=e;return i})();var Ip={selector:"cookbook-header-example-default",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`},u3=(()=>{let e=class e{constructor(){this.template=Ip.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-default"]],decls:1,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Title")},dependencies:[Z],encapsulation:2});let i=e;return i})();var Fp=()=>["Mrs. Lady Like Tiff Tuff Escargoon Tokkori","&","Mr. Chef Kawasaki Tokkori"],Ap={selector:"cookbook-header-example-subtitle-list",template:`<kirby-header [title]="'Title'" [subtitle1]="['Mrs. Lady Like Tiff Tuff Escargoon Tokkori', '&', 'Mr. Chef Kawasaki Tokkori']">
</kirby-header>`},y3=(()=>{let e=class e{constructor(){this.template=Ap.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-subtitle-list"]],decls:1,vars:3,consts:[[3,"title","subtitle1"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Title")("subtitle1",D(2,Fp))},dependencies:[Z],styles:["[_nghost-%COMP%]{border:1px dashed var(--kirby-medium);margin:12px;background:linear-gradient(135deg,transparent 0,transparent 95%,#fff 96%);display:block;overflow:hidden;width:620px;max-width:100%;resize:horizontal}"]});let i=e;return i})();var Lp={selector:"cookbook-header-example-flag",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-flag themeColor="warning">Warning</kirby-flag>
</kirby-header>`},C3=(()=>{let e=class e{constructor(){this.template=Lp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-flag"]],decls:3,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["themeColor","warning"]],template:function(t,a){t&1&&(n(0,"kirby-header",0)(1,"kirby-flag",1),s(2,"Warning"),r()()),t&2&&m("title","Title")},dependencies:[Z,Be],encapsulation:2});let i=e;return i})();function zp(i,e){i&1&&(n(0,"div",2),p(1,"kirby-badge",3),s(2," Custom content in flag section "),r())}var Sa={selector:"cookbook-header-example-custom-flag",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-flag" *kirbyHeaderCustomFlag>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom content in flag section
  </div>
</kirby-header>`,styles:[`.custom-flag {
    display: flex;
    align-items: center;
    gap: 6px;
}`]},w3=(()=>{let e=class e{constructor(){this.template=Sa.template,this.styles=Sa.styles.join(`

`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-custom-flag"]],decls:2,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["class","custom-flag",4,"kirbyHeaderCustomFlag"],[1,"custom-flag"],["size","sm","themeColor","success"]],template:function(t,a){t&1&&(n(0,"kirby-header",0),w(1,zp,3,0,"div",1),r()),t&2&&m("title","Title")},dependencies:[Z,me,Mn],styles:[".custom-flag[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}"]});let i=e;return i})();var Bp={selector:"cookbook-header-example-value",template:`<kirby-header [title]="'Title'" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`},T3=(()=>{let e=class e{constructor(){this.template=Bp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-value"]],decls:1,vars:1,consts:[["value","12.345,67","valueUnit","USD","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Title")},dependencies:[Z],encapsulation:2});let i=e;return i})();var $p={selector:"cookbook-header-example-avatar",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-avatar size="lg">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-header>`},I3=(()=>{let e=class e{constructor(){this.template=$p.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-avatar"]],decls:3,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["size","lg"],["name","kirby"]],template:function(t,a){t&1&&(n(0,"kirby-header",0)(1,"kirby-avatar",1),p(2,"kirby-icon",2),r()()),t&2&&m("title","Title")},dependencies:[Z,V,M],encapsulation:2});let i=e;return i})();var Np={selector:"cookbook-header-example-progress-circle-with-avatar",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-progress-circle value="75" themeColor="success" size="lg">
    <kirby-avatar themeColor="white">
      <kirby-icon name="kirby"></kirby-icon>
    </kirby-avatar>
  </kirby-progress-circle>
</kirby-header>`},N3=(()=>{let e=class e{constructor(){this.template=Np.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-progress-circle-with-avatar"]],decls:4,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["value","75","themeColor","success","size","lg"],["themeColor","white"],["name","kirby"]],template:function(t,a){t&1&&(n(0,"kirby-header",0)(1,"kirby-progress-circle",1)(2,"kirby-avatar",2),p(3,"kirby-icon",3),r()()()),t&2&&m("title","Title")},dependencies:[Z,fe,V,Q,M],encapsulation:2});let i=e;return i})();var Hp={selector:"cookbook-header-example-title-scaling",template:`<kirby-header titleMaxLines="2" [title]="'Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization'" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`},R3=(()=>{let e=class e{constructor(){this.template=Hp.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-title-scaling"]],decls:1,vars:1,consts:[["titleMaxLines","2","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"]],template:function(t,a){t&1&&p(0,"kirby-header",0),t&2&&m("title","Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization")},dependencies:[Tn,Z],encapsulation:2});let i=e;return i})();function qp(i,e){i&1&&(n(0,"div",2),p(1,"kirby-badge",3),s(2," Custom section "),r())}var bo={selector:"cookbook-header-example-custom-section",template:`<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-section" *kirbyHeaderCustomSection>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom section
  </div>
</kirby-header>`,styles:[`.custom-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--kirby-text-color-semi-dark);
}`]},U3=(()=>{let e=class e{constructor(){this.template=bo.template,this.styles=bo.styles.join(`

`)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-custom-section"]],decls:2,vars:1,consts:[["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],["class","custom-section",4,"kirbyHeaderCustomSection"],[1,"custom-section"],["size","sm","themeColor","success"]],template:function(t,a){t&1&&(n(0,"kirby-header",0),w(1,qp,3,0,"div",1),r()),t&2&&m("title","Title")},dependencies:[Z,me,Vi],styles:[".custom-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--kirby-text-color-semi-dark)}"]});let i=e;return i})();function Kp(i,e){i&1&&p(0,"kirby-icon",7)}function Rp(i,e){i&1&&(n(0,"kirby-action-group")(1,"button",8),p(2,"kirby-icon",4),s(3," Action 1 "),r(),n(4,"button",8),s(5," Action 2 "),r(),n(6,"button",8),s(7," Action 3 "),r()())}function Vp(i,e){i&1&&(n(0,"div",9),p(1,"kirby-badge",10),s(2," Custom section "),r())}var Ma={selector:"cookbook-header-example-combined",template:`<kirby-header [title]="'Title'" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two" (titleClick)="onTitleClick($event)">
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
</kirby-header>`,styles:bo.styles},oE=(()=>{let e=class e{constructor(o){this.toastController=o,this.template=Ma.template,this.styles=Ma.styles.join(`

`)}onTitleClick(o){let t={message:"Title clicked...",messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-header-example-combined"]],decls:8,vars:1,consts:[["value","12.345,67","valueUnit","USD","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"titleClick","title"],["name","arrow-down",4,"kirbyHeaderTitleActionIcon"],[4,"kirbyHeaderActions"],["size","lg"],["name","kirby"],["themeColor","warning"],["class","custom-section",4,"kirbyHeaderCustomSection"],["name","arrow-down"],["kirby-button","","attentionLevel","3"],[1,"custom-section"],["size","sm","themeColor","success"]],template:function(t,a){t&1&&(n(0,"kirby-header",0),b("titleClick",function(y){return a.onTitleClick(y)}),w(1,Kp,1,0,"kirby-icon",1)(2,Rp,8,0,"kirby-action-group",2),n(3,"kirby-avatar",3),p(4,"kirby-icon",4),r(),n(5,"kirby-flag",5),s(6,"Warning"),r(),w(7,Vp,3,0,"div",6),r()),t&2&&m("title","Title")},dependencies:[Z,M,Xt,C,V,Be,me,Vi,dt,Sn],styles:[".custom-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--kirby-text-color-semi-dark)}"]});let i=e;return i})();function Wp(i,e){i&1&&p(0,"kirby-icon",4)}var Gp={template:`<kirby-page defaultBackHref="/">
  <kirby-header (titleClick)="onTitleClick($event)" [title]="'Interactive Title'" value="12345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-icon name="arrow-down" *kirbyHeaderTitleActionIcon></kirby-icon>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`},wt=class wt extends j{constructor(e){super(),this.toastController=e}onTitleClick(e){let t={message:`Title ${e.currentTarget.closest("kirby-header")?"in header":"in toolbar"} clicked...`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};wt.template=Gp.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),wt.codeSnippet=`onTitleClick(event: PointerEvent) {
  // Maybe do something based on the event target:
  const eventTarget = event.currentTarget as HTMLElement;
  const targetLocation = eventTarget.closest('kirby-header') ? 'Title in header clicked' : 'Title in toolbar clicked';
  // Do something...
}`,wt.\u0275fac=function(l){return new(l||wt)(x($))},wt.\u0275cmp=d({type:wt,selectors:[["ng-component"]],features:[E],decls:5,vars:2,consts:[["defaultBackHref","/"],["value","12345,67","valueUnit","USD","subtitle1","Subtitle one","subtitle2","Subtitle two",3,"titleClick","title"],["name","arrow-down",4,"kirbyHeaderTitleActionIcon"],[3,"innerHTML"],["name","arrow-down"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-header",1),b("titleClick",function(a){return o.onTitleClick(a)}),w(2,Wp,1,0,"kirby-icon",2),r(),n(3,"kirby-page-content"),p(4,"div",3),r()()),l&2&&(c(),m("title","Interactive Title"),c(3),m("innerHTML",o.content,Y))},dependencies:[U,Z,M,te],encapsulation:2});var Ta=wt;function Up(i,e){if(i&1){let l=P();Qo(0),n(1,"kirby-menu")(2,"button",4),p(3,"kirby-icon",5),n(4,"span"),s(5,"Action"),r()(),n(6,"kirby-item",6),b("click",function(){v(l);let t=h();return _(t.actionClicked("Primary Action 1"))}),s(7," Primary Action 1 "),r(),n(8,"kirby-item",6),b("click",function(){v(l);let t=h();return _(t.actionClicked("Primary Action 2"))}),s(9," Primary Action 2 "),r()(),n(10,"kirby-menu")(11,"kirby-item",6),b("click",function(){v(l);let t=h();return _(t.actionClicked("Secondary Action 1"))}),s(12," Secondary Action 1 "),r(),n(13,"kirby-item",6),b("click",function(){v(l);let t=h();return _(t.actionClicked("Secondary Action 2"))}),s(14," Secondary Action 2 "),r()(),Jo()}i&2&&(c(6),m("selectable",!0),c(2),m("selectable",!0),c(3),m("selectable",!0),c(2),m("selectable",!0))}var jp={template:`<kirby-page defaultBackHref="/">
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
</kirby-page>`},Ht=class Ht extends j{constructor(e){super(),this.toastController=e,this.document=window.document.body}actionClicked(e){let l={message:`${e} was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(l)}};Ht.template=jp.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),Ht.\u0275fac=function(l){return new(l||Ht)(x($))},Ht.\u0275cmp=d({type:Ht,selectors:[["ng-component"]],features:[E],decls:5,vars:2,consts:[["defaultBackHref","/"],["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],[4,"kirbyHeaderActions"],[3,"innerHTML"],["kirby-button",""],["name","kirby"],[3,"click","selectable"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-header",1),w(2,Up,15,4,"ng-container",2),r(),n(3,"kirby-page-content"),p(4,"div",3),r()()),l&2&&(c(),m("title","Custom actions"),c(3),m("innerHTML",o.content,Y))},dependencies:[U,Z,$e,C,M,f,te,dt],encapsulation:2});var Ea=Ht;function Yp(i,e){if(i&1){let l=P();n(0,"kirby-action-group")(1,"button",4),b("click",function(){v(l);let t=h();return _(t.actionClicked("Action 1"))}),p(2,"kirby-icon",5),n(3,"span",6),s(4,"Action 1"),r()(),n(5,"button",7),b("click",function(){v(l);let t=h();return _(t.actionClicked("Action 2"))}),p(6,"kirby-icon",8),n(7,"span",6),s(8,"Action 2"),r()()()}}var Qp={template:`<kirby-page defaultBackHref="/">
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
</kirby-page>`},qt=class qt extends j{constructor(e){super(),this.toastController=e}actionClicked(e){let l={message:`${e} was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(l)}};qt.template=Qp.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),qt.\u0275fac=function(l){return new(l||qt)(x($))},qt.\u0275cmp=d({type:qt,selectors:[["ng-component"]],features:[E],decls:5,vars:3,consts:[["defaultBackHref","/"],["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"emphasizeActions","title"],[4,"kirbyHeaderActions"],[3,"innerHTML"],["kirby-button","","attentionLevel","1",3,"click"],["name","edit"],[1,"text"],["kirby-button","","attentionLevel","3",3,"click"],["name","kirby"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-header",1),w(2,Yp,9,0,"kirby-action-group",2),r(),n(3,"kirby-page-content"),p(4,"div",3),r()()),l&2&&(c(),m("emphasizeActions",!0)("title","Emphasize Actions"),c(3),m("innerHTML",o.content,Y))},dependencies:[U,Z,Xt,C,M,te,dt],encapsulation:2});var Pa=qt;function Jp(i,e){if(i&1){let l=P();n(0,"kirby-action-group")(1,"button",4),b("click",function(){v(l);let t=h();return _(t.actionClicked("Action 1"))}),p(2,"kirby-icon",5),n(3,"span",6),s(4,"Action 1"),r()(),n(5,"button",4),b("click",function(){v(l);let t=h();return _(t.actionClicked("Action 2"))}),s(6," Action 2 "),r(),n(7,"button",4),b("click",function(){v(l);let t=h();return _(t.actionClicked("Action 3"))}),s(8," Action 3 "),r()()}}var Zp={template:`<kirby-page defaultBackHref="/">
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
</kirby-page>`},Kt=class Kt extends j{constructor(e){super(),this.toastController=e}actionClicked(e){let l={message:`${e} was selected.`,messageType:"success",durationInMs:1500};this.toastController.showToast(l)}};Kt.template=Zp.template.replace(' defaultBackHref="/"',"").replace(' [innerHTML]="content">',">..."),Kt.\u0275fac=function(l){return new(l||Kt)(x($))},Kt.\u0275cmp=d({type:Kt,selectors:[["ng-component"]],features:[E],decls:5,vars:2,consts:[["defaultBackHref","/"],["subtitle1","Subtitle one","subtitle2","Subtitle two",3,"title"],[4,"kirbyHeaderActions"],[3,"innerHTML"],["kirby-button","","attentionLevel","3",3,"click"],["name","edit"],[1,"text"]],template:function(l,o){l&1&&(n(0,"kirby-page",0)(1,"kirby-header",1),w(2,Jp,9,0,"kirby-action-group",2),r(),n(3,"kirby-page-content"),p(4,"div",3),r()()),l&2&&(c(),m("title","Action Group"),c(3),m("innerHTML",o.content,Y))},dependencies:[U,Z,Xt,C,M,te,dt],encapsulation:2});var Da=Kt;var Xp={selector:"cookbook-menu-selectable-example",template:`<kirby-menu>
  <kirby-item (click)="actionClicked('Stone')">
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Rick')">
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Gooey')">
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`},AE=(()=>{let e=class e{constructor(o){this.toastController=o,this.template=Xp.template}actionClicked(o){let t={message:`${o} was selected as your Hero.`,messageType:"success",durationInMs:1500};this.toastController.showToast(t)}};e.\u0275fac=function(t){return new(t||e)(x($))},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-selectable-example"]],decls:10,vars:0,consts:[[3,"click"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(n(0,"kirby-menu")(1,"kirby-item",0),b("click",function(){return a.actionClicked("Stone")}),n(2,"p",1),s(3,"Stone"),r()(),n(4,"kirby-item",0),b("click",function(){return a.actionClicked("Rick")}),n(5,"p",1),s(6,"Rick"),r()(),n(7,"kirby-item",0),b("click",function(){return a.actionClicked("Gooey")}),n(8,"p",1),s(9,"Gooey"),r()()())},dependencies:[$e,f],encapsulation:2});let i=e;return i})();var eu={selector:"cookbook-menu-advanced-example",template:`<kirby-menu [closeOnSelect]="false" aria-label="Advanced items">
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
</kirby-menu>`},qE=(()=>{let e=class e{constructor(){this.template=eu.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-advanced-example"]],decls:16,vars:1,consts:[["aria-label","Advanced items",3,"closeOnSelect"],["name","person","slot","start"],["slot","end"],["name","notification","slot","start"],["name","default","slot","start"]],template:function(t,a){t&1&&(n(0,"kirby-menu",0)(1,"kirby-item"),p(2,"kirby-icon",1),n(3,"kirby-checkbox",2)(4,"kirby-label"),s(5," Friend Throw "),r()()(),n(6,"kirby-item"),p(7,"kirby-icon",3),n(8,"kirby-checkbox",2)(9,"kirby-label"),s(10," Ice Curling "),r()()(),n(11,"kirby-item"),p(12,"kirby-icon",4),n(13,"kirby-toggle",2)(14,"kirby-label"),s(15," Allow Cheats "),r()()()()),t&2&&m("closeOnSelect",!1)},dependencies:[$e,f,M,z,ze,B],encapsulation:2});let i=e;return i})();var tu={selector:"cookbook-menu-custom-button-example",template:`<kirby-menu aria-label="Custom button">
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
</kirby-menu>`},UE=(()=>{let e=class e{constructor(){this.template=tu.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-custom-button-example"]],decls:12,vars:2,consts:[["aria-label","Custom button"],["kirby-button","","type","button",3,"attentionLevel"],[3,"name"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(n(0,"kirby-menu",0)(1,"button",1),p(2,"kirby-icon",2),r(),n(3,"kirby-item")(4,"p",3),s(5,"Stone"),r()(),n(6,"kirby-item")(7,"p",3),s(8,"Rick"),r()(),n(9,"kirby-item")(10,"p",3),s(11,"Gooey"),r()()()),t&2&&(c(),m("attentionLevel","3"),c(),m("name","menu-outline"))},dependencies:[$e,C,M,f],encapsulation:2});let i=e;return i})();var iu={selector:"cookbook-menu-portal-example",template:`<kirby-menu 
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
`},JE=(()=>{let e=class e{constructor(o){this.cd=o,this.template=iu.template,this.outletTag="cookbook-root",this.outletElement=this.getOutletElement()}set isOutletElementSet(o){this._outlet=o?this.outletElement:null}getOutletElement(){let o=document.getElementsByTagName(this.outletTag);if(!o||o.length===0)throw Error(`Could not locate HTMLElement for ${this.outletTag}. Did you misspell it?`);if(o.length>1)throw Error(`Multiple HTMLElements found for ${this.outletTag}.
      This can lead to unintended behaviours. Provide an unique outlet`);return o[0]}};e.\u0275fac=function(t){return new(t||e)(x(vi))},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-portal-example"]],inputs:{isOutletElementSet:"isOutletElementSet"},decls:10,vars:1,consts:[[3,"DOMPortalOutlet"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(n(0,"kirby-menu",0)(1,"kirby-item")(2,"p",1),s(3,"Stone"),r()(),n(4,"kirby-item")(5,"p",1),s(6,"Rick"),r()(),n(7,"kirby-item")(8,"p",1),s(9,"Gooey"),r()()()),t&2&&m("DOMPortalOutlet",a._outlet)},dependencies:[$e,f],encapsulation:2});let i=e;return i})();var ou={selector:"cookbook-menu-portal-config-example",template:`<kirby-menu [portalOutletConfig]="outletConfig">
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
  };`},iP=(()=>{let e=class e{constructor(){this.template=ou.template,this.outletConfig={selector:wn.tag,value:"cookbook-root"}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-menu-portal-config-example"]],decls:10,vars:1,consts:[[3,"portalOutletConfig"],[1,"kirby-item-title"]],template:function(t,a){t&1&&(n(0,"kirby-menu",0)(1,"kirby-item")(2,"p",1),s(3,"Stone"),r()(),n(4,"kirby-item")(5,"p",1),s(6,"Rick"),r()(),n(7,"kirby-item")(8,"p",1),s(9,"Gooey"),r()()()),t&2&&m("portalOutletConfig",a.outletConfig)},dependencies:[$e,f],encapsulation:2});let i=e;return i})();var nu={selector:"cookbook-label-example-direction",template:`<kirby-item>
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
</kirby-item>`},rP=(()=>{let e=class e{constructor(){this.template=nu.template}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["cookbook-label-example-direction"]],decls:15,vars:0,consts:[[1,"kirby-item-title"],[1,"kirby-item-detail"],["direction","horizontal"]],template:function(t,a){t&1&&(n(0,"kirby-item")(1,"kirby-label")(2,"p",0),s(3,"Title"),r(),n(4,"p",1),s(5,"Detail"),r()()(),n(6,"kirby-item")(7,"kirby-label")(8,"kirby-label",2)(9,"p",0),s(10,"Title"),r(),n(11,"p",1),s(12,"Detail"),r()(),n(13,"p"),s(14,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci."),r()()())},dependencies:[f,B],styles:["kirby-item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:var(--kirby-spacing-xxs)}"]});let i=e;return i})();export{au as a,bu as b,hu as c,_u as d,Mu as e,Pu as f,Iu as g,Nu as h,Vu as i,mr as j,g0 as k,k0 as l,_0 as m,ie as n,I0 as o,N0 as p,R0 as q,U0 as r,Q0 as s,ur as t,ng as u,cg as v,pg as w,yg as x,xg as y,wg as z,Tg as A,Dg as B,Fg as C,zg as D,Ng as E,Rg as F,Gg as G,Yg as H,ty as I,ny as J,ly as K,dy as L,gy as M,fy as N,_y as O,My as P,Py as Q,Oy as R,Ny as S,Ce as T,Yy as U,Zy as V,th as W,lh as X,dh as Y,bh as Z,kh as _,xh as $,wh as aa,Th as ba,Dh as ca,Fh as da,Bh as ea,qh as fa,Vh as ga,Uh as ha,Jh as ia,ek as ja,ok as ka,sk as la,dk as ma,gk as na,kk as oa,xk as pa,qe as qa,Mk as ra,Ok as sa,Lk as ta,Hk as ua,Rk as va,Gk as wa,Yk as xa,Zk as ya,tf as za,lf as Aa,mf as Ba,hf as Ca,wf as Da,Tf as Ea,Of as Fa,Lf as Ga,Nf as Ha,Rf as Ia,Yf as Ja,Zf as Ka,tC as La,mC as Ma,bC as Na,CC as Oa,wC as Pa,EC as Qa,AC as Ra,$C as Sa,jC as Ta,ZC as Ua,ix as Va,lx as Wa,dx as Xa,gx as Ya,fx as Za,Sx as _a,Ex as $a,Ox as ab,Ax as bb,Kx as cb,Wx as db,Ar as eb,Lr as fb,Br as gb,lv as hb,pv as ib,hv as jb,Cv as kb,vv as lb,Ev as mb,Av as nb,Hv as ob,qv as pb,jv as qb,i1 as rb,c1 as sb,b1 as tb,f1 as ub,S1 as vb,D1 as wb,L1 as xb,H1 as yb,W1 as zb,Y1 as Ab,X1 as Bb,Hr as Cb,qr as Db,Kr as Eb,Rr as Fb,mo as Gb,Wr as Hb,Ur as Ib,Yr as Jb,Qr as Kb,Jr as Lb,Zr as Mb,Xr as Nb,ta as Ob,ia as Pb,oa as Qb,ra as Rb,aa as Sb,wS as Tb,TS as Ub,DS as Vb,zS as Wb,NS as Xb,RS as Yb,QS as Zb,XS as _b,i2 as $b,r2 as ac,m2 as bc,g2 as cc,C2 as dc,M2 as ec,I2 as fc,z2 as gc,N2 as hc,W2 as ic,j2 as jc,eM as kc,aM as lc,cM as mc,pM as nc,yM as oc,CM as pc,wM as qc,ma as rc,OM as sc,LM as tc,NM as uc,KM as vc,WM as wc,jM as xc,JM as yc,eT as zc,aT as Ac,cT as Bc,kT as Cc,xT as Dc,wT as Ec,TT as Fc,OT as Gc,zT as Hc,HT as Ic,GT as Jc,t3 as Kc,m3 as Lc,u3 as Mc,y3 as Nc,C3 as Oc,w3 as Pc,T3 as Qc,I3 as Rc,N3 as Sc,R3 as Tc,U3 as Uc,oE as Vc,Ta as Wc,Ea as Xc,Pa as Yc,Da as Zc,AE as _c,qE as $c,UE as ad,JE as bd,iP as cd,rP as dd};
