"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8592],{36712:(L,m,n)=>{n.d(m,{c:()=>r});var v=n(41688),c=n(27150),l=n(79203);const r=(t,i)=>{let o,e;const w=(a,E,p)=>{if(typeof document>"u")return;const M=document.elementFromPoint(a,E);M&&i(M)?M!==o&&(s(),f(M,p)):s()},f=(a,E)=>{o=a,e||(e=o);const p=o;(0,v.w)(()=>p.classList.add("ion-activated")),E()},s=(a=!1)=>{if(!o)return;const E=o;(0,v.w)(()=>E.classList.remove("ion-activated")),a&&e!==o&&o.click(),o=void 0};return(0,l.createGesture)({el:t,gestureName:"buttonActiveDrag",threshold:0,onStart:a=>w(a.currentX,a.currentY,c.a),onMove:a=>w(a.currentX,a.currentY,c.b),onEnd:()=>{s(!0),(0,c.h)(),e=void 0}})}},84874:(L,m,n)=>{n.d(m,{g:()=>c});var v=n(56225);const c=()=>{if(void 0!==v.w)return v.w.Capacitor}},95085:(L,m,n)=>{n.d(m,{i:()=>v});const v=c=>c&&""!==c.dir?"rtl"===c.dir.toLowerCase():"rtl"===document?.dir.toLowerCase()},62779:(L,m,n)=>{n.r(m),n.d(m,{startFocusVisible:()=>r});const v="ion-focused",l=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],r=t=>{let i=[],o=!0;const e=t?t.shadowRoot:document,w=t||document.body,f=y=>{i.forEach(u=>u.classList.remove(v)),y.forEach(u=>u.classList.add(v)),i=y},s=()=>{o=!1,f([])},a=y=>{o=l.includes(y.key),o||f([])},E=y=>{if(o&&void 0!==y.composedPath){const u=y.composedPath().filter(g=>!!g.classList&&g.classList.contains("ion-focusable"));f(u)}},p=()=>{e.activeElement===w&&f([])};return e.addEventListener("keydown",a),e.addEventListener("focusin",E),e.addEventListener("focusout",p),e.addEventListener("touchstart",s,{passive:!0}),e.addEventListener("mousedown",s),{destroy:()=>{e.removeEventListener("keydown",a),e.removeEventListener("focusin",E),e.removeEventListener("focusout",p),e.removeEventListener("touchstart",s),e.removeEventListener("mousedown",s)},setFocus:f}}},25487:(L,m,n)=>{n.d(m,{c:()=>c});var v=n(50839);const c=i=>{const o=i;let e;return{hasLegacyControl:()=>{if(void 0===e){const f=void 0!==o.label||l(o),s=o.hasAttribute("aria-label")||o.hasAttribute("aria-labelledby")&&null===o.shadowRoot,a=(0,v.h)(o);e=!0===o.legacy||!f&&!s&&null!==a}return e}}},l=i=>null!==i.shadowRoot&&!!(r.includes(i.tagName)&&null!==i.querySelector('[slot="label"]')||t.includes(i.tagName)&&""!==i.textContent),r=["ION-RANGE"],t=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},27150:(L,m,n)=>{n.d(m,{I:()=>c,a:()=>o,b:()=>e,c:()=>i,d:()=>f,h:()=>w});var v=n(84874),c=function(s){return s.Heavy="HEAVY",s.Medium="MEDIUM",s.Light="LIGHT",s}(c||{});const r={getEngine(){const s=window.TapticEngine;if(s)return s;const a=(0,v.g)();return a?.isPluginAvailable("Haptics")?a.Plugins.Haptics:void 0},available(){if(!this.getEngine())return!1;const a=(0,v.g)();return"web"!==a?.getPlatform()||typeof navigator<"u"&&void 0!==navigator.vibrate},isCordova:()=>void 0!==window.TapticEngine,isCapacitor:()=>void 0!==(0,v.g)(),impact(s){const a=this.getEngine();if(!a)return;const E=this.isCapacitor()?s.style:s.style.toLowerCase();a.impact({style:E})},notification(s){const a=this.getEngine();if(!a)return;const E=this.isCapacitor()?s.type:s.type.toLowerCase();a.notification({type:E})},selection(){const s=this.isCapacitor()?c.Light:"light";this.impact({style:s})},selectionStart(){const s=this.getEngine();s&&(this.isCapacitor()?s.selectionStart():s.gestureSelectionStart())},selectionChanged(){const s=this.getEngine();s&&(this.isCapacitor()?s.selectionChanged():s.gestureSelectionChanged())},selectionEnd(){const s=this.getEngine();s&&(this.isCapacitor()?s.selectionEnd():s.gestureSelectionEnd())}},t=()=>r.available(),i=()=>{t()&&r.selection()},o=()=>{t()&&r.selectionStart()},e=()=>{t()&&r.selectionChanged()},w=()=>{t()&&r.selectionEnd()},f=s=>{t()&&r.impact(s)}},98360:(L,m,n)=>{n.d(m,{I:()=>i,a:()=>f,b:()=>t,c:()=>E,d:()=>M,f:()=>s,g:()=>w,i:()=>e,p:()=>p,r:()=>y,s:()=>a});var v=n(15861),c=n(50839),l=n(66710);const t="ion-content",i=".ion-content-scroll-host",o=`${t}, ${i}`,e=u=>"ION-CONTENT"===u.tagName,w=function(){var u=(0,v.Z)(function*(g){return e(g)?(yield new Promise(h=>(0,c.c)(g,h)),g.getScrollElement()):g});return function(h){return u.apply(this,arguments)}}(),f=u=>u.querySelector(i)||u.querySelector(o),s=u=>u.closest(o),a=(u,g)=>e(u)?u.scrollToTop(g):Promise.resolve(u.scrollTo({top:0,left:0,behavior:g>0?"smooth":"auto"})),E=(u,g,h,O)=>e(u)?u.scrollByPoint(g,h,O):Promise.resolve(u.scrollBy({top:h,left:g,behavior:O>0?"smooth":"auto"})),p=u=>(0,l.b)(u,t),M=u=>{if(e(u)){const h=u.scrollY;return u.scrollY=!1,h}return u.style.setProperty("overflow","hidden"),!0},y=(u,g)=>{e(u)?u.scrollY=g:u.style.removeProperty("overflow")}},53173:(L,m,n)=>{n.d(m,{a:()=>v,b:()=>E,c:()=>o,d:()=>p,e:()=>D,f:()=>i,g:()=>M,h:()=>l,i:()=>c,j:()=>O,k:()=>C,l:()=>e,m:()=>s,n:()=>y,o:()=>f,p:()=>t,q:()=>r,r:()=>h,s:()=>d,t:()=>a,u:()=>u,v:()=>g,w:()=>w});const v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",D="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},82894:(L,m,n)=>{n.d(m,{c:()=>r,g:()=>t});var v=n(56225),c=n(50839),l=n(66710);const r=(o,e,w)=>{let f,s;void 0!==v.w&&"MutationObserver"in v.w&&(f=new MutationObserver(M=>{for(const y of M)for(const u of y.addedNodes)if(u.nodeType===Node.ELEMENT_NODE&&u.slot===e)return w(),void(0,c.r)(()=>a(u))}),f.observe(o,{childList:!0}));const a=M=>{var y;s&&(s.disconnect(),s=void 0),s=new MutationObserver(u=>{w();for(const g of u)for(const h of g.removedNodes)h.nodeType===Node.ELEMENT_NODE&&h.slot===e&&p()}),s.observe(null!==(y=M.parentElement)&&void 0!==y?y:M,{subtree:!0,childList:!0})},p=()=>{s&&(s.disconnect(),s=void 0)};return{destroy:()=>{f&&(f.disconnect(),f=void 0),p()}}},t=(o,e,w)=>{const f=null==o?0:o.toString().length,s=i(f,e);if(void 0===w)return s;try{return w(f,e)}catch(a){return(0,l.a)("Exception in provided `counterFormatter`.",a),s}},i=(o,e)=>`${o} / ${e}`},67484:(L,m,n)=>{n.d(m,{K:()=>r,a:()=>l});var v=n(84874),c=function(t){return t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE",t}(c||{}),l=function(t){return t.Body="body",t.Ionic="ionic",t.Native="native",t.None="none",t}(l||{});const r={getEngine(){const t=(0,v.g)();if(t?.isPluginAvailable("Keyboard"))return t.Plugins.Keyboard},getResizeMode(){const t=this.getEngine();return t?.getResizeMode?t.getResizeMode().catch(i=>{if(i.code!==c.Unimplemented)throw i}):Promise.resolve(void 0)}}},11612:(L,m,n)=>{n.r(m),n.d(m,{KEYBOARD_DID_CLOSE:()=>t,KEYBOARD_DID_OPEN:()=>r,copyVisualViewport:()=>C,keyboardDidClose:()=>u,keyboardDidOpen:()=>M,keyboardDidResize:()=>y,resetKeyboardAssist:()=>f,setKeyboardClose:()=>p,setKeyboardOpen:()=>E,startKeyboardAssist:()=>s,trackViewportChanges:()=>O});var v=n(67484);n(84874),n(56225);const r="ionKeyboardDidShow",t="ionKeyboardDidHide";let o={},e={},w=!1;const f=()=>{o={},e={},w=!1},s=d=>{if(v.K.getEngine())a(d);else{if(!d.visualViewport)return;e=C(d.visualViewport),d.visualViewport.onresize=()=>{O(d),M()||y(d)?E(d):u(d)&&p(d)}}},a=d=>{d.addEventListener("keyboardDidShow",D=>E(d,D)),d.addEventListener("keyboardDidHide",()=>p(d))},E=(d,D)=>{g(d,D),w=!0},p=d=>{h(d),w=!1},M=()=>!w&&o.width===e.width&&(o.height-e.height)*e.scale>150,y=d=>w&&!u(d),u=d=>w&&e.height===d.innerHeight,g=(d,D)=>{const S=new CustomEvent(r,{detail:{keyboardHeight:D?D.keyboardHeight:d.innerHeight-e.height}});d.dispatchEvent(S)},h=d=>{const D=new CustomEvent(t);d.dispatchEvent(D)},O=d=>{o=Object.assign({},e),e=C(d.visualViewport)},C=d=>({width:Math.round(d.width),height:Math.round(d.height),offsetTop:d.offsetTop,offsetLeft:d.offsetLeft,pageTop:d.pageTop,pageLeft:d.pageLeft,scale:d.scale})},33459:(L,m,n)=>{n.d(m,{c:()=>i});var v=n(15861),c=n(56225),l=n(67484);const r=o=>void 0===c.d||o===l.a.None||void 0===o?null:c.d.querySelector("ion-app")??c.d.body,t=o=>{const e=r(o);return null===e?0:e.clientHeight},i=function(){var o=(0,v.Z)(function*(e){let w,f,s,a;const E=function(){var g=(0,v.Z)(function*(){const h=yield l.K.getResizeMode(),O=void 0===h?void 0:h.mode;w=()=>{void 0===a&&(a=t(O)),s=!0,p(s,O)},f=()=>{s=!1,p(s,O)},null==c.w||c.w.addEventListener("keyboardWillShow",w),null==c.w||c.w.addEventListener("keyboardWillHide",f)});return function(){return g.apply(this,arguments)}}(),p=(g,h)=>{e&&e(g,M(h))},M=g=>{if(0===a||a===t(g))return;const h=r(g);return null!==h?new Promise(O=>{const d=new ResizeObserver(()=>{h.clientHeight===a&&(d.disconnect(),O())});d.observe(h)}):void 0};return yield E(),{init:E,destroy:()=>{null==c.w||c.w.removeEventListener("keyboardWillShow",w),null==c.w||c.w.removeEventListener("keyboardWillHide",f),w=f=void 0},isKeyboardVisible:()=>s}});return function(w){return o.apply(this,arguments)}}()},73830:(L,m,n)=>{n.d(m,{c:()=>c});var v=n(15861);const c=()=>{let l;return{lock:function(){var t=(0,v.Z)(function*(){const i=l;let o;return l=new Promise(e=>o=e),void 0!==i&&(yield i),o});return function(){return t.apply(this,arguments)}}()}}},90679:(L,m,n)=>{n.d(m,{c:()=>l});var v=n(56225),c=n(50839);const l=(r,t,i)=>{let o;const e=()=>!(void 0===t()||void 0!==r.label||null===i()),f=()=>{const a=t();if(void 0===a)return;if(!e())return void a.style.removeProperty("width");const E=i().scrollWidth;if(0===E&&null===a.offsetParent&&void 0!==v.w&&"IntersectionObserver"in v.w){if(void 0!==o)return;const p=o=new IntersectionObserver(M=>{1===M[0].intersectionRatio&&(f(),p.disconnect(),o=void 0)},{threshold:.01,root:r});p.observe(a)}else a.style.setProperty("width",.75*E+"px")};return{calculateNotchWidth:()=>{e()&&(0,c.r)(()=>{f()})},destroy:()=>{o&&(o.disconnect(),o=void 0)}}}},23781:(L,m,n)=>{n.d(m,{S:()=>c});const c={bubbles:{dur:1e3,circles:9,fn:(l,r,t)=>{const i=l*r/t-l+"ms",o=2*Math.PI*r/t;return{r:5,style:{top:32*Math.sin(o)+"%",left:32*Math.cos(o)+"%","animation-delay":i}}}},circles:{dur:1e3,circles:8,fn:(l,r,t)=>{const i=r/t,o=l*i-l+"ms",e=2*Math.PI*i;return{r:5,style:{top:32*Math.sin(e)+"%",left:32*Math.cos(e)+"%","animation-delay":o}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(l,r)=>({r:6,style:{left:32-32*r+"%","animation-delay":-110*r+"ms"}})},lines:{dur:1e3,lines:8,fn:(l,r,t)=>({y1:14,y2:26,style:{transform:`rotate(${360/t*r+(r<t/2?180:-180)}deg)`,"animation-delay":l*r/t-l+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(l,r,t)=>({y1:12,y2:20,style:{transform:`rotate(${360/t*r+(r<t/2?180:-180)}deg)`,"animation-delay":l*r/t-l+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(l,r,t)=>({y1:17,y2:29,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":l*r/t-l+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(l,r,t)=>({y1:12,y2:20,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":l*r/t-l+"ms"}})}}},88466:(L,m,n)=>{n.r(m),n.d(m,{createSwipeBackGesture:()=>t});var v=n(50839),c=n(95085),l=n(79203);n(20619);const t=(i,o,e,w,f)=>{const s=i.ownerDocument.defaultView;let a=(0,c.i)(i);const p=h=>a?-h.deltaX:h.deltaX;return(0,l.createGesture)({el:i,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:h=>(a=(0,c.i)(i),(h=>{const{startX:C}=h;return a?C>=s.innerWidth-50:C<=50})(h)&&o()),onStart:e,onMove:h=>{const C=p(h)/s.innerWidth;w(C)},onEnd:h=>{const O=p(h),C=s.innerWidth,d=O/C,D=(h=>a?-h.velocityX:h.velocityX)(h),S=D>=0&&(D>.2||O>C/2),x=(S?1-d:d)*C;let A=0;if(x>5){const I=x/Math.abs(D);A=Math.min(I,540)}f(S,d<=0?.01:(0,v.l)(0,d,.9999),A)}})}},47063:(L,m,n)=>{n.d(m,{w:()=>v});const v=(r,t,i)=>{if(typeof MutationObserver>"u")return;const o=new MutationObserver(e=>{i(c(e,t))});return o.observe(r,{childList:!0,subtree:!0}),o},c=(r,t)=>{let i;return r.forEach(o=>{for(let e=0;e<o.addedNodes.length;e++)i=l(o.addedNodes[e],t)||i}),i},l=(r,t)=>1!==r.nodeType?void 0:(r.tagName===t.toUpperCase()?[r]:Array.from(r.querySelectorAll(t))).find(o=>o.value===r.value)},75771:(L,m,n)=>{n.d(m,{v:()=>r});var v=n(96814),c=n(89780),l=n(19212);let r=(()=>{var t;class i{}return(t=i).\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[v.ez,c.J_B]}),i})()},44538:(L,m,n)=>{n.r(m),n.d(m,{ShowcaseModule:()=>Ln});var v=n(96814),c=n(60095),l=n(78406),r=n(50029),t=n(89780),i=n(16585),o=n(75771),e=n(96901),w=n(75440),sn=(n(20552),n(18163),n(89527),n(45562),n(96712),n(62594),n(18347),n(45782),n(77030),n(63619),n(55431),n(32903),n(3344),n(81678),n(25748),n(64564),n(535),n(84957),n(12189),n(87545),n(69870),n(67440),n(5194),n(90311),n(66001),n(35160),n(57168),n(71483),n(96949),n(22401),n(25906),n(73633),n(74659),n(3693),n(96698),n(90408),n(70738),n(40373),n(33278),n(40896),n(95942)),N=n(19212);let rn=(()=>{var P;class B{}return(P=B).\u0275fac=function(_){return new(_||P)},P.\u0275mod=N.oAB({type:P}),P.\u0275inj=N.cJS({imports:[l.Bz.forChild(sn._),l.Bz]}),B})();n(37618),n(5448),n(81786),n(13756),n(48376),n(11899),n(22546),n(50710),n(77227),n(60280),n(26011),n(84694),n(63274),n(64463),n(82192),n(92110),n(78176);const Cn=[w.Y,rn];n(95632);let Ln=(()=>{var P;class B{}return(P=B).\u0275fac=function(_){return new(_||P)},P.\u0275mod=N.oAB({type:P}),P.\u0275inj=N.cJS({imports:[Cn,v.ez,c.u5,r.Pc,t.J_B.forChild({moduleRootRoutePath:"/home/showcase"}),i.a,o.v,l.Bz,e.Q]}),B})()}}]);