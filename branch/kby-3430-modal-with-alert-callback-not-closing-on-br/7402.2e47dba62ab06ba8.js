"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[7402],{57402:(q,p,g)=>{g.r(p),g.d(p,{startInputShims:()=>Z});var L=g(74523),l=g(84878),T=g(67849),m=g(1656),R=g(85680);const M=new WeakMap,P=(e,t,s,o=0,r=!1)=>{M.has(e)!==s&&(s?j(e,t,o,r):G(e,t))},j=(e,t,s,o=!1)=>{const r=t.parentNode,n=t.cloneNode(!1);n.classList.add("cloned-input"),n.tabIndex=-1,o&&(n.disabled=!0),r.appendChild(n),M.set(e,n);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${a}px,${s}px,0) scale(0)`},G=(e,t)=>{const s=M.get(e);s&&(M.delete(e),s.remove()),e.style.pointerEvents="",t.style.transform=""},C="input, textarea, [no-blur], [contenteditable]",N="$ionPaddingTimer",B=(e,t,s)=>{const o=e[N];o&&clearTimeout(o),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[N]=setTimeout(()=>{e.style.setProperty("--keyboard-offset","0px"),s&&s()},120)},F=(e,t,s)=>{e.addEventListener("focusout",()=>{t&&B(t,0,s)},{once:!0})};let b=0;const x="data-ionic-skip-scroll-assist",V=(e,t,s,o,r,n,i,a=!1)=>{const S=n&&(void 0===i||i.mode===R.a.None);let y=!1;const u=void 0!==l.w?l.w.innerHeight:0,f=_=>{!1!==y?U(e,t,s,o,_.detail.keyboardHeight,S,a,u,!1):y=!0},c=()=>{y=!1,null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",c,!0)},h=function(){var _=(0,L.A)(function*(){t.hasAttribute(x)?t.removeAttribute(x):(U(e,t,s,o,r,S,a,u),null==l.w||l.w.addEventListener("ionKeyboardDidShow",f),e.addEventListener("focusout",c,!0))});return function(){return _.apply(this,arguments)}}();return e.addEventListener("focusin",h,!0),()=>{e.removeEventListener("focusin",h,!0),null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",c,!0)}},K=e=>{document.activeElement!==e&&(e.setAttribute(x,"true"),e.focus())},U=function(){var e=(0,L.A)(function*(t,s,o,r,n,i,a=!1,S=0,y=!0){if(!o&&!r)return;const u=((e,t,s,o)=>{var r;return((e,t,s,o)=>{const r=e.top,n=e.bottom,i=t.top,S=i+15,u=Math.min(t.bottom,o-s)-50-n,f=S-r,c=Math.round(u<0?-u:f>0?-f:0),h=Math.min(c,r-i),w=Math.abs(h)/.3;return{scrollAmount:h,scrollDuration:Math.min(400,Math.max(150,w)),scrollPadding:s,inputSafeY:4-(r-S)}})((null!==(r=e.closest("ion-item,[ion-item]"))&&void 0!==r?r:e).getBoundingClientRect(),t.getBoundingClientRect(),s,o)})(t,o||r,n,S);if(o&&Math.abs(u.scrollAmount)<4)return K(s),void(i&&null!==o&&(B(o,b),F(s,o,()=>b=0)));if(P(t,s,!0,u.inputSafeY,a),K(s),(0,m.r)(()=>t.click()),i&&o&&(b=u.scrollPadding,B(o,b)),typeof window<"u"){let f;const c=function(){var _=(0,L.A)(function*(){void 0!==f&&clearTimeout(f),window.removeEventListener("ionKeyboardDidShow",h),window.removeEventListener("ionKeyboardDidShow",c),o&&(yield(0,T.c)(o,0,u.scrollAmount,u.scrollDuration)),P(t,s,!1,u.inputSafeY),K(s),i&&F(s,o,()=>b=0)});return function(){return _.apply(this,arguments)}}(),h=()=>{window.removeEventListener("ionKeyboardDidShow",h),window.addEventListener("ionKeyboardDidShow",c)};if(o){const _=yield(0,T.g)(o);if(y&&u.scrollAmount>_.scrollHeight-_.clientHeight-_.scrollTop)return"password"===s.type?(u.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",h)):window.addEventListener("ionKeyboardDidShow",c),void(f=setTimeout(c,1e3))}c()}});return function(s,o,r,n,i,a){return e.apply(this,arguments)}}(),Z=function(){var e=(0,L.A)(function*(t,s){if(void 0===l.d)return;const o="ios"===s,r="android"===s,n=t.getNumber("keyboardHeight",290),i=t.getBoolean("scrollAssist",!0),a=t.getBoolean("hideCaretOnScroll",o),S=t.getBoolean("inputBlurring",o),y=t.getBoolean("scrollPadding",!0),u=Array.from(l.d.querySelectorAll("ion-input, ion-textarea")),f=new WeakMap,c=new WeakMap,h=yield R.K.getResizeMode(),_=function(){var v=(0,L.A)(function*(d){yield new Promise(I=>(0,m.c)(d,I));const O=d.shadowRoot||d,A=O.querySelector("input")||O.querySelector("textarea"),D=(0,T.a)(d),H=D?null:d.closest("ion-footer");if(A){if(D&&a&&!f.has(d)){const I=((e,t,s)=>{if(!s||!t)return()=>{};const o=a=>{(e=>e===e.getRootNode().activeElement)(t)&&P(e,t,a)},r=()=>P(e,t,!1),n=()=>o(!0),i=()=>o(!1);return(0,m.a)(s,"ionScrollStart",n),(0,m.a)(s,"ionScrollEnd",i),t.addEventListener("blur",r),()=>{(0,m.b)(s,"ionScrollStart",n),(0,m.b)(s,"ionScrollEnd",i),t.removeEventListener("blur",r)}})(d,A,D);f.set(d,I)}if("date"!==A.type&&"datetime-local"!==A.type&&(D||H)&&i&&!c.has(d)){const I=V(d,A,D,H,n,y,h,r);c.set(d,I)}}});return function(O){return v.apply(this,arguments)}}();S&&(()=>{let e=!0,t=!1;const s=document;(0,m.a)(s,"ionScrollStart",()=>{t=!0}),s.addEventListener("focusin",()=>{e=!0},!0),s.addEventListener("touchend",i=>{if(t)return void(t=!1);const a=s.activeElement;if(!a||a.matches(C))return;const S=i.target;S!==a&&(S.matches(C)||S.closest(C)||(e=!1,setTimeout(()=>{e||a.blur()},50)))},!1)})();for(const v of u)_(v);l.d.addEventListener("ionInputDidLoad",v=>{_(v.detail)}),l.d.addEventListener("ionInputDidUnload",v=>{(v=>{if(a){const d=f.get(v);d&&d(),f.delete(v)}if(i){const d=c.get(v);d&&d(),c.delete(v)}})(v.detail)})});return function(s,o){return e.apply(this,arguments)}}()}}]);