"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8592],{17817:(L,g,t)=>{t.d(g,{c:()=>a});var m=t(19942),l=t(89951),c=t(96535);const a=(e,i)=>{let o,s;const f=(r,d,p)=>{if(typeof document>"u")return;const y=document.elementFromPoint(r,d);y&&i(y)?y!==o&&(n(),u(y,p)):n()},u=(r,d)=>{o=r,s||(s=o);const p=o;(0,m.w)(()=>p.classList.add("ion-activated")),d()},n=(r=!1)=>{if(!o)return;const d=o;(0,m.w)(()=>d.classList.remove("ion-activated")),r&&s!==o&&o.click(),o=void 0};return(0,c.createGesture)({el:e,gestureName:"buttonActiveDrag",threshold:0,onStart:r=>f(r.currentX,r.currentY,l.a),onMove:r=>f(r.currentX,r.currentY,l.b),onEnd:()=>{n(!0),(0,l.h)(),s=void 0}})}},81836:(L,g,t)=>{t.d(g,{g:()=>l});var m=t(81848);const l=()=>{if(void 0!==m.w)return m.w.Capacitor}},90983:(L,g,t)=>{t.d(g,{c:()=>m,i:()=>l});const m=(c,a,e)=>"function"==typeof e?e(c,a):"string"==typeof e?c[e]===a[e]:Array.isArray(a)?a.includes(c):c===a,l=(c,a,e)=>void 0!==c&&(Array.isArray(c)?c.some(i=>m(i,a,e)):m(c,a,e))},98958:(L,g,t)=>{t.d(g,{E:()=>u,a:()=>m});const m=n=>{try{if(n instanceof o)return n.value;if(!a()||"string"!=typeof n||""===n)return n;if(n.includes("onload="))return"";const r=document.createDocumentFragment(),d=document.createElement("div");r.appendChild(d),d.innerHTML=n,i.forEach(h=>{const w=r.querySelectorAll(h);for(let E=w.length-1;E>=0;E--){const O=w[E];O.parentNode?O.parentNode.removeChild(O):r.removeChild(O);const C=c(O);for(let v=0;v<C.length;v++)l(C[v])}});const p=c(r);for(let h=0;h<p.length;h++)l(p[h]);const y=document.createElement("div");y.appendChild(r);const M=y.querySelector("div");return null!==M?M.innerHTML:y.innerHTML}catch(r){return console.error(r),""}},l=n=>{if(n.nodeType&&1!==n.nodeType)return;if(typeof NamedNodeMap<"u"&&!(n.attributes instanceof NamedNodeMap))return void n.remove();for(let d=n.attributes.length-1;d>=0;d--){const p=n.attributes.item(d),y=p.name;if(!e.includes(y.toLowerCase())){n.removeAttribute(y);continue}const M=p.value,h=n[y];(null!=M&&M.toLowerCase().includes("javascript:")||null!=h&&h.toLowerCase().includes("javascript:"))&&n.removeAttribute(y)}const r=c(n);for(let d=0;d<r.length;d++)l(r[d])},c=n=>null!=n.children?n.children:n.childNodes,a=()=>{var n;const r=window,d=null===(n=r?.Ionic)||void 0===n?void 0:n.config;return!d||(d.get?d.get("sanitizerEnabled",!0):!0===d.sanitizerEnabled||void 0===d.sanitizerEnabled)},e=["class","id","href","src","name","slot"],i=["script","style","iframe","meta","link","object","embed"];class o{constructor(r){this.value=r}}const u=!1},44510:(L,g,t)=>{t.d(g,{g:()=>m});const m=(i,o,s,f,u)=>c(i[1],o[1],s[1],f[1],u).map(n=>l(i[0],o[0],s[0],f[0],n)),l=(i,o,s,f,u)=>u*(3*o*Math.pow(u-1,2)+u*(-3*s*u+3*s+f*u))-i*Math.pow(u-1,3),c=(i,o,s,f,u)=>e((f-=u)-3*(s-=u)+3*(o-=u)-(i-=u),3*s-6*o+3*i,3*o-3*i,i).filter(r=>r>=0&&r<=1),e=(i,o,s,f)=>{if(0===i)return((i,o,s)=>{const f=o*o-4*i*s;return f<0?[]:[(-o+Math.sqrt(f))/(2*i),(-o-Math.sqrt(f))/(2*i)]})(o,s,f);const u=(3*(s/=i)-(o/=i)*o)/3,n=(2*o*o*o-9*o*s+27*(f/=i))/27;if(0===u)return[Math.pow(-n,1/3)];if(0===n)return[Math.sqrt(-u),-Math.sqrt(-u)];const r=Math.pow(n/2,2)+Math.pow(u/3,3);if(0===r)return[Math.pow(n/2,.5)-o/3];if(r>0)return[Math.pow(-n/2+Math.sqrt(r),1/3)-Math.pow(n/2+Math.sqrt(r),1/3)-o/3];const d=Math.sqrt(Math.pow(-u/3,3)),p=Math.acos(-n/(2*Math.sqrt(Math.pow(-u/3,3)))),y=2*Math.pow(d,1/3);return[y*Math.cos(p/3)-o/3,y*Math.cos((p+2*Math.PI)/3)-o/3,y*Math.cos((p+4*Math.PI)/3)-o/3]}},74162:(L,g,t)=>{t.d(g,{i:()=>m});const m=l=>l&&""!==l.dir?"rtl"===l.dir.toLowerCase():"rtl"===document?.dir.toLowerCase()},58434:(L,g,t)=>{t.r(g),t.d(g,{startFocusVisible:()=>a});const m="ion-focused",c=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],a=e=>{let i=[],o=!0;const s=e?e.shadowRoot:document,f=e||document.body,u=M=>{i.forEach(h=>h.classList.remove(m)),M.forEach(h=>h.classList.add(m)),i=M},n=()=>{o=!1,u([])},r=M=>{o=c.includes(M.key),o||u([])},d=M=>{if(o&&void 0!==M.composedPath){const h=M.composedPath().filter(w=>!!w.classList&&w.classList.contains("ion-focusable"));u(h)}},p=()=>{s.activeElement===f&&u([])};return s.addEventListener("keydown",r),s.addEventListener("focusin",d),s.addEventListener("focusout",p),s.addEventListener("touchstart",n,{passive:!0}),s.addEventListener("mousedown",n),{destroy:()=>{s.removeEventListener("keydown",r),s.removeEventListener("focusin",d),s.removeEventListener("focusout",p),s.removeEventListener("touchstart",n),s.removeEventListener("mousedown",n)},setFocus:u}}},89749:(L,g,t)=>{t.d(g,{c:()=>l});var m=t(50512);const l=i=>{const o=i;let s;return{hasLegacyControl:()=>{if(void 0===s){const u=void 0!==o.label||c(o),n=o.hasAttribute("aria-label")||o.hasAttribute("aria-labelledby")&&null===o.shadowRoot,r=(0,m.h)(o);s=!0===o.legacy||!u&&!n&&null!==r}return s}}},c=i=>!!(a.includes(i.tagName)&&null!==i.querySelector('[slot="label"]')||e.includes(i.tagName)&&""!==i.textContent),a=["ION-INPUT","ION-TEXTAREA","ION-SELECT","ION-RANGE"],e=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},89951:(L,g,t)=>{t.d(g,{I:()=>l,a:()=>o,b:()=>s,c:()=>i,d:()=>u,h:()=>f});var m=t(81836),l=function(n){return n.Heavy="HEAVY",n.Medium="MEDIUM",n.Light="LIGHT",n}(l||{});const a={getEngine(){const n=window.TapticEngine;if(n)return n;const r=(0,m.g)();return r?.isPluginAvailable("Haptics")?r.Plugins.Haptics:void 0},available(){if(!this.getEngine())return!1;const r=(0,m.g)();return"web"!==r?.getPlatform()||typeof navigator<"u"&&void 0!==navigator.vibrate},isCordova:()=>void 0!==window.TapticEngine,isCapacitor:()=>void 0!==(0,m.g)(),impact(n){const r=this.getEngine();if(!r)return;const d=this.isCapacitor()?n.style:n.style.toLowerCase();r.impact({style:d})},notification(n){const r=this.getEngine();if(!r)return;const d=this.isCapacitor()?n.type:n.type.toLowerCase();r.notification({type:d})},selection(){const n=this.isCapacitor()?l.Light:"light";this.impact({style:n})},selectionStart(){const n=this.getEngine();n&&(this.isCapacitor()?n.selectionStart():n.gestureSelectionStart())},selectionChanged(){const n=this.getEngine();n&&(this.isCapacitor()?n.selectionChanged():n.gestureSelectionChanged())},selectionEnd(){const n=this.getEngine();n&&(this.isCapacitor()?n.selectionEnd():n.gestureSelectionEnd())}},e=()=>a.available(),i=()=>{e()&&a.selection()},o=()=>{e()&&a.selectionStart()},s=()=>{e()&&a.selectionChanged()},f=()=>{e()&&a.selectionEnd()},u=n=>{e()&&a.impact(n)}},17946:(L,g,t)=>{t.d(g,{I:()=>i,a:()=>u,b:()=>e,c:()=>d,d:()=>y,f:()=>n,g:()=>f,i:()=>s,p:()=>p,r:()=>M,s:()=>r});var m=t(15861),l=t(50512),c=t(52400);const e="ion-content",i=".ion-content-scroll-host",o=`${e}, ${i}`,s=h=>"ION-CONTENT"===h.tagName,f=function(){var h=(0,m.Z)(function*(w){return s(w)?(yield new Promise(E=>(0,l.c)(w,E)),w.getScrollElement()):w});return function(E){return h.apply(this,arguments)}}(),u=h=>h.querySelector(i)||h.querySelector(o),n=h=>h.closest(o),r=(h,w)=>s(h)?h.scrollToTop(w):Promise.resolve(h.scrollTo({top:0,left:0,behavior:w>0?"smooth":"auto"})),d=(h,w,E,O)=>s(h)?h.scrollByPoint(w,E,O):Promise.resolve(h.scrollBy({top:E,left:w,behavior:O>0?"smooth":"auto"})),p=h=>(0,c.b)(h,e),y=h=>{if(s(h)){const E=h.scrollY;return h.scrollY=!1,E}return h.style.setProperty("overflow","hidden"),!0},M=(h,w)=>{s(h)?h.scrollY=w:h.style.removeProperty("overflow")}},71076:(L,g,t)=>{t.d(g,{a:()=>m,b:()=>d,c:()=>o,d:()=>p,e:()=>D,f:()=>i,g:()=>y,h:()=>c,i:()=>l,j:()=>O,k:()=>C,l:()=>s,m:()=>n,n:()=>M,o:()=>u,p:()=>e,q:()=>a,r:()=>E,s:()=>v,t:()=>r,u:()=>h,v:()=>w,w:()=>f});const m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",D="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},85917:(L,g,t)=>{t.d(g,{c:()=>a,g:()=>e});var m=t(81848),l=t(50512),c=t(52400);const a=(o,s,f)=>{let u,n;if(void 0!==m.w&&"MutationObserver"in m.w){const y=Array.isArray(s)?s:[s];u=new MutationObserver(M=>{for(const h of M)for(const w of h.addedNodes)if(w.nodeType===Node.ELEMENT_NODE&&y.includes(w.slot))return f(),void(0,l.r)(()=>r(w))}),u.observe(o,{childList:!0})}const r=y=>{var M;n&&(n.disconnect(),n=void 0),n=new MutationObserver(h=>{f();for(const w of h)for(const E of w.removedNodes)E.nodeType===Node.ELEMENT_NODE&&E.slot===s&&p()}),n.observe(null!==(M=y.parentElement)&&void 0!==M?M:y,{subtree:!0,childList:!0})},p=()=>{n&&(n.disconnect(),n=void 0)};return{destroy:()=>{u&&(u.disconnect(),u=void 0),p()}}},e=(o,s,f)=>{const u=null==o?0:o.toString().length,n=i(u,s);if(void 0===f)return n;try{return f(u,s)}catch(r){return(0,c.a)("Exception in provided `counterFormatter`.",r),n}},i=(o,s)=>`${o} / ${s}`},46591:(L,g,t)=>{t.r(g),t.d(g,{KEYBOARD_DID_CLOSE:()=>e,KEYBOARD_DID_OPEN:()=>a,copyVisualViewport:()=>C,keyboardDidClose:()=>h,keyboardDidOpen:()=>y,keyboardDidResize:()=>M,resetKeyboardAssist:()=>u,setKeyboardClose:()=>p,setKeyboardOpen:()=>d,startKeyboardAssist:()=>n,trackViewportChanges:()=>O});var m=t(53920);t(81836),t(81848);const a="ionKeyboardDidShow",e="ionKeyboardDidHide";let o={},s={},f=!1;const u=()=>{o={},s={},f=!1},n=v=>{if(m.K.getEngine())r(v);else{if(!v.visualViewport)return;s=C(v.visualViewport),v.visualViewport.onresize=()=>{O(v),y()||M(v)?d(v):h(v)&&p(v)}}},r=v=>{v.addEventListener("keyboardDidShow",D=>d(v,D)),v.addEventListener("keyboardDidHide",()=>p(v))},d=(v,D)=>{w(v,D),f=!0},p=v=>{E(v),f=!1},y=()=>!f&&o.width===s.width&&(o.height-s.height)*s.scale>150,M=v=>f&&!h(v),h=v=>f&&s.height===v.innerHeight,w=(v,D)=>{const T=new CustomEvent(a,{detail:{keyboardHeight:D?D.keyboardHeight:v.innerHeight-s.height}});v.dispatchEvent(T)},E=v=>{const D=new CustomEvent(e);v.dispatchEvent(D)},O=v=>{o=Object.assign({},s),s=C(v.visualViewport)},C=v=>({width:Math.round(v.width),height:Math.round(v.height),offsetTop:v.offsetTop,offsetLeft:v.offsetLeft,pageTop:v.pageTop,pageLeft:v.pageLeft,scale:v.scale})},53920:(L,g,t)=>{t.d(g,{K:()=>a,a:()=>c});var m=t(81836),l=function(e){return e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE",e}(l||{}),c=function(e){return e.Body="body",e.Ionic="ionic",e.Native="native",e.None="none",e}(c||{});const a={getEngine(){const e=(0,m.g)();if(e?.isPluginAvailable("Keyboard"))return e.Plugins.Keyboard},getResizeMode(){const e=this.getEngine();return e?.getResizeMode?e.getResizeMode().catch(i=>{if(i.code!==l.Unimplemented)throw i}):Promise.resolve(void 0)}}},89252:(L,g,t)=>{t.d(g,{c:()=>i});var m=t(15861),l=t(81848),c=t(53920);const a=o=>void 0===l.d||o===c.a.None||void 0===o?null:l.d.querySelector("ion-app")??l.d.body,e=o=>{const s=a(o);return null===s?0:s.clientHeight},i=function(){var o=(0,m.Z)(function*(s){let f,u,n,r;const d=function(){var w=(0,m.Z)(function*(){const E=yield c.K.getResizeMode(),O=void 0===E?void 0:E.mode;f=()=>{void 0===r&&(r=e(O)),n=!0,p(n,O)},u=()=>{n=!1,p(n,O)},null==l.w||l.w.addEventListener("keyboardWillShow",f),null==l.w||l.w.addEventListener("keyboardWillHide",u)});return function(){return w.apply(this,arguments)}}(),p=(w,E)=>{s&&s(w,y(E))},y=w=>{if(0===r||r===e(w))return;const E=a(w);return null!==E?new Promise(O=>{const v=new ResizeObserver(()=>{E.clientHeight===r&&(v.disconnect(),O())});v.observe(E)}):void 0};return yield d(),{init:d,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",f),null==l.w||l.w.removeEventListener("keyboardWillHide",u),f=u=void 0},isKeyboardVisible:()=>n}});return function(f){return o.apply(this,arguments)}}()},29229:(L,g,t)=>{t.d(g,{c:()=>l});var m=t(15861);const l=()=>{let c;return{lock:function(){var e=(0,m.Z)(function*(){const i=c;let o;return c=new Promise(s=>o=s),void 0!==i&&(yield i),o});return function(){return e.apply(this,arguments)}}()}}},4793:(L,g,t)=>{t.d(g,{c:()=>c});var m=t(81848),l=t(50512);const c=(a,e,i)=>{let o;const s=()=>!(void 0===e()||void 0!==a.label||null===i()),u=()=>{const r=e();if(void 0===r)return;if(!s())return void r.style.removeProperty("width");const d=i().scrollWidth;if(0===d&&null===r.offsetParent&&void 0!==m.w&&"IntersectionObserver"in m.w){if(void 0!==o)return;const p=o=new IntersectionObserver(y=>{1===y[0].intersectionRatio&&(u(),p.disconnect(),o=void 0)},{threshold:.01,root:a});p.observe(r)}else r.style.setProperty("width",.75*d+"px")};return{calculateNotchWidth:()=>{s()&&(0,l.r)(()=>{u()})},destroy:()=>{o&&(o.disconnect(),o=void 0)}}}},22217:(L,g,t)=>{t.d(g,{S:()=>l});const l={bubbles:{dur:1e3,circles:9,fn:(c,a,e)=>{const i=c*a/e-c+"ms",o=2*Math.PI*a/e;return{r:5,style:{top:32*Math.sin(o)+"%",left:32*Math.cos(o)+"%","animation-delay":i}}}},circles:{dur:1e3,circles:8,fn:(c,a,e)=>{const i=a/e,o=c*i-c+"ms",s=2*Math.PI*i;return{r:5,style:{top:32*Math.sin(s)+"%",left:32*Math.cos(s)+"%","animation-delay":o}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(c,a)=>({r:6,style:{left:32-32*a+"%","animation-delay":-110*a+"ms"}})},lines:{dur:1e3,lines:8,fn:(c,a,e)=>({y1:14,y2:26,style:{transform:`rotate(${360/e*a+(a<e/2?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(c,a,e)=>({y1:12,y2:20,style:{transform:`rotate(${360/e*a+(a<e/2?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(c,a,e)=>({y1:17,y2:29,style:{transform:`rotate(${30*a+(a<6?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(c,a,e)=>({y1:12,y2:20,style:{transform:`rotate(${30*a+(a<6?180:-180)}deg)`,"animation-delay":c*a/e-c+"ms"}})}}},93049:(L,g,t)=>{t.r(g),t.d(g,{createSwipeBackGesture:()=>e});var m=t(50512),l=t(74162),c=t(96535);t(2019);const e=(i,o,s,f,u)=>{const n=i.ownerDocument.defaultView;let r=(0,l.i)(i);const p=E=>r?-E.deltaX:E.deltaX;return(0,c.createGesture)({el:i,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:E=>(r=(0,l.i)(i),(E=>{const{startX:C}=E;return r?C>=n.innerWidth-50:C<=50})(E)&&o()),onStart:s,onMove:E=>{const C=p(E)/n.innerWidth;f(C)},onEnd:E=>{const O=p(E),C=n.innerWidth,v=O/C,D=(E=>r?-E.velocityX:E.velocityX)(E),T=D>=0&&(D>.2||O>C/2),I=(T?1-v:v)*C;let B=0;if(I>5){const x=I/Math.abs(D);B=Math.min(x,540)}u(T,v<=0?.01:(0,m.l)(0,v,.9999),B)}})}},76806:(L,g,t)=>{t.d(g,{w:()=>m});const m=(a,e,i)=>{if(typeof MutationObserver>"u")return;const o=new MutationObserver(s=>{i(l(s,e))});return o.observe(a,{childList:!0,subtree:!0}),o},l=(a,e)=>{let i;return a.forEach(o=>{for(let s=0;s<o.addedNodes.length;s++)i=c(o.addedNodes[s],e)||i}),i},c=(a,e)=>{if(1!==a.nodeType)return;const i=a;return(i.tagName===e.toUpperCase()?[i]:Array.from(i.querySelectorAll(e))).find(s=>s.value===i.value)}},75771:(L,g,t)=>{t.d(g,{v:()=>a});var m=t(96814),l=t(89780),c=t(19212);let a=(()=>{var e;class i{}return(e=i).\u0275fac=function(s){return new(s||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[m.ez,l.J_B]}),i})()},44538:(L,g,t)=>{t.r(g),t.d(g,{ShowcaseModule:()=>Ct});var m=t(96814),l=t(60095),c=t(78406),a=t(89780),e=t(21533),i=t(16585),o=t(75771),s=t(96901),f=t(75440),st=(t(20552),t(18163),t(89527),t(45562),t(96712),t(62594),t(18347),t(45782),t(77030),t(63619),t(55431),t(33303),t(3344),t(81678),t(25748),t(64564),t(535),t(84957),t(12189),t(87545),t(69870),t(67440),t(5194),t(90311),t(66001),t(35160),t(57168),t(71483),t(96949),t(22401),t(25906),t(73633),t(74659),t(3693),t(96698),t(90408),t(70738),t(40373),t(33278),t(40896),t(95942)),_=t(19212);let rt=(()=>{var P;class S{}return(P=S).\u0275fac=function(R){return new(R||P)},P.\u0275mod=_.oAB({type:P}),P.\u0275inj=_.cJS({imports:[c.Bz.forChild(st._),c.Bz]}),S})();t(37618),t(5448),t(81786),t(13756),t(48376),t(11899),t(22546),t(50710),t(77227),t(60280),t(26011),t(84694),t(63274),t(64463),t(82192),t(92110),t(78176);const Ot=[f.Y,rt];t(81520);let Ct=(()=>{var P;class S{}return(P=S).\u0275fac=function(R){return new(R||P)},P.\u0275mod=_.oAB({type:P}),P.\u0275inj=_.cJS({imports:[Ot,m.ez,l.u5,a.J_B.forChild({moduleRootRoutePath:"/home/showcase"}),i.a,o.v,c.Bz,s.Q,e.gu]}),S})()}}]);