"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[2076],{44556:(D,p,n)=>{n.d(p,{c:()=>a});var f=n(54261),l=n(21086),c=n(28607);const a=(e,r)=>{let o,s;const m=(i,u,M)=>{if(typeof document>"u")return;const E=document.elementFromPoint(i,u);E&&r(E)&&!E.disabled?E!==o&&(t(),d(E,M)):t()},d=(i,u)=>{o=i,s||(s=o);const M=o;(0,f.w)(()=>M.classList.add("ion-activated")),u()},t=(i=!1)=>{if(!o)return;const u=o;(0,f.w)(()=>u.classList.remove("ion-activated")),i&&s!==o&&o.click(),o=void 0};return(0,c.createGesture)({el:e,gestureName:"buttonActiveDrag",threshold:0,onStart:i=>m(i.currentX,i.currentY,l.a),onMove:i=>m(i.currentX,i.currentY,l.b),onEnd:()=>{t(!0),(0,l.h)(),s=void 0}})}},78438:(D,p,n)=>{n.d(p,{g:()=>l});var f=n(28476);const l=()=>{if(void 0!==f.w)return f.w.Capacitor}},95572:(D,p,n)=>{n.d(p,{c:()=>f,i:()=>l});const f=(c,a,e)=>"function"==typeof e?e(c,a):"string"==typeof e?c[e]===a[e]:Array.isArray(a)?a.includes(c):c===a,l=(c,a,e)=>void 0!==c&&(Array.isArray(c)?c.some(r=>f(r,a,e)):f(c,a,e))},90464:(D,p,n)=>{n.d(p,{E:()=>d,a:()=>f});const f=t=>{try{if(t instanceof o)return t.value;if(!a()||"string"!=typeof t||""===t)return t;if(t.includes("onload="))return"";const i=document.createDocumentFragment(),u=document.createElement("div");i.appendChild(u),u.innerHTML=t,r.forEach(v=>{const g=i.querySelectorAll(v);for(let w=g.length-1;w>=0;w--){const O=g[w];O.parentNode?O.parentNode.removeChild(O):i.removeChild(O);const C=c(O);for(let h=0;h<C.length;h++)l(C[h])}});const M=c(i);for(let v=0;v<M.length;v++)l(M[v]);const E=document.createElement("div");E.appendChild(i);const y=E.querySelector("div");return null!==y?y.innerHTML:E.innerHTML}catch(i){return console.error(i),""}},l=t=>{if(t.nodeType&&1!==t.nodeType)return;if(typeof NamedNodeMap<"u"&&!(t.attributes instanceof NamedNodeMap))return void t.remove();for(let u=t.attributes.length-1;u>=0;u--){const M=t.attributes.item(u),E=M.name;if(!e.includes(E.toLowerCase())){t.removeAttribute(E);continue}const y=M.value,v=t[E];(null!=y&&y.toLowerCase().includes("javascript:")||null!=v&&v.toLowerCase().includes("javascript:"))&&t.removeAttribute(E)}const i=c(t);for(let u=0;u<i.length;u++)l(i[u])},c=t=>null!=t.children?t.children:t.childNodes,a=()=>{var t;const i=window,u=null===(t=i?.Ionic)||void 0===t?void 0:t.config;return!u||(u.get?u.get("sanitizerEnabled",!0):!0===u.sanitizerEnabled||void 0===u.sanitizerEnabled)},e=["class","id","href","src","name","slot"],r=["script","style","iframe","meta","link","object","embed"];class o{constructor(i){this.value=i}}const d=!1},63351:(D,p,n)=>{n.d(p,{g:()=>f});const f=(r,o,s,m,d)=>c(r[1],o[1],s[1],m[1],d).map(t=>l(r[0],o[0],s[0],m[0],t)),l=(r,o,s,m,d)=>d*(3*o*Math.pow(d-1,2)+d*(-3*s*d+3*s+m*d))-r*Math.pow(d-1,3),c=(r,o,s,m,d)=>e((m-=d)-3*(s-=d)+3*(o-=d)-(r-=d),3*s-6*o+3*r,3*o-3*r,r).filter(i=>i>=0&&i<=1),e=(r,o,s,m)=>{if(0===r)return((r,o,s)=>{const m=o*o-4*r*s;return m<0?[]:[(-o+Math.sqrt(m))/(2*r),(-o-Math.sqrt(m))/(2*r)]})(o,s,m);const d=(3*(s/=r)-(o/=r)*o)/3,t=(2*o*o*o-9*o*s+27*(m/=r))/27;if(0===d)return[Math.pow(-t,1/3)];if(0===t)return[Math.sqrt(-d),-Math.sqrt(-d)];const i=Math.pow(t/2,2)+Math.pow(d/3,3);if(0===i)return[Math.pow(t/2,.5)-o/3];if(i>0)return[Math.pow(-t/2+Math.sqrt(i),1/3)-Math.pow(t/2+Math.sqrt(i),1/3)-o/3];const u=Math.sqrt(Math.pow(-d/3,3)),M=Math.acos(-t/(2*Math.sqrt(Math.pow(-d/3,3)))),E=2*Math.pow(u,1/3);return[E*Math.cos(M/3)-o/3,E*Math.cos((M+2*Math.PI)/3)-o/3,E*Math.cos((M+4*Math.PI)/3)-o/3]}},25083:(D,p,n)=>{n.d(p,{i:()=>f});const f=l=>l&&""!==l.dir?"rtl"===l.dir.toLowerCase():"rtl"===document?.dir.toLowerCase()},13126:(D,p,n)=>{n.r(p),n.d(p,{startFocusVisible:()=>a});const f="ion-focused",c=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],a=e=>{let r=[],o=!0;const s=e?e.shadowRoot:document,m=e||document.body,d=y=>{r.forEach(v=>v.classList.remove(f)),y.forEach(v=>v.classList.add(f)),r=y},t=()=>{o=!1,d([])},i=y=>{o=c.includes(y.key),o||d([])},u=y=>{if(o&&void 0!==y.composedPath){const v=y.composedPath().filter(g=>!!g.classList&&g.classList.contains("ion-focusable"));d(v)}},M=()=>{s.activeElement===m&&d([])};return s.addEventListener("keydown",i),s.addEventListener("focusin",u),s.addEventListener("focusout",M),s.addEventListener("touchstart",t,{passive:!0}),s.addEventListener("mousedown",t),{destroy:()=>{s.removeEventListener("keydown",i),s.removeEventListener("focusin",u),s.removeEventListener("focusout",M),s.removeEventListener("touchstart",t),s.removeEventListener("mousedown",t)},setFocus:d}}},21086:(D,p,n)=>{n.d(p,{I:()=>l,a:()=>o,b:()=>s,c:()=>r,d:()=>d,h:()=>m});var f=n(78438),l=function(t){return t.Heavy="HEAVY",t.Medium="MEDIUM",t.Light="LIGHT",t}(l||{});const a={getEngine(){const t=(0,f.g)();if(t?.isPluginAvailable("Haptics"))return t.Plugins.Haptics},available(){if(!this.getEngine())return!1;const i=(0,f.g)();return"web"!==i?.getPlatform()||typeof navigator<"u"&&void 0!==navigator.vibrate},impact(t){const i=this.getEngine();i&&i.impact({style:t.style})},notification(t){const i=this.getEngine();i&&i.notification({type:t.type})},selection(){this.impact({style:l.Light})},selectionStart(){const t=this.getEngine();t&&t.selectionStart()},selectionChanged(){const t=this.getEngine();t&&t.selectionChanged()},selectionEnd(){const t=this.getEngine();t&&t.selectionEnd()}},e=()=>a.available(),r=()=>{e()&&a.selection()},o=()=>{e()&&a.selectionStart()},s=()=>{e()&&a.selectionChanged()},m=()=>{e()&&a.selectionEnd()},d=t=>{e()&&a.impact(t)}},20909:(D,p,n)=>{n.d(p,{I:()=>r,a:()=>d,b:()=>e,c:()=>u,d:()=>E,f:()=>t,g:()=>m,i:()=>s,p:()=>M,r:()=>y,s:()=>i});var f=n(10467),l=n(84920),c=n(74929);const e="ion-content",r=".ion-content-scroll-host",o=`${e}, ${r}`,s=v=>"ION-CONTENT"===v.tagName,m=function(){var v=(0,f.A)(function*(g){return s(g)?(yield new Promise(w=>(0,l.c)(g,w)),g.getScrollElement()):g});return function(w){return v.apply(this,arguments)}}(),d=v=>v.querySelector(r)||v.querySelector(o),t=v=>v.closest(o),i=(v,g)=>s(v)?v.scrollToTop(g):Promise.resolve(v.scrollTo({top:0,left:0,behavior:g>0?"smooth":"auto"})),u=(v,g,w,O)=>s(v)?v.scrollByPoint(g,w,O):Promise.resolve(v.scrollBy({top:w,left:g,behavior:O>0?"smooth":"auto"})),M=v=>(0,c.b)(v,e),E=v=>{if(s(v)){const w=v.scrollY;return v.scrollY=!1,w}return v.style.setProperty("overflow","hidden"),!0},y=(v,g)=>{s(v)?v.scrollY=g:v.style.removeProperty("overflow")}},23992:(D,p,n)=>{n.d(p,{a:()=>f,b:()=>u,c:()=>o,d:()=>M,e:()=>x,f:()=>r,g:()=>E,h:()=>c,i:()=>l,j:()=>h,k:()=>L,l:()=>s,m:()=>t,n:()=>y,o:()=>d,p:()=>e,q:()=>a,r:()=>C,s:()=>T,t:()=>i,u:()=>w,v:()=>O,w:()=>m,x:()=>v,y:()=>g});const f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='64'/><path d='M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM248 315.85l-51.79-51.79a2 2 0 00-3.39 1.69 64.11 64.11 0 0053.49 53.49 2 2 0 001.69-3.39zM264 196.15L315.87 248a2 2 0 003.4-1.69 64.13 64.13 0 00-53.55-53.55 2 2 0 00-1.72 3.39z'/><path d='M491 273.36a32.2 32.2 0 00-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 00-71.82 11.79 4 4 0 00-1.56 6.63l47.24 47.24a4 4 0 003.82 1.05 96 96 0 01116 116 4 4 0 001.05 3.81l67.95 68a4 4 0 005.4.24 343.81 343.81 0 0067.24-77.4zM256 352a96 96 0 01-93.3-118.63 4 4 0 00-1.05-3.81l-66.84-66.87a4 4 0 00-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0072.64-11.55 4 4 0 001.61-6.64l-47.47-47.46a4 4 0 00-3.81-1.05A96 96 0 01256 352z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",L="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",T="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},20243:(D,p,n)=>{n.d(p,{c:()=>a,g:()=>e});var f=n(28476),l=n(84920),c=n(74929);const a=(o,s,m)=>{let d,t;if(void 0!==f.w&&"MutationObserver"in f.w){const E=Array.isArray(s)?s:[s];d=new MutationObserver(y=>{for(const v of y)for(const g of v.addedNodes)if(g.nodeType===Node.ELEMENT_NODE&&E.includes(g.slot))return m(),void(0,l.r)(()=>i(g))}),d.observe(o,{childList:!0,subtree:!0})}const i=E=>{var y;t&&(t.disconnect(),t=void 0),t=new MutationObserver(v=>{m();for(const g of v)for(const w of g.removedNodes)w.nodeType===Node.ELEMENT_NODE&&w.slot===s&&M()}),t.observe(null!==(y=E.parentElement)&&void 0!==y?y:E,{subtree:!0,childList:!0})},M=()=>{t&&(t.disconnect(),t=void 0)};return{destroy:()=>{d&&(d.disconnect(),d=void 0),M()}}},e=(o,s,m)=>{const d=null==o?0:o.toString().length,t=r(d,s);if(void 0===m)return t;try{return m(d,s)}catch(i){return(0,c.a)("Exception in provided `counterFormatter`.",i),t}},r=(o,s)=>`${o} / ${s}`},31622:(D,p,n)=>{n.r(p),n.d(p,{KEYBOARD_DID_CLOSE:()=>e,KEYBOARD_DID_OPEN:()=>a,copyVisualViewport:()=>C,keyboardDidClose:()=>v,keyboardDidOpen:()=>E,keyboardDidResize:()=>y,resetKeyboardAssist:()=>d,setKeyboardClose:()=>M,setKeyboardOpen:()=>u,startKeyboardAssist:()=>t,trackViewportChanges:()=>O});var f=n(94379);n(78438),n(28476);const a="ionKeyboardDidShow",e="ionKeyboardDidHide";let o={},s={},m=!1;const d=()=>{o={},s={},m=!1},t=h=>{if(f.K.getEngine())i(h);else{if(!h.visualViewport)return;s=C(h.visualViewport),h.visualViewport.onresize=()=>{O(h),E()||y(h)?u(h):v(h)&&M(h)}}},i=h=>{h.addEventListener("keyboardDidShow",L=>u(h,L)),h.addEventListener("keyboardDidHide",()=>M(h))},u=(h,L)=>{g(h,L),m=!0},M=h=>{w(h),m=!1},E=()=>!m&&o.width===s.width&&(o.height-s.height)*s.scale>150,y=h=>m&&!v(h),v=h=>m&&s.height===h.innerHeight,g=(h,L)=>{const x=new CustomEvent(a,{detail:{keyboardHeight:L?L.keyboardHeight:h.innerHeight-s.height}});h.dispatchEvent(x)},w=h=>{const L=new CustomEvent(e);h.dispatchEvent(L)},O=h=>{o=Object.assign({},s),s=C(h.visualViewport)},C=h=>({width:Math.round(h.width),height:Math.round(h.height),offsetTop:h.offsetTop,offsetLeft:h.offsetLeft,pageTop:h.pageTop,pageLeft:h.pageLeft,scale:h.scale})},94379:(D,p,n)=>{n.d(p,{K:()=>a,a:()=>c});var f=n(78438),l=function(e){return e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE",e}(l||{}),c=function(e){return e.Body="body",e.Ionic="ionic",e.Native="native",e.None="none",e}(c||{});const a={getEngine(){const e=(0,f.g)();if(e?.isPluginAvailable("Keyboard"))return e.Plugins.Keyboard},getResizeMode(){const e=this.getEngine();return e?.getResizeMode?e.getResizeMode().catch(r=>{if(r.code!==l.Unimplemented)throw r}):Promise.resolve(void 0)}}},64731:(D,p,n)=>{n.d(p,{c:()=>r});var f=n(10467),l=n(28476),c=n(94379);const a=o=>void 0===l.d||o===c.a.None||void 0===o?null:l.d.querySelector("ion-app")??l.d.body,e=o=>{const s=a(o);return null===s?0:s.clientHeight},r=function(){var o=(0,f.A)(function*(s){let m,d,t,i;const u=function(){var g=(0,f.A)(function*(){const w=yield c.K.getResizeMode(),O=void 0===w?void 0:w.mode;m=()=>{void 0===i&&(i=e(O)),t=!0,M(t,O)},d=()=>{t=!1,M(t,O)},null==l.w||l.w.addEventListener("keyboardWillShow",m),null==l.w||l.w.addEventListener("keyboardWillHide",d)});return function(){return g.apply(this,arguments)}}(),M=(g,w)=>{s&&s(g,E(w))},E=g=>{if(0===i||i===e(g))return;const w=a(g);return null!==w?new Promise(O=>{const h=new ResizeObserver(()=>{w.clientHeight===i&&(h.disconnect(),O())});h.observe(w)}):void 0};return yield u(),{init:u,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",m),null==l.w||l.w.removeEventListener("keyboardWillHide",d),m=d=void 0},isKeyboardVisible:()=>t}});return function(m){return o.apply(this,arguments)}}()},67838:(D,p,n)=>{n.d(p,{c:()=>l});var f=n(10467);const l=()=>{let c;return{lock:function(){var e=(0,f.A)(function*(){const r=c;let o;return c=new Promise(s=>o=s),void 0!==r&&(yield r),o});return function(){return e.apply(this,arguments)}}()}}},9001:(D,p,n)=>{n.d(p,{c:()=>c});var f=n(28476),l=n(84920);const c=(a,e,r)=>{let o;const s=()=>!(void 0===e()||void 0!==a.label||null===r()),d=()=>{const i=e();if(void 0===i)return;if(!s())return void i.style.removeProperty("width");const u=r().scrollWidth;if(0===u&&null===i.offsetParent&&void 0!==f.w&&"IntersectionObserver"in f.w){if(void 0!==o)return;const M=o=new IntersectionObserver(E=>{1===E[0].intersectionRatio&&(d(),M.disconnect(),o=void 0)},{threshold:.01,root:a});M.observe(i)}else i.style.setProperty("width",.75*u+"px")};return{calculateNotchWidth:()=>{s()&&(0,l.r)(()=>{d()})},destroy:()=>{o&&(o.disconnect(),o=void 0)}}}},37895:(D,p,n)=>{n.d(p,{S:()=>l});const l={bubbles:{dur:1e3,circles:9,fn:(c,a,e)=>{const r=c*a/e-c+"ms",o=2*Math.PI*a/e;return{r:5,style:{top:32*Math.sin(o)+"%",left:32*Math.cos(o)+"%","animation-delay":r}}}},circles:{dur:1e3,circles:8,fn:(c,a,e)=>{const r=a/e,o=c*r-c+"ms",s=2*Math.PI*r;return{r:5,style:{top:32*Math.sin(s)+"%",left:32*Math.cos(s)+"%","animation-delay":o}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(c,a)=>({r:6,style:{left:32-32*a+"%","animation-delay":-110*a+"ms"}})},lines:{dur:1e3,lines:8,fn:(c,a,e)=>({y1:14,y2:26,style:{transform:`rotate(${360/e*a+(a<e/2?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(c,a,e)=>({y1:12,y2:20,style:{transform:`rotate(${360/e*a+(a<e/2?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(c,a,e)=>({y1:17,y2:29,style:{transform:`rotate(${30*a+(a<6?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(c,a,e)=>({y1:12,y2:20,style:{transform:`rotate(${30*a+(a<6?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})}}},97166:(D,p,n)=>{n.r(p),n.d(p,{createSwipeBackGesture:()=>e});var f=n(84920),l=n(25083),c=n(28607);n(11970);const e=(r,o,s,m,d)=>{const t=r.ownerDocument.defaultView;let i=(0,l.i)(r);const M=w=>i?-w.deltaX:w.deltaX;return(0,c.createGesture)({el:r,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:w=>(i=(0,l.i)(r),(w=>{const{startX:C}=w;return i?C>=t.innerWidth-50:C<=50})(w)&&o()),onStart:s,onMove:w=>{const C=M(w)/t.innerWidth;m(C)},onEnd:w=>{const O=M(w),C=t.innerWidth,h=O/C,L=(w=>i?-w.velocityX:w.velocityX)(w),x=L>=0&&(L>.2||O>C/2),I=(x?1-h:h)*C;let S=0;if(I>5){const _=I/Math.abs(L);S=Math.min(_,540)}d(x,h<=0?.01:(0,f.j)(0,h,.9999),S)}})}},2935:(D,p,n)=>{n.d(p,{w:()=>f});const f=(a,e,r)=>{if(typeof MutationObserver>"u")return;const o=new MutationObserver(s=>{r(l(s,e))});return o.observe(a,{childList:!0,subtree:!0}),o},l=(a,e)=>{let r;return a.forEach(o=>{for(let s=0;s<o.addedNodes.length;s++)r=c(o.addedNodes[s],e)||r}),r},c=(a,e)=>{if(1!==a.nodeType)return;const r=a;return(r.tagName===e.toUpperCase()?[r]:Array.from(r.querySelectorAll(e))).find(s=>s.value===r.value)}},68206:(D,p,n)=>{n.d(p,{Y:()=>a});var f=n(60177),l=n(3271),c=n(54438);let a=(()=>{var e;class r{}return(e=r).\u0275fac=function(s){return new(s||e)},e.\u0275mod=c.$C({type:e}),e.\u0275inj=c.G2t({imports:[f.MD,l.ae$]}),r})()},38322:(D,p,n)=>{n.r(p),n.d(p,{ShowcaseModule:()=>Dn});var f=n(60177),l=n(84341),c=n(86499),a=n(3271),e=n(97834),r=n(77696),o=n(68206),s=n(14448),m=n(55779),sn=(n(9662),n(73097),n(35191),n(34929),n(53375),n(64523),n(74614),n(81863),n(85405),n(87936),n(44759),n(45026),n(12748),n(69935),n(46865),n(65897),n(72546),n(86426),n(38393),n(32514),n(98425),n(92403),n(99361),n(31578),n(57221),n(47241),n(405),n(92701),n(44767),n(1327),n(73263),n(50002),n(74661),n(52909),n(31977),n(53919),n(71673),n(84525),n(16409),n(65455),n(49524)),B=n(54438);let rn=(()=>{var P;class A{}return(P=A).\u0275fac=function(N){return new(N||P)},P.\u0275mod=B.$C({type:P}),P.\u0275inj=B.G2t({imports:[c.iI.forChild(sn.J),c.iI]}),A})();n(73131),n(63806),n(63355),n(49063),n(42417),n(14798),n(21779),n(58554),n(9433),n(88242),n(99465),n(43369),n(25217),n(51861),n(60883),n(24001),n(46960);const Cn=[m.m,rn];let Dn=(()=>{var P;class A{}return(P=A).\u0275fac=function(N){return new(N||P)},P.\u0275mod=B.$C({type:P}),P.\u0275inj=B.G2t({imports:[Cn,f.MD,l.YN,a.ae$.forChild({moduleRootRoutePath:"/home/showcase"}),r.Zy,o.Y,c.iI,s.Y,e.iq]}),A})()}}]);