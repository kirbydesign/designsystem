"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[6429],{13489:(ce,Ee,de)=>{de(48332)},48332:()=>{!function(e){const n=e.performance;function s(A){n&&n.mark&&n.mark(A)}function r(A,d){n&&n.measure&&n.measure(A,d)}s("Zone");const i=e.__Zone_symbol_prefix||"__zone_symbol__";function l(A){return i+A}const p=!0===e[l("forceDuplicateZoneCheck")];if(e.Zone){if(p||"function"!=typeof e.Zone.__symbol__)throw new Error("Zone already loaded.");return e.Zone}let E=(()=>{class d{static assertZonePatched(){if(e.Promise!==se.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let t=d.current;for(;t.parent;)t=t.parent;return t}static get current(){return W.zone}static get currentTask(){return oe}static __load_patch(t,_,w=!1){if(se.hasOwnProperty(t)){if(!w&&p)throw Error("Already loaded patch: "+t)}else if(!e["__Zone_disable_"+t]){const L="Zone:"+t;s(L),se[t]=_(e,d,Y),r(L,L)}}get parent(){return this._parent}get name(){return this._name}constructor(t,_){this._parent=t,this._name=_?_.name||"unnamed":"<root>",this._properties=_&&_.properties||{},this._zoneDelegate=new v(this,this._parent&&this._parent._zoneDelegate,_)}get(t){const _=this.getZoneWith(t);if(_)return _._properties[t]}getZoneWith(t){let _=this;for(;_;){if(_._properties.hasOwnProperty(t))return _;_=_._parent}return null}fork(t){if(!t)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,t)}wrap(t,_){if("function"!=typeof t)throw new Error("Expecting function got: "+t);const w=this._zoneDelegate.intercept(this,t,_),L=this;return function(){return L.runGuarded(w,this,arguments,_)}}run(t,_,w,L){W={parent:W,zone:this};try{return this._zoneDelegate.invoke(this,t,_,w,L)}finally{W=W.parent}}runGuarded(t,_=null,w,L){W={parent:W,zone:this};try{try{return this._zoneDelegate.invoke(this,t,_,w,L)}catch(a){if(this._zoneDelegate.handleError(this,a))throw a}}finally{W=W.parent}}runTask(t,_,w){if(t.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(t.zone||K).name+"; Execution: "+this.name+")");if(t.state===G&&(t.type===Q||t.type===P))return;const L=t.state!=y;L&&t._transitionTo(y,j),t.runCount++;const a=oe;oe=t,W={parent:W,zone:this};try{t.type==P&&t.data&&!t.data.isPeriodic&&(t.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,t,_,w)}catch(u){if(this._zoneDelegate.handleError(this,u))throw u}}finally{t.state!==G&&t.state!==h&&(t.type==Q||t.data&&t.data.isPeriodic?L&&t._transitionTo(j,y):(t.runCount=0,this._updateTaskCount(t,-1),L&&t._transitionTo(G,y,G))),W=W.parent,oe=a}}scheduleTask(t){if(t.zone&&t.zone!==this){let w=this;for(;w;){if(w===t.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${t.zone.name}`);w=w.parent}}t._transitionTo(X,G);const _=[];t._zoneDelegates=_,t._zone=this;try{t=this._zoneDelegate.scheduleTask(this,t)}catch(w){throw t._transitionTo(h,X,G),this._zoneDelegate.handleError(this,w),w}return t._zoneDelegates===_&&this._updateTaskCount(t,1),t.state==X&&t._transitionTo(j,X),t}scheduleMicroTask(t,_,w,L){return this.scheduleTask(new g(I,t,_,w,L,void 0))}scheduleMacroTask(t,_,w,L,a){return this.scheduleTask(new g(P,t,_,w,L,a))}scheduleEventTask(t,_,w,L,a){return this.scheduleTask(new g(Q,t,_,w,L,a))}cancelTask(t){if(t.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(t.zone||K).name+"; Execution: "+this.name+")");if(t.state===j||t.state===y){t._transitionTo(V,j,y);try{this._zoneDelegate.cancelTask(this,t)}catch(_){throw t._transitionTo(h,V),this._zoneDelegate.handleError(this,_),_}return this._updateTaskCount(t,-1),t._transitionTo(G,V),t.runCount=0,t}}_updateTaskCount(t,_){const w=t._zoneDelegates;-1==_&&(t._zoneDelegates=null);for(let L=0;L<w.length;L++)w[L]._updateTaskCount(t.type,_)}}return d.__symbol__=l,d})();const b={name:"",onHasTask:(A,d,c,t)=>A.hasTask(c,t),onScheduleTask:(A,d,c,t)=>A.scheduleTask(c,t),onInvokeTask:(A,d,c,t,_,w)=>A.invokeTask(c,t,_,w),onCancelTask:(A,d,c,t)=>A.cancelTask(c,t)};class v{constructor(d,c,t){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=d,this._parentDelegate=c,this._forkZS=t&&(t&&t.onFork?t:c._forkZS),this._forkDlgt=t&&(t.onFork?c:c._forkDlgt),this._forkCurrZone=t&&(t.onFork?this.zone:c._forkCurrZone),this._interceptZS=t&&(t.onIntercept?t:c._interceptZS),this._interceptDlgt=t&&(t.onIntercept?c:c._interceptDlgt),this._interceptCurrZone=t&&(t.onIntercept?this.zone:c._interceptCurrZone),this._invokeZS=t&&(t.onInvoke?t:c._invokeZS),this._invokeDlgt=t&&(t.onInvoke?c:c._invokeDlgt),this._invokeCurrZone=t&&(t.onInvoke?this.zone:c._invokeCurrZone),this._handleErrorZS=t&&(t.onHandleError?t:c._handleErrorZS),this._handleErrorDlgt=t&&(t.onHandleError?c:c._handleErrorDlgt),this._handleErrorCurrZone=t&&(t.onHandleError?this.zone:c._handleErrorCurrZone),this._scheduleTaskZS=t&&(t.onScheduleTask?t:c._scheduleTaskZS),this._scheduleTaskDlgt=t&&(t.onScheduleTask?c:c._scheduleTaskDlgt),this._scheduleTaskCurrZone=t&&(t.onScheduleTask?this.zone:c._scheduleTaskCurrZone),this._invokeTaskZS=t&&(t.onInvokeTask?t:c._invokeTaskZS),this._invokeTaskDlgt=t&&(t.onInvokeTask?c:c._invokeTaskDlgt),this._invokeTaskCurrZone=t&&(t.onInvokeTask?this.zone:c._invokeTaskCurrZone),this._cancelTaskZS=t&&(t.onCancelTask?t:c._cancelTaskZS),this._cancelTaskDlgt=t&&(t.onCancelTask?c:c._cancelTaskDlgt),this._cancelTaskCurrZone=t&&(t.onCancelTask?this.zone:c._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const _=t&&t.onHasTask;(_||c&&c._hasTaskZS)&&(this._hasTaskZS=_?t:b,this._hasTaskDlgt=c,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=d,t.onScheduleTask||(this._scheduleTaskZS=b,this._scheduleTaskDlgt=c,this._scheduleTaskCurrZone=this.zone),t.onInvokeTask||(this._invokeTaskZS=b,this._invokeTaskDlgt=c,this._invokeTaskCurrZone=this.zone),t.onCancelTask||(this._cancelTaskZS=b,this._cancelTaskDlgt=c,this._cancelTaskCurrZone=this.zone))}fork(d,c){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,d,c):new E(d,c)}intercept(d,c,t){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,d,c,t):c}invoke(d,c,t,_,w){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,d,c,t,_,w):c.apply(t,_)}handleError(d,c){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,d,c)}scheduleTask(d,c){let t=c;if(this._scheduleTaskZS)this._hasTaskZS&&t._zoneDelegates.push(this._hasTaskDlgtOwner),t=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,d,c),t||(t=c);else if(c.scheduleFn)c.scheduleFn(c);else{if(c.type!=I)throw new Error("Task is missing scheduleFn.");C(c)}return t}invokeTask(d,c,t,_){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,d,c,t,_):c.callback.apply(t,_)}cancelTask(d,c){let t;if(this._cancelTaskZS)t=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,d,c);else{if(!c.cancelFn)throw Error("Task is not cancelable");t=c.cancelFn(c)}return t}hasTask(d,c){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,d,c)}catch(t){this.handleError(d,t)}}_updateTaskCount(d,c){const t=this._taskCounts,_=t[d],w=t[d]=_+c;if(w<0)throw new Error("More tasks executed then were scheduled.");0!=_&&0!=w||this.hasTask(this.zone,{microTask:t.microTask>0,macroTask:t.macroTask>0,eventTask:t.eventTask>0,change:d})}}class g{constructor(d,c,t,_,w,L){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=d,this.source=c,this.data=_,this.scheduleFn=w,this.cancelFn=L,!t)throw new Error("callback is not defined");this.callback=t;const a=this;this.invoke=d===Q&&_&&_.useG?g.invokeTask:function(){return g.invokeTask.call(e,a,this,arguments)}}static invokeTask(d,c,t){d||(d=this),te++;try{return d.runCount++,d.zone.runTask(d,c,t)}finally{1==te&&T(),te--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(G,X)}_transitionTo(d,c,t){if(this._state!==c&&this._state!==t)throw new Error(`${this.type} '${this.source}': can not transition to '${d}', expecting state '${c}'${t?" or '"+t+"'":""}, was '${this._state}'.`);this._state=d,d==G&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const M=l("setTimeout"),Z=l("Promise"),N=l("then");let J,U=[],x=!1;function z(A){if(J||e[Z]&&(J=e[Z].resolve(0)),J){let d=J[N];d||(d=J.then),d.call(J,A)}else e[M](A,0)}function C(A){0===te&&0===U.length&&z(T),A&&U.push(A)}function T(){if(!x){for(x=!0;U.length;){const A=U;U=[];for(let d=0;d<A.length;d++){const c=A[d];try{c.zone.runTask(c,null,null)}catch(t){Y.onUnhandledError(t)}}}Y.microtaskDrainDone(),x=!1}}const K={name:"NO ZONE"},G="notScheduled",X="scheduling",j="scheduled",y="running",V="canceling",h="unknown",I="microTask",P="macroTask",Q="eventTask",se={},Y={symbol:l,currentZoneFrame:()=>W,onUnhandledError:q,microtaskDrainDone:q,scheduleMicroTask:C,showUncaughtError:()=>!E[l("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:q,patchMethod:()=>q,bindArguments:()=>[],patchThen:()=>q,patchMacroTask:()=>q,patchEventPrototype:()=>q,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>q,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>q,wrapWithCurrentZone:()=>q,filterProperties:()=>[],attachOriginToPatched:()=>q,_redefineProperty:()=>q,patchCallbacks:()=>q,nativeScheduleMicroTask:z};let W={parent:null,zone:new E(null,null)},oe=null,te=0;function q(){}r("Zone","Zone"),e.Zone=E}(globalThis);const ce=Object.getOwnPropertyDescriptor,Ee=Object.defineProperty,de=Object.getPrototypeOf,me=Object.create,Fe=Array.prototype.slice,Oe="addEventListener",Ze="removeEventListener",Ne=Zone.__symbol__(Oe),Ie=Zone.__symbol__(Ze),ae="true",le="false",ke=Zone.__symbol__("");function Me(e,n){return Zone.current.wrap(e,n)}function Le(e,n,s,r,i){return Zone.current.scheduleMacroTask(e,n,s,r,i)}const H=Zone.__symbol__,we=typeof window<"u",Te=we?window:void 0,$=we&&Te||globalThis,at="removeAttribute";function je(e,n){for(let s=e.length-1;s>=0;s--)"function"==typeof e[s]&&(e[s]=Me(e[s],n+"_"+s));return e}function Be(e){return!e||!1!==e.writable&&!("function"==typeof e.get&&typeof e.set>"u")}const Ue=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Re=!("nw"in $)&&typeof $.process<"u"&&"[object process]"==={}.toString.call($.process),Ae=!Re&&!Ue&&!(!we||!Te.HTMLElement),We=typeof $.process<"u"&&"[object process]"==={}.toString.call($.process)&&!Ue&&!(!we||!Te.HTMLElement),Ce={},qe=function(e){if(!(e=e||$.event))return;let n=Ce[e.type];n||(n=Ce[e.type]=H("ON_PROPERTY"+e.type));const s=this||e.target||$,r=s[n];let i;return Ae&&s===Te&&"error"===e.type?(i=r&&r.call(this,e.message,e.filename,e.lineno,e.colno,e.error),!0===i&&e.preventDefault()):(i=r&&r.apply(this,arguments),null!=i&&!i&&e.preventDefault()),i};function ze(e,n,s){let r=ce(e,n);if(!r&&s&&ce(s,n)&&(r={enumerable:!0,configurable:!0}),!r||!r.configurable)return;const i=H("on"+n+"patched");if(e.hasOwnProperty(i)&&e[i])return;delete r.writable,delete r.value;const l=r.get,p=r.set,E=n.slice(2);let b=Ce[E];b||(b=Ce[E]=H("ON_PROPERTY"+E)),r.set=function(v){let g=this;!g&&e===$&&(g=$),g&&("function"==typeof g[b]&&g.removeEventListener(E,qe),p&&p.call(g,null),g[b]=v,"function"==typeof v&&g.addEventListener(E,qe,!1))},r.get=function(){let v=this;if(!v&&e===$&&(v=$),!v)return null;const g=v[b];if(g)return g;if(l){let M=l.call(this);if(M)return r.set.call(this,M),"function"==typeof v[at]&&v.removeAttribute(n),M}return null},Ee(e,n,r),e[i]=!0}function Xe(e,n,s){if(n)for(let r=0;r<n.length;r++)ze(e,"on"+n[r],s);else{const r=[];for(const i in e)"on"==i.slice(0,2)&&r.push(i);for(let i=0;i<r.length;i++)ze(e,r[i],s)}}const re=H("originalInstance");function ve(e){const n=$[e];if(!n)return;$[H(e)]=n,$[e]=function(){const i=je(arguments,e);switch(i.length){case 0:this[re]=new n;break;case 1:this[re]=new n(i[0]);break;case 2:this[re]=new n(i[0],i[1]);break;case 3:this[re]=new n(i[0],i[1],i[2]);break;case 4:this[re]=new n(i[0],i[1],i[2],i[3]);break;default:throw new Error("Arg list too long.")}},fe($[e],n);const s=new n(function(){});let r;for(r in s)"XMLHttpRequest"===e&&"responseBlob"===r||function(i){"function"==typeof s[i]?$[e].prototype[i]=function(){return this[re][i].apply(this[re],arguments)}:Ee($[e].prototype,i,{set:function(l){"function"==typeof l?(this[re][i]=Me(l,e+"."+i),fe(this[re][i],l)):this[re][i]=l},get:function(){return this[re][i]}})}(r);for(r in n)"prototype"!==r&&n.hasOwnProperty(r)&&($[e][r]=n[r])}function ue(e,n,s){let r=e;for(;r&&!r.hasOwnProperty(n);)r=de(r);!r&&e[n]&&(r=e);const i=H(n);let l=null;if(r&&(!(l=r[i])||!r.hasOwnProperty(i))&&(l=r[i]=r[n],Be(r&&ce(r,n)))){const E=s(l,i,n);r[n]=function(){return E(this,arguments)},fe(r[n],l)}return l}function ut(e,n,s){let r=null;function i(l){const p=l.data;return p.args[p.cbIdx]=function(){l.invoke.apply(this,arguments)},r.apply(p.target,p.args),l}r=ue(e,n,l=>function(p,E){const b=s(p,E);return b.cbIdx>=0&&"function"==typeof E[b.cbIdx]?Le(b.name,E[b.cbIdx],b,i):l.apply(p,E)})}function fe(e,n){e[H("OriginalDelegate")]=n}let Ye=!1,He=!1;function ht(){if(Ye)return He;Ye=!0;try{const e=Te.navigator.userAgent;(-1!==e.indexOf("MSIE ")||-1!==e.indexOf("Trident/")||-1!==e.indexOf("Edge/"))&&(He=!0)}catch{}return He}Zone.__load_patch("ZoneAwarePromise",(e,n,s)=>{const r=Object.getOwnPropertyDescriptor,i=Object.defineProperty,p=s.symbol,E=[],b=!1!==e[p("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],v=p("Promise"),g=p("then"),M="__creationTrace__";s.onUnhandledError=a=>{if(s.showUncaughtError()){const u=a&&a.rejection;u?console.error("Unhandled Promise rejection:",u instanceof Error?u.message:u,"; Zone:",a.zone.name,"; Task:",a.task&&a.task.source,"; Value:",u,u instanceof Error?u.stack:void 0):console.error(a)}},s.microtaskDrainDone=()=>{for(;E.length;){const a=E.shift();try{a.zone.runGuarded(()=>{throw a.throwOriginal?a.rejection:a})}catch(u){N(u)}}};const Z=p("unhandledPromiseRejectionHandler");function N(a){s.onUnhandledError(a);try{const u=n[Z];"function"==typeof u&&u.call(this,a)}catch{}}function U(a){return a&&a.then}function x(a){return a}function J(a){return c.reject(a)}const z=p("state"),C=p("value"),T=p("finally"),K=p("parentPromiseValue"),G=p("parentPromiseState"),X="Promise.then",j=null,y=!0,V=!1,h=0;function I(a,u){return o=>{try{Y(a,u,o)}catch(f){Y(a,!1,f)}}}const P=function(){let a=!1;return function(o){return function(){a||(a=!0,o.apply(null,arguments))}}},Q="Promise resolved with itself",se=p("currentTaskTrace");function Y(a,u,o){const f=P();if(a===o)throw new TypeError(Q);if(a[z]===j){let k=null;try{("object"==typeof o||"function"==typeof o)&&(k=o&&o.then)}catch(R){return f(()=>{Y(a,!1,R)})(),a}if(u!==V&&o instanceof c&&o.hasOwnProperty(z)&&o.hasOwnProperty(C)&&o[z]!==j)oe(o),Y(a,o[z],o[C]);else if(u!==V&&"function"==typeof k)try{k.call(o,f(I(a,u)),f(I(a,!1)))}catch(R){f(()=>{Y(a,!1,R)})()}else{a[z]=u;const R=a[C];if(a[C]=o,a[T]===T&&u===y&&(a[z]=a[G],a[C]=a[K]),u===V&&o instanceof Error){const m=n.currentTask&&n.currentTask.data&&n.currentTask.data[M];m&&i(o,se,{configurable:!0,enumerable:!1,writable:!0,value:m})}for(let m=0;m<R.length;)te(a,R[m++],R[m++],R[m++],R[m++]);if(0==R.length&&u==V){a[z]=h;let m=o;try{throw new Error("Uncaught (in promise): "+function l(a){return a&&a.toString===Object.prototype.toString?(a.constructor&&a.constructor.name||"")+": "+JSON.stringify(a):a?a.toString():Object.prototype.toString.call(a)}(o)+(o&&o.stack?"\n"+o.stack:""))}catch(D){m=D}b&&(m.throwOriginal=!0),m.rejection=o,m.promise=a,m.zone=n.current,m.task=n.currentTask,E.push(m),s.scheduleMicroTask()}}}return a}const W=p("rejectionHandledHandler");function oe(a){if(a[z]===h){try{const u=n[W];u&&"function"==typeof u&&u.call(this,{rejection:a[C],promise:a})}catch{}a[z]=V;for(let u=0;u<E.length;u++)a===E[u].promise&&E.splice(u,1)}}function te(a,u,o,f,k){oe(a);const R=a[z],m=R?"function"==typeof f?f:x:"function"==typeof k?k:J;u.scheduleMicroTask(X,()=>{try{const D=a[C],S=!!o&&T===o[T];S&&(o[K]=D,o[G]=R);const O=u.run(m,void 0,S&&m!==J&&m!==x?[]:[D]);Y(o,!0,O)}catch(D){Y(o,!1,D)}},o)}const A=function(){},d=e.AggregateError;class c{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(u){return u instanceof c?u:Y(new this(null),y,u)}static reject(u){return Y(new this(null),V,u)}static withResolvers(){const u={};return u.promise=new c((o,f)=>{u.resolve=o,u.reject=f}),u}static any(u){if(!u||"function"!=typeof u[Symbol.iterator])return Promise.reject(new d([],"All promises were rejected"));const o=[];let f=0;try{for(let m of u)f++,o.push(c.resolve(m))}catch{return Promise.reject(new d([],"All promises were rejected"))}if(0===f)return Promise.reject(new d([],"All promises were rejected"));let k=!1;const R=[];return new c((m,D)=>{for(let S=0;S<o.length;S++)o[S].then(O=>{k||(k=!0,m(O))},O=>{R.push(O),f--,0===f&&(k=!0,D(new d(R,"All promises were rejected")))})})}static race(u){let o,f,k=new this((D,S)=>{o=D,f=S});function R(D){o(D)}function m(D){f(D)}for(let D of u)U(D)||(D=this.resolve(D)),D.then(R,m);return k}static all(u){return c.allWithCallback(u)}static allSettled(u){return(this&&this.prototype instanceof c?this:c).allWithCallback(u,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(u,o){let f,k,R=new this((O,F)=>{f=O,k=F}),m=2,D=0;const S=[];for(let O of u){U(O)||(O=this.resolve(O));const F=D;try{O.then(B=>{S[F]=o?o.thenCallback(B):B,m--,0===m&&f(S)},B=>{o?(S[F]=o.errorCallback(B),m--,0===m&&f(S)):k(B)})}catch(B){k(B)}m++,D++}return m-=2,0===m&&f(S),R}constructor(u){const o=this;if(!(o instanceof c))throw new Error("Must be an instanceof Promise.");o[z]=j,o[C]=[];try{const f=P();u&&u(f(I(o,y)),f(I(o,V)))}catch(f){Y(o,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return c}then(u,o){let f=this.constructor?.[Symbol.species];(!f||"function"!=typeof f)&&(f=this.constructor||c);const k=new f(A),R=n.current;return this[z]==j?this[C].push(R,k,u,o):te(this,R,k,u,o),k}catch(u){return this.then(null,u)}finally(u){let o=this.constructor?.[Symbol.species];(!o||"function"!=typeof o)&&(o=c);const f=new o(A);f[T]=T;const k=n.current;return this[z]==j?this[C].push(k,f,u,u):te(this,k,f,u,u),f}}c.resolve=c.resolve,c.reject=c.reject,c.race=c.race,c.all=c.all;const t=e[v]=e.Promise;e.Promise=c;const _=p("thenPatched");function w(a){const u=a.prototype,o=r(u,"then");if(o&&(!1===o.writable||!o.configurable))return;const f=u.then;u[g]=f,a.prototype.then=function(k,R){return new c((D,S)=>{f.call(this,D,S)}).then(k,R)},a[_]=!0}return s.patchThen=w,t&&(w(t),ue(e,"fetch",a=>function L(a){return function(u,o){let f=a.apply(u,o);if(f instanceof c)return f;let k=f.constructor;return k[_]||w(k),f}}(a))),Promise[n.__symbol__("uncaughtPromiseErrors")]=E,c}),Zone.__load_patch("toString",e=>{const n=Function.prototype.toString,s=H("OriginalDelegate"),r=H("Promise"),i=H("Error"),l=function(){if("function"==typeof this){const v=this[s];if(v)return"function"==typeof v?n.call(v):Object.prototype.toString.call(v);if(this===Promise){const g=e[r];if(g)return n.call(g)}if(this===Error){const g=e[i];if(g)return n.call(g)}}return n.call(this)};l[s]=n,Function.prototype.toString=l;const p=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":p.call(this)}});let ye=!1;if(typeof window<"u")try{const e=Object.defineProperty({},"passive",{get:function(){ye=!0}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch{ye=!1}const dt={useG:!0},ne={},$e={},Ke=new RegExp("^"+ke+"(\\w+)(true|false)$"),Je=H("propagationStopped");function Qe(e,n){const s=(n?n(e):e)+le,r=(n?n(e):e)+ae,i=ke+s,l=ke+r;ne[e]={},ne[e][le]=i,ne[e][ae]=l}function _t(e,n,s,r){const i=r&&r.add||Oe,l=r&&r.rm||Ze,p=r&&r.listeners||"eventListeners",E=r&&r.rmAll||"removeAllListeners",b=H(i),v="."+i+":",g="prependListener",M="."+g+":",Z=function(C,T,K){if(C.isRemoved)return;const G=C.callback;let X;"object"==typeof G&&G.handleEvent&&(C.callback=y=>G.handleEvent(y),C.originalDelegate=G);try{C.invoke(C,T,[K])}catch(y){X=y}const j=C.options;return j&&"object"==typeof j&&j.once&&T[l].call(T,K.type,C.originalDelegate?C.originalDelegate:C.callback,j),X};function N(C,T,K){if(!(T=T||e.event))return;const G=C||T.target||e,X=G[ne[T.type][K?ae:le]];if(X){const j=[];if(1===X.length){const y=Z(X[0],G,T);y&&j.push(y)}else{const y=X.slice();for(let V=0;V<y.length&&(!T||!0!==T[Je]);V++){const h=Z(y[V],G,T);h&&j.push(h)}}if(1===j.length)throw j[0];for(let y=0;y<j.length;y++){const V=j[y];n.nativeScheduleMicroTask(()=>{throw V})}}}const U=function(C){return N(this,C,!1)},x=function(C){return N(this,C,!0)};function J(C,T){if(!C)return!1;let K=!0;T&&void 0!==T.useG&&(K=T.useG);const G=T&&T.vh;let X=!0;T&&void 0!==T.chkDup&&(X=T.chkDup);let j=!1;T&&void 0!==T.rt&&(j=T.rt);let y=C;for(;y&&!y.hasOwnProperty(i);)y=de(y);if(!y&&C[i]&&(y=C),!y||y[b])return!1;const V=T&&T.eventNameToString,h={},I=y[b]=y[i],P=y[H(l)]=y[l],Q=y[H(p)]=y[p],se=y[H(E)]=y[E];let Y;T&&T.prepend&&(Y=y[H(T.prepend)]=y[T.prepend]);const c=K?function(o){if(!h.isExisting)return I.call(h.target,h.eventName,h.capture?x:U,h.options)}:function(o){return I.call(h.target,h.eventName,o.invoke,h.options)},t=K?function(o){if(!o.isRemoved){const f=ne[o.eventName];let k;f&&(k=f[o.capture?ae:le]);const R=k&&o.target[k];if(R)for(let m=0;m<R.length;m++)if(R[m]===o){R.splice(m,1),o.isRemoved=!0,0===R.length&&(o.allRemoved=!0,o.target[k]=null);break}}if(o.allRemoved)return P.call(o.target,o.eventName,o.capture?x:U,o.options)}:function(o){return P.call(o.target,o.eventName,o.invoke,o.options)},w=T&&T.diff?T.diff:function(o,f){const k=typeof f;return"function"===k&&o.callback===f||"object"===k&&o.originalDelegate===f},L=Zone[H("UNPATCHED_EVENTS")],a=e[H("PASSIVE_EVENTS")],u=function(o,f,k,R,m=!1,D=!1){return function(){const S=this||e;let O=arguments[0];T&&T.transferEventName&&(O=T.transferEventName(O));let F=arguments[1];if(!F)return o.apply(this,arguments);if(Re&&"uncaughtException"===O)return o.apply(this,arguments);let B=!1;if("function"!=typeof F){if(!F.handleEvent)return o.apply(this,arguments);B=!0}if(G&&!G(o,F,S,arguments))return;const he=ye&&!!a&&-1!==a.indexOf(O),ee=function W(o,f){return!ye&&"object"==typeof o&&o?!!o.capture:ye&&f?"boolean"==typeof o?{capture:o,passive:!0}:o?"object"==typeof o&&!1!==o.passive?{...o,passive:!0}:o:{passive:!0}:o}(arguments[2],he),be=ee&&"object"==typeof ee&&ee.signal&&"object"==typeof ee.signal?ee.signal:void 0;if(be?.aborted)return;if(L)for(let _e=0;_e<L.length;_e++)if(O===L[_e])return he?o.call(S,O,F,ee):o.apply(this,arguments);const Ge=!!ee&&("boolean"==typeof ee||ee.capture),rt=!(!ee||"object"!=typeof ee)&&ee.once,vt=Zone.current;let Ve=ne[O];Ve||(Qe(O,V),Ve=ne[O]);const ot=Ve[Ge?ae:le];let Se,ge=S[ot],st=!1;if(ge){if(st=!0,X)for(let _e=0;_e<ge.length;_e++)if(w(ge[_e],F))return}else ge=S[ot]=[];const it=S.constructor.name,ct=$e[it];ct&&(Se=ct[O]),Se||(Se=it+f+(V?V(O):O)),h.options=ee,rt&&(h.options.once=!1),h.target=S,h.capture=Ge,h.eventName=O,h.isExisting=st;const Pe=K?dt:void 0;Pe&&(Pe.taskData=h),be&&(h.options.signal=void 0);const ie=vt.scheduleEventTask(Se,F,Pe,k,R);return be&&(h.options.signal=be,o.call(be,"abort",()=>{ie.zone.cancelTask(ie)},{once:!0})),h.target=null,Pe&&(Pe.taskData=null),rt&&(ee.once=!0),!ye&&"boolean"==typeof ie.options||(ie.options=ee),ie.target=S,ie.capture=Ge,ie.eventName=O,B&&(ie.originalDelegate=F),D?ge.unshift(ie):ge.push(ie),m?S:void 0}};return y[i]=u(I,v,c,t,j),Y&&(y[g]=u(Y,M,function(o){return Y.call(h.target,h.eventName,o.invoke,h.options)},t,j,!0)),y[l]=function(){const o=this||e;let f=arguments[0];T&&T.transferEventName&&(f=T.transferEventName(f));const k=arguments[2],R=!!k&&("boolean"==typeof k||k.capture),m=arguments[1];if(!m)return P.apply(this,arguments);if(G&&!G(P,m,o,arguments))return;const D=ne[f];let S;D&&(S=D[R?ae:le]);const O=S&&o[S];if(O)for(let F=0;F<O.length;F++){const B=O[F];if(w(B,m))return O.splice(F,1),B.isRemoved=!0,0===O.length&&(B.allRemoved=!0,o[S]=null,"string"==typeof f)&&(o[ke+"ON_PROPERTY"+f]=null),B.zone.cancelTask(B),j?o:void 0}return P.apply(this,arguments)},y[p]=function(){const o=this||e;let f=arguments[0];T&&T.transferEventName&&(f=T.transferEventName(f));const k=[],R=et(o,V?V(f):f);for(let m=0;m<R.length;m++){const D=R[m];k.push(D.originalDelegate?D.originalDelegate:D.callback)}return k},y[E]=function(){const o=this||e;let f=arguments[0];if(f){T&&T.transferEventName&&(f=T.transferEventName(f));const k=ne[f];if(k){const D=o[k[le]],S=o[k[ae]];if(D){const O=D.slice();for(let F=0;F<O.length;F++){const B=O[F];this[l].call(this,f,B.originalDelegate?B.originalDelegate:B.callback,B.options)}}if(S){const O=S.slice();for(let F=0;F<O.length;F++){const B=O[F];this[l].call(this,f,B.originalDelegate?B.originalDelegate:B.callback,B.options)}}}}else{const k=Object.keys(o);for(let R=0;R<k.length;R++){const D=Ke.exec(k[R]);let S=D&&D[1];S&&"removeListener"!==S&&this[E].call(this,S)}this[E].call(this,"removeListener")}if(j)return this},fe(y[i],I),fe(y[l],P),se&&fe(y[E],se),Q&&fe(y[p],Q),!0}let z=[];for(let C=0;C<s.length;C++)z[C]=J(s[C],r);return z}function et(e,n){if(!n){const l=[];for(let p in e){const E=Ke.exec(p);let b=E&&E[1];if(b&&(!n||b===n)){const v=e[p];if(v)for(let g=0;g<v.length;g++)l.push(v[g])}}return l}let s=ne[n];s||(Qe(n),s=ne[n]);const r=e[s[le]],i=e[s[ae]];return r?i?r.concat(i):r.slice():i?i.slice():[]}function Et(e,n){const s=e.Event;s&&s.prototype&&n.patchMethod(s.prototype,"stopImmediatePropagation",r=>function(i,l){i[Je]=!0,r&&r.apply(i,l)})}function Tt(e,n,s,r,i){const l=Zone.__symbol__(r);if(n[l])return;const p=n[l]=n[r];n[r]=function(E,b,v){return b&&b.prototype&&i.forEach(function(g){const M=`${s}.${r}::`+g,Z=b.prototype;try{if(Z.hasOwnProperty(g)){const N=e.ObjectGetOwnPropertyDescriptor(Z,g);N&&N.value?(N.value=e.wrapWithCurrentZone(N.value,M),e._redefineProperty(b.prototype,g,N)):Z[g]&&(Z[g]=e.wrapWithCurrentZone(Z[g],M))}else Z[g]&&(Z[g]=e.wrapWithCurrentZone(Z[g],M))}catch{}}),p.call(n,E,b,v)},e.attachOriginToPatched(n[r],p)}function tt(e,n,s){if(!s||0===s.length)return n;const r=s.filter(l=>l.target===e);if(!r||0===r.length)return n;const i=r[0].ignoreProperties;return n.filter(l=>-1===i.indexOf(l))}function nt(e,n,s,r){e&&Xe(e,tt(e,n,s),r)}function xe(e){return Object.getOwnPropertyNames(e).filter(n=>n.startsWith("on")&&n.length>2).map(n=>n.substring(2))}Zone.__load_patch("util",(e,n,s)=>{const r=xe(e);s.patchOnProperties=Xe,s.patchMethod=ue,s.bindArguments=je,s.patchMacroTask=ut;const i=n.__symbol__("BLACK_LISTED_EVENTS"),l=n.__symbol__("UNPATCHED_EVENTS");e[l]&&(e[i]=e[l]),e[i]&&(n[i]=n[l]=e[i]),s.patchEventPrototype=Et,s.patchEventTarget=_t,s.isIEOrEdge=ht,s.ObjectDefineProperty=Ee,s.ObjectGetOwnPropertyDescriptor=ce,s.ObjectCreate=me,s.ArraySlice=Fe,s.patchClass=ve,s.wrapWithCurrentZone=Me,s.filterProperties=tt,s.attachOriginToPatched=fe,s._redefineProperty=Object.defineProperty,s.patchCallbacks=Tt,s.getGlobalObjects=()=>({globalSources:$e,zoneSymbolEventNames:ne,eventNames:r,isBrowser:Ae,isMix:We,isNode:Re,TRUE_STR:ae,FALSE_STR:le,ZONE_SYMBOL_PREFIX:ke,ADD_EVENT_LISTENER_STR:Oe,REMOVE_EVENT_LISTENER_STR:Ze})});const De=H("zoneTask");function pe(e,n,s,r){let i=null,l=null;s+=r;const p={};function E(v){const g=v.data;return g.args[0]=function(){return v.invoke.apply(this,arguments)},g.handleId=i.apply(e,g.args),v}function b(v){return l.call(e,v.data.handleId)}i=ue(e,n+=r,v=>function(g,M){if("function"==typeof M[0]){const Z={isPeriodic:"Interval"===r,delay:"Timeout"===r||"Interval"===r?M[1]||0:void 0,args:M},N=M[0];M[0]=function(){try{return N.apply(this,arguments)}finally{Z.isPeriodic||("number"==typeof Z.handleId?delete p[Z.handleId]:Z.handleId&&(Z.handleId[De]=null))}};const U=Le(n,M[0],Z,E,b);if(!U)return U;const x=U.data.handleId;return"number"==typeof x?p[x]=U:x&&(x[De]=U),x&&x.ref&&x.unref&&"function"==typeof x.ref&&"function"==typeof x.unref&&(U.ref=x.ref.bind(x),U.unref=x.unref.bind(x)),"number"==typeof x||x?x:U}return v.apply(e,M)}),l=ue(e,s,v=>function(g,M){const Z=M[0];let N;"number"==typeof Z?N=p[Z]:(N=Z&&Z[De],N||(N=Z)),N&&"string"==typeof N.type?"notScheduled"!==N.state&&(N.cancelFn&&N.data.isPeriodic||0===N.runCount)&&("number"==typeof Z?delete p[Z]:Z&&(Z[De]=null),N.zone.cancelTask(N)):v.apply(e,M)})}Zone.__load_patch("legacy",e=>{const n=e[Zone.__symbol__("legacyPatch")];n&&n()}),Zone.__load_patch("timers",e=>{const n="set",s="clear";pe(e,n,s,"Timeout"),pe(e,n,s,"Interval"),pe(e,n,s,"Immediate")}),Zone.__load_patch("requestAnimationFrame",e=>{pe(e,"request","cancel","AnimationFrame"),pe(e,"mozRequest","mozCancel","AnimationFrame"),pe(e,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",(e,n)=>{const s=["alert","prompt","confirm"];for(let r=0;r<s.length;r++)ue(e,s[r],(l,p,E)=>function(b,v){return n.current.run(l,e,v,E)})}),Zone.__load_patch("EventTarget",(e,n,s)=>{(function kt(e,n){n.patchEventPrototype(e,n)})(e,s),function mt(e,n){if(Zone[n.symbol("patchEventTarget")])return;const{eventNames:s,zoneSymbolEventNames:r,TRUE_STR:i,FALSE_STR:l,ZONE_SYMBOL_PREFIX:p}=n.getGlobalObjects();for(let b=0;b<s.length;b++){const v=s[b],Z=p+(v+l),N=p+(v+i);r[v]={},r[v][l]=Z,r[v][i]=N}const E=e.EventTarget;E&&E.prototype&&n.patchEventTarget(e,n,[E&&E.prototype])}(e,s);const r=e.XMLHttpRequestEventTarget;r&&r.prototype&&s.patchEventTarget(e,s,[r.prototype])}),Zone.__load_patch("MutationObserver",(e,n,s)=>{ve("MutationObserver"),ve("WebKitMutationObserver")}),Zone.__load_patch("IntersectionObserver",(e,n,s)=>{ve("IntersectionObserver")}),Zone.__load_patch("FileReader",(e,n,s)=>{ve("FileReader")}),Zone.__load_patch("on_property",(e,n,s)=>{!function yt(e,n){if(Re&&!We||Zone[e.symbol("patchEvents")])return;const s=n.__Zone_ignore_on_properties;let r=[];if(Ae){const i=window;r=r.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);const l=function ft(){try{const e=Te.navigator.userAgent;if(-1!==e.indexOf("MSIE ")||-1!==e.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:i,ignoreProperties:["error"]}]:[];nt(i,xe(i),s&&s.concat(l),de(i))}r=r.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let i=0;i<r.length;i++){const l=n[r[i]];l&&l.prototype&&nt(l.prototype,xe(l.prototype),s)}}(s,e)}),Zone.__load_patch("customElements",(e,n,s)=>{!function gt(e,n){const{isBrowser:s,isMix:r}=n.getGlobalObjects();(s||r)&&e.customElements&&"customElements"in e&&n.patchCallbacks(n,e.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"])}(e,s)}),Zone.__load_patch("XHR",(e,n)=>{!function b(v){const g=v.XMLHttpRequest;if(!g)return;const M=g.prototype;let N=M[Ne],U=M[Ie];if(!N){const h=v.XMLHttpRequestEventTarget;if(h){const I=h.prototype;N=I[Ne],U=I[Ie]}}const x="readystatechange",J="scheduled";function z(h){const I=h.data,P=I.target;P[l]=!1,P[E]=!1;const Q=P[i];N||(N=P[Ne],U=P[Ie]),Q&&U.call(P,x,Q);const se=P[i]=()=>{if(P.readyState===P.DONE)if(!I.aborted&&P[l]&&h.state===J){const W=P[n.__symbol__("loadfalse")];if(0!==P.status&&W&&W.length>0){const oe=h.invoke;h.invoke=function(){const te=P[n.__symbol__("loadfalse")];for(let q=0;q<te.length;q++)te[q]===h&&te.splice(q,1);!I.aborted&&h.state===J&&oe.call(h)},W.push(h)}else h.invoke()}else!I.aborted&&!1===P[l]&&(P[E]=!0)};return N.call(P,x,se),P[s]||(P[s]=h),y.apply(P,I.args),P[l]=!0,h}function C(){}function T(h){const I=h.data;return I.aborted=!0,V.apply(I.target,I.args)}const K=ue(M,"open",()=>function(h,I){return h[r]=0==I[2],h[p]=I[1],K.apply(h,I)}),X=H("fetchTaskAborting"),j=H("fetchTaskScheduling"),y=ue(M,"send",()=>function(h,I){if(!0===n.current[j]||h[r])return y.apply(h,I);{const P={target:h,url:h[p],isPeriodic:!1,args:I,aborted:!1},Q=Le("XMLHttpRequest.send",C,P,z,T);h&&!0===h[E]&&!P.aborted&&Q.state===J&&Q.invoke()}}),V=ue(M,"abort",()=>function(h,I){const P=function Z(h){return h[s]}(h);if(P&&"string"==typeof P.type){if(null==P.cancelFn||P.data&&P.data.aborted)return;P.zone.cancelTask(P)}else if(!0===n.current[X])return V.apply(h,I)})}(e);const s=H("xhrTask"),r=H("xhrSync"),i=H("xhrListener"),l=H("xhrScheduled"),p=H("xhrURL"),E=H("xhrErrorBeforeScheduled")}),Zone.__load_patch("geolocation",e=>{e.navigator&&e.navigator.geolocation&&function lt(e,n){const s=e.constructor.name;for(let r=0;r<n.length;r++){const i=n[r],l=e[i];if(l){if(!Be(ce(e,i)))continue;e[i]=(E=>{const b=function(){return E.apply(this,je(arguments,s+"."+i))};return fe(b,E),b})(l)}}}(e.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",(e,n)=>{function s(r){return function(i){et(e,r).forEach(p=>{const E=e.PromiseRejectionEvent;if(E){const b=new E(r,{promise:i.promise,reason:i.rejection});p.invoke(b)}})}}e.PromiseRejectionEvent&&(n[H("unhandledPromiseRejectionHandler")]=s("unhandledrejection"),n[H("rejectionHandledHandler")]=s("rejectionhandled"))}),Zone.__load_patch("queueMicrotask",(e,n,s)=>{!function pt(e,n){n.patchMethod(e,"queueMicrotask",s=>function(r,i){Zone.current.scheduleMicroTask("queueMicrotask",i[0])})}(e,s)})}},ce=>{ce(ce.s=13489)}]);