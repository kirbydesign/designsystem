"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[7419],{47419:(y,h,p)=>{p.r(h),p.d(h,{startTapClick:()=>M});var i=p(81848),u=p(26216);const M=o=>{if(void 0===i.d)return;let e,E,c,s=10*-v,r=0;const O=o.getBoolean("animated",!0)&&o.getBoolean("rippleEffect",!0),l=new WeakMap,L=t=>{s=(0,u.u)(t),R(t)},A=()=>{c&&clearTimeout(c),c=void 0,e&&(k(!1),e=void 0)},D=t=>{e||w(S(t),t)},R=t=>{w(void 0,t)},w=(t,n)=>{if(t&&t===e)return;c&&clearTimeout(c),c=void 0;const{x:d,y:a}=(0,u.v)(n);if(e){if(l.has(e))throw new Error("internal error");e.classList.contains(f)||C(e,d,a),k(!0)}if(t){const _=l.get(t);_&&(clearTimeout(_),l.delete(t)),t.classList.remove(f);const I=()=>{C(t,d,a),c=void 0};T(t)?I():c=setTimeout(I,P)}e=t},C=(t,n,d)=>{if(r=Date.now(),t.classList.add(f),!O)return;const a=g(t);null!==a&&(b(),E=a.addRipple(n,d))},b=()=>{void 0!==E&&(E.then(t=>t()),E=void 0)},k=t=>{b();const n=e;if(!n)return;const d=m-Date.now()+r;if(t&&d>0&&!T(n)){const a=setTimeout(()=>{n.classList.remove(f),l.delete(n)},m);l.set(n,a)}else n.classList.remove(f)};i.d.addEventListener("ionGestureCaptured",A),i.d.addEventListener("touchstart",t=>{s=(0,u.u)(t),D(t)},!0),i.d.addEventListener("touchcancel",L,!0),i.d.addEventListener("touchend",L,!0),i.d.addEventListener("pointercancel",A,!0),i.d.addEventListener("mousedown",t=>{if(2===t.button)return;const n=(0,u.u)(t)-v;s<n&&D(t)},!0),i.d.addEventListener("mouseup",t=>{const n=(0,u.u)(t)-v;s<n&&R(t)},!0)},S=o=>{if(void 0===o.composedPath)return o.target.closest(".ion-activatable");{const s=o.composedPath();for(let r=0;r<s.length-2;r++){const e=s[r];if(!(e instanceof ShadowRoot)&&e.classList.contains("ion-activatable"))return e}}},T=o=>o.classList.contains("ion-activatable-instant"),g=o=>{if(o.shadowRoot){const s=o.shadowRoot.querySelector("ion-ripple-effect");if(s)return s}return o.querySelector("ion-ripple-effect")},f="ion-activated",P=100,m=150,v=2500}}]);