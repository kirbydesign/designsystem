"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[3461],{95809:(ee,J,me)=>{me(96935)},96935:()=>{const ee=globalThis;function J(t){return(ee.__Zone_symbol_prefix||"__zone_symbol__")+t}const _e=Object.getOwnPropertyDescriptor,Ne=Object.defineProperty,Ie=Object.getPrototypeOf,ft=Object.create,ht=Array.prototype.slice,Le="addEventListener",Me="removeEventListener",Ze=J(Le),Ae=J(Me),ce="true",ae="false",ve=J("");function je(t,r){return Zone.current.wrap(t,r)}function He(t,r,i,n,s){return Zone.current.scheduleMacroTask(t,r,i,n,s)}const x=J,we=typeof window<"u",Ee=we?window:void 0,$=we&&Ee||globalThis,dt="removeAttribute";function xe(t,r){for(let i=t.length-1;i>=0;i--)"function"==typeof t[i]&&(t[i]=je(t[i],r+"_"+i));return t}function We(t){return!t||!1!==t.writable&&!("function"==typeof t.get&&typeof t.set>"u")}const ze=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Re=!("nw"in $)&&typeof $.process<"u"&&"[object process]"===$.process.toString(),Ge=!Re&&!ze&&!(!we||!Ee.HTMLElement),qe=typeof $.process<"u"&&"[object process]"===$.process.toString()&&!ze&&!(!we||!Ee.HTMLElement),Ce={},Xe=function(t){if(!(t=t||$.event))return;let r=Ce[t.type];r||(r=Ce[t.type]=x("ON_PROPERTY"+t.type));const i=this||t.target||$,n=i[r];let s;return Ge&&i===Ee&&"error"===t.type?(s=n&&n.call(this,t.message,t.filename,t.lineno,t.colno,t.error),!0===s&&t.preventDefault()):(s=n&&n.apply(this,arguments),null!=s&&!s&&t.preventDefault()),s};function Ye(t,r,i){let n=_e(t,r);if(!n&&i&&_e(i,r)&&(n={enumerable:!0,configurable:!0}),!n||!n.configurable)return;const s=x("on"+r+"patched");if(t.hasOwnProperty(s)&&t[s])return;delete n.writable,delete n.value;const l=n.get,E=n.set,T=r.slice(2);let y=Ce[T];y||(y=Ce[T]=x("ON_PROPERTY"+T)),n.set=function(C){let g=this;!g&&t===$&&(g=$),g&&("function"==typeof g[y]&&g.removeEventListener(T,Xe),E&&E.call(g,null),g[y]=C,"function"==typeof C&&g.addEventListener(T,Xe,!1))},n.get=function(){let C=this;if(!C&&t===$&&(C=$),!C)return null;const g=C[y];if(g)return g;if(l){let M=l.call(this);if(M)return n.set.call(this,M),"function"==typeof C[dt]&&C.removeAttribute(r),M}return null},Ne(t,r,n),t[s]=!0}function $e(t,r,i){if(r)for(let n=0;n<r.length;n++)Ye(t,"on"+r[n],i);else{const n=[];for(const s in t)"on"==s.slice(0,2)&&n.push(s);for(let s=0;s<n.length;s++)Ye(t,n[s],i)}}const re=x("originalInstance");function be(t){const r=$[t];if(!r)return;$[x(t)]=r,$[t]=function(){const s=xe(arguments,t);switch(s.length){case 0:this[re]=new r;break;case 1:this[re]=new r(s[0]);break;case 2:this[re]=new r(s[0],s[1]);break;case 3:this[re]=new r(s[0],s[1],s[2]);break;case 4:this[re]=new r(s[0],s[1],s[2],s[3]);break;default:throw new Error("Arg list too long.")}},ue($[t],r);const i=new r(function(){});let n;for(n in i)"XMLHttpRequest"===t&&"responseBlob"===n||function(s){"function"==typeof i[s]?$[t].prototype[s]=function(){return this[re][s].apply(this[re],arguments)}:Ne($[t].prototype,s,{set:function(l){"function"==typeof l?(this[re][s]=je(l,t+"."+s),ue(this[re][s],l)):this[re][s]=l},get:function(){return this[re][s]}})}(n);for(n in r)"prototype"!==n&&r.hasOwnProperty(n)&&($[t][n]=r[n])}function le(t,r,i){let n=t;for(;n&&!n.hasOwnProperty(r);)n=Ie(n);!n&&t[r]&&(n=t);const s=x(r);let l=null;if(n&&(!(l=n[s])||!n.hasOwnProperty(s))&&(l=n[s]=n[r],We(n&&_e(n,r)))){const T=i(l,s,r);n[r]=function(){return T(this,arguments)},ue(n[r],l)}return l}function Et(t,r,i){let n=null;function s(l){const E=l.data;return E.args[E.cbIdx]=function(){l.invoke.apply(this,arguments)},n.apply(E.target,E.args),l}n=le(t,r,l=>function(E,T){const y=i(E,T);return y.cbIdx>=0&&"function"==typeof T[y.cbIdx]?He(y.name,T[y.cbIdx],y,s):l.apply(E,T)})}function ue(t,r){t[x("OriginalDelegate")]=r}let Ke=!1,Ve=!1;function gt(){if(Ke)return Ve;Ke=!0;try{const t=Ee.navigator.userAgent;(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/")||-1!==t.indexOf("Edge/"))&&(Ve=!0)}catch{}return Ve}let Te=!1;if(typeof window<"u")try{const t=Object.defineProperty({},"passive",{get:function(){Te=!0}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{Te=!1}const pt={useG:!0},ne={},Je={},Qe=new RegExp("^"+ve+"(\\w+)(true|false)$"),et=x("propagationStopped");function tt(t,r){const i=(r?r(t):t)+ae,n=(r?r(t):t)+ce,s=ve+i,l=ve+n;ne[t]={},ne[t][ae]=s,ne[t][ce]=l}function yt(t,r,i,n){const s=n&&n.add||Le,l=n&&n.rm||Me,E=n&&n.listeners||"eventListeners",T=n&&n.rmAll||"removeAllListeners",y=x(s),C="."+s+":",g="prependListener",M="."+g+":",w=function(v,d,V){if(v.isRemoved)return;const z=v.callback;let Y;"object"==typeof z&&z.handleEvent&&(v.callback=p=>z.handleEvent(p),v.originalDelegate=z);try{v.invoke(v,d,[V])}catch(p){Y=p}const B=v.options;return B&&"object"==typeof B&&B.once&&d[l].call(d,V.type,v.originalDelegate?v.originalDelegate:v.callback,B),Y};function H(v,d,V){if(!(d=d||t.event))return;const z=v||d.target||t,Y=z[ne[d.type][V?ce:ae]];if(Y){const B=[];if(1===Y.length){const p=w(Y[0],z,d);p&&B.push(p)}else{const p=Y.slice();for(let F=0;F<p.length&&(!d||!0!==d[et]);F++){const L=w(p[F],z,d);L&&B.push(L)}}if(1===B.length)throw B[0];for(let p=0;p<B.length;p++){const F=B[p];r.nativeScheduleMicroTask(()=>{throw F})}}}const W=function(v){return H(this,v,!1)},G=function(v){return H(this,v,!0)};function oe(v,d){if(!v)return!1;let V=!0;d&&void 0!==d.useG&&(V=d.useG);const z=d&&d.vh;let Y=!0;d&&void 0!==d.chkDup&&(Y=d.chkDup);let B=!1;d&&void 0!==d.rt&&(B=d.rt);let p=v;for(;p&&!p.hasOwnProperty(s);)p=Ie(p);if(!p&&v[s]&&(p=v),!p||p[y])return!1;const F=d&&d.eventNameToString,L={},R=p[y]=p[s],k=p[x(l)]=p[l],O=p[x(E)]=p[E],Q=p[x(T)]=p[T];let q;d&&d.prepend&&(q=p[x(d.prepend)]=p[d.prepend]);const A=V?function(o){if(!L.isExisting)return R.call(L.target,L.eventName,L.capture?G:W,L.options)}:function(o){return R.call(L.target,L.eventName,o.invoke,L.options)},I=V?function(o){if(!o.isRemoved){const c=ne[o.eventName];let f;c&&(f=c[o.capture?ce:ae]);const b=f&&o.target[f];if(b)for(let D=0;D<b.length;D++)if(b[D]===o){b.splice(D,1),o.isRemoved=!0,0===b.length&&(o.allRemoved=!0,o.target[f]=null);break}}if(o.allRemoved)return k.call(o.target,o.eventName,o.capture?G:W,o.options)}:function(o){return k.call(o.target,o.eventName,o.invoke,o.options)},Pe=d&&d.diff?d.diff:function(o,c){const f=typeof c;return"function"===f&&o.callback===c||"object"===f&&o.originalDelegate===c},he=Zone[x("UNPATCHED_EVENTS")],Se=t[x("PASSIVE_EVENTS")],u=function(o,c,f,b,D=!1,m=!1){return function(){const P=this||t;let S=arguments[0];d&&d.transferEventName&&(S=d.transferEventName(S));let j=arguments[1];if(!j)return o.apply(this,arguments);if(Re&&"uncaughtException"===S)return o.apply(this,arguments);let U=!1;if("function"!=typeof j){if(!j.handleEvent)return o.apply(this,arguments);U=!0}if(z&&!z(o,j,P,arguments))return;const K=Te&&!!Se&&-1!==Se.indexOf(S),te=function Z(o,c){return!Te&&"object"==typeof o&&o?!!o.capture:Te&&c?"boolean"==typeof o?{capture:o,passive:!0}:o?"object"==typeof o&&!1!==o.passive?{...o,passive:!0}:o:{passive:!0}:o}(arguments[2],K),pe=te?.signal;if(pe?.aborted)return;if(he)for(let ie=0;ie<he.length;ie++)if(S===he[ie])return K?o.call(P,S,j,te):o.apply(this,arguments);const Fe=!!te&&("boolean"==typeof te||te.capture),it=!(!te||"object"!=typeof te)&&te.once,It=Zone.current;let Ue=ne[S];Ue||(tt(S,F),Ue=ne[S]);const ct=Ue[Fe?ce:ae];let Oe,ye=P[ct],at=!1;if(ye){if(at=!0,Y)for(let ie=0;ie<ye.length;ie++)if(Pe(ye[ie],j))return}else ye=P[ct]=[];const lt=P.constructor.name,ut=Je[lt];ut&&(Oe=ut[S]),Oe||(Oe=lt+c+(F?F(S):S)),L.options=te,it&&(L.options.once=!1),L.target=P,L.capture=Fe,L.eventName=S,L.isExisting=at;const de=V?pt:void 0;de&&(de.taskData=L),pe&&(L.options.signal=void 0);const se=It.scheduleEventTask(Oe,j,de,f,b);if(pe){L.options.signal=pe;const ie=()=>se.zone.cancelTask(se);o.call(pe,"abort",ie,{once:!0}),de&&(de.removeAbortListener=()=>pe.removeEventListener("abort",ie))}return L.target=null,de&&(de.taskData=null),it&&(te.once=!0),!Te&&"boolean"==typeof se.options||(se.options=te),se.target=P,se.capture=Fe,se.eventName=S,U&&(se.originalDelegate=j),m?ye.unshift(se):ye.push(se),D?P:void 0}};return p[s]=u(R,C,A,I,B),q&&(p[g]=u(q,M,function(o){return q.call(L.target,L.eventName,o.invoke,L.options)},I,B,!0)),p[l]=function(){const o=this||t;let c=arguments[0];d&&d.transferEventName&&(c=d.transferEventName(c));const f=arguments[2],b=!!f&&("boolean"==typeof f||f.capture),D=arguments[1];if(!D)return k.apply(this,arguments);if(z&&!z(k,D,o,arguments))return;const m=ne[c];let P;m&&(P=m[b?ce:ae]);const S=P&&o[P];if(S)for(let j=0;j<S.length;j++){const U=S[j];if(Pe(U,D)){S.splice(j,1),U.isRemoved=!0,0!==S.length||(U.allRemoved=!0,o[P]=null,b||"string"!=typeof c)||(o[ve+"ON_PROPERTY"+c]=null);const K=U.data;return K?.removeAbortListener&&(K.removeAbortListener(),K.removeAbortListener=null),U.zone.cancelTask(U),B?o:void 0}}return k.apply(this,arguments)},p[E]=function(){const o=this||t;let c=arguments[0];d&&d.transferEventName&&(c=d.transferEventName(c));const f=[],b=nt(o,F?F(c):c);for(let D=0;D<b.length;D++){const m=b[D];f.push(m.originalDelegate?m.originalDelegate:m.callback)}return f},p[T]=function(){const o=this||t;let c=arguments[0];if(c){d&&d.transferEventName&&(c=d.transferEventName(c));const f=ne[c];if(f){const m=o[f[ae]],P=o[f[ce]];if(m){const S=m.slice();for(let j=0;j<S.length;j++){const U=S[j];this[l].call(this,c,U.originalDelegate?U.originalDelegate:U.callback,U.options)}}if(P){const S=P.slice();for(let j=0;j<S.length;j++){const U=S[j];this[l].call(this,c,U.originalDelegate?U.originalDelegate:U.callback,U.options)}}}}else{const f=Object.keys(o);for(let b=0;b<f.length;b++){const m=Qe.exec(f[b]);let P=m&&m[1];P&&"removeListener"!==P&&this[T].call(this,P)}this[T].call(this,"removeListener")}if(B)return this},ue(p[s],R),ue(p[l],k),Q&&ue(p[T],Q),O&&ue(p[E],O),!0}let X=[];for(let v=0;v<i.length;v++)X[v]=oe(i[v],n);return X}function nt(t,r){if(!r){const l=[];for(let E in t){const T=Qe.exec(E);let y=T&&T[1];if(y&&(!r||y===r)){const C=t[E];if(C)for(let g=0;g<C.length;g++)l.push(C[g])}}return l}let i=ne[r];i||(tt(r),i=ne[r]);const n=t[i[ae]],s=t[i[ce]];return n?s?n.concat(s):n.slice():s?s.slice():[]}function mt(t,r){const i=t.Event;i&&i.prototype&&r.patchMethod(i.prototype,"stopImmediatePropagation",n=>function(s,l){s[et]=!0,n&&n.apply(s,l)})}const De=x("zoneTask");function ge(t,r,i,n){let s=null,l=null;i+=n;const E={};function T(C){const g=C.data;return g.args[0]=function(){return C.invoke.apply(this,arguments)},g.handleId=s.apply(t,g.args),C}function y(C){return l.call(t,C.data.handleId)}s=le(t,r+=n,C=>function(g,M){if("function"==typeof M[0]){const w={isPeriodic:"Interval"===n,delay:"Timeout"===n||"Interval"===n?M[1]||0:void 0,args:M},H=M[0];M[0]=function(){try{return H.apply(this,arguments)}finally{w.isPeriodic||("number"==typeof w.handleId?delete E[w.handleId]:w.handleId&&(w.handleId[De]=null))}};const W=He(r,M[0],w,T,y);if(!W)return W;const G=W.data.handleId;return"number"==typeof G?E[G]=W:G&&(G[De]=W),G&&G.ref&&G.unref&&"function"==typeof G.ref&&"function"==typeof G.unref&&(W.ref=G.ref.bind(G),W.unref=G.unref.bind(G)),"number"==typeof G||G?G:W}return C.apply(t,M)}),l=le(t,i,C=>function(g,M){const w=M[0];let H;"number"==typeof w?H=E[w]:(H=w&&w[De],H||(H=w)),H&&"string"==typeof H.type?"notScheduled"!==H.state&&(H.cancelFn&&H.data.isPeriodic||0===H.runCount)&&("number"==typeof w?delete E[w]:w&&(w[De]=null),H.zone.cancelTask(H)):C.apply(t,M)})}function rt(t,r,i){if(!i||0===i.length)return r;const n=i.filter(l=>l.target===t);if(!n||0===n.length)return r;const s=n[0].ignoreProperties;return r.filter(l=>-1===s.indexOf(l))}function ot(t,r,i,n){t&&$e(t,rt(t,r,i),n)}function Be(t){return Object.getOwnPropertyNames(t).filter(r=>r.startsWith("on")&&r.length>2).map(r=>r.substring(2))}function St(t,r,i,n,s){const l=Zone.__symbol__(n);if(r[l])return;const E=r[l]=r[n];r[n]=function(T,y,C){return y&&y.prototype&&s.forEach(function(g){const M=`${i}.${n}::`+g,w=y.prototype;try{if(w.hasOwnProperty(g)){const H=t.ObjectGetOwnPropertyDescriptor(w,g);H&&H.value?(H.value=t.wrapWithCurrentZone(H.value,M),t._redefineProperty(y.prototype,g,H)):w[g]&&(w[g]=t.wrapWithCurrentZone(w[g],M))}else w[g]&&(w[g]=t.wrapWithCurrentZone(w[g],M))}catch{}}),E.call(r,T,y,C)},t.attachOriginToPatched(r[n],E)}const st=function ke(){const t=globalThis,r=!0===t[J("forceDuplicateZoneCheck")];if(t.Zone&&(r||"function"!=typeof t.Zone.__symbol__))throw new Error("Zone already loaded.");return t.Zone??=function me(){const t=ee.performance;function r(Z){t&&t.mark&&t.mark(Z)}function i(Z,_){t&&t.measure&&t.measure(Z,_)}r("Zone");let n=(()=>{class _{static assertZonePatched(){if(ee.Promise!==L.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let e=_.current;for(;e.parent;)e=e.parent;return e}static get current(){return k.zone}static get currentTask(){return O}static __load_patch(e,h,N=!1){if(L.hasOwnProperty(e)){const A=!0===ee[J("forceDuplicateZoneCheck")];if(!N&&A)throw Error("Already loaded patch: "+e)}else if(!ee["__Zone_disable_"+e]){const A="Zone:"+e;r(A),L[e]=h(ee,_,R),i(A,A)}}get parent(){return this._parent}get name(){return this._name}constructor(e,h){this._parent=e,this._name=h?h.name||"unnamed":"<root>",this._properties=h&&h.properties||{},this._zoneDelegate=new l(this,this._parent&&this._parent._zoneDelegate,h)}get(e){const h=this.getZoneWith(e);if(h)return h._properties[e]}getZoneWith(e){let h=this;for(;h;){if(h._properties.hasOwnProperty(e))return h;h=h._parent}return null}fork(e){if(!e)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,e)}wrap(e,h){if("function"!=typeof e)throw new Error("Expecting function got: "+e);const N=this._zoneDelegate.intercept(this,e,h),A=this;return function(){return A.runGuarded(N,this,arguments,h)}}run(e,h,N,A){k={parent:k,zone:this};try{return this._zoneDelegate.invoke(this,e,h,N,A)}finally{k=k.parent}}runGuarded(e,h=null,N,A){k={parent:k,zone:this};try{try{return this._zoneDelegate.invoke(this,e,h,N,A)}catch(I){if(this._zoneDelegate.handleError(this,I))throw I}}finally{k=k.parent}}runTask(e,h,N){if(e.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(e.zone||oe).name+"; Execution: "+this.name+")");if(e.state===X&&(e.type===F||e.type===p))return;const A=e.state!=V;A&&e._transitionTo(V,d),e.runCount++;const I=O;O=e,k={parent:k,zone:this};try{e.type==p&&e.data&&!e.data.isPeriodic&&(e.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,e,h,N)}catch(fe){if(this._zoneDelegate.handleError(this,fe))throw fe}}finally{e.state!==X&&e.state!==Y&&(e.type==F||e.data&&e.data.isPeriodic?A&&e._transitionTo(d,V):(e.runCount=0,this._updateTaskCount(e,-1),A&&e._transitionTo(X,V,X))),k=k.parent,O=I}}scheduleTask(e){if(e.zone&&e.zone!==this){let N=this;for(;N;){if(N===e.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);N=N.parent}}e._transitionTo(v,X);const h=[];e._zoneDelegates=h,e._zone=this;try{e=this._zoneDelegate.scheduleTask(this,e)}catch(N){throw e._transitionTo(Y,v,X),this._zoneDelegate.handleError(this,N),N}return e._zoneDelegates===h&&this._updateTaskCount(e,1),e.state==v&&e._transitionTo(d,v),e}scheduleMicroTask(e,h,N,A){return this.scheduleTask(new E(B,e,h,N,A,void 0))}scheduleMacroTask(e,h,N,A,I){return this.scheduleTask(new E(p,e,h,N,A,I))}scheduleEventTask(e,h,N,A,I){return this.scheduleTask(new E(F,e,h,N,A,I))}cancelTask(e){if(e.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(e.zone||oe).name+"; Execution: "+this.name+")");if(e.state===d||e.state===V){e._transitionTo(z,d,V);try{this._zoneDelegate.cancelTask(this,e)}catch(h){throw e._transitionTo(Y,z),this._zoneDelegate.handleError(this,h),h}return this._updateTaskCount(e,-1),e._transitionTo(X,z),e.runCount=0,e}}_updateTaskCount(e,h){const N=e._zoneDelegates;-1==h&&(e._zoneDelegates=null);for(let A=0;A<N.length;A++)N[A]._updateTaskCount(e.type,h)}}return _.__symbol__=J,_})();const s={name:"",onHasTask:(Z,_,a,e)=>Z.hasTask(a,e),onScheduleTask:(Z,_,a,e)=>Z.scheduleTask(a,e),onInvokeTask:(Z,_,a,e,h,N)=>Z.invokeTask(a,e,h,N),onCancelTask:(Z,_,a,e)=>Z.cancelTask(a,e)};class l{get zone(){return this._zone}constructor(_,a,e){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=_,this._parentDelegate=a,this._forkZS=e&&(e&&e.onFork?e:a._forkZS),this._forkDlgt=e&&(e.onFork?a:a._forkDlgt),this._forkCurrZone=e&&(e.onFork?this._zone:a._forkCurrZone),this._interceptZS=e&&(e.onIntercept?e:a._interceptZS),this._interceptDlgt=e&&(e.onIntercept?a:a._interceptDlgt),this._interceptCurrZone=e&&(e.onIntercept?this._zone:a._interceptCurrZone),this._invokeZS=e&&(e.onInvoke?e:a._invokeZS),this._invokeDlgt=e&&(e.onInvoke?a:a._invokeDlgt),this._invokeCurrZone=e&&(e.onInvoke?this._zone:a._invokeCurrZone),this._handleErrorZS=e&&(e.onHandleError?e:a._handleErrorZS),this._handleErrorDlgt=e&&(e.onHandleError?a:a._handleErrorDlgt),this._handleErrorCurrZone=e&&(e.onHandleError?this._zone:a._handleErrorCurrZone),this._scheduleTaskZS=e&&(e.onScheduleTask?e:a._scheduleTaskZS),this._scheduleTaskDlgt=e&&(e.onScheduleTask?a:a._scheduleTaskDlgt),this._scheduleTaskCurrZone=e&&(e.onScheduleTask?this._zone:a._scheduleTaskCurrZone),this._invokeTaskZS=e&&(e.onInvokeTask?e:a._invokeTaskZS),this._invokeTaskDlgt=e&&(e.onInvokeTask?a:a._invokeTaskDlgt),this._invokeTaskCurrZone=e&&(e.onInvokeTask?this._zone:a._invokeTaskCurrZone),this._cancelTaskZS=e&&(e.onCancelTask?e:a._cancelTaskZS),this._cancelTaskDlgt=e&&(e.onCancelTask?a:a._cancelTaskDlgt),this._cancelTaskCurrZone=e&&(e.onCancelTask?this._zone:a._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const h=e&&e.onHasTask;(h||a&&a._hasTaskZS)&&(this._hasTaskZS=h?e:s,this._hasTaskDlgt=a,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,e.onScheduleTask||(this._scheduleTaskZS=s,this._scheduleTaskDlgt=a,this._scheduleTaskCurrZone=this._zone),e.onInvokeTask||(this._invokeTaskZS=s,this._invokeTaskDlgt=a,this._invokeTaskCurrZone=this._zone),e.onCancelTask||(this._cancelTaskZS=s,this._cancelTaskDlgt=a,this._cancelTaskCurrZone=this._zone))}fork(_,a){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,_,a):new n(_,a)}intercept(_,a,e){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,_,a,e):a}invoke(_,a,e,h,N){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,_,a,e,h,N):a.apply(e,h)}handleError(_,a){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,_,a)}scheduleTask(_,a){let e=a;if(this._scheduleTaskZS)this._hasTaskZS&&e._zoneDelegates.push(this._hasTaskDlgtOwner),e=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,_,a),e||(e=a);else if(a.scheduleFn)a.scheduleFn(a);else{if(a.type!=B)throw new Error("Task is missing scheduleFn.");W(a)}return e}invokeTask(_,a,e,h){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,_,a,e,h):a.callback.apply(e,h)}cancelTask(_,a){let e;if(this._cancelTaskZS)e=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,_,a);else{if(!a.cancelFn)throw Error("Task is not cancelable");e=a.cancelFn(a)}return e}hasTask(_,a){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,_,a)}catch(e){this.handleError(_,e)}}_updateTaskCount(_,a){const e=this._taskCounts,h=e[_],N=e[_]=h+a;if(N<0)throw new Error("More tasks executed then were scheduled.");0!=h&&0!=N||this.hasTask(this._zone,{microTask:e.microTask>0,macroTask:e.macroTask>0,eventTask:e.eventTask>0,change:_})}}class E{constructor(_,a,e,h,N,A){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=_,this.source=a,this.data=h,this.scheduleFn=N,this.cancelFn=A,!e)throw new Error("callback is not defined");this.callback=e;const I=this;this.invoke=_===F&&h&&h.useG?E.invokeTask:function(){return E.invokeTask.call(ee,I,this,arguments)}}static invokeTask(_,a,e){_||(_=this),Q++;try{return _.runCount++,_.zone.runTask(_,a,e)}finally{1==Q&&G(),Q--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(X,v)}_transitionTo(_,a,e){if(this._state!==a&&this._state!==e)throw new Error(`${this.type} '${this.source}': can not transition to '${_}', expecting state '${a}'${e?" or '"+e+"'":""}, was '${this._state}'.`);this._state=_,_==X&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const T=J("setTimeout"),y=J("Promise"),C=J("then");let w,g=[],M=!1;function H(Z){if(w||ee[y]&&(w=ee[y].resolve(0)),w){let _=w[C];_||(_=w.then),_.call(w,Z)}else ee[T](Z,0)}function W(Z){0===Q&&0===g.length&&H(G),Z&&g.push(Z)}function G(){if(!M){for(M=!0;g.length;){const Z=g;g=[];for(let _=0;_<Z.length;_++){const a=Z[_];try{a.zone.runTask(a,null,null)}catch(e){R.onUnhandledError(e)}}}R.microtaskDrainDone(),M=!1}}const oe={name:"NO ZONE"},X="notScheduled",v="scheduling",d="scheduled",V="running",z="canceling",Y="unknown",B="microTask",p="macroTask",F="eventTask",L={},R={symbol:J,currentZoneFrame:()=>k,onUnhandledError:q,microtaskDrainDone:q,scheduleMicroTask:W,showUncaughtError:()=>!n[J("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:q,patchMethod:()=>q,bindArguments:()=>[],patchThen:()=>q,patchMacroTask:()=>q,patchEventPrototype:()=>q,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>q,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>q,wrapWithCurrentZone:()=>q,filterProperties:()=>[],attachOriginToPatched:()=>q,_redefineProperty:()=>q,patchCallbacks:()=>q,nativeScheduleMicroTask:H};let k={parent:null,zone:new n(null,null)},O=null,Q=0;function q(){}return i("Zone","Zone"),n}(),t.Zone}();(function Nt(t){(function Ct(t){t.__load_patch("ZoneAwarePromise",(r,i,n)=>{const s=Object.getOwnPropertyDescriptor,l=Object.defineProperty,T=n.symbol,y=[],C=!1!==r[T("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],g=T("Promise"),M=T("then"),w="__creationTrace__";n.onUnhandledError=u=>{if(n.showUncaughtError()){const o=u&&u.rejection;o?console.error("Unhandled Promise rejection:",o instanceof Error?o.message:o,"; Zone:",u.zone.name,"; Task:",u.task&&u.task.source,"; Value:",o,o instanceof Error?o.stack:void 0):console.error(u)}},n.microtaskDrainDone=()=>{for(;y.length;){const u=y.shift();try{u.zone.runGuarded(()=>{throw u.throwOriginal?u.rejection:u})}catch(o){W(o)}}};const H=T("unhandledPromiseRejectionHandler");function W(u){n.onUnhandledError(u);try{const o=i[H];"function"==typeof o&&o.call(this,u)}catch{}}function G(u){return u&&u.then}function oe(u){return u}function X(u){return I.reject(u)}const v=T("state"),d=T("value"),V=T("finally"),z=T("parentPromiseValue"),Y=T("parentPromiseState"),B="Promise.then",p=null,F=!0,L=!1,R=0;function k(u,o){return c=>{try{Z(u,o,c)}catch(f){Z(u,!1,f)}}}const O=function(){let u=!1;return function(c){return function(){u||(u=!0,c.apply(null,arguments))}}},Q="Promise resolved with itself",q=T("currentTaskTrace");function Z(u,o,c){const f=O();if(u===c)throw new TypeError(Q);if(u[v]===p){let b=null;try{("object"==typeof c||"function"==typeof c)&&(b=c&&c.then)}catch(D){return f(()=>{Z(u,!1,D)})(),u}if(o!==L&&c instanceof I&&c.hasOwnProperty(v)&&c.hasOwnProperty(d)&&c[v]!==p)a(c),Z(u,c[v],c[d]);else if(o!==L&&"function"==typeof b)try{b.call(c,f(k(u,o)),f(k(u,!1)))}catch(D){f(()=>{Z(u,!1,D)})()}else{u[v]=o;const D=u[d];if(u[d]=c,u[V]===V&&o===F&&(u[v]=u[Y],u[d]=u[z]),o===L&&c instanceof Error){const m=i.currentTask&&i.currentTask.data&&i.currentTask.data[w];m&&l(c,q,{configurable:!0,enumerable:!1,writable:!0,value:m})}for(let m=0;m<D.length;)e(u,D[m++],D[m++],D[m++],D[m++]);if(0==D.length&&o==L){u[v]=R;let m=c;try{throw new Error("Uncaught (in promise): "+function E(u){return u&&u.toString===Object.prototype.toString?(u.constructor&&u.constructor.name||"")+": "+JSON.stringify(u):u?u.toString():Object.prototype.toString.call(u)}(c)+(c&&c.stack?"\n"+c.stack:""))}catch(P){m=P}C&&(m.throwOriginal=!0),m.rejection=c,m.promise=u,m.zone=i.current,m.task=i.currentTask,y.push(m),n.scheduleMicroTask()}}}return u}const _=T("rejectionHandledHandler");function a(u){if(u[v]===R){try{const o=i[_];o&&"function"==typeof o&&o.call(this,{rejection:u[d],promise:u})}catch{}u[v]=L;for(let o=0;o<y.length;o++)u===y[o].promise&&y.splice(o,1)}}function e(u,o,c,f,b){a(u);const D=u[v],m=D?"function"==typeof f?f:oe:"function"==typeof b?b:X;o.scheduleMicroTask(B,()=>{try{const P=u[d],S=!!c&&V===c[V];S&&(c[z]=P,c[Y]=D);const j=o.run(m,void 0,S&&m!==X&&m!==oe?[]:[P]);Z(c,!0,j)}catch(P){Z(c,!1,P)}},c)}const N=function(){},A=r.AggregateError;class I{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(o){return o instanceof I?o:Z(new this(null),F,o)}static reject(o){return Z(new this(null),L,o)}static withResolvers(){const o={};return o.promise=new I((c,f)=>{o.resolve=c,o.reject=f}),o}static any(o){if(!o||"function"!=typeof o[Symbol.iterator])return Promise.reject(new A([],"All promises were rejected"));const c=[];let f=0;try{for(let m of o)f++,c.push(I.resolve(m))}catch{return Promise.reject(new A([],"All promises were rejected"))}if(0===f)return Promise.reject(new A([],"All promises were rejected"));let b=!1;const D=[];return new I((m,P)=>{for(let S=0;S<c.length;S++)c[S].then(j=>{b||(b=!0,m(j))},j=>{D.push(j),f--,0===f&&(b=!0,P(new A(D,"All promises were rejected")))})})}static race(o){let c,f,b=new this((P,S)=>{c=P,f=S});function D(P){c(P)}function m(P){f(P)}for(let P of o)G(P)||(P=this.resolve(P)),P.then(D,m);return b}static all(o){return I.allWithCallback(o)}static allSettled(o){return(this&&this.prototype instanceof I?this:I).allWithCallback(o,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(o,c){let f,b,D=new this((j,U)=>{f=j,b=U}),m=2,P=0;const S=[];for(let j of o){G(j)||(j=this.resolve(j));const U=P;try{j.then(K=>{S[U]=c?c.thenCallback(K):K,m--,0===m&&f(S)},K=>{c?(S[U]=c.errorCallback(K),m--,0===m&&f(S)):b(K)})}catch(K){b(K)}m++,P++}return m-=2,0===m&&f(S),D}constructor(o){const c=this;if(!(c instanceof I))throw new Error("Must be an instanceof Promise.");c[v]=p,c[d]=[];try{const f=O();o&&o(f(k(c,F)),f(k(c,L)))}catch(f){Z(c,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return I}then(o,c){let f=this.constructor?.[Symbol.species];(!f||"function"!=typeof f)&&(f=this.constructor||I);const b=new f(N),D=i.current;return this[v]==p?this[d].push(D,b,o,c):e(this,D,b,o,c),b}catch(o){return this.then(null,o)}finally(o){let c=this.constructor?.[Symbol.species];(!c||"function"!=typeof c)&&(c=I);const f=new c(N);f[V]=V;const b=i.current;return this[v]==p?this[d].push(b,f,o,o):e(this,b,f,o,o),f}}I.resolve=I.resolve,I.reject=I.reject,I.race=I.race,I.all=I.all;const fe=r[g]=r.Promise;r.Promise=I;const Pe=T("thenPatched");function he(u){const o=u.prototype,c=s(o,"then");if(c&&(!1===c.writable||!c.configurable))return;const f=o.then;o[M]=f,u.prototype.then=function(b,D){return new I((P,S)=>{f.call(this,P,S)}).then(b,D)},u[Pe]=!0}return n.patchThen=he,fe&&(he(fe),le(r,"fetch",u=>function Se(u){return function(o,c){let f=u.apply(o,c);if(f instanceof I)return f;let b=f.constructor;return b[Pe]||he(b),f}}(u))),Promise[i.__symbol__("uncaughtPromiseErrors")]=y,I})})(t),function Dt(t){t.__load_patch("toString",r=>{const i=Function.prototype.toString,n=x("OriginalDelegate"),s=x("Promise"),l=x("Error"),E=function(){if("function"==typeof this){const g=this[n];if(g)return"function"==typeof g?i.call(g):Object.prototype.toString.call(g);if(this===Promise){const M=r[s];if(M)return i.call(M)}if(this===Error){const M=r[l];if(M)return i.call(M)}}return i.call(this)};E[n]=i,Function.prototype.toString=E;const T=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":T.call(this)}})}(t),function Ot(t){t.__load_patch("util",(r,i,n)=>{const s=Be(r);n.patchOnProperties=$e,n.patchMethod=le,n.bindArguments=xe,n.patchMacroTask=Et;const l=i.__symbol__("BLACK_LISTED_EVENTS"),E=i.__symbol__("UNPATCHED_EVENTS");r[E]&&(r[l]=r[E]),r[l]&&(i[l]=i[E]=r[l]),n.patchEventPrototype=mt,n.patchEventTarget=yt,n.isIEOrEdge=gt,n.ObjectDefineProperty=Ne,n.ObjectGetOwnPropertyDescriptor=_e,n.ObjectCreate=ft,n.ArraySlice=ht,n.patchClass=be,n.wrapWithCurrentZone=je,n.filterProperties=rt,n.attachOriginToPatched=ue,n._redefineProperty=Object.defineProperty,n.patchCallbacks=St,n.getGlobalObjects=()=>({globalSources:Je,zoneSymbolEventNames:ne,eventNames:s,isBrowser:Ge,isMix:qe,isNode:Re,TRUE_STR:ce,FALSE_STR:ae,ZONE_SYMBOL_PREFIX:ve,ADD_EVENT_LISTENER_STR:Le,REMOVE_EVENT_LISTENER_STR:Me})})}(t)})(st),function Rt(t){t.__load_patch("legacy",r=>{const i=r[t.__symbol__("legacyPatch")];i&&i()}),t.__load_patch("timers",r=>{const i="set",n="clear";ge(r,i,n,"Timeout"),ge(r,i,n,"Interval"),ge(r,i,n,"Immediate")}),t.__load_patch("requestAnimationFrame",r=>{ge(r,"request","cancel","AnimationFrame"),ge(r,"mozRequest","mozCancel","AnimationFrame"),ge(r,"webkitRequest","webkitCancel","AnimationFrame")}),t.__load_patch("blocking",(r,i)=>{const n=["alert","prompt","confirm"];for(let s=0;s<n.length;s++)le(r,n[s],(E,T,y)=>function(C,g){return i.current.run(E,r,g,y)})}),t.__load_patch("EventTarget",(r,i,n)=>{(function Pt(t,r){r.patchEventPrototype(t,r)})(r,n),function bt(t,r){if(Zone[r.symbol("patchEventTarget")])return;const{eventNames:i,zoneSymbolEventNames:n,TRUE_STR:s,FALSE_STR:l,ZONE_SYMBOL_PREFIX:E}=r.getGlobalObjects();for(let y=0;y<i.length;y++){const C=i[y],w=E+(C+l),H=E+(C+s);n[C]={},n[C][l]=w,n[C][s]=H}const T=t.EventTarget;T&&T.prototype&&r.patchEventTarget(t,r,[T&&T.prototype])}(r,n);const s=r.XMLHttpRequestEventTarget;s&&s.prototype&&n.patchEventTarget(r,n,[s.prototype])}),t.__load_patch("MutationObserver",(r,i,n)=>{be("MutationObserver"),be("WebKitMutationObserver")}),t.__load_patch("IntersectionObserver",(r,i,n)=>{be("IntersectionObserver")}),t.__load_patch("FileReader",(r,i,n)=>{be("FileReader")}),t.__load_patch("on_property",(r,i,n)=>{!function wt(t,r){if(Re&&!qe||Zone[t.symbol("patchEvents")])return;const i=r.__Zone_ignore_on_properties;let n=[];if(Ge){const s=window;n=n.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);const l=function Tt(){try{const t=Ee.navigator.userAgent;if(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:s,ignoreProperties:["error"]}]:[];ot(s,Be(s),i&&i.concat(l),Ie(s))}n=n.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let s=0;s<n.length;s++){const l=r[n[s]];l&&l.prototype&&ot(l.prototype,Be(l.prototype),i)}}(n,r)}),t.__load_patch("customElements",(r,i,n)=>{!function vt(t,r){const{isBrowser:i,isMix:n}=r.getGlobalObjects();(i||n)&&t.customElements&&"customElements"in t&&r.patchCallbacks(r,t.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"])}(r,n)}),t.__load_patch("XHR",(r,i)=>{!function C(g){const M=g.XMLHttpRequest;if(!M)return;const w=M.prototype;let W=w[Ze],G=w[Ae];if(!W){const R=g.XMLHttpRequestEventTarget;if(R){const k=R.prototype;W=k[Ze],G=k[Ae]}}const oe="readystatechange",X="scheduled";function v(R){const k=R.data,O=k.target;O[E]=!1,O[y]=!1;const Q=O[l];W||(W=O[Ze],G=O[Ae]),Q&&G.call(O,oe,Q);const q=O[l]=()=>{if(O.readyState===O.DONE)if(!k.aborted&&O[E]&&R.state===X){const _=O[i.__symbol__("loadfalse")];if(0!==O.status&&_&&_.length>0){const a=R.invoke;R.invoke=function(){const e=O[i.__symbol__("loadfalse")];for(let h=0;h<e.length;h++)e[h]===R&&e.splice(h,1);!k.aborted&&R.state===X&&a.call(R)},_.push(R)}else R.invoke()}else!k.aborted&&!1===O[E]&&(O[y]=!0)};return W.call(O,oe,q),O[n]||(O[n]=R),F.apply(O,k.args),O[E]=!0,R}function d(){}function V(R){const k=R.data;return k.aborted=!0,L.apply(k.target,k.args)}const z=le(w,"open",()=>function(R,k){return R[s]=0==k[2],R[T]=k[1],z.apply(R,k)}),B=x("fetchTaskAborting"),p=x("fetchTaskScheduling"),F=le(w,"send",()=>function(R,k){if(!0===i.current[p]||R[s])return F.apply(R,k);{const O={target:R,url:R[T],isPeriodic:!1,args:k,aborted:!1},Q=He("XMLHttpRequest.send",d,O,v,V);R&&!0===R[y]&&!O.aborted&&Q.state===X&&Q.invoke()}}),L=le(w,"abort",()=>function(R,k){const O=function H(R){return R[n]}(R);if(O&&"string"==typeof O.type){if(null==O.cancelFn||O.data&&O.data.aborted)return;O.zone.cancelTask(O)}else if(!0===i.current[B])return L.apply(R,k)})}(r);const n=x("xhrTask"),s=x("xhrSync"),l=x("xhrListener"),E=x("xhrScheduled"),T=x("xhrURL"),y=x("xhrErrorBeforeScheduled")}),t.__load_patch("geolocation",r=>{r.navigator&&r.navigator.geolocation&&function _t(t,r){const i=t.constructor.name;for(let n=0;n<r.length;n++){const s=r[n],l=t[s];if(l){if(!We(_e(t,s)))continue;t[s]=(T=>{const y=function(){return T.apply(this,xe(arguments,i+"."+s))};return ue(y,T),y})(l)}}}(r.navigator.geolocation,["getCurrentPosition","watchPosition"])}),t.__load_patch("PromiseRejectionEvent",(r,i)=>{function n(s){return function(l){nt(r,s).forEach(T=>{const y=r.PromiseRejectionEvent;if(y){const C=new y(s,{promise:l.promise,reason:l.rejection});T.invoke(C)}})}}r.PromiseRejectionEvent&&(i[x("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),i[x("rejectionHandledHandler")]=n("rejectionhandled"))}),t.__load_patch("queueMicrotask",(r,i,n)=>{!function kt(t,r){r.patchMethod(t,"queueMicrotask",i=>function(n,s){Zone.current.scheduleMicroTask("queueMicrotask",s[0])})}(r,n)})}(st)}},ee=>{ee(ee.s=95809)}]);