"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[7338],{97338:(_,p,u)=>{u.r(p),u.d(p,{startTapClick:()=>k});var d=u(84878),C=u(1656);const k=n=>{if(void 0===d.d)return;let t,s,a,o=0;const I=n.getBoolean("animated",!0)&&n.getBoolean("rippleEffect",!0),l=new WeakMap,m=()=>{a&&clearTimeout(a),a=void 0,t&&(h(!1),t=void 0)},T=(e,i)=>{if(e&&e===t)return;a&&clearTimeout(a),a=void 0;const{x:r,y:c}=(0,C.p)(i);if(t){if(l.has(t))throw new Error("internal error");t.classList.contains(f)||A(t,r,c),h(!0)}if(e){const L=l.get(e);L&&(clearTimeout(L),l.delete(e)),e.classList.remove(f);const R=()=>{A(e,r,c),a=void 0};E(e)?R():a=setTimeout(R,g)}t=e},A=(e,i,r)=>{if(o=Date.now(),e.classList.add(f),!I)return;const c=b(e);null!==c&&(D(),s=c.addRipple(i,r))},D=()=>{void 0!==s&&(s.then(e=>e()),s=void 0)},h=e=>{D();const i=t;if(!i)return;const r=v-Date.now()+o;if(e&&r>0&&!E(i)){const c=setTimeout(()=>{i.classList.remove(f),l.delete(i)},v);l.set(i,c)}else i.classList.remove(f)};d.d.addEventListener("ionGestureCaptured",m),d.d.addEventListener("pointerdown",e=>{t||2===e.button||T(w(e),e)},!0),d.d.addEventListener("pointerup",e=>{T(void 0,e)},!0),d.d.addEventListener("pointercancel",m,!0)},w=n=>{if(void 0===n.composedPath)return n.target.closest(".ion-activatable");{const o=n.composedPath();for(let t=0;t<o.length-2;t++){const s=o[t];if(!(s instanceof ShadowRoot)&&s.classList.contains("ion-activatable"))return s}}},E=n=>n.classList.contains("ion-activatable-instant"),b=n=>{if(n.shadowRoot){const o=n.shadowRoot.querySelector("ion-ripple-effect");if(o)return o}return n.querySelector("ion-ripple-effect")},f="ion-activated",g=100,v=150}}]);