"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8592],{77543:(D,p,t)=>{t.d(p,{c:()=>c});var v=t(71308),u=t(17864),d=t(71911);const c=(r,n)=>{let e,o;const i=(l,w,f)=>{if(typeof document>"u")return;const E=document.elementFromPoint(l,w);E&&n(E)?E!==e&&(h(),a(E,f)):h()},a=(l,w)=>{e=l,o||(o=e);const f=e;(0,v.c)(()=>f.classList.add("ion-activated")),w()},h=(l=!1)=>{if(!e)return;const w=e;(0,v.c)(()=>w.classList.remove("ion-activated")),l&&o!==e&&e.click(),e=void 0};return(0,d.createGesture)({el:r,gestureName:"buttonActiveDrag",threshold:0,onStart:l=>i(l.currentX,l.currentY,u.a),onMove:l=>i(l.currentX,l.currentY,u.b),onEnd:()=>{h(!0),(0,u.h)(),o=void 0}})}},32225:(D,p,t)=>{t.d(p,{g:()=>v});const v=(n,e,o,i,a)=>d(n[1],e[1],o[1],i[1],a).map(h=>u(n[0],e[0],o[0],i[0],h)),u=(n,e,o,i,a)=>a*(3*e*Math.pow(a-1,2)+a*(-3*o*a+3*o+i*a))-n*Math.pow(a-1,3),d=(n,e,o,i,a)=>r((i-=a)-3*(o-=a)+3*(e-=a)-(n-=a),3*o-6*e+3*n,3*e-3*n,n).filter(l=>l>=0&&l<=1),r=(n,e,o,i)=>{if(0===n)return((n,e,o)=>{const i=e*e-4*n*o;return i<0?[]:[(-e+Math.sqrt(i))/(2*n),(-e-Math.sqrt(i))/(2*n)]})(e,o,i);const a=(3*(o/=n)-(e/=n)*e)/3,h=(2*e*e*e-9*e*o+27*(i/=n))/27;if(0===a)return[Math.pow(-h,1/3)];if(0===h)return[Math.sqrt(-a),-Math.sqrt(-a)];const l=Math.pow(h/2,2)+Math.pow(a/3,3);if(0===l)return[Math.pow(h/2,.5)-e/3];if(l>0)return[Math.pow(-h/2+Math.sqrt(l),1/3)-Math.pow(h/2+Math.sqrt(l),1/3)-e/3];const w=Math.sqrt(Math.pow(-a/3,3)),f=Math.acos(-h/(2*Math.sqrt(Math.pow(-a/3,3)))),E=2*Math.pow(w,1/3);return[E*Math.cos(f/3)-e/3,E*Math.cos((f+2*Math.PI)/3)-e/3,E*Math.cos((f+4*Math.PI)/3)-e/3]}},75062:(D,p,t)=>{t.d(p,{i:()=>v});const v=u=>u&&""!==u.dir?"rtl"===u.dir.toLowerCase():"rtl"===document?.dir.toLowerCase()},55106:(D,p,t)=>{t.r(p),t.d(p,{startFocusVisible:()=>c});const v="ion-focused",d=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],c=r=>{let n=[],e=!0;const o=r?r.shadowRoot:document,i=r||document.body,a=y=>{n.forEach(m=>m.classList.remove(v)),y.forEach(m=>m.classList.add(v)),n=y},h=()=>{e=!1,a([])},l=y=>{e=d.includes(y.key),e||a([])},w=y=>{if(e&&void 0!==y.composedPath){const m=y.composedPath().filter(g=>!!g.classList&&g.classList.contains("ion-focusable"));a(m)}},f=()=>{o.activeElement===i&&a([])};return o.addEventListener("keydown",l),o.addEventListener("focusin",w),o.addEventListener("focusout",f),o.addEventListener("touchstart",h),o.addEventListener("mousedown",h),{destroy:()=>{o.removeEventListener("keydown",l),o.removeEventListener("focusin",w),o.removeEventListener("focusout",f),o.removeEventListener("touchstart",h),o.removeEventListener("mousedown",h)},setFocus:a}}},97040:(D,p,t)=>{t.d(p,{C:()=>r,a:()=>d,d:()=>c});var v=t(15861),u=t(35730);const d=function(){var n=(0,v.Z)(function*(e,o,i,a,h,l){var w;if(e)return e.attachViewToDom(o,i,h,a);if(!(l||"string"==typeof i||i instanceof HTMLElement))throw new Error("framework delegate is missing");const f="string"==typeof i?null===(w=o.ownerDocument)||void 0===w?void 0:w.createElement(i):i;return a&&a.forEach(E=>f.classList.add(E)),h&&Object.assign(f,h),o.appendChild(f),yield new Promise(E=>(0,u.c)(f,E)),f});return function(o,i,a,h,l,w){return n.apply(this,arguments)}}(),c=(n,e)=>{if(e){if(n)return n.removeViewFromDom(e.parentElement,e);e.remove()}return Promise.resolve()},r=()=>{let n,e;return{attachViewToDom:function(){var a=(0,v.Z)(function*(h,l,w={},f=[]){var E,y;if(n=h,l){const g="string"==typeof l?null===(E=n.ownerDocument)||void 0===E?void 0:E.createElement(l):l;f.forEach(s=>g.classList.add(s)),Object.assign(g,w),n.appendChild(g),yield new Promise(s=>(0,u.c)(g,s))}else if(n.children.length>0&&!n.children[0].classList.contains("ion-delegate-host")){const s=null===(y=n.ownerDocument)||void 0===y?void 0:y.createElement("div");s.classList.add("ion-delegate-host"),f.forEach(M=>s.classList.add(M)),s.append(...n.children),n.appendChild(s)}const m=document.querySelector("ion-app")||document.body;return e=document.createComment("ionic teleport"),n.parentNode.insertBefore(e,n),m.appendChild(n),n});return function(l,w){return a.apply(this,arguments)}}(),removeViewFromDom:()=>(n&&e&&(e.parentNode.insertBefore(n,e),e.remove()),Promise.resolve())}}},17864:(D,p,t)=>{t.d(p,{a:()=>c,b:()=>r,c:()=>d,d:()=>e,h:()=>n});const v={getEngine(){var o;const i=window;return i.TapticEngine||(null===(o=i.Capacitor)||void 0===o?void 0:o.isPluginAvailable("Haptics"))&&i.Capacitor.Plugins.Haptics},available(){var o;const i=window;return!!this.getEngine()&&("web"!==(null===(o=i.Capacitor)||void 0===o?void 0:o.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(o){const i=this.getEngine();if(!i)return;const a=this.isCapacitor()?o.style.toUpperCase():o.style;i.impact({style:a})},notification(o){const i=this.getEngine();if(!i)return;const a=this.isCapacitor()?o.style.toUpperCase():o.style;i.notification({style:a})},selection(){this.impact({style:"light"})},selectionStart(){const o=this.getEngine();!o||(this.isCapacitor()?o.selectionStart():o.gestureSelectionStart())},selectionChanged(){const o=this.getEngine();!o||(this.isCapacitor()?o.selectionChanged():o.gestureSelectionChanged())},selectionEnd(){const o=this.getEngine();!o||(this.isCapacitor()?o.selectionEnd():o.gestureSelectionEnd())}},u=()=>v.available(),d=()=>{u()&&v.selection()},c=()=>{u()&&v.selectionStart()},r=()=>{u()&&v.selectionChanged()},n=()=>{u()&&v.selectionEnd()},e=o=>{u()&&v.impact(o)}},6642:(D,p,t)=>{t.d(p,{I:()=>r,a:()=>a,b:()=>n,c:()=>w,d:()=>E,f:()=>h,g:()=>i,i:()=>o,p:()=>f,r:()=>y,s:()=>l});var v=t(15861),u=t(35730),d=t(94147);const r="ion-content",n=".ion-content-scroll-host",e=`${r}, ${n}`,o=m=>"ION-CONTENT"===m.tagName,i=function(){var m=(0,v.Z)(function*(g){return o(g)?(yield new Promise(s=>(0,u.c)(g,s)),g.getScrollElement()):g});return function(s){return m.apply(this,arguments)}}(),a=m=>m.querySelector(n)||m.querySelector(e),h=m=>m.closest(e),l=(m,g)=>o(m)?m.scrollToTop(g):Promise.resolve(m.scrollTo({top:0,left:0,behavior:g>0?"smooth":"auto"})),w=(m,g,s,M)=>o(m)?m.scrollByPoint(g,s,M):Promise.resolve(m.scrollBy({top:s,left:g,behavior:M>0?"smooth":"auto"})),f=m=>(0,d.a)(m,r),E=m=>{if(o(m)){const s=m.scrollY;return m.scrollY=!1,s}return m.style.setProperty("overflow","hidden"),!0},y=(m,g)=>{o(m)?m.scrollY=g:m.style.removeProperty("overflow")}},2357:(D,p,t)=>{t.d(p,{a:()=>v,b:()=>l,c:()=>e,d:()=>w,e:()=>x,f:()=>n,g:()=>f,h:()=>d,i:()=>u,j:()=>s,k:()=>M,l:()=>o,m:()=>a,n:()=>E,o:()=>i,p:()=>r,q:()=>c,r:()=>g,s:()=>C,t:()=>h,u:()=>y,v:()=>m});const v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Back</title><path d='M368 64L144 256l224 192V64z'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Up</title><path d='M448 368L256 144 64 368h384z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Checkmark</title><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Back</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipse</title><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipsis Horizontal</title><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Remove</title><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Three</title><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Two</title><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},28439:(D,p,t)=>{t.d(p,{s:()=>v});const v=o=>{try{if(o instanceof e)return o.value;if(!c()||"string"!=typeof o||""===o)return o;const i=document.createDocumentFragment(),a=document.createElement("div");i.appendChild(a),a.innerHTML=o,n.forEach(f=>{const E=i.querySelectorAll(f);for(let y=E.length-1;y>=0;y--){const m=E[y];m.parentNode?m.parentNode.removeChild(m):i.removeChild(m);const g=d(m);for(let s=0;s<g.length;s++)u(g[s])}});const h=d(i);for(let f=0;f<h.length;f++)u(h[f]);const l=document.createElement("div");l.appendChild(i);const w=l.querySelector("div");return null!==w?w.innerHTML:l.innerHTML}catch(i){return console.error(i),""}},u=o=>{if(o.nodeType&&1!==o.nodeType)return;for(let a=o.attributes.length-1;a>=0;a--){const h=o.attributes.item(a),l=h.name;if(!r.includes(l.toLowerCase())){o.removeAttribute(l);continue}const w=h.value;null!=w&&w.toLowerCase().includes("javascript:")&&o.removeAttribute(l)}const i=d(o);for(let a=0;a<i.length;a++)u(i[a])},d=o=>null!=o.children?o.children:o.childNodes,c=()=>{var o;const a=null===(o=window?.Ionic)||void 0===o?void 0:o.config;return!a||(a.get?a.get("sanitizerEnabled",!0):!0===a.sanitizerEnabled||void 0===a.sanitizerEnabled)},r=["class","id","href","src","name","slot"],n=["script","style","iframe","meta","link","object","embed"];class e{constructor(i){this.value=i}}},51316:(D,p,t)=>{t.r(p),t.d(p,{KEYBOARD_DID_CLOSE:()=>u,KEYBOARD_DID_OPEN:()=>v,copyVisualViewport:()=>g,keyboardDidClose:()=>f,keyboardDidOpen:()=>l,keyboardDidResize:()=>w,resetKeyboardAssist:()=>e,setKeyboardClose:()=>h,setKeyboardOpen:()=>a,startKeyboardAssist:()=>o,trackViewportChanges:()=>m});const v="ionKeyboardDidShow",u="ionKeyboardDidHide";let c={},r={},n=!1;const e=()=>{c={},r={},n=!1},o=s=>{i(s),s.visualViewport&&(r=g(s.visualViewport),s.visualViewport.onresize=()=>{m(s),l()||w(s)?a(s):f(s)&&h(s)})},i=s=>{s.addEventListener("keyboardDidShow",M=>a(s,M)),s.addEventListener("keyboardDidHide",()=>h(s))},a=(s,M)=>{E(s,M),n=!0},h=s=>{y(s),n=!1},l=()=>!n&&c.width===r.width&&(c.height-r.height)*r.scale>150,w=s=>n&&!f(s),f=s=>n&&r.height===s.innerHeight,E=(s,M)=>{const x=new CustomEvent(v,{detail:{keyboardHeight:M?M.keyboardHeight:s.innerHeight-r.height}});s.dispatchEvent(x)},y=s=>{const M=new CustomEvent(u);s.dispatchEvent(M)},m=s=>{c=Object.assign({},r),r=g(s.visualViewport)},g=s=>({width:Math.round(s.width),height:Math.round(s.height),offsetTop:s.offsetTop,offsetLeft:s.offsetLeft,pageTop:s.pageTop,pageLeft:s.pageLeft,scale:s.scale})},59852:(D,p,t)=>{t.d(p,{c:()=>u});var v=t(13457);const u=d=>{let c,r,n;const e=()=>{c=()=>{n=!0,d&&d(!0)},r=()=>{n=!1,d&&d(!1)},null==v.w||v.w.addEventListener("keyboardWillShow",c),null==v.w||v.w.addEventListener("keyboardWillHide",r)};return e(),{init:e,destroy:()=>{null==v.w||v.w.removeEventListener("keyboardWillShow",c),null==v.w||v.w.removeEventListener("keyboardWillHide",r),c=r=void 0},isKeyboardVisible:()=>n}}},17741:(D,p,t)=>{t.d(p,{S:()=>u});const u={bubbles:{dur:1e3,circles:9,fn:(d,c,r)=>{const n=d*c/r-d+"ms",e=2*Math.PI*c/r;return{r:5,style:{top:9*Math.sin(e)+"px",left:9*Math.cos(e)+"px","animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:(d,c,r)=>{const n=c/r,e=d*n-d+"ms",o=2*Math.PI*n;return{r:5,style:{top:9*Math.sin(o)+"px",left:9*Math.cos(o)+"px","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(d,c)=>({r:6,style:{left:9-9*c+"px","animation-delay":-110*c+"ms"}})},lines:{dur:1e3,lines:8,fn:(d,c,r)=>({y1:14,y2:26,style:{transform:`rotate(${360/r*c+(c<r/2?180:-180)}deg)`,"animation-delay":d*c/r-d+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(d,c,r)=>({y1:12,y2:20,style:{transform:`rotate(${360/r*c+(c<r/2?180:-180)}deg)`,"animation-delay":d*c/r-d+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(d,c,r)=>({y1:17,y2:29,style:{transform:`rotate(${30*c+(c<6?180:-180)}deg)`,"animation-delay":d*c/r-d+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(d,c,r)=>({y1:12,y2:20,style:{transform:`rotate(${30*c+(c<6?180:-180)}deg)`,"animation-delay":d*c/r-d+"ms"}})}}},81959:(D,p,t)=>{t.r(p),t.d(p,{createSwipeBackGesture:()=>r});var v=t(35730),u=t(75062),d=t(71911);t(34349);const r=(n,e,o,i,a)=>{const h=n.ownerDocument.defaultView,l=(0,u.i)(n),f=s=>l?-s.deltaX:s.deltaX;return(0,d.createGesture)({el:n,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:s=>(s=>{const{startX:C}=s;return l?C>=h.innerWidth-50:C<=50})(s)&&e(),onStart:o,onMove:s=>{const C=f(s)/h.innerWidth;i(C)},onEnd:s=>{const M=f(s),C=h.innerWidth,x=M/C,L=(s=>l?-s.velocityX:s.velocityX)(s),S=L>=0&&(L>.2||M>C/2),T=(S?1-x:x)*C;let B=0;if(T>5){const I=T/Math.abs(L);B=Math.min(I,540)}a(S,x<=0?.01:(0,v.l)(0,x,.9999),B)}})}},9909:(D,p,t)=>{t.d(p,{v:()=>d});var v=t(36895),u=t(94650);let d=(()=>{class c{}return c.\u0275fac=function(n){return new(n||c)},c.\u0275mod=u.oAB({type:c}),c.\u0275inj=u.cJS({imports:[v.ez]}),c})()},50730:(D,p,t)=>{t.r(p),t.d(p,{ShowcaseModule:()=>Et});var v=t(36895),u=t(90433),d=t(53666),c=t(95133),r=t(57913),n=t(9909),e=t(39658),o=t(20537),ot=(t(90502),t(82585),t(75308),t(40061),t(82536),t(14252),t(11652),t(74601),t(21058),t(48266),t(93428),t(33780),t(51362),t(6869),t(72792),t(90817),t(58088),t(87218),t(26799),t(63052),t(64296),t(430),t(68345),t(66546),t(30268),t(55150),t(59266),t(85722),t(42244),t(53161),t(91769),t(37841),t(31871),t(48336),t(89281),t(82234),t(5534),t(64389),t(50031),t(57667),t(70623)),P=t(94650);let et=(()=>{class O{}return O.\u0275fac=function(R){return new(R||O)},O.\u0275mod=P.oAB({type:O}),O.\u0275inj=P.cJS({imports:[d.Bz.forChild(ot._),d.Bz]}),O})();t(99308),t(11214),t(63445),t(51210),t(66709),t(40079),t(76464),t(14792),t(87768),t(72913),t(35975),t(51182),t(30017),t(90563),t(21141);const pt=[o.Y,et];t(13434);let Et=(()=>{class O{}return O.\u0275fac=function(R){return new(R||O)},O.\u0275mod=P.oAB({type:O}),O.\u0275inj=P.cJS({imports:[pt,v.ez,u.u5,c.Pc,r.J_.forChild({moduleRootRoutePath:"/home/showcase"}),r.a,n.v,d.Bz,e.Q]}),O})()}}]);